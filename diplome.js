// Le diplôme portable reprend le bloc tEXt du PNG de Papillon, avec une clé propre à Bull-Out.
// Ce marqueur de parcours est lisible localement. Il ne certifie pas l’identité du lecteur.
const marque = "bull-out-formation-v1";
const signature = [137, 80, 78, 71, 13, 10, 26, 10];
const texte = new TextEncoder();
const lecteur = new TextDecoder();
const tableCRC = Uint32Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let bit = 0; bit < 8; bit++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = tableCRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export function dateLocale() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

export function dessiner(canvas, date, prenom) {
  const ctx = canvas.getContext("2d");
  canvas.width = 1600;
  canvas.height = 960;
  ctx.scale(2, 2);
  ctx.fillStyle = "#fbf7ef";
  ctx.fillRect(0, 0, 800, 480);
  ctx.fillStyle = "#123a33";
  ctx.fillRect(0, 0, 800, 123);
  const ligne = (str, x, y, font, couleur, max = 718) => {
    ctx.font = font;
    ctx.fillStyle = couleur;
    ctx.fillText(str, x, y, max);
  };
  ligne("DD LAB   /   BULL-OUT", 42, 44, "600 15px Inter", "#d8f25c");
  ligne("Diplôme de formation", 40, 99, "800 47px Poppins", "#fbf7ef");
  ligne("PRÉVENTION DE L’ÉPUISEMENT PROFESSIONNEL", 42, 160, "600 14px Inter", "#a84622");
  ligne(prenom.trim() || "Parcours Bull-Out validé", 40, 214, "800 36px Poppins", "#123a33");
  const dateFR = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(date + "T12:00:00"));
  ligne("Cinq chapitres et test final validés le " + dateFR + ".", 42, 252, "400 19px Inter", "#123a33");
  const acquis = ["Décrire les signaux et les replacer dans leur contexte.", "Examiner les exigences, les ressources et la reconnaissance.", "Lire un profil et préparer une action sur le travail."];
  acquis.forEach((s, i) => {
    ctx.fillStyle = "#e8794f";
    ctx.fillRect(43, 291 + i * 28, 6, 6);
    ligne(s, 62, 300 + i * 28, "400 17px Inter", "#123a33");
  });
  ctx.fillStyle = "#d8f25c";
  ctx.fillRect(42, 398, 716, 3);
  ligne("Attestation pédagogique personnelle", 42, 434, "600 14px Inter", "#123a33");
  ligne("bullout.ddlab.fr", 632, 434, "600 14px Inter", "#123a33");
}

export async function exporterPNG(canvas, date) {
  const image = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error("Image indisponible")), "image/png"));
  const bytes = new Uint8Array(await image.arrayBuffer());
  const data = texte.encode(marque + "\0" + date);
  const chunk = new Uint8Array(data.length + 12);
  const dv = new DataView(chunk.buffer);
  dv.setUint32(0, data.length);
  chunk.set(texte.encode("tEXt"), 4);
  chunk.set(data, 8);
  dv.setUint32(chunk.length - 4, crc32(chunk.subarray(4, chunk.length - 4)));
  return new Blob([bytes.subarray(0, -12), chunk, bytes.subarray(-12)], { type: "image/png" });
}

export function lireDiplome(buffer) {
  const b = new Uint8Array(buffer);
  if (b.length < 33 || signature.some((v, i) => b[i] !== v)) return null;
  const dv = new DataView(buffer);
  let date = null;
  for (let i = 8; i + 12 <= b.length;) {
    const n = dv.getUint32(i);
    if (n > b.length - i - 12) return null;
    const type = lecteur.decode(b.subarray(i + 4, i + 8));
    if (i === 8 && (type !== "IHDR" || n !== 13)) return null;
    if (dv.getUint32(i + 8 + n) !== crc32(b.subarray(i + 4, i + 8 + n))) return null;
    if (type === "tEXt" && n === marque.length + 11) {
      const contenu = lecteur.decode(b.subarray(i + 8, i + 8 + n));
      if (contenu.startsWith(marque + "\0")) {
        const iso = contenu.slice(-10);
        if (/^\d{4}-\d{2}-\d{2}$/.test(iso) && Number.isFinite(Date.parse(iso)) && new Date(iso).toISOString().slice(0,10) === iso) date = iso;
      }
    }
    if (type === "IEND") return n === 0 && i + 12 === b.length ? date : null;
    i += n + 12;
  }
  return null;
}
