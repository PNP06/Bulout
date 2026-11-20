// Rapport Bull-Out : composé à partir des réponses calculées par script.js (événement « bullout:rapport »).
// Structure reprise de Papillon (psytest) : une synthèse, puis une étape par pièce vue dans la formation
// (les 9 pièces annoncées par les chapitres), puis des annexes qui montrent le calcul, les réponses et les sources.
// Rien n'est envoyé : tout est calculé et affiché dans cet onglet.
import { chapitres } from "./formation-contenu.js";

const VERSION = "2026.11.2";
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
const COUL = [C.mid, "#b45a12", C.orange, "#c65a25"];
const niv = (d) => NIV[d.level.label];
const tag = (d) => `<span class="rp-niv n${niv(d).n}">${niv(d).mot}</span>`;
const NOMS = { A: "Épuisement", B: "Distance mentale", C: "Efficacité et sens", D: "Exigences du travail", E: "Manque de ressources", F: "Récupération et santé" };
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
      <rect x="120" y="${y}" width="${Math.max(w, 6)}" height="16" rx="8" fill="${a.value >= 3 ? C.mid : a.value === 2 ? "#b45a12" : C.orange}"/>
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
const VIOLET = "#6a4c93";
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
      ${p.rows.map((r, i) => `<circle cx="${x + 22}" cy="${ys[i] - 4}" r="5" fill="${r.c}" opacity="${r.n || r.fixe ? 1 : 0.35}"/>${T(x + 34, ys[i], r.label, { poids: 600 })}${T(x + w - 14, ys[i], r.val, { anchor: "end", taille: 11.5, c: r.n >= 2 && r.c !== C.mid ? C.ink : "#4a5f5a" })}`).join("")}`;
    return { svg, h, ys };
  };
  // Les trois signes : une barre par signe, sur 24.
  const barres = (x, y, w) => {
    const h = 54 + signes.length * 44;
    const ys = signes.map((_, i) => y + 64 + i * 44);
    const svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".18" stroke-width="1.5"/>
      ${T(x + 16, y + 24, "Manifestations et sens", { titre: true, taille: 14 })}${T(x + 16, y + 40, "Maslach et sens distinct · chapitre 2", { taille: 11, op: 0.72 })}
      ${signes.map((s, i) => `${T(x + 16, ys[i], s.label, { poids: 600 })}${T(x + w - 16, ys[i], s.val, { anchor: "end", taille: 11.5, c: s.n >= 2 ? C.ink : "#4a5f5a" })}
        <rect x="${x + 16}" y="${ys[i] + 8}" width="${w - 32}" height="9" rx="4.5" fill="${C.piste}"/><rect x="${x + 16}" y="${ys[i] + 8}" width="${Math.max(6, Math.round((s.v / (s.max || 24)) * (w - 32)))}" height="9" rx="4.5" fill="${s.c || COUL[s.n]}"/>`).join("")}`;
    return { svg, h, ys: ys.map((v) => v + 4) };
  };
  // Silhouette conservée : A et F sont deux scores déclaratifs et non un % d’énergie.
  const batt = (cx, top, h = 170, w = 132) => {
    const barH = h - 69, trackY = top + 45;
    const bars = [{ id: "A", v: aScore }, { id: "F", v: fScore }].map((d, i) => {
      const x = cx - 51 + i * 62, bh = Math.round((d.v / 24) * barH);
      return `${T(x + 20, top + 31, d.id, { anchor: "middle", titre: true, taille: 12 })}
        <rect x="${x}" y="${trackY}" width="40" height="${barH}" rx="7" fill="${C.piste}"/>
        <rect x="${x}" y="${trackY + barH - bh}" width="40" height="${bh}" rx="7" fill="${COUL[nv24(d.v)]}"/>
        ${T(x + 20, top + h - 8, `${d.v}/24`, { anchor: "middle", taille: 11, poids: 600 })}`;
    }).join("");
    return `${T(cx, top - 38, "Deux repères déclarés", { anchor: "middle", titre: true, taille: 14 })}
      ${T(cx, top - 22, "A · épuisement   F · récupération/santé", { anchor: "middle", taille: 10, op: 0.72 })}
      <rect x="${cx - w / 2}" y="${top}" width="${w}" height="${h}" rx="16" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".8" stroke-width="2"/>
      ${bars}`;
  };
  const rechargeBox = (cx, y, w) => {
    const h = 44 + recharge.length * 22;
    return { h, svg: `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="12" fill="#e3eee9"/>
      ${T(cx, y + 24, "Appuis déclarés", { anchor: "middle", titre: true, taille: 13 })}
      ${recharge.map((r, i) => T(cx, y + 46 + i * 22, `${r.label} · ${r.val}`, { anchor: "middle", taille: 12, c: r.n ? C.sapin : "#4a5f5a" })).join("")}` };
  };
  const nRecharge = Math.max(0, ...recharge.map((r) => r.n));
  const alerteBox = (x, y, w) => alerte
    ? `<rect x="${x}" y="${y}" width="${w}" height="44" rx="12" fill="#fbe3d8"/>${T(x + 16, y + 27, "Signal déclaré : voir le message de sécurité", { titre: true, taille: 12.5, c: C.ink })}`
    : `<rect x="${x}" y="${y}" width="${w}" height="44" rx="12" fill="none" stroke="${C.sapin}" stroke-opacity=".18" stroke-dasharray="4 4"/>${T(x + 16, y + 27, "Pas de signal coché aux 3 questions", { taille: 12, op: 0.75 })}`;

  if (!etroit) {
    const W = 1000, top = 46, gap = 14, lw = 300;
    let y = top;
    const L = causes.map((p, i) => { const k = paquet(20, y, lw, p, i === causes.length - 1); y += k.h + gap; return k; });
    const hL = y;
    let yr = top;
    const M = barres(W - 20 - lw, yr, lw); yr += M.h + gap;
    const Co = paquet(W - 20 - lw, yr, lw, corps); yr += Co.h + gap;
    const yAl = yr; yr += 44 + gap;
    const bTop = top + 92, bH = 170, cx = W / 2;
    const R = rechargeBox(cx, bTop + bH + 56, 230);
    const H = Math.max(hL, yr, bTop + bH + 56 + R.h + gap) + 6;
    const gauche = causes.flatMap((p, i) => p.rows.map((r, j) => ({ ...r, y: L[i].ys[j] - 4 })));
    const droite = [...signes.map((s, i) => ({ ...s, y: M.ys[i] })), ...corps.rows.map((r, j) => ({ ...r, y: Co.ys[j] - 4 }))];
    const cible = (k, n, a, b) => a + ((b - a) * (n === 1 ? 0.5 : k / (n - 1)));
    return `<svg class="rp-ensemble large" viewBox="0 0 ${W} ${H}" role="img" aria-label="Vue descriptive des réponses : conditions de travail, deux scores A et F, manifestations. Les liens ne prouvent aucune causalité.">
      ${T(20, 26, "CONDITIONS ET RESSOURCES DÉCLARÉES", { titre: true, taille: 11.5, c: C.ink })}${T(cx, 26, "DEUX INDICES DU VÉCU", { titre: true, taille: 11.5, anchor: "middle", c: "#4a5f5a" })}${T(W - 20, 26, "MANIFESTATIONS DÉCLARÉES", { titre: true, taille: 11.5, anchor: "end", c: C.ink })}
      ${gauche.map((r, k) => fil(20 + lw, r.y, cx - 66, cible(k, gauche.length, bTop + 22, bTop + bH - 22), r.n, r.c)).join("")}
      ${droite.map((r, k) => fil(cx + 66, cible(k, droite.length, bTop + 22, bTop + bH - 22), W - 20 - lw, r.y, r.n, r.c || C.orange)).join("")}
      ${fil(cx, bTop + bH + 56, cx, bTop + bH + 4, nRecharge, C.mid, true)}
      ${L.map((k) => k.svg).join("")}${M.svg}${Co.svg}${alerteBox(W - 20 - lw, yAl, lw)}
      ${batt(cx, bTop, bH)}${R.svg}</svg>`;
  }
  // Téléphone : les mêmes paquets, empilés ; deux gros fils relient les causes, l'énergie et les effets.
  const W = 400, x = 12, w = W - 24, gap = 12;
  let y = 34;
  const parts = [T(x, 22, "CONDITIONS ET RESSOURCES DÉCLARÉES", { titre: true, taille: 11.5, c: C.ink })];
  causes.forEach((p, i) => { const k = paquet(x, y, w, p, i === causes.length - 1); parts.push(k.svg); y += k.h + gap; });
  const nCause = Math.max(0, ...causes.flatMap((p) => p.rows.filter((r) => r.c !== C.mid).map((r) => r.n)));
  const bTop = y + 76, bH = 140, cx = W / 2;
  parts.push(fil(cx, y - 4, cx, bTop - 58, nCause, C.orange, true));
  parts.push(batt(cx, bTop, bH, 132));
  const R = rechargeBox(cx, bTop + bH + 30, 250);
  parts.push(fil(cx, bTop + bH + 30, cx, bTop + bH + 4, nRecharge, C.mid, true));
  y = bTop + bH + 30 + R.h + 46;
  const nEffet = Math.max(0, ...signes.map((s) => s.n), ...corps.rows.map((r) => r.n));
  parts.push(fil(cx + 150, bTop + bH / 2, cx + 150, y - 4, nEffet, C.orange, true));
  parts.push(`<path d="M${cx + 66} ${bTop + bH / 2} H${cx + 150}" stroke="${C.orange}" stroke-width="${FIL[nEffet]}" stroke-linecap="round" opacity="${nEffet ? 0.88 : 0.3}"/>`);
  parts.push(R.svg);
  parts.push(T(x, y - 10, "MANIFESTATIONS DÉCLARÉES", { titre: true, taille: 11.5, c: C.ink }));
  const M = barres(x, y, w); parts.push(M.svg); y += M.h + gap;
  const Co = paquet(x, y, w, corps); parts.push(Co.svg); y += Co.h + gap;
  parts.push(alerteBox(x, y, w)); y += 44 + 8;
  return `<svg class="rp-ensemble etroit" viewBox="0 0 ${W} ${y}" role="img" aria-label="Vue descriptive des réponses : conditions de travail, deux scores A et F, manifestations. Les liens ne prouvent aucune causalité.">${parts.join("")}</svg>`;
}

