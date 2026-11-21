// Rapport Bull-Out : composé à partir des réponses calculées par script.js (événement « bullout:rapport »).
// Structure reprise de Papillon (psytest) : une synthèse, puis une étape par pièce vue dans la formation
// (les 9 pièces annoncées par les chapitres), puis des annexes qui montrent le calcul, les réponses et les sources.
// Rien n'est envoyé : tout est calculé et affiché dans cet onglet.
import { chapitres } from "./formation-contenu.js";

const VERSION = "2026.11.3";
const C = { sapin: "#123a33", mid: "#1d5c50", creme: "#f6efe2", card: "#fffdf8", anis: "#d8f25c", orange: "#e8794f", ink: "#b4512b", piste: "#e3dccd", rouge: "#b3261e" };
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const minus = (t) => (/^.[A-Z]/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1));
const liste = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}` : xs[0] || "");

// Niveaux nommés (les seuils restent ceux du calcul : 0-6, 7-12, 13-18, 19-24 sur 24).
const NIV = {
  faible: { mot: "bas", n: 0 },
  vigilance: { mot: "à surveiller", n: 1 },
  "élevé": { mot: "élevé", n: 2 },
  alerte: { mot: "très élevé", n: 3 }
};
// Les intensités descriptives restent dans l'orange ; le rouge est réservé aux signaux de sécurité.
// Un seul code couleur partout (formation, schéma, rapport) : la couleur dit l'effet pour toi, jamais si le chiffre est haut.
// Vert : ça va ou ça protège. Jaune : à surveiller. Orange : ça use. Orange foncé : ça use beaucoup. (Le rouge est réservé à la sécurité.)
const COUL = [C.mid, "#d9a21b", C.orange, "#a8401c"];
const NIVMOTS = ["ça va", "à surveiller", "ça use", "ça use beaucoup"];
const LEGENDE_COULEURS = `<p class="rp-couleurs" aria-label="Code couleur"><span><i style="background:${C.mid}"></i>ça va ou ça protège</span><span><i style="background:#d9a21b"></i>à surveiller</span><span><i style="background:${C.orange}"></i>ça use</span><span><i style="background:#a8401c"></i>ça use beaucoup</span></p>`;
const niv = (d) => NIV[d.level.label];
const tag = (d) => `<span class="rp-niv n${niv(d).n}">${niv(d).mot}</span>`;
const NOMS = { A: "Épuisement", B: "Distance mentale", C: "Perte d'efficacité et de sens", D: "Exigences du travail", E: "Manque de ressources", F: "Mal à récupérer" };
const chapLien = (n) => `<a href="test.html#chapitre-${n}" target="_blank" rel="noopener">chapitre ${n} · ${esc(chapitres[n - 1].court)}</a>`;

// ───────── Appuis : ce qui tient encore, ressources présentes, points forts personnels (partie G)
const TIENT = {
  A1: "il te reste de l'énergie pour ta vie personnelle", A2: "un repos court te fait encore récupérer", A3: "tu commences tes journées sans saturation",
  A4: "les tâches ordinaires ne te coûtent pas d'effort démesuré", A5: "tu restes calme face aux sollicitations habituelles", A6: "ton attention et ta mémoire tiennent",
  B1: "tu restes engagé·e dans ton travail", B2: "tu crois à l'utilité de ce que tu fais", B3: "tu ne fuis pas les échanges au travail",
  B4: "ta patience envers les autres est intacte", B5: "tu gardes des relations au-delà du minimum", B6: "tu restes impliqué·e dans ce que tu fais",
  C1: "tu as confiance dans la qualité de ton travail", C2: "la qualité de ton travail se maintient", C3: "tu vois le sens concret de ton travail",
  C4: "tu te sens compétent·e dans ce que tu maîtrises", C5: "tu finis tes journées en ayant été utile", C6: "tu te reconnais dans ta façon de travailler",
  D1: "la quantité de travail reste faisable", D2: "les urgences restent gérables", D3: "les priorités sont arbitrées",
  D4: "tes responsabilités ont les moyens qui vont avec", D5: "la charge émotionnelle reste supportable", D6: "tu n'as pas à compenser l'organisation",
  F1: "tu laisses le travail au travail", F2: "ton sommeil reste réparateur", F3: "tu gardes tes loisirs et tes liens",
  F4: "pas de symptômes physiques liés au travail", F5: "tu tiens sans stratégies de compensation", F6: "pas d'erreurs ni de quasi-accidents liés à la fatigue"
};
const RESSOURCES = {
  E1: ["Une vraie marge de manœuvre", "Utilise-la pour protéger une plage de travail sans interruption, chaque jour."],
  E2: ["Un manager qui aide à arbitrer", "C'est ton meilleur levier : apporte la liste de tes tâches et demande ce qui sort, ce qui attend."],
  E3: ["Des collègues sur qui compter", "Partage le dossier le plus lourd, ou demande un binôme pour la période chargée."],
  E4: ["Des objectifs clairs", "Appuie-toi dessus pour refuser ce qui sort du périmètre, sans te justifier longuement."],
  E5: ["Une reconnaissance crédible", "Sers-t'en pour rendre visible ce qui coûte, pas seulement ce qui réussit."],
  E6: ["Des décisions perçues comme justes", "Un cadre juste rend possible la discussion sur la charge : ose l'ouvrir."]
};
const APPUIS = {
  G1: ["Utilité", "Des moments où tu te sens utile et à la hauteur", "Repère ce qui les rend possibles : c'est ce qu'il faut protéger quand tu arbitres.", "Note chaque soir une chose utile faite dans la journée, même petite : cela rend visible ce que l'usure efface."],
  G2: ["Décrocher", "Tu sais décrocher du travail", "Le détachement est le premier moteur de la récupération : garde ce temps non négociable, surtout quand la charge monte.", "Choisis un moment fixe sans messages du travail, même court, et tiens-le une semaine."],
  G3: ["Proches", "Des proches à qui parler", "Mettre des mots avec quelqu'un aide à ne pas rester seul·e et à voir plus clair : continue.", "Choisis une personne à qui raconter ta semaine, sans chercher de solution."],
  G4: ["Ressourcement", "Des activités qui te ressourcent", "Ne les sacrifie pas quand la charge monte : c'est souvent la première chose qu'on supprime, et celle qui manque le plus.", "Remets une activité qui te faisait du bien, une fois cette semaine, à heure fixe."],
  G5: ["Demander de l'aide", "Tu sais demander de l'aide", "C'est un levier d'action : utilise-le pour demander un arbitrage précis, pas seulement un encouragement.", "Prépare une demande précise : une tâche, un délai, une personne. Le chapitre 7 donne des phrases prêtes."],
  G6: ["Poser des limites", "Tu sais poser des limites", "Garde ce réflexe : retirer, reporter, simplifier. C'est la base du plan (pièce 7).", "Entraîne-toi sur une petite demande : « Je peux le faire jeudi, pas aujourd'hui. »"]
};

function appuisArt(g) {
  const lignes = g.map((a, i) => {
    const y = 14 + i * 26;
    const w = Math.round((a.value / 4) * 170);
    return `<text x="0" y="${y + 12}" font-family="Inter, sans-serif" font-size="11.5" fill="${C.sapin}">${APPUIS[a.id][0]}</text>
      <rect x="120" y="${y}" width="170" height="16" rx="8" fill="${C.piste}"/>
      <rect x="120" y="${y}" width="${Math.max(w, 6)}" height="16" rx="8" fill="${a.value >= 3 ? COUL[0] : a.value === 2 ? COUL[1] : COUL[2]}"/>
      <text x="300" y="${y + 12}" font-family="Poppins, sans-serif" font-weight="800" font-size="11" fill="${C.sapin}">${a.value}/4</text>`;
  }).join("");
  return `<svg class="rp-art" viewBox="0 0 320 ${g.length * 26 + 20}" role="img" aria-label="Tes six points d'appui, notés de 0 à 4">${lignes}</svg>`;
}

// Jauge d'une réponse (0 à 4), comme dans le questionnaire.
const jauge = (v) => `<span class="rp-jauge" aria-hidden="true">${[1, 2, 3, 4].map((k) => `<i class="${k <= v ? "on" : ""}"></i>`).join("")}</span>`;

// ───────── Dessins personnalisés (SVG faits main, aux couleurs de la formation)
// ───────── Vue d'ensemble : les trois modèles de la formation en une seule image.
// À gauche : conditions et ressources déclarées. Au centre : deux scores descriptifs A/F.
// À droite : manifestations et autres réponses de santé. Les traits sont des liens de lecture,
// pas des liens de causalité ; leur épaisseur dépend d'une convention graphique interne.
const FIL = [1.5, 4, 8, 13];
const nv24 = (v) => (v >= 19 ? 3 : v >= 13 ? 2 : v >= 7 ? 1 : 0);
const MOTS = ["bas", "à surveiller", "élevé", "très élevé"];
const MOTSF = ["basse", "à surveiller", "élevée", "très élevée"];
function vueEnsemble({ causes, recharge, signes, corps, alerte, aScore, fScore, etroit }) {
  const T = (x, y, t, o = {}) => `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ""} font-family="${o.titre ? "Poppins, sans-serif" : "Inter, sans-serif"}" font-weight="${o.poids || (o.titre ? 800 : 400)}" font-size="${o.taille || 13}" fill="${o.c || C.sapin}"${o.op ? ` opacity="${o.op}"` : ""}>${esc(t)}</text>`;
  const fil = (x1, y1, x2, y2, n, c, vertical) => {
    const d = vertical ? `M${x1} ${y1} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}` : `M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`;
    return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${FIL[n]}" stroke-linecap="round" opacity="${n ? 0.88 : 0.3}"/>`;
  };
  // Un paquet : un titre, le modèle, puis des lignes (pastille de couleur, libellé, niveau).
  const paquet = (x, y, w, p, tirets) => {
    const h = 54 + p.rows.length * 28;
    const ys = p.rows.map((_, i) => y + 70 + i * 28);
    const svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".18" stroke-width="1.5"${tirets ? ' stroke-dasharray="5 4"' : ""}/>
      ${T(x + 16, y + 24, p.titre, { titre: true, taille: 14 })}${T(x + 16, y + 40, p.modele, { taille: 11, op: 0.72 })}
      ${p.rows.map((r, i) => `<circle cx="${x + 22}" cy="${ys[i] - 4}" r="5" fill="${r.c}"/>${T(x + 34, ys[i], r.label, { poids: 600 })}${T(x + w - 14, ys[i], r.val, { anchor: "end", taille: 11.5, poids: 700, c: (r.g ?? r.n) >= 2 ? C.ink : (r.g ?? r.n) === 0 && r.val ? C.mid : "#4a5f5a" })}`).join("")}`;
    return { svg, h, ys };
  };
  // Les trois signes : une barre par signe, sur 24.
  const barres = (x, y, w) => {
    const h = 54 + signes.length * 44;
    const ys = signes.map((_, i) => y + 64 + i * 44);
    const svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".18" stroke-width="1.5"/>
      ${T(x + 16, y + 24, "Les trois signes", { titre: true, taille: 14 })}${T(x + 16, y + 40, "Maslach, et le sens à part · chapitre 2", { taille: 11, op: 0.72 })}
      ${signes.map((s, i) => `${T(x + 16, ys[i], s.label, { poids: 600 })}${T(x + w - 16, ys[i], s.val, { anchor: "end", taille: 11.5, c: s.n >= 2 ? C.ink : "#4a5f5a" })}
        <rect x="${x + 16}" y="${ys[i] + 8}" width="${w - 32}" height="9" rx="4.5" fill="${C.piste}"/><rect x="${x + 16}" y="${ys[i] + 8}" width="${Math.max(6, Math.round((s.v / (s.max || 24)) * (w - 32)))}" height="9" rx="4.5" fill="${s.c || COUL[s.n]}"/>`).join("")}`;
    return { svg, h, ys: ys.map((v) => v + 4) };
  };
  // Ta fatigue : deux colonnes nommées en clair, lues pareil (plus haute et plus orange = ça use plus). Pas un % d’énergie.
  const batt = (cx, top, h = 170, w = 190) => {
    const barH = h - 92, trackY = top + 36;
    const bars = [{ nom: "Épuisement", v: aScore }, { nom: "Mal à récupérer", v: fScore }].map((d, i) => {
      const xc = cx - 46 + i * 92, bh = Math.round((d.v / 24) * barH), n = nv24(d.v);
      return `<rect x="${xc - 20}" y="${trackY}" width="40" height="${barH}" rx="7" fill="${C.piste}"/>
        <rect x="${xc - 20}" y="${trackY + barH - bh}" width="40" height="${bh}" rx="7" fill="${COUL[n]}"/>
        ${T(xc, top + h - 36, d.nom, { anchor: "middle", taille: 11.5, poids: 700 })}
        ${T(xc, top + h - 20, NIVMOTS[n], { anchor: "middle", taille: 11, poids: 700, c: n >= 2 ? C.ink : "#4a5f5a" })}
        ${T(xc, top + h - 6, `${d.v}/24`, { anchor: "middle", taille: 10, op: 0.75 })}`;
    }).join("");
    return `<rect x="${cx - w / 2}" y="${top}" width="${w}" height="${h}" rx="16" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".8" stroke-width="2"/>
      ${T(cx, top + 24, "Ta fatigue", { anchor: "middle", titre: true, taille: 14 })}
      ${bars}`;
  };
  const rechargeBox = (cx, y, w) => {
    const h = 44 + recharge.length * 22;
    return { h, svg: `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="12" fill="#e3eee9"/>
      ${T(cx, y + 24, "Tes appuis", { anchor: "middle", titre: true, taille: 13 })}
      ${recharge.map((r, i) => T(cx, y + 46 + i * 22, `${r.label} · ${r.val}`, { anchor: "middle", taille: 12, c: r.n ? C.sapin : "#4a5f5a" })).join("")}` };
  };
  const nRecharge = Math.max(0, ...recharge.map((r) => r.n));
  const alerteBox = (x, y, w) => alerte
    ? `<rect x="${x}" y="${y}" width="${w}" height="44" rx="12" fill="#fbe3d8"/>${T(x + 16, y + 27, "Signal déclaré : voir le message de sécurité", { titre: true, taille: 12.5, c: C.ink })}`
    : `<rect x="${x}" y="${y}" width="${w}" height="44" rx="12" fill="none" stroke="${C.sapin}" stroke-opacity=".18" stroke-dasharray="4 4"/>${T(x + 16, y + 27, "Pas de signal coché aux 3 questions", { taille: 12, op: 0.75 })}`;

  if (!etroit) {
    const W = 1000, top = 46, gap = 14, lw = 300;
    let y = top;
    const L = causes.map((p) => { const k = paquet(20, y, lw, p, p.horsScore); y += k.h + gap; return k; });
    const hL = y;
    let yr = top;
    const M = barres(W - 20 - lw, yr, lw); yr += M.h + gap;
    const Co = paquet(W - 20 - lw, yr, lw, corps); yr += Co.h + gap;
    const yAl = yr; yr += 44 + gap;
    const bTop = top + 92, bH = 190, cx = W / 2;
    const R = rechargeBox(cx, bTop + bH + 56, 230);
    const H = Math.max(hL, yr, bTop + bH + 56 + R.h + gap) + 6;
    const gauche = causes.flatMap((p, i) => p.rows.map((r, j) => ({ ...r, y: L[i].ys[j] - 4 })));
    const droite = [...signes.map((s, i) => ({ ...s, y: M.ys[i] })), ...corps.rows.map((r, j) => ({ ...r, y: Co.ys[j] - 4 }))];
    const cible = (k, n, a, b) => a + ((b - a) * (n === 1 ? 0.5 : k / (n - 1)));
    return `<svg class="rp-ensemble large" viewBox="0 0 ${W} ${H}" role="img" aria-label="Vue descriptive de tes réponses : ton travail, ta fatigue, ce qui se voit. Les liens ne prouvent aucune causalité.">
      <g class="rp-layer rp-layer-work">
        ${T(20, 26, "TON TRAVAIL", { titre: true, taille: 11.5, c: C.ink })}
        ${gauche.map((r, k) => fil(20 + lw, r.y, cx - 95, cible(k, gauche.length, bTop + 22, bTop + bH - 22), r.n, r.c)).join("")}
        ${L.map((k) => k.svg).join("")}
      </g>
      <g class="rp-layer rp-layer-person">
        ${T(cx, 26, "TOI", { titre: true, taille: 11.5, anchor: "middle", c: C.ink })}
        ${batt(cx, bTop, bH)}
      </g>
      <g class="rp-layer rp-layer-support">
        ${fil(cx, bTop + bH + 56, cx, bTop + bH + 4, nRecharge, C.mid, true)}
        ${R.svg}
      </g>
      <g class="rp-layer rp-layer-manifest">
        ${T(W - 20, 26, "CE QUI SE VOIT", { titre: true, taille: 11.5, anchor: "end", c: C.ink })}
        ${droite.map((r, k) => fil(cx + 95, cible(k, droite.length, bTop + 22, bTop + bH - 22), W - 20 - lw, r.y, r.n, r.c || COUL[r.n])).join("")}
        ${M.svg}${Co.svg}
      </g>
      <g class="rp-layer-safety">${alerteBox(W - 20 - lw, yAl, lw)}</g>
    </svg>`;
  }
  // Téléphone : les mêmes paquets, empilés ; deux gros fils relient les causes, l'énergie et les effets.
  const W = 400, x = 12, w = W - 24, gap = 12;
  let y = 34;
  const parts = [`<g class="rp-layer rp-layer-work">`, T(x, 22, "TON TRAVAIL", { titre: true, taille: 11.5, c: C.ink })];
  causes.forEach((p) => { const k = paquet(x, y, w, p, p.horsScore); parts.push(k.svg); y += k.h + gap; });
  const nCause = Math.max(0, ...causes.flatMap((p) => p.rows.filter((r) => !r.bon).map((r) => r.n)));
  const bTop = y + 76, bH = 170, cx = W / 2;
  parts.push(fil(cx, y - 4, cx, bTop - 58, nCause, C.orange, true));
  parts.push("</g>");
  parts.push('<g class="rp-layer rp-layer-person">', batt(cx, bTop, bH, 190), "</g>");
  const R = rechargeBox(cx, bTop + bH + 30, 250);
  parts.push('<g class="rp-layer rp-layer-support">');
  parts.push(fil(cx, bTop + bH + 30, cx, bTop + bH + 4, nRecharge, C.mid, true));
  parts.push(R.svg);
  parts.push("</g>");
  y = bTop + bH + 30 + R.h + 46;
  const nEffet = Math.max(0, ...signes.map((s) => s.n), ...corps.rows.map((r) => r.n));
  parts.push('<g class="rp-layer rp-layer-manifest">');
  parts.push(fil(cx + 150, bTop + bH / 2, cx + 150, y - 4, nEffet, C.orange, true));
  parts.push(`<path d="M${cx + 95} ${bTop + bH / 2} H${cx + 150}" stroke="${C.orange}" stroke-width="${FIL[nEffet]}" stroke-linecap="round" opacity="${nEffet ? 0.88 : 0.3}"/>`);
  parts.push(T(x, y - 10, "CE QUI SE VOIT", { titre: true, taille: 11.5, c: C.ink }));
  const M = barres(x, y, w); parts.push(M.svg); y += M.h + gap;
  const Co = paquet(x, y, w, corps); parts.push(Co.svg); y += Co.h + gap;
  parts.push("</g>");
  parts.push(`<g class="rp-layer-safety">${alerteBox(x, y, w)}</g>`); y += 44 + 8;
  return `<svg class="rp-ensemble etroit" viewBox="0 0 ${W} ${y}" role="img" aria-label="Vue descriptive de tes réponses : ton travail, ta fatigue (épuisement, mal à récupérer), ce qui se voit. Les liens ne prouvent aucune causalité.">${parts.join("")}</svg>`;
}

