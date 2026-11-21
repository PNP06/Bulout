// Le schéma Bull-Out : un seul dessin pour l'accueil, la formation et le rapport.
// Il se construit chapitre par chapitre, comme le papillon de Papillon : chaque pièce apporte une donnée ET une règle de lecture.
//
//   TON TRAVAIL (ce qui pèse, ce qui aide)  →  TOI (comment tu récupères)  →  CE QUI SE VOIT (les signes d'usure)
//
// Chaque réponse n'apparaît qu'une fois : l'épuisement (partie A) est un des trois signes, à droite, et nulle part ailleurs ;
// la récupération (F1 à F3) est au centre ; le corps (F4 à F6) à droite. Quatre modèles, chacun à sa place :
// effort-récupération (centre), Maslach (droite), exigences-ressources et effort-récompense (gauche, avec le surengagement au centre).
// Le cadre ne bouge jamais : les pièces à venir restent en pointillés, à leur place.

const C = { sapin: "#123a33", mid: "#1d5c50", card: "#fffdf8", anis: "#d8f25c", orange: "#e8794f", ink: "#b4512b", piste: "#ddd4c2", muted: "#5d6f6a", rouge: "#b3261e", appui: "#e3eee9", creme: "#f6efe2" };
// Code couleur unique : la couleur dit l'effet pour la personne, jamais si le chiffre est haut.
export const NIVC = [C.mid, "#d9a21b", C.orange, "#a8401c"];
export const NIVMOTS = ["ça va", "à surveiller", "ça use", "ça use beaucoup"];
const FIL = [1.5, 3, 5.5, 8];

// Une pièce par chapitre (index 0 = chapitre 1). Le chapitre 8 n'est plus vide : il pose le temps.
export const PIECES = [
  ["recup", "corps"],                       // 1 · fatigue ou usure : le repos te rend-il ce que le travail te prend ? (effort-récupération)
  ["signes"],                               // 2 · les trois signes (Maslach) : l'épuisement est ici, et seulement ici
  ["balance"],                              // 3 · la balance exigences-ressources (Karasek, JD-R)
  ["retour", "engagement", "absurde"],      // 4 · donner trop pour trop peu (Siegrist) : le retour, le surengagement, l'effort pour rien
  ["autour"],                               // 5 · « c'est perso » : ce qui t'entoure module, ne remplace pas
  ["fils"],                                 // 6 · ce que valent les mesures : des liens à vérifier, pas des causes
  ["leviers"],                              // 7 · agir : on agit à gauche, on mesure à droite
  ["temps"],                                // 8 · la loi et la trace : une carte se lit avec des dates
  ["portes"],                               // 9 · à qui en parler : une porte par zone, et la sécurité à part
];
export const NOMS_PIECES = {
  recup: "Ta récupération", corps: "Le corps", signes: "Les trois signes", balance: "La balance", retour: "Le retour",
  engagement: "Ton engagement", absurde: "L'absurde", autour: "Autour de toi", fils: "Les fils", leviers: "Où agir",
  temps: "Depuis quand", portes: "Les portes",
};

// Sam, 38 ans, coordinateur logistique : l'exemple fictif de la formation et de l'accueil.
export const SAM = {
  balance: { rows: [{ label: "Exigences", mot: "élevées", n: 2 }, { label: "Ressources", mot: "limitées", n: 2 }] },
  retour: { rows: [{ label: "Reconnaissance", mot: "faible", n: 2 }, { label: "Salaire, perspectives", mot: "limités", n: 1 }] },
  absurde: { rows: [{ label: "Tâches absurdes", mot: "souvent", n: 2 }, { label: "Qualité empêchée", mot: "parfois", n: 1 }] },
  recup: { n: 2, mot: "fragile", rows: [{ label: "Décrocher", mot: "rarement", n: 2 }, { label: "Sommeil", mot: "perturbé", n: 2 }, { label: "Loisirs, liens", mot: "réduits", n: 1 }] },
  engagement: { rows: [{ label: "Surengagement", mot: "moyen", n: 1 }] },
  autour: { rows: [{ label: "Tes appuis", mot: "2 points forts", n: 0 }, { label: "Séparation", mot: "signalée", n: 1 }] },
  signes: [
    { label: "Épuisement", v: 17, max: 24, n: 2 },
    { label: "Distance, cynisme", v: 11, max: 24, n: 1 },
    { label: "Perte d'efficacité", v: 6, max: 16, n: 1 },
    { label: "Perte de sens", v: 3, max: 8, n: 1 },
  ],
  corps: { rows: [{ label: "Symptômes", mot: "parfois", n: 1 }, { label: "Compensations", mot: "rarement", n: 0 }, { label: "Erreurs de fatigue", mot: "souvent", n: 2 }] },
  temps: { duree: "3 mois à un an", evolution: "ça augmente", conge: "ça revient vite" },
  securite: false,
};

