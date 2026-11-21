// Le schéma Bull-Out : un seul dessin pour l'accueil, la formation et le rapport.
// Il se construit chapitre par chapitre, comme le papillon de Papillon : chaque pièce apporte une donnée ET une règle de lecture.
//
//   [ Ton travail ]  →  [ Ta fatigue ]  →  [ Les impacts ]      ← trois jauges : la vue d'ensemble, d'un coup d'œil
//    LE TRAVAIL           TOI                L'IMPACT DANS TA VIE ← sous chaque jauge, le pourquoi
//    deux pesées          ta fatigue         ta relation au travail (Maslach)
//    l'absurde            trop investi·e ?   ton corps
//                         ton recul, appuis  ta vie hors travail
//
// Règles : chaque question n'est dessinée qu'à un seul endroit ; chaque case pose une question simple ;
// la couleur dit l'effet pour la personne (vert protège, jaune à surveiller, orange use). Pas de fils entre les colonnes :
// l'ordre des zones suffit, et des fils feraient croire à des causes. Le cadre ne bouge jamais : les pièces à venir restent en pointillés.

const C = { sapin: "#123a33", mid: "#1d5c50", card: "#fffdf8", anis: "#d8f25c", orange: "#e8794f", ink: "#b4512b", piste: "#ddd4c2", muted: "#5d6f6a", rouge: "#b3261e", appui: "#e3eee9", creme: "#f6efe2", violet: "#6b5b95" };
// Code couleur unique : la couleur dit l'effet pour la personne, jamais si le chiffre est haut.
export const NIVC = [C.mid, "#d9a21b", C.orange, "#a8401c"];
export const NIVMOTS = ["ça va", "à surveiller", "ça use", "ça use beaucoup"];

// Une pièce par chapitre (index 0 = chapitre 1).
export const PIECES = [
  ["fatigue", "corps"],                     // 1 · fatigue ou usure : le repos te rend-il ce que le travail te prend ? (effort-récupération)
  ["relation"],                             // 2 · les trois signes (Maslach) : l'épuisement est dans ta fatigue, les deux autres dans l'impact
  ["pesee1"],                               // 3 · ton travail t'aide-t-il assez ? (exigences-ressources)
  ["pesee2", "investi"],                    // 4 · ce que tu donnes est-il payé ? (Siegrist) et trop investi·e ?
  ["absurde", "recul"],                     // 5 · l'absurde : du travail pour rien, et ton recul face à lui
  ["appuis", "vie"],                        // 6 · « c'est perso » : ce qui te tient, ce que tu sacrifies
  ["jauges"],                               // 7 · ce que valent les mesures : trois jauges, trois mots, pas un pourcentage
  ["familles"],                             // 8 · les six familles de risques (Gollac, INRS) : des pastilles sur LE TRAVAIL, l'exposition avant l'usure
  ["leviers"],                              // 9 · agir : on agit sur le travail, on prend soin de soi, on suit l'impact
  ["temps"],                                // 10 · la loi et la trace : une carte se lit avec des dates
  ["portes"],                               // 11 · à qui en parler : une porte par zone, et la sécurité à part
];
export const NOMS_PIECES = {
  fatigue: "Ta fatigue", corps: "Ton corps", relation: "Ta relation au travail", pesee1: "Ton travail t'aide-t-il assez ?",
  pesee2: "Ce que tu donnes est-il payé ?", investi: "Trop investi·e ?", absurde: "L'absurde", recul: "Ton recul face à l'absurde",
  appuis: "Tes appuis", vie: "Ta vie hors travail", jauges: "Les trois jauges", leviers: "Où agir", temps: "Depuis quand ?", portes: "Les portes",
  familles: "Les six familles de risques",
};
// Les six familles de risques psychosociaux (Gollac, INRS) décrivent la colonne LE TRAVAIL : pas de case à elles,
// mais une pastille numérotée sur la case qui les mesure. La pièce « familles » est posée au chapitre 8.
// d.familles = numéros des familles qui ressortent (allumées).
export const FAMILLES = ["", "Intensité et temps de travail", "Exigences émotionnelles", "Autonomie", "Rapports sociaux", "Conflits de valeurs", "Insécurité"];