// Deux barres nommées : épuisement (partie A) et récupération (partie F), sans pourcentage d’énergie.
function epuisementRecup(A, F) {
  const barre = (y, titre, v) => {
    const largeur = Math.round((v / 24) * 190);
    return `<text x="8" y="${y}" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="${C.sapin}">${titre}</text>
      <text x="312" y="${y}" text-anchor="end" font-family="Inter, sans-serif" font-size="12" fill="${C.sapin}">${v}/24</text>
      <rect x="116" y="${y - 12}" width="190" height="13" rx="6" fill="${C.piste}"/>
      <rect x="116" y="${y - 12}" width="${largeur}" height="13" rx="6" fill="${COUL[nv24(v)]}"/>`;
  };
  return `<svg class="rp-art" viewBox="0 0 320 118" role="img" aria-label="Deux sommes descriptives de réponses : épuisement ${A} sur 24 et mal à récupérer ${F} sur 24">
    ${barre(35, "Épuisement", A)}${barre(77, "Mal à récupérer", F)}
    <text x="160" y="111" text-anchor="middle" font-family="Inter, sans-serif" font-size="10.5" fill="${C.sapin}">Plus la barre est longue, plus la difficulté est fréquente</text>
  </svg>`;
}
function jauges(sr) {
  const ids = ["A", "B", "C"];
  const H = 120;
  const cols = ids.map((id, i) => {
    const d = sr[id];
    const x = 40 + i * 95;
    const h = Math.round((d.score / 24) * H);
    const seuils = [6.5, 12.5, 18.5].map((s) => `<line x1="${x - 6}" x2="${x + 46}" y1="${20 + H - (s / 24) * H}" y2="${20 + H - (s / 24) * H}" stroke="${C.sapin}" stroke-opacity=".25" stroke-dasharray="3 3"/>`).join("");
    return `<rect x="${x}" y="20" width="40" height="${H}" rx="10" fill="${C.piste}"/>
      <rect x="${x}" y="${20 + H - h}" width="40" height="${h}" rx="10" fill="${COUL[niv(d).n]}"/>${seuils}
      <text x="${x + 20}" y="${H + 40}" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="12" fill="${C.sapin}">${["Épuisement", "Distance", "Eff./sens"][i]}</text>
      <text x="${x + 20}" y="14" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="${C.sapin}">${d.score}/24</text>`;
  }).join("");
  return `<svg class="rp-art" viewBox="0 0 320 170" role="img" aria-label="Trois jauges : épuisement ${sr.A.score}, distance ${sr.B.score}, efficacité/sens ${sr.C.score} sur 24">${cols}</svg>`;
}

// Balance : le plateau le plus lourd descend. gauche/droite sur la même échelle (max).
function balance(gauche, droite, max, lg, ld, label) {
  const angle = Math.max(-16, Math.min(16, ((droite - gauche) / max) * 16));
  const plateau = (x, v, l) => `<g transform="translate(${x} 0) rotate(${-angle})">
      <line x1="0" y1="0" x2="-22" y2="36" stroke="${C.sapin}" stroke-width="2"/><line x1="0" y1="0" x2="22" y2="36" stroke="${C.sapin}" stroke-width="2"/>
      <path d="M-34 36 h68 a34 12 0 0 1 -68 0z" fill="${C.anis}" stroke="${C.sapin}" stroke-width="2.5"/>
      <text y="70" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="12" fill="${C.sapin}">${l}</text>
      <text y="86" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="${C.sapin}">${v}/${max}</text></g>`;
  return `<svg class="rp-art" viewBox="0 0 320 170" role="img" aria-label="${esc(label)}">
    <path d="M160 40 L144 150 H176 Z" fill="${C.sapin}"/><rect x="118" y="146" width="84" height="10" rx="5" fill="${C.sapin}"/>
    <g transform="rotate(${angle} 160 40)"><rect x="56" y="36" width="208" height="8" rx="4" fill="${C.sapin}"/>
      ${plateau(66, gauche, lg).replace("<g transform=\"translate(66 0)", "<g transform=\"translate(66 40)")}
      ${plateau(254, droite, ld).replace("<g transform=\"translate(254 0)", "<g transform=\"translate(254 40)")}</g>
    <circle cx="160" cy="40" r="7" fill="${C.orange}"/></svg>`;
}

// ───────── Lecture des réponses : qualité et points à clarifier (déclaratif, pas une mesure validée)
function lisibilite(r, ratingLabels) {
  const raw = Object.values(r.sectionResults).flatMap((d) => d.rawValues);
  const comptes = [0, 0, 0, 0, 0];
  raw.forEach((v) => { comptes[v] += 1; });
  const max = Math.max(...comptes);
  const valeur = comptes.indexOf(max);
  const prudence = [];
  if (max === raw.length) prudence.push(`tu as donné la même réponse (« ${ratingLabels[valeur].replace(/^\d+\s*-\s*/, "")} ») aux ${raw.length} questions notées`);
  else if (max >= 30) prudence.push(`${max} réponses sur ${raw.length} sont identiques (« ${ratingLabels[valeur].replace(/^\d+\s*-\s*/, "")} »)`);
  if (max < raw.length && comptes[0] + comptes[4] >= 30) prudence.push("presque toutes tes réponses sont aux extrêmes (jamais ou presque toujours)");
  const brut = (id) => r.answers.find((a) => a.id === id).rawScore;
  const paires = [];
  if (brut("E2") >= 3 && brut("D3") >= 3) paires.push(["E2", "D3", "Ton manager t'aide à arbitrer quand la charge dépasse (E2), et tu reçois souvent des priorités contradictoires ou peu arbitrées (D3).", "L'arbitrage existe-t-il seulement quand tu le demandes ? Vient-il trop tard ?"]);
  if (brut("E4") >= 3 && brut("D3") >= 3) paires.push(["E4", "D3", "Tes objectifs te paraissent clairs (E4), et les priorités se contredisent souvent (D3).", "Ce qui est clair, est-ce le poste sur le papier ? Ce qui se contredit, est-ce l'ordre des urgences au quotidien ?"]);
  if (brut("C5") >= 3 && brut("C1") === 0 && brut("C4") === 0) paires.push(["C5", "C1", "Tu finis souvent tes journées sans rien d'utile accompli (C5), sans douter de ta compétence (C1, C4).", "Le problème vient-il de ce qu'on te laisse faire, plutôt que de ce que tu sais faire ?"]);
  return { fiable: !prudence.length, prudence, paires, comptes };
}