// « Batterie » reste une entrée pédagogique de la formation, sans pourcentage d’énergie.
function batterie(A, F) {
  const barre = (y, titre, v) => {
    const largeur = Math.round((v / 24) * 190);
    return `<text x="8" y="${y}" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="${C.sapin}">${titre}</text>
      <text x="312" y="${y}" text-anchor="end" font-family="Inter, sans-serif" font-size="12" fill="${C.sapin}">${v}/24</text>
      <rect x="116" y="${y - 12}" width="190" height="13" rx="6" fill="${C.piste}"/>
      <rect x="116" y="${y - 12}" width="${largeur}" height="13" rx="6" fill="${COUL[nv24(v)]}"/>`;
  };
  return `<svg class="rp-art" viewBox="0 0 320 118" role="img" aria-label="Deux sommes descriptives de réponses : épuisement ${A} sur 24 et récupération santé ${F} sur 24">
    ${barre(35, "A · Épuisement", A)}${barre(77, "F · Santé", F)}
    <text x="160" y="111" text-anchor="middle" font-family="Inter, sans-serif" font-size="10.5" fill="${C.sapin}">Ce ne sont pas des mesures d’énergie</text>
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

function composer({ result: r, sections, strengthPart, exchangePart, bullshitPart, bsDims, ratingLabels }) {
  const sr = r.sectionResults;
  const sec = Object.fromEntries(sections.map((s) => [s.id, s]));
  const L = lisibilite(r, ratingLabels);
  const ressources = 24 - sr.E.score; // E est compté à l'envers : ressources présentes = 24 - score de manque
  const ctxOui = r.contextAnswers.filter((a) => a.yes);
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
    hh: ["Absurdité et retrait déclarés", "Les réponses satiriques signalent de l’absurdité perçue et les questions sérieuses davantage de distance ou de perte de sens. Leur lien causal n’est pas établi."],
    hb: ["Absurdité sans retrait marqué", "Les réponses satiriques décrivent de l’absurdité perçue, mais les questions sur la distance et le sens ressortent moins. Ce résultat ne mesure pas un humour protecteur."],
    bh: ["Retrait sans forte absurdité déclarée", "La distance ou la perte de sens ressortent malgré un indice satirique moins élevé. Les autres conditions de travail et le contexte méritent examen."],
    bb: ["Peu de signaux sur ces thèmes", "La distance, la perte de sens et l’absurdité perçue ressortent relativement peu dans ces questions. D’autres difficultés restent possibles."]
  };
  const caseBS = (absurdeHaut ? "h" : "b") + (coupe ? "h" : "b");
  const [bsTitre, bsTexte] = CASES[caseBS];
  const lectureBatterie = sr.A.score >= 13 && sr.F.score >= 13
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
    ["Pour ton médecin ou le médecin du travail", sr.F.score >= 13 || sr.A.score >= 13 ? "Mon énergie et mon sommeil se dégradent depuis plusieurs semaines : mon poste, tel qu'il est, reste-t-il compatible avec ma santé ?" : "Qu'est-ce qui pourrait être aménagé pour que mon travail reste soutenable ?"],
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
    intro: "Un rapport qui ne montre que les difficultés oublie la moitié de la balance. Ce qui tient encore, et ce que tu sais déjà faire, sont les points de départ les plus solides pour agir.",
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

  // ───────── Les 9 étapes (une par pièce de la formation)
  const pieces = chapitres.map((c) => c.piece.nom);
  const etapes = [
    {
      id: "batterie", chap: 1, titre: "La batterie", q: "Le repos te rend-il ce que le travail te prend ?",
      intro: "La batterie est une image pédagogique. En réalité, le questionnaire recueille séparément des manifestations d'épuisement (A) et des difficultés de récupération ou de santé (F). Le repos seul ne permet pas de trancher leur origine.",
      bref: `${lectureBatterie} Épuisement : ${niv(sr.A).mot} (${sr.A.score}/24). Récupération et santé : ${niv(sr.F).mot} (${sr.F.score}/24).`,
      corps: `<div class="rp-duo"><div>${batterie(sr.A.score, sr.F.score)}<p class="rp-legende">Les barres décrivent la fréquence des réponses des parties A et F, chacune sur 24. Ce ne sont ni une quantité d’énergie, ni une mesure clinique validée.</p></div>
        <div>${carte(`Épuisement ${tag(sr.A)}`, `<p>${esc(sr.A.comment)}</p>`)}${carte(`Récupération et santé ${tag(sr.F)}`, `<p>${esc(sr.F.comment)}</p>`)}
        ${haut("A2") ? `<p class="rp-cle"><b>Question clé :</b> tu réponds que même un repos court ne te fait plus récupérer (A2). C'est « le test des vacances » du chapitre 1 : ce qui ne remonte pas avec le repos ne relève plus de la simple fatigue.</p>` : ""}</div></div>
        <h4 class="rp-h">Tes réponses</h4>${reponses(sr.A, sec.A, ratingLabels, r)}${reponses(sr.F, sec.F, ratingLabels, r)}
        ${haut("F5") || haut("F6") ? `<p class="rp-cle"><b>À ne pas laisser de côté :</b> ${[haut("F5") ? "des stratégies pour tenir ou dormir (F5)" : "", haut("F6") ? "des erreurs ou quasi-accidents liés à la fatigue (F6)" : ""].filter(Boolean).join(" et ")}. Ce sont des signaux de sécurité : parles-en à un médecin.</p>` : ""}`,
      comprendre: pourComprendre("Fatigue, stress ou usure", `<p>Le stress est une réaction d'adaptation à une exigence. La fatigue se répare avec le repos. Le burn-out est décrit par l'OMS (CIM-11, 2019) comme un <b>phénomène lié au travail</b>, résultant d'un stress chronique au travail qui n'a pas été géré avec succès. Ce n'est pas une maladie dans la classification, et aucun test sanguin ou hormonal ne le mesure chez une personne.</p><p>Les changements pendant un congé ou à la reprise peuvent éclairer le rôle du travail, sans démontrer à eux seuls une causalité. Une fatigue persistante peut également avoir d’autres origines.</p>`, chapLien(1)),
      garder: `${lectureBatterie} On regarde maintenant si l'usure touche aussi ta relation au travail et ta confiance.`
    },
    {
      id: "jauges", chap: 2, titre: "Les trois jauges", q: "L'usure touche-t-elle seulement ton énergie, ou aussi ta relation au travail et ta confiance ?",
      intro: "Le modèle de Christina Maslach décrit le burn-out par trois signes qui peuvent monter séparément : s'épuiser (A), se détacher (B), douter de son efficacité ou du sens (C).",
      bref: `${lectureUsure} Épuisement ${niv(sr.A).mot}, distance ${niv(sr.B).mot}, efficacité et sens ${niv(sr.C).mot}.`,
      corps: `<div class="rp-duo"><div>${jauges(sr)}<p class="rp-legende">Les pointillés marquent les seuils de lecture (6, 12 et 18 sur 24).</p></div>
        <div>${r.modelReadings[0].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${sr.B.score >= 7 ? `<p class="rp-cle"><b>La distance n'est pas un défaut d'attitude.</b> La distance peut avoir plusieurs fonctions : protection, désengagement ou symptôme. Ces questions ne permettent pas de trancher seules.</p>` : ""}</div></div>
        <h4 class="rp-h">Distance mentale ${tag(sr.B)}</h4>${reponses(sr.B, sec.B, ratingLabels, r)}
        <h4 class="rp-h">Efficacité et sens ${tag(sr.C)}</h4>
        <p>La partie C mêle deux choses : l'<b>efficacité perçue</b> (C1, C2, C4, C6 : ${MOTS[nv24(relatif24(efficacite, 16))]}, ${efficacite}/16) et le <b>sens</b> (C3, C5 : difficultés de sens ${MOTSF[nv24(relatif24(perteSens, 8))]}, ${perteSens}/8). Le sens et l’utilité sont explorés à part du questionnaire satirique : <button type="button" class="rp-lien" data-aller="absurde">${esc(bsTitre.toLowerCase())}</button>.</p>
        ${reponses(sr.C, sec.C, ratingLabels, r)}`,
      comprendre: pourComprendre("D'où viennent les trois jauges", `<p>Maslach et Jackson ont construit en 1981 le Maslach Burnout Inventory autour de trois dimensions : épuisement émotionnel, dépersonnalisation (devenue « cynisme »), accomplissement personnel réduit. Schaufeli et ses collègues ont proposé en 2020 le Burnout Assessment Tool, qui garde l'épuisement et la distance mentale et ajoute les altérations cognitives (attention, mémoire : A6) et émotionnelles (irritabilité : A5).</p><p>Les questions de Bull-Out reprennent ces dimensions avec des formulations nouvelles. Elles n'ont pas les propriétés mesurées de ces outils : on lit des tendances, pas un score normé.</p>`, chapLien(2)),
      garder: "Les jauges disent ce que tu ressens. La suite cherche d'où cela vient : ce que le travail te demande, et ce qui t'aide à le faire."
    },
    {
      id: "balance", chap: 3, titre: "La balance", q: "Ce que le travail te demande est-il compensé par ce qui t'aide à le faire ?",
      intro: "Le modèle Exigences-Ressources (JD-R, Demerouti et Bakker, 2001) pose les exigences du travail (D) sur un plateau et les ressources (E) sur l'autre. Le modèle décrit des processus liés aux contraintes et aux ressources, sans supposer que leurs scores s'annulent mathématiquement.",
      bref: lectureBalance,
      corps: `<div class="rp-duo"><div>${balance(sr.D.score, ressources, 24, "Exigences", "Ressources", `Balance : exigences ${sr.D.score}, ressources ${ressources} sur 24`)}<p class="rp-legende">Les ressources sont tes réponses E telles quelles (plus elles sont présentes, plus le plateau est lourd). Dans le score « Manque de ressources », elles sont comptées à l'envers.</p></div>
        <div>${r.modelReadings[1].lines.map((l) => `<p>${esc(l)}</p>`).join("")}</div></div>
        <h4 class="rp-h">Exigences ${tag(sr.D)}</h4>${reponses(sr.D, sec.D, ratingLabels, r)}
        <h4 class="rp-h">Manque de ressources ${tag(sr.E)}</h4>${reponses(sr.E, sec.E, ratingLabels, r)}`,
      comprendre: pourComprendre("Pourquoi les ressources comptent autant que la charge", `<p>Karasek (1979) a montré que la tension au travail vient de la combinaison d'une forte demande et d'une faible latitude de décision ; le soutien social a ensuite été ajouté comme troisième facteur. Le modèle JD-R généralise : toute exigence coûte de l'énergie, toute ressource (autonomie, soutien, clarté, reconnaissance) aide à y faire face et protège de l'usure.</p><p>Conséquence pratique : on peut agir des deux côtés. Retirer une exigence ou ajouter une ressource fait pencher la balance.</p>`, chapLien(3)),
      garder: "La balance compare des quantités. L'étape suivante regarde l'échange : ce que tu reçois en retour de ton effort."
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
      garder: "Tu sais ce qui ressort et ce que valent les chiffres. Reste à choisir quoi faire."
    },
    {
      id: "plan", chap: 7, titre: "Le plan", q: "Que faire dans les 72 heures, puis dans les deux semaines ?",
      intro: "On commence par le travail réel : retirer, reporter, simplifier. Optimiser sa respiration ne règle pas une surcharge non arbitrée. Choisis une ou deux actions, pas douze.",
      bref: `D'abord : ${esc(liste(r.actions.slice(0, 2).map((a) => a.title.toLowerCase())))}.${forts.length || ressPresentes.length ? ` Pour le mener, appuie-toi sur ${esc(liste([...forts.slice(0, 2).map((a) => APPUIS[a.id][1].toLowerCase()), ...ressPresentes.slice(0, 1).map((id) => RESSOURCES[id][0].toLowerCase())]))}.` : ""}`,
      corps: `<h4 class="rp-h">Actions prioritaires</h4><ol class="rp-actions">${r.actions.map((a) => `<li><b>${esc(a.title)}</b><span>${esc(a.text)}</span></li>`).join("")}</ol>
        <h4 class="rp-h">Les 72 prochaines heures</h4><div class="rp-grille4">${r.plans.plan72h.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        <h4 class="rp-h">Dans deux semaines</h4><div class="rp-duo">${r.plans.twoWeeks.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
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
  const profilBS = bs.profil || { titre: "", texte: "", survie: "", phrase: "" };
  const grilleCase = (k, titre, texte, cls) => `<div class="rp-bs-case ${cls}${k === caseBS ? " ici" : ""}"><b>${titre}</b><span>${texte}</span>${k === caseBS ? '<em>C\'est ta case</em>' : ""}</div>`;
  const pageAbsurde = {
    titre: "Le bullshitomètre", q: "Que décrivent tes réponses sur l’absurdité perçue, la distance et le sens ?",
    intro: "Une pause satirique sur les absurdités organisationnelles, suivie d’une mise en regard avec la distance mentale (B) et le sens (C3, C5). Cette comparaison ne mesure pas l’effet protecteur de l’humour.",
    bref: `Indice satirique interne : ${bs.percent} %${profilBS.titre ? ` (${esc(profilBS.titre)})` : ""}. Lecture sérieuse : ${esc(bsTitre.toLowerCase())}.`,
    corps: `<div class="rp-duo"><div class="rp-bs-score"><p class="rp-bs-pc">${bs.percent}<small> %</small></p><p class="k">Indice satirique (non validé)</p>
        <div class="rp-bs-metres">${(bsDims || []).map(([k, l]) => `<div><span>${esc(l)}</span><span class="rp-barre"><i style="width:${bs.dims[k] || 0}%;background:${C.orange}"></i></span><b>${bs.dims[k] || 0} %</b></div>`).join("")}</div></div>
        <div class="rp-bs-satire"><p class="k">Ton profil satirique</p><h4>${esc(cap(profilBS.titre))}</h4><p>${esc(profilBS.texte)}</p>
        <p><b>Mode de survie :</b> ${esc(profilBS.survie)}</p><p class="rp-phrase">À sortir en réunion : « ${esc(profilBS.phrase)} »</p></div></div>
      <h4 class="rp-h">La lecture sérieuse</h4>
      <p>L’indice satirique de réponses est <b>${absurdeHaut ? "dans sa moitié haute" : "dans sa moitié basse"}</b> (${bs.percent} % du barème interne). Ta distance est ${MOTS[nv24(sr.B.score)]} (${sr.B.score}/24) et les difficultés de sens ${MOTSF[nv24(relatif24(perteSens, 8))]} (${perteSens}/8).</p>
      <div class="rp-bs-grille" role="table" aria-label="Grille de lecture : absurdité du poste croisée avec distance et sens">
        <span></span><span class="h">Distance et perte de sens basses</span><span class="h">Distance ou perte de sens hautes</span>
        <span class="v">Absurdité haute</span>${grilleCase("hb", CASES.hb[0], CASES.hb[1], "g")}${grilleCase("hh", CASES.hh[0], CASES.hh[1], "o")}
        <span class="v">Absurdité basse</span>${grilleCase("bb", CASES.bb[0], CASES.bb[1], "g")}${grilleCase("bh", CASES.bh[0], CASES.bh[1], "p")}
      </div>
      ${caseBS === "hh" ? `<p class="rp-cle"><b>Ce que tu peux faire :</b> nommer ce qui est absurde, distinguer ce qui peut changer de ce qui doit être arbitré, et le porter comme un fait de travail (pièce 8), pas comme un défaut de motivation. Le sens perdu se travaille avec ton manager ou le médecin du travail.</p>` : caseBS === "hb" ? `<p class="rp-cle"><b>À ne pas conclure :</b> ce questionnaire ne demande pas si l’humour t’aide réellement à faire face. La fonction protectrice de l’humour n’est donc pas établie.</p>` : ""}
      <h4 class="rp-h">Tes réponses</h4><ol class="rp-items">${bs.answers.map((a) => `<li><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a"><span>${esc(a.answer)}</span></span></li>`).join("")}</ol>`,
    comprendre: pourComprendre("Pourquoi un test pour rire dans un rapport sérieux", `<p>L'anthropologue David Graeber a décrit en 2018 les « bullshit jobs » : des emplois que même ceux qui les occupent jugent inutiles. Les études qui ont suivi, sur de grands échantillons européens (Soffia, Wood et Burchell, 2022), trouvent que le <b>sentiment d'inutilité</b> est bien associé à un mal-être plus élevé, mais qu'il dépend surtout de la façon dont le travail est organisé et reconnu, plus que du métier lui-même.</p><p>Côté burn-out, Maslach décrit le cynisme comme une <b>protection</b> : on se détache de ce qui coûte trop. L'humour joue un rôle proche. Les recherches sur les styles d'humour (Martin et ses collègues, 2003) distinguent un humour qui aide à prendre du recul et protège, d'un humour plus amer ou tourné contre soi, associé à plus de mal-être. D'où la grille : c'est le croisement avec ta distance et ton sens qui dit de quel côté tu es.</p><p>Le bullshitomètre est satirique. Ses pourcentages ne mesurent rien de validé et ne comptent dans aucun score.</p>`, chapLien(2)),
    garder: "L'absurde, s'il use, se travaille comme le reste : en le nommant, et en le portant là où il peut changer."
  };

  // ───────── Synthèse
  const synCartes = [
    ["Tes réponses", L.fiable ? "Réponses variées" : "Réponses peu différenciées", `Sur les quatre dernières semaines.${L.paires.length ? ` ${L.paires.length} point${L.paires.length > 1 ? "s" : ""} à clarifier (annexe 1).` : ""}`, "annexes"],
    ["L'usure", coeurHauts.length ? liste(coeurHauts.map((d) => `${NOMS[d.id].toLowerCase()} (${niv(d).mot})`)) : "Pas de jauge haute", lectureUsure, "jauges"],
    ["Le travail", penche >= 4 ? "La balance penche du côté des exigences" : penche <= -4 ? "Ressources davantage déclarées" : "Scores proches, sans compensation démontrée", lectureBalance, "balance"],
    ["La récupération", `${cap(niv(sr.F).mot)} (${sr.F.score}/24)`, `${esc(sr.A.comment)} ${esc(sr.F.comment)}`, "batterie"],
    ["L'absurde", `${bsTitre} (${bs.percent} %)`, caseBS === "hh" ? "Absurdité déclarée avec distance ou perte de sens." : caseBS === "hb" ? "Absurdité déclarée, sans retrait fortement déclaré." : caseBS === "bh" ? "Distance ou perte de sens, avec peu d’absurdité déclarée." : "Peu de signaux sur ces thèmes.", "absurde"],
    ["Tes appuis", forts.length ? liste(forts.slice(0, 3).map((a) => APPUIS[a.id][0].toLowerCase())) : ressPresentes.length ? cap(liste(ressPresentes.slice(0, 2).map((id) => RESSOURCES[id][0].toLowerCase()))) : "À reconstruire", forts.length || ressPresentes.length ? "Ce sur quoi t'appuyer pour agir." : "Peu d'appuis nets : la page propose des premiers pas.", "appuis"]
  ];
  // ───────── Le verdict et la vue d'ensemble
  const usureMax = Math.max(...["A", "B", "C", "F"].map((id) => niv(sr[id]).n));
  const verdict = r.hasAlert ? { n: 3, t: "Un signal de sécurité est déclaré", d: "L’orientation dépend de la réponse concernée : consulte le message de sécurité distinct, sans interpréter le score total." }
    : usureMax >= 2 ? { n: 2, t: "Plusieurs manifestations ressortent", d: "Des difficultés sont déclarées fréquemment ; leur origine et leur retentissement demandent à être précisés." }
      : usureMax === 1 || sr.D.score >= 13 || sr.E.score >= 13 ? { n: 1, t: "Des éléments méritent attention", d: "Des manifestations ou contraintes ressortent sur certaines questions, sans qu’un niveau clinique soit déterminé." }
        : { n: 0, t: "Peu de difficultés déclarées", d: "Ce questionnaire ne fait pas ressortir de difficultés fréquentes dans les domaines explorés. Il ne remplace pas une appréciation médicale ou professionnelle." };
  const nDim = (d) => niv(d).n;
  const val = (v) => `${MOTS[nv24(v)]} · ${v}/24`;
  const ctxAggr = ctxOui.filter((a) => !["collectiveSignal", "previousMedicalAlert", "safetySensitiveJob"].includes(a.id));
  const causes = [
    { titre: "La balance", modele: "Exigences-ressources (JD-R) · chapitre 3", rows: [
      { label: "Exigences du travail", val: val(sr.D.score), n: nDim(sr.D), c: C.orange },
      { label: "Ressources présentes", val: `${ressources}/24`, n: nv24(ressources), c: C.mid }] },
    { titre: "Le retour", modele: "Effort-récompense (Siegrist) · chapitre 4", rows: [
      { label: "Effort", val: val(effort), n: nv24(effort), c: C.orange },
      { label: "Récompense", val: `${retour}/24`, n: nv24(retour), c: C.mid },
      { label: "Surengagement", val: val(surengagement), n: nv24(surengagement), c: VIOLET }] },
    { titre: "Éléments de contexte", modele: "Déclarations · chapitre 5 · hors score", rows: ctxAggr.length
      ? ctxAggr.slice(0, 4).map((a) => ({ label: a.label.length > 30 ? `${a.label.slice(0, 29)}…` : a.label, val: "signalé", n: a.id === "harassment" || a.id === "ethicalConflict" ? 2 : 1, c: C.orange }))
      : [{ label: "Rien de signalé", val: "", n: 0, c: C.piste }] }
  ];
  const fRecharge = 8 - item("F1").riskScore - item("F3").riskScore;
  const recharge = [
    { label: "Décrocher, loisirs", val: fRecharge >= 6 ? "ça tient" : fRecharge >= 3 ? "fragile" : "en panne", n: fRecharge >= 6 ? 2 : fRecharge >= 3 ? 1 : 0 },
    { label: "Tes appuis", val: forts.length ? `${forts.length} point${forts.length > 1 ? "s" : ""} fort${forts.length > 1 ? "s" : ""}` : "à reconstruire", n: forts.length >= 4 ? 3 : forts.length >= 2 ? 2 : forts.length ? 1 : 0 },
  ];
  const signes = [
    { label: "Épuisement (A)", v: sr.A.score, val: val(sr.A.score), n: nDim(sr.A) },
    { label: "Distance, cynisme (B)", v: sr.B.score, val: val(sr.B.score), n: nDim(sr.B) },
    { label: "Efficacité (4 items)", v: efficacite, max: 16, val: `${efficacite}/16`, n: nv24(relatif24(efficacite, 16)) },
    { label: "Sens / utilité (2 items)", v: perteSens, max: 8, val: `${perteSens}/8`, n: nv24(relatif24(perteSens, 8)), c: VIOLET }
  ];
  const nItem = (id) => [0, 0, 1, 2, 3][item(id).riskScore];
  const CORPS = { F2: "Sommeil perturbé", F4: "Symptômes physiques", F5: "Compensations pour tenir", F6: "Erreurs liées à la fatigue" };
  const corpsRows = Object.keys(CORPS).filter((id) => item(id).riskScore >= 2).map((id) => ({ label: CORPS[id], val: ratingLabels[item(id).rawScore].replace(/^\d+\s*-\s*/, ""), n: nItem(id), c: C.orange }));
  const corps = { titre: "Autres signaux déclarés", modele: "Récupération, retentissement · chapitre 1", rows: corpsRows.length ? corpsRows : [{ label: "Pas de signal net", val: "", n: 0, c: C.piste }] };
  const vue = { causes, recharge, signes, corps, alerte: r.hasAlert, aScore: sr.A.score, fScore: sr.F.score };
  const ensemble = `<figure class="rp-vue"><div class="rp-verdict v${verdict.n}"><span class="rp-feu" aria-hidden="true">${[0, 1, 2, 3].map((k) => `<i class="${k === verdict.n ? "on" : ""}"></i>`).join("")}</span><div><p class="t">${verdict.t}</p><p>${verdict.d}</p></div></div>
      ${vueEnsemble({ ...vue, etroit: false })}${vueEnsemble({ ...vue, etroit: true })}
      <details class="rp-pc rp-mode-emploi"><summary>Qu'est-ce qui est réellement mesuré ici ?</summary>
        <p><b>Directement déclaré :</b> les réponses A à F (0 à 4), les appuis G, les récompenses R et les éléments de contexte.</p>
        <p><b>Recalculé :</b> sommes A–F (0 à 24), indices partiels d'efficacité et de sens, effort/récompense/surengagement construits à partir de questions réutilisées, indice satirique du bullshitomètre.</p>
        <p><b>Non mesuré :</b> une réserve d'énergie, une probabilité individuelle de burn-out, l'effet protecteur de l'humour ou une relation causale entre les colonnes. Un score élevé n'est pas une urgence médicale à lui seul.</p>
      </details>
      <figcaption class="rp-legende"><b>Comment lire ce schéma :</b> à gauche, les contraintes et ressources déclarées (D/E, complétées par une lecture partielle de Siegrist et des éléments de contexte). Au centre, deux scores descriptifs distincts : épuisement (A) et récupération/santé (F). À droite, les manifestations déclarées (A, B, C et retentissements). <b>Les fils rapprochent des thèmes ; ils ne prouvent pas que le travail cause un symptôme, ni qu'une ressource le compense.</b> Leur épaisseur correspond à une convention interne, pas à une force de causalité. Les couleurs aident à se repérer, pas à diagnostiquer.</figcaption></figure>`;

  const synthese = `<header class="rp-syn-head"><p class="course-eyebrow">Synthèse</p><h2 tabindex="-1">Ce qui ressort de tes réponses</h2>
      <p>${esc(r.summary)}</p></header>${securite}${ensemble}
    <div class="rp-syn-cartes">${synCartes.map(([k, t, d, cible]) => `<button type="button" class="rp-syn-carte" data-aller="${cible}"><span class="k">${k}</span><span class="t">${esc(cap(t))}</span><span class="d">${d}</span></button>`).join("")}</div>
    ${ctxOui.length ? `<p class="rp-syn-ctx"><b>Contexte signalé :</b> ${esc(liste(ctxOui.map((a) => a.label.toLowerCase())))}. Cela ne change pas les scores, mais la lecture (pièce 5).</p>` : ""}
    <div class="rp-duo"><div class="rp-syn-bloc"><h3>Par quoi commencer</h3><ol>${r.actions.slice(0, 3).map((a) => `<li><b>${esc(a.title)}.</b> ${esc(a.text)}</li>`).join("")}</ol></div>
    <div class="rp-syn-bloc"><h3>Trois questions à emporter</h3><ul class="rp-q3">${questions.map(([k, q]) => `<li><span class="k">${k}</span>${esc(q)}</li>`).join("")}</ul></div></div>
    <div class="rp-syn-bloc rp-sommaire"><h3>Ton rapport, page par page</h3><p>D'abord tes appuis et le bullshitomètre, puis les neuf pièces de la formation, dans le même ordre.</p>
      <ol><li><button type="button" data-aller="appuis"><span class="n">★</span><span><b>Tes appuis</b><small>${esc(lectureAppuis)}</small></span></button></li><li><button type="button" data-aller="absurde"><span class="n">%</span><span><b>Le bullshitomètre</b><small>${pageAbsurde.bref.replace(/<[^>]+>/g, "")}</small></span></button></li>${etapes.map((e, i) => `<li><button type="button" data-aller="${e.id}"><span class="n">${i + 1}</span><span><b>${esc(pieces[i])}</b><small>${e.bref.replace(/<[^>]+>/g, "")}</small></span></button></li>`).join("")}</ol></div>`;

  // ───────── Annexes
  const definitions = `<h3>1. Comment ce rapport est construit</h3>
    <div class="rp-box ${L.fiable ? "ok" : "attention"}"><p class="k">État de tes réponses</p><p><b>${L.fiable ? "Réponses variées." : "Réponses répétitives ou extrêmes."}</b> ${L.fiable ? "La répartition des réponses est variée, sans constituer une preuve de fiabilité." : `${cap(L.prudence.join(" ; "))}. C'est possible, mais cela rend les écarts entre dimensions moins parlants.`} Ces contrôles décrivent uniquement la forme des réponses ; ils ne mesurent ni leur sincérité, ni leur qualité clinique.</p>
    ${L.paires.length ? `<p class="k">Points à clarifier</p><ul>${L.paires.map(([, , t, q]) => `<li>${esc(t)} <i>${esc(q)}</i></li>`).join("")}</ul><p>Ce ne sont pas des erreurs : deux réponses qui surprennent côte à côte sont souvent les plus utiles à discuter.</p>` : ""}</div>
    <ol class="rp-construit">
      <li><b>Les questions.</b> 36 questions notées de 0 (jamais ou presque) à 4 (presque toujours), sur les quatre dernières semaines, en six parties de six (A à F). Puis, hors score : 6 questions sur ce que tu donnes et ce qui revient (R, modèle de Siegrist), les 8 questions du bullshitomètre (satiriques, à choix), 6 questions sur ce qui t'aide (G). Enfin 8 questions de contexte et 3 questions d'alerte, en oui ou non.</li>
      <li><b>Le score d'une dimension.</b> La somme de ses six réponses, de 0 à 24. Les questions E décrivent des ressources : elles sont comptées à l'envers (4 moins la réponse) pour que, partout, un score haut signale une difficulté.</li>
      <li><b>Les niveaux.</b> 0 à 6 bas, 7 à 12 à surveiller, 13 à 18 élevé, 19 à 24 très élevé : quatre quarts de l'échelle, choisis pour la lecture, sans étalonnage.</li>
      <li><b>La lecture d'ensemble.</b> Seule une réponse positive aux trois questions de sécurité déclenche un message spécifique d'orientation. Les autres profils sont des regroupements descriptifs internes, sensibles aux seuils de commodité (13/24 notamment), sans valeur diagnostique. Le total A–F n'est pas interprété cliniquement.</li>
      <li><b>Les actions et les interlocuteurs.</b> Proposés par des règles explicites à partir des dimensions à 13 ou plus, des réponses à 3 ou 4 et du contexte. La sécurité passe toujours en premier.</li>
      <li><b>Le retour et l'image d'ensemble.</b> Effort (D1, D4, D6), récompense (E5, E6, R1 à R3) et surengagement (R4 à R6, F1) sont des moyennes ramenées sur 24. La partie C est présentée en deux sous-groupes sans extrapolation : efficacité (C1, C2, C4, C6 : 0–16) et sens (C3, C5 : 0–8). Le bullshitomètre reprend le calcul du test satirique (part du maximum possible) ; il est dit « haut » à partir de 50 %, et croisé avec B et le sens (13 sur 24 ou plus).</li>
      <li><b>Le contexte et tes appuis.</b> Ne modifient aucun score. Le contexte change les interlocuteurs proposés et la lecture ; les appuis (G, ressources E présentes, réponses à 0 ou 1) forment la page « Tes appuis ».</li>
    </ol>
    <p><b>Ce qui n'est pas validé.</b> Les questions s'inspirent d'outils reconnus (annexe 3), mais elles ont été reformulées et assemblées : le questionnaire Bull-Out n'a pas fait l'objet d'une étude de fidélité, de validité ni d'étalonnage. La validation des outils sources ne s'étend pas à ce composite. Il ne pose pas de diagnostic et ne doit pas servir à évaluer une personne au travail.</p>`;

  const annexeReponses = `<h3>2. Tes réponses, question par question</h3><p class="rp-legende">La jauge montre la valeur comptée dans le score (après inversion pour E).</p>
    ${sections.map((s) => `<h4 class="rp-h">${esc(s.title.replace(/ - score inversé$/, ""))} · ${sr[s.id].score}/24 ${tag(sr[s.id])}</h4>${reponses(sr[s.id], s, ratingLabels, r)}`).join("")}
    <h4 class="rp-h">${esc(strengthPart.title)} · hors score</h4><ol class="rp-items">${g.map((a) => `<li class="${a.value >= 3 ? "fort" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.value)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</span></span></li>`).join("")}</ol>
    <h4 class="rp-h">${esc(exchangePart.title)} · hors score</h4><ol class="rp-items">${(r.exchangeAnswers || []).map((a) => `<li><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.value)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</span></span></li>`).join("")}</ol>
    <h4 class="rp-h">Le bullshitomètre · hors score</h4><ol class="rp-items">${bs.answers.map((a) => `<li><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a"><span>${esc(a.answer)}</span></span></li>`).join("")}</ol>
    <h4 class="rp-h">Contexte</h4><ol class="rp-items">${r.contextAnswers.map((a, i) => `<li><span class="rp-id">X${i + 1}</span><span class="rp-q">${esc(a.text)}</span><span class="rp-a"><span>${a.yes ? "Oui" : "Non"}</span></span></li>`).join("")}</ol>
    <p class="rp-legende">Les réponses aux trois questions d'alerte ne sont pas reprises ici : seul le message de sécurité apparaît, en tête de rapport, si l'une a reçu oui.</p>`;

  const annexeSources = `<h3>3. Les modèles et questionnaires dont les questions s'inspirent</h3>
    <p>Chaque partie du questionnaire reprend des dimensions décrites par ces travaux. Les questions ont été réécrites en français simple ; aucune n'est une traduction d'un item protégé.</p>
    <table class="rp-table rp-sources"><thead><tr><th scope="col">Partie</th><th scope="col">Ce qu'elle explore</th><th scope="col">Inspirée de</th></tr></thead><tbody>
    ${sections.map((s) => `<tr><th scope="row"><span class="rp-id">${s.id}</span> ${NOMS[s.id]}</th><td>${esc(cap(s.explore))}</td><td>${esc(cap(s.sources))}.</td></tr>`).join("")}
    <tr><th scope="row"><span class="rp-id">R</span> Ce qui revient</th><td>${esc(cap(exchangePart.explore))}</td><td>${esc(cap(exchangePart.sources))}.</td></tr>
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
        ${r.hasAlert ? `<p class="rp-securite-mini" role="note">Rappel : une de tes réponses demande de l'aide rapidement (3114, 15 ou 112). Voir la synthèse.</p>` : ""}
        ${bref(e.bref)}<div class="rp-corps">${e.corps}</div>${e.comprendre}${garder(e.garder, i === etapes.length - 1)}`
    })),
    { id: "annexes", court: "Annexes", html: `<header class="rp-etape-head"><p class="rp-n">Annexes</p><h2 tabindex="-1">Comment lire, ce que tu as répondu, d'où viennent les questions</h2></header>
      <section class="rp-annexe" id="annexe-1">${definitions}</section><section class="rp-annexe" id="annexe-2">${annexeReponses}</section><section class="rp-annexe" id="annexe-3">${annexeSources}</section>` }
  ];

  const nav = (i) => {
    const prev = pages[i - 1], next = pages[i + 1];
    return `<nav class="rp-pager" aria-label="Pièces du rapport">${prev ? `<button type="button" class="button secondary" data-aller="${prev.id}">← ${esc(prev.court)}</button>` : "<span></span>"}${next ? `<button type="button" class="button primary" data-aller="${next.id}">${esc(next.court)} →</button>` : `<a class="button primary" href="agir.html">Explorer les leviers d'action</a>`}</nav>`;
  };

  return `<header class="rapport-cover">
      <p class="course-eyebrow">Étape 3 · Rapport personnel</p>
      <h1 id="rapport-titre" tabindex="-1">Ton rapport Bull-Out</h1>
      <p class="rp-slogan">Prévention burn-out sans bullshit</p>
      <p id="rapport-date">Établi le ${date}, sur tes quatre dernières semaines.</p>
      <p>Ce rapport s'inspire de questionnaires utilisés en recherche et en santé au travail, reformulés pour être clairs. Le questionnaire Bull-Out et son analyse n'ont pas été validés scientifiquement : ils servent à comprendre ce qui ressort et à préparer une discussion, pas à poser un diagnostic.</p>
      <div class="parcours-tools rp-outils">
        <fieldset class="rp-pdf"><legend>Ce que contient le PDF</legend>
          <label><input type="radio" name="rp-pdf" value="complet" checked> <b>Complet</b> : tout le rapport</label>
          <label><input type="radio" name="rp-pdf" value="court"> <b>Court</b> : synthèse, plan et portes, à montrer en consultation</label>
          <label><input type="checkbox" name="rp-reponses" checked> Inclure mes réponses, question par question</label>
        </fieldset>
        <button class="button anis" type="button" id="imprimer">Enregistrer en PDF</button>
        <button class="button secondary" type="button" id="copy-results">Copier le résumé</button>
        <a href="#questionnaire">Revoir mes réponses</a>
      </div>
      <p class="rp-prive">Rien ne quitte ton navigateur. Pour le PDF : dans la fenêtre d'impression, choisis « Enregistrer au format PDF ».</p>
    </header>
    <nav class="rapport-nav rp-nav" aria-label="Sommaire du rapport">${pages.map((p) => `<button type="button" data-aller="${p.id}">${esc(p.court)}</button>`).join("")}</nav>
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
  racine.classList.toggle("pdf-court", racine.querySelector('[name="rp-pdf"]:checked')?.value === "court");
  racine.classList.toggle("pdf-sans-reponses", !racine.querySelector('[name="rp-reponses"]')?.checked);
}

document.addEventListener("bullout:rapport", (event) => {
  racine.innerHTML = composer(event.detail);
  montrer("synthese", false);
  optionsPDF();
});

racine.addEventListener("click", (event) => {
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