const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}"${o.a ? ` text-anchor="${o.a}"` : ""} fill="${o.c || C.sapin}" font-size="${o.size || 13}" font-weight="${o.w || 600}" font-family="${o.titre ? "Poppins, sans-serif" : "Inter, sans-serif"}"${o.op ? ` opacity="${o.op}"` : ""}${o.it ? ' font-style="italic"' : ""}>${esc(s)}</text>`;
const nMax = (rows) => Math.max(0, ...(rows || []).map((r) => r.n || 0));

/**
 * Dessine le schéma.
 * d : données (SAM par défaut) ; chapitre : -1 = vide, 0 à 8 = construit jusqu'à ce chapitre (sa pièce en anis), absent = complet.
 * etroit : mise en page téléphone (colonne unique). couches : ajoute les classes rp-layer pour la lecture pas à pas du rapport.
 */
export function schema({ d = SAM, chapitre = PIECES.length, etroit = false, titre = "", classe = "bo-schema", couches = false } = {}) {
  const faites = new Set(PIECES.slice(0, chapitre + 1).flat());
  const ici = new Set(PIECES[chapitre] || []);
  const etat = (id) => (ici.has(id) ? "ici" : faites.has(id) ? "fait" : "avenir");
  const vu = (id) => etat(id) !== "avenir";
  const halo = (id, x, y, w, h, r = 16) => (etat(id) === "ici" ? `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="${r}" fill="${C.anis}"/>` : "");
  const attente = (x, y, w, h, nom) => `<g opacity=".55"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${C.sapin}" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="5 5"/>${T(x + w / 2, y + h / 2 + 5, nom, { a: "middle", c: C.muted, w: 500 })}</g>`;
  const ligne = (x, y, w, r) => `<circle cx="${x + 18}" cy="${y - 4}" r="5" fill="${NIVC[r.n || 0]}"/>${T(x + 30, y, r.label, { size: 12.5, w: 500 })}${T(x + w - 10, y, r.mot, { a: "end", size: 12, w: 700, c: (r.n || 0) >= 2 ? C.ink : C.muted })}`;
  // Une boîte : nom, modèle, lignes. hors : pointillés (hors score). fond : couleur de fond (appuis).
  const boite = (id, x, y, w, h, nom, modele, rows, o = {}) => {
    if (!vu(id)) return attente(x, y, w, h, nom);
    return `<g>${halo(id, x, y, w, h)}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${o.fond || C.card}" stroke="${C.sapin}" stroke-opacity="${o.hors ? .45 : .25}" stroke-width="1.5"${o.hors ? ' stroke-dasharray="5 4"' : ""}/>
      ${T(x + 12, y + 21, nom, { titre: true, w: 800, size: 14.5 })}${modele ? T(x + 12, y + 37, modele, { size: 11.5, w: 500, op: .78 }) : ""}
      ${(rows || []).map((r, i) => ligne(x, y + (o.y0 || 60) + i * 22, w, r)).join("")}${o.extra || ""}</g>`;
  };
  // La boucle de récupération : effort → fatigue → repos. Fermée et verte quand le repos répare ; ouverte et orange quand il ne suffit plus.
  const boucle = (cx, cy, n) => {
    const r = 17, ouvert = n >= 2, coul = NIVC[n];
    const a0 = -Math.PI / 2 + (ouvert ? .55 : .2), a1 = -Math.PI / 2 + 2 * Math.PI - .2;
    const p = (a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    const fl = a1, fx = cx + r * Math.cos(fl), fy = cy + r * Math.sin(fl);
    return `<path d="M${p(a0)} A${r} ${r} 0 1 1 ${p(a1)}" fill="none" stroke="${coul}" stroke-width="4" stroke-linecap="round"/>
      <path d="M${(fx - 7).toFixed(1)} ${(fy - 5).toFixed(1)} L${(fx + 1).toFixed(1)} ${fy.toFixed(1)} L${(fx - 6).toFixed(1)} ${(fy + 6).toFixed(1)}" fill="none" stroke="${coul}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  const barres = (x, y, w, signes) => signes.map((s, i) => {
    const yy = y + i * 30;
    return `${T(x + 12, yy, s.label, { size: 12.5, w: 500 })}${T(x + w - 12, yy, s.mot || NIVMOTS[s.n], { a: "end", size: 11.5, w: 700, c: s.n >= 2 ? C.ink : C.muted })}<rect x="${x + 12}" y="${yy + 5}" width="${w - 24}" height="7" rx="3.5" fill="${C.piste}"/><rect x="${x + 12}" y="${yy + 5}" width="${Math.max(5, Math.round((w - 24) * (s.v / (s.max || 24))))}" height="7" rx="3.5" fill="${NIVC[s.n]}"/>`;
  }).join("");
  const fil = (x1, y1, x2, y2, n, c, vertical = false) => {
    const dd = vertical ? `M${x1} ${y1} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}` : `M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`;
    return `<path d="${dd}" fill="none" stroke="${c}" stroke-width="${FIL[n]}" stroke-linecap="round" opacity="${n ? .9 : .35}"/>`;
  };
  const g = (cls, inner) => (couches ? `<g class="rp-layer rp-layer-${cls}">${inner}</g>` : `<g>${inner}</g>`);

  const nRecup = d.recup.n ?? nMax(d.recup.rows);
  const recupExtra = (x, y, w) => `${boucle(x + w - 30, y + 26, nRecup)}${T(x + w - 10, y + 60, d.recup.mot || "", { a: "end", size: 12, w: 700, c: nRecup >= 2 ? C.ink : C.muted })}`;
  const legende = (x, y, pas) => NIVC.map((c, i) => `<circle cx="${x + 8 + i * pas}" cy="${y - 4}" r="6" fill="${c}"/>${T(x + 20 + i * pas, y, i === 0 ? "ça va, ça protège" : NIVMOTS[i], { size: 12.5, w: 600 })}`).join("");
  const securite = (x, y, w) => d.securite
    ? `<rect x="${x}" y="${y}" width="${w}" height="34" rx="10" fill="#fbe3d8" stroke="${C.rouge}" stroke-width="1.5"/>${T(x + 14, y + 22, "Signal de sécurité déclaré : lis d'abord le message à part", { size: 12.5, w: 800, c: C.rouge })}`
    : `<rect x="${x}" y="${y}" width="${w}" height="34" rx="10" fill="none" stroke="${C.rouge}" stroke-opacity=".5" stroke-dasharray="4 4"/>${T(x + 14, y + 22, "Sécurité, toujours à part : 15 · 112 · 3114 (idées suicidaires)", { size: 12.5, w: 600, c: C.rouge })}`;

  let s = "", H;
  if (!etroit) {
    const W = 760, w = 214, L = 12, M = 273, R = 534, top = 104;
    // Où agir (chapitre 7) : au-dessus des colonnes.
    if (vu("leviers")) {
      s += g("leviers", `${halo("leviers", 12, 8, W - 24, 46)}<rect x="12" y="8" width="${W - 24}" height="46" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>
        <rect x="${L}" y="8" width="${w}" height="46" rx="12" fill="${C.mid}"/>${T(L + w / 2, 27, "AGIR ICI", { a: "middle", titre: true, w: 800, size: 12, c: "#fff" })}${T(L + w / 2, 44, "retirer · reporter · simplifier", { a: "middle", size: 12, w: 600, c: C.anis })}
        ${T(M + w / 2, 27, "PRENDRE SOIN", { a: "middle", titre: true, w: 800, size: 12, c: C.sapin })}${T(M + w / 2, 44, "sans tout porter seul", { a: "middle", size: 12, w: 500, c: C.muted })}
        ${T(R + w / 2, 27, "MESURER ICI", { a: "middle", titre: true, w: 800, size: 12, c: C.sapin })}${T(R + w / 2, 44, "pour suivre, pas pour juger", { a: "middle", size: 12, w: 500, c: C.muted })}`);
    } else s += attente(12, 8, W - 24, 46, "Où agir");
    // Les trois zones.
    s += T(L, 80, "TON TRAVAIL", { titre: true, w: 800, size: 12, c: C.ink }) + T(L, 95, "ce qui pèse, ce qui aide", { size: 11.5, w: 500, c: C.muted })
      + T(M + w / 2, 80, "TOI", { a: "middle", titre: true, w: 800, size: 12, c: C.ink }) + T(M + w / 2, 95, "comment tu récupères", { a: "middle", size: 11.5, w: 500, c: C.muted })
      + T(R + w, 80, "CE QUI SE VOIT", { a: "end", titre: true, w: 800, size: 12, c: C.ink }) + T(R + w, 95, "les signes d'usure", { a: "end", size: 11.5, w: 500, c: C.muted });
    const yB = top, hB = 104, yRt = top + 116, hRt = 104, yX = top + 232, hX = 92;
    const yRc = top, hRc = 136, yE = top + 148, hE = 64, yA = top + 224, hA = 100;
    const yS = top, hS = 172, yC = top + 184, hC = 140;
    // Les fils (chapitre 6) : sous les boîtes.
    if (vu("fils")) {
      const n = (rows) => nMax(rows);
      const cible = (k) => yRc + 30 + k * 24;
      s += g("fils", `${fil(L + w, yB + hB / 2, M, cible(0), n(d.balance.rows), C.orange)}${fil(L + w, yRt + hRt / 2, M, cible(1), n(d.retour.rows), C.orange)}${fil(L + w, yX + hX / 2, M, cible(3), n(d.absurde.rows), C.orange)}
        ${fil(M + w, yRc + 50, R, yS + hS / 2, Math.max(nRecup, n(d.signes)), C.orange)}${fil(M + w, yRc + 100, R, yC + hC / 2, Math.max(nRecup, n(d.corps.rows)), C.orange)}
        ${fil(M + w / 2, yE, M + w / 2, yRc + hRc, n(d.engagement.rows), C.orange, true)}
        <path d="M${M + 30} ${yA} V${yRc + hRc}" stroke="${C.mid}" stroke-width="4" opacity=".9"/>`);
    }
    s += g("work", boite("balance", L, yB, w, hB, "La balance", "exigences-ressources · ch. 3", d.balance.rows)
      + boite("retour", L, yRt, w, hRt, "Le retour", "effort-récompense · ch. 4", d.retour.rows)
      + boite("absurde", L, yX, w, hX, "L'absurde", "bullshitomètre · hors score", d.absurde.rows, { hors: true, y0: 56 }));
    s += g("person", boite("recup", M, yRc, w, hRc, "Ta récupération", "effort-récupération · ch. 1", d.recup.rows, { y0: 82, extra: recupExtra(M, yRc, w) })
      + boite("engagement", M, yE, w, hE, "Ton engagement", "surengagement · ch. 4", d.engagement.rows, { y0: 54 }));
    s += g("support", boite("autour", M, yA, w, hA, "Autour de toi", "appuis et vie perso · ch. 5", d.autour.rows, { hors: true, fond: C.appui, y0: 62 }));
    s += g("manifest", (vu("signes") ? `<g>${halo("signes", R, yS, w, hS)}<rect x="${R}" y="${yS}" width="${w}" height="${hS}" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>${T(R + 12, yS + 21, "Les trois signes", { titre: true, w: 800, size: 14.5 })}${T(R + 12, yS + 37, "Maslach · ch. 2", { size: 11.5, w: 500, op: .78 })}${barres(R, yS + 60, w, d.signes)}</g>` : attente(R, yS, w, hS, "Les trois signes"))
      + boite("corps", R, yC, w, hC, "Le corps", "ce que la fatigue abîme · ch. 1", d.corps.rows, { y0: 62 }));
    if (etat("fils") === "ici") s += T(W / 2, top + 340, "Les fils : des liens à vérifier avec ta chronologie, pas des causes prouvées.", { a: "middle", size: 12, w: 700, c: C.ink, it: true });
    // Depuis quand (chapitre 8).
    const yT = top + 352;
    if (vu("temps")) {
      const t = d.temps || {};
      const c3 = [["DEPUIS", t.duree], ["ÉVOLUTION", t.evolution], ["EN CONGÉ", t.conge]];
      s += g("temps", `${halo("temps", 12, yT, W - 24, 56)}<rect x="12" y="${yT}" width="${W - 24}" height="56" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>
        <path d="M24 ${yT + 44} H${W - 30}" stroke="${C.sapin}" stroke-opacity=".3" stroke-width="2"/><path d="M${W - 36} ${yT + 39} L${W - 28} ${yT + 44} L${W - 36} ${yT + 49}" fill="none" stroke="${C.sapin}" stroke-opacity=".4" stroke-width="2"/>
        ${T(24, yT + 21, "Depuis quand ?", { titre: true, w: 800, size: 14 })}
        ${c3.map(([k, v], i) => `${T(190 + i * 190, yT + 19, k, { size: 10.5, w: 800, c: C.ink })}${T(190 + i * 190, yT + 35, v || "—", { size: 12.5, w: 600 })}`).join("")}`);
    } else s += attente(12, yT, W - 24, 56, "Depuis quand ?");
    // Les portes et la sécurité (chapitre 9).
    const yP = yT + 70;
    if (vu("portes")) {
      const porte = (x, k, v) => `${T(x + 12, yP + 20, k, { size: 10.5, w: 800, c: C.ink })}${T(x + 12, yP + 37, v, { size: 12.5, w: 600 })}`;
      s += g("portes", `${halo("portes", 12, yP, W - 24, 92)}<rect x="12" y="${yP}" width="${W - 24}" height="92" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>
        ${porte(L, "POUR LE TRAVAIL", "manager · RH · CSE")}${porte(M, "POUR TOI", "médecin traitant · psy")}${porte(R, "ENTRE LES DEUX", "médecin du travail")}
        ${securite(24, yP + 48, W - 48)}`);
    } else s += attente(12, yP, W - 24, 92, "Les portes");
    const yL = yP + 120;
    s += legende(L, yL, 186);
    H = yL + 14;
    return `<svg class="${classe} large" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(titre || label(chapitre))}">${s}</svg>`;
  }
  // Téléphone : une colonne, dans le même ordre que l'histoire (ton travail, puis toi, puis ce qui se voit).
  const W = 380, x = 10, w = W - 20;
  let y = 8;
  const pile = [];
  const pose = (h, f) => { pile.push(f(y)); y += h + 12; };
  pose(46, (yy) => vu("leviers") ? g("leviers", `${halo("leviers", x, yy, w, 46)}<rect x="${x}" y="${yy}" width="${w}" height="46" rx="12" fill="${C.mid}"/>${T(W / 2, yy + 20, "AGIR SUR LE TRAVAIL", { a: "middle", titre: true, w: 800, size: 12, c: "#fff" })}${T(W / 2, yy + 37, "retirer · reporter · simplifier", { a: "middle", size: 12, w: 600, c: C.anis })}`) : attente(x, yy, w, 46, "Où agir"));
  pile.push(T(x, y + 6, "TON TRAVAIL · ce qui pèse, ce qui aide", { titre: true, w: 800, size: 12, c: C.ink })); y += 16;
  pose(104, (yy) => g("work", boite("balance", x, yy, w, 104, "La balance", "exigences-ressources · ch. 3", d.balance.rows)));
  pose(104, (yy) => g("work", boite("retour", x, yy, w, 104, "Le retour", "effort-récompense · ch. 4", d.retour.rows)));
  pose(92, (yy) => g("work", boite("absurde", x, yy, w, 92, "L'absurde", "bullshitomètre · hors score", d.absurde.rows, { hors: true, y0: 56 })));
  if (vu("fils")) { pile.push(g("fils", fil(W / 2, y - 12, W / 2, y + 14, Math.max(nMax(d.balance.rows), nMax(d.retour.rows)), C.orange, true))); }
  y += 14;
  pile.push(T(x, y + 6, "TOI · comment tu récupères", { titre: true, w: 800, size: 12, c: C.ink })); y += 16;
  pose(136, (yy) => g("person", boite("recup", x, yy, w, 136, "Ta récupération", "effort-récupération · ch. 1", d.recup.rows, { y0: 82, extra: recupExtra(x, yy, w) })));
  pose(64, (yy) => g("person", boite("engagement", x, yy, w, 64, "Ton engagement", "surengagement · ch. 4", d.engagement.rows, { y0: 54 })));
  pose(100, (yy) => g("support", boite("autour", x, yy, w, 100, "Autour de toi", "appuis et vie perso · ch. 5", d.autour.rows, { hors: true, fond: C.appui, y0: 62 })));
  if (vu("fils")) { pile.push(g("fils", fil(W / 2, y - 12, W / 2, y + 14, Math.max(nRecup, nMax(d.signes)), C.orange, true))); }
  y += 14;
  pile.push(T(x, y + 6, "CE QUI SE VOIT · les signes d'usure", { titre: true, w: 800, size: 12, c: C.ink })); y += 16;
  pose(172, (yy) => g("manifest", vu("signes") ? `<g>${halo("signes", x, yy, w, 172)}<rect x="${x}" y="${yy}" width="${w}" height="172" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>${T(x + 12, yy + 21, "Les trois signes", { titre: true, w: 800, size: 14.5 })}${T(x + 12, yy + 37, "Maslach · ch. 2", { size: 11.5, w: 500, op: .78 })}${barres(x, yy + 60, w, d.signes)}</g>` : attente(x, yy, w, 172, "Les trois signes")));
  pose(140, (yy) => g("manifest", boite("corps", x, yy, w, 140, "Le corps", "ce que la fatigue abîme · ch. 1", d.corps.rows, { y0: 62 })));
  if (etat("fils") === "ici") { pile.push(T(W / 2, y + 4, "Les fils : des liens à vérifier, pas des causes.", { a: "middle", size: 12, w: 700, c: C.ink, it: true })); y += 18; }
  const t = d.temps || {};
  pose(92, (yy) => vu("temps") ? g("temps", `${halo("temps", x, yy, w, 92)}<rect x="${x}" y="${yy}" width="${w}" height="92" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>${T(x + 12, yy + 21, "Depuis quand ?", { titre: true, w: 800, size: 14 })}${[["Depuis", t.duree], ["Évolution", t.evolution], ["En congé", t.conge]].map(([k, v], i) => `${T(x + 12, yy + 44 + i * 18, k, { size: 12, w: 700, c: C.ink })}${T(x + 110, yy + 44 + i * 18, v || "—", { size: 12.5, w: 600 })}`).join("")}`) : attente(x, yy, w, 92, "Depuis quand ?"));
  pose(130, (yy) => vu("portes") ? g("portes", `${halo("portes", x, yy, w, 130)}<rect x="${x}" y="${yy}" width="${w}" height="130" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>${T(x + 12, yy + 21, "Les portes", { titre: true, w: 800, size: 14 })}${[["Travail", "manager · RH · CSE"], ["Toi", "médecin traitant · psy"], ["Les deux", "médecin du travail"]].map(([k, v], i) => `${T(x + 12, yy + 44 + i * 18, k, { size: 12, w: 700, c: C.ink })}${T(x + 90, yy + 44 + i * 18, v, { size: 12.5, w: 600 })}`).join("")}${securite(x + 8, yy + 88, w - 16).replace(/Sécurité, toujours à part : /, "Sécurité : ").replace(/ \(idées suicidaires\)/, "")}`) : attente(x, yy, w, 130, "Les portes"));
  pile.push(NIVC.map((c, i) => `<circle cx="${x + 8 + (i % 2) * 180}" cy="${y + 2 + Math.floor(i / 2) * 20}" r="6" fill="${c}"/>${T(x + 20 + (i % 2) * 180, y + 6 + Math.floor(i / 2) * 20, i === 0 ? "ça va, ça protège" : NIVMOTS[i], { size: 12.5, w: 600 })}`).join(""));
  H = y + 34;
  return `<svg class="${classe} etroit" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(titre || label(chapitre))}">${pile.join("")}</svg>`;
}

function label(chapitre) {
  if (chapitre < 0) return "Le schéma de ton rapport, encore vide : chaque chapitre y ajoutera une pièce.";
  const n = Math.min(chapitre + 1, PIECES.length);
  return n >= PIECES.length ? "Le schéma complet, avec l'exemple fictif de Sam : ton travail, toi, ce qui se voit, depuis quand, où agir et à qui en parler."
    : `Le schéma de ton rapport, avec l'exemple fictif de Sam : ${n} pièce${n > 1 ? "s" : ""} posée${n > 1 ? "s" : ""} sur ${PIECES.length}.`;
}

// Les deux mises en page ensemble : le CSS montre la large sur ordinateur, l'étroite sur téléphone.
export const schemaDouble = (o = {}) => schema({ ...o, etroit: false }) + schema({ ...o, etroit: true });