// Réponses d'une dimension, question par question.
function reponses(d, section, ratingLabels, r) {
  return `<ol class="rp-items">${section.questions.map((q, i) => {
    const id = `${section.id}${i + 1}`;
    const a = r.answers.find((x) => x.id === id);
    const mot = ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, "");
    return `<li class="${a.riskScore >= 3 ? "haut" : ""}"><span class="rp-id">${id}</span><span class="rp-q">${esc(q)}</span><span class="rp-a">${jauge(a.riskScore)}<span>${esc(mot)}${section.reversed ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`;
  }).join("")}</ol>`;
}

const pourComprendre = (titre, html, chap) => `<details class="rp-pc"><summary><span class="k">Pour comprendre</span>${titre}</summary><div>${html}${chap ? `<p class="rp-chap">Vu au ${chap}.</p>` : ""}</div></details>`;
const bref = (t) => `<div class="rp-bref"><p class="k">En bref</p><p>${t}</p></div>`;
const garder = (t, dernier) => `<div class="rp-garder"><p class="k">${dernier ? "Pour finir" : "À garder pour la suite"}</p><p>${t}</p></div>`;
const carte = (titre, html, cls = "") => `<article class="rp-carte ${cls}"><h4>${titre}</h4>${html}</article>`;
const ul = (xs) => `<ul>${xs.map((x) => `<li>${x}</li>`).join("")}</ul>`;

function composer({ result: r, sections, strengthPart, exchangePart, temporalPart, bullshitPart, bsDims, ratingLabels }) {
  const sr = r.sectionResults;
  const sec = Object.fromEntries(sections.map((s) => [s.id, s]));
  const L = lisibilite(r, ratingLabels);
  const ressources = 24 - sr.E.score; // E est compté à l'envers : ressources présentes = 24 - score de manque
  const ctxOui = r.contextAnswers.filter((a) => a.yes);
  const temps = r.temporalAnswers || [];
  const repere = (id) => temps.find((a) => a.id === id);
  const qualiteEmpechee = repere("T4")?.value ?? null;
  const item = (id) => r.answers.find((a) => a.id === id);
  const haut = (id) => item(id).riskScore >= 3;
  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date());

  // L’orientation dépend de la réponse effectivement donnée, jamais du total A–F.
  const alertesOui = (r.alertAnswers || []).map((a, i) => a.yes ? i : -1).filter((i) => i >= 0);
  const conseilsSecurite = [
    '<b>Idées noires ou suicidaires :</b> appelle le <a href="tel:3114"><b>3114</b></a> (gratuit, 24 h/24 en France). En cas de danger immédiat, <a href="tel:15"><b>15</b></a> ou <a href="tel:112"><b>112</b></a>.',
    "<b>Fonctionnement très perturbé :</b> contacte rapidement un professionnel de santé pour préciser les difficultés et les mesures adaptées.",
    '<b>Symptômes physiques préoccupants :</b> si une douleur thoracique, un essoufflement inhabituel ou un malaise est actuel, appelle le <a href="tel:15"><b>15</b></a> ou le <a href="tel:112"><b>112</b></a>. Sinon, demande un avis médical.'
  ];
  const securite = r.hasAlert ? `<div class="rp-securite" role="alert"><p><b>Au moins un signal de sécurité a été déclaré.</b> Les situations ci-dessous demandent des réponses différentes ; un score ne détermine pas l’urgence.</p>
    <ul>${alertesOui.map((i) => `<li>${conseilsSecurite[i]}</li>`).join("")}</ul></div>` : "";
  // ───────── Lectures courtes, réutilisées dans la synthèse et les étapes
  const coeur = ["A", "B", "C"].map((id) => sr[id]);
  const coeurHauts = coeur.filter((d) => d.score >= 13);
  const lectureUsure = coeurHauts.length === 3 ? "Les trois jauges sont hautes en même temps : l'usure ne se résume pas à la fatigue."
    : coeurHauts.length ? `${cap(liste(coeurHauts.map((d) => NOMS[d.id].toLowerCase())))} ${coeurHauts.length > 1 ? "ressortent" : "ressort"} nettement ; ${coeurHauts.length === 1 ? "les deux autres jauges" : "la troisième"} moins.`
      : coeur.some((d) => d.score >= 7) ? "Aucune jauge n'est haute, mais au moins une est à surveiller." : "Les trois jauges restent basses.";
  const penche = sr.D.score - ressources;
  const lectureBalance = penche >= 4 ? `Les exigences (${sr.D.score}/24) ressortent plus que les ressources présentes (${ressources}/24), sans qu’un rapport causal puisse être déduit.`
    : penche <= -4 ? `Les ressources (${ressources}/24) sont davantage déclarées que les exigences (${sr.D.score}/24). Cela ne garantit pas une compensation.`
      : `Les scores d’exigences (${sr.D.score}/24) et de ressources présentes (${ressources}/24) sont proches. Ce n’est pas une mesure de compensation.`;
  // Le retour (Siegrist) : effort D1, D4, D6 ; récompense E5, E6 (estime, équité) et R1-R3 (salaire, perspectives, sécurité) ;
  // surengagement R4-R6 et F1. Chaque groupe est ramené sur 24 (moyenne des réponses x 6) pour être comparable.
  const rep = Object.fromEntries((r.exchangeAnswers || []).map((a) => [a.id, a]));
  const moy24 = (vals) => Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 6);
  const effort = moy24(["D1", "D4", "D6"].map((id) => item(id).riskScore));
  const recompIds = ["E5", "E6", "R1", "R2", "R3"].filter((id) => id.startsWith("E") || rep[id]);
  const retour = moy24(recompIds.map((id) => (id.startsWith("E") ? item(id).rawScore : rep[id].value)));
  const surIds = ["R4", "R5", "R6"].filter((id) => rep[id]);
  const surengagement = moy24([...surIds.map((id) => rep[id].value), item("F1").riskScore]);
  const lectureRetour = effort - retour >= 6 ? "Sur les items retenus, les efforts déclarés dépassent sensiblement les récompenses déclarées : une piste à examiner, pas un ratio ERI validé."
    : effort - retour >= 2 ? "Sur ces items, les efforts ressortent légèrement plus que les récompenses ; leur comparaison reste descriptive." : "Sur ces items, les récompenses déclarées sont proches ou supérieures aux efforts déclarés.";
  const lectureSur = surengagement >= 13 ? "Des difficultés à refuser ou à décrocher ressortent fréquemment ; leur effet éventuel sur les conditions de travail n’est pas démontré par ce score."
    : surengagement >= 7 ? "Quelques réponses suggèrent un surengagement ; l’interprétation doit tenir compte de la situation réelle." : "";
  // Efficacité (C1, C2, C4, C6) et sens (C3, C5) : la partie C mêle deux choses, le rapport les sépare.
  // Conserver les dénominateurs des deux sous-groupes, sans extrapolation fictive.
  const efficacite = ["C1", "C2", "C4", "C6"].reduce((n, id) => n + item(id).riskScore, 0); // 0–16
  const perteSens = ["C3", "C5"].reduce((n, id) => n + item(id).riskScore, 0); // 0–8
  const relatif24 = (n, max) => n / max * 24;
  // Le bullshitomètre, croisé avec la distance (B) et la perte de sens.
  const bs = r.bullshit || { percent: 0, dims: {}, answers: [] };
  const absurdeHaut = bs.percent >= 50;
  const coupe = sr.B.score >= 13 || perteSens >= 5;
  const CASES = {
    hh: ["Le cirque commence à peser", "L’absurdité ressort dans le jeu et le retrait ou les difficultés de sens dans les questions sérieuses. Leur cooccurrence ne prouve pas un lien de cause."],
    hb: ["L’absurde, mais pas le désengagement", "On peut juger une partie du travail absurde et continuer à trouver son activité utile : les deux informations ne s’annulent pas."],
    bh: ["Le malaise sans le grand cirque", "La distance ou le sens sont difficiles malgré peu de situations satiriques cochées. Examiner d’autres conditions de travail et la santé."],
    bb: ["De vrais arbitrages, ça existe", "Peu de signaux dans ces questions, sans exclure des difficultés qui n’y figurent pas."]
  };
  const caseBS = (absurdeHaut ? "h" : "b") + (coupe ? "h" : "b");
  const [bsTitre, bsTexte] = CASES[caseBS];
  const bsMatrice = !bs.skipped && bs.matrix ? bs.matrix : null;
  const lectureVecu = sr.A.score >= 13 && sr.F.score >= 13
    ? "Tu déclares à la fois des manifestations d’épuisement et plusieurs difficultés de récupération ou de santé."
    : sr.A.score >= 13 ? "Plusieurs manifestations d’épuisement ressortent, sans que les autres réponses suffisent à expliquer leur origine."
      : sr.F.score >= 13 ? "Plusieurs difficultés de récupération ou de santé sont déclarées, même si les réponses d’épuisement ressortent moins."
        : sr.A.score >= 7 || sr.F.score >= 7 ? "Quelques difficultés ressortent dans les modules épuisement et récupération."
          : "Peu de difficultés sont déclarées dans ces deux modules. Cela ne constitue pas une mesure de santé globale.";

  // ───────── Trois questions à emporter
  const top = r.topItems[0];
  const manqueRessource = ["E1", "E2", "E3", "E4", "E5", "E6"].map(item).sort((a, b) => b.riskScore - a.riskScore)[0];
  const Q_RESSOURCE = {
    E1: "Sur quoi puis-je décider seul·e de la méthode ou du rythme ?",
    E2: "Quand la charge dépasse ce qui est faisable, comment arbitre-t-on, et qui décide ?",
    E3: "Qui peut me relayer ou partager la charge sur le dossier le plus lourd ?",
    E4: "Quel est l'objectif, le livrable, le délai et le niveau de détail attendus ?",
    E5: "Qu'est-ce qui, dans mon travail de ces dernières semaines, a été vu ?",
    E6: "Sur quels critères la charge et les décisions sont-elles réparties ?"
  };
  const questions = [
    ["Pour toi", top ? `Qu'est-ce qui, dans mon travail réel, explique « ${top.humanLabel} » ?` : "Qu'est-ce qui me protège aujourd'hui, et comment le garder ?"],
    ["Pour ton médecin ou le médecin du travail", sr.F.score >= 13 || sr.A.score >= 13 ? "Mes réponses signalent des difficultés : quelles causes et quels aménagements faudrait-il examiner ?" : "Qu'est-ce qui pourrait être aménagé pour que mon travail reste soutenable ?"],
    ["Pour ton manager", sr.D.score >= 13 ? "Qu'est-ce qu'on retire, reporte ou simplifie cette semaine ?" : manqueRessource.riskScore >= 3 ? Q_RESSOURCE[manqueRessource.id] : "Quelle est la priorité de la semaine, et qu'est-ce qui peut attendre ?"]
  ];

  // ───────── Tes appuis
  const g = r.strengthAnswers;
  const forts = g.filter((a) => a.value >= 3);
  const aDevelopper = g.filter((a) => a.value <= 1);
  const ressPresentes = ["E1", "E2", "E3", "E4", "E5", "E6"].filter((id) => item(id).rawScore >= 3);
  const tient = r.answers.filter((a) => a.sectionId !== "E" && a.riskScore <= 1 && TIENT[a.id]);
  const tientParDim = ["A", "B", "C", "D", "F"].map((id) => [id, tient.filter((a) => a.sectionId === id)]).filter(([, xs]) => xs.length);
  const lectureAppuis = `${forts.length ? `${forts.length} point${forts.length > 1 ? "s" : ""} fort${forts.length > 1 ? "s" : ""} personnel${forts.length > 1 ? "s" : ""} (${liste(forts.map((a) => APPUIS[a.id][0].toLowerCase()))})` : "Pas de point fort personnel net pour l'instant"}, ${ressPresentes.length ? `${ressPresentes.length} ressource${ressPresentes.length > 1 ? "s" : ""} présente${ressPresentes.length > 1 ? "s" : ""} au travail` : "peu de ressources présentes au travail"}, et ${tient.length} réponse${tient.length > 1 ? "s" : ""} qui montre${tient.length > 1 ? "nt" : ""} ce qui tient encore.`;
  const pageAppuis = {
    titre: "Tes appuis", q: "Sur quoi peux-tu t'appuyer pour agir ?",
    intro: "Les ressources déclarées comptent, mais ne garantissent pas que la charge est soutenable. L'objectif est d'identifier les appuis réellement disponibles pour préparer une action.",
    bref: lectureAppuis,
    corps: `<div class="rp-duo"><div>${appuisArt(g)}<p class="rp-legende">Tes réponses à la partie G. Elles ne comptent dans aucun score de risque.</p></div>
      <div>${forts.length ? `<p>Tes points forts les plus nets : <b>${esc(liste(forts.map((a) => APPUIS[a.id][1].toLowerCase())))}</b>.</p>` : "<p>Aucun point d'appui ne ressort nettement aujourd'hui. C'est fréquent quand l'usure s'installe : ce qu'on fait pour soi passe en premier à la trappe. Les leviers ci-dessous sont des premiers pas.</p>"}
      <p class="rp-cle"><b>Tes forces ne remplacent pas l'action sur le travail.</b> Elles t'aident à la mener. Ce n'est pas à toi seul·e de compenser une charge mal arbitrée.</p></div></div>
      ${forts.length ? `<h4 class="rp-h">Tes points forts, et comment t'en servir</h4><div class="rp-grille-appuis">${forts.map((a) => carte(`${esc(APPUIS[a.id][1])} <span class="rp-niv n0">${a.value}/4</span>`, `<p>${esc(APPUIS[a.id][2])}</p>`, "fort")).join("")}</div>` : ""}
      ${ressPresentes.length ? `<h4 class="rp-h">Les ressources présentes dans ton travail</h4><div class="rp-grille-appuis">${ressPresentes.map((id) => carte(esc(RESSOURCES[id][0]), `<p class="rp-q">${esc(item(id).question)}</p><p><b>Levier :</b> ${esc(RESSOURCES[id][1])}</p>`, "fort")).join("")}</div>` : ""}
      ${tientParDim.length ? `<h4 class="rp-h">Ce qui tient encore</h4><p class="rp-legende">Réponses « jamais » ou « rarement » sur des signes de difficulté : ce sont des protections à garder.</p>
        <ul class="rp-tient">${tientParDim.map(([id, xs]) => `<li><span class="k">${NOMS[id]}</span>${xs.map((a) => `<span class="rp-chip">${esc(TIENT[a.id])}</span>`).join("")}</li>`).join("")}</ul>` : ""}
      ${aDevelopper.length ? `<h4 class="rp-h">Leviers à développer</h4><p class="rp-legende">Un premier pas pour chacun, à choisir : un seul suffit pour commencer.</p><div class="rp-grille-appuis">${aDevelopper.map((a) => carte(`${esc(APPUIS[a.id][0])} <span class="rp-niv n2">${a.value}/4</span>`, `<p>${esc(APPUIS[a.id][3])}</p>`, "levier")).join("")}</div>` : ""}`,
    comprendre: pourComprendre("Pourquoi regarder aussi ce qui va bien", `<p>Le modèle Exigences-Ressources compte aussi des <b>ressources personnelles</b> : sentiment d'efficacité, optimisme, capacité à agir. Xanthopoulou et ses collègues (2007) ont montré qu'elles protègent de l'épuisement et soutiennent l'engagement. La récupération, elle, repose surtout sur le <b>détachement</b> (ne plus penser au travail), la détente, les activités qui apportent de la maîtrise et le contrôle de son temps (Sonnentag et Fritz, 2007).</p><p>Mais ces ressources s'usent elles aussi quand les exigences restent trop hautes trop longtemps. C'est pourquoi le plan commence par le travail réel, et s'appuie sur tes forces pour le mener.</p>`, chapLien(3)),
    garder: "Garde ces appuis en tête : le plan (pièce 7) s'en sert. Avant les pièces, une pause humour : le bullshitomètre."
  };

  // ───────── Trace écrite (pièce « Les traces ») : faits de travail, jamais la santé
  const FAITS = {
    D1: "la charge dépasse régulièrement ce qui peut être fait correctement dans le temps disponible",
    D2: "les urgences et les interruptions empêchent de travailler de façon soutenable",
    D3: "je reçois des priorités contradictoires, sans arbitrage",
    D4: "je porte des responsabilités sans les moyens ou l'autorité qui vont avec",
    D5: "les exigences relationnelles et émotionnelles du poste sont fortes",
    D6: "je compense des dysfonctionnements d'organisation pour que le travail sorte",
    E1: "je n'ai pas de marge réelle pour organiser mon travail",
    E2: "quand la charge dépasse ce qui est faisable, l'arbitrage manque",
    E3: "le soutien concret de l'équipe manque sur les dossiers lourds",
    E4: "les objectifs, les livrables ou les délais ne sont pas assez clairs"
  };
  const faits = Object.keys(FAITS).filter((id) => item(id).riskScore >= 3).map((id) => FAITS[id]);
  const demande = sr.D.score >= 13 || haut("D1") ? "un point pour décider ce qui sort, ce qui attend et ce qui se simplifie"
    : haut("D3") || haut("E2") ? "un arbitrage écrit sur les priorités de la semaine"
      : haut("E4") ? "une clarification écrite de l'objectif, du livrable et du délai attendus"
        : "un point court sur la charge et les priorités";
  const brouillon = [
    "Objet : charge de travail et priorités",
    "",
    "Bonjour [prénom],",
    "",
    faits.length ? `Depuis [date ou nombre de semaines], je constate que :\n${faits.map((f, i) => `- ${f}${i === faits.length - 1 ? "." : " ;"}`).join("\n")}` : "Je souhaite faire le point sur ma charge de travail et nos priorités.",
    "",
    "Exemples précis : [date, dossier ou tâche, ce qui s'est passé].",
    "",
    `Je te demande ${demande}, d'ici [date].`,
    "",
    "Merci de me répondre par écrit, pour que nous gardions la même trace de ce qui est décidé.",
    "",
    "[signature]"
  ].join("\n");