// Sam, 38 ans, coordinateur logistique : l'exemple fictif de la formation et de l'accueil.
export const SAM = {
  jauges: [
    { n: 2, mot: "lourd", sous: "surtout la charge et l'absurde" },
    { n: 2, mot: "forte", sous: "le repos ne suffit plus" },
    { n: 2, mot: "des signes nets", sous: "surtout les erreurs" },
  ],
  pesee1: { g: { label: "On te demande", mot: "beaucoup", n: 2 }, d: { label: "Ce qui t'aide", mot: "peu", n: 2 }, penche: 1, verdict: "Ça penche : plus de demandes que d'aide" },
  pesee2: { g: { label: "Tu donnes", mot: "beaucoup", n: 2 }, d: { label: "Tu reçois", mot: "peu", n: 2 }, penche: 1, verdict: "Ça penche : tu donnes plus que tu ne reçois" },
  absurde: { rows: [{ label: "Tâches inutiles", mot: "souvent", n: 2 }, { label: "Qualité empêchée", mot: "parfois", n: 1 }] },
  fatigue: { n: 2, epuisement: { v: 17, max: 24, n: 2, mot: "ça use" }, conclusion: "le repos ne répare plus",
    rows: [{ label: "Décrocher le soir", mot: "rarement", n: 2 }, { label: "Sommeil", mot: "perturbé", n: 2 }, { label: "En congé", mot: "ça revient vite", n: 2 }] },
  investi: { rows: [{ label: "Refuser, prouver, y penser", mot: "parfois", n: 1 }] },
  recul: { rows: [{ label: "Tu en ris", mot: "souvent", n: 0 }, { label: "Ça te reste le soir", mot: "parfois", n: 1 }] },
  appuis: { rows: [{ label: "Points forts", mot: "2 (amis, sport)", n: 0 }], cote: "À côté : une séparation · hors score" },
  relation: [
    { label: "Distance, cynisme", v: 11, max: 24, n: 1, m: true },
    { label: "Perte d'efficacité", v: 6, max: 16, n: 1, m: true },
    { label: "Perte de sens", v: 3, max: 8, n: 1 },
  ],
  corps: { rows: [{ label: "Symptômes", mot: "parfois", n: 1 }, { label: "Erreurs, oublis", mot: "souvent", n: 2 }, { label: "Pour tenir (alcool…)", mot: "rarement", n: 0 }] },
  vie: { rows: [{ label: "Loisirs, liens", mot: "réduits", n: 1 }, { label: "Envie de partir", mot: "non", n: 0 }] },
  temps: { duree: "3 mois à un an", evolution: "ça augmente", conge: "ça revient vite" },
  familles: [1, 4, 5],
  securite: false,
};

const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}"${o.a ? ` text-anchor="${o.a}"` : ""} fill="${o.c || C.sapin}" font-size="${o.size || 13}" font-weight="${o.w || 600}" font-family="${o.titre ? "Poppins, sans-serif" : "Inter, sans-serif"}"${o.op ? ` opacity="${o.op}"` : ""}${o.it ? ' font-style="italic"' : ""}>${esc(s)}</text>`;
const JAUGES = [["Ton travail", "LE TRAVAIL", "Que te demande-t-il ? Que te rend-il ?"], ["Ta fatigue", "TOI", "Comment tu tiens ?"], ["Les impacts", "L'IMPACT DANS TA VIE", "Qu'est-ce que ça change ?"]];

/**
 * Dessine le schéma.
 * d : données (SAM par défaut) ; chapitre : -1 = vide, 0 à 10 = construit jusqu'à ce chapitre (sa pièce en anis), absent = complet.
 * etroit : mise en page téléphone (colonne unique). couches : classes rp-layer pour la lecture pas à pas du rapport.
 * jauges : false pour ne pas redessiner les jauges quand la page les montre déjà juste au-dessus (rapport).
 */
