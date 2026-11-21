// Illustrations de la formation, dessinées à la main en SVG dans la charte DD Lab.
// Chacune montre le mécanisme du chapitre sur l’histoire de Sam : pas de décor, pas d’image générique.
const C = { sapin: "#123a33", mid: "#1d5c50", creme: "#f6efe2", soft: "#fbf7ef", card: "#fffdf8", anis: "#d8f25c", orange: "#e8794f", ink: "#b4512b", piste: "#ddd4c2", violet: "#5b3fcf", muted: "#6b7d78" };

const svg = (titre, desc, w, h, corps) =>
  `<svg class="fo-ill" viewBox="0 0 ${w} ${h}" role="img" aria-label="${titre}"><desc>${desc}</desc>
  <rect width="${w}" height="${h}" rx="22" fill="${C.creme}"/>${corps}</svg>`;

const t = (x, y, s, opt = {}) => `<text x="${x}" y="${y}" class="${opt.cls || ""}" text-anchor="${opt.a || "start"}" fill="${opt.c || C.sapin}"${opt.size ? ` font-size="${opt.size}"` : ""}>${s}</text>`;
const chip = (x, y, w, s, fond, encre = C.sapin, barre = false) =>
  `<g transform="translate(${x},${y})"><rect width="${w}" height="26" rx="13" fill="${fond}"/>${t(w / 2, 17.5, s, { a: "middle", c: encre, cls: "s" })}${barre ? `<path d="M10 13H${w - 10}" stroke="${C.ink}" stroke-width="2"/>` : ""}</g>`;
const avatar = (x, y, lettre, fond, encre = C.sapin) => `<circle cx="${x}" cy="${y}" r="15" fill="${fond}"/>${t(x, y + 5, lettre, { a: "middle", c: encre, cls: "b" })}`;