// L'INRS retient six familles RPS. Cette lecture indique la couverture des items
  // Bull-Out, pas un dépistage exhaustif ni une validation de l'exposition.
  const rpsFamilles = [
    { nom: "Intensité et temps de travail", ids: ["D1", "D2", "D6"], limite: "Le temps de travail et les horaires ne sont pas demandés directement." },
    { nom: "Exigences émotionnelles", ids: ["D5"], limite: "Une seule question, très générale ; les situations relationnelles précises restent inconnues." },
    { nom: "Autonomie et marges de manœuvre", ids: ["E1", "D4"], limite: "Les ressources et l'autorité sont abordées, mais pas toutes les marges de décision." },
    { nom: "Rapports sociaux au travail", ids: ["E2", "E3", "E5", "E6"], limite: "Le soutien, l'arbitrage, la reconnaissance et l'équité sont partiellement interrogés." },
    { nom: "Conflits de valeurs", ids: [], contexte: "ethicalConflict", limite: "Le conflit éthique est interrogé par oui/non et la qualité empêchée par une fréquence T4 ; les situations précises restent à documenter." },
    { nom: "Insécurité professionnelle", ids: [], retour: "R3", limite: "Une seule question sur la stabilité perçue ; les changements imposés restent peu explorés." }
  ];
  const rpsCartes = rpsFamilles.map((famille) => {
    const signaux = famille.ids.map((id) => item(id)).filter((a) => a.riskScore >= 3);
    const ouiContexte = famille.contexte && (r.contextAnswers || []).some((a) => a.id === famille.contexte && a.yes);
    const qualiteFrequente = famille.contexte === "ethicalConflict" && qualiteEmpechee >= 3;
    const retourBas = famille.retour && rep[famille.retour]?.value <= 1;
    const signale = signaux.length > 0 || ouiContexte || retourBas || qualiteFrequente;
    const detail = signaux.length
      ? signaux.map((a) => `<span class="rp-id">${esc(a.id)}</span> ${esc(a.question)}`).join(" ; ")
      : qualiteFrequente ? "La qualité empêchée est déclarée fréquemment (T4, hors score)." : ouiContexte ? "Un conflit éthique a été déclaré dans le contexte."
        : retourBas ? "La stabilité ou la sécurité d'emploi est peu ressentie (R3)."
          : "Aucun signal fréquent dans les questions retenues pour ce thème.";
    return `<article class="rp-rps-famille ${signale ? "is-signal" : ""}">
      <div><h5>${famille.nom}</h5><span class="rp-rps-status">${signale ? "Élément à éclaircir" : "Peu ou pas exploré dans ces réponses"}</span></div>
      <p>${detail}</p><p class="rp-rps-limite">${famille.limite}</p></article>`;
  }).join("");
  const grilleRPS = `<section class="rp-rps" aria-labelledby="rp-rps-title"><h4 class="rp-h" id="rp-rps-title">Six familles de facteurs psychosociaux</h4>
    <p>Le référentiel français <a href="https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html" target="_blank" rel="noopener">INRS / Gollac</a> décrit six familles d'expositions. Ce tableau relie tes réponses à ces thèmes, sans fabriquer de six nouveaux scores ni prétendre les couvrir complètement.</p>
    <div class="rp-rps-grille">${rpsCartes}</div>
    <p class="rp-legende">Une absence de signal n'exclut pas une exposition réelle : certains thèmes ne disposent que d'une question et aucun détail sur l'organisation du travail n'a été vérifié.</p></section>`;

  // ───────── Les 9 étapes (une par pièce de la formation)
  const pieces = chapitres.map((c) => c.piece.nom);
  const etapes = [
    {
      id: "batterie", chap: 1, titre: "Ta fatigue", q: "Le repos te rend-il ce que le travail te prend ?",
      intro: "Deux choses, lues séparément et dans le même sens : plus la barre est longue et orange, plus ça use. <b>Épuisement</b> : être vidé, à bout, ne plus récupérer d'un repos court. <b>Mal à récupérer</b> : mal dormir, ne plus décrocher, symptômes, erreurs de fatigue. Quand les deux montent ensemble, la fatigue ressemble moins à une fatigue passagère qu'à de l'usure. Elles ne disent pas, seules, d'où elle vient.",
      bref: `${lectureVecu} Épuisement : ${niv(sr.A).mot} (${sr.A.score}/24). Mal à récupérer : ${niv(sr.F).mot} (${sr.F.score}/24).`,
      corps: `<div class="rp-duo"><div>${epuisementRecup(sr.A.score, sr.F.score)}<p class="rp-legende">Chaque barre résume six questions, sur 24. Ce ne sont ni une quantité d’énergie, ni une mesure clinique validée.</p></div>
        <div>${carte(`Épuisement ${tag(sr.A)}`, `<p>${esc(sr.A.comment)}</p>`)}${carte(`Mal à récupérer ${tag(sr.F)}`, `<p>${esc(sr.F.comment)}</p>`)}
        ${haut("A2") ? `<p class="rp-cle"><b>Question clé :</b> tu réponds que même un repos court ne te fait plus récupérer (A2). Cette réponse appelle à examiner sa durée, la récupération, les contraintes du travail et d'autres causes possibles. Elle ne suffit pas à identifier un burn-out.</p>` : ""}</div></div>
        <h4 class="rp-h">Tes réponses</h4>${reponses(sr.A, sec.A, ratingLabels, r)}${reponses(sr.F, sec.F, ratingLabels, r)}
        ${haut("F5") || haut("F6") ? `<p class="rp-cle"><b>À ne pas laisser de côté :</b> ${[haut("F5") ? "des stratégies pour tenir ou dormir (F5)" : "", haut("F6") ? "des erreurs ou quasi-accidents liés à la fatigue (F6)" : ""].filter(Boolean).join(" et ")}. Ce sont des signaux de sécurité : parles-en à un médecin.</p>` : ""}`,
      comprendre: pourComprendre("Fatigue, stress ou usure", `<p>Le stress est une réaction d'adaptation à une exigence. La fatigue se répare avec le repos. Le burn-out est décrit par l'OMS (CIM-11, 2019) comme un <b>phénomène lié au travail</b>, résultant d'un stress chronique au travail qui n'a pas été géré avec succès. Ce n'est pas une maladie dans la classification, et aucun test sanguin ou hormonal ne le mesure chez une personne.</p><p>Les changements pendant un congé ou à la reprise peuvent éclairer le rôle du travail, sans démontrer à eux seuls une causalité. Une fatigue persistante peut également avoir d’autres origines.</p>`, chapLien(1)),
      garder: `${lectureVecu} On regarde maintenant si l'usure touche aussi ta relation au travail et ta confiance.`
    },
    {
      id: "jauges", chap: 2, titre: "Les trois jauges", q: "L'usure touche-t-elle seulement ton énergie, ou aussi ta relation au travail et ta confiance ?",
      intro: "Le modèle de Christina Maslach distingue épuisement, distance ou cynisme et efficacité professionnelle réduite. Bull-Out explore aussi le sens du travail, mais ce dernier ne constitue pas une quatrième dimension clinique de Maslach.",
      bref: `${lectureUsure} Épuisement ${niv(sr.A).mot}, distance ${niv(sr.B).mot}, efficacité et sens ${niv(sr.C).mot}.`,
      corps: `<div class="rp-duo"><div>${jauges(sr)}<p class="rp-legende">Les pointillés marquent les seuils de lecture (6, 12 et 18 sur 24).</p></div>
        <div>${r.modelReadings[0].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${sr.B.score >= 7 ? `<p class="rp-cle"><b>La distance n'est pas un défaut d'attitude.</b> La distance peut avoir plusieurs fonctions : protection, désengagement ou symptôme. Ces questions ne permettent pas de trancher seules.</p>` : ""}</div></div>
        <h4 class="rp-h">Distance mentale ${tag(sr.B)}</h4>${reponses(sr.B, sec.B, ratingLabels, r)}
        <h4 class="rp-h">Perte d'efficacité et de sens ${tag(sr.C)}</h4>
        <p>La partie C mêle deux choses : l'<b>efficacité perçue</b> (C1, C2, C4, C6 : ${MOTS[nv24(relatif24(efficacite, 16))]}, ${efficacite}/16) et le <b>sens</b> (C3, C5 : difficultés de sens ${MOTSF[nv24(relatif24(perteSens, 8))]}, ${perteSens}/8). Le sens et l’utilité sont explorés à part du questionnaire satirique : <button type="button" class="rp-lien" data-aller="absurde">${esc(bsTitre.toLowerCase())}</button>.</p>
        ${reponses(sr.C, sec.C, ratingLabels, r)}`,
      comprendre: pourComprendre("D'où viennent les trois jauges", `<p>Maslach et Jackson ont construit en 1981 le Maslach Burnout Inventory autour de trois dimensions : épuisement émotionnel, dépersonnalisation (devenue « cynisme »), accomplissement personnel réduit. Schaufeli et ses collègues ont proposé en 2020 le Burnout Assessment Tool, qui garde l'épuisement et la distance mentale et ajoute les altérations cognitives (attention, mémoire : A6) et émotionnelles (irritabilité : A5).</p><p>Les questions de Bull-Out reprennent ces dimensions avec des formulations nouvelles. Elles n'ont pas les propriétés mesurées de ces outils : on lit des tendances, pas un score normé.</p>`, chapLien(2)),
      garder: "Les jauges disent ce que tu ressens. La suite cherche d'où cela vient : ce que le travail te demande, et ce qui t'aide à le faire."
    },
    {
      id: "balance", chap: 3, titre: "La balance", q: "Quelles exigences rencontres-tu, et sur quelles ressources peux-tu compter ?",
      intro: "Le modèle Exigences-Ressources (JD-R, Demerouti et Bakker, 2001) pose les exigences du travail (D) sur un plateau et les ressources (E) sur l'autre. Le modèle décrit des processus liés aux contraintes et aux ressources, sans supposer que leurs scores s'annulent mathématiquement.",
      bref: lectureBalance,
      corps: `<div class="rp-duo"><div>${balance(sr.D.score, ressources, 24, "Exigences", "Ressources", `Balance : exigences ${sr.D.score}, ressources ${ressources} sur 24`)}<p class="rp-legende">Les ressources sont tes réponses E telles quelles (plus elles sont présentes, plus le plateau est lourd). Dans le score « Manque de ressources », elles sont comptées à l'envers.</p></div>
        <div>${r.modelReadings[1].lines.map((l) => `<p>${esc(l)}</p>`).join("")}</div></div>
        <h4 class="rp-h">Exigences ${tag(sr.D)}</h4>${reponses(sr.D, sec.D, ratingLabels, r)}
        <h4 class="rp-h">Manque de ressources ${tag(sr.E)}</h4>${reponses(sr.E, sec.E, ratingLabels, r)}${grilleRPS}`,
      comprendre: pourComprendre("Pourquoi les ressources comptent autant que la charge", `<p>Karasek (1979) a montré que la tension au travail vient de la combinaison d'une forte demande et d'une faible latitude de décision ; le soutien social a ensuite été ajouté comme troisième facteur. Le modèle JD-R généralise : toute exigence coûte de l'énergie, toute ressource (autonomie, soutien, clarté, reconnaissance) aide à y faire face et protège de l'usure.</p><p>En pratique, plusieurs leviers peuvent être étudiés : réduire des contraintes, restaurer de l’autonomie ou améliorer les moyens. Leur efficacité dépend du travail réel ; elle ne se déduit pas d’une différence entre scores.</p>`, chapLien(3)),
      garder: "La balance aide à distinguer des expositions et des ressources, pas à calculer une compensation. La lecture de Siegrist examine ensuite l’effort et les récompenses."
    },
    {
      id: "retour", chap: 4, titre: "Le retour", q: "Ce que tu reçois est-il à la hauteur de ce que tu donnes ?",
      intro: "Le modèle de Johannes Siegrist (ERI, 1996) compare l'effort fourni et ce qui revient : l'estime, le salaire, les perspectives et la sécurité de l'emploi. Il ajoute le surengagement : du mal à refuser, à décrocher, le besoin de prouver sa valeur.",
      bref: `${lectureRetour}${lectureSur ? ` ${lectureSur}` : ""}`,
      corps: `<div class="rp-duo"><div>${balance(effort, retour, 24, "Effort", "Récompense", `Bascule : effort ${effort}, récompense ${retour} sur 24`)}<p class="rp-legende">Effort : D1, D4 et D6. Récompense : E5 et E6 (estime, équité), R1 à R3 (salaire, perspectives, sécurité). Moyennes ramenées sur 24 pour être comparables.</p></div>
        <div>${carte(`Surengagement ${`<span class="rp-niv n${nv24(surengagement)}">${MOTS[nv24(surengagement)]}</span>`}`, `<p>${surengagement}/24, d'après R4 à R6 (refuser, prouver, penser au travail dès le réveil) et F1 (ruminer le soir).${lectureSur ? "" : " Ce groupe de questions ne fait pas ressortir de surengagement fréquent."}</p>`)}
        ${r.modelReadings[2].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${recompIds.filter((id) => id.startsWith("R") && rep[id].value <= 1).length ? `<p class="rp-cle"><b>Ce qui manque le plus en retour :</b> ${esc(liste(recompIds.filter((id) => id.startsWith("R") && rep[id].value <= 1).map((id) => ({ R1: "le salaire", R2: "les perspectives", R3: "la sécurité de l'emploi" })[id])))}. L'estime ne compense pas tout : on peut aussi négocier ces formes de retour.</p>` : ""}</div></div>
        <h4 class="rp-h">L'effort et l'estime</h4><ol class="rp-items">${["D1", "D4", "D6", "E5", "E6", "F1"].map((id) => { const a = item(id); return `<li class="${a.riskScore >= 3 ? "haut" : ""}"><span class="rp-id">${id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.riskScore)}<span>${esc(ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, ""))}${id.startsWith("E") ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>
        <h4 class="rp-h">${esc(exchangePart.title)}</h4><ol class="rp-items">${(r.exchangeAnswers || []).map((a, k) => { const risque = k < 3 ? 4 - a.value : a.value; return `<li class="${risque >= 3 ? "haut" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(risque)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}${k < 3 ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>`,
      comprendre: pourComprendre("Effort, récompense, surengagement", `<p>Dans le modèle ERI, le risque pour la santé monte quand un effort élevé rencontre une récompense faible. Siegrist distingue trois formes de récompense : l'<b>estime</b>, le <b>salaire</b>, et les <b>perspectives avec la sécurité de l'emploi</b>. Il ajoute un trait de la personne, le <b>surengagement</b> : ne pas savoir refuser, ne pas décrocher, vouloir prouver. Ce n'est pas un défaut : c'est souvent ce qui fait tenir, et ce qui cache le problème jusqu'à ce qu'il éclate.</p><p>Le questionnaire de Siegrist compte 23 questions et calcule un ratio. Bull-Out en garde douze repères (D1, D4, D6, E5, E6, F1, R1 à R6) : c'est une piste de lecture, pas le calcul d'origine.</p>`, chapLien(4)),
      garder: "Les quatre premières pièces lisent tes réponses notées. La suivante ajoute ce qui se passe autour, et qui change la lecture."
    },
    {
      id: "contexte", chap: 5, titre: "Le contexte", q: "Qu'est-ce qui, autour de toi, change la lecture du résultat ?",
      intro: "Ces réponses n'entrent pas dans le score. Elles évitent deux pièges : tout mettre sur le dos du « perso », ou lire comme individuel un problème partagé par l'équipe.",
      bref: ctxOui.length ? `Tu signales : ${liste(ctxOui.map((a) => a.label.toLowerCase()))}.` : "Tu ne signales aucun élément de contexte particulier.",
      corps: `${ctxOui.length ? `<ul class="rp-ctx">${ctxOui.map((a) => `<li><b>${esc(a.label)}</b><span>${esc(a.text)}</span></li>`).join("")}</ul>` : "<p>Aucun élément de la liste. Cela n'exclut pas qu'un contexte non listé compte.</p>"}
        ${ctxOui.some((a) => a.id === "personalBurden") ? `<p class="rp-cle"><b>Une situation personnelle lourde n'efface pas le travail.</b> Les deux s'additionnent : regarde quand même la balance et le retour (pièces 3 et 4).</p>` : ""}
        ${ctxOui.some((a) => a.id === "harassment") ? `<p class="rp-cle"><b>Harcèlement, humiliations ou violences :</b> Bull-Out ne l'évalue pas. Note les faits (dates, mots, témoins) et parles-en au médecin du travail ou aux représentants du personnel.</p>` : ""}
        <div class="rp-duo rp-signal"><div class="${ctxOui.some((a) => a.id === "collectiveSignal") ? "" : "actif"}">${carte("Lecture d'abord individuelle", "<p>Tes réponses décrivent ta situation. Si tu découvres que d'autres vivent la même chose, la lecture devient collective.</p>")}</div>
        <div class="${ctxOui.some((a) => a.id === "collectiveSignal") ? "actif" : ""}">${carte("Signal collectif", "<p>Plusieurs personnes touchées sur les mêmes points (surcharge, flou, manque de ressources) : c'est l'organisation du travail qui parle, pas une somme de fragilités.</p>")}</div></div>`,
      comprendre: pourComprendre("Le piège du « c'est perso »", `<p>La Haute Autorité de santé (2017) recommande de rechercher les facteurs professionnels et extra-professionnels, sans que l'un excuse l'autre. En prévention, l'INRS rappelle que les risques psychosociaux se traitent d'abord par l'organisation du travail : une action individuelle ne suffit pas quand la cause est collective.</p>`, chapLien(5)),
      garder: "Tu as maintenant les pièces une à une. L'étape suivante les remet côte à côte, avec les scores et leur façon de les lire."
    },
    {
      id: "dimensions", chap: 6, titre: "Les dimensions", q: "Que valent ces scores, et comment les lire ?",
      intro: "Six dimensions, chacune sur 24 (six questions de 0 à 4). On les lit une par une : un total cache plus qu'il ne montre.",
      bref: `${r.dominantDimensions.length ? `Ce qui ressort : ${liste(r.dominantDimensions.map((d) => `${NOMS[d.id].toLowerCase()} (${niv(d).mot})`))}.` : ""} Lecture d'ensemble : ${esc(r.profile.title.toLowerCase())}.`,
      corps: `<table class="rp-table"><thead><tr><th scope="col">Dimension</th><th scope="col">Score</th><th scope="col">Lecture</th><th scope="col" class="rp-col-barre">Sur 24</th></tr></thead><tbody>
        ${sections.map((s) => { const d = sr[s.id]; return `<tr><th scope="row"><span class="rp-id">${s.id}</span> ${NOMS[s.id]}<small>${s.type === "symptoms" ? "signe d'usure" : s.type === "work" ? "travail" : "récupération"}</small></th><td>${d.score}</td><td>${tag(d)}</td><td class="rp-col-barre"><span class="rp-barre"><i style="width:${d.percent}%;background:${COUL[niv(d).n]}"></i>${[25, 50, 75].map((p) => `<b style="left:${p}%"></b>`).join("")}</span></td></tr>`; }).join("")}
        </tbody></table>
        <p class="rp-legende">Seuils : 0 à 6 bas, 7 à 12 à surveiller, 13 à 18 élevé, 19 à 24 très élevé. Ce sont des repères de lecture fixés par Bull-Out (quarts de l'échelle), pas des normes établies sur une population.</p>
        <div class="rp-duo">${carte("Lecture d'ensemble", `<p><b>${esc(r.profile.title)}.</b> ${esc(r.summary)}</p>`)}
        ${carte("Pourquoi le total ne sert pas de diagnostic", `<p>Le total brut A–F est calculable, mais il mélange des manifestations (A, B, C, F) et des conditions de travail (D, E). Il ne représente ni un risque clinique, ni une énergie, ni une grandeur valide à comparer seule dans le temps. Observe les <b>six dimensions séparément</b> et les faits associés.</p>`)}</div>
        <h4 class="rp-h">Les réponses les plus hautes</h4>
        ${r.topItems.length ? `<ol class="rp-top">${r.topItems.map((a) => `<li><p><b>${esc(cap(a.humanLabel))}</b> <span class="rp-id">${a.id}</span> ${jauge(a.riskScore)}</p><p class="rp-q">${esc(a.question)}</p><p><b>Piste :</b> ${esc(a.action)}</p></li>`).join("")}</ol>` : "<p>Aucune réponse à 3 ou 4 : pas de signal fort isolé.</p>"}`,
      comprendre: pourComprendre("Ce que vaut un score de questionnaire", `<p>Un questionnaire validé a été testé : ses questions mesurent-elles la même chose (fidélité) ? Mesure-t-il ce qu'il prétend (validité) ? À partir de quel score s'inquiéter (normes) ? Même ces outils ne posent pas de diagnostic : seuls un entretien et un examen le font.</p><p>Le questionnaire Bull-Out n'a pas encore été testé de cette façon. Ses scores servent à repérer ce qui ressort et à en parler, pas à te comparer aux autres. Un score bas n'exclut pas un problème si ton sommeil, ton humeur ou ta sécurité se dégradent.</p>`, chapLien(6)),
      garder: "Les réponses donnent des indices, pas des normes individuelles. Il reste à choisir quoi vérifier et comment agir."
    },
    {
      id: "plan", chap: 7, titre: "Le plan", q: "Que faire dans les 72 heures, puis dans les deux semaines ?",
      intro: "On commence par le travail réel : retirer, reporter, simplifier. Optimiser sa respiration ne règle pas une surcharge non arbitrée. Choisis une ou deux actions, pas douze.",
      bref: `D'abord : ${esc(liste(r.actions.slice(0, 2).map((a) => a.title.toLowerCase())))}.${forts.length || ressPresentes.length ? ` Pour le mener, appuie-toi sur ${esc(liste([...forts.slice(0, 2).map((a) => APPUIS[a.id][1].toLowerCase()), ...ressPresentes.slice(0, 1).map((id) => RESSOURCES[id][0].toLowerCase())]))}.` : ""}`,
      corps: `<h4 class="rp-h">Actions prioritaires</h4><ol class="rp-actions">${r.actions.map((a) => `<li><b>${esc(a.title)}</b><span>${esc(a.text)}</span></li>`).join("")}</ol>
        <h4 class="rp-h">Les 72 prochaines heures</h4><div class="rp-grille4">${r.plans.plan72h.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        <h4 class="rp-h">Dans deux semaines</h4><div class="rp-duo">${r.plans.twoWeeks.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        <p class="rp-carnet-lien"><button type="button" class="button secondary" data-aller="carnet">Préparer mon carnet de suivi sur deux et quatre semaines</button></p>
        <div class="rp-trajet"><p><b>Si certaines réponses évoluent :</b> recherche les situations concrètes qui ont changé. Une amélioration après une action ne prouve pas, à elle seule, son efficacité.</p><p><b>Si des difficultés persistent :</b> examine séparément les exigences, les ressources et le retentissement sur ta santé.</p><p><b>Si la sécurité ou le fonctionnement se dégradent :</b> demande un avis de santé adapté, sans attendre un nouveau score.</p></div>`,
      comprendre: pourComprendre("Pourquoi commencer par le travail", `<p>Les recommandations de prévention (INRS) classent les actions : <b>primaire</b>, agir sur les causes (charge, organisation) ; <b>secondaire</b>, aider les personnes à faire face ; <b>tertiaire</b>, soigner et accompagner le retour. Les plus efficaces sur la durée sont primaires. Le chapitre 7 donne des phrases prêtes à l'emploi pour demander un arbitrage.</p>`, chapLien(7)),
      garder: "Une demande compte davantage quand elle laisse une trace. La pièce suivante t'aide à l'écrire."
    },
    {
      id: "traces", chap: 8, titre: "Les traces", q: "Comment garder une trace utile, sans parler de ta santé ?",
      intro: "Ce qui protège, toi comme ton manager, c'est d'avoir agi et de pouvoir le montrer : des faits, des dates, des demandes précises. Jamais tes scores ni ta santé.",
      bref: faits.length ? `Ta trace peut s'appuyer sur ${faits.length} fait${faits.length > 1 ? "s" : ""} de travail tiré${faits.length > 1 ? "s" : ""} de tes réponses, et une demande : ${esc(demande)}.` : `Aucun fait de travail ne ressort fortement ; un journal de bord court suffit pour l'instant.`,
      corps: `<div class="rp-duo">${carte("Ce que tu écris", ul(["des faits de travail datés : volumes, délais, urgences, demandes contradictoires", "ce que tu as demandé, à qui, quand", "les réponses obtenues, ou leur absence"]), "fort")}
        ${carte("Ce que tu n'écris pas", ul(["tes scores ou ce rapport", "un diagnostic, tes symptômes, tes traitements", "des jugements sur les personnes"]), "levier")}</div>
        <h4 class="rp-h">Un brouillon de demande écrite, à partir de tes réponses</h4>
        <p class="rp-legende">À adapter : complète les crochets avec des dates et des exemples précis. Il ne contient aucune information de santé.</p>
        <pre class="rp-trace" id="rp-trace">${esc(brouillon)}</pre>
        <p><button type="button" class="button secondary" data-copier-trace>Copier le brouillon</button></p>
        <div class="rp-cle"><b>Ton journal de bord.</b> Chaque semaine, deux lignes : ce qui s'est passé (date, tâche, volume) et ce que tu as demandé. Garde-le pour toi, hors de la messagerie professionnelle. Le jour où il faut en parler, il évite la « parole contre parole ».</div>`,
      comprendre: pourComprendre("Ce que dit la loi", `<p>L'employeur a une <b>obligation de sécurité</b> : il doit prévenir les risques pour la santé physique et mentale, pas seulement réparer (article L4121-1 du Code du travail), en agissant d'abord sur l'organisation du travail (L4121-2). Il échappe à sa responsabilité s'il <b>prouve</b> avoir pris les mesures nécessaires (Cour de cassation, 2015). Une surcharge connue et laissée sans réponse peut suffire, même sans harcèlement. Les risques psychosociaux doivent figurer dans le document unique d'évaluation des risques, que tu peux demander à consulter.</p><p>Ce n'est pas un conseil juridique personnalisé : pour une situation précise, un représentant du personnel, l'inspection du travail ou un avocat peuvent t'aider.</p>`, chapLien(8)),
      garder: "Une trace se lit mieux à deux. Dernière pièce : à qui en parler."
    },
    {
      id: "portes", chap: 9, titre: "Les portes", q: "À qui en parler, et pour quoi faire ?",
      intro: "Chaque interlocuteur ouvre une porte différente : soin, santé au travail, arbitrage de la charge, appui collectif. Les informations médicales restent chez les soignants ; ton manager n'a pas à connaître tes scores.",
      bref: `Proposés d'après tes réponses : ${esc(liste(r.stakeholderRecommendations.map((x) => minus(x.stakeholder.name))))}.`,
      corps: `<div class="rp-portes">${r.stakeholderRecommendations.map((x) => carte(esc(x.stakeholder.name), `<p class="rp-pourquoi">${esc(x.why)}</p><p><b>Son rôle :</b> ${esc(x.stakeholder.shortRole)}</p><p class="rp-phrase">« ${esc(x.stakeholder.script)} »</p><a href="agir.html${x.stakeholder.anchor}">Fiche détaillée</a>`, x.key === "emergency" ? "urgence" : "")).join("")}</div>
        <p class="rp-urgences"><b>Toujours valable :</b> idées suicidaires, <a href="tel:3114">3114</a> (gratuit, 24 h/24). Danger immédiat : <a href="tel:15">15</a> ou <a href="tel:112">112</a>.</p>`,
      comprendre: pourComprendre("Ce que peut faire le médecin du travail", `<p>Le médecin du travail est tenu au secret médical vis-à-vis de l'employeur. Tu peux le voir à ta demande, sans passer par ton manager. Il peut proposer des aménagements de poste ou de temps de travail, et alerter sur des risques collectifs sans révéler ce que tu lui as dit.</p>`, chapLien(9)),
      garder: "Garde ce rapport et refais le questionnaire dans deux à quatre semaines : c'est la trajectoire qui compte."
    }
  ];

  // ───────── Le bullshitomètre : la satire d'un côté, la lecture sérieuse de l'autre
  const bsAxes = {
    meeting: {title:"Réunionite",punch:"Une réunion n'est pas une décision. Même avec un ordre du jour en Comic Sans.",
      question:"À quelle décision précise doit aboutir cette réunion, et qui en est responsable ?"},
    dashboard: {title:"Dashboardologie",punch:"Quand un indicateur ne change aucune décision, c'est parfois juste une veilleuse pour comité.",
      question:"Quelle décision ce KPI permet-il réellement de prendre ou de modifier ?"},
    ghost: {title:"Contribution fantôme",punch:"Un livrable qui dort sur SharePoint n'est pas un actif stratégique. C'est un fossile numérique.",
      question:"Qui se sert de ce livrable et qu'est-ce que son contenu change concrètement ?"}
  };
  const bsAngle = bs.dominantTheme ? bsAxes[bs.dominantTheme] : null;
  const bsEtude = bsMatrice || {
    key:caseBS, title:bsTitre,interpretation:bsTexte,
    joke:"Le Comité scientifique du PowerPoint demande un nouveau comité.",
    question:"Quelles situations concrètes se cachent derrière les réponses choisies ?",
    qualityPrevented:qualiteEmpechee >= 3
  };
  const profilBS = bs.profil || {titre:"",texte:"",survie:"",phrase:""};
  const satire = `<details class="rp-bs-satire" open>
    <summary>Verdict du ministère des livrables à utilité variable <span>— humour assumé</span></summary>
    <div class="rp-bs-satire-inner"><p class="k">Ton profil administratif imaginaire</p>
      <h4>${esc(cap(profilBS.titre))}</h4><p>${esc(profilBS.texte)}</p>
      <p><b>Manuel de survie satirique :</b> ${esc(profilBS.survie)}</p>
      <blockquote>« ${esc(profilBS.phrase)} »</blockquote>
      <p class="rp-bs-humour-limite">Cette satire n'est ni un diagnostic, ni un conseil médical, ni une mesure de ta capacité à faire face. Tu peux replier cette section.</p>
    </div></details>`;
  const grilleCase = (key, titre, texte, cls) => `<div class="rp-bs-case ${cls}${key === bsEtude.key ? " ici" : ""}">
    <b>${titre}</b><span>${texte}</span>${key === bsEtude.key ? '<em>Ta situation dans cette grille</em>' : ""}</div>`;
  const dimensionsBS = (bsDims || []).map(([key,label]) => {
    if (key === "absurd") return "";
    return `<div><span>${esc(label)}</span><span class="rp-barre"><i style="width:${bs.dims[key] || 0}%;background:${C.orange}"></i></span>
      <b>${bs.dims[key] || 0} %</b></div>`;
  }).join("");
  const exemplesBS = (bs.highlights || []).length
    ? `<div class="rp-bs-exemples"><h4>Deux absurdités qui ressortent de tes réponses</h4>
      <ul>${bs.highlights.map(a => `<li><span class="rp-id">${esc(a.id)}</span>
        <span><b>${esc(a.question)}</b><small>« ${esc(a.answer)} »</small></span></li>`).join("")}</ul></div>`
    : `<p class="rp-bs-exemples">Peu d'options particulièrement absurdes sont cochées. Cela n'invalide pas les autres questions.</p>`;
  const reaction = r.humorReaction;
  const reactionPanel = !reaction
    ? ""
    : reaction.skipped
      ? `<section class="rp-bs-reaction" aria-label="Réaction à l'humour">
          <p class="k">Ta réaction à la pause humour</p>
          <h4>Tu as préféré ne pas répondre</h4>
          <p>Cette partie n'entre pas dans les scores. Aucun ressenti ne t'est attribué.</p>
        </section>`
      : `<section class="rp-bs-reaction" aria-labelledby="rp-bs-reaction-title">
          <p class="k">Une autre lecture, indépendante de l'indice de bullshit</p>
          <h4 id="rp-bs-reaction-title">Et toi, comment as-tu vécu ces blagues ?</h4>
          <p>Rire, ressentir de la peine, avoir l'impression que des difficultés sont minimisées et prendre du recul peuvent coexister. Chaque ressenti est interrogé séparément.</p>
          <div class="rp-bs-reaction-grid">${reaction.answers.map((a) =>
            `<div><b>${esc(a.question)}</b><span>${esc(a.answer || "Non renseigné")}</span></div>`).join("")}</div>
          ${reaction.interpretation ? `<div class="rp-bs-reaction-lecture">
            <h5>${esc(reaction.interpretation.title)}</h5>
            <p>${esc(reaction.interpretation.text)}</p></div>` : ""}
          <p class="rp-bs-pc-explain"><b>Ce que cela montre :</b> la façon dont tu déclares avoir reçu ce questionnaire, à cet instant.
            <b>Ce que cela ne démontre pas :</b> que l'humour te protège durablement, que tu relativises habituellement ou qu'une blague explique ton état de santé.</p>
        </section>`;
  const pageAbsurde = bs.skipped ? {
    titre:"La pause bullshit, à ton rythme",
    q:"Cette sauvegarde ne contient pas de réponses aux questions satiriques.",
    intro:"Elle date d'une version où la pause humour pouvait être passée. Ton rapport sur les manifestations, le travail, les appuis et la chronologie n'en dépend pas.",
    bref:"Bullshitomètre passé · aucun indice calculé.",
    corps:`<p>Aucun pourcentage, profil satirique ou croisement avec la distance n'a été calculé.
      <b>Tu peux revenir plus tard pour répondre aux douze questions.</b></p>`,
    comprendre:"",
    garder:"On peut discuter des absurdités du travail sans passer un test humoristique."
  } : {
    titre:"Le bullshitomètre",
    q:"Ton travail est-il absurde ? Et que devient ton rapport à ce travail ?",
    intro:"Douze questions satiriques sur les réunions, les indicateurs, le flou et les livrables que personne ne lit. Puis une matrice pour mettre ces réponses en regard de la distance mentale et du sens. L'humour est volontaire ; la conclusion psychologique ne l'est pas.",
    bref:`Indice satirique d'absurdité : ${bs.percent} % du barème maison. ${esc(bsEtude.title)}. Les axes ne sont pas des seuils cliniques.`,
    corps:`<div class="rp-bs-duo">
      <section class="rp-bs-score" aria-label="Indice humoristique">
        <p class="rp-bs-overline">Service des absurdités administratives</p>
        <p class="rp-bs-pc">${bs.percent}<small> %</small></p>
        <p class="k">Indice satirique d'absurdité</p>
        <p class="rp-bs-pc-explain">Ce pourcentage représente la position dans un barème humoristique construit pour ce questionnaire. Il ne mesure ni la proportion de travail inutile ni le risque de burn-out.</p>
        <div class="rp-bs-metres">${dimensionsBS}</div>
        <p class="rp-bs-pc-explain">La barre « Absurdité globale » correspond exactement à l'indice ci-dessus. Les autres barres détaillent trois formes de situations rapportées.</p>
      </section>
      ${satire}
    </div>
    ${exemplesBS}
    ${reactionPanel}
    <section class="rp-bs-matrice" aria-label="Matrice : absurdité perçue, distance et sens">
      <p class="k">La matrice du bullshit</p>
      <h4>Le paradoxe intéressant : absurdité ne veut pas forcément dire désengagement</h4>
      <p>On croise deux axes qui ne mesurent pas la même chose : à la verticale, les choix satiriques ; à l'horizontale, la distance (B) ou les difficultés de sens (C3 et C5) déclarées sérieusement.</p>
      <div class="rp-bs-grille" role="group" aria-label="Quatre situations descriptives">
        <span></span><span class="h">Distance / sens peu marqués</span><span class="h">Distance ou sens marqués</span>
        <span class="v">Absurdité haute</span>${grilleCase("hb",CASES.hb[0],CASES.hb[1],"g")}${grilleCase("hh",CASES.hh[0],CASES.hh[1],"o")}
        <span class="v">Absurdité basse</span>${grilleCase("bb",CASES.bb[0],CASES.bb[1],"g")}${grilleCase("bh",CASES.bh[0],CASES.bh[1],"p")}
      </div>
      <article class="rp-bs-matrice-lecture">
        <p class="k">Dans tes réponses</p><h5>${esc(bsEtude.title)}</h5>
        <p class="rp-bs-matrice-blague">${esc(bsEtude.joke)}</p>
        <p>${esc(bsEtude.interpretation)}</p>
        <p><b>Une question utile :</b> ${esc(bsEtude.question)}</p>
        ${bsEtude.qualityPrevented ? `<p><b>À rapprocher de la qualité empêchée :</b> tu déclares aussi des difficultés à réaliser un travail de la qualité voulue (T4). Les deux réponses se complètent, mais ce ne sont pas deux preuves du même mécanisme.</p>` : ""}
      </article>
      <p class="rp-bs-pc-explain">Grille exploratoire : l'absurdité est dite « haute » à partir de 50 % du barème satirique ; la distance à partir de 13/24 ou les difficultés de sens à partir de 5/8. Ces coupures sont des conventions de présentation, sans étalonnage. La grille ne mesure ni la fonction de l'humour, ni une causalité.</p>
    </section>
    ${bsAngle ? `<section class="rp-bs-levier"><p class="k">Le thème satirique qui ressort le plus</p>
      <h4>${esc(bsAngle.title)}</h4><p>${esc(bsAngle.punch)}</p>
      <p><b>Question anti-bullshit :</b> ${esc(bsAngle.question)}</p></section>` : ""}
    <details class="rp-bs-reponses"><summary>Retrouver mes 12 réponses satiriques</summary>
      <ol class="rp-items">${bs.answers.map(a=>`<li><span class="rp-id">${esc(a.id)}</span>
      <span class="rp-q">${esc(a.question)}</span><span class="rp-a"><span>${esc(a.answer)}</span></span></li>`).join("")}</ol>
    </details>`,
    comprendre:pourComprendre("Du bullshit aux conditions de travail : ce qu'on peut vraiment conclure",
      `<p>David Graeber (2018) a popularisé la notion de « bullshit jobs », qui critique les activités considérées comme inutiles par ceux qui les exercent. Soffia, Wood et Burchell (2022) trouvent une association entre le sentiment d'inutilité du travail et le mal-être, mais contestent les grandes conclusions causales et quantitatives de Graeber.</p>
      <p>Dans les six familles de risques psychosociaux décrites par l'INRS, le sens et la qualité empêchée rejoignent les conflits de valeurs. Une activité absurde ou un indicateur inutile peut être une situation organisationnelle à discuter ; un score satirique ne prouve pas que le poste est objectivement inutile.</p>
      <p>L'étude de Martin et collègues (2003) distingue plusieurs <b>usages de l'humour</b> associés différemment au bien-être. Bull-Out te demande maintenant comment tu as reçu ces questions sur le moment : amusement, malaise, impression de minimisation et recul ressenti. Ce retour ponctuel ne mesure ni ton usage habituel de l'humour, ni son éventuel effet protecteur sur ta santé.</p>
      <p>Références : <a href="https://doi.org/10.1177/09500170211015067" target="_blank" rel="noopener">Soffia et al., 2022</a> ; <a href="https://doi.org/10.1016/S0092-6566(02)00534-2" target="_blank" rel="noopener">Martin et al., 2003</a> ; <a href="https://www.inrs.fr/risques/psychosociaux/facteurs-risques" target="_blank" rel="noopener">INRS</a>.`,chapLien(2)),
    garder:"Ce qui fait rire mérite parfois une vraie question : quelle décision, quelle utilité, quels moyens et quel arbitrage ?"
  };

  // ───────── Modèles de lecture personnalisée (faits, limites, actions)
// Synthèse : partir des réponses individuelles, pas d'un score global ou d'un verdict.
  const frequences = (a) => ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, "");
  const principaux = (ids, limite = 2) => r.answers
    .filter((a) => ids.includes(a.sectionId) && a.riskScore >= 3)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, limite);
  const manifs = principaux(["A", "B", "C", "F"]);
  const travailRessort = principaux(["D", "E"]);
  const appuisRessort = (r.strengthAnswers || []).filter((a) => a.value >= 3).slice(0, 2);
  const place = (items, vide) => items.length
    ? `<ul class="rp-faits">${items.map((a) => `<li><span class="rp-id">${esc(a.id)}</span><span>${esc(a.question)}<small>Réponse : <b>${esc(frequences(a))}</b></small></span></li>`).join("")}</ul>`
    : `<p class="rp-lecture-vide">${vide}</p>`;
  const lectureCard = (num, titre, texte, preuve, limite) => `<article class="rp-lecture-card">
    <span class="rp-lecture-num" aria-hidden="true">${num}</span><h3>${titre}</h3><p>${texte}</p>
    ${preuve}<p class="rp-lecture-limite"><b>Ce que cela ne prouve pas :</b> ${limite}</p></article>`;
  const lecturePersonne = lectureCard("01", "Ce que tu vis",
    "Épuisement, distance au travail, efficacité, sens et santé sont examinés, sans les confondre.",
    place(manifs, "Aucune manifestation n'a reçu « souvent » ou « presque toujours » dans ces quatre parties."),
    "ni un diagnostic, ni une origine exclusivement professionnelle.");
  const lectureTravail = lectureCard("02", "Ce que tu décris au travail",
    "Les exigences et les ressources sont séparées des manifestations personnelles.",
    place(travailRessort, "Aucune contrainte fréquente ni ressource fortement manquante n'est déclarée dans les items D/E."),
    "que ces conditions expliquent à elles seules les difficultés ressenties.");
  const lectureAppui = lectureCard("03", "Ce sur quoi tu peux t'appuyer",
    "Les ressources déclarées ne compensent pas mathématiquement les exigences.",
    appuisRessort.length
      ? `<ul class="rp-faits">${appuisRessort.map((a) => `<li><span class="rp-id">${esc(a.id)}</span><span>${esc(a.question)}<small>Réponse : <b>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</b></small></span></li>`).join("")}</ul>`
      : `<p class="rp-lecture-vide">Aucun appui personnel n'est coché fréquemment parmi les six questions G. Cela n'exclut pas d'autres ressources.</p>`,
    "qu'un appui suffit à résoudre une contrainte organisationnelle.");

  // Fiche de discussion sur les conditions de travail : ne jamais y placer des réponses de santé.
  // Les questions D/E sont des déclarations subjectives que la discussion doit confronter au travail réel.
  const dFaits = r.answers.filter((a) => a.sectionId === "D" && a.riskScore >= 3).slice(0, 4);
  const eFaits = r.answers.filter((a) => a.sectionId === "E" && a.riskScore >= 3).slice(0, 3);
  const prouverAuTravail = (items, vide) => items.length
    ? `<ul class="rp-travail-faits">${items.map((a) => `<li><span class="rp-id">${esc(a.id)}</span>${esc(a.question)} <small>Réponse au questionnaire : ${esc(frequences(a))}</small></li>`).join("")}</ul>`
    : `<p>${vide}</p>`;
  const demandeOrganisation = item("D3").riskScore >= 3 || item("E2").riskScore >= 3
    ? "Quelles priorités peuvent être arbitrées explicitement, et qui décide de ce qui attend ?"
    : item("D1").riskScore >= 3
      ? "Quelle charge est réalisable dans le temps disponible ? Quelles tâches retirer, reporter ou simplifier ?"
      : item("D6").riskScore >= 3
        ? "Quels dysfonctionnements peuvent être corrigés pour ne plus dépendre d'une compensation individuelle ?"
        : "Quels sont les objectifs prioritaires, les ressources disponibles et les modalités d'arbitrage ?";
  const ficheTravail = `<header class="rp-travail-head"><p class="rp-n">Document facultatif · conditions de travail</p>
      <h2 tabindex="-1">Préparer une discussion sur le travail réel</h2><p>Cette fiche reprend <b>uniquement des réponses relatives aux conditions de travail</b>. Ni les questions de santé, ni les alertes, ni les consommations, ni les événements personnels, ni les scores ne sont reproduits.</p></header>
    <section class="rp-travail-bloc"><h3>Contraintes à vérifier</h3>${prouverAuTravail(dFaits, "Aucune contrainte de cette liste n'a été déclarée « souvent » ou « presque toujours ». Cela n'exclut pas d'autres situations.")}</section>
    <section class="rp-travail-bloc"><h3>Ressources à examiner</h3>${prouverAuTravail(eFaits, "Aucun manque de ressource n'est particulièrement déclaré parmi les six éléments explorés.")}</section>
    ${qualiteEmpechee !== null ? `<section class="rp-travail-bloc"><h3>Qualité du travail empêchée</h3><p>Réponse à l'item T4 : <b>${esc(repere("T4").answer)}</b>.</p><p>À préciser à partir d'un exemple : qualité souhaitée, moyens nécessaires et contraintes constatées. Il ne s'agit pas d'une mesure objective.</p></section>` : ""}
    <section class="rp-travail-demande"><h3>Proposition de question pour la discussion</h3><p><b>${esc(demandeOrganisation)}</b></p>
      <p>Pour éclairer la discussion, ajouter un exemple vérifiable : <b>tâche, date, conséquence et arbitrage demandé</b>. Le questionnaire recueille un ressenti, pas une enquête sur les faits.</p></section>
    <p class="rp-travail-prive">Document préparatoire volontaire. Il ne constitue ni un diagnostic ni une évaluation du salarié. Le partage du rapport personnel complet n'est pas requis pour discuter des conditions de travail.</p>`;

  // ───────── Synthèse
  const synCartes = [
    ["Tes réponses", L.fiable ? "Réponses variées" : "Réponses peu différenciées", `Sur les quatre dernières semaines.${L.paires.length ? ` ${L.paires.length} point${L.paires.length > 1 ? "s" : ""} à clarifier (annexe 1).` : ""}`, "annexes"],
    ["L'usure", coeurHauts.length ? liste(coeurHauts.map((d) => `${NOMS[d.id].toLowerCase()} (${niv(d).mot})`)) : "Pas de jauge haute", lectureUsure, "jauges"],
    ["Le travail", penche >= 4 ? "La balance penche du côté des exigences" : penche <= -4 ? "Ressources davantage déclarées" : "Scores proches, sans compensation démontrée", lectureBalance, "balance"],
    ["La récupération", `${cap(niv(sr.F).mot)} (${sr.F.score}/24)`, `${esc(sr.A.comment)} ${esc(sr.F.comment)}`, "batterie"],
    ["L'absurde", bs.skipped ? "Pause humour passée" : `${bsMatrice?.title || bsTitre} · ${bs.percent} %`, bs.skipped ? "Partie satirique non renseignée (ancienne sauvegarde)." : (bsMatrice?.interpretation || bsTexte), "absurde"],
    ["Tes appuis", forts.length ? liste(forts.slice(0, 3).map((a) => APPUIS[a.id][0].toLowerCase())) : ressPresentes.length ? cap(liste(ressPresentes.slice(0, 2).map((id) => RESSOURCES[id][0].toLowerCase()))) : "À reconstruire", forts.length || ressPresentes.length ? "Ce sur quoi t'appuyer pour agir." : "Peu d'appuis nets : la page propose des premiers pas.", "appuis"]
  ];
  // ───────── Le verdict et la vue d'ensemble
  // Le feu ne s'emballe pas sur un seul signe : les seuils sont des quarts de l'échelle, sans étalonnage.
  // Orange : au moins deux signes d'usure élevés en même temps, ou un très élevé. Jaune : un seul signe élevé.
  const usure = ["A", "B", "C", "F"].map((id) => sr[id]);
  const usureMax = Math.max(...usure.map((d) => niv(d).n));
  const hautes = usure.filter((d) => d.score >= 13);
  const tresHaute = usure.find((d) => d.score >= 19);
  const COURTS = { A: "l'épuisement", B: "la distance au travail", C: "l'efficacité ou le sens", F: "la récupération" };
  const nomsUsure = (ds) => liste(ds.map((d) => COURTS[d.id]));
  const verdict = r.hasAlert ? { n: 3, t: "Un signal de sécurité est déclaré", d: "L’orientation dépend de la réponse concernée : consulte le message de sécurité distinct, sans interpréter le score total." }
    : hautes.length >= 2 || tresHaute ? { n: 2, t: "Plusieurs manifestations ressortent", d: `${tresHaute && hautes.length < 2 ? `Un signe d'usure est très élevé (${nomsUsure([tresHaute])})` : `Plusieurs signes d'usure sont élevés en même temps (${nomsUsure(hautes)})`}. Ce n'est pas un diagnostic, mais une raison d'agir dans les prochains jours et d'en parler à un médecin.` }
      : hautes.length === 1 ? { n: 1, t: "Un signe ressort nettement", d: `${cap(nomsUsure(hautes))} ressort ; les autres tiennent encore. C'est le bon moment pour agir, avant que l'usure s'installe.` }
      : usureMax === 1 || sr.D.score >= 13 || sr.E.score >= 13 ? { n: 1, t: "Des éléments méritent attention", d: "Des manifestations ou contraintes ressortent sur certaines questions, sans qu’un niveau clinique soit déterminé." }
        : { n: 0, t: "Peu de difficultés déclarées", d: "Ce questionnaire ne fait pas ressortir de difficultés fréquentes dans les domaines explorés. Il ne remplace pas une appréciation médicale ou professionnelle." };
  const nDim = (d) => niv(d).n;
  const val = (v) => `${MOTS[nv24(v)]} · ${v}/24`;
  // L'absurde : la couleur dit l'effet. Beaucoup d'absurde sans retrait ni perte de sens = à surveiller (le recul peut protéger) ;
  // avec retrait ou perte de sens = ça use.
  const nAbsurde = !absurdeHaut ? (bs.percent >= 25 ? 1 : 0) : coupe ? (bs.percent >= 75 ? 3 : 2) : 1;
  const ctxAggr = ctxOui.filter((a) => !["collectiveSignal", "previousMedicalAlert", "safetySensitiveJob"].includes(a.id));
  const causes = [
    { titre: "La balance", modele: "Exigences-ressources (JD-R) · chapitre 3", rows: [
      { label: "Exigences", val: val(sr.D.score), n: nDim(sr.D), g: nDim(sr.D), c: COUL[nDim(sr.D)] },
      { label: "Ressources", val: ["rares", "limitées", "présentes", "solides"][nv24(ressources)], n: nv24(ressources), g: 3 - nv24(ressources), c: COUL[3 - nv24(ressources)], bon: true }] },
    { titre: "Le retour", modele: "Effort-récompense (Siegrist) · chapitre 4", rows: [
      { label: "Effort", val: MOTS[nv24(effort)], n: nv24(effort), g: nv24(effort), c: COUL[nv24(effort)] },
      { label: "Récompense", val: ["faible", "limitée", "correcte", "bonne"][nv24(retour)], n: nv24(retour), g: 3 - nv24(retour), c: COUL[3 - nv24(retour)], bon: true },
      { label: "Surengagement", val: MOTS[nv24(surengagement)], n: nv24(surengagement), g: nv24(surengagement), c: COUL[nv24(surengagement)] }] },
    { titre: "Le contexte", modele: "Ce qui se passe autour · chapitre 5 · hors score", horsScore: true, rows: ctxAggr.length
      ? ctxAggr.slice(0, 4).map((a) => ({ label: a.label.length > 30 ? `${a.label.slice(0, 29)}…` : a.label, val: "signalé", n: a.id === "harassment" || a.id === "ethicalConflict" ? 2 : 1, c: COUL[a.id === "harassment" || a.id === "ethicalConflict" ? 2 : 1] }))
      : [{ label: "Rien de signalé", val: "", n: 0, c: C.piste }] },
    { titre: "L'absurde", modele: "Bullshitomètre · pause humour · hors score", horsScore: true, rows: [bs.skipped
      ? { label: "Pause humour passée", val: "", n: 0, c: C.piste }
      : { label: "Absurde au travail", val: `${NIVMOTS[nAbsurde]} · ${bs.percent} %`, n: nAbsurde, g: nAbsurde, c: COUL[nAbsurde] }] }
  ];
  const fRecharge = 8 - item("F1").riskScore - item("F3").riskScore;
  const recharge = [
    { label: "Décrocher, loisirs", val: fRecharge >= 6 ? "ça tient" : fRecharge >= 3 ? "fragile" : "en panne", n: fRecharge >= 6 ? 2 : fRecharge >= 3 ? 1 : 0 },
    { label: "Tes appuis", val: forts.length ? `${forts.length} point${forts.length > 1 ? "s" : ""} fort${forts.length > 1 ? "s" : ""}` : "à reconstruire", n: forts.length >= 4 ? 3 : forts.length >= 2 ? 2 : forts.length ? 1 : 0 },
  ];
  const signes = [
    { label: "Épuisement", v: sr.A.score, val: val(sr.A.score), n: nDim(sr.A) },
    { label: "Distance, cynisme", v: sr.B.score, val: val(sr.B.score), n: nDim(sr.B) },
    { label: "Perte d'efficacité", v: efficacite, max: 16, val: `${efficacite}/16`, n: nv24(relatif24(efficacite, 16)) },
    { label: "Perte de sens", v: perteSens, max: 8, val: `${perteSens}/8`, n: nv24(relatif24(perteSens, 8)) }
  ];
  const nItem = (id) => [0, 0, 1, 2, 3][item(id).riskScore];
  const CORPS = { F2: "Sommeil perturbé", F4: "Symptômes physiques", F5: "Compensations pour tenir", F6: "Erreurs liées à la fatigue" };
  const corpsRows = Object.keys(CORPS).filter((id) => item(id).riskScore >= 2).map((id) => ({ label: CORPS[id], val: ratingLabels[item(id).rawScore].replace(/^\d+\s*-\s*/, ""), n: nItem(id), c: COUL[nItem(id)] }));
  const corps = { titre: "Le corps", modele: "Sommeil, santé · chapitre 1", rows: corpsRows.length ? corpsRows : [{ label: "Pas de signal net", val: "", n: 0, c: C.piste }] };
  const vue = { causes, recharge, signes, corps, alerte: r.hasAlert, aScore: sr.A.score, fScore: sr.F.score };
  // ───────── Tableau de bord : trois cadrans lus en trois secondes, avant le détail (choix de David, 20/11).
  const nE = nv24(Math.round((sr.A.score + sr.F.score) / 2));
  const tireListe = [["les exigences", nDim(sr.D)], ["le manque de ressources", nDim(sr.E)], ["l'effort sans retour", Math.min(nv24(effort), Math.max(0, 3 - nv24(retour)))]];
  const tire = Math.max(...tireListe.map(([, n]) => n));
  const lacheListe = [...signes.map((x) => [x.label.replace(/ \(.*\)$/, "").toLowerCase(), x.n]), ...corps.rows.filter((x) => x.n).map((x) => [x.label.toLowerCase(), x.n])];
  const lache = Math.max(0, ...lacheListe.map(([, n]) => n));
  const enTete = (xs, n) => liste(xs.filter(([, k]) => k === n && n > 0).map(([l]) => l).slice(0, 2));
  const cadran = (titre, n, mot, detail, bon) => {
    // Même sens pour les trois cadrans : à droite et en orange, ça use (code couleur unique).
    const coul = COUL, pos = n;
    const arc = (k) => { const a0 = Math.PI * (1 - k / 4), a1 = Math.PI * (1 - (k + 1) / 4) + 0.04; const pt = (a) => `${(60 + 46 * Math.cos(a)).toFixed(1)} ${(58 - 46 * Math.sin(a)).toFixed(1)}`; return `<path d="M${pt(a0)} A46 46 0 0 1 ${pt(a1)}" fill="none" stroke="${coul[k]}" stroke-width="12" opacity="${k === pos ? 1 : 0.28}"/>`; };
    const ang = Math.PI * (1 - (pos + 0.5) / 4);
    return `<div class="rp-cadran"><svg viewBox="0 0 120 66" aria-hidden="true">${[0, 1, 2, 3].map(arc).join("")}<line x1="60" y1="58" x2="${(60 + 34 * Math.cos(ang)).toFixed(1)}" y2="${(58 - 34 * Math.sin(ang)).toFixed(1)}" stroke="${C.sapin}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="58" r="6" fill="${C.sapin}"/></svg>
      <p class="k">${titre}</p><p class="t">${esc(cap(mot))}</p><p class="d">${esc(detail)}</p></div>`;
  };
  // Les trois cadrans reprennent les trois zones du schéma : ton travail, ta fatigue, ce qui se voit.
  const bord = `<div class="rp-bord" role="group" aria-label="Tableau de bord : ton travail, ta fatigue, ce qui se voit">
    ${cadran("Ton travail", tire, ["léger", "à surveiller", "lourd", "très lourd"][tire], tire ? `Surtout ${enTete(tireListe, tire)}.` : "Le travail déclaré ne pèse pas fort.", false)}
    ${cadran("Ta fatigue", nE, ["légère", "à surveiller", "forte", "très forte"][nE], "D'après l'épuisement et le mal à récupérer. Un niveau en mots, pas un pourcentage.", false)}
    ${cadran("Ce qui se voit", lache, ["peu de signes", "à surveiller", "des signes nets", "des signes très nets"][lache], lache ? `Surtout ${enTete(lacheListe, lache)}.` : "Pas de signe net d'usure.", false)}
  </div>`;
  const etapesVue = [
    ["personne", "1 · Toi", "Commence par toi : ta fatigue (épuisement, mal à récupérer), puis ce qui se voit (distance, efficacité, sens, corps)."],
    ["travail", "2 · Ton travail", "Observe séparément les exigences, les ressources, l'effort, la récompense, le contexte et l'absurde. Les fils ne prouvent aucune causalité."],
    ["appuis", "3 · Tes appuis", "Regarde ce qui t'aide encore. Les appuis n'annulent pas la charge, mais ils comptent pour agir."],
    ["tout", "4 · Vue complète", "La vue complète rapproche ces informations sans les mélanger en une mesure unique de risque."]
  ];
  // En tête de la synthèse (V3) : le feu, puis les trois cadrans. Le schéma vient ensuite.
  const tete = `<div class="rp-tete"><div class="rp-verdict v${verdict.n}"><span class="rp-feu" aria-hidden="true">${[0, 1, 2, 3].map((k) => `<i class="${k === verdict.n ? "on" : ""}"></i>`).join("")}</span><div><p class="t">${verdict.t}</p><p>${verdict.d}</p></div></div>
      ${bord}${LEGENDE_COULEURS}</div>`;
  // Les trois modèles lus sur tes réponses : trois questions, pas trois preuves (demande de David, V3).
  const modelesLus = `<section class="rp-modeles-lus" aria-labelledby="rp-modeles-titre">
      <h3 id="rp-modeles-titre">Trois modèles, trois questions sur tes réponses</h3>
      <div class="rp-modeles-grille">
        <article><p class="k">Maslach · ce qui se voit</p><h4>Qu'est-ce qui change chez toi ?</h4><p>Épuisement <b>${MOTS[nDim(sr.A)]}</b>, distance <b>${MOTS[nDim(sr.B)]}</b>, doute sur l'efficacité et le sens <b>${MOTS[nDim(sr.C)]}</b>.</p><p class="rp-modele-ou">À droite du schéma · ${chapLien(2)}</p></article>
        <article><p class="k">Exigences-ressources · la balance</p><h4>Que demande ton travail, et qu'est-ce qui t'aide ?</h4><p>Exigences <b>${["basses", "à surveiller", "élevées", "très élevées"][nDim(sr.D)]}</b>, ressources <b>${["rares", "limitées", "présentes", "solides"][nv24(ressources)]}</b>.</p><p class="rp-modele-ou">En haut à gauche · ${chapLien(3)}</p></article>
        <article><p class="k">Effort-récompense · le retour</p><h4>Ce que tu donnes est-il reconnu ?</h4><p>Effort <b>${MOTS[nv24(effort)]}</b>, récompense <b>${["faible", "limitée", "correcte", "bonne"][nv24(retour)]}</b>, surengagement <b>${MOTS[nv24(surengagement)]}</b>.</p><p class="rp-modele-ou">Au milieu à gauche · ${chapLien(4)}</p></article>
      </div>
      <p class="rp-modeles-note">Ces lectures reprennent en partie les mêmes réponses (cinq questions sont communes à la balance et au retour) : <b>trois angles, pas trois preuves</b>. Aucune ne dit, seule, ce qui cause quoi.</p>
    </section>`;
  const ensemble = `<figure class="rp-vue" data-lecture="tout">
      <div class="rp-vue-commandes" role="group" aria-label="Construire la lecture du schéma">
        ${etapesVue.map(([id, libelle]) => `<button type="button" data-vue-etape="${id}" aria-pressed="${id === "tout"}">${libelle}</button>`).join("")}
      </div>
      <p class="rp-vue-lecture" aria-live="polite">${etapesVue[3][2]}</p>
      ${vueEnsemble({ ...vue, etroit: false })}${vueEnsemble({ ...vue, etroit: true })}
      <details class="rp-pc rp-mode-emploi"><summary>Qu'est-ce qui est réellement mesuré ici ?</summary>
        <p><b>Directement déclaré :</b> les réponses A à F (0 à 4), les appuis G, les récompenses R et les éléments de contexte.</p>
        <p><b>Recalculé :</b> sommes A–F (0 à 24), indices partiels d'efficacité et de sens, effort/récompense/surengagement construits à partir de questions réutilisées, indice satirique du bullshitomètre.</p>
        <p><b>Non mesuré :</b> une réserve d'énergie, une probabilité individuelle de burn-out, l'effet protecteur de l'humour ou une relation causale entre les colonnes. Un score élevé n'est pas une urgence médicale à lui seul.</p>
      </details>
      ${LEGENDE_COULEURS}<figcaption class="rp-legende"><b>Comment lire ce schéma :</b> à gauche, <b>ton travail</b> (ce qui pèse, ce qui aide, ce qui se passe autour, l'absurde). Au centre, <b>toi</b> : ta fatigue en deux colonnes, l'épuisement et le mal à récupérer, et en dessous tes appuis. À droite, <b>ce qui se voit</b> : les trois signes et le corps. <b>La couleur dit l'effet pour toi, jamais si le chiffre est haut</b> : une ressource solide est verte, une ressource rare est orange. Tout vient de tes réponses. <b>Les fils rapprochent des thèmes ; ils ne prouvent pas que le travail cause un symptôme, ni qu'une ressource le compense.</b> Leur épaisseur suit une convention interne, pas une force de causalité.</figcaption></figure>`;

  const qualiteLecture = `<section class="rp-qualite" aria-label="Comment lire la qualité des réponses">
    <h3>Ces réponses se lisent-elles facilement ?</h3>
    <p>${L.prudence.length
      ? `<b>Certains contrastes sont peu informatifs :</b> ${esc(L.prudence.join(" ; "))}. Cela peut refléter une situation vécue comme uniformément difficile, une manière de répondre ou une difficulté à différencier les questions. Ce contrôle ne mesure ni la sincérité ni la validité clinique.`
      : "<b>Les réponses sont suffisamment différenciées pour examiner les écarts entre thèmes.</b> Cela ne valide pas pour autant le questionnaire ni ses seuils."}</p>
    ${L.paires.length ? `<p><b>À clarifier :</b> ${L.paires.length} rapprochement${L.paires.length > 1 ? "s" : ""} de réponses méritent une discussion. Il ne s'agit pas d'erreurs à corriger.</p>` : ""}
  </section>`;
  const lectureTemps = temps.length ? `<section class="rp-temps" aria-labelledby="rp-temps-title">
    <h3 id="rp-temps-title">Depuis quand, et comment cela évolue-t-il ?</h3>
    <dl>
      ${[["T1", "Durée"], ["T2", "Évolution"], ["T3", "Hors travail"]]
        .filter(([id]) => repere(id)?.answer)
        .map(([id, label]) => `<div><dt>${label}</dt><dd>${esc(repere(id).answer)}</dd></div>`).join("")}
    </dl>
    ${qualiteEmpechee === null ? "" : `<p><b>Qualité empêchée :</b> ${esc(repere("T4").answer)} dans les quatre dernières semaines (T4). Ce repère de conditions de travail n'entre dans aucun score.</p>`}
    <p class="rp-temps-limite">Ces réponses complètent les fréquences A–F. Un mieux en congé, une aggravation ou une difficulté durable ne suffisent pas à diagnostiquer un burn-out ni à en prouver la cause.</p>
  </section>` : "";
  const synthese = `<header class="rp-syn-head"><p class="course-eyebrow">L'essentiel · trois minutes</p>
      <h2 tabindex="-1">Ce que tes réponses permettent de comprendre</h2>
      <p>${esc(r.summary)}</p>
      <p class="rp-syn-principe"><b>Trois lectures, une distinction :</b> ce qui se manifeste chez toi, les conditions que tu déclares au travail et les appuis disponibles. Aucune n'est une preuve de causalité à elle seule.</p></header>
    ${securite}
    ${tete}
    <section class="rp-syn-priorites" aria-labelledby="rp-priorites-titre">
      <div><p class="k">La suite</p><h3 id="rp-priorites-titre">Par quoi commencer ?</h3>
        <p>${r.actions.length ? `<b>${esc(r.actions[0].title)}.</b> ${esc(r.actions[0].text)}` : "Partir d'un fait de travail récent et d'une difficulté concrète à éclaircir."}</p></div>
      <div class="rp-priorites-liens"><button type="button" class="button primary" data-aller="plan">Voir mon plan →</button>
        <button type="button" class="button secondary" data-aller="portes">À qui en parler ?</button></div>
    </section>
    <section class="rp-syn-schema" aria-labelledby="rp-schema-titre">
      <div class="rp-schema-intro"><p class="k">Vue d'ensemble</p><h3 id="rp-schema-titre">Une carte de tes réponses, pas une carte des causes</h3>
        <p>Le même schéma que dans la formation. À gauche, <b>ton travail</b>. Au centre, <b>toi</b> : ta fatigue et tes appuis. À droite, <b>ce qui se voit</b>. Le dessin reprend l'architecture de la formation : les fils mettent des éléments en regard, sans prouver leur origine.</p></div>
      ${ensemble}
      ${modelesLus}
      <p class="rp-schema-alternative"><b>Lecture en texte :</b> ${esc(lectureBalance)} ${esc(lectureVecu)} ${esc(lectureUsure)}</p>
    </section>
    <section class="rp-lecture-trio" aria-label="Trois lectures de tes réponses">${lecturePersonne}${lectureTravail}${lectureAppui}</section>
    ${lectureTemps}
    ${qualiteLecture}
    <details class="rp-syn-questions"><summary>Trois questions pour continuer la réflexion</summary>
      <ul class="rp-q3">${questions.map(([k, q]) => `<li><span class="k">${esc(k)}</span>${esc(q)}</li>`).join("")}</ul></details>
    <div class="rp-syn-suite"><p><b>Tu peux t'arrêter à cette synthèse.</b> Le plan et les interlocuteurs viennent ensuite. Si tu veux comprendre les modèles, les neuf pièces et les réponses détaillées sont accessibles dans « Approfondir ».</p>
      <button type="button" class="button secondary" data-aller="travail">Préparer une discussion sur le travail réel</button></div>`;

const carnetFait = travailRessort[0]?.question || "Une situation de travail à choisir après une observation concrète";
  const carnetVécu = manifs[0]?.question || "Une difficulté de vie ou de récupération à observer, si elle existe";
  const carnet = `<header class="rp-etape-head"><p class="rp-n">Outil facultatif · aucune donnée transmise</p>
      <h2 tabindex="-1">Un carnet pour voir ce qui change</h2><p class="rp-question">Qu'est-ce qui évolue réellement après une action ?</p>
      <p class="rp-intro">Un même score peut masquer deux situations opposées. Ce carnet suit des faits datés : <b>conditions de travail, manifestation ressentie, action obtenue</b>. Une amélioration après une décision est informative, pas une preuve automatique que cette décision en est la cause.</p></header>
      <div class="rp-carnet-reperes"><div><p class="k">Un fait de travail à observer</p><p>${esc(carnetFait)}</p></div>
        <div><p class="k">Une manifestation à observer</p><p>${esc(carnetVécu)}</p></div></div>
      <div class="rp-carnet-fiches">
        ${["Dans deux semaines", "Dans quatre semaines"].map((periode) => `<section class="rp-carnet-fiche"><h3>${periode}</h3>
          <div class="rp-carnet-champ"><b>Quels faits ont changé ?</b><span class="rp-carnet-trait"></span><span class="rp-carnet-trait"></span></div>
          <div class="rp-carnet-champ"><b>Quelle action a été décidée, par qui, à quelle date ?</b><span class="rp-carnet-trait"></span><span class="rp-carnet-trait"></span></div>
          <div class="rp-carnet-champ"><b>Qu'est-ce qui s'améliore, persiste ou s'aggrave ?</b><span class="rp-carnet-trait"></span><span class="rp-carnet-trait"></span></div>
          <div class="rp-carnet-champ"><b>Quel point faut-il réexaminer ou demander ?</b><span class="rp-carnet-trait"></span></div>
        </section>`).join("")}</div>
      <p class="rp-carnet-note"><b>À ne pas faire :</b> considérer une variation du total A–F comme une preuve de guérison ou d'efficacité. Les questions décrivent différentes dimensions et Bull-Out ne dispose pas d'étalonnage longitudinal.</p>`;

  // ───────── Annexes
  const definitions = `<h3>1. Comment ce rapport est construit</h3>
    <div class="rp-box ${L.fiable ? "ok" : "attention"}"><p class="k">État de tes réponses</p><p><b>${L.fiable ? "Réponses variées." : "Réponses répétitives ou extrêmes."}</b> ${L.fiable ? "La répartition des réponses est variée, sans constituer une preuve de fiabilité." : `${cap(L.prudence.join(" ; "))}. C'est possible, mais cela rend les écarts entre dimensions moins parlants.`} Ces contrôles décrivent uniquement la forme des réponses ; ils ne mesurent ni leur sincérité, ni leur qualité clinique.</p>
    ${L.paires.length ? `<p class="k">Points à clarifier</p><ul>${L.paires.map(([, , t, q]) => `<li>${esc(t)} <i>${esc(q)}</i></li>`).join("")}</ul><p>Ce ne sont pas des erreurs : deux réponses qui surprennent côte à côte sont souvent les plus utiles à discuter.</p>` : ""}</div>
    <ol class="rp-construit">
      <li><b>Les questions.</b> 36 questions notées de 0 (jamais ou presque) à 4 (presque toujours), sur les quatre dernières semaines, en six parties de six (A à F). Puis, hors score : 6 questions sur ce que tu donnes et ce qui revient (R, modèle de Siegrist), les 12 questions du bullshitomètre (satiriques, à choix) et 4 questions sur la façon dont tu as reçu cet humour, 6 questions sur ce qui t'aide (G). Puis 4 questions de repérage temporel et de qualité empêchée (T), hors score. Enfin 8 questions de contexte et 3 questions d’alerte, en oui ou non.</li>
      <li><b>Le score d'une dimension.</b> La somme de ses six réponses, de 0 à 24. Les questions E décrivent des ressources : elles sont comptées à l'envers (4 moins la réponse) pour que, partout, un score haut signale une difficulté.</li>
      <li><b>Les niveaux.</b> 0 à 6 bas, 7 à 12 à surveiller, 13 à 18 élevé, 19 à 24 très élevé : quatre quarts de l'échelle, choisis pour la lecture, sans étalonnage.</li>
      <li><b>La lecture d'ensemble.</b> Seule une réponse positive aux trois questions de sécurité déclenche un message spécifique d'orientation. Les autres profils sont des regroupements descriptifs internes, sensibles aux seuils de commodité (13/24 notamment), sans valeur diagnostique. Le total A–F n'est pas interprété cliniquement.</li>
      <li><b>Les actions et les interlocuteurs.</b> Proposés par des règles explicites à partir des dimensions à 13 ou plus, des réponses à 3 ou 4 et du contexte. La sécurité passe toujours en premier.</li>
      <li><b>Le retour et l'image d'ensemble.</b> Effort (D1, D4, D6), récompense (E5, E6, R1 à R3) et surengagement (R4 à R6, F1) sont des moyennes ramenées sur 24. La partie C est présentée en deux sous-groupes sans extrapolation : efficacité (C1, C2, C4, C6 : 0–16) et sens (C3, C5 : 0–8). Le bullshitomètre reprend le calcul du test satirique (part du maximum possible) ; il est dit « haut » à partir de 50 %, et croisé avec B et le sens (5 sur 8 ou plus, repère interne non étalonné).</li>
      <li><b>Le contexte et tes appuis.</b> Ne modifient aucun score. Le contexte change les interlocuteurs proposés et la lecture ; les appuis (G, ressources E présentes, réponses à 0 ou 1) forment la page « Tes appuis ».</li>
    </ol>
    <p><b>Ce qui n'est pas validé.</b> Les questions s'inspirent d'outils reconnus (annexe 3), mais elles ont été reformulées et assemblées : le questionnaire Bull-Out n'a pas fait l'objet d'une étude de fidélité, de validité ni d'étalonnage. La validation des outils sources ne s'étend pas à ce composite. Il ne pose pas de diagnostic et ne doit pas servir à évaluer une personne au travail.</p>`;

  const annexeReponses = `<h3>2. Tes réponses, question par question</h3><p class="rp-legende">La jauge montre la valeur comptée dans le score (après inversion pour E).</p>
    ${sections.map((s) => `<h4 class="rp-h">${esc(s.title.replace(/ - score inversé$/, ""))} · ${sr[s.id].score}/24 ${tag(sr[s.id])}</h4>${reponses(sr[s.id], s, ratingLabels, r)}`).join("")}
    <h4 class="rp-h">${esc(strengthPart.title)} · hors score</h4><ol class="rp-items">${g.map((a) => `<li class="${a.value >= 3 ? "fort" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.value)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</span></span></li>`).join("")}</ol>
    <h4 class="rp-h">${esc(exchangePart.title)} · hors score</h4><ol class="rp-items">${(r.exchangeAnswers || []).map((a) => `<li><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.value)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</span></span></li>`).join("")}</ol>
    ${temps.length ? `<h4 class="rp-h">Chronologie et qualité empêchée · hors score</h4>
      <ol class="rp-items">${temps.map((a) => `<li><span class="rp-id">${esc(a.id)}</span><span class="rp-q">${esc(a.question)}</span>
      <span class="rp-a"><span>${esc(a.answer || "Sans réponse")}</span></span></li>`).join("")}</ol>` : ""}
    <h4 class="rp-h">Le bullshitomètre · hors score</h4><ol class="rp-items">${bs.answers.map((a) => `<li><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a"><span>${esc(a.answer)}</span></span></li>`).join("")}</ol>
    ${r.humorReaction ? `<h4 class="rp-h">Réaction immédiate à l'humour · hors score</h4>
      <ol class="rp-items">${r.humorReaction.skipped ? '<li>Non renseigné.</li>' :
      r.humorReaction.answers.map((a) => `<li><span class="rp-id">${esc(a.id)}</span><span class="rp-q">${esc(a.question)}</span>
      <span class="rp-a">${esc(a.answer || "Non renseigné")}</span></li>`).join("")}</ol>` : ""}
    <h4 class="rp-h">Contexte</h4><ol class="rp-items">${r.contextAnswers.map((a, i) => `<li><span class="rp-id">X${i + 1}</span><span class="rp-q">${esc(a.text)}</span><span class="rp-a"><span>${a.yes ? "Oui" : "Non"}</span></span></li>`).join("")}</ol>
    <p class="rp-legende">Les réponses aux trois questions d'alerte ne sont pas reprises ici : seul le message de sécurité apparaît, en tête de rapport, si l'une a reçu oui.</p>`;

  const annexeSources = `<h3>3. Les modèles et questionnaires dont les questions s'inspirent</h3>
    <p>Chaque partie du questionnaire reprend des dimensions décrites par ces travaux. Les questions ont été réécrites en français simple ; aucune n'est une traduction d'un item protégé.</p>
    <table class="rp-table rp-sources"><thead><tr><th scope="col">Partie</th><th scope="col">Ce qu'elle explore</th><th scope="col">Inspirée de</th></tr></thead><tbody>
    ${sections.map((s) => `<tr><th scope="row"><span class="rp-id">${s.id}</span> ${NOMS[s.id]}</th><td>${esc(cap(s.explore))}</td><td>${esc(cap(s.sources))}.</td></tr>`).join("")}
    <tr><th scope="row"><span class="rp-id">R</span> Ce qui revient</th><td>${esc(cap(exchangePart.explore))}</td><td>${esc(cap(exchangePart.sources))}.</td></tr>
    <tr><th scope="row"><span class="rp-id">T</span> Durée et évolution</th><td>Repères de temporalité et qualité empêchée, hors scores.</td><td>Questions originales Bull-Out, inspirées du repérage clinique HAS et des six familles RPS INRS, non validées.</td></tr>
    <tr><th scope="row"><span class="rp-id">BS</span> Bullshitomètre</th><td>${esc(cap(bullshitPart.explore))}</td><td>${esc(cap(bullshitPart.sources))}.</td></tr>
    <tr><th scope="row"><span class="rp-id">G</span> Ce qui t'aide</th><td>${esc(cap(strengthPart.explore))}</td><td>${esc(cap(strengthPart.sources))}.</td></tr>
    <tr><th scope="row">Contexte</th><td>Ce qui se passe autour et dans l'équipe.</td><td>Repérage clinique de la HAS, prévention des risques psychosociaux de l'INRS.</td></tr></tbody></table>
    <h4 class="rp-h">Références</h4><ul class="rp-refs">
      <li>Organisation mondiale de la santé (2019). CIM-11, QD85 : burn-out, phénomène lié au travail.</li>
      <li>Haute Autorité de santé (2017). Repérage et prise en charge cliniques du syndrome d'épuisement professionnel ou burnout.</li>
      <li>INRS. Épuisement professionnel ou burnout ; prévention des risques psychosociaux.</li>
      <li>Maslach, C., Jackson, S. E. (1981). The measurement of experienced burnout. <i>Journal of Occupational Behaviour</i>, 2(2), 99-113.</li>
      <li>Schaufeli, W. B., De Witte, H., Desart, S. (2020). <i>Burnout Assessment Tool (BAT), manuel</i>. KU Leuven.</li>
      <li>Kristensen, T. S., Borritz, M., Villadsen, E., Christensen, K. B. (2005). The Copenhagen Burnout Inventory. <i>Work &amp; Stress</i>, 19(3), 192-207.</li>
      <li>Demerouti, E., Bakker, A. B., Vardakou, I., Kantas, A. (2003). The convergent validity of two burnout instruments (Oldenburg Burnout Inventory). <i>European Journal of Psychological Assessment</i>, 19(1), 12-23.</li>
      <li>Demerouti, E., Bakker, A. B., Nachreiner, F., Schaufeli, W. B. (2001). The job demands-resources model of burnout. <i>Journal of Applied Psychology</i>, 86(3), 499-512.</li>
      <li>Karasek, R. A. (1979). Job demands, job decision latitude, and mental strain. <i>Administrative Science Quarterly</i>, 24(2), 285-308.</li>
      <li>Siegrist, J. (1996). Adverse health effects of high-effort/low-reward conditions. <i>Journal of Occupational Health Psychology</i>, 1(1), 27-41.</li>
      <li>Siegrist, J., Starke, D., Chandola, T., et al. (2004). The measurement of effort-reward imbalance at work: European comparisons. <i>Social Science &amp; Medicine</i>, 58(8), 1483-1499.</li>
      <li>Graeber, D. (2018). <i>Bullshit Jobs: A Theory</i>. New York : Simon &amp; Schuster.</li>
      <li>Soffia, M., Wood, A. J., Burchell, B. (2022). Alienation is not 'bullshit': an empirical critique of Graeber's theory of BS jobs. <i>Work, Employment and Society</i>, 36(5), 816-840.</li>
      <li>Martin, R. A., Puhlik-Doris, P., Larsen, G., Gray, J., Weir, K. (2003). Individual differences in uses of humor and their relation to psychological well-being. <i>Journal of Research in Personality</i>, 37(1), 48-75.</li>
      <li>Pejtersen, J. H., Kristensen, T. S., Borg, V., Bjorner, J. B. (2010). The second version of the Copenhagen Psychosocial Questionnaire. <i>Scandinavian Journal of Public Health</i>, 38(3 suppl), 8-24.</li>
      <li>Xanthopoulou, D., Bakker, A. B., Demerouti, E., Schaufeli, W. B. (2007). The role of personal resources in the job demands-resources model. <i>International Journal of Stress Management</i>, 14(2), 121-141.</li>
      <li>Lazarus, R. S., Folkman, S. (1984). <i>Stress, appraisal, and coping</i>. New York : Springer.</li>
      <li>Sonnentag, S., Fritz, C. (2007). The Recovery Experience Questionnaire. <i>Journal of Occupational Health Psychology</i>, 12(3), 204-221.</li>
    </ul><p>Pour le détail et les limites : <a href="methode.html">Méthode et limites</a>.</p>`;

  // ───────── Pages
  const pages = [
    { id: "synthese", court: "Synthèse", html: synthese },
    { id: "appuis", court: "Tes appuis", html: `<header class="rp-etape-head rp-appuis-head"><p class="rp-n">Avant les neuf pièces</p>
        <h2 tabindex="-1">${pageAppuis.titre}</h2><p class="rp-question">${pageAppuis.q}</p><p class="rp-intro">${pageAppuis.intro}</p></header>
        ${bref(pageAppuis.bref)}<div class="rp-corps">${pageAppuis.corps}</div>${pageAppuis.comprendre}${garder(pageAppuis.garder)}` },
    { id: "absurde", court: "Le bullshitomètre", html: `<header class="rp-etape-head rp-appuis-head"><p class="rp-n">Pause humour, lecture sérieuse</p>
        <h2 tabindex="-1">${pageAbsurde.titre}</h2><p class="rp-question">${pageAbsurde.q}</p><p class="rp-intro">${pageAbsurde.intro}</p></header>
        ${bref(pageAbsurde.bref)}<div class="rp-corps">${pageAbsurde.corps}</div>${pageAbsurde.comprendre}${garder(pageAbsurde.garder)}` },
    ...etapes.map((e, i) => ({
      id: e.id, court: `${i + 1} · ${pieces[i]}`, etape: i,
      html: `<header class="rp-etape-head"><div class="rp-stepper"><span class="rp-n">Pièce ${i + 1} sur ${etapes.length}</span><ol aria-hidden="true">${etapes.map((_, j) => `<li class="${j < i ? "fait" : j === i ? "ici" : ""}"></li>`).join("")}</ol></div>
        <h2 tabindex="-1">${esc(pieces[i])}</h2><p class="rp-question">${esc(e.q)}</p><p class="rp-intro">${e.intro}</p></header>
        ${r.hasAlert ? `<p class="rp-securite-mini" role="note">Un signal de sécurité a été coché. Consulte le message individualisé de la synthèse ; le score ne détermine pas l’urgence.</p>` : ""}
        ${bref(e.bref)}<div class="rp-corps">${e.corps}</div>${e.comprendre}${garder(e.garder, i === etapes.length - 1)}`
    })),
    { id: "travail", court: "Fiche travail", html: ficheTravail },
    { id: "carnet", court: "Carnet de suivi", html: carnet },
    { id: "annexes", court: "Annexes", html: `<header class="rp-etape-head"><p class="rp-n">Annexes</p><h2 tabindex="-1">Comment lire, ce que tu as répondu, d'où viennent les questions</h2></header>
      <section class="rp-annexe" id="annexe-1">${definitions}</section><section class="rp-annexe" id="annexe-2">${annexeReponses}</section><section class="rp-annexe" id="annexe-3">${annexeSources}</section>` }
  ];

  // Lire dans l'ordre utile : synthèse, plan, interlocuteurs ; approfondir ensuite.
  const ordrePages = ["synthese", "plan", "portes", "travail", "carnet", "appuis", "absurde",
    ...etapes.filter((e) => !["plan", "portes"].includes(e.id)).map((e) => e.id), "annexes"];
  pages.sort((a, b) => ordrePages.indexOf(a.id) - ordrePages.indexOf(b.id));

  const nav = (i) => {
    const prev = pages[i - 1], next = pages[i + 1];
    return `<nav class="rp-pager" aria-label="Pièces du rapport">${prev ? `<button type="button" class="button secondary" data-aller="${prev.id}">← ${esc(prev.court)}</button>` : "<span></span>"}${next ? `<button type="button" class="button primary" data-aller="${next.id}">${esc(next.court)} →</button>` : `<a class="button primary" href="agir.html">Explorer les leviers d'action</a>`}</nav>`;
  };

  return `<header class="rapport-cover">
      <p class="course-eyebrow">Étape 3 · Rapport personnel</p>
      <h1 id="rapport-titre" tabindex="-1">Ton rapport Bull-Out</h1>
      <p class="rp-slogan">Prévention burn-out sans bullshit</p>
      <p id="rapport-date">Établi le ${date}, sur tes quatre dernières semaines.</p>
      <div class="rp-lire"><p class="k">Comment lire ce rapport</p><ol>
        <li><b>Ce que tu as répondu.</b> Tes déclarations sur quatre semaines : elles font foi, personne ne les a observées à ta place.</li>
        <li><b>Ce que Bull-Out calcule.</b> Des sommes et des niveaux (bas, à surveiller, élevé, très élevé) fixés par nous sur des quarts de l'échelle : des repères, pas des normes.</li>
        <li><b>Ce que le rapport en déduit.</b> Des pistes et des hypothèses, à vérifier en parlant avec quelqu'un.</li></ol>
        <p>Les questions s'inspirent d'outils de recherche reconnus, mais le questionnaire Bull-Out n'a pas été validé scientifiquement. Il aide à comprendre et à préparer une discussion ; il ne pose pas de diagnostic.</p></div>
      <div class="parcours-tools rp-outils">
        <fieldset class="rp-pdf"><legend>Ce que contient le PDF</legend>
          <label><input type="radio" name="rp-pdf" value="court" checked> <b>Essentiel</b> : synthèse, plan et interlocuteurs</label>
          <label><input type="radio" name="rp-pdf" value="complet"> <b>Complet</b> : explications, modèles et annexes</label>
          <label><input type="radio" name="rp-pdf" value="travail"> <b>Fiche travail</b> : contraintes et demandes, sans réponses médicales</label>
          <label><input type="checkbox" name="rp-reponses"> Inclure mes réponses détaillées (rapport complet uniquement)</label>
        </fieldset>
        <button class="button anis" type="button" id="imprimer">Enregistrer en PDF</button>
        <button class="button secondary" type="button" id="copy-results">Copier le résumé personnel</button>
        <a href="#questionnaire">Revoir mes réponses</a>
      </div>
      <p class="rp-prive">Rien ne quitte ton navigateur automatiquement. <b>Le résumé copié et les PDF essentiel/complet contiennent des informations personnelles.</b> Pour parler au travail sans communiquer tes réponses de santé, choisis « Fiche travail ». Dans la fenêtre d'impression, sélectionne « Enregistrer au format PDF ».</p>
    </header>
<nav class="rapport-nav rp-nav" aria-label="Sommaire du rapport">
      <div class="rp-nav-essentiel"><span class="rp-nav-label">À lire d'abord</span>
        ${pages.filter((p) => ["synthese", "plan", "portes", "travail"].includes(p.id)).map((p) => `<button type="button" data-aller="${p.id}">${esc(p.court)}</button>`).join("")}</div>
      <details class="rp-nav-detail"><summary>Approfondir · modèles, appuis, annexes</summary>
        <div class="rp-nav-list">${pages.filter((p) => !["synthese", "plan", "portes", "travail"].includes(p.id)).map((p) => `<button type="button" data-aller="${p.id}">${esc(p.court)}</button>`).join("")}</div>
      </details>
    </nav>
    ${pages.map((p, i) => `<section class="rp-page${p.etape !== undefined ? " rp-etape" : ""}" id="rapport-${p.id}" data-page="${p.id}" aria-label="${esc(p.court)}">${p.html}${nav(i)}</section>`).join("")}
    <footer class="rp-fin"><p><b>Bull-Out</b> · Prévention burn-out sans bullshit · bullout.ddlab.fr</p><p>Développé avec deux psys, et en discussion avec un juge aux prud'hommes. Version du questionnaire et du calcul : ${VERSION}.</p></footer>`;
}

// ───────── Affichage : une pièce à la fois à l'écran, tout le rapport à l'impression
const racine = document.querySelector("#results");
let courante = "synthese";

function montrer(id, focus = true) {
  const pages = [...racine.querySelectorAll(".rp-page")];
  if (!pages.some((p) => p.dataset.page === id)) id = "synthese";
  courante = id;
  pages.forEach((p) => { p.hidden = p.dataset.page !== id; });
  const detail = racine.querySelector(".rp-nav-detail");
  if (detail && !["synthese", "plan", "portes", "travail"].includes(id)) detail.open = true;
  racine.querySelectorAll(".rp-nav button").forEach((b) => {
    if (b.dataset.aller === id) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
  });
  if (focus) {
    const page = racine.querySelector(`.rp-page[data-page="${id}"]`);
    racine.querySelector(".rp-nav").scrollIntoView({ block: "start" });
    page.querySelector("h2")?.focus({ preventScroll: true });
  }
}

function optionsPDF() {
  const mode = racine.querySelector('[name="rp-pdf"]:checked')?.value || "court";
  racine.classList.toggle("pdf-court", mode === "court");
  racine.classList.toggle("pdf-travail", mode === "travail");
  racine.classList.toggle("pdf-sans-reponses", !racine.querySelector('[name="rp-reponses"]')?.checked);
}

document.addEventListener("bullout:rapport", (event) => {
  racine.innerHTML = composer(event.detail);
  montrer("synthese", false);
  optionsPDF();
});

racine.addEventListener("click", (event) => {
  const vueBtn = event.target.closest("[data-vue-etape]");
  if (vueBtn) {
    const figure = vueBtn.closest(".rp-vue");
    if (figure) {
      figure.dataset.lecture = vueBtn.dataset.vueEtape;
      figure.querySelectorAll("[data-vue-etape]").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn === vueBtn));
      });
      const textes = {
        personne: "Commence par toi : ta fatigue, puis ce qui se voit. Les manifestations ne disent pas, seules, ce qui les provoque.",
        travail: "Observe les exigences et les ressources déclarées. Elles sont des hypothèses d'exposition à examiner.",
        appuis: "Regarde ce qui peut soutenir la discussion ou l'action ; un appui n'annule pas automatiquement une contrainte.",
        tout: "Vue complète : des réponses mises en regard, sans énergie fictive ni relation causale démontrée."
      };
      const status = figure.querySelector(".rp-vue-lecture");
      if (status) status.textContent = textes[figure.dataset.lecture] || textes.tout;
    }
  }
  const b = event.target.closest("[data-aller]");
  if (b) montrer(b.dataset.aller);
  const t = event.target.closest("[data-copier-trace]");
  if (t) {
    const texte = racine.querySelector("#rp-trace")?.textContent || "";
    navigator.clipboard?.writeText(texte).then(() => { t.textContent = "Copié"; setTimeout(() => { t.textContent = "Copier le brouillon"; }, 1600); }).catch(() => {});
  }
});
racine.addEventListener("change", (event) => { if (event.target.closest(".rp-pdf")) optionsPDF(); });

// À l'impression : toutes les pages, et les encadrés « Pour comprendre » dépliés (PDF complet).
window.addEventListener("beforeprint", () => {
  if (!racine.querySelector(".rp-page")) return;
  racine.querySelectorAll(".rp-page").forEach((p) => { p.hidden = false; });
  if (!racine.classList.contains("pdf-court")) racine.querySelectorAll("details:not([open])").forEach((d) => { d.open = true; d.dataset.auto = "1"; });
});
window.addEventListener("afterprint", () => {
  racine.querySelectorAll("details[data-auto]").forEach((d) => { d.open = false; delete d.dataset.auto; });
  if (racine.querySelector(".rp-page")) montrer(courante, false);
});