export function schema({ d = SAM, chapitre = PIECES.length, etroit = false, titre = "", classe = "bo-schema", couches = false, jauges = true } = {}) {
  const faites = new Set(PIECES.slice(0, chapitre + 1).flat());
  const ici = new Set(PIECES[chapitre] || []);
  const etat = (id) => (ici.has(id) ? "ici" : faites.has(id) ? "fait" : "avenir");
  const vu = (id) => etat(id) !== "avenir";
  const halo = (id, x, y, w, h) => (etat(id) === "ici" ? `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="16" fill="${C.anis}"/>` : "");
  const attente = (x, y, w, h, nom) => `<g opacity=".55"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${C.sapin}" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="5 5"/>${T(x + w / 2, y + Math.min(h / 2, 40) + 5, nom, { a: "middle", c: C.muted, w: 500 })}</g>`;
  const cadre = (x, y, w, h, fond = C.card, pointille = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fond}" stroke="${C.sapin}" stroke-opacity="${pointille ? .45 : .25}" stroke-width="1.5"${pointille ? ' stroke-dasharray="5 4"' : ""}/>`;
  const tete = (x, y, nom, sous) => T(x + 12, y + 21, nom, { titre: true, w: 800, size: 14 }) + (sous ? T(x + 12, y + 37, sous, { size: 11, w: 500, c: C.muted }) : "");
  const point = (x, y, n) => `<circle cx="${x}" cy="${y}" r="5" fill="${NIVC[n || 0]}"/>`;
  const ligne = (x, y, w, r) => `${point(x + 18, y - 4, r.n)}${T(x + 30, y, r.label, { size: 12.5, w: 500 })}${T(x + w - 10, y, r.mot, { a: "end", size: 12, w: 700, c: (r.n || 0) >= 2 ? C.ink : C.muted })}`;
  const lignes = (x, y, w, rows, pas = 24) => (rows || []).map((r, i) => ligne(x, y + i * pas, w, r)).join("");
  const barre = (x, y, w, b) => `${T(x, y, b.label || "", { size: 12.5, w: 500 })}${T(x + w, y, b.mot || NIVMOTS[b.n || 0], { a: "end", size: 11.5, w: 700, c: (b.n || 0) >= 2 ? C.ink : C.muted })}<rect x="${x}" y="${y + 5}" width="${w}" height="7" rx="3.5" fill="${C.piste}"/><rect x="${x}" y="${y + 5}" width="${Math.max(5, Math.round(w * Math.min(1, (b.v || 0) / (b.max || 24))))}" height="7" rx="3.5" fill="${NIVC[b.n || 0]}"/>`;
  // M : un des trois signes de Maslach. Visible dès le chapitre 2.
  const M = (x, y) => (vu("relation") ? `<circle cx="${x}" cy="${y}" r="8" fill="${C.anis}" stroke="${C.sapin}" stroke-width="1"/>${T(x, y + 4, "M", { a: "middle", size: 10, w: 800 })}` : "");
  // Pastilles des six familles (pièce « familles ») : allumées en orange si la famille ressort, sinon claires.
  const pastilles = (x, y, nums) => (vu("familles") ? nums.map((k, i) => { const on = (d.familles || []).includes(k), cx = x + i * 22; return `<g><title>${esc(FAMILLES[k])}</title><circle cx="${cx}" cy="${y}" r="9" fill="${on ? C.orange : C.card}" stroke="${on ? C.ink : C.sapin}" stroke-opacity="${on ? 1 : .5}" stroke-width="1.3"/>${T(cx, y + 4, String(k), { a: "middle", size: 10.5, w: 800, c: on ? "#fff" : C.sapin })}</g>`; }).join("") : "");
  // Une boîte : vue (avec halo si c'est la pièce du chapitre) ou en attente.
  const boite = (id, x, y, w, h, contenu, fond, pointille) => (vu(id) ? `<g>${halo(id, x, y, w, h)}${cadre(x, y, w, h, fond, pointille)}${contenu}</g>` : attente(x, y, w, h, NOMS_PIECES[id]));
  const g = (cls, inner) => (couches ? `<g class="rp-layer rp-layer-${cls}">${inner}</g>` : `<g>${inner}</g>`);

  // La jauge : un demi-cercle à quatre crans, une aiguille, un mot.
  const jauge = (cx, cy, r, j, nom) => {
    const n = j?.n ?? null;
    let s = "";
    for (let k = 0; k < 4; k++) {
      const a0 = Math.PI * (1 - k / 4), a1 = Math.PI * (1 - (k + 1) / 4) + .04;
      const p = (a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy - r * Math.sin(a)).toFixed(1)}`;
      s += `<path d="M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}" fill="none" stroke="${NIVC[k]}" stroke-width="${(r * .26).toFixed(1)}" opacity="${k === n ? 1 : .28}"/>`;
    }
    if (n !== null) {
      const ang = Math.PI * (1 - (n + .5) / 4);
      s += `<line x1="${cx}" y1="${cy}" x2="${(cx + r * .72 * Math.cos(ang)).toFixed(1)}" y2="${(cy - r * .72 * Math.sin(ang)).toFixed(1)}" stroke="${C.sapin}" stroke-width="4" stroke-linecap="round"/>`;
    }
    return `${s}<circle cx="${cx}" cy="${cy}" r="5.5" fill="${C.sapin}"/>${T(cx, cy + 22, nom, { a: "middle", titre: true, w: 800, size: 13 })}${T(cx, cy + 40, j?.mot || "non renseigné", { a: "middle", size: 13, w: 700, c: (n || 0) >= 2 ? C.ink : C.mid })}${j?.sous ? T(cx, cy + 56, j.sous, { a: "middle", size: 11, w: 500, c: C.muted }) : ""}`;
  };
  // La pesée : la question en titre, chaque plateau porte son étiquette, une phrase dit de quel côté ça penche.
  const pesee = (id, x, y, w, nom, modele, p, detail, fam = {}) => {
    const cx = x + w / 2, by = y + 116, demi = Math.min(68, w / 4), pen = p?.penche ?? 0;
    const yL = by + 14 * pen, yR = by - 14 * pen;
    const tag = (px, py, o) => `<rect x="${px - 58}" y="${py - 44}" width="116" height="38" rx="9" fill="${C.card}" stroke="${NIVC[o.n || 0]}" stroke-width="2"/>${T(px, py - 28, o.label, { a: "middle", size: 11.5, w: 600 })}${T(px, py - 12, o.mot, { a: "middle", size: 12.5, w: 800, c: (o.n || 0) >= 2 ? C.ink : NIVC[o.n || 0] })}<path d="M${px - 40} ${py} H${px + 40}" stroke="${NIVC[o.n || 0]}" stroke-width="5" stroke-linecap="round"/>`;
    const corps = p ? `<line x1="${cx - demi}" y1="${yL}" x2="${cx + demi}" y2="${yR}" stroke="${C.sapin}" stroke-width="3.5" stroke-linecap="round"/>${tag(cx - demi, yL - 4, p.g)}${tag(cx + demi, yR - 4, p.d)}
      <path d="M${cx} ${by} L${cx - 11} ${by + 30} H${cx + 11}Z" fill="${C.sapin}"/><circle cx="${cx}" cy="${by}" r="4" fill="${C.anis}" stroke="${C.sapin}"/>
      ${pastilles(cx - demi - 11 * ((fam.g || []).length - 1), yL - 58, fam.g || [])}${pastilles(cx + demi - 11 * ((fam.d || []).length - 1), yR - 58, fam.d || [])}
      ${T(cx, y + 166, p.verdict || "", { a: "middle", size: 12, w: 700, c: pen ? C.ink : C.mid })}${T(cx, y + 182, detail, { a: "middle", size: 11, w: 500, c: C.muted })}` : T(cx, y + 110, "non renseigné", { a: "middle", size: 12, w: 600, c: C.muted });
    return boite(id, x, y, w, 192, tete(x, y, nom, modele) + corps);
  };
  // La boucle effort → repos : fermée et verte quand le repos répare ; ouverte et orange quand il ne suffit plus.
  const boucle = (cx, cy, n) => {
    const r = 17, ouvert = n >= 2, coul = NIVC[n || 0];
    const a0 = -Math.PI / 2 + (ouvert ? .7 : .2), a1 = -Math.PI / 2 + 2 * Math.PI - .2;
    const p = (a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    const fx = cx + r * Math.cos(a1), fy = cy + r * Math.sin(a1);
    return `<path d="M${p(a0)} A${r} ${r} 0 1 1 ${p(a1)}" fill="none" stroke="${coul}" stroke-width="4.5" stroke-linecap="round"/><path d="M${(fx - 7).toFixed(1)} ${(fy - 5).toFixed(1)} L${(fx + 1).toFixed(1)} ${fy.toFixed(1)} L${(fx - 6).toFixed(1)} ${(fy + 6).toFixed(1)}" fill="none" stroke="${coul}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  // Le pipeau de l'absurde (double sens : l'instrument et le discours creux).
  const pipeau = (x, y) => `<g transform="translate(${x} ${y}) rotate(-20)"><rect x="0" y="0" width="44" height="8" rx="4" fill="${C.violet}"/><rect x="-6" y="-1" width="10" height="10" rx="3" fill="${C.violet}"/>${[14, 23, 32].map((h) => `<circle cx="${h}" cy="4" r="1.8" fill="#fff"/>`).join("")}</g>${T(x + 46, y - 14, "♪", { size: 13, c: C.violet })}${T(x + 56, y - 4, "♫", { size: 11, c: C.violet })}`;
  const securite = (x, y, w) => d.securite
    ? `<rect x="${x}" y="${y}" width="${w}" height="34" rx="10" fill="#fbe3d8" stroke="${C.rouge}" stroke-width="1.5"/>${T(x + 14, y + 22, "Signal de sécurité déclaré : lis d'abord le message à part", { size: 12.5, w: 800, c: C.rouge })}`
    : `<rect x="${x}" y="${y}" width="${w}" height="34" rx="10" fill="none" stroke="${C.rouge}" stroke-opacity=".5" stroke-dasharray="4 4"/>${T(x + 14, y + 22, "Sécurité, toujours à part : 15 · 112 · 3114 (idées suicidaires)", { size: 12.5, w: 600, c: C.rouge })}`;

  // ── Le contenu de chaque case, pour une largeur w donnée (le même en grand et sur téléphone).
  const fatigue = (x, y, w) => {
    const f = d.fatigue || {};
    return boite("fatigue", x, y, w, 190, tete(x, y, "Ta fatigue", "effort-récupération · ch. 1") + boucle(x + w - 34, y + 30, f.n)
      + M(x + 20, y + 60) + barre(x + 34, y + 64, w - 46, { label: "Épuisement", ...(f.epuisement || {}) })
      + lignes(x, y + 108, w, f.rows, 22) + (f.conclusion ? T(x + 12, y + 176, f.conclusion, { size: 11.5, w: 700, c: (f.n || 0) >= 2 ? C.ink : C.mid, it: true }) : ""));
  };
  const investi = (x, y, w) => boite("investi", x, y, w, 64, tete(x, y, "Trop investi·e ?") + lignes(x, y + 48, w, d.investi?.rows));
  const recul = (x, y, w) => boite("recul", x, y, w, 100, tete(x, y, "Ton recul face à l'absurde", "ta réaction · ch. 5") + lignes(x, y + 62, w, d.recul?.rows));
  const appuis = (x, y, w) => boite("appuis", x, y, w, 120, tete(x, y, "Tes appuis", "ce qui te tient · ch. 6") + lignes(x, y + 62, w, d.appuis?.rows)
    + (d.appuis?.cote ? `<rect x="${x + 10}" y="${y + 76}" width="${w - 20}" height="32" rx="8" fill="none" stroke="${C.sapin}" stroke-opacity=".45" stroke-dasharray="4 4"/>${T(x + 20, y + 96, d.appuis.cote, { size: 11.5, w: 500, c: C.muted })}` : ""), C.appui);
  const absurde = (x, y, w) => boite("absurde", x, y, w, 100, tete(x, y, "L'absurde", "du travail pour rien · ch. 5") + pipeau(x + w - 70, y + 22) + pastilles(x + w - 86, y + 28, [5]) + lignes(x, y + 64, w, d.absurde?.rows));
  const relation = (x, y, w) => boite("relation", x, y, w, 190, tete(x, y, "Ta relation au travail", "Maslach · ch. 2")
    + `${M(x + w - 92, y + 32)}${vu("relation") ? T(x + w - 10, y + 36, "= Maslach", { a: "end", size: 11, w: 700, c: C.mid }) : ""}`
    + (d.relation || []).map((b, i) => `${b.m ? M(x + 20, y + 64 + i * 44) : ""}${barre(x + 34, y + 68 + i * 44, w - 46, b)}`).join(""));
  const corps = (x, y, w) => boite("corps", x, y, w, 110, tete(x, y, "Ton corps", "ce que la fatigue abîme · ch. 1") + lignes(x, y + 60, w, d.corps?.rows, 22));
  const vie = (x, y, w) => boite("vie", x, y, w, 90, tete(x, y, "Ta vie hors travail", "ce que tu sacrifies · ch. 6") + lignes(x, y + 60, w, d.vie?.rows, 22));
  const t = d.temps || {};
  const AGIR = [["AGIR ICI", "retirer · reporter · simplifier"], ["PRENDRE SOIN", "repos, appuis, sans tout porter seul"], ["SUIVRE", "pour voir si ça bouge, pas pour juger"]];
  const PORTES = [["POUR LE TRAVAIL", "manager · RH · CSE"], ["POUR TOI", "médecin traitant · psy"], ["ENTRE LES DEUX", "médecin du travail"]];

  let s = "", H;
  if (!etroit) {
    const W = 900, w = 272, X = [18, 314, 610];
    let top = 14;
    if (jauges) {
      if (vu("jauges")) {
        s += g("jauges", X.map((x, i) => `${halo("jauges", x, top, w, 128)}${cadre(x, top, w, 128)}${jauge(x + w / 2, top + 58, 42, (d.jauges || [])[i], JAUGES[i][0])}`).join("")
          + [0, 1].map((i) => `<path d="M${X[i] + w + 6} ${top + 64} H${X[i + 1] - 6}" stroke="${C.sapin}" stroke-width="2.5" opacity=".45"/><path d="M${X[i + 1] - 14} ${top + 58} L${X[i + 1] - 6} ${top + 64} L${X[i + 1] - 14} ${top + 70}" fill="none" stroke="${C.sapin}" stroke-width="2.5" opacity=".45" stroke-linecap="round"/>`).join(""));
      } else s += X.map((x, i) => attente(x, top, w, 128, i === 1 ? "Les trois jauges" : "")).join("");
      top += 152;
    }
    s += X.map((x, i) => T(x + 4, top, JAUGES[i][1], { titre: true, w: 800, size: 12, c: C.ink }) + T(x + 4, top + 15, JAUGES[i][2], { size: 11.5, w: 500, c: C.muted })).join("");
    const y0 = top + 26;
    s += g("work", pesee("pesee1", X[0], y0, w, "Ton travail t'aide-t-il assez ?", "exigences-ressources · ch. 3", d.pesee1, "aide = marge, manager, collègues, clarté", { g: [1, 2], d: [3, 4] })
      + pesee("pesee2", X[0], y0 + 202, w, "Ce que tu donnes est-il payé ?", "effort-récompense · ch. 4", d.pesee2, "reçois = estime, équité, salaire, avenir", { d: [6] })
      + absurde(X[0], y0 + 404, w));
    s += g("person", fatigue(X[1], y0, w) + investi(X[1], y0 + 200, w) + recul(X[1], y0 + 274, w));
    s += g("support", appuis(X[1], y0 + 384, w));
    s += g("manifest", relation(X[2], y0, w) + corps(X[2], y0 + 200, w) + vie(X[2], y0 + 320, w));
    // Où agir (chapitre 9) : sous chaque zone.
    const yA = y0 + 520;
    s += vu("leviers") ? g("leviers", X.map((x, i) => `${halo("leviers", x, yA, w, 48)}<rect x="${x}" y="${yA}" width="${w}" height="48" rx="12" fill="${i === 0 ? C.mid : C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>${T(x + w / 2, yA + 20, AGIR[i][0], { a: "middle", titre: true, w: 800, size: 12, c: i === 0 ? "#fff" : C.sapin })}${T(x + w / 2, yA + 38, AGIR[i][1], { a: "middle", size: 11.5, w: 600, c: i === 0 ? C.anis : C.muted })}`).join(""))
      : X.map((x, i) => attente(x, yA, w, 48, i === 1 ? "Où agir" : "")).join("");
    // Depuis quand (chapitre 10).
    const yT = yA + 62, Wt = W - 36;
    if (vu("temps")) {
      const c3 = [["DEPUIS", t.duree], ["ÉVOLUTION", t.evolution], ["EN CONGÉ", t.conge]];
      s += g("temps", `${halo("temps", 18, yT, Wt, 56)}${cadre(18, yT, Wt, 56)}<path d="M30 ${yT + 46} H${W - 36}" stroke="${C.sapin}" stroke-opacity=".3" stroke-width="2"/><path d="M${W - 42} ${yT + 41} L${W - 34} ${yT + 46} L${W - 42} ${yT + 51}" fill="none" stroke="${C.sapin}" stroke-opacity=".4" stroke-width="2"/>
        ${T(32, yT + 24, "Depuis quand ?", { titre: true, w: 800, size: 14 })}${c3.map(([k, v], i) => `${T(250 + i * 210, yT + 20, k, { size: 10.5, w: 800, c: C.ink })}${T(250 + i * 210, yT + 36, v || "—", { size: 12.5, w: 600 })}`).join("")}`);
    } else s += attente(18, yT, Wt, 56, "Depuis quand ?");
    // Les portes et la sécurité (chapitre 11).
    const yP = yT + 70;
    if (vu("portes")) {
      s += g("portes", `${halo("portes", 18, yP, Wt, 92)}${cadre(18, yP, Wt, 92)}${X.map((x, i) => `${T(x + 12, yP + 20, PORTES[i][0], { size: 10.5, w: 800, c: C.ink })}${T(x + 12, yP + 37, PORTES[i][1], { size: 12.5, w: 600 })}`).join("")}${securite(30, yP + 48, Wt - 24)}`);
    } else s += attente(18, yP, Wt, 92, "Les portes");
    const yL = yP + 120;
    s += NIVC.map((c, i) => `<circle cx="${26 + i * 190}" cy="${yL - 4}" r="6" fill="${c}"/>${T(38 + i * 190, yL, i === 0 ? "ça va, ça protège" : NIVMOTS[i], { size: 12.5, w: 600 })}`).join("")
      + T(W - 18, yL, "la couleur dit l'effet pour toi", { a: "end", size: 11.5, w: 500, c: C.muted, it: true });
    H = yL + 14;
    return `<svg class="${classe} large" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(titre || label(chapitre))}">${s}</svg>`;
  }
  // Téléphone : une colonne, dans le même ordre (les jauges, puis le travail, toi, l'impact).
  const W = 380, x = 10, w = W - 20;
  let y = 8;
  const pile = [];
  const pose = (h, f) => { pile.push(f(y)); y += h + 12; };
  if (jauges) {
    pose(116, (yy) => (vu("jauges") ? g("jauges", `${halo("jauges", x, yy, w, 116)}${cadre(x, yy, w, 116)}${[0, 1, 2].map((i) => jauge(x + 60 + i * 120, yy + 46, 30, (d.jauges || [])[i], JAUGES[i][0]).replace(/<text[^>]*font-size="11"[^>]*>[^<]*<\/text>/, "")).join("")}`) : attente(x, yy, w, 116, "Les trois jauges")));
  }
  const titreZone = (i) => { pile.push(T(x, y + 6, JAUGES[i][1], { titre: true, w: 800, size: 12, c: C.ink }) + T(x, y + 21, JAUGES[i][2], { size: 11.5, w: 500, c: C.muted })); y += 32; };
  titreZone(0);
  pose(192, (yy) => g("work", pesee("pesee1", x, yy, w, "Ton travail t'aide-t-il assez ?", "exigences-ressources · ch. 3", d.pesee1, "aide = marge, manager, collègues, clarté", { g: [1, 2], d: [3, 4] })));
  pose(192, (yy) => g("work", pesee("pesee2", x, yy, w, "Ce que tu donnes est-il payé ?", "effort-récompense · ch. 4", d.pesee2, "reçois = estime, équité, salaire, avenir", { d: [6] })));
  pose(100, (yy) => g("work", absurde(x, yy, w)));
  titreZone(1);
  pose(190, (yy) => g("person", fatigue(x, yy, w)));
  pose(64, (yy) => g("person", investi(x, yy, w)));
  pose(100, (yy) => g("person", recul(x, yy, w)));
  pose(120, (yy) => g("support", appuis(x, yy, w)));
  titreZone(2);
  pose(190, (yy) => g("manifest", relation(x, yy, w)));
  pose(110, (yy) => g("manifest", corps(x, yy, w)));
  pose(90, (yy) => g("manifest", vie(x, yy, w)));
  pose(92, (yy) => (vu("leviers") ? g("leviers", `${halo("leviers", x, yy, w, 92)}${cadre(x, yy, w, 92)}${T(x + 12, yy + 21, "Où agir", { titre: true, w: 800, size: 14 })}${AGIR.map(([k, v], i) => `${T(x + 12, yy + 44 + i * 18, k, { size: 11.5, w: 800, c: C.ink })}${T(x + 120, yy + 44 + i * 18, v, { size: 12, w: 600 })}`).join("")}`) : attente(x, yy, w, 92, "Où agir")));
  pose(92, (yy) => (vu("temps") ? g("temps", `${halo("temps", x, yy, w, 92)}${cadre(x, yy, w, 92)}${T(x + 12, yy + 21, "Depuis quand ?", { titre: true, w: 800, size: 14 })}${[["Depuis", t.duree], ["Évolution", t.evolution], ["En congé", t.conge]].map(([k, v], i) => `${T(x + 12, yy + 44 + i * 18, k, { size: 12, w: 700, c: C.ink })}${T(x + 110, yy + 44 + i * 18, v || "—", { size: 12.5, w: 600 })}`).join("")}`) : attente(x, yy, w, 92, "Depuis quand ?")));
  pose(130, (yy) => (vu("portes") ? g("portes", `${halo("portes", x, yy, w, 130)}${cadre(x, yy, w, 130)}${T(x + 12, yy + 21, "Les portes", { titre: true, w: 800, size: 14 })}${[["Travail", "manager · RH · CSE"], ["Toi", "médecin traitant · psy"], ["Les deux", "médecin du travail"]].map(([k, v], i) => `${T(x + 12, yy + 44 + i * 18, k, { size: 12, w: 700, c: C.ink })}${T(x + 90, yy + 44 + i * 18, v, { size: 12.5, w: 600 })}`).join("")}${securite(x + 8, yy + 88, w - 16).replace(/Sécurité, toujours à part : /, "Sécurité : ").replace(/ \(idées suicidaires\)/, "")}`) : attente(x, yy, w, 130, "Les portes")));
  pile.push(NIVC.map((c, i) => `<circle cx="${x + 8 + (i % 2) * 180}" cy="${y + 2 + Math.floor(i / 2) * 20}" r="6" fill="${c}"/>${T(x + 20 + (i % 2) * 180, y + 6 + Math.floor(i / 2) * 20, i === 0 ? "ça va, ça protège" : NIVMOTS[i], { size: 12.5, w: 600 })}`).join(""));
  H = y + 34;
  return `<svg class="${classe} etroit" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(titre || label(chapitre))}">${pile.join("")}</svg>`;
}

function label(chapitre) {
  if (chapitre < 0) return "Le schéma de ton rapport, encore vide : chaque chapitre y ajoutera une pièce.";
  const n = Math.min(chapitre + 1, PIECES.length);
  return n >= PIECES.length ? "Le schéma complet, avec l'exemple fictif de Sam : trois jauges, puis le travail, toi et l'impact dans ta vie, où agir, depuis quand et à qui en parler."
    : `Le schéma de ton rapport, avec l'exemple fictif de Sam : ${n} pièce${n > 1 ? "s" : ""} posée${n > 1 ? "s" : ""} sur ${PIECES.length}.`;
}

// Les deux mises en page ensemble : le CSS montre la large sur ordinateur, l'étroite sur téléphone.
export const schemaDouble = (o = {}) => schema({ ...o, etroit: false }) + schema({ ...o, etroit: true });
