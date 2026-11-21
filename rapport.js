// Rapport Bull-Out : composé à partir des réponses calculées par script.js (événement « bullout:rapport »).
// Structure reprise de Papillon (psytest) : une synthèse, puis une étape par pièce vue dans la formation
// (les 9 pièces annoncées par les chapitres), puis des annexes qui montrent le calcul, les réponses et les sources.
// Rien n'est envoyé : tout est calculé et affiché dans cet onglet.
import { chapitres } from "./formation-contenu.js";
import { schemaDouble } from "./schema.js";

const VERSION = "2026.11.4-rps";
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
  G5: ["Demander de l'aide", "Tu sais demander de l'aide", "C'est un levier d'action : utilise-le pour demander un arbitrage précis, pas seulement un encouragement.", "Prépare une demande précise : une tâche, un délai, une personne. Le chapitre 8 donne des phrases prêtes."],
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
// ───────── Les quatre modèles de la formation sont réunis dans un seul schéma (schema.js).
// À gauche : le travail déclaré. Au centre : la récupération (F1 à F3). À droite : les trois signes et le corps.
// Les traits sont des liens de lecture, pas des liens de causalité ; leur épaisseur dépend d'une convention graphique interne.
const FIL = [1.5, 4, 8, 13];
const nv24 = (v) => (v >= 19 ? 3 : v >= 13 ? 2 : v >= 7 ? 1 : 0);
const MOTS = ["bas", "à surveiller", "élevé", "très élevé"];
const MOTSF = ["basse", "à surveiller", "élevée", "très élevée"];
// Deux barres nommées : la récupération (F1 à F3, sur 12) et le corps (F4 à F6, sur 12), sans pourcentage d’énergie.
function recupCorps(rec, corps) {
  const barre = (y, titre, v) => {
    const largeur = Math.round((v / 12) * 170), n = nv24(v * 2);
    return `<text x="8" y="${y}" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="${C.sapin}">${titre}</text>
      <text x="312" y="${y}" text-anchor="end" font-family="Inter, sans-serif" font-size="12" fill="${C.sapin}">${v}/12</text>
      <rect x="110" y="${y - 12}" width="170" height="13" rx="6" fill="${C.piste}"/>
      <rect x="110" y="${y - 12}" width="${largeur}" height="13" rx="6" fill="${COUL[n]}"/>`;
  };
  return `<svg class="rp-art" viewBox="0 0 320 118" role="img" aria-label="Deux sommes descriptives de réponses : mal à récupérer ${rec} sur 12 et signaux du corps ${corps} sur 12">
    ${barre(35, "Mal à récupérer", rec)}${barre(77, "Le corps", corps)}
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
  const lectureUsure = coeurHauts.length === 3 ? "Les trois signes sont hauts en même temps : l'usure ne se résume pas à la fatigue."
    : coeurHauts.length ? `${cap(liste(coeurHauts.map((d) => NOMS[d.id].toLowerCase())))} ${coeurHauts.length > 1 ? "ressortent" : "ressort"} nettement ; ${coeurHauts.length === 1 ? "les deux autres signes" : "le troisième"} moins.`
      : coeur.some((d) => d.score >= 7) ? "Aucun signe n'est haut, mais au moins un est à surveiller." : "Les trois signes restent bas.";
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
  const rpsAnswers = r.rpsAnswers || [];
  const rpsFortes = rpsAnswers.filter((a) => a.value >= 3);
  const rpsFamilles = [
    { nom: "Intensité et temps de travail", ids: ["D1", "D2", "D6", "RPS1"], limite: "Débordements interrogés, mais durée de travail et horaires réels non vérifiés.", action: "Quels horaires débordent, à quelles dates, et qui peut arbitrer ?" },
    { nom: "Exigences émotionnelles", ids: ["D5", "RPS2"], limite: "Émotions difficiles et masquées, sans caractériser agressions ou exposition à la souffrance.", action: "Quelles interactions demandent de masquer tes émotions, et quel soutien existe ?" },
    { nom: "Autonomie et marges de manœuvre", ids: ["E1", "D4", "RPS4"], limite: "Moyens et participation explorés, pas le développement des compétences.", action: "Sur quelles décisions pourrais-tu être consulté·e ?" },
    { nom: "Rapports sociaux au travail", ids: ["E2", "E3", "E5", "E6"], contexte: "harassment", limite: "Soutien et équité explorés ; violences seulement déclarées en oui/non, sans qualification juridique.", action: "Quels faits datés examiner avec un interlocuteur sûr ?" },
    { nom: "Conflits de valeurs", ids: [], contexte: "ethicalConflict", absurde: true, limite: "L’absurde (bullshitomètre), conflit éthique oui/non et qualité empêchée ; circonstances à préciser.", action: "Quelle tâche ne sert à rien, ou quelle qualité n’a pas pu être respectée ? Laquelle retirer en premier ?" },
    { nom: "Insécurité professionnelle", ids: [], retour: "R3", rps: "RPS3", limite: "Sécurité de l’emploi et transformations subies, sans explorer toutes les formes de précarité.", action: "Quel changement est annoncé, et quelle préparation manque ?" }
  ];
  const famillesAllumees = [];
  const rpsCartes = rpsFamilles.map((famille, iFamille) => {
    const signaux = famille.ids.map((id) => id.startsWith("RPS")
      ? rpsAnswers.find((a) => a.id === id && a.value >= 3)
      : item(id)).filter((a) => a && (a.riskScore ?? a.value) >= 3);
    const ouiContexte = famille.contexte && (r.contextAnswers || []).some((a) => a.id === famille.contexte && a.yes);
    const qualiteFrequente = famille.contexte === "ethicalConflict" && qualiteEmpechee >= 3;
    const retourBas = famille.retour && rep[famille.retour]?.value <= 1;
    const changementSubi = famille.rps && rpsAnswers.some((a) => a.id === famille.rps && a.value >= 3);
    const absurdeFort = famille.absurde && !bs.skipped && absurdeHaut;
    const signale = signaux.length > 0 || ouiContexte || retourBas || qualiteFrequente || changementSubi || absurdeFort;
    if (signale) famillesAllumees.push(iFamille + 1);
    const details = signaux.map((a) => `<span class="rp-id">${esc(a.id)}</span> ${esc(a.question)}`);
    if (changementSubi) details.push("Changements imposés sans préparation signalés (RPS3).");
    if (absurdeFort) details.push("L’absurde ressort souvent dans ton travail (bullshitomètre).");
    if (qualiteFrequente) details.push("Qualité empêchée fréquemment déclarée (T4).");
    if (ouiContexte) details.push(famille.contexte === "harassment"
      ? "Humiliations ou violences déclarées : rechercher les faits et les protections, même sans fatigue."
      : "Conflit éthique déclaré dans le contexte.");
    if (retourBas) details.push("Sentiment de sécurité d’emploi faible (R3).");
    const detail = details.join(" ; ") || "Aucun signal fréquent parmi les éléments interrogés, ce qui n’exclut pas une exposition.";
    return `<article class="rp-rps-famille ${signale ? "is-signal" : ""}">
      <div><h5><span class="rp-rps-num">${iFamille + 1}</span> ${famille.nom}</h5><span class="rp-rps-status">${signale ? "Élément à éclaircir" : "Pas de signal marqué dans les réponses retenues"}</span></div>
      <p>${detail}</p><p><b>Pour agir :</b> ${esc(famille.action)}</p><p class="rp-rps-limite">${famille.limite}</p></article>`;
  }).join("");
  const grilleRPS = `<section class="rp-rps" aria-labelledby="rp-rps-title"><h4 class="rp-h" id="rp-rps-title">Les six familles de risques du travail</h4>
    <p>Le référentiel français <a href="https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html" target="_blank" rel="noopener">INRS / Gollac</a> décrit six familles de risques psychosociaux (RPS). Ce sont les numéros des pastilles sur la colonne LE TRAVAIL de ton schéma. Ce tableau relie tes réponses à ces familles, sans fabriquer six nouveaux scores ni prétendre les couvrir complètement.</p>
    <div class="rp-rps-grille">${rpsCartes}</div>
    <p class="rp-legende">Une absence de signal n'exclut pas une exposition réelle : certains thèmes ne disposent que d'une question et aucun détail sur l'organisation du travail n'a été vérifié.</p></section>`;

  const nDim = (d) => niv(d).n;
  const val = (v) => `${MOTS[nv24(v)]} · ${v}/24`;
  // L'absurde : la couleur dit l'effet. Beaucoup d'absurde sans retrait ni perte de sens = à surveiller (le recul peut protéger) ;
  // avec retrait ou perte de sens = ça use.
  const nAbsurde = !absurdeHaut ? (bs.percent >= 25 ? 1 : 0) : coupe ? (bs.percent >= 75 ? 3 : 2) : 1;
  const ctxAggr = ctxOui.filter((a) => !["collectiveSignal", "previousMedicalAlert", "safetySensitiveJob"].includes(a.id));
  // ───────── Les données du schéma (schema.js) : chaque réponse n'est dessinée qu'à un seul endroit.
  // Centre : la récupération (F1 à F3). Droite : les trois signes (A, B, C) et le corps (F4 à F6). Gauche : la balance, le retour, l'absurde.
  const freq = (id) => ratingLabels[item(id).rawScore].replace(/^\d+\s*-\s*/, "").toLowerCase();
  const nItem = (id) => [0, 0, 1, 2, 3][item(id).riskScore];
  const signes = [
    { label: "Épuisement", v: sr.A.score, mot: niv(sr.A).mot, n: nDim(sr.A) },
    { label: "Distance, cynisme", v: sr.B.score, mot: niv(sr.B).mot, n: nDim(sr.B) },
    { label: "Perte d'efficacité", v: efficacite, max: 16, mot: MOTS[nv24(relatif24(efficacite, 16))], n: nv24(relatif24(efficacite, 16)) },
    { label: "Perte de sens", v: perteSens, max: 8, mot: MOTSF[nv24(relatif24(perteSens, 8))], n: nv24(relatif24(perteSens, 8)) }
  ];
  const CORPS = { F4: "Symptômes", F5: "Pour tenir (alcool…)", F6: "Erreurs, oublis" };
  const corps = { rows: ["F4", "F6", "F5"].map((id) => ({ label: CORPS[id], mot: freq(id), n: nItem(id) })) };
  // Ta fatigue : l'épuisement (A) et ce que le repos répare (F1 décrocher, F2 dormir), plus le test du congé (T3), en mots.
  const recupScore = ["F1", "F2"].reduce((n, id) => n + item(id).riskScore, 0); // 0–8
  const nRecup = nv24(relatif24(recupScore, 8));
  const MOTS_RECUP = ["le repos répare", "le repos répare moins bien", "le repos ne suffit plus", "le repos ne répare plus"];
  const T4MOTS = ["jamais", "rarement", "parfois", "souvent", "presque toujours"];
  const T2MOTS = { "Elles diminuent": "en baisse", "Elles restent à peu près stables": "stable", "Elles augmentent": "en hausse", "Elles fluctuent beaucoup": "fluctue beaucoup", "Je ne sais pas": "ne sait pas" };
  const T3MOTS = { "Je n'ai pas pu le constater": "pas constaté", "Mes difficultés diminuent nettement": "nettement mieux", "Elles diminuent un peu": "un peu mieux", "Elles changent peu": "peu de changement", "Elles augmentent": "plus difficile" };
  const T3N = { "nettement mieux": 0, "un peu mieux": 1, "peu de changement": 2, "plus difficile": 3 };
  const court = (id, table) => { const t = repere(id)?.answer; if (!t || /pas de difficulté/.test(t)) return t ? "pas de difficulté" : ""; return table ? table[t] || t.toLowerCase() : t.replace(/^Depuis /, "").replace(/^Je ne sais pas exactement$/, "ne sait pas"); };
  const conge = court("T3", T3MOTS);
  const nFatigue = nv24(Math.round((sr.A.score + relatif24(recupScore, 8)) / 2));
  // Les pesées : chaque question n'y figure qu'une fois. Exigences D1–D6 ; aides E1–E4 ; « tu donnes » = la charge vue comme
  // un échange (D1, D4, D6, déjà dans la première pesée) ; « tu reçois » = E5, E6, R1–R3.
  const manqueAide = ["E1", "E2", "E3", "E4"].reduce((n, id) => n + item(id).riskScore, 0); // 0–16
  const nManque = nv24(relatif24(manqueAide, 16));
  const nD = nDim(sr.D), nEffort = nv24(effort), nRetour = nv24(retour);
  const signe = (v) => (v > 0 ? 1 : v < 0 ? -1 : 0);
  const QUANT = ["peu", "assez", "beaucoup", "énormément"];
  const pesee1 = { g: { label: "On te demande", mot: QUANT[nD], n: nD }, d: { label: "Ce qui t'aide", mot: ["beaucoup", "assez", "peu", "très peu"][nManque], n: nManque },
    penche: signe(nD - (3 - nManque)) };
  pesee1.verdict = pesee1.penche > 0 ? "Ça penche : plus de demandes que d'aide" : pesee1.penche < 0 ? "Ça penche du bon côté : l'aide suit" : "À peu près à l'équilibre";
  const pesee2 = { g: { label: "Tu donnes", mot: QUANT[nEffort], n: nEffort }, d: { label: "Tu reçois", mot: ["peu", "un peu", "assez", "bien"][nRetour], n: 3 - nRetour },
    penche: signe(nEffort - nRetour) };
  pesee2.verdict = pesee2.penche > 0 ? "Ça penche : tu donnes plus que tu ne reçois" : pesee2.penche < 0 ? "Ça penche du bon côté : tu reçois" : "À peu près à l'équilibre";
  const surEngage = surIds.length ? moy24(surIds.map((id) => rep[id].value)) : null; // R4–R6 seulement : F1 est dans ta fatigue
  const BSMOTS = (pc) => (pc >= 75 ? "très souvent" : pc >= 50 ? "souvent" : pc >= 25 ? "parfois" : "rarement");
  const hr = r.humorReaction && !r.humorReaction.skipped ? Object.fromEntries(r.humorReaction.answers.map((a) => [a.id, a.value])) : null;
  const HRMOTS = ["pas du tout", "un peu", "moyennement", "beaucoup", "tout à fait"];
  const hrLigne = (id, label, use) => (hr && hr[id] !== null && hr[id] !== undefined ? [{ label, mot: HRMOTS[hr[id]], n: use ? (hr[id] >= 3 ? 2 : hr[id] === 2 ? 1 : 0) : 0 }] : []);
  const perso = ctxOui.find((a) => a.id === "personalBurden");
  const partir = r.contextAnswers.find((a) => a.id === "wantToLeave");
  // Les trois jauges : le travail prend la famille la plus lourde ; ta fatigue, épuisement et repos ; les impacts, le signe le plus net.
  const ABSURDE_DANS_JAUGE = true; // choix proposé à David : l'absurde est une famille du travail comme les autres
  const tireListe = [["la charge", nD], ["le manque d'aide", nManque], ["l'effort sans retour", Math.min(nEffort, 3 - nRetour)],
    ...(ABSURDE_DANS_JAUGE && !bs.skipped ? [["l'absurde", nAbsurde]] : [])];
  const tire = Math.max(...tireListe.map(([, n]) => n));
  const relation = [
    { label: "Distance, cynisme", v: sr.B.score, mot: niv(sr.B).mot, n: nDim(sr.B), m: true },
    { label: "Perte d'efficacité", v: efficacite, max: 16, mot: MOTS[nv24(relatif24(efficacite, 16))], n: nv24(relatif24(efficacite, 16)), m: true },
    { label: "Perte de sens", v: perteSens, max: 8, mot: MOTSF[nv24(relatif24(perteSens, 8))], n: nv24(relatif24(perteSens, 8)) }
  ];
  const lacheListe = [...relation.map((x) => [x.label.toLowerCase(), x.n]), ...corps.rows.map((x) => [x.label.toLowerCase(), x.n]), ["tes loisirs et tes liens", nItem("F3")]];
  const lache = Math.max(0, ...lacheListe.map(([, n]) => n));
  const enTete = (xs, n) => liste(xs.filter(([, k]) => k === n && n > 0).map(([l]) => l).slice(0, 2));
  const JAUGE_MOTS = { travail: ["léger", "à surveiller", "lourd", "très lourd"], fatigue: ["légère", "à surveiller", "forte", "très forte"], impacts: ["peu de signes", "à surveiller", "des signes nets", "des signes très nets"] };
  const jaugesSchema = [
    { n: tire, mot: JAUGE_MOTS.travail[tire], sous: tire ? `surtout ${enTete(tireListe, tire)}` : "ne pèse pas fort" },
    { n: nFatigue, mot: JAUGE_MOTS.fatigue[nFatigue], sous: MOTS_RECUP[nRecup] },
    { n: lache, mot: JAUGE_MOTS.impacts[lache], sous: lache ? `surtout ${enTete(lacheListe, lache)}` : "pas de signe net" },
  ];
  const dSchema = {
    jauges: jaugesSchema, pesee1, pesee2, familles: famillesAllumees,
    absurde: { rows: [bs.skipped ? { label: "Pause humour passée", mot: "non renseigné", n: 0 } : { label: "Tâches inutiles", mot: BSMOTS(bs.percent), n: nAbsurde },
      ...(qualiteEmpechee === null ? [] : [{ label: "Qualité empêchée", mot: T4MOTS[qualiteEmpechee] || "", n: qualiteEmpechee >= 3 ? 2 : qualiteEmpechee === 2 ? 1 : 0 }])] },
    fatigue: { n: nRecup, conclusion: MOTS_RECUP[nRecup], epuisement: { v: sr.A.score, max: 24, n: nDim(sr.A), mot: niv(sr.A).mot },
      rows: [{ label: "Décrocher le soir", mot: freq("F1") === "jamais ou presque jamais" ? "sans souci" : `rumine ${freq("F1")}`, n: nItem("F1") },
        { label: "Sommeil perturbé", mot: freq("F2"), n: nItem("F2") },
        ...(conge && conge !== "pas de difficulté" ? [{ label: "En congé", mot: conge, n: T3N[conge] ?? 0 }] : [])] },
    investi: { rows: [surEngage === null ? { label: "Refuser, prouver, y penser", mot: "non renseigné", n: 0 } : { label: "Refuser, prouver, y penser", mot: MOTS[nv24(surEngage)], n: nv24(surEngage) }] },
    recul: { rows: hr ? [...hrLigne("HR1", "Tu en as souri", false), ...hrLigne("HR4", "Ça t'a donné du recul", false), ...hrLigne("HR2", "Ça t'a pesé", true)].slice(0, 2)
      : [{ label: "Pas de réponse", mot: "non renseigné", n: 0 }] },
    appuis: { rows: [{ label: "Points forts", mot: forts.length ? `${forts.length} sur 6` : "à reconstruire", n: forts.length >= 2 ? 0 : forts.length ? 1 : 2 }],
      cote: perso ? "À côté : une vie perso lourde · hors score" : "" },
    relation, corps,
    vie: { rows: [{ label: "Loisirs, liens réduits", mot: freq("F3"), n: nItem("F3") }, ...(partir ? [{ label: "Envie de partir", mot: partir.yes ? "oui" : "non", n: partir.yes ? 1 : 0 }] : [])] },
    temps: { duree: court("T1"), evolution: court("T2", T2MOTS), conge },
    securite: r.hasAlert,
  };
  const autresCtx = ctxOui.filter((a) => a.id !== "personalBurden");
  // Exposition et usure : la jauge du travail dit à quoi tu es exposé·e, les deux autres ce que ça te fait.
  // La phrase n'apparaît que quand elle change la lecture : travail lourd et usure faible, ou violences déclarées.
  const violences = ctxOui.some((a) => a.id === "harassment");
  const exposeSansUsure = tire >= 2 && nFatigue <= 1 && lache <= 1;
  const rpsLecture = violences
    ? "Tu déclares des humiliations ou des violences. Elles se traitent pour elles-mêmes, même si ta fatigue reste basse : cherche les faits datés et un interlocuteur sûr."
    : exposeSansUsure
      ? "Ton travail t’expose (jauge du travail lourde), même si tu tiens encore (fatigue et impacts bas). On n’attend pas d’être usé·e pour changer le travail."
      : famillesAllumees.length
        ? `Familles de risques qui ressortent dans tes réponses : ${famillesAllumees.map((k) => rpsFamilles[k - 1].nom.toLowerCase()).join(", ")}. Ce sont des pistes à vérifier avec des faits, pas un diagnostic.`
        : "Aucune famille ne ressort nettement dans tes réponses, ce qui n’exclut pas une exposition que le questionnaire ne voit pas.";
  const listeRPS = `<ol class="rp-items">${rpsAnswers.map((a) => `<li class="${a.value >= 3 ? "haut" : ""}"><span class="rp-id">${esc(a.id)}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${Number.isInteger(a.value) ? jauge(a.value) : ""}<span>${Number.isInteger(a.value) ? esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, "")) : "Non renseigné"}</span></span></li>`).join("")}</ol>`;

  // ───────── Les dix étapes (une par pièce de la formation)
  const pieces = chapitres.map((c) => c.piece.nom);
  const etapes = [
    {
      id: "batterie", chap: 1, titre: "Ta fatigue et ton corps", q: "Le repos te rend-il ce que le travail te prend ?",
      intro: "Le modèle effort-récupération : travailler fatigue, c'est normal. Ce qui use, c'est quand le repos ne répare plus. <b>Ta fatigue</b> : l'épuisement (A), décrocher le soir (F1), dormir (F2) et ce que change un congé. <b>Ton corps</b> (F4 à F6) : ce que la fatigue abîme quand elle dure. Les loisirs et les liens (F3) sont dans ta vie hors travail.",
      bref: `Ta fatigue : ${JAUGE_MOTS.fatigue[nFatigue]} (${MOTS_RECUP[nRecup]}). La partie F (récupération et corps) : ${niv(sr.F).mot} (${sr.F.score}/24).`,
      corps: `<div class="rp-duo"><div>${recupCorps(recupScore, ["F4", "F5", "F6"].reduce((n, id) => n + item(id).riskScore, 0))}<p class="rp-legende">Chaque barre résume trois questions, sur 12. Ce ne sont ni une quantité d’énergie, ni une mesure clinique validée.</p></div>
        <div>${carte(`Mal à récupérer ${tag(sr.F)}`, `<p>${esc(sr.F.comment)}</p>`)}</div></div>
        <h4 class="rp-h">Tes réponses</h4>${reponses(sr.F, sec.F, ratingLabels, r)}
        ${haut("F5") || haut("F6") ? `<p class="rp-cle"><b>À ne pas laisser de côté :</b> ${[haut("F5") ? "des stratégies pour tenir ou dormir (F5)" : "", haut("F6") ? "des erreurs ou quasi-accidents liés à la fatigue (F6)" : ""].filter(Boolean).join(" et ")}. Ce sont des signaux de sécurité : parles-en à un médecin.</p>` : ""}`,
      comprendre: pourComprendre("Fatigue, stress ou usure", `<p>Le stress est une réaction d'adaptation à une exigence. La fatigue se répare avec le repos. Le burn-out est décrit par l'OMS (CIM-11, 2019) comme un <b>phénomène lié au travail</b>, résultant d'un stress chronique au travail qui n'a pas été géré avec succès. Ce n'est pas une maladie dans la classification, et aucun test sanguin ou hormonal ne le mesure chez une personne.</p><p>Les changements pendant un congé ou à la reprise peuvent éclairer le rôle du travail, sans démontrer à eux seuls une causalité. Une fatigue persistante peut également avoir d’autres origines.</p>`, chapLien(1)),
      garder: "Le repos dit si tu récupères. On regarde maintenant ce que l'usure change chez toi : l'épuisement, la distance, la confiance."
    },
    {
      id: "jauges", chap: 2, titre: "Ta relation au travail", q: "L'usure touche-t-elle seulement ton énergie, ou aussi ta relation au travail et ta confiance ?",
      intro: "Le modèle de Christina Maslach distingue épuisement, distance ou cynisme et efficacité professionnelle réduite. Bull-Out explore aussi le sens du travail, mais ce dernier ne constitue pas une quatrième dimension clinique de Maslach.",
      bref: `${lectureUsure} Épuisement ${niv(sr.A).mot}, distance ${niv(sr.B).mot}, efficacité et sens ${niv(sr.C).mot}.`,
      corps: `<div class="rp-duo"><div>${jauges(sr)}<p class="rp-legende">Les pointillés marquent les seuils de lecture (6, 12 et 18 sur 24).</p></div>
        <div>${r.modelReadings[0].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${sr.B.score >= 7 ? `<p class="rp-cle"><b>La distance n'est pas un défaut d'attitude.</b> La distance peut avoir plusieurs fonctions : protection, désengagement ou symptôme. Ces questions ne permettent pas de trancher seules.</p>` : ""}</div></div>
        <h4 class="rp-h">Épuisement ${tag(sr.A)}</h4>${reponses(sr.A, sec.A, ratingLabels, r)}
        ${haut("A2") ? `<p class="rp-cle"><b>Question clé :</b> tu réponds que même un repos court ne te fait plus récupérer (A2). Cette réponse appelle à examiner sa durée, la récupération, les contraintes du travail et d'autres causes possibles. Elle ne suffit pas à identifier un burn-out.</p>` : ""}
        <h4 class="rp-h">Distance mentale ${tag(sr.B)}</h4>${reponses(sr.B, sec.B, ratingLabels, r)}
        <h4 class="rp-h">Perte d'efficacité et de sens ${tag(sr.C)}</h4>
        <p>La partie C mêle deux choses : l'<b>efficacité perçue</b> (C1, C2, C4, C6 : ${MOTS[nv24(relatif24(efficacite, 16))]}, ${efficacite}/16) et le <b>sens</b> (C3, C5 : difficultés de sens ${MOTSF[nv24(relatif24(perteSens, 8))]}, ${perteSens}/8). Le sens et l’utilité sont explorés à part du questionnaire satirique : <button type="button" class="rp-lien" data-aller="absurde">${esc(bsTitre.toLowerCase())}</button>.</p>
        ${reponses(sr.C, sec.C, ratingLabels, r)}`,
      comprendre: pourComprendre("D'où viennent les trois signes", `<p>Maslach et Jackson ont construit en 1981 le Maslach Burnout Inventory autour de trois dimensions : épuisement émotionnel, dépersonnalisation (devenue « cynisme »), accomplissement personnel réduit. Schaufeli et ses collègues ont proposé en 2020 le Burnout Assessment Tool, qui garde l'épuisement et la distance mentale et ajoute les altérations cognitives (attention, mémoire : A6) et émotionnelles (irritabilité : A5).</p><p>Les questions de Bull-Out reprennent ces dimensions avec des formulations nouvelles. Elles n'ont pas les propriétés mesurées de ces outils : on lit des tendances, pas un score normé.</p>`, chapLien(2)),
      garder: "Les trois signes disent ce que tu ressens. La suite cherche d'où cela vient : ce que le travail te demande, et ce qui t'aide à le faire."
    },
    {
      id: "balance", chap: 3, titre: "Ton travail t'aide-t-il assez ?", q: "Quelles exigences rencontres-tu, et sur quelles ressources peux-tu compter ?",
      intro: "Le modèle Exigences-Ressources (JD-R, Demerouti et Bakker, 2001) pose les exigences du travail (D) sur un plateau et les ressources (E) sur l'autre. Le modèle décrit des processus liés aux contraintes et aux ressources, sans supposer que leurs scores s'annulent mathématiquement.",
      bref: lectureBalance,
      corps: `<div class="rp-duo"><div>${balance(sr.D.score, ressources, 24, "Exigences", "Ressources", `Balance : exigences ${sr.D.score}, ressources ${ressources} sur 24`)}<p class="rp-legende">Les ressources sont tes réponses E telles quelles (plus elles sont présentes, plus le plateau est lourd). Dans le score « Manque de ressources », elles sont comptées à l'envers.</p></div>
        <div>${r.modelReadings[1].lines.map((l) => `<p>${esc(l)}</p>`).join("")}</div></div>
        <h4 class="rp-h">Exigences ${tag(sr.D)}</h4>${reponses(sr.D, sec.D, ratingLabels, r)}
        <h4 class="rp-h">Manque de ressources ${tag(sr.E)}</h4>${reponses(sr.E, sec.E, ratingLabels, r)}<p><button type="button" class="rp-lien" data-aller="rps">Voir les six familles de risques du travail RPS, hors du score d’usure</button></p>`,
      comprendre: pourComprendre("Pourquoi les ressources comptent autant que la charge", `<p>Karasek (1979) a montré que la tension au travail vient de la combinaison d'une forte demande et d'une faible latitude de décision ; le soutien social a ensuite été ajouté comme troisième facteur. Le modèle JD-R généralise : toute exigence coûte de l'énergie, toute ressource (autonomie, soutien, clarté, reconnaissance) aide à y faire face et protège de l'usure.</p><p>En pratique, plusieurs leviers peuvent être étudiés : réduire des contraintes, restaurer de l’autonomie ou améliorer les moyens. Leur efficacité dépend du travail réel ; elle ne se déduit pas d’une différence entre scores.</p>`, chapLien(3)),
      garder: "La balance aide à distinguer des expositions et des ressources, pas à calculer une compensation. La lecture de Siegrist examine ensuite l’effort et les récompenses."
    },
    {
      id: "retour", chap: 4, titre: "Ce que tu donnes est-il payé ?", q: "Ce que tu reçois est-il à la hauteur de ce que tu donnes ?",
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
      id: "contexte", chap: 5, titre: "Tes appuis et ta vie hors travail", q: "Qu'est-ce qui, autour de toi, change la lecture du résultat ?",
      intro: "Ces réponses n'entrent pas dans le score. Elles évitent deux pièges : tout mettre sur le dos du « perso », ou lire comme individuel un problème partagé par l'équipe.",
      bref: ctxOui.length ? `Tu signales : ${liste(ctxOui.map((a) => a.label.toLowerCase()))}.` : "Tu ne signales aucun élément de contexte particulier.",
      corps: `${ctxOui.length ? `<ul class="rp-ctx">${ctxOui.map((a) => `<li><b>${esc(a.label)}</b><span>${esc(a.text)}</span></li>`).join("")}</ul>` : "<p>Aucun élément de la liste. Cela n'exclut pas qu'un contexte non listé compte.</p>"}
        ${ctxOui.some((a) => a.id === "personalBurden") ? `<p class="rp-cle"><b>Une situation personnelle lourde n'efface pas le travail.</b> Les deux s'additionnent : regarde quand même les deux pesées du travail (pièces 3 et 4).</p>` : ""}
        ${ctxOui.some((a) => a.id === "harassment") ? `<p class="rp-cle"><b>Harcèlement, humiliations ou violences :</b> Bull-Out ne l'évalue pas. Note les faits (dates, mots, témoins) et parles-en au médecin du travail ou aux représentants du personnel.</p>` : ""}
        <div class="rp-duo rp-signal"><div class="${ctxOui.some((a) => a.id === "collectiveSignal") ? "" : "actif"}">${carte("Lecture d'abord individuelle", "<p>Tes réponses décrivent ta situation. Si tu découvres que d'autres vivent la même chose, la lecture devient collective.</p>")}</div>
        <div class="${ctxOui.some((a) => a.id === "collectiveSignal") ? "actif" : ""}">${carte("Signal collectif", "<p>Plusieurs personnes touchées sur les mêmes points (surcharge, flou, manque de ressources) : c'est l'organisation du travail qui parle, pas une somme de fragilités.</p>")}</div></div>`,
      comprendre: pourComprendre("Le piège du « c'est perso »", `<p>La Haute Autorité de santé (2017) recommande de rechercher les facteurs professionnels et extra-professionnels, sans que l'un excuse l'autre. En prévention, l'INRS rappelle que les risques psychosociaux se traitent d'abord par l'organisation du travail : une action individuelle ne suffit pas quand la cause est collective.</p>`, chapLien(5)),
      garder: "Tu as maintenant les pièces une à une. L'étape suivante les remet côte à côte, avec les scores et leur façon de les lire."
    },
    {
      id: "dimensions", chap: 6, titre: "Les trois jauges et les dimensions", q: "Que valent ces scores, et comment les lire ?",
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
      id: "rps", chap: 7, titre: "Les six familles de risques", q: "À quoi ton travail t’expose-t-il, même si tu tiens encore ?",
      intro: "Les experts réunis par Michel Gollac, et l’INRS après eux, rangent les risques psychosociaux (RPS) en six familles. Ce sont des caractéristiques du travail, pas des symptômes : ce sont les pastilles de ta colonne LE TRAVAIL.",
      bref: rpsLecture,
      corps: `${grilleRPS}<h4 class="rp-h">Quatre questions de plus · hors score</h4>${listeRPS}
        <p class="rp-cle"><b>Un signal n’est pas une preuve, et une absence de signal n’est pas une absence de risque.</b> Les situations rares mais graves (humiliations, violences) se lisent pour elles-mêmes, quelle que soit leur fréquence et quelle que soit ta fatigue.</p>
        <p>À partir de tes réponses : <b>décris une situation datée</b>, repère la règle ou l’arbitrage en cause, puis cherche un interlocuteur sûr. L’évaluation collective des risques et le document unique (DUERP) ne se font pas avec un questionnaire individuel.</p>`,
      comprendre: pourComprendre("Pourquoi les six familles ne sont pas un score", `<p>Le collège présidé par Michel Gollac a rangé en 2011 les expositions en six familles : intensité et temps de travail, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs, insécurité. Leur combinaison et leur durée peuvent abîmer la santé ; leur présence ne permet pas de prédire une maladie chez toi.</p><p>Tes réponses sur la charge, les aides, ce que tu reçois, l’absurde et le contexte couvrent en partie ces familles. Les quatre questions ajoutées (RPS1 à RPS4) bouchent quatre trous. Elles sont <b>originales, non étalonnées et sans seuil</b> : elles s’affichent en mots et ne font pas bouger la jauge du travail.</p>`, chapLien(7)),
      garder: "Repérer une exposition ouvre une piste. La suite transforme une piste en action sur le travail réel."
    },
    {
      id: "plan", chap: 8, titre: "Où agir : le plan", q: "Que faire dans les 72 heures, puis dans les deux semaines ?",
      intro: "On commence par le travail réel : retirer, reporter, simplifier. Optimiser sa respiration ne règle pas une surcharge non arbitrée. Choisis une ou deux actions, pas douze.",
      bref: `D'abord : ${esc(liste(r.actions.slice(0, 2).map((a) => a.title.toLowerCase())))}.${forts.length || ressPresentes.length ? ` Pour le mener, appuie-toi sur ${esc(liste([...forts.slice(0, 2).map((a) => APPUIS[a.id][1].toLowerCase()), ...ressPresentes.slice(0, 1).map((id) => RESSOURCES[id][0].toLowerCase())]))}.` : ""}`,
      corps: `<h4 class="rp-h">Actions prioritaires</h4><ol class="rp-actions">${r.actions.map((a) => `<li><b>${esc(a.title)}</b><span>${esc(a.text)}</span></li>`).join("")}</ol>
        <h4 class="rp-h">Les 72 prochaines heures</h4><div class="rp-grille4">${r.plans.plan72h.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        <h4 class="rp-h">Dans deux semaines</h4><div class="rp-duo">${r.plans.twoWeeks.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        <p class="rp-carnet-lien"><button type="button" class="button secondary" data-aller="carnet">Préparer mon carnet de suivi sur deux et quatre semaines</button></p>
        <div class="rp-trajet"><p><b>Si certaines réponses évoluent :</b> recherche les situations concrètes qui ont changé. Une amélioration après une action ne prouve pas, à elle seule, son efficacité.</p><p><b>Si des difficultés persistent :</b> examine séparément les exigences, les ressources et le retentissement sur ta santé.</p><p><b>Si la sécurité ou le fonctionnement se dégradent :</b> demande un avis de santé adapté, sans attendre un nouveau score.</p></div>`,
      comprendre: pourComprendre("Pourquoi commencer par le travail", `<p>Les recommandations de prévention (INRS) classent les actions : <b>primaire</b>, agir sur les causes (charge, organisation) ; <b>secondaire</b>, aider les personnes à faire face ; <b>tertiaire</b>, soigner et accompagner le retour. Les plus efficaces sur la durée sont primaires. Le chapitre 8 donne des phrases prêtes à l'emploi pour demander un arbitrage.</p>`, chapLien(8)),
      garder: "Une demande compte davantage quand elle laisse une trace. La pièce suivante t'aide à l'écrire."
    },
    {
      id: "traces", chap: 9, titre: "Depuis quand, et les traces", q: "Depuis quand, et comment garder une trace utile sans parler de ta santé ?",
      intro: "Ce qui protège, toi comme ton manager, c'est d'avoir agi et de pouvoir le montrer : des faits, des dates, des demandes précises. Jamais tes scores ni ta santé.",
      bref: faits.length ? `Ta trace peut s'appuyer sur ${faits.length} fait${faits.length > 1 ? "s" : ""} de travail tiré${faits.length > 1 ? "s" : ""} de tes réponses, et une demande : ${esc(demande)}.` : `Aucun fait de travail ne ressort fortement ; un journal de bord court suffit pour l'instant.`,
      corps: `${[dSchema.temps.duree, dSchema.temps.evolution, dSchema.temps.conge].some(Boolean) ? `<dl class="rp-depuis">${[["Depuis", dSchema.temps.duree], ["Évolution", dSchema.temps.evolution], ["En congé", dSchema.temps.conge]].filter(([, v]) => v).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl><p class="rp-legende">La bande « Depuis quand ? » du schéma. Une carte se lit avec des dates : note-les aussi dans ta trace.</p>` : ""}
        <div class="rp-duo">${carte("Ce que tu écris", ul(["des faits de travail datés : volumes, délais, urgences, demandes contradictoires", "ce que tu as demandé, à qui, quand", "les réponses obtenues, ou leur absence"]), "fort")}
        ${carte("Ce que tu n'écris pas", ul(["tes scores ou ce rapport", "un diagnostic, tes symptômes, tes traitements", "des jugements sur les personnes"]), "levier")}</div>
        <h4 class="rp-h">Un brouillon de demande écrite, à partir de tes réponses</h4>
        <p class="rp-legende">À adapter : complète les crochets avec des dates et des exemples précis. Il ne contient aucune information de santé.</p>
        <pre class="rp-trace" id="rp-trace">${esc(brouillon)}</pre>
        <p><button type="button" class="button secondary" data-copier-trace>Copier le brouillon</button></p>
        <div class="rp-cle"><b>Ton journal de bord.</b> Chaque semaine, deux lignes : ce qui s'est passé (date, tâche, volume) et ce que tu as demandé. Garde-le pour toi, hors de la messagerie professionnelle. Le jour où il faut en parler, il évite la « parole contre parole ».</div>`,
      comprendre: pourComprendre("Ce que dit la loi", `<p>L'employeur a une <b>obligation de sécurité</b> : il doit prévenir les risques pour la santé physique et mentale, pas seulement réparer (article L4121-1 du Code du travail), en agissant d'abord sur l'organisation du travail (L4121-2). Il échappe à sa responsabilité s'il <b>prouve</b> avoir pris les mesures nécessaires (Cour de cassation, 2015). Une surcharge connue et laissée sans réponse peut suffire, même sans harcèlement. Les risques psychosociaux doivent figurer dans le document unique d'évaluation des risques, que tu peux demander à consulter.</p><p>Ce n'est pas un conseil juridique personnalisé : pour une situation précise, un représentant du personnel, l'inspection du travail ou un avocat peuvent t'aider.</p>`, chapLien(9)),
      garder: "Une trace se lit mieux à deux. Dernière pièce : à qui en parler."
    },
    {
      id: "portes", chap: 10, titre: "Les portes", q: "À qui en parler, et pour quoi faire ?",
      intro: "Chaque interlocuteur ouvre une porte différente : soin, santé au travail, arbitrage de la charge, appui collectif. Les informations médicales restent chez les soignants ; ton manager n'a pas à connaître tes scores.",
      bref: `Proposés d'après tes réponses : ${esc(liste(r.stakeholderRecommendations.map((x) => minus(x.stakeholder.name))))}.`,
      corps: `<div class="rp-portes">${r.stakeholderRecommendations.map((x) => carte(esc(x.stakeholder.name), `<p class="rp-pourquoi">${esc(x.why)}</p><p><b>Son rôle :</b> ${esc(x.stakeholder.shortRole)}</p><p class="rp-phrase">« ${esc(x.stakeholder.script)} »</p><a href="agir.html${x.stakeholder.anchor}">Fiche détaillée</a>`, x.key === "emergency" ? "urgence" : "")).join("")}</div>
        <p class="rp-urgences"><b>Toujours valable :</b> idées suicidaires, <a href="tel:3114">3114</a> (gratuit, 24 h/24). Danger immédiat : <a href="tel:15">15</a> ou <a href="tel:112">112</a>.</p>`,
      comprendre: pourComprendre("Ce que peut faire le médecin du travail", `<p>Le médecin du travail est tenu au secret médical vis-à-vis de l'employeur. Tu peux le voir à ta demande, sans passer par ton manager. Il peut proposer des aménagements de poste ou de temps de travail, et alerter sur des risques collectifs sans révéler ce que tu lui as dit.</p>`, chapLien(10)),
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
  const rpsFaitsTravail = rpsFortes.map((a) => `<li><b>${esc(a.id)} :</b> ${esc(a.question)}</li>`).join("");
  const ficheTravail = `<header class="rp-travail-head"><p class="rp-n">Document facultatif · conditions de travail</p>
      <h2 tabindex="-1">Préparer une discussion sur le travail réel</h2><p>Cette fiche reprend <b>uniquement des réponses relatives aux conditions de travail</b>. Ni les questions de santé, ni les alertes, ni les consommations, ni les événements personnels, ni les scores ne sont reproduits.</p></header>
    <section class="rp-travail-bloc"><h3>Contraintes à vérifier</h3>${prouverAuTravail(dFaits, "Aucune contrainte de cette liste n'a été déclarée « souvent » ou « presque toujours ». Cela n'exclut pas d'autres situations.")}</section>
    <section class="rp-travail-bloc"><h3>Repères RPS supplémentaires</h3>${rpsFaitsTravail ? `<ul>${rpsFaitsTravail}</ul>` : "<p>Pas de signal élevé parmi les quatre questions complémentaires.</p>"}</section>
    <section class="rp-travail-bloc"><h3>Ressources à examiner</h3>${prouverAuTravail(eFaits, "Aucun manque de ressource n'est particulièrement déclaré parmi les six éléments explorés.")}</section>
    ${qualiteEmpechee !== null ? `<section class="rp-travail-bloc"><h3>Qualité du travail empêchée</h3><p>Réponse à l'item T4 : <b>${esc(repere("T4").answer)}</b>.</p><p>À préciser à partir d'un exemple : qualité souhaitée, moyens nécessaires et contraintes constatées. Il ne s'agit pas d'une mesure objective.</p></section>` : ""}
    <section class="rp-travail-demande"><h3>Proposition de question pour la discussion</h3><p><b>${esc(demandeOrganisation)}</b></p>
      <p>Pour éclairer la discussion, ajouter un exemple vérifiable : <b>tâche, date, conséquence et arbitrage demandé</b>. Le questionnaire recueille un ressenti, pas une enquête sur les faits.</p></section>
    <p class="rp-travail-prive">Document préparatoire volontaire. Il ne constitue ni un diagnostic ni une évaluation du salarié. Le partage du rapport personnel complet n'est pas requis pour discuter des conditions de travail.</p>`;

  // ───────── Synthèse
  const synCartes = [
    ["Tes réponses", L.fiable ? "Réponses variées" : "Réponses peu différenciées", `Sur les quatre dernières semaines.${L.paires.length ? ` ${L.paires.length} point${L.paires.length > 1 ? "s" : ""} à clarifier (annexe 1).` : ""}`, "annexes"],
    ["L'usure", coeurHauts.length ? liste(coeurHauts.map((d) => `${NOMS[d.id].toLowerCase()} (${niv(d).mot})`)) : "Pas de signe haut", lectureUsure, "jauges"],
    ["Le travail", penche >= 4 ? "La balance penche du côté des exigences" : penche <= -4 ? "Ressources davantage déclarées" : "Scores proches, sans compensation démontrée", lectureBalance, "balance"],
    ["La récupération", `${cap(niv(sr.F).mot)} (${sr.F.score}/24)`, esc(sr.F.comment), "batterie"],
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
  // ───────── Tableau de bord : trois cadrans lus en trois secondes, avant le détail (choix de David, 20/11).
  const cadran = (titre, n, mot, detail, bon) => {
    // Même sens pour les trois cadrans : à droite et en orange, ça use (code couleur unique).
    const coul = COUL, pos = n;
    const arc = (k) => { const a0 = Math.PI * (1 - k / 4), a1 = Math.PI * (1 - (k + 1) / 4) + 0.04; const pt = (a) => `${(60 + 46 * Math.cos(a)).toFixed(1)} ${(58 - 46 * Math.sin(a)).toFixed(1)}`; return `<path d="M${pt(a0)} A46 46 0 0 1 ${pt(a1)}" fill="none" stroke="${coul[k]}" stroke-width="12" opacity="${k === pos ? 1 : 0.28}"/>`; };
    const ang = Math.PI * (1 - (pos + 0.5) / 4);
    return `<div class="rp-cadran"><svg viewBox="0 0 120 66" aria-hidden="true">${[0, 1, 2, 3].map(arc).join("")}<line x1="60" y1="58" x2="${(60 + 34 * Math.cos(ang)).toFixed(1)}" y2="${(58 - 34 * Math.sin(ang)).toFixed(1)}" stroke="${C.sapin}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="58" r="6" fill="${C.sapin}"/></svg>
      <p class="k">${titre}</p><p class="t">${esc(cap(mot))}</p><p class="d">${esc(detail)}</p></div>`;
  };
  // Les trois cadrans = les trois jauges du schéma : ton travail, ta fatigue, les impacts (choix de David, 21/11).
  const bord = `<div class="rp-bord" role="group" aria-label="Tableau de bord : ton travail, ta fatigue, les impacts">
    ${cadran("Ton travail", tire, JAUGE_MOTS.travail[tire], tire ? `Surtout ${enTete(tireListe, tire)}.` : "Le travail déclaré ne pèse pas fort.", false)}
    ${cadran("Ta fatigue", nFatigue, JAUGE_MOTS.fatigue[nFatigue], `D'après l'épuisement et ce que le repos répare : ${MOTS_RECUP[nRecup]}. Un niveau en mots, pas un pourcentage.`, false)}
    ${cadran("Les impacts", lache, JAUGE_MOTS.impacts[lache], lache ? `Surtout ${enTete(lacheListe, lache)}.` : "Pas de signe net d'usure.", false)}
  </div>`;
  const etapesVue = [
    ["travail", "1 · Le travail", "Commence par ce que ton travail te fait porter : les deux pesées (t'aide-t-il assez ? ce que tu donnes est-il payé ?) et l'absurde."],
    ["personne", "2 · Toi", "Puis comment tu tiens : ta fatigue (le repos suffit-il ?), ta façon de t'investir, ton recul face à l'absurde. Et l'impact dans ta vie, à droite."],
    ["appuis", "3 · Tes appuis", "Regarde ce qui te tient et ce que tu portes à côté. Cela change la lecture, pas le score, et n'annule pas la charge."],
    ["tout", "4 · Vue complète", "La vue complète met les trois colonnes côte à côte, sans les additionner en une mesure unique de risque."]
  ];
  // En tête de la synthèse (V3) : le feu, puis les trois cadrans. Le schéma vient ensuite.
  const tete = `<div class="rp-tete"><div class="rp-verdict v${verdict.n}"><span class="rp-feu" aria-hidden="true">${[0, 1, 2, 3].map((k) => `<i class="${k === verdict.n ? "on" : ""}"></i>`).join("")}</span><div><p class="t">${verdict.t}</p><p>${verdict.d}</p></div></div>
      ${bord}${LEGENDE_COULEURS}</div>`;
  // Les quatre modèles lus sur tes réponses : quatre questions, pas quatre preuves (demande de David, V3).
  const modelesLus = `<section class="rp-modeles-lus" aria-labelledby="rp-modeles-titre">
      <h3 id="rp-modeles-titre">Quatre modèles, quatre questions sur tes réponses</h3>
      <div class="rp-modeles-grille">
        <article><p class="k">Effort-récupération · ta fatigue</p><h4>Le repos te rend-il ce que le travail te prend ?</h4><p><b>${cap(MOTS_RECUP[nRecup])}</b> (ruminer le soir : ${freq("F1")} ; sommeil perturbé : ${freq("F2")}${conge && conge !== "pas de difficulté" ? ` ; en congé : ${conge}` : ""}).</p><p class="rp-modele-ou">Au centre, en haut · ${chapLien(1)}</p></article>
        <article><p class="k">Maslach · les pastilles M</p><h4>Qu'est-ce qui change chez toi ?</h4><p>Épuisement <b>${MOTS[nDim(sr.A)]}</b>, distance <b>${MOTS[nDim(sr.B)]}</b>, doute sur l'efficacité et le sens <b>${MOTS[nDim(sr.C)]}</b>.</p><p class="rp-modele-ou">L'épuisement dans ta fatigue, les deux autres dans l'impact · ${chapLien(2)}</p></article>
        <article><p class="k">Exigences-ressources · la première pesée</p><h4>Ton travail t'aide-t-il assez ?</h4><p>Exigences <b>${["basses", "à surveiller", "élevées", "très élevées"][nDim(sr.D)]}</b>, aide (marge, manager, collègues, clarté) <b>${["solide", "présente", "limitée", "rare"][nManque]}</b>.</p><p class="rp-modele-ou">À gauche, en haut · ${chapLien(3)}</p></article>
        <article><p class="k">Effort-récompense · la seconde pesée</p><h4>Ce que tu donnes est-il payé ?</h4><p>Effort <b>${MOTS[nv24(effort)]}</b>, récompense <b>${["faible", "limitée", "correcte", "bonne"][nv24(retour)]}</b>, surengagement <b>${MOTS[nv24(surengagement)]}</b>.</p><p class="rp-modele-ou">La pesée à gauche, « trop investi·e ? » au centre · ${chapLien(4)}</p></article>
      </div>
      <p class="rp-modeles-note">Ces lectures reprennent en partie les mêmes réponses (cinq questions sont communes aux deux pesées) : <b>quatre angles, pas quatre preuves</b>. Aucune ne dit, seule, ce qui cause quoi.</p>
    </section>`;
  const ensemble = `<figure class="rp-vue" data-lecture="tout">
      <div class="rp-vue-commandes" role="group" aria-label="Construire la lecture du schéma">
        ${etapesVue.map(([id, libelle]) => `<button type="button" data-vue-etape="${id}" aria-pressed="${id === "tout"}">${libelle}</button>`).join("")}
      </div>
      <p class="rp-vue-lecture" aria-live="polite">${etapesVue[3][2]}</p>
      ${schemaDouble({ d: dSchema, classe: "rp-ensemble", couches: true, jauges: false, titre: "Vue descriptive de tes réponses : le travail, toi, l'impact dans ta vie, où agir, depuis quand et à qui en parler. L'ordre des colonnes ne prouve aucune causalité." })}
      <details class="rp-pc rp-mode-emploi"><summary>Qu'est-ce qui est réellement mesuré ici ?</summary>
        <p><b>Directement déclaré :</b> les réponses A à F (0 à 4), les appuis G, les récompenses R et les éléments de contexte.</p>
        <p><b>Recalculé :</b> sommes A–F (0 à 24), indices partiels d'efficacité et de sens, effort/récompense/surengagement construits à partir de questions réutilisées, indice satirique du bullshitomètre.</p>
        <p><b>Non mesuré :</b> une réserve d'énergie, une probabilité individuelle de burn-out, l'effet protecteur de l'humour ou une relation causale entre les colonnes. Un score élevé n'est pas une urgence médicale à lui seul.</p>
      </details>
      <figcaption class="rp-legende"><b>Comment lire ce schéma :</b> les trois jauges, juste au-dessus, donnent la vue d'ensemble. Sous chacune, sa colonne dit pourquoi. À gauche, <b>le travail</b> : deux pesées (ton travail t'aide-t-il assez ? ce que tu donnes est-il payé ?) et l'absurde. Au centre, <b>toi</b> : ta fatigue, ta façon de t'investir, ton recul face à l'absurde, tes appuis. À droite, <b>l'impact dans ta vie</b> : ta relation au travail, ton corps, ta vie hors travail. Les pastilles M marquent les trois signes de Maslach. Dessous : où agir, depuis quand et à qui en parler. Chaque réponse n'est dessinée qu'à un seul endroit. <b>La couleur dit l'effet pour toi, jamais si le chiffre est haut</b> : une aide solide est verte, une aide rare est orange. <b>L'ordre des colonnes n'est pas une preuve</b> : rien ici ne montre que le travail cause un symptôme ; c'est une piste à vérifier avec ta chronologie.</figcaption></figure>`;

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
      <p class="rp-syn-principe"><b>Dans l'ordre :</b> le feu et les trois cadrans pour l'essentiel, puis la carte de tes réponses, puis par quoi commencer. Le détail est replié plus bas. Rien ici n'est une preuve de causalité.</p></header>
    ${securite}
    ${tete}
    <section class="rp-syn-schema" aria-labelledby="rp-schema-titre">
      <div class="rp-schema-intro"><p class="k">Vue d'ensemble</p><h3 id="rp-schema-titre">Une carte de tes réponses, pas une carte des causes</h3>
        <p>Le même schéma que dans la formation, sous les trois jauges ci-dessus. À gauche, <b>le travail</b>. Au centre, <b>toi</b>. À droite, <b>l'impact dans ta vie</b>. Les colonnes mettent tes réponses en regard, sans prouver d'où vient quoi.</p></div>
      ${ensemble}
    </section>
    ${violences || exposeSansUsure ? `<section class="rp-cle" aria-label="Exposition et usure"><p><b>À ne pas laisser de côté :</b> ${esc(rpsLecture)} <button type="button" class="rp-lien" data-aller="rps">Voir les six familles de risques</button></p></section>` : ""}
    <section class="rp-syn-priorites" aria-labelledby="rp-priorites-titre">
      <div><p class="k">La suite</p><h3 id="rp-priorites-titre">Par quoi commencer ?</h3>
        <p>${r.actions.length ? `<b>${esc(r.actions[0].title)}.</b> ${esc(r.actions[0].text)}` : "Partir d'un fait de travail récent et d'une difficulté concrète à éclaircir."}</p></div>
      <div class="rp-priorites-liens"><button type="button" class="button primary" data-aller="plan">Voir mon plan →</button>
        <button type="button" class="button secondary" data-aller="portes">À qui en parler ?</button></div>
    </section>
    <details class="rp-syn-detail"><summary>Lire en détail : les quatre modèles, tes réponses en mots, la qualité des réponses</summary>
      ${modelesLus}
      <p class="rp-schema-alternative"><b>Lecture en texte :</b> ${esc(lectureBalance)} ${esc(lectureVecu)} ${esc(lectureUsure)}</p>
      <section class="rp-lecture-trio" aria-label="Trois lectures de tes réponses">${lecturePersonne}${lectureTravail}${lectureAppui}</section>
      ${lectureTemps}
      ${qualiteLecture}
      <div class="rp-syn-questions"><h3>Trois questions pour continuer la réflexion</h3>
        <ul class="rp-q3">${questions.map(([k, q]) => `<li><span class="k">${esc(k)}</span>${esc(q)}</li>`).join("")}</ul></div>
    </details>
    <div class="rp-syn-suite"><p><b>Tu peux t'arrêter à cette synthèse.</b> Le plan et les interlocuteurs viennent ensuite. Si tu veux comprendre les modèles, les dix pièces et les réponses détaillées sont accessibles dans « Approfondir ».</p>
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
      <li><b>Les questions.</b> 36 questions notées de 0 (jamais ou presque) à 4 (presque toujours), sur les quatre dernières semaines, en six parties de six (A à F). Puis, hors score : 6 questions sur ce que tu donnes et ce qui revient (R, modèle de Siegrist), 4 questions supplémentaires sur les expositions RPS, les 12 questions du bullshitomètre (satiriques, à choix) et 4 questions sur la façon dont tu as reçu cet humour, 6 questions sur ce qui t'aide (G). Puis 4 questions de repérage temporel et de qualité empêchée (T), hors score. Enfin 8 questions de contexte et 3 questions d’alerte, en oui ou non.</li>
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
    ${rpsAnswers.length ? `<h4 class="rp-h">Repères RPS · hors score</h4>${listeRPS}` : ""}
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
    <tr><th scope="row"><span class="rp-id">RPS</span> Quatre repères complémentaires</th><td>Temps, émotions masquées, changements non préparés, participation aux décisions.</td><td>Gollac / INRS, inspiration COPSOQ III, formulations originales non validées.</td></tr>
    <tr><th scope="row"><span class="rp-id">T</span> Durée et évolution</th><td>Repères de temporalité et qualité empêchée, hors scores.</td><td>Questions originales Bull-Out, inspirées du repérage clinique HAS et des six familles RPS INRS, non validées.</td></tr>
    <tr><th scope="row"><span class="rp-id">BS</span> Bullshitomètre</th><td>${esc(cap(bullshitPart.explore))}</td><td>${esc(cap(bullshitPart.sources))}.</td></tr>
    <tr><th scope="row"><span class="rp-id">G</span> Ce qui t'aide</th><td>${esc(cap(strengthPart.explore))}</td><td>${esc(cap(strengthPart.sources))}.</td></tr>
    <tr><th scope="row">Contexte</th><td>Ce qui se passe autour et dans l'équipe.</td><td>Repérage clinique de la HAS, prévention des risques psychosociaux de l'INRS.</td></tr></tbody></table>
    <h4 class="rp-h">Références</h4><ul class="rp-refs">
      <li>Organisation mondiale de la santé (2019). CIM-11, QD85 : burn-out, phénomène lié au travail.</li>
      <li>Haute Autorité de santé (2017). Repérage et prise en charge cliniques du syndrome d'épuisement professionnel ou burnout.</li>
      <li>Gollac, M., Bodier, M. (2011). <i>Mesurer les facteurs psychosociaux de risque au travail pour les maîtriser.</i> Collège d’expertise.</li>
      <li>INRS (2025). Effets des expositions psychosociales sur la santé des salariés : synthèse de plus de 800 études.</li>
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
    { id: "appuis", court: "Tes appuis", html: `<header class="rp-etape-head rp-appuis-head"><p class="rp-n">Avant les dix pièces</p>
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
        personne: "Puis toi : ta fatigue, ta façon de t'investir, ton recul. Et l'impact dans ta vie, à droite. Ce qui se voit ne dit pas, seul, ce qui le provoque.",
        travail: "Commence par le travail : les deux pesées et l'absurde. Ce sont des hypothèses d'exposition à examiner.",
        appuis: "Regarde tes appuis et ce que tu portes à côté. Ils changent la lecture, pas le score, et n’annulent pas une contrainte.",
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