// Petit générateur pseudo-aléatoire, pour que le nuage de points soit identique à chaque affichage.
function graine(s) { return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
function nuage(y, centre, couleur, s) {
  const r = graine(s);
  let pts = "";
  for (let i = 0; i < 46; i++) {
    const g = (r() + r() + r() + r() - 2) * 115;
    pts += `<circle cx="${(centre + g).toFixed(1)}" cy="${(y + (r() - .5) * 46).toFixed(1)}" r="6" fill="${couleur}" fill-opacity=".8"/>`;
  }
  return pts;
}

export const illustrations = {
  weekend: svg("Deux courbes d’énergie après le même vendredi",
    "Vendredi, Léa et Sam sont tous deux vidés. Pendant le week-end, l’énergie de Léa remonte et reste haute les semaines suivantes. Celle de Sam remonte à peine puis retombe et reste basse trois semaines plus tard.",
    640, 340, `
    <rect x="128" y="44" width="96" height="236" rx="10" fill="${C.anis}" fill-opacity=".35"/>
    ${t(176, 66, "repos", { a: "middle", cls: "k", c: C.mid })}
    <path d="M64 44V280H600" fill="none" stroke="${C.sapin}" stroke-opacity=".35" stroke-width="2"/>
    ${t(40, 40, "énergie", { cls: "k", c: C.muted })}
    ${t(60, 58, "pleine", { a: "end", cls: "s", c: C.muted })}${t(60, 276, "vide", { a: "end", cls: "s", c: C.muted })}
    <path d="M92 252C140 250 170 120 250 106S430 92 520 88" fill="none" stroke="${C.mid}" stroke-width="6" stroke-linecap="round"/>
    <path d="M92 258C140 256 168 214 200 214S238 244 260 244S420 256 520 262" fill="none" stroke="${C.orange}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="92" cy="255" r="9" fill="${C.sapin}"/>
    ${t(92, 306, "Vendredi", { a: "middle", cls: "b" })}${t(176, 306, "Week-end", { a: "middle", cls: "s" })}${t(260, 306, "Lundi", { a: "middle", cls: "s" })}${t(390, 306, "+1 semaine", { a: "middle", cls: "s" })}${t(520, 306, "+3 semaines", { a: "middle", cls: "s" })}
    <path d="M96 250L250 196" stroke="${C.sapin}" stroke-width="1.5" stroke-dasharray="3 4"/><g transform="translate(238,166)"><rect width="150" height="30" rx="15" fill="${C.sapin}"/>${t(75, 20, "tous les deux : « vidé »", { a: "middle", c: C.creme, cls: "s" })}</g>
    ${avatar(548, 88, "L", C.mid, C.creme)}${t(570, 93, "Léa", { cls: "b" })}
    ${avatar(548, 262, "S", C.orange, C.sapin)}${t(570, 267, "Sam", { cls: "b" })}
    ${t(420, 80, "le repos lui rend de l’énergie", { a: "middle", cls: "s", c: C.mid })}
    ${t(400, 236, "le repos ne lui rend presque rien", { a: "middle", cls: "s", c: C.ink })}`),

  jauges: svg("Les trois jauges de Sam",
    "Trois jauges verticales. Épuisement, rempli à 80 % : « Je suis vidé ». Distance mentale, rempli à 65 % : « À quoi bon ? ». Efficacité réduite, rempli à 55 % : « Je n’y arrive plus ».",
    640, 340, [
      ["Épuisement", "« Je suis vidé »", .8, C.orange, 110],
      ["Distance mentale", "« À quoi bon ? »", .65, C.orange, 320],
      ["Efficacité réduite", "« Je n’y arrive plus »", .55, "#d9a21b", 530],
    ].map(([nom, citation, niv, coul, x]) => `
      <g transform="translate(${x - 82},22)"><rect width="164" height="40" rx="14" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".2"/><path d="M74 39l8 10 8-10" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".2"/><path d="M73 38h18" stroke="${C.card}" stroke-width="3"/>${t(82, 26, citation, { a: "middle", cls: "b" })}</g>
      <rect x="${x - 38}" y="84" width="76" height="200" rx="38" fill="${C.card}" stroke="${C.sapin}" stroke-width="3"/>
      <rect x="${x - 28}" y="${94 + 180 * (1 - niv)}" width="56" height="${180 * niv}" rx="28" fill="${coul}"/>
      ${[.25, .5, .75].map(g => `<path d="M${x + 38} ${94 + 180 * (1 - g)}h10" stroke="${C.sapin}" stroke-opacity=".4" stroke-width="2"/>`).join("")}
      ${t(x, 314, nom, { a: "middle", cls: "t" })}`).join("")),

  balance: svg("La balance exigences ressources de la semaine de Sam",
    "Une balance penche à gauche. Sur le plateau des exigences : 42 mails, 3 urgences, une réunion à 18 h 30 et le dossier de Marc. Sur le plateau des ressources, trois éléments sont barrés : la pause déjeuner, le collègue parti et les soirées. Le pivot est la récupération.",
    640, 360, `
    <path d="M320 140L262 318H378Z" fill="${C.sapin}"/>
    ${t(320, 300, "Récupération", { a: "middle", c: C.anis, cls: "b" })}
    <path d="M100 170L540 110" stroke="${C.sapin}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="320" cy="140" r="11" fill="${C.anis}" stroke="${C.sapin}" stroke-width="4"/>
    <path d="M100 170L28 316M100 170L172 316M540 110L468 222M540 110L612 222" stroke="${C.sapin}" stroke-opacity=".45" stroke-width="2"/>
    <path d="M16 316H184" stroke="${C.sapin}" stroke-width="7" stroke-linecap="round"/>
    <path d="M456 222H624" stroke="${C.sapin}" stroke-width="7" stroke-linecap="round"/>
    ${chip(26, 190, 148, "42 mails non lus", C.orange)}${chip(26, 220, 148, "3 urgences « pour hier »", C.orange)}${chip(26, 250, 148, "Réunion à 18 h 30", C.orange)}${chip(26, 280, 148, "Dossier de Marc", C.ink, C.creme)}
    ${chip(466, 130, 148, "Pause déjeuner", C.anis, C.sapin, true)}${chip(466, 160, 148, "Marc, le collègue", C.anis, C.sapin, true)}${chip(466, 190, 148, "Soirées", C.anis, C.sapin, true)}
    ${t(100, 40, "EXIGENCES", { a: "middle", cls: "k", c: C.ink })}${t(100, 60, "ce que le travail demande", { a: "middle", cls: "s" })}
    ${t(540, 40, "RESSOURCES", { a: "middle", cls: "k", c: C.mid })}${t(540, 60, "ce qui aide à le faire", { a: "middle", cls: "s" })}
    ${t(540, 250, "retirées dans la semaine", { a: "middle", cls: "s", c: C.ink })}`),

  bascule: svg("La bascule entre l’effort de Sam et ce qu’il reçoit",
    "Une planche bascule vers la gauche sous un gros sac marqué « effort » : le dossier de Marc, les soirées, les appels en congé. Un ressort marqué « surengagement » appuie encore dessus. À droite, en l’air, quatre jetons de retour : le salaire est présent, l’estime, les perspectives et la sécurité sont en pointillés.",
    640, 340, `
    <path d="M320 214L282 300H358Z" fill="${C.sapin}"/>
    <path d="M70 262L570 166" stroke="${C.sapin}" stroke-width="10" stroke-linecap="round"/>
    <g transform="rotate(-10.9 160 240)">
      <rect x="70" y="134" width="180" height="112" rx="26" fill="${C.orange}"/>
      ${t(160, 166, "EFFORT", { a: "middle", cls: "k" })}
      ${t(160, 190, "dossier de Marc", { a: "middle", cls: "s" })}${t(160, 210, "soirées, congés", { a: "middle", cls: "s" })}${t(160, 230, "appels du dimanche", { a: "middle", cls: "s" })}
      <path d="M160 128v-14m-14 0h28m-28 0l6-10h16l6 10" fill="none" stroke="${C.sapin}" stroke-width="3"/>
      <path d="M160 100c-8-6 8-12 0-18s8-12 0-18s8-12 0-18" fill="none" stroke="${C.violet}" stroke-width="5" stroke-linecap="round"/>
    </g>
    ${t(92, 30, "surengagement", { cls: "b", c: C.violet })}
    ${t(92, 48, "du mal à dire non, à couper", { cls: "s", c: C.violet })}
    ${[["Salaire", false, 404], ["Estime", true, 468], ["Perspectives", true, 532], ["Sécurité", true, 596]].map(([n, absent, x], i) => {
      const y = 166 - (x - 320) * 0.192 - 28;
      return `<circle cx="${x}" cy="${y}" r="22" fill="${absent ? "none" : C.anis}" stroke="${C.sapin}" stroke-width="2.5" ${absent ? 'stroke-dasharray="5 5"' : ""}/>${t(x, i % 2 ? y - 32 : y + 42, n, { a: "middle", cls: "s" })}`;
    }).join("")}
    ${t(500, 30, "RETOUR", { a: "middle", cls: "k", c: C.mid })}${t(500, 48, "ce que Sam reçoit", { a: "middle", cls: "s" })}`),

  verre: svg("Le verre qui déborde",
    "Un verre est rempli de deux couches. En bas, la vie personnelle de Sam : sa séparation. Au-dessus, le travail : le dossier critique, les réunions tardives, les priorités changeantes. Le verre déborde. Deux robinets l’alimentent : celui de la vie personnelle, hors de portée de l’entreprise, et celui du travail, sur lequel on peut agir.",
    640, 350, `
    <path d="M232 92L254 320H386L408 92" fill="${C.card}" stroke="${C.sapin}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M247 238L254 318H386L393 238Z" fill="${C.violet}" fill-opacity=".85"/>
    <path d="M235 104L247 238H393L405 104Z" fill="${C.orange}"/>
    ${t(320, 270, "Vie perso", { a: "middle", cls: "b", c: C.creme })}${t(320, 290, "la séparation", { a: "middle", cls: "s", c: C.creme })}
    ${t(320, 150, "Travail", { a: "middle", cls: "b" })}${t(320, 172, "dossier critique", { a: "middle", cls: "s" })}${t(320, 190, "réunions tardives", { a: "middle", cls: "s" })}${t(320, 208, "priorités qui changent", { a: "middle", cls: "s" })}
    <path d="M232 96c-10 10-14 30-12 52M408 96c10 12 14 34 10 58" fill="none" stroke="${C.orange}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="214" cy="172" r="5" fill="${C.orange}"/><circle cx="424" cy="178" r="5" fill="${C.orange}"/>
    <g transform="translate(70,24)"><path d="M0 10h70v18h-18v16h-16v-16H0z" fill="${C.piste}" stroke="${C.sapin}" stroke-width="2"/><path d="M44 50v6" stroke="${C.violet}" stroke-width="5" stroke-linecap="round"/></g>
    ${t(110, 98, "Robinet perso", { a: "middle", cls: "b" })}${t(110, 116, "hors de portée du travail", { a: "middle", cls: "s", c: C.muted })}
    <g transform="translate(500,24)"><path d="M70 10H0v18h18v16h16v-16h36z" fill="${C.anis}" stroke="${C.sapin}" stroke-width="2"/><path d="M26 50v6" stroke="${C.orange}" stroke-width="5" stroke-linecap="round"/><circle cx="52" cy="4" r="9" fill="${C.sapin}"/><path d="M47 4h10" stroke="${C.anis}" stroke-width="3"/></g>
    ${t(530, 98, "Robinet travail", { a: "middle", cls: "b" })}${t(530, 116, "on peut le fermer", { a: "middle", cls: "s", c: C.mid })}
    <path d="M150 70C190 70 200 80 236 96M480 70C450 70 440 80 404 96" fill="none" stroke="${C.sapin}" stroke-opacity=".3" stroke-width="2" stroke-dasharray="4 5"/>`),

  nuages: svg("Deux groupes de personnes qui se recouvrent",
    "Deux nuages de points sur un axe de cortisol. Le groupe des personnes épuisées est légèrement décalé, mais les deux nuages se recouvrent largement. Une ligne verticale, marquée « ton résultat », traverse les deux nuages en même temps.",
    640, 320, `
    ${t(40, 46, "Personnes épuisées", { cls: "b", c: C.ink })}
    ${t(40, 156, "Personnes non épuisées", { cls: "b", c: C.mid })}
    ${nuage(96, 350, C.orange, 7)}
    ${nuage(206, 300, C.mid, 19)}
    <path d="M350 70v52M300 180v52" stroke="${C.sapin}" stroke-width="3"/>
    ${t(356, 136, "moyenne", { cls: "s" })}${t(306, 246, "moyenne", { cls: "s" })}
    <path d="M326 54V266" stroke="${C.sapin}" stroke-width="4" stroke-dasharray="8 6"/>
    <g transform="translate(266,262)"><rect width="120" height="28" rx="14" fill="${C.sapin}"/>${t(60, 19, "ton résultat", { a: "middle", c: C.anis, cls: "b" })}</g>
    <path d="M40 304H600" stroke="${C.sapin}" stroke-opacity=".35" stroke-width="2"/>${t(600, 298, "cortisol →", { a: "end", cls: "s", c: C.muted })}`),

  profils: (() => {
    const dims = ["Épuisement", "Distance", "Efficacité", "Exigences", "Manque de ressources", "Récupération"];
    const groupe = (x, nom, valeurs, couleur) => `
      ${t(x, 40, nom, { cls: "t" })}${t(x + 250, 40, "72 / 144", { a: "end", cls: "b", c: C.ink })}
      ${valeurs.map((v, i) => `<g transform="translate(${x},${62 + i * 40})">${t(0, 14, dims[i], { cls: "s" })}<rect y="20" width="250" height="12" rx="6" fill="${C.piste}"/><rect y="20" width="${250 * v / 24}" height="12" rx="6" fill="${v >= 16 ? couleur : C.mid}" fill-opacity="${v >= 16 ? 1 : .55}"/></g>`).join("")}`;
    return svg("Deux profils avec le même score total",
      "Sam et Léa ont 72 sur 144. Chez Sam, les barres hautes sont l’épuisement et les exigences. Chez Léa, ce sont la distance mentale et le manque de ressources.",
      640, 320, groupe(40, "Sam", [20, 8, 10, 20, 8, 6], C.orange) + groupe(350, "Léa", [8, 20, 14, 6, 18, 6], C.violet) + `<path d="M320 30V300" stroke="${C.sapin}" stroke-opacity=".15" stroke-width="2"/>`);
  })(),

  pile: svg("Trois sorties pour une pile de travail",
    "Une pile de dossiers déborde au centre. Trois flèches en sortent : retirer, vers une corbeille ; reporter, vers un calendrier ; simplifier, vers des ciseaux. En bas, la phrase « fais au mieux » est barrée.",
    640, 340, `
    ${["Planning fournisseurs", "Dossier de Marc", "Relances clients", "Reporting hebdo", "Inventaire", "3 urgences"].map((s, i) =>
      `<g transform="translate(${236 + (i % 2) * 8},${236 - i * 30}) rotate(${i % 2 ? 2 : -2})"><rect width="160" height="26" rx="6" fill="${i === 5 ? C.orange : C.card}" stroke="${C.sapin}" stroke-width="2"/>${t(80, 18, s, { a: "middle", cls: "s" })}</g>`).join("")}
    <path d="M222 120C160 110 130 130 112 170" fill="none" stroke="${C.sapin}" stroke-width="4" marker-end="url(#fl)"/>
    <path d="M320 70C330 40 380 30 430 36" fill="none" stroke="${C.sapin}" stroke-width="4" marker-end="url(#fl)"/>
    <path d="M418 180C460 176 490 180 508 196" fill="none" stroke="${C.sapin}" stroke-width="4" marker-end="url(#fl)"/>
    <defs><marker id="fl" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.sapin}"/></marker></defs>
    <g transform="translate(70,180)"><path d="M6 14h60l-6 62H12z" fill="${C.mid}"/><rect y="4" width="72" height="12" rx="4" fill="${C.sapin}"/><path d="M26 30v36M46 30v36" stroke="${C.creme}" stroke-width="3"/></g>
    ${t(106, 290, "Retirer", { a: "middle", cls: "t" })}${t(106, 308, "ça ne se fera pas", { a: "middle", cls: "s", c: C.muted })}
    <g transform="translate(446,10)"><rect width="76" height="66" rx="10" fill="${C.card}" stroke="${C.sapin}" stroke-width="3"/><rect width="76" height="18" rx="9" fill="${C.anis}" stroke="${C.sapin}" stroke-width="3"/>${t(38, 52, "15", { a: "middle", cls: "t" })}</g>
    ${t(540, 50, "Reporter", { cls: "t" })}${t(540, 68, "à une date dite", { cls: "s", c: C.muted })}
    <g transform="translate(514,196)"><circle cx="14" cy="50" r="12" fill="none" stroke="${C.ink}" stroke-width="5"/><circle cx="46" cy="50" r="12" fill="none" stroke="${C.ink}" stroke-width="5"/><path d="M20 40L58 0M40 40L2 0" stroke="${C.sapin}" stroke-width="6" stroke-linecap="round"/></g>
    ${t(544, 290, "Simplifier", { a: "middle", cls: "t" })}${t(544, 308, "faire plus court", { a: "middle", cls: "s", c: C.muted })}
    <g transform="translate(250,286)"><rect width="140" height="32" rx="16" fill="${C.piste}"/>${t(70, 21, "« Fais au mieux »", { a: "middle", cls: "b", c: C.muted })}<path d="M12 16H128" stroke="${C.ink}" stroke-width="3"/></g>`),

  portes: svg("Quatre portes selon le besoin",
    "Quatre portes côte à côte. Être soigné : médecin, psychologue. Adapter le poste : médecin du travail. Arbitrer la charge : manager, RH. Protéger, ensemble : CSE, représentants. En dessous, un bandeau d’urgence : 15, 112, 3114.",
    640, 372, [
      ["Être soigné", "médecin, psy", C.mid, "M0 -9v18M-9 0h18"],
      ["Adapter le poste", "médecin du travail", C.violet, "M-10 6h20M-10 -6h20M-4 -12v12M5 0v12"],
      ["Arbitrer la charge", "manager, RH", C.orange, "M0 -12v22M-12 -6h24M-12 -6l-5 10h10zM12 -6l-5 10h10z"],
      ["Protéger, ensemble", "CSE, représentants", C.sapin, "M-8 -4a4 4 0 1 0 0.1 0M8 -4a4 4 0 1 0 0.1 0M-15 10c2-7 12-7 14 0M1 10c2-7 12-7 14 0"],
    ].map(([nom, qui, coul, icone], i) => {
      const x = 34 + i * 148;
      return `<g transform="translate(${x},40)">
        <rect width="128" height="190" rx="64" fill="${coul}"/>
        <path d="M0 64a64 64 0 0 1 128 0V190H0z" fill="${coul}"/>
        <rect x="14" y="70" width="100" height="106" rx="8" fill="${C.creme}" fill-opacity=".14"/>
        <circle cx="104" cy="124" r="6" fill="${C.anis}"/>
        <g transform="translate(64,56)"><circle r="24" fill="${C.creme}"/><path d="${icone}" fill="none" stroke="${C.sapin}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
        ${t(64, 220, nom, { a: "middle", cls: "b" })}${t(64, 240, qui, { a: "middle", cls: "s", c: C.muted })}</g>`;
    }).join("") + `<g transform="translate(34,308)"><rect width="572" height="44" rx="22" fill="${C.sapin}"/>${t(286, 28, "Danger immédiat : 15 ou 112   ·   Idées suicidaires : 3114, 24 h/24", { a: "middle", c: C.anis, cls: "b" })}</g>`),
  modeles: svg("Les trois modèles en une image",
    "À gauche, dans le travail, les causes : la balance exigences ressources (JD-R) et la bascule effort retour (Siegrist). Des flèches mènent à Sam, au centre : deux colonnes hautes, son épuisement (partie A du questionnaire) et ses difficultés de récupération (partie F). Une flèche mène à droite, dans la personne, les effets : les trois jauges de Maslach, épuisement, distance mentale et efficacité réduite. En bas : on agit à gauche, on mesure à droite.",
    720, 436, `
    <defs><marker id="fo-fleche" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.sapin}"/></marker></defs>
    ${t(135, 34, "DANS LE TRAVAIL", { a: "middle", cls: "k", c: C.ink })}${t(135, 52, "les causes", { a: "middle", cls: "s" })}
    ${t(585, 34, "DANS LA PERSONNE", { a: "middle", cls: "k", c: C.mid })}${t(585, 52, "les effets", { a: "middle", cls: "s" })}
    <g transform="translate(20,68)"><rect width="230" height="146" rx="18" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".2"/>
      <g transform="translate(115,44)"><path d="M0 -2l-14 30h28z" fill="${C.sapin}"/><path d="M-46 8L46 -10" stroke="${C.sapin}" stroke-width="5" stroke-linecap="round"/><rect x="-62" y="10" width="34" height="14" rx="5" fill="${C.orange}"/><rect x="-60" y="-4" width="26" height="12" rx="5" fill="${C.orange}"/><rect x="30" y="-24" width="30" height="11" rx="5" fill="none" stroke="${C.mid}" stroke-width="2" stroke-dasharray="4 3"/></g>
      ${t(115, 98, "La balance · JD-R", { a: "middle", cls: "b" })}${t(115, 117, "ce qui pèse, ce qui aide", { a: "middle", cls: "s" })}${t(115, 135, "Demerouti, Bakker et al., 2001", { a: "middle", cls: "s", c: C.muted })}</g>
    <g transform="translate(20,232)"><rect width="230" height="146" rx="18" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".2"/>
      <g transform="translate(115,44)"><path d="M0 4l-12 24h24z" fill="${C.sapin}"/><path d="M-60 14L60 -8" stroke="${C.sapin}" stroke-width="5" stroke-linecap="round"/><rect x="-62" y="-14" width="40" height="26" rx="9" fill="${C.orange}" transform="rotate(-10 -42 0)"/><circle cx="32" cy="-14" r="9" fill="${C.anis}" stroke="${C.sapin}" stroke-width="2"/><circle cx="54" cy="-18" r="9" fill="none" stroke="${C.sapin}" stroke-width="2" stroke-dasharray="4 3"/></g>
      ${t(115, 98, "Le retour · Siegrist", { a: "middle", cls: "b" })}${t(115, 117, "ce que je donne, ce que je reçois", { a: "middle", cls: "s" })}${t(115, 135, "Siegrist, 1996", { a: "middle", cls: "s", c: C.muted })}</g>
    <path d="M254 142C292 142 300 190 326 196" fill="none" stroke="${C.sapin}" stroke-width="3" marker-end="url(#fo-fleche)"/>
    <path d="M254 306C292 306 300 254 326 246" fill="none" stroke="${C.sapin}" stroke-width="3" marker-end="url(#fo-fleche)"/>
    <g transform="translate(326,150)"><rect width="68" height="130" rx="14" fill="${C.card}" stroke="${C.sapin}" stroke-width="3"/>
      <rect x="12" y="14" width="18" height="96" rx="6" fill="${C.piste}"/><rect x="12" y="${14 + 96 * .25}" width="18" height="${96 * .75}" rx="6" fill="${C.orange}"/>
      <rect x="38" y="14" width="18" height="96" rx="6" fill="${C.piste}"/><rect x="38" y="${14 + 96 * .4}" width="18" height="${96 * .6}" rx="6" fill="${C.orange}"/>
      ${t(21, 124, "A", { a: "middle", cls: "n" })}${t(47, 124, "F", { a: "middle", cls: "n" })}</g>
    ${t(360, 302, "Sam", { a: "middle", cls: "t" })}${t(360, 320, "A : épuisement", { a: "middle", cls: "s", c: C.muted })}${t(360, 336, "F : récupération", { a: "middle", cls: "s", c: C.muted })}
    <path d="M396 222H462" fill="none" stroke="${C.sapin}" stroke-width="3" marker-end="url(#fo-fleche)"/>
    <g transform="translate(470,68)"><rect width="230" height="310" rx="18" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".2"/>
      ${[["Épuisement", .8, C.orange, 45], ["Distance", .65, C.orange, 115], ["Perte d'eff.", .55, "#d9a21b", 185]].map(([n, v, c, x]) => `<rect x="${x - 22}" y="26" width="44" height="160" rx="22" fill="${C.soft}" stroke="${C.sapin}" stroke-width="2.5"/><rect x="${x - 15}" y="${33 + 146 * (1 - v)}" width="30" height="${146 * v}" rx="15" fill="${c}"/>${t(x, 210, n, { a: "middle", cls: "s" })}`).join("")}
      ${t(115, 246, "Les trois signes · Maslach", { a: "middle", cls: "b" })}${t(115, 265, "ce que l’usure fait à la personne", { a: "middle", cls: "s" })}${t(115, 283, "Maslach et Jackson, 1981", { a: "middle", cls: "s", c: C.muted })}</g>
    <g transform="translate(20,392)"><rect width="680" height="34" rx="17" fill="${C.sapin}"/>${t(340, 22.5, "On agit à gauche, sur le travail. On mesure à droite, sur la personne.", { a: "middle", cls: "b", c: C.anis })}</g>`),

  niveaux: svg("Les trois niveaux de prévention",
    "Trois bandes empilées, de la plus prioritaire à la moins prioritaire. Un : prévention primaire, supprimer le risque à la source, par exemple retirer, reporter, simplifier, remplacer Marc. Deux : prévention secondaire, aider à faire face, par exemple former, faire des points de charge. Trois : prévention tertiaire, réparer, par exemple soigner, aménager la reprise. La loi demande de commencer par le premier niveau.",
    640, 330, [
      ["1", "PRIMAIRE · supprimer le risque à la source", "Retirer, reporter, simplifier. Remplacer Marc. Arrêter les réunions à 18 h 30.", C.sapin, C.creme, C.anis],
      ["2", "SECONDAIRE · aider à faire face", "Points de charge, formation à prioriser, soutien de l’équipe.", C.mid, C.creme, C.anis],
      ["3", "TERTIAIRE · réparer", "Soin, arrêt, reprise aménagée, écoute psychologique.", C.orange, C.sapin, C.sapin],
    ].map(([n, titre, ex, fond, encre, accent], i) => `<g transform="translate(24,${24 + i * 92})"><rect width="592" height="78" rx="20" fill="${fond}"/>
      ${t(40, 52, n, { a: "middle", c: accent, size: 38, cls: "t" })}
      ${t(80, 32, titre, { c: accent, cls: "k" })}${t(80, 56, ex, { c: encre, cls: "b" })}</g>`).join("") +
    `<g transform="translate(24,300)">${t(296, 14, "Article L4121-2 du Code du travail : on commence par le niveau 1. Les autres complètent.", { a: "middle", cls: "s", c: C.muted })}</g>`),
};

// ───────── Le schéma du rapport, construit au fil des chapitres (comme le papillon de Papillon).
// Même disposition que la vue d'ensemble du rapport (rapport.js, vueEnsemble) : à gauche les conditions
// de travail, au centre deux indices du vécu (A et F), à droite les manifestations. Données : Sam, fictif.
// Chaque chapitre allume ses pièces ; les pièces à venir restent en pointillés, sans contenu.
export const PIECES_SCHEMA = [
  ["vecu", "corps"],          // 1 · fatigue ou usure : épuisement (A), récupération (F), signaux du corps
  ["signes"],                 // 2 · les trois signes (Maslach)
  ["balance", "appuis"],      // 3 · la balance exigences-ressources (JD-R)
  ["retour"],                 // 4 · effort et récompense (Siegrist)
  ["contexte"],               // 5 · le contexte, hors score
  ["fils"],                   // 6 · ce que valent les mesures : des liens, pas des causes
  ["bandeau"],                // 7 · agir : ce qui tire, ce qui reste, ce qui lâche
  [],                         // 8 · la loi : pas de nouvelle pièce, la trace de ce que montre le schéma
  ["securite"],               // 9 · à qui en parler : la porte d'urgence
];
// Même code couleur que le rapport : la couleur dit l'effet pour la personne (vert protège ou ça va, jaune à surveiller, orange use, orange foncé use beaucoup).
const NIVC = [C.mid, "#d9a21b", C.orange, "#a8401c"];

// Sans argument : le schéma complet, sans pièce surlignée.
export function schemaRapport(chapitre = PIECES_SCHEMA.length, { titre = "" } = {}) {
  const faites = new Set(PIECES_SCHEMA.slice(0, chapitre + 1).flat());
  const ici = new Set(PIECES_SCHEMA[chapitre] || []);
  const etat = (id) => (ici.has(id) ? "ici" : faites.has(id) ? "fait" : "avenir");
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || "start"}" fill="${o.c || C.sapin}" font-size="${o.size || 14}" font-weight="${o.w || 600}" font-family="${o.titre ? "Poppins, sans-serif" : "Inter, sans-serif"}"${o.op ? ` opacity="${o.op}"` : ""}>${s}</text>`;
  // Une boîte : en attente (pointillés, nom seul), posée, ou nouvelle (halo anis).
  const boite = (id, x, y, w, h, nom, modele, contenu, o = {}) => {
    const e = etat(id);
    if (e === "avenir") return `<g opacity=".5"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${C.sapin}" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="5 5"/>${T(x + w / 2, y + h / 2 + 5, nom, { a: "middle", c: C.muted, w: 500, size: 13 })}</g>`;
    return `<g>${e === "ici" ? `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="16" fill="${C.anis}"/>` : ""}
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${o.fond || C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"${o.tirets ? ' stroke-dasharray="5 4"' : ""}/>
      ${T(x + 12, y + 21, nom, { titre: true, w: 800, size: 14.5 })}${modele ? T(x + 12, y + 37, modele, { size: 11.5, w: 500, op: .75 }) : ""}${contenu}</g>`;
  };
  const ligne = (x, y, w, label, mot, n) => `<circle cx="${x + 18}" cy="${y - 4}" r="5" fill="${NIVC[n]}"/>${T(x + 30, y, label, { size: 12.5, w: 500 })}${T(x + w - 10, y, mot, { a: "end", size: 12, w: 700, c: n >= 2 ? C.ink : C.muted })}`;
  const barre = (x, y, w, label, v, n) => `${T(x + 12, y, label, { size: 12.5, w: 500 })}<rect x="${x + 12}" y="${y + 5}" width="${w - 24}" height="7" rx="3.5" fill="${C.piste}"/><rect x="${x + 12}" y="${y + 5}" width="${Math.round((w - 24) * v)}" height="7" rx="3.5" fill="${NIVC[n]}"/>`;
  const W = 660, L = 12, R = W - 12 - 196, lw = 196, cx = W / 2;
  const top = etat("bandeau") === "avenir" ? 34 : 112;
  let s = "";
  // Bandeau : trois cadrans, comme en tête du rapport.
  if (etat("bandeau") !== "avenir") {
    const cad = (x, k, mot, n, bon) => {
      const arc = (j) => { const a0 = Math.PI * (1 - j / 4), a1 = Math.PI * (1 - (j + 1) / 4) + .05; const p = (a) => `${(x + 34 * Math.cos(a)).toFixed(1)} ${(60 - 34 * Math.sin(a)).toFixed(1)}`; const col = bon ? [...NIVC].reverse()[j] : NIVC[j]; return `<path d="M${p(a0)} A34 34 0 0 1 ${p(a1)}" fill="none" stroke="${col}" stroke-width="9" opacity="${j === (bon ? 3 - n : n) ? 1 : .3}"/>`; };
      return `${[0, 1, 2, 3].map(arc).join("")}${T(x + 44, 40, k, { size: 11, w: 700, c: C.ink })}${T(x + 44, 58, mot, { titre: true, w: 800, size: 14 })}`;
    };
    s += `<g>${etat("bandeau") === "ici" ? `<rect x="6" y="6" width="${W - 12}" height="78" rx="16" fill="${C.anis}"/>` : ""}<rect x="12" y="12" width="${W - 24}" height="66" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".25" stroke-width="1.5"/>
      ${cad(70, "CE QUI TIRE", "élevé", 2, false)}${cad(285, "CE QUI RESTE", "récup. basse", 2, true)}${cad(500, "CE QUI LÂCHE", "élevé", 2, false)}</g>`;
  }
  s += T(L, top - 12, "LE TRAVAIL", { titre: true, w: 800, size: 11.5, c: C.ink }) + T(cx, top - 12, "TOI", { titre: true, w: 800, size: 11.5, c: C.muted, a: "middle" }) + T(W - 12, top - 12, "CE QUI SE VOIT", { titre: true, w: 800, size: 11.5, c: C.ink, a: "end" });
  // Positions (pour les fils).
  const yB = top, yR = top + 96, yC = top + 222, hB = 84, hR = 116, hC = 64;
  const yS = top, hS = 132, yCo = top + 144, hCo = 70, ySe = top + 226, hSe = 40;
  const bTop = top + 20, bH = 150, aTop = top + 196, aH = 66;
  if (etat("fils") !== "avenir") {
    const op = etat("fils") === "ici" ? 1 : .8;
    const f = (x1, y1, x2, y2, w, c) => `<path d="M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
    s += `<g>${f(L + lw, yB + hB / 2, cx - 85, bTop + 40, 7, C.orange)}${f(L + lw, yR + hR / 2, cx - 85, bTop + 80, 5, C.orange)}${f(L + lw, yC + hC / 2, cx - 85, bTop + 120, 2.5, C.orange)}
      ${f(cx + 85, bTop + 50, R, yS + hS / 2, 7, C.orange)}${f(cx + 85, bTop + 110, R, yCo + hCo / 2, 4, C.orange)}
      <path d="M${cx} ${aTop} V${bTop + bH}" stroke="${C.mid}" stroke-width="3" opacity="${op}"/>
      ${etat("fils") === "ici" ? T(cx, aTop + aH + 22, "des liens à vérifier, pas des causes", { a: "middle", size: 12, w: 700, c: C.ink }) : ""}</g>`;
  }
  // Gauche : la balance (JD-R), le retour (Siegrist), le contexte.
  s += boite("balance", L, yB, lw, hB, "La balance", "JD-R · chapitre 3", ligne(L, yB + 58, lw, "Exigences", "élevées", 2) + ligne(L, yB + 76, lw, "Ressources", "limitées", 1));
  s += boite("retour", L, yR, lw, hR, "Le retour", "Siegrist · chapitre 4", ligne(L, yR + 58, lw, "Effort", "élevé", 2) + ligne(L, yR + 78, lw, "Récompense", "faible", 2) + ligne(L, yR + 98, lw, "Surengagement", "moyen", 1));
  s += boite("contexte", L, yC, lw, hC, "Le contexte", "hors score · chapitre 5", ligne(L, yC + 56, lw, "Collègue parti", "signalé", 1), { tirets: true });
  // Centre : deux indices du vécu, et les appuis.
  const eB = etat("vecu");
  if (eB === "avenir") s += boite("vecu", cx - 85, bTop, 170, bH, "Ton vécu", "", "");
  else {
    // Deux colonnes nommées en clair : épuisement (partie A) et récupération (partie F). Pas une batterie.
    const col = (x, l1, l2, v, n) => `<rect x="${x}" y="${bTop + 30}" width="34" height="80" rx="6" fill="${C.piste}"/><rect x="${x}" y="${bTop + 30 + 80 * (1 - v)}" width="34" height="${80 * v}" rx="6" fill="${NIVC[n]}"/>${T(x + 17, bTop + 126, l1, { a: "middle", w: 700, size: 11.5 })}${T(x + 17, bTop + 140, l2, { a: "middle", w: 500, size: 10.5, op: .8 })}`;
    s += `<g>${eB === "ici" ? `<rect x="${cx - 91}" y="${bTop - 6}" width="182" height="${bH + 12}" rx="20" fill="${C.anis}"/>` : ""}<rect x="${cx - 85}" y="${bTop}" width="170" height="${bH}" rx="16" fill="${C.card}" stroke="${C.sapin}" stroke-width="2"/>
      ${T(cx, bTop + 20, "Ton vécu", { a: "middle", titre: true, w: 800, size: 13 })}${col(cx - 62, "Épuisement", "partie A", .7, 2)}${col(cx + 28, "Récupération", "difficile · F", .58, 2)}</g>`;
  }
  s += boite("appuis", cx - 70, aTop, 140, aH, "Tes appuis", "chapitre 3", T(cx - 58, aTop + 56, "décrocher : fragile", { size: 12, w: 500 }), { fond: "#e3eee9" });
  // Droite : les trois signes (Maslach), les autres signaux, la sécurité.
  s += boite("signes", R, yS, lw, hS, "Les trois signes", "Maslach · chapitre 2", barre(R, yS + 60, lw, "Épuisement", .7, 2) + barre(R, yS + 88, lw, "Distance", .5, 1) + barre(R, yS + 116, lw, "Perte d'efficacité, de sens", .3, 1));
  s += boite("corps", R, yCo, lw, hCo, "Le corps", "récupération · chapitre 1", ligne(R, yCo + 58, lw, "Sommeil perturbé", "souvent", 2));
  s += etat("securite") === "avenir" ? boite("securite", R, ySe, lw, hSe, "La sécurité", "", "")
    : `<g>${etat("securite") === "ici" ? `<rect x="${R - 6}" y="${ySe - 6}" width="${lw + 12}" height="${hSe + 12}" rx="16" fill="${C.anis}"/>` : ""}<rect x="${R}" y="${ySe}" width="${lw}" height="${hSe}" rx="12" fill="${C.card}" stroke="${C.sapin}" stroke-opacity=".3" stroke-dasharray="4 4"/>${T(R + 12, ySe + 25, "Sécurité : rien de coché", { size: 12.5, w: 600 })}</g>`;
  // Légende du code couleur, la même que dans le rapport.
  const leg = [[NIVC[0], "ça va, ça protège"], [NIVC[1], "à surveiller"], [NIVC[2], "ça use"], [NIVC[3], "ça use beaucoup"]];
  s += leg.map(([c, l], i) => `<circle cx="${L + 8 + i * 160}" cy="${top + 306}" r="6" fill="${c}"/>${T(L + 20 + i * 160, top + 311, l, { size: 12.5, w: 600 })}`).join("");
  const H = top + 324;
  const n = PIECES_SCHEMA.slice(0, chapitre + 1).filter((p) => p.length).length;
  // (chapitre = PIECES_SCHEMA.length : toutes les pièces posées.)
  const label = titre || `Le schéma de ton rapport, avec l'exemple de Sam : ${n} pièce${n > 1 ? "s" : ""} posée${n > 1 ? "s" : ""} sur ${PIECES_SCHEMA.filter((p) => p.length).length}.`;
  return `<svg class="fo-schema" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${s}</svg>`;
}
