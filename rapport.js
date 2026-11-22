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
  G5: ["Demander de l'aide", "Tu sais demander de l'aide", "C'est un levier d'action : utilise-le pour demander un arbitrage précis, pas seulement un encouragement.", "Prépare une demande précise : une tâche, un délai, une personne. Le chapitre 9 donne des phrases prêtes."],
  G6: ["Poser des limites", "Tu sais poser des limites", "Garde ce réflexe : retirer, reporter, simplifier. C'est la base du plan (pièce 9).", "Entraîne-toi sur une petite demande : « Je peux le faire jeudi, pas aujourd'hui. »"]
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
    garder: "Garde ces appuis en tête : le plan (pièce 9) s'en sert. Viennent ensuite les onze pièces, dans l'ordre de la formation."
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

  // La lecture vient d'absurde.js (même règle que le parcours) : 4 crans sur le bullshitomètre V3, null si non renseigné.
  const lectAbs = r.lectureAbsurde || (typeof window !== "undefined" && window.BullOutAbsurde
    ? { score: window.BullOutAbsurde.scoreAbsurde(r), recul: window.BullOutAbsurde.reculAbsurde(r) } : null);
  const scoreAbs = lectAbs && lectAbs.score;
  const nAbsurde = scoreAbs ? scoreAbs.n : null;
// L'INRS retient six familles RPS. Cette lecture indique la couverture des items
  // Bull-Out, pas un dépistage exhaustif ni une validation de l'exposition.
  const rpsAnswers = r.rpsAnswers || [];
  const rpsFortes = rpsAnswers.filter((a) => a.value >= 3);
  const rpsFamilles = [
    { nom: "Intensité et temps de travail", ids: ["D1", "D2", "D6", "RPS1"], limite: "Débordements interrogés, mais durée de travail et horaires réels non vérifiés.", action: "Quels horaires débordent, à quelles dates, et qui peut arbitrer ?" },
    { nom: "Exigences émotionnelles", ids: ["D5", "RPS2", "RPS5"], limite: "Émotions masquées, tensions et détresse des autres interrogées, sans qualifier les agressions.", action: "Quelles interactions demandent de masquer tes émotions, et quel soutien existe ?" },
    { nom: "Autonomie et marges de manœuvre", ids: ["E1", "D4", "RPS4", "RPS6"], limite: "Moyens, participation et usage des compétences explorés, pas le contenu précis du poste.", action: "Sur quelles décisions pourrais-tu être consulté·e ?" },
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
    const absurdeFort = famille.absurde && nAbsurde !== null && nAbsurde >= 2;
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
  const hr = r.humorReaction && !r.humorReaction.skipped ? Object.fromEntries(r.humorReaction.answers.map((a) => [a.id, a.value])) : null;
  const HRMOTS = ["pas du tout", "un peu", "moyennement", "beaucoup", "tout à fait"];
  const hrLigne = (id, label, use) => (hr && hr[id] !== null && hr[id] !== undefined ? [{ label, mot: HRMOTS[hr[id]], n: use ? (hr[id] >= 3 ? 2 : hr[id] === 2 ? 1 : 0) : 0 }] : []);
  const perso = ctxOui.find((a) => a.id === "personalBurden");
  const partir = r.contextAnswers.find((a) => a.id === "wantToLeave");
  // Les trois jauges : le travail prend la famille la plus lourde ; ta fatigue, épuisement et repos ; les impacts, le signe le plus net.
  const ABSURDE_DANS_JAUGE = true; // choix proposé à David : l'absurde est une famille du travail comme les autres
  const tireListe = [["la charge", nD], ["le manque d'aide", nManque], ["l'effort sans retour", Math.min(nEffort, 3 - nRetour)],
    ...(ABSURDE_DANS_JAUGE && nAbsurde !== null ? [["l'absurde", nAbsurde]] : [])];
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
    absurde: { rows: [...(nAbsurde === null ? [{ label: "Bullshitomètre", mot: "non renseigné", n: 0 }]
        : scoreAbs.lignes.length ? scoreAbs.lignes.map((l) => ({ label: l.label, mot: l.court || l.mot, n: l.n })) : [{ label: "Travail pour rien", mot: scoreAbs.mot, n: nAbsurde }]),
      ...(qualiteEmpechee === null ? [] : [{ label: "Qualité empêchée", mot: T4MOTS[qualiteEmpechee] || "", n: qualiteEmpechee >= 3 ? 2 : qualiteEmpechee === 2 ? 1 : 0 }])].slice(0, 2) },
    fatigue: { n: nRecup, conclusion: MOTS_RECUP[nRecup], epuisement: { v: sr.A.score, max: 24, n: nDim(sr.A), mot: niv(sr.A).mot },
      rows: [{ label: "Décrocher le soir", mot: freq("F1") === "jamais ou presque jamais" ? "sans souci" : `rumine ${freq("F1")}`, n: nItem("F1") },
        { label: "Sommeil perturbé", mot: freq("F2"), n: nItem("F2") },
        ...(conge && conge !== "pas de difficulté" ? [{ label: "En congé", mot: conge, n: T3N[conge] ?? 0 }] : [])] },
    investi: { rows: [surEngage === null ? { label: "Refuser, prouver, y penser", mot: "non renseigné", n: 0 } : { label: "Refuser, prouver, y penser", mot: MOTS[nv24(surEngage)], n: nv24(surEngage) }] },
    recul: { rows: lectAbs && lectAbs.recul && lectAbs.recul.lignes.some((l) => l.court)
      ? lectAbs.recul.lignes.filter((l) => l.court).slice(0, 2).map((l) => ({ label: l.label, mot: l.court, n: l.n }))
      : hr ? [...hrLigne("HR1", "Tu en as souri", false), ...hrLigne("HR4", "Ça t'a donné du recul", false), ...hrLigne("HR2", "Ça t'a pesé", true)].slice(0, 2)
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

  // ───────── Le bullshitomètre : la satire d'un côté, la lecture sérieuse de l'autre
  const bsAxes = {
    meeting: {title:"Réunionite",punch:"Une réunion n'est pas une décision. Même avec un ordre du jour en Comic Sans.",
      question:"À quelle décision précise doit aboutir cette réunion, et qui en est responsable ?"},
    dashboard: {title:"Dashboardologie",punch:"Quand un indicateur ne change aucune décision, c'est parfois juste une veilleuse pour comité.",
      question:"Quelle décision ce KPI permet-il réellement de prendre ou de modifier ?"},
    ghost: {title:"Contribution fantôme",punch:"Un livrable qui dort sur SharePoint n'est pas un actif stratégique. C'est un fossile numérique.",
      question:"Qui se sert de ce livrable et qu'est-ce que son contenu change concrètement ?"},
    notmine: {title:"Pas ton boulot",punch:"Standardiste, archiviste et responsable de la machine à café : trois postes, zéro fiche de poste.",
      question:"À qui revient vraiment cette tâche, et qui peut décider de la lui rendre ?"}
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
  // Lecture de absurde.js : niveau dans la jauge du travail et portrait du recul (sans points).
  const lectureAbs = lectAbs;
  const jaugeAbs = lectureAbs && lectureAbs.score && lectureAbs.score.n !== null
    ? `<p class="rp-bs-pc-explain"><b>Dans la jauge « Ton travail » :</b> ${esc(lectureAbs.score.mot)}. L'absurde y compte comme une famille, à côté de ce que le travail demande, de ce qui t'aide et de l'équilibre donner / recevoir.</p>` : "";
  const recul = lectureAbs && lectureAbs.recul;
  const reculPanel = !recul ? "" : `<section class="rp-bs-reaction rp-bs-recul" aria-labelledby="rp-bs-recul-title">
      <p class="k">Ta façon de prendre l'absurde · dans la vraie vie</p>
      <h4 id="rp-bs-recul-title">${esc(recul.titre)}</h4>
      <p>${esc(recul.texte)}</p>
      ${recul.lignes.length ? `<div class="rp-bs-reaction-grid">${recul.lignes.map((l) => `<div><b>${esc(l.label)}</b><span>${esc(l.mot)}</span></div>`).join("")}</div>` : ""}
      <p class="rp-bs-pc-explain"><b>Ce que cela montre :</b> ta façon habituelle de réagir, lue avec ta récupération et ta distance au travail.
        <b>Ce que cela ne donne pas :</b> une note de résilience. Ces deux questions n'ajoutent aucun point.</p>
    </section>`;
  const pageAbsurde = bs.skipped ? {
    titre:"La pause bullshit, à ton rythme",
    q:"Cette sauvegarde ne contient pas de réponses aux questions satiriques.",
    intro:"Elle date d'une version où la pause humour pouvait être passée. Ton rapport sur les manifestations, le travail, les appuis et la chronologie n'en dépend pas.",
    bref:"Bullshitomètre passé · aucun indice calculé.",
    corps:`<p>Aucun pourcentage, profil satirique ou croisement avec la distance n'a été calculé.
      <b>Tu peux revenir plus tard pour répondre aux treize questions.</b></p>`,
    comprendre:"",
    garder:"On peut discuter des absurdités du travail sans passer un test humoristique."
  } : {
    titre:"Le bullshitomètre",
    q:"Ton travail est-il absurde ? Et que devient ton rapport à ce travail ?",
    intro:"Treize questions satiriques sur les réunions, les indicateurs, le flou, les livrables que personne ne lit et les tâches qui ne sont pas les tiennes. L'absurde compte comme une famille de la jauge de ton travail. Puis ta façon de le prendre, et une matrice pour mettre ces réponses en regard de la distance mentale et du sens. L'humour est volontaire ; la conclusion psychologique ne l'est pas.",
    bref:`Indice satirique d'absurdité : ${bs.percent ?? "—"} % du barème maison. ${esc(bsEtude.title)}. Les axes ne sont pas des seuils cliniques.`,
    corps:`<div class="rp-bs-duo">
      <section class="rp-bs-score" aria-label="Indice humoristique">
        <p class="rp-bs-overline">Service des absurdités administratives</p>
        <p class="rp-bs-pc">${bs.percent ?? "—"}<small> %</small></p>
        <p class="k">Indice satirique d'absurdité</p>
        <p class="rp-bs-pc-explain">Ce pourcentage représente la position dans un barème humoristique construit pour ce questionnaire. Il ne mesure ni la proportion de travail inutile ni le risque de burn-out.</p>
        <div class="rp-bs-metres">${dimensionsBS}</div>
        ${jaugeAbs}
        <p class="rp-bs-pc-explain">La barre « Absurdité globale » correspond exactement à l'indice ci-dessus. Les autres barres détaillent quatre formes de situations rapportées.</p>
      </section>
      ${satire}
    </div>
    ${exemplesBS}
    ${reculPanel}
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
    <details class="rp-bs-reponses"><summary>Retrouver mes ${bs.answers.length} réponses satiriques</summary>
      <ol class="rp-items">${bs.answers.map(a=>`<li><span class="rp-id">${esc(a.id)}</span>
      <span class="rp-q">${esc(a.question)}</span><span class="rp-a"><span>${esc(a.answer)}</span></span></li>`).join("")}</ol>
    </details>`,
    comprendre:pourComprendre("Du bullshit aux conditions de travail : ce qu'on peut vraiment conclure",
      `<p>David Graeber (2018) a popularisé la notion de « bullshit jobs », qui critique les activités considérées comme inutiles par ceux qui les exercent. Soffia, Wood et Burchell (2022) trouvent une association entre le sentiment d'inutilité du travail et le mal-être, mais contestent les grandes conclusions causales et quantitatives de Graeber.</p>
      <p>Dans les six familles de risques psychosociaux décrites par l'INRS, le sens et la qualité empêchée rejoignent les conflits de valeurs. Une activité absurde ou un indicateur inutile peut être une situation organisationnelle à discuter ; un score satirique ne prouve pas que le poste est objectivement inutile.</p>
      <p>L'étude de Martin et collègues (2003) distingue plusieurs <b>usages de l'humour</b> associés différemment au bien-être. Bull-Out te demande maintenant comment tu as reçu ces questions sur le moment : amusement, malaise, impression de minimisation et recul ressenti. Ce retour ponctuel ne mesure ni ton usage habituel de l'humour, ni son éventuel effet protecteur sur ta santé.</p>
      <p>Références : <a href="https://doi.org/10.1177/09500170211015067" target="_blank" rel="noopener">Soffia et al., 2022</a> ; <a href="https://doi.org/10.1016/S0092-6566(02)00534-2" target="_blank" rel="noopener">Martin et al., 2003</a> ; <a href="https://www.inrs.fr/risques/psychosociaux/facteurs-risques" target="_blank" rel="noopener">INRS</a>.`,chapLien(5)),
    garder:"Ce qui fait rire mérite parfois une vraie question : quelle décision, quelle utilité, quels moyens et quel arbitrage ? La pièce suivante ajoute ce qui se passe autour de toi, et qui change la lecture."
  };
  // ───────── V4 : le rapport se lit comme la formation, étape par étape (modèle psytest : fil d'Ariane, une question
  // par étape, « En bref » en mots, ce qui compte, puis les réponses repliées). Neuf étapes, dans l'ordre des chapitres.
  const COLS = { travail: 0, toi: 1, impact: 2, agir: 3 };
  const COLNOMS = ["le travail", "toi", "l'impact dans ta vie", "agir"];
  const miniSchema = (col) => `<svg class="rp-mini" viewBox="0 0 96 62" aria-hidden="true">${[0, 1, 2].map((k) => `<rect x="${3 + k * 31}" y="3" width="28" height="38" rx="6" fill="${k === COLS[col] ? C.orange : C.piste}"/>`).join("")}<rect x="3" y="45" width="90" height="14" rx="6" fill="${COLS[col] === 3 ? C.orange : C.piste}"/></svg>`;
  const pastille = (n, mot) => (n === null || n === undefined ? "" : `<span class="rp-niv n${n}">${esc(mot)}</span>`);
  const repliees = (titre, html) => `<details class="rp-rep"><summary>${titre}</summary><div class="rp-rep-corps">${html}</div></details>`;
  const hautsDe = (ids, limite = 2) => ids.map(item).filter((a) => a.riskScore >= 3).sort((a, b) => b.riskScore - a.riskScore).slice(0, limite);
  const motsHauts = (ids) => liste(hautsDe(ids).map((a) => `« ${a.humanLabel} »`));
  const nSignes = Math.max(nDim(sr.A), nDim(sr.B), nv24(relatif24(efficacite, 16)), nv24(relatif24(perteSens, 8)));
  const nPesee1 = pesee1.penche > 0 ? Math.max(nD, nManque) : pesee1.penche < 0 ? Math.min(nD, nManque) : Math.round((nD + nManque) / 2);
  const nPesee2 = pesee2.penche > 0 ? Math.max(nEffort, 3 - nRetour) : pesee2.penche < 0 ? Math.min(nEffort, 3 - nRetour) : Math.round((nEffort + 3 - nRetour) / 2);
  const nRPS = violences ? 3 : famillesAllumees.length >= 4 ? 3 : famillesAllumees.length >= 2 ? 2 : famillesAllumees.length ? 1 : 0;
  const manqueRetour = recompIds.filter((id) => id.startsWith("R") && rep[id].value <= 1).map((id) => ({ R1: "le salaire", R2: "les perspectives", R3: "la sécurité de l'emploi" })[id]);

  // Les rituels du vendredi soir et du lundi matin : quelques gestes, choisis d'après tes réponses.
  const rituelVendredi = [
    "<b>Ferme la semaine par écrit.</b> Deux lignes dans ton journal de bord : ce qui s'est passé (date, tâche, volume) et ce que tu as demandé.",
    haut("F1") || nRecup >= 2 ? "<b>Vide ta tête sur papier.</b> Note ce qui reste pour lundi, puis ferme l'ordinateur : la liste garde, toi tu décroches." : "<b>Note ce qui reste pour lundi,</b> pour ne pas le porter tout le week-end.",
    nFatigue >= 2 ? "<b>Protège un vrai temps de coupure</b> ce week-end : messagerie professionnelle coupée, notifications aussi." : "<b>Garde ce qui te recharge</b> : une activité du week-end qui n'a rien à voir avec le travail.",
    forts.length ? `<b>Note une chose qui a tenu.</b> Par exemple ${esc(APPUIS[forts[0].id][1].toLowerCase())} : c'est un appui, pas un détail.` : "<b>Note une chose qui a tenu</b> cette semaine, même petite : un appui se reconstruit en le voyant."
  ];
  const rituelLundi = [
    "<b>Choisis trois priorités pour la semaine.</b> Ce qui ne rentre pas, ce n'est pas à toi seul·e de le faire rentrer : demande qui arbitre.",
    pesee1.penche > 0 ? `<b>Prépare ta demande d'arbitrage.</b> Une phrase, pas un plaidoyer : « ${esc(questions[2][1])} »` : `<b>Garde le cap.</b> Une question à poser si la semaine déborde : « ${esc(questions[2][1])} »`,
    nAbsurde !== null && nAbsurde >= 2 && bsAngle ? `<b>Repère une tâche à l'utilité douteuse</b> et pose la question anti-bullshit : « ${esc(bsAngle.question)} »` : "<b>Repère une tâche qui pourrait sortir</b> de ta semaine : à retirer, reporter ou simplifier.",
    pesee2.penche > 0 || (surEngage !== null && surEngage >= 13) ? "<b>Fixe une heure de fin à ta journée de lundi,</b> et tiens-la. Dire non une fois, c'est déjà rééquilibrer l'échange." : "<b>Fixe une heure de fin</b> à ta journée, et note si tu as pu la tenir."
  ];
  const rituels = `<section class="rp-rituels" aria-labelledby="rp-rituels-titre"><h3 id="rp-rituels-titre" class="rp-h">Deux rituels pour tenir le cap</h3>
    <p class="rp-legende">Dix minutes, deux fois par semaine. Pas besoin de te renoter : tu observes le travail réel et tu prépares une décision. Les gestes sont choisis d'après tes réponses.</p>
    <div class="rp-rituels-duo">
      <article class="rp-rituel soir"><div class="rp-rituel-tete"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M26 6a14 14 0 1 0 8 25A16 16 0 0 1 26 6z" fill="${C.anis}"/></svg><div><p class="k">Vendredi soir · 10 minutes</p><h4>Fermer la semaine</h4></div></div><ol>${rituelVendredi.map((x) => `<li>${x}</li>`).join("")}</ol></article>
      <article class="rp-rituel matin"><div class="rp-rituel-tete"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="22" r="8" fill="${C.orange}"/>${[0, 45, 90, 135, 180].map((a) => `<line x1="${(20 + 12 * Math.cos(Math.PI * (1 + a / 180))).toFixed(1)}" y1="${(22 + 12 * Math.sin(Math.PI * (1 + a / 180))).toFixed(1)}" x2="${(20 + 17 * Math.cos(Math.PI * (1 + a / 180))).toFixed(1)}" y2="${(22 + 17 * Math.sin(Math.PI * (1 + a / 180))).toFixed(1)}" stroke="${C.orange}" stroke-width="3" stroke-linecap="round"/>`).join("")}<line x1="4" y1="34" x2="36" y2="34" stroke="${C.sapin}" stroke-width="3" stroke-linecap="round"/></svg><div><p class="k">Lundi matin · 10 minutes</p><h4>Ouvrir la semaine</h4></div></div><ol>${rituelLundi.map((x) => `<li>${x}</li>`).join("")}</ol></article>
    </div>
    <p class="rp-legende">Au bout de quatre semaines, relis tes vendredis : ce qui a changé dans le travail compte plus qu'un nouveau score.</p></section>`;

  // ───────── Les fils de chaque étape (modèle psytest) : un thème, son niveau en mots, ce qui ressort, les réponses repliées.
  const SQ = {
    fatigue: "D'abord : la fatigue se répare-t-elle encore ?",
    signes: "Épuisement, distance, doute : qu'est-ce qui change, et à quel point ?",
    balance: "Ce qu'on te demande, face à ce qui t'aide à le faire.",
    retour: "Effort, estime, salaire, perspectives : l'échange tient-il ?",
    absurde: "Les tâches inutiles usent aussi : qu'en dit ton humour ?",
    rps: "Six familles de risques, lues comme des conditions de travail.",
    autour: "Ce qui ne compte dans aucun score, mais change la lecture.",
    plan: "Une ou deux actions sur le travail réel, pas douze.",
    portes: "Le bon interlocuteur, et une trace qui protège."
  };
  const nFil = (ids) => nv24(relatif24(ids.reduce((s, id) => s + item(id).riskScore, 0), ids.length * 4));
  const listeItems = (ids) => `<ol class="rp-items">${ids.map((id) => { const a = item(id); return `<li class="${a.riskScore >= 3 ? "haut" : ""}"><span class="rp-id">${id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.riskScore)}<span>${esc(ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, ""))}${id.startsWith("E") ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>`;
  const fil = ({ titre, ids, explique, agir = "", n = nFil(ids), mot = NIVMOTS[n], plus = "", extra = "" }) => {
    const hauts = ids.map(item).filter((a) => a.riskScore >= 3).sort((a, b) => b.riskScore - a.riskScore);
    const verdict = hauts.length
      ? `Ce qui ressort : ${esc(liste(hauts.slice(0, 3).map((a) => a.humanLabel)))}.`
      : "Aucune réponse fréquente dans ce fil.";
    return `<article class="rp-filcarte" style="--c:${COUL[n]}">
      <header><h4>${titre}</h4><span class="rp-filniv"><span class="rp-filbarre" aria-hidden="true">${[0, 1, 2, 3].map((k) => `<i${k <= n ? ` style="background:${COUL[n]}"` : ""}></i>`).join("")}</span><b>${esc(mot)}</b></span></header>
      <p class="rp-filverdict">${verdict}</p>
      <p class="rp-filexplique">${explique}</p>
      ${hauts.length ? `<ul class="rp-filchips">${hauts.map((a) => `<li><b>${esc(cap(a.humanLabel))}</b><span>${a.id.startsWith("E") ? "aide présente : " : ""}${esc(ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, "").toLowerCase())}</span></li>`).join("")}</ul>` : ""}
      ${extra}
      ${agir ? `<p class="rp-filagir"><b>Pour agir :</b> ${agir}</p>` : ""}
      <details class="rp-rep"><summary>Voir les ${ids.length + (plus ? 3 : 0)} réponses de ce fil</summary><div class="rp-rep-corps">${listeItems(ids)}${plus}</div></details>
    </article>`;
  };
  const listeR = (ks) => `<ol class="rp-items">${(r.exchangeAnswers || []).filter((_, k) => ks.includes(k)).map((a) => { const k = r.exchangeAnswers.indexOf(a); const risque = k < 3 ? 4 - a.value : a.value; return `<li class="${risque >= 3 ? "haut" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(risque)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}${k < 3 ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>`;
  const FILS = {
    fatigue: [
      fil({ titre: "Le repos", ids: ["F1", "F2", "F3"], explique: "Décrocher le soir, dormir, garder ses loisirs : c'est là que la fatigue se répare, ou pas.", agir: "protège un moment fixe sans messages du travail, et tiens-le une semaine." }),
      fil({ titre: "L'épuisement", ids: ["A1", "A2", "A3", "A4", "A5", "A6"], explique: "Être vidé·e, ne plus récupérer même après un repos court : le premier des trois signes.", agir: "regarde ce qui, dans le travail, empêche la récupération avant de chercher à « tenir mieux »." }),
      fil({ titre: "Le corps et la sécurité", ids: ["F4", "F5", "F6"], explique: "Symptômes physiques, stratégies pour tenir ou dormir, erreurs liées à la fatigue : des signaux à ne pas laisser seuls.", agir: haut("F5") || haut("F6") ? "parles-en à un médecin, sans attendre un nouveau score." : "" })
    ],
    signes: [
      fil({ titre: "La distance", ids: ["B1", "B2", "B3", "B4", "B5", "B6"], explique: "Le cynisme, le retrait, l'envie de ne plus s'impliquer. Elle protège parfois, elle signale souvent." }),
      fil({ titre: "L'efficacité", ids: ["C1", "C2", "C4", "C6"], explique: "Le doute sur ce que tu fais et sur ta compétence. Il vient souvent de conditions qui empêchent de bien faire." }),
      fil({ titre: "Le sens", ids: ["C3", "C5"], explique: "Finir ses journées en ayant été utile, se reconnaître dans son travail. Il se relit à l'étape de l'absurde." })
    ],
    balance: [
      fil({ titre: "Ce qu'on te demande", ids: ["D1", "D2", "D3", "D4", "D5", "D6"], explique: "Quantité, urgences, priorités, responsabilités sans moyens, charge émotionnelle, dysfonctionnements à compenser.", agir: "liste tes tâches et demande ce qui sort, ce qui attend, qui arbitre." }),
      fil({ titre: "Ce qui t'aide", ids: ["E1", "E2", "E3", "E4"], explique: "Ta marge, ton manager, tes collègues, la clarté des objectifs. Ici, une réponse haute veut dire que l'aide manque.", agir: manqueRessource.riskScore >= 3 ? `« ${esc(Q_RESSOURCE[manqueRessource.id])} »` : "" })
    ],
    retour: [
      fil({ titre: "Ce que tu donnes", ids: ["D1", "D4", "D6"], explique: "La quantité, les responsabilités, et ce que tu compenses pour que ça tienne." }),
      fil({ titre: "Ce que tu reçois", ids: ["E5", "E6"], explique: "L'estime et l'équité, puis le salaire, les perspectives et la sécurité (R1 à R3). Ici, une réponse haute veut dire que le retour manque.", extra: manqueRetour.length ? `<ul class="rp-filchips">${manqueRetour.map((m) => `<li><b>${esc(cap(m))}</b><span>jugé insuffisant</span></li>`).join("")}</ul>` : "", plus: listeR([0, 1, 2]) }),
      fil({ titre: "Le surengagement", ids: ["F1"], n: nv24(surengagement), mot: MOTS[nv24(surengagement)], explique: "Ne pas savoir refuser, vouloir prouver, penser au travail dès le réveil : ce qui fait tenir, et ce qui cache le déséquilibre.", agir: "fixe une heure de fin à une journée, et note si tu as pu la tenir.", plus: listeR([3, 4, 5]) })
    ]
  };

  const etapes = [
    {
      id: "fatigue", chap: 1, col: "toi", court: "Ta fatigue", approche: "Approche 1 · effort-récupération",
      q: "Le repos répare-t-il encore ta fatigue ?",
      intro: "Travailler fatigue, c'est normal. Ce qui use, c'est quand le repos ne répare plus : on ne décroche plus le soir, on dort mal, le week-end ne suffit plus.",
      n: nFatigue, mot: JAUGE_MOTS.fatigue[nFatigue],
      bref: `${cap(MOTS_RECUP[nRecup])}. Le soir, tu rumines ${freq("F1")} ; ton sommeil est perturbé ${freq("F2")}${conge && conge !== "pas de difficulté" ? ` ; en congé : ${conge}` : ""}. Avec l'épuisement (${niv(sr.A).mot}), ta fatigue est <b>${JAUGE_MOTS.fatigue[nFatigue]}</b>.`,
      corps: `<div class="rp-duo"><div>${recupCorps(recupScore, ["F4", "F5", "F6"].reduce((n, id) => n + item(id).riskScore, 0))}<p class="rp-legende">Chaque barre résume trois questions, sur 12. Ni une quantité d'énergie, ni une mesure clinique.</p></div>
        <div>${carte(`Ce que tes réponses disent ${tag(sr.F)}`, `<p>${esc(sr.F.comment)}</p>`)}
        ${carte("Ce qui aide le plus", `<p>${nRecup >= 2 ? "Le détachement : un vrai temps sans penser au travail, protégé. Puis regarder ce qui, dans le travail, empêche de décrocher (messages du soir, urgences, dossiers sans fin)." : "Garder ce qui te permet de décrocher aujourd'hui : c'est une protection, pas un luxe."}</p>`, "fort")}</div></div>
        ${haut("F5") || haut("F6") ? `<p class="rp-cle"><b>À ne pas laisser de côté :</b> ${[haut("F5") ? "des stratégies pour tenir ou dormir (F5)" : "", haut("F6") ? "des erreurs ou quasi-accidents liés à la fatigue (F6)" : ""].filter(Boolean).join(" et ")}. Ce sont des signaux de sécurité : parles-en à un médecin.</p>` : ""}`,
      reponses: reponses(sr.F, sec.F, ratingLabels, r),
      comprendre: pourComprendre("Fatigue, stress ou usure", `<p>Le stress est une réaction d'adaptation à une exigence. La fatigue se répare avec le repos. Le burn-out est décrit par l'OMS (CIM-11, 2019) comme un <b>phénomène lié au travail</b>, résultant d'un stress chronique au travail qui n'a pas été géré avec succès. Ce n'est pas une maladie dans la classification, et aucun test sanguin ou hormonal ne le mesure chez une personne.</p><p>Les changements pendant un congé ou à la reprise peuvent éclairer le rôle du travail, sans démontrer à eux seuls une causalité. Une fatigue persistante peut également avoir d'autres origines.</p>`, chapLien(1)),
      garder: "Le repos dit si tu récupères. On regarde maintenant ce que l'usure change chez toi."
    },
    {
      id: "signes", chap: 2, col: "impact", court: "Ce qui change chez toi", approche: "Approche 2 · Maslach",
      q: "Qu'est-ce que l'usure change chez toi ?",
      intro: "Trois signes, lus séparément : l'épuisement, la distance avec le travail (le cynisme) et le doute sur ce que tu fais. Bull-Out regarde aussi le sens, à part.",
      n: nSignes, mot: NIVMOTS[nSignes],
      bref: `${lectureUsure} Épuisement <b>${niv(sr.A).mot}</b>, distance <b>${niv(sr.B).mot}</b>, efficacité <b>${MOTS[nv24(relatif24(efficacite, 16))]}</b>, sens <b>${MOTSF[nv24(relatif24(perteSens, 8))]}</b>.`,
      corps: `<div class="rp-duo"><div>${jauges(sr)}<p class="rp-legende">Les pointillés marquent les seuils de lecture (6, 12 et 18 sur 24).</p></div>
        <div>${r.modelReadings[0].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${sr.B.score >= 7 ? `<p class="rp-cle"><b>La distance n'est pas un défaut d'attitude.</b> Elle peut protéger, signaler un désengagement, ou être un symptôme. Ces questions ne tranchent pas seules.</p>` : ""}
        ${haut("A2") ? `<p class="rp-cle"><b>Question clé :</b> même un repos court ne te fait plus récupérer (A2). Cette réponse appelle à examiner sa durée, la récupération, les contraintes du travail et d'autres causes possibles.</p>` : ""}</div></div>
        <p>La partie C mêle deux choses : l'<b>efficacité perçue</b> (${MOTS[nv24(relatif24(efficacite, 16))]}, ${efficacite}/16) et le <b>sens</b> (${MOTSF[nv24(relatif24(perteSens, 8))]}, ${perteSens}/8). Le sens se retrouve à l'étape de l'absurde.</p>`,
      reponses: `<h4 class="rp-h">Épuisement ${tag(sr.A)}</h4>${reponses(sr.A, sec.A, ratingLabels, r)}<h4 class="rp-h">Distance mentale ${tag(sr.B)}</h4>${reponses(sr.B, sec.B, ratingLabels, r)}<h4 class="rp-h">Efficacité et sens ${tag(sr.C)}</h4>${reponses(sr.C, sec.C, ratingLabels, r)}`,
      comprendre: pourComprendre("D'où viennent les trois signes", `<p>Maslach et Jackson ont construit en 1981 le Maslach Burnout Inventory autour de trois dimensions : épuisement émotionnel, dépersonnalisation (devenue « cynisme »), accomplissement personnel réduit. Schaufeli et ses collègues ont proposé en 2020 le Burnout Assessment Tool, qui garde l'épuisement et la distance mentale et ajoute les altérations cognitives et émotionnelles.</p><p>Les questions de Bull-Out reprennent ces dimensions avec des formulations nouvelles. Elles n'ont pas les propriétés mesurées de ces outils : on lit des tendances, pas un score normé.</p>`, chapLien(2)),
      garder: "Ces signes disent ce que tu vis. La suite cherche ce que ton travail te fait porter : d'abord, t'aide-t-il assez ?"
    },
    {
      id: "balance", chap: 3, col: "travail", court: "Demandes et aides", approche: "Approche 3 · exigences-ressources (JD-R)",
      q: "Ton travail t'aide-t-il assez ?",
      intro: "D'un côté ce que le travail te demande : la charge, les urgences, les priorités contradictoires. De l'autre ce qui t'aide à le faire : ta marge, le soutien, la clarté. Perdre une aide pèse autant qu'ajouter une tâche.",
      n: nPesee1, mot: pesee1.penche > 0 ? "ça penche" : pesee1.penche < 0 ? "l'aide suit" : "à l'équilibre",
      bref: `${pesee1.verdict}. On te demande <b>${pesee1.g.mot}</b>${hautsDe(["D1", "D2", "D3", "D4", "D5", "D6"]).length ? `, surtout ${motsHauts(["D1", "D2", "D3", "D4", "D5", "D6"])}` : ""} ; ce qui t'aide est <b>${pesee1.d.mot}</b> présent${hautsDe(["E1", "E2", "E3", "E4"]).length ? ` (ce qui manque le plus : ${motsHauts(["E1", "E2", "E3", "E4"])})` : ""}.`,
      corps: `<div class="rp-duo"><div>${balance(sr.D.score, ressources, 24, "Demandes", "Aides", `Balance : demandes ${sr.D.score}, aides ${ressources} sur 24`)}<p class="rp-legende">Les aides sont tes réponses E telles quelles : plus elles sont présentes, plus le plateau est lourd.</p></div>
        <div>${r.modelReadings[1].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${manqueRessource.riskScore >= 3 ? carte("Le levier le plus direct", `<p>Retrouver une aide : <b>${esc(RESSOURCES[manqueRessource.id][0].toLowerCase())}</b>. Une question à poser : « ${esc(Q_RESSOURCE[manqueRessource.id])} »</p>`, "levier") : ""}</div></div>`,
      reponses: `<h4 class="rp-h">Ce qu'on te demande ${tag(sr.D)}</h4>${reponses(sr.D, sec.D, ratingLabels, r)}<h4 class="rp-h">Ce qui t'aide (compté à l'envers) ${tag(sr.E)}</h4>${reponses(sr.E, sec.E, ratingLabels, r)}`,
      comprendre: pourComprendre("Pourquoi les aides comptent autant que la charge", `<p>Karasek (1979) a montré que la tension au travail vient de la combinaison d'une forte demande et d'une faible latitude de décision ; le soutien social a ensuite été ajouté. Le modèle JD-R (Demerouti et Bakker, 2001) généralise : toute exigence coûte de l'énergie, toute ressource aide à y faire face. Hobfoll ajoute que les pertes s'enchaînent : une aide perdue en fait perdre d'autres.</p><p>La balance aide à distinguer demandes et aides ; elle ne calcule pas une compensation. Leur effet dépend du travail réel.</p>`, chapLien(3)),
      garder: "La balance pèse la journée. L'étape suivante regarde l'échange : ce que tu donnes, et ce qui te revient."
    },
    {
      id: "retour", chap: 4, col: "travail", court: "Donner et recevoir", approche: "Approche 4 · effort-récompense (Siegrist)",
      q: "Ce que tu donnes est-il payé en retour ?",
      intro: "Ici, on ne pèse pas la journée : on regarde l'échange. Ce que tu donnes (efforts, responsabilités, dysfonctionnements compensés) et ce qui te revient (estime, équité, salaire, perspectives, sécurité). Et le surengagement : ce qui te fait donner encore plus.",
      n: nPesee2, mot: pesee2.penche > 0 ? "ça penche" : pesee2.penche < 0 ? "tu reçois" : "à l'équilibre",
      bref: `${pesee2.verdict}. Tu donnes <b>${pesee2.g.mot}</b>, tu reçois <b>${pesee2.d.mot}</b>${manqueRetour.length ? ` ; ce qui manque le plus : ${esc(liste(manqueRetour))}` : ""}.${surEngage !== null && surEngage >= 13 ? " Tu as aussi du mal à refuser ou à décrocher : c'est ce qui entretient le déséquilibre." : ""}`,
      corps: `<div class="rp-duo"><div>${balance(effort, retour, 24, "Tu donnes", "Tu reçois", `Échange : effort ${effort}, retour ${retour} sur 24`)}<p class="rp-legende">Tu donnes : D1, D4 et D6. Tu reçois : E5 et E6 (estime, équité), R1 à R3 (salaire, perspectives, sécurité). Moyennes ramenées sur 24.</p></div>
        <div>${carte(`Le surengagement <span class="rp-niv n${nv24(surengagement)}">${MOTS[nv24(surengagement)]}</span>`, `<p>D'après R4 à R6 (refuser, prouver, penser au travail dès le réveil) et F1 (ruminer le soir).${lectureSur ? ` ${lectureSur}` : " Ce groupe de questions ne fait pas ressortir de surengagement fréquent."}</p>`)}
        ${manqueRetour.length ? `<p class="rp-cle"><b>L'estime ne compense pas tout :</b> ${esc(liste(manqueRetour))} se négocie${manqueRetour.length > 1 ? "nt" : ""} aussi, avec des faits.</p>` : ""}</div></div>`,
      reponses: `<ol class="rp-items">${["D1", "D4", "D6", "E5", "E6", "F1"].map((id) => { const a = item(id); return `<li class="${a.riskScore >= 3 ? "haut" : ""}"><span class="rp-id">${id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.riskScore)}<span>${esc(ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, ""))}${id.startsWith("E") ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>
        <h4 class="rp-h">${esc(exchangePart.title)}</h4><ol class="rp-items">${(r.exchangeAnswers || []).map((a, k) => { const risque = k < 3 ? 4 - a.value : a.value; return `<li class="${risque >= 3 ? "haut" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(risque)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}${k < 3 ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>`,
      comprendre: pourComprendre("Effort, récompense, surengagement", `<p>Dans le modèle de Siegrist (1996), le risque pour la santé monte quand un effort élevé rencontre une récompense faible. Trois formes de récompense : l'<b>estime</b>, le <b>salaire</b>, les <b>perspectives avec la sécurité de l'emploi</b>. Le <b>surengagement</b> (ne pas savoir refuser, ne pas décrocher, vouloir prouver) n'est pas un défaut : c'est souvent ce qui fait tenir, et ce qui cache le problème.</p><p>Le questionnaire de Siegrist compte 23 questions et calcule un ratio. Bull-Out en garde douze repères : une piste de lecture, pas le calcul d'origine.</p>`, chapLien(4)),
      garder: "Deux pesées sur le travail. Il reste une usure qu'elles ne voient pas : faire des choses qui ne servent à rien."
    },
    {
      id: "absurde", chap: 5, col: "travail", court: "L'absurde", approche: "Chapitre 5 · le bullshitomètre",
      q: "Ton travail a-t-il encore du sens ?",
      intro: bs.skipped ? `${pageAbsurde.q} ${pageAbsurde.intro}` : pageAbsurde.intro,
      n: nAbsurde, mot: scoreAbs ? scoreAbs.mot : "",
      bref: bs.skipped ? pageAbsurde.bref : `${esc(bsEtude.title)}. ${esc(bsEtude.interpretation)}${qualiteEmpechee !== null && qualiteEmpechee >= 3 ? " Tu déclares aussi souvent ne pas pouvoir faire un travail de la qualité voulue (la qualité empêchée)." : ""}`,
      corps: pageAbsurde.corps,
      reponses: "",
      comprendre: pageAbsurde.comprendre,
      garder: "Les quatre premières étapes regardent l'usure. La suivante regarde l'exposition : ce que ton travail te fait courir, même si tu tiens encore."
    },
    {
      id: "rps", chap: 8, col: "travail", court: "Les six familles de risques", approche: "Chapitre 8 · les risques du travail",
      q: "À quoi ton travail t'expose-t-il, même si tu tiens encore ?",
      intro: "Les risques psychosociaux (RPS) sont rangés en six familles (Gollac, INRS). Ce sont des caractéristiques du travail, pas des symptômes : on peut y être exposé·e sans être usé·e. Ce sont les pastilles de ta colonne LE TRAVAIL.",
      n: nRPS, mot: famillesAllumees.length ? `${famillesAllumees.length} famille${famillesAllumees.length > 1 ? "s" : ""} sur 6` : "pas de signal net",
      bref: rpsLecture,
      corps: `${grilleRPS}<p class="rp-cle"><b>Un signal n'est pas une preuve, et une absence de signal n'est pas une absence de risque.</b> Les situations rares mais graves (humiliations, violences) se lisent pour elles-mêmes, quelle que soit ta fatigue.</p>
        <p>Pour agir : <b>décris une situation datée</b>, repère la règle ou l'arbitrage en cause, puis cherche un interlocuteur sûr. L'évaluation collective des risques (le document unique, DUERP) ne se fait pas avec un questionnaire individuel.</p>`,
      reponses: `<p class="rp-legende">Six questions de plus, hors score : elles s'affichent en mots.</p>${listeRPS}`,
      comprendre: pourComprendre("Pourquoi les six familles ne sont pas un score", `<p>Le collège présidé par Michel Gollac a rangé en 2011 les expositions en six familles : intensité et temps de travail, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs, insécurité. Leur combinaison et leur durée peuvent abîmer la santé ; leur présence ne prédit pas une maladie chez toi.</p><p>Les six questions RPS1 à RPS6 sont <b>originales, non étalonnées et sans seuil</b> : elles s'affichent en mots et ne font pas bouger la jauge du travail.</p>`, chapLien(8)),
      garder: "Le travail est posé. Avant d'agir, regarde ce qui t'aide à tenir, ce qui se passe à côté, et depuis quand."
    },
    {
      id: "autour", chap: 6, col: "toi", court: "Tes appuis, ton contexte", approche: "Chapitres 6 et 7 · lire avec le contexte",
      q: "Sur quoi peux-tu t'appuyer, et depuis quand cela dure-t-il ?",
      intro: "Ces réponses n'entrent dans aucun score. Elles changent la lecture : un appui aide à agir, une vie perso lourde s'ajoute au travail sans l'effacer, une durée longue appelle à ne plus attendre.",
      n: null, mot: "",
      bref: `${lectureAppuis}${dSchema.temps.duree ? ` Ça dure depuis ${esc(dSchema.temps.duree)}${dSchema.temps.evolution ? `, ${esc(dSchema.temps.evolution)}` : ""}.` : ""}`,
      corps: `${[dSchema.temps.duree, dSchema.temps.evolution, dSchema.temps.conge].some(Boolean) ? `<dl class="rp-depuis">${[["Depuis", dSchema.temps.duree], ["Évolution", dSchema.temps.evolution], ["En congé", dSchema.temps.conge]].filter(([, v]) => v).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
        ${pageAppuis.corps}
        <h4 class="rp-h">Ce qui se passe autour</h4>
        ${ctxOui.length ? `<ul class="rp-ctx">${ctxOui.map((a) => `<li><b>${esc(a.label)}</b><span>${esc(a.text)}</span></li>`).join("")}</ul>` : "<p>Aucun élément de contexte coché. Cela n'exclut pas qu'un contexte non listé compte.</p>"}
        ${perso ? `<p class="rp-cle"><b>Une situation personnelle lourde n'efface pas le travail.</b> Les deux s'additionnent : les deux pesées du travail restent à regarder.</p>` : ""}
        ${violences ? `<p class="rp-cle"><b>Harcèlement, humiliations ou violences :</b> Bull-Out ne l'évalue pas. Note les faits (dates, mots, témoins) et parles-en au médecin du travail ou aux représentants du personnel.</p>` : ""}
        ${ctxOui.some((a) => a.id === "collectiveSignal") ? `<p class="rp-cle"><b>D'autres vivent la même chose :</b> c'est l'organisation du travail qui parle, pas une somme de fragilités. La demande peut devenir collective.</p>` : ""}`,
      reponses: `<ol class="rp-items">${g.map((a) => `<li class="${a.value >= 3 ? "fort" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.value)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</span></span></li>`).join("")}</ol>`,
      comprendre: pourComprendre("Pourquoi regarder aussi ce qui va bien, et le contexte", `<p>Le modèle JD-R compte aussi des <b>ressources personnelles</b> : sentiment d'efficacité, optimisme, capacité à agir (Xanthopoulou et al., 2007). Elles s'usent elles aussi quand les exigences restent trop hautes trop longtemps : le plan commence donc par le travail réel.</p><p>La Haute Autorité de santé (2017) recommande de rechercher les facteurs professionnels et extra-professionnels, sans que l'un excuse l'autre.</p>`, chapLien(6)),
      garder: "Tu as toutes les pièces. Reste le plus utile : quoi faire, dès cette semaine."
    },
    {
      id: "plan", chap: 9, col: "agir", court: "Ton plan et tes rituels", approche: "Chapitre 9 · agir sur le travail",
      q: "Et maintenant, que faire cette semaine ?",
      intro: "On commence par le travail réel : retirer, reporter, simplifier. Optimiser sa respiration ne règle pas une surcharge non arbitrée. Choisis une ou deux actions, pas douze.",
      n: null, mot: "",
      bref: `D'abord : ${esc(liste(r.actions.slice(0, 2).map((a) => a.title.toLowerCase())))}.${forts.length || ressPresentes.length ? ` Pour le mener, appuie-toi sur ${esc(liste([...forts.slice(0, 2).map((a) => APPUIS[a.id][1].toLowerCase()), ...ressPresentes.slice(0, 1).map((id) => RESSOURCES[id][0].toLowerCase())]))}.` : ""}`,
      corps: `<h4 class="rp-h">Tes actions prioritaires</h4><ol class="rp-actions">${r.actions.map((a) => `<li><b>${esc(a.title)}</b><span>${esc(a.text)}</span></li>`).join("")}</ol>
        <h4 class="rp-h">Les 72 prochaines heures</h4><div class="rp-grille4">${r.plans.plan72h.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        <h4 class="rp-h">Dans deux semaines</h4><div class="rp-duo">${r.plans.twoWeeks.map((b) => carte(b.title, ul(b.items.map(esc)))).join("")}</div>
        ${rituels}
        <p class="rp-carnet-lien"><button type="button" class="button secondary" data-aller="carnet">Préparer mon carnet de suivi sur deux et quatre semaines</button></p>`,
      reponses: "",
      comprendre: pourComprendre("Pourquoi commencer par le travail", `<p>Les recommandations de prévention (INRS) classent les actions : <b>primaire</b>, agir sur les causes (charge, organisation) ; <b>secondaire</b>, aider les personnes à faire face ; <b>tertiaire</b>, soigner et accompagner le retour. Les plus efficaces sur la durée sont primaires.</p><p><b>Si des difficultés persistent :</b> examine séparément les demandes, les aides et le retentissement sur ta santé. <b>Si la sécurité ou le fonctionnement se dégradent :</b> demande un avis de santé, sans attendre un nouveau score.</p>`, chapLien(9)),
      garder: "Une demande compte davantage quand elle laisse une trace, et quand tu sais à qui l'adresser."
    },
    {
      id: "portes", chap: 11, col: "agir", court: "En parler, garder une trace", approche: "Chapitres 10 et 11 · les traces et les portes",
      q: "À qui en parler, et comment garder une trace ?",
      intro: "Chaque interlocuteur ouvre une porte différente : soin, santé au travail, arbitrage de la charge, appui collectif. Les informations médicales restent chez les soignants ; ton manager n'a pas à connaître tes scores. Ce qui protège, c'est d'avoir agi et de pouvoir le montrer : des faits, des dates, des demandes.",
      n: null, mot: "",
      bref: `Proposés d'après tes réponses : ${esc(liste(r.stakeholderRecommendations.map((x) => minus(x.stakeholder.name))))}. ${faits.length ? `Ta trace peut s'appuyer sur ${faits.length} fait${faits.length > 1 ? "s" : ""} de travail et une demande : ${esc(demande)}.` : "Un journal de bord court suffit pour l'instant."}`,
      corps: `<div class="rp-portes">${r.stakeholderRecommendations.map((x) => carte(esc(x.stakeholder.name), `<p class="rp-pourquoi">${esc(x.why)}</p><p><b>Son rôle :</b> ${esc(x.stakeholder.shortRole)}</p><p class="rp-phrase">« ${esc(x.stakeholder.script)} »</p><a href="agir.html${x.stakeholder.anchor}">Fiche détaillée</a>`, x.key === "emergency" ? "urgence" : "")).join("")}</div>
        <p class="rp-urgences"><b>Toujours valable :</b> idées suicidaires, <a href="tel:3114">3114</a> (gratuit, 24 h/24). Danger immédiat : <a href="tel:15">15</a> ou <a href="tel:112">112</a>.</p>
        <h4 class="rp-h">Garder une trace</h4>
        <div class="rp-duo">${carte("Ce que tu écris", ul(["des faits de travail datés : volumes, délais, urgences, demandes contradictoires", "ce que tu as demandé, à qui, quand", "les réponses obtenues, ou leur absence"]), "fort")}
        ${carte("Ce que tu n'écris pas", ul(["tes scores ou ce rapport", "un diagnostic, tes symptômes, tes traitements", "des jugements sur les personnes"]), "levier")}</div>
        <h4 class="rp-h">Un brouillon de demande écrite, tiré de tes réponses</h4>
        <p class="rp-legende">À adapter : complète les crochets avec des dates et des exemples précis. Il ne contient aucune information de santé.</p>
        <pre class="rp-trace" id="rp-trace">${esc(brouillon)}</pre>
        <p><button type="button" class="button secondary" data-copier-trace>Copier le brouillon</button> <button type="button" class="button secondary" data-aller="travail">Préparer la fiche travail</button></p>`,
      reponses: "",
      comprendre: pourComprendre("Ce que dit la loi, ce que peut le médecin du travail", `<p>L'employeur a une <b>obligation de sécurité</b> : il doit prévenir les risques pour la santé physique et mentale (article L4121-1 du Code du travail), en agissant d'abord sur l'organisation du travail (L4121-2). Une surcharge connue et laissée sans réponse peut suffire à engager sa responsabilité, même sans harcèlement.</p><p>Le médecin du travail est tenu au secret médical vis-à-vis de l'employeur. Tu peux le voir à ta demande, sans passer par ton manager. Ce n'est pas un conseil juridique personnalisé : un représentant du personnel, l'inspection du travail ou un avocat peuvent t'aider.</p>`, chapLien(11)),
      garder: "Garde ce rapport et refais le questionnaire dans deux à quatre semaines : c'est la trajectoire qui compte."
    }
  ];

  // ───────── Modèles de lecture personnalisée (faits, limites, actions)
// Synthèse : partir des réponses individuelles, pas d'un score global ou d'un verdict.
  const frequences = (a) => ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, "");
  const principaux = (ids, limite = 2) => r.answers
    .filter((a) => ids.includes(a.sectionId) && a.riskScore >= 3)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, limite);
  const manifs = principaux(["A", "B", "C", "F"]);
  const travailRessort = principaux(["D", "E"]);
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
    <section class="rp-travail-bloc"><h3>Repères RPS supplémentaires</h3>${rpsFaitsTravail ? `<ul>${rpsFaitsTravail}</ul>` : "<p>Pas de signal élevé parmi les six questions complémentaires.</p>"}</section>
    <section class="rp-travail-bloc"><h3>Ressources à examiner</h3>${prouverAuTravail(eFaits, "Aucun manque de ressource n'est particulièrement déclaré parmi les six éléments explorés.")}</section>
    ${qualiteEmpechee !== null ? `<section class="rp-travail-bloc"><h3>Qualité du travail empêchée</h3><p>Réponse à l'item T4 : <b>${esc(repere("T4").answer)}</b>.</p><p>À préciser à partir d'un exemple : qualité souhaitée, moyens nécessaires et contraintes constatées. Il ne s'agit pas d'une mesure objective.</p></section>` : ""}
    <section class="rp-travail-demande"><h3>Proposition de question pour la discussion</h3><p><b>${esc(demandeOrganisation)}</b></p>
      <p>Pour éclairer la discussion, ajouter un exemple vérifiable : <b>tâche, date, conséquence et arbitrage demandé</b>. Le questionnaire recueille un ressenti, pas une enquête sur les faits.</p></section>
    <p class="rp-travail-prive">Document préparatoire volontaire. Il ne constitue ni un diagnostic ni une évaluation du salarié. Le partage du rapport personnel complet n'est pas requis pour discuter des conditions de travail.</p>`;

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
  // ───────── Synthèse (V4, sur le modèle de psytest) : le feu, ton histoire en quatre phrases, les trois cadrans,
  // le fil des neuf étapes, le schéma, par quoi commencer, trois questions. Tout renvoie vers une étape.
  const usure = ["A", "B", "C", "F"].map((id) => sr[id]);
  const usureMax = Math.max(...usure.map((d) => niv(d).n));
  const hautes = usure.filter((d) => d.score >= 13);
  const tresHaute = usure.find((d) => d.score >= 19);
  const COURTS = { A: "l'épuisement", B: "la distance au travail", C: "l'efficacité ou le sens", F: "la récupération" };
  const nomsUsure = (ds) => liste(ds.map((d) => COURTS[d.id]));
  const verdict = r.hasAlert ? { n: 3, t: "Un signal de sécurité est déclaré", d: "L’orientation dépend de la réponse concernée : consulte le message de sécurité ci-dessus, sans interpréter le score total." }
    : hautes.length >= 2 || tresHaute ? { n: 2, t: "Plusieurs manifestations ressortent", d: `${tresHaute && hautes.length < 2 ? `Un signe d'usure est très élevé (${nomsUsure([tresHaute])})` : `Plusieurs signes d'usure sont élevés en même temps (${nomsUsure(hautes)})`}. Ce n'est pas un diagnostic, mais une raison d'agir dans les prochains jours et d'en parler à un médecin.` }
      : hautes.length === 1 ? { n: 1, t: "Un signe ressort nettement", d: `${cap(nomsUsure(hautes))} ressort ; les autres tiennent encore. C'est le bon moment pour agir, avant que l'usure s'installe.` }
      : usureMax === 1 || sr.D.score >= 13 || sr.E.score >= 13 ? { n: 1, t: "Des éléments méritent attention", d: "Des manifestations ou contraintes ressortent sur certaines questions, sans qu’un niveau clinique soit déterminé." }
        : { n: 0, t: "Peu de difficultés déclarées", d: "Ce questionnaire ne fait pas ressortir de difficultés fréquentes dans les domaines explorés. Il ne remplace pas une appréciation médicale ou professionnelle." };
  // Les trois cadrans = les trois jauges du schéma : ton travail, ta fatigue, les impacts. Chacun ouvre son étape.
  const cadran = (titre, n, mot, detail, aller) => {
    const arc = (k) => { const a0 = Math.PI * (1 - k / 4), a1 = Math.PI * (1 - (k + 1) / 4) + 0.04; const pt = (a) => `${(60 + 46 * Math.cos(a)).toFixed(1)} ${(58 - 46 * Math.sin(a)).toFixed(1)}`; return `<path d="M${pt(a0)} A46 46 0 0 1 ${pt(a1)}" fill="none" stroke="${COUL[k]}" stroke-width="12" opacity="${k === n ? 1 : 0.28}"/>`; };
    const ang = Math.PI * (1 - (n + 0.5) / 4);
    return `<button type="button" class="rp-cadran" data-aller="${aller}"><svg viewBox="0 0 120 66" aria-hidden="true">${[0, 1, 2, 3].map(arc).join("")}<line x1="60" y1="58" x2="${(60 + 34 * Math.cos(ang)).toFixed(1)}" y2="${(58 - 34 * Math.sin(ang)).toFixed(1)}" stroke="${C.sapin}" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="58" r="6" fill="${C.sapin}"/></svg>
      <p class="k">${titre}</p><p class="t">${esc(cap(mot))}</p><p class="d">${esc(detail)}</p><span class="rp-cadran-lien" aria-hidden="true">Voir l'étape →</span></button>`;
  };
  const etapeTravail = ({ "la charge": "balance", "le manque d'aide": "balance", "l'effort sans retour": "retour", "l'absurde": "absurde" })[tireListe.find(([, k]) => k === tire)?.[0]] || "balance";
  const bord = `<div class="rp-bord" role="group" aria-label="Tableau de bord : ton travail, ta fatigue, les impacts">
    ${cadran("Ton travail", tire, JAUGE_MOTS.travail[tire], tire ? `Surtout ${enTete(tireListe, tire)}.` : "Le travail déclaré ne pèse pas fort.", etapeTravail)}
    ${cadran("Ta fatigue", nFatigue, JAUGE_MOTS.fatigue[nFatigue], `${cap(MOTS_RECUP[nRecup])}.`, "fatigue")}
    ${cadran("Les impacts", lache, JAUGE_MOTS.impacts[lache], lache ? `Surtout ${enTete(lacheListe, lache)}.` : "Pas de signe net d'usure.", "signes")}
  </div>`;
  const tete = `<div class="rp-tete"><div class="rp-verdict v${verdict.n}"><span class="rp-feu" aria-hidden="true">${[0, 1, 2, 3].map((k) => `<i class="${k === verdict.n ? "on" : ""}"></i>`).join("")}</span><div><p class="t">${verdict.t}</p><p>${verdict.d}</p></div></div>
      ${bord}${LEGENDE_COULEURS}</div>`;

  // Le moteur de lecture : quatre phrases en mots, puis une conclusion qui dépend du croisement travail / usure.
  const usureN = Math.max(nFatigue, lache);
  const histoire = [
    { n: tire, k: "Ton travail", aller: etapeTravail, t: tire >= 2 ? `Ton travail pèse ${JAUGE_MOTS.travail[tire] === "très lourd" ? "très lourd" : "lourd"}, surtout ${enTete(tireListe, tire)}. ${pesee1.penche > 0 ? "On te demande plus que ce qui t'aide." : ""} ${pesee2.penche > 0 ? "Et tu donnes plus que tu ne reçois." : ""}`
        : tire === 1 ? `Ton travail est à surveiller${enTete(tireListe, tire) ? `, surtout ${enTete(tireListe, tire)}` : ""}, sans peser fort.` : "Ton travail ne pèse pas fort dans tes réponses." },
    { n: nFatigue, k: "Ta fatigue", aller: "fatigue", t: `Ta fatigue est ${JAUGE_MOTS.fatigue[nFatigue]} : ${MOTS_RECUP[nRecup]}.${haut("F1") ? " Tu as du mal à décrocher le soir." : ""}` },
    { n: lache, k: "Ce que ça change", aller: "signes", t: lache ? `L'usure se voit, surtout ${enTete(lacheListe, lache)}.${coeurHauts.length ? ` Parmi les trois signes, ${coeurHauts.length > 1 ? "ressortent" : "ressort"} ${liste(coeurHauts.map((d) => NOMS[d.id].toLowerCase()))}.` : ""}` : "L'usure ne se voit pas nettement sur ta relation au travail, ton corps ou ta vie." },
    { n: null, k: "Ce qui tient", aller: "autour", t: `${forts.length ? `Tu peux t'appuyer sur ${liste(forts.slice(0, 2).map((a) => APPUIS[a.id][1].toLowerCase()))}.` : "Peu d'appuis nets aujourd'hui : c'est fréquent quand l'usure s'installe."}${dSchema.temps.duree ? ` Cela dure depuis ${dSchema.temps.duree}${dSchema.temps.evolution ? `, ${dSchema.temps.evolution}` : ""}.` : ""}` }
  ];
  const donc = r.hasAlert ? "Commence par le message de sécurité : il passe avant tout le reste."
    : tire >= 2 && usureN >= 2 ? "Le travail pèse et l'usure se voit. C'est le moment d'agir sur le travail, cette semaine, et d'en parler à un médecin."
      : tire >= 2 ? "Le travail pèse, mais tu tiens encore. On n'attend pas d'être usé·e pour changer le travail : c'est le meilleur moment pour agir."
        : usureN >= 2 ? "L'usure se voit plus que la charge déclarée. Regarde aussi ce que le questionnaire voit mal : la vie hors travail, la santé, l'histoire du poste. Et parles-en à un médecin."
          : "Peu de signaux. Garde ce qui te protège, et refais le point dans quelques semaines.";
  const histoireHTML = `<section class="rp-histoire" aria-labelledby="rp-histoire-titre"><p class="k">Ta lecture en mots</p><h3 id="rp-histoire-titre">Ton histoire en quatre phrases</h3>
    <ol>${histoire.map((h) => `<li style="--c:${h.n === null ? C.mid : COUL[h.n]}"><button type="button" data-aller="${h.aller}"><span class="k">${h.k}</span><span class="t">${esc(h.t.replace(/\s+/g, " ").trim())}</span></button></li>`).join("")}</ol>
    <p class="rp-donc"><b>Donc :</b> ${esc(donc)}</p></section>`;

  const filChips = `<section class="rp-fil-syn" aria-labelledby="rp-fil-syn-titre"><p class="k">Le fil de ton rapport</p><h3 id="rp-fil-syn-titre">Neuf étapes, dans l'ordre de la formation</h3>
    <ol class="rp-chips">${etapes.map((e, i) => `<li style="--c:${e.n === null || e.n === undefined ? C.mid : COUL[e.n]}"><button type="button" data-aller="${e.id}"><span class="n">${i + 1}</span><b>${esc(e.court)}</b>${e.mot ? `<span>${esc(e.mot)}</span>` : ""}</button></li>`).join("")}</ol></section>`;

  const ensemble = `<figure class="rp-vue" data-lecture="tout">
      <div class="rp-vue-commandes" role="group" aria-label="Construire la lecture du schéma">
        ${[["travail", "1 · Le travail"], ["personne", "2 · Toi"], ["appuis", "3 · Tes appuis"], ["tout", "4 · Vue complète"]].map(([id, libelle]) => `<button type="button" data-vue-etape="${id}" aria-pressed="${id === "tout"}">${libelle}</button>`).join("")}
      </div>
      <p class="rp-vue-lecture" aria-live="polite">Vue complète : des réponses mises en regard, sans énergie fictive ni relation causale démontrée.</p>
      ${schemaDouble({ d: dSchema, classe: "rp-ensemble", couches: true, jauges: false, titre: "Vue descriptive de tes réponses : le travail, toi, l'impact dans ta vie, où agir, depuis quand et à qui en parler. L'ordre des colonnes ne prouve aucune causalité." })}
      <figcaption class="rp-legende"><b>Comment lire ce schéma :</b> à gauche, <b>le travail</b> (les deux pesées, l'absurde, les familles de risques) ; au centre, <b>toi</b> (ta fatigue, ta façon de t'investir, ton recul, tes appuis) ; à droite, <b>l'impact dans ta vie</b>. Chaque réponse n'est dessinée qu'à un seul endroit. <b>La couleur dit l'effet pour toi</b> : une aide solide est verte, une aide rare est orange. <b>L'ordre des colonnes n'est pas une preuve</b> : rien ici ne montre que le travail cause un symptôme ; c'est une piste à vérifier avec ta chronologie.</figcaption></figure>`;

  const synthese = `<header class="rp-syn-head"><p class="course-eyebrow">Synthèse · l'essentiel en trois minutes</p>
      <h2 tabindex="-1">Ce que tes réponses racontent</h2>
      <p>${esc(r.summary)}</p></header>
    ${securite}
    ${tete}
    ${histoireHTML}
    ${violences || exposeSansUsure ? `<section class="rp-cle" aria-label="Exposition et usure"><p><b>À ne pas laisser de côté :</b> ${esc(rpsLecture)} <button type="button" class="rp-lien" data-aller="rps">Voir les six familles de risques</button></p></section>` : ""}
    <section class="rp-syn-priorites" aria-labelledby="rp-priorites-titre">
      <div><p class="k">Par quoi commencer</p><h3 id="rp-priorites-titre">${r.actions.length ? esc(r.actions[0].title) : "Partir d'un fait de travail récent"}</h3>
        <p>${r.actions.length ? esc(r.actions[0].text) : "Choisis une difficulté concrète à éclaircir, avec une date."} Puis deux rituels : le vendredi soir pour fermer la semaine, le lundi matin pour l'ouvrir.</p></div>
      <div class="rp-priorites-liens"><button type="button" class="button primary" data-aller="plan">Mon plan et mes rituels →</button>
        <button type="button" class="button secondary" data-aller="portes">À qui en parler ?</button></div>
    </section>
    <div class="rp-syn-questions"><h3>Trois questions à emporter</h3>
      <ul class="rp-q3">${questions.map(([k, q]) => `<li><span class="k">${esc(k)}</span>${esc(q)}</li>`).join("")}</ul></div>
    ${filChips}
    <section class="rp-syn-schema" aria-labelledby="rp-schema-titre">
      <div class="rp-schema-intro"><p class="k">Vue d'ensemble</p><h3 id="rp-schema-titre">Le schéma de la formation, avec tes réponses</h3>
        <p>Le même schéma que celui de Sam : les trois jauges ci-dessus, et sous chacune, ce qui les explique.</p></div>
      ${ensemble}
    </section>
    <div class="rp-syn-suite"><p><b>Pour comprendre d'où vient chaque mot</b>, lis le rapport étape par étape : une question à la fois, comme dans la formation.</p>
      <button type="button" class="button primary" data-aller="lire">Lire mon rapport étape par étape →</button></div>`;

  // « Avant de lire » : comment lire, le sommaire, et tout ce qui relève de la méthode, regroupé ici.
  const sommaireLigne = (id, n, titre, desc, extra = "") => `<li><button type="button" data-aller="${id}"><span class="n">${n}</span><span class="t">${titre}${extra}</span><span class="pts" aria-hidden="true"></span><span class="d">${desc}</span></button></li>`;
  const avantLire = `<header class="rp-etape-head"><p class="rp-n">Avant de lire</p><h2 tabindex="-1">Comment lire ton rapport</h2>
      <p class="rp-lead">Ce rapport fait le point sur tes réponses à ${r.answers.length + (r.exchangeAnswers || []).length + g.length + rpsAnswers.length + temps.length + (bs.skipped ? 0 : bs.answers.length)} questions, sur tes <b>quatre dernières semaines</b>. Il se lit comme la formation : <b>neuf étapes</b>, chacune avec une question, une réponse en mots, et ce que tu peux en faire.</p></header>
    <div class="rp-lire-duo">
      <section class="rp-lire-box sombre"><p class="k">Ce qu'il t'apporte</p><ul>
        <li><b>Une vue d'ensemble</b> : ta fatigue, ce que ton travail te demande, ce qu'il te rend, et ce qui t'aide, lus ensemble.</li>
        <li><b>Un ordre</b> : d'abord ce que tu vis, puis ce que le travail te fait porter, puis quoi faire.</li>
        <li><b>Des mots plutôt que des chiffres</b> : ça va, à surveiller, ça use, ça use beaucoup.</li>
        <li><b>Des outils à emporter</b> : un plan pour la semaine, deux rituels, un brouillon de demande écrite, la fiche travail.</li></ul></section>
      <section class="rp-lire-box clair"><p class="k">Comment il est construit</p><ul>
        <li>Chaque résultat renvoie aux réponses qui l'ont produit : tu peux tout vérifier.</li>
        <li>Les niveaux sont fixés sur des quarts de l'échelle : des repères, pas des normes.</li>
        <li>Les pistes sont des hypothèses, à vérifier en parlant avec quelqu'un. Jamais un diagnostic.</li>
        <li>Rien n'est envoyé : tes réponses restent dans ton navigateur et dans les fichiers que tu enregistres.</li></ul></section>
    </div>
    <section class="rp-anatomie" aria-labelledby="rp-anat-t"><h3 id="rp-anat-t" class="rp-h">Comment se lit une étape</h3>
      <ol>
        <li><span class="rp-anat-vis a" aria-hidden="true"><i></i><i></i><i class="o"></i><i></i></span><b>Le fil d'Ariane</b><span>En haut : où tu en es dans les neuf étapes. Clique pour sauter d'une étape à l'autre.</span></li>
        <li><span class="rp-anat-vis q" aria-hidden="true">?</span><b>Une question</b><span>Le titre pose la question de l'étape ; la ligne violette dit ce qu'on regarde.</span></li>
        <li><span class="rp-anat-vis b" aria-hidden="true"></span><b>En bref</b><span>La réponse en une ou deux phrases. Si tu n'as que deux minutes, lis seulement les « En bref ».</span></li>
        <li><span class="rp-anat-vis f" aria-hidden="true"></span><b>Les fils</b><span>Un thème, son niveau, ce qui ressort, et tes réponses repliées.</span></li>
        <li><span class="rp-anat-vis p" aria-hidden="true">+</span><b>Pour comprendre</b><span>Les études derrière l'étape, et le chapitre de la formation où on l'a vu.</span></li>
      </ol></section>
    ${LEGENDE_COULEURS}
    <section class="rp-sommaire2" aria-labelledby="rp-som-t"><h3 id="rp-som-t">Sommaire</h3>
      <ol class="rp-som-bloc">${sommaireLigne("synthese", "Synthèse", "Ton rapport en une page", "l'essentiel, en deux minutes")}${sommaireLigne("lire", "Avant de lire", "Comment lire ton rapport", "ce qu'il apporte, comment il est construit")}</ol>
      <p class="rp-som-titre">Pas à pas <span>${etapes.length} étapes</span></p>
      <ol class="rp-som-bloc">${etapes.map((e, i) => sommaireLigne(e.id, `Étape ${i + 1}`, esc(e.q), esc(e.approche), pastille(e.n, e.mot))).join("")}</ol>
      <p class="rp-som-titre">Ensuite</p>
      <ol class="rp-som-bloc">${sommaireLigne("ressources", "Plus loin", "Des ressources pour aller plus loin", "Papillon, Bonheur, Traité RDR")}${sommaireLigne("travail", "Outil", "La fiche travail", "sans aucune réponse de santé")}${sommaireLigne("carnet", "Outil", "Le carnet de suivi", "deux et quatre semaines")}${sommaireLigne("annexes", "Annexes", "Méthode, réponses, sources", "tout vérifier")}</ol>
    </section>
    <details class="rp-pc rp-methode"><summary><span class="k">Côté méthode</span>Ce qui est mesuré, ce qui ne l'est pas, et la qualité de tes réponses</summary><div>
      <p><b>Directement déclaré :</b> les réponses A à F (0 à 4), les appuis G, les récompenses R et les éléments de contexte.</p>
      <p><b>Recalculé :</b> sommes A–F (0 à 24), indices partiels d'efficacité et de sens, effort, récompense et surengagement construits à partir de questions réutilisées, indice satirique du bullshitomètre.</p>
      <p><b>Non mesuré :</b> une réserve d'énergie, une probabilité individuelle de burn-out, l'effet protecteur de l'humour, une relation causale entre les colonnes. Un score élevé n'est pas une urgence médicale à lui seul.</p>
      <p><b>Quatre angles, pas quatre preuves.</b> Les quatre approches relisent en partie les mêmes réponses (cinq questions sont communes aux deux pesées). Aucune ne dit, seule, ce qui cause quoi.</p>
      ${qualiteLecture}${lectureTemps}
      <p>Le détail du calcul, le tableau des six dimensions et toutes tes réponses sont en annexe.</p></div></details>
    <div class="rp-syn-suite"><p><b>Prêt·e ?</b> Première étape : ta fatigue, et ce que le repos répare encore.</p><button type="button" class="button primary" data-aller="${etapes[0].id}">Commencer : étape 1 →</button></div>`;

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
      <li><b>Les questions.</b> 36 questions notées de 0 (jamais ou presque) à 4 (presque toujours), sur les quatre dernières semaines, en six parties de six (A à F). Puis, hors score : 6 questions sur ce que tu donnes et ce qui revient (R, modèle de Siegrist), 6 questions sur ton travail au quotidien (RPS : repos, émotions cachées, changements imposés, décisions, agressivité ou détresse d’autrui, compétences inemployées), les 13 questions du bullshitomètre (satiriques, à choix, comptées dans la jauge du travail), 4 questions sur la façon dont tu as reçu cet humour et 2 sur ta façon de prendre l'absurde, 6 questions sur ce qui t'aide (G). Puis 4 questions de repérage temporel et de qualité empêchée (T), hors score. Enfin 8 questions de contexte et 3 questions d’alerte, en oui ou non.</li>
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

  // ───────── Pour aller plus loin (modèle psytest) : trois sites DD Lab, rangés selon tes réponses.
  const pSommeil = item("F2").riskScore, pTenir = item("F5").riskScore, pLiens = item("F3").riskScore;
  const SITES = [
    { id: "papillon", nom: "La méthode Papillon", url: "https://papillon.ddlab.fr", accroche: "Faire le point sur le sommeil, l'humeur, l'anxiété, l'attention",
      sert: "Bull-Out regarde le travail. Papillon regarde le reste : ce qui, dans ta tête et ton corps, peut brouiller la lecture ou s'ajouter à l'épuisement.",
      trouve: ["Un questionnaire inspiré de tests utilisés en clinique", "Un rapport du même genre que celui-ci, étape par étape", "Le sommeil, l'humeur, l'anxiété, l'attention et les consommations, lus ensemble"],
      score: pSommeil * 2 + nFatigue + (sr.A.score >= 13 ? 2 : 0),
      pourToi: pSommeil >= 3 ? `ton sommeil est perturbé ${freq("F2")}. Papillon regarde ce qui l'abîme, et ce qui se joue à côté du travail.` : nFatigue >= 2 ? "ta fatigue est marquée. Papillon aide à voir si d'autres choses que le travail s'y ajoutent." : "" },
    { id: "bonheur", nom: "Bonheur", url: "https://bonheur.ddlab.fr", accroche: "Prendre du recul : ce qui rend vraiment heureux",
      sert: "Ce rapport regarde ce qui use. Bonheur regarde l'autre moitié : ce qui fait qu'une vie va bien, en dehors du travail aussi.",
      trouve: ["Ce que des centaines de chercheurs, et des philosophes d'Aristote aux stoïciens, ont montré", "Un questionnaire pour repérer les domaines de ta vie « en rouge »", "Un plan d'action pour les 7 prochains jours"],
      score: pLiens * 2 + (forts.length <= 1 ? 3 : 0) + nv24(relatif24(perteSens, 8)),
      pourToi: pLiens >= 3 ? `tes loisirs et tes liens se réduisent (réponse : ${freq("F3")}). Bonheur aide à remettre ce qui recharge au bon endroit dans la semaine.` : forts.length <= 1 ? "peu d'appuis ressortent de tes réponses. Bonheur aide à repérer ce qui en redonne." : "" },
    { id: "traite", nom: "Traité RDR", url: "https://traiterdr.ddlab.fr", accroche: "Comprendre le cerveau, les substances et les médicaments",
      sert: "Pour comprendre ce que fait un produit ou un médicament à ton cerveau, à ton sommeil et à ta fatigue, et comment réduire les risques.",
      trouve: ["Écrit avec des médecins et des associations", "La psychologie, la pharmacologie et les neurosciences, en détail", "Utile aussi pour comprendre un traitement qu'on te propose"],
      score: pTenir * 3,
      pourToi: pTenir >= 3 ? `tu déclares ${freq("F5")} des consommations pour tenir ou dormir. Le traité explique ce qu'elles font, et comment réduire les risques sans arrêter seul·e d'un coup.` : "" }
  ].sort((a, b) => b.score - a.score);
  const plusLoin = `<header class="rp-etape-head"><p class="rp-n">Pour aller plus loin</p><h2 tabindex="-1">Des ressources pour agir</h2>
      <p class="rp-sq">Trois sites gratuits, rangés selon tes réponses : celui qui te concerne le plus est en premier.</p>
      <p class="rp-intro">Ils sont faits avec la même démarche que Bull-Out : partir des études, dire ce qui est solide et ce qui ne l'est pas, et ne rien envoyer de tes réponses.</p></header>
    <div class="rp-sites">${SITES.map((x, k) => `<article class="rp-site ${x.id}"><p class="k">${k === 0 && x.pourToi ? "Le plus utile pour toi" : esc(new URL(x.url).host)}</p>
      <h3>${esc(x.nom)}</h3><p class="rp-site-acc">${esc(x.accroche)}</p><p>${esc(x.sert)}</p>
      ${x.pourToi ? `<p class="rp-site-toi"><b>Pour toi :</b> ${esc(x.pourToi)}</p>` : ""}
      <p class="k">Ce que tu peux y faire</p>${ul(x.trouve.map(esc))}
      <a class="rp-site-lien" href="${x.url}" target="_blank" rel="noopener">${esc(new URL(x.url).host)} →</a></article>`).join("")}</div>
    <section class="rp-apres"><h3 class="rp-h">Et après ?</h3><p>Le rapport n'est pas une fin. Voici ce que tu peux en faire :</p><ol>
      <li><b>Relis l'essentiel</b> (la synthèse et les « En bref ») et choisis <b>une seule</b> action du plan, pas douze.</li>
      <li><b>Tiens les deux rituels</b> pendant quatre semaines : vendredi soir, lundi matin, dix minutes.</li>
      <li><b>Garde une trace</b> des faits de travail et de tes demandes, avec le brouillon de l'étape 9.</li>
      <li><b>Parles-en</b> : la fiche travail pour ton manager, le rapport complet pour un médecin, si tu le souhaites.</li>
      <li><b>Refais le questionnaire</b> dans deux à quatre semaines : c'est la trajectoire qui compte.</li></ol>
      <p class="rp-urgences"><b>Toujours valable :</b> idées suicidaires, <a href="tel:3114">3114</a> (gratuit, 24 h/24). Danger immédiat : <a href="tel:15">15</a> ou <a href="tel:112">112</a>.</p></section>`;

  // ───────── Pages : synthèse, avant de lire, neuf étapes, puis les outils et les annexes.
  const N = etapes.length;
  const ARI = { fatigue: "Fatigue", signes: "Signes", balance: "Balance", retour: "Échange", absurde: "Absurde", rps: "Risques", autour: "Appuis", plan: "Plan", portes: "Portes" };
  // Le fil d'Ariane de chaque étape, à l'écran comme dans le PDF : neuf jalons, celui du jour en orange.
  const ariane = (i) => `<nav class="rp-ariane" aria-label="Où tu en es"><ol>${etapes.map((x, j) => `<li class="${j < i ? "fait" : j === i ? "ici" : ""}"${j === i ? ' aria-current="step"' : ""}><button type="button" data-aller="${x.id}"><span class="num">${j + 1}</span><span class="nom">${esc(ARI[x.id] || x.court)}</span>${x.n !== null && x.n !== undefined ? `<i style="background:${COUL[x.n]}"></i>` : ""}</button></li>`).join("")}</ol></nav>`;
  const pages = [
    { id: "synthese", court: "Synthèse", tete: "SYNTHÈSE", html: synthese },
    { id: "lire", court: "Avant de lire", tete: "AVANT DE LIRE", html: avantLire },
    ...etapes.map((e, i) => ({
      id: e.id, court: e.court, etape: i, n: e.n, tete: `ÉTAPE ${i + 1} SUR ${N} · ${e.q.toUpperCase()}`,
      html: `<header class="rp-etape-head">${ariane(i)}
        <p class="rp-n">${miniSchema(e.col)}<span>Étape ${i + 1} sur ${N}</span><span class="rp-approche">${esc(e.approche)}</span></p>
        <h2 tabindex="-1">${esc(e.q)}</h2><p class="rp-sq">${esc(SQ[e.id] || "")}</p><p class="rp-intro">${e.intro}</p></header>
        ${i > 0 ? `<aside class="rp-pont"><p class="k">Ce qu'on garde de l'étape ${i} · ${esc(etapes[i - 1].court)}</p><p>${etapes[i - 1].garder}</p></aside>` : ""}
        ${r.hasAlert ? `<p class="rp-securite-mini" role="note">Un signal de sécurité a été coché. Consulte le message de la synthèse ; le score ne détermine pas l’urgence.</p>` : ""}
        <div class="rp-bref"><p class="k">En bref ${pastille(e.n, e.mot)}</p><p>${e.bref}</p></div>
        <div class="rp-corps">${e.corps}</div>
        ${FILS[e.id] ? `<section class="rp-fils"><h3 class="rp-h">Les fils de cette étape</h3><p class="rp-legende">Chaque fil regroupe quelques questions sur un même thème. La barre donne son niveau en mots ; les réponses sont repliées.</p>${FILS[e.id].join("")}</section>` : e.reponses ? repliees("Les réponses derrière cette étape", e.reponses) : ""}
        ${e.comprendre}${i === N - 1 ? garder(e.garder, true) : ""}`
    })),
    { id: "ressources", court: "Pour aller plus loin", tete: "POUR ALLER PLUS LOIN", html: plusLoin },
    { id: "travail", court: "Fiche travail", annexe: true, tete: "OUTIL · FICHE TRAVAIL", html: ficheTravail },
    { id: "carnet", court: "Carnet de suivi", annexe: true, tete: "OUTIL · CARNET DE SUIVI", html: carnet },
    { id: "annexes", court: "Annexes", annexe: true, tete: "ANNEXES", html: `<header class="rp-etape-head"><p class="rp-n">Annexes</p><h2 tabindex="-1">Comment le rapport est construit, ce que tu as répondu, d'où viennent les questions</h2></header>
      <section class="rp-annexe" id="annexe-1">${definitions}
        <h4 class="rp-h">Les six dimensions, sur 24</h4>
        <table class="rp-table"><thead><tr><th scope="col">Dimension</th><th scope="col">Score</th><th scope="col">Lecture</th><th scope="col" class="rp-col-barre">Sur 24</th></tr></thead><tbody>
        ${sections.map((s) => { const d = sr[s.id]; return `<tr><th scope="row"><span class="rp-id">${s.id}</span> ${NOMS[s.id]}<small>${s.type === "symptoms" ? "signe d'usure" : s.type === "work" ? "travail" : "récupération"}</small></th><td>${d.score}</td><td>${tag(d)}</td><td class="rp-col-barre"><span class="rp-barre"><i style="width:${d.percent}%;background:${COUL[niv(d).n]}"></i>${[25, 50, 75].map((p) => `<b style="left:${p}%"></b>`).join("")}</span></td></tr>`; }).join("")}
        </tbody></table>
        <p class="rp-legende">Le total brut A–F mélange des manifestations (A, B, C, F) et des conditions de travail (D, E) : il ne sert pas de diagnostic. Lecture d'ensemble : ${esc(r.profile.title.toLowerCase())}.</p>
        ${r.topItems.length ? `<h4 class="rp-h">Les réponses les plus hautes</h4><ol class="rp-top">${r.topItems.map((a) => `<li><p><b>${esc(cap(a.humanLabel))}</b> <span class="rp-id">${a.id}</span> ${jauge(a.riskScore)}</p><p class="rp-q">${esc(a.question)}</p><p><b>Piste :</b> ${esc(a.action)}</p></li>`).join("")}</ol>` : ""}
      </section><section class="rp-annexe" id="annexe-2">${annexeReponses}</section><section class="rp-annexe" id="annexe-3">${annexeSources}</section>` }
  ];

  const nav = (i) => {
    const prev = pages[i - 1], next = pages[i + 1];
    const lib = (p) => (p.etape !== undefined ? `Étape ${p.etape + 1} · ${p.court}` : p.court);
    return `<nav class="rp-pager" aria-label="Pages du rapport">${prev ? `<button type="button" class="button secondary" data-aller="${prev.id}">← ${esc(lib(prev))}</button>` : "<span></span>"}${next ? `<button type="button" class="button primary" data-aller="${next.id}">${esc(lib(next))} →</button>` : `<a class="button primary" href="agir.html">Explorer les leviers d'action</a>`}</nav>`;
  };
  // Le fil d'Ariane (modèle psytest) : à gauche sur grand écran, replié en haut sur petit écran.
  const filItems = `<ol class="rp-fil">${pages.filter((p) => !p.annexe).map((p) => `<li data-fil="${p.id}"><button type="button" data-aller="${p.id}"><span class="num">${p.etape !== undefined ? p.etape + 1 : ""}</span><span>${esc(p.court)}</span>${p.n !== undefined && p.n !== null ? `<i style="background:${COUL[p.n]}" aria-hidden="true"></i>` : ""}</button></li>`).join("")}</ol>
    <p class="rp-fil-titre">Outils et annexes</p><ol class="rp-fil">${pages.filter((p) => p.annexe).map((p) => `<li data-fil="${p.id}"><button type="button" data-aller="${p.id}"><span class="num"></span><span>${esc(p.court)}</span></button></li>`).join("")}</ol>`;

  // Page de garde et quatrième de couverture du PDF, pleine page (modèle psytest) : invisibles à l'écran.
  const couv = `<section class="rp-couv" aria-hidden="true">
      <p class="rp-pill">Rapport · Bull-Out</p>
      <h1 class="rp-couv-titre">Ton rapport<br>Bull-Out<br><span>Point d'étape</span></h1>
      <p class="rp-couv-date">${esc(date)} · tes quatre dernières semaines</p>
      <div class="rp-couv-schema">${schemaDouble({ d: dSchema, classe: "rp-ensemble rp-couv-svg", jauges: false, titre: "Le schéma de tes réponses" })}</div>
      <p class="rp-couv-desc">Ce que tes réponses disent de ta fatigue, de ce que ton travail te demande et te rend, de ce qui t'aide, et par où commencer. Questions inspirées d'outils reconnus (Maslach, JD-R, Siegrist, Gollac et INRS).</p>
      <p class="rp-couv-pied"><span>bullout.ddlab.fr</span><span>Prévention burn-out sans bullshit</span><span>Version ${esc(VERSION)}</span></p>
    </section>`;
  const dos = `<section class="rp-dos" aria-hidden="true">
      <div class="rp-dos-logo" aria-hidden="true">BO</div>
      <p class="rp-dos-nom">Bull-Out</p>
      <p class="rp-dos-slogan">Prévention burn-out sans bullshit</p>
      <p class="rp-dos-url">bullout.ddlab.fr</p>
      <p class="rp-dos-urg">Idées suicidaires : <b>3114</b>, gratuit, 24 h/24 · Danger immédiat : <b>15</b> ou <b>112</b></p>
      <p class="rp-dos-res">Pour aller plus loin : <b>papillon.ddlab.fr</b> · <b>bonheur.ddlab.fr</b> · <b>traiterdr.ddlab.fr</b></p>
      <p class="rp-dos-mini">Un projet DD Lab, développé avec deux psys, et en discussion avec un juge aux prud'hommes. Version du questionnaire et du calcul : ${esc(VERSION)}. Rien de ce rapport n'est enregistré ailleurs que sur ton appareil.</p>
    </section>`;

  return `${couv}<header class="rapport-cover">
      <p class="rp-pill">Rapport · ${esc(date)}</p>
      <h1 id="rapport-titre" tabindex="-1">Ton rapport Bull-Out <span class="rp-accent">Point d'étape</span></h1>
      <p class="rp-slogan">Prévention burn-out sans bullshit</p>
      <p id="rapport-date">Établi le ${date}, sur tes quatre dernières semaines. Une synthèse en une page, puis neuf étapes dans l'ordre de la formation, et des ressources pour aller plus loin.</p>
      <div class="parcours-tools rp-outils">
        <button class="button anis" type="button" id="imprimer">Enregistrer en PDF</button>
        <button class="button secondary" type="button" id="copy-results">Copier le résumé personnel</button>
        <a href="dossier.html" target="_blank" rel="noopener">Le dossier stagiaire (PDF à emporter)</a>
        <a href="#questionnaire">Revoir mes réponses</a>
      </div>
      <details class="rp-pdf-options"><summary>Ce que contient le PDF : <span class="rp-pdf-choix">complet</span></summary>
        <fieldset class="rp-pdf"><legend class="sr-only">Ce que contient le PDF</legend>
          <label><input type="radio" name="rp-pdf" value="complet" checked> <b>Complet</b> : synthèse, neuf étapes, ressources, outils et annexes</label>
          <label><input type="radio" name="rp-pdf" value="court"> <b>Essentiel</b> : synthèse, plan et interlocuteurs</label>
          <label><input type="radio" name="rp-pdf" value="travail"> <b>Fiche travail</b> : contraintes et demandes, sans réponses médicales</label>
          <label><input type="checkbox" name="rp-reponses"> Inclure mes réponses détaillées (rapport complet uniquement)</label>
        </fieldset></details>
      <p class="rp-prive">Rien ne quitte ton navigateur automatiquement. <b>Le résumé copié et les PDF complet et essentiel contiennent des informations personnelles.</b> Pour parler au travail sans communiquer tes réponses de santé, choisis « Fiche travail ». Dans la fenêtre d'impression, sélectionne « Enregistrer au format PDF ».</p>
    </header>
    <div class="rp-layout" data-date="${esc(date)}">
      <aside class="rp-rail" aria-label="Le parcours du rapport"><p class="rp-fil-titre">Le parcours</p>${filItems}</aside>
      <div class="rp-main">
        <details class="rp-fil-menu"><summary><span class="k">Le parcours</span><span class="rp-fil-ici"></span></summary>${filItems}</details>
        ${pages.map((p, i) => `<section class="rp-page${p.etape !== undefined ? " rp-etape" : ""}" id="rapport-${p.id}" data-page="${p.id}" data-tete="${esc(p.tete)}" aria-label="${esc(p.court)}">${p.html}${nav(i)}</section>`).join("")}
      </div>
    </div>
    ${dos}<footer class="rp-fin"><p><b>Bull-Out</b> · Prévention burn-out sans bullshit · bullout.ddlab.fr</p><p>Développé avec deux psys, et en discussion avec un juge aux prud'hommes. Version du questionnaire et du calcul : ${VERSION}.</p></footer>`;
}

// ───────── Affichage : une page à la fois à l'écran, tout le rapport à l'impression
const racine = document.querySelector("#results");
let courante = "synthese";

function montrer(id, focus = true) {
  const pages = [...racine.querySelectorAll(".rp-page")];
  if (!pages.some((p) => p.dataset.page === id)) id = "synthese";
  courante = id;
  pages.forEach((p) => { p.hidden = p.dataset.page !== id; });
  const ordre = pages.map((p) => p.dataset.page), ici = ordre.indexOf(id);
  racine.querySelectorAll(".rp-fil li[data-fil]").forEach((li) => {
    const j = ordre.indexOf(li.dataset.fil);
    li.className = j < ici ? "past" : j === ici ? "here" : "";
    const b = li.querySelector("button");
    if (j === ici) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
  });
  const page = racine.querySelector(`.rp-page[data-page="${id}"]`);
  const ici2 = racine.querySelector(".rp-fil-ici");
  if (ici2 && page) ici2.textContent = page.getAttribute("aria-label");
  const menu = racine.querySelector(".rp-fil-menu");
  if (menu) menu.open = false;
  if (focus) {
    racine.querySelector(".rp-layout").scrollIntoView({ block: "start" });
    page.querySelector("h2")?.focus({ preventScroll: true });
  }
}

// PDF : chaque page du rapport reçoit sa page nommée (@page), avec en haut « ÉTAPE 3 SUR 9 · LA QUESTION » et la date.
const cssStr = (t) => `"${String(t).replace(/["\\]/g, "\\$&").replace(/\n/g, " ")}"`;
function enTetesPDF() {
  const date = racine.querySelector(".rp-layout")?.dataset.date || "";
  let css = `@page { @top-right { content: ${cssStr(`Rapport du ${date}`)}; } }\n`;
  racine.querySelectorAll(".rp-page").forEach((p) => {
    css += `@page p-${p.dataset.page} { @top-left { content: ${cssStr(p.dataset.tete)}; } }\n#rapport-${p.dataset.page} { page: p-${p.dataset.page}; }\n`;
  });
  let st = document.getElementById("rp-entetes");
  if (!st) { st = Object.assign(document.createElement("style"), { id: "rp-entetes", media: "print" }); document.head.append(st); }
  st.textContent = css;
}

function optionsPDF() {
  const mode = racine.querySelector('[name="rp-pdf"]:checked')?.value || "complet";
  racine.classList.toggle("pdf-court", mode === "court");
  racine.classList.toggle("pdf-travail", mode === "travail");
  racine.classList.toggle("pdf-sans-reponses", !racine.querySelector('[name="rp-reponses"]')?.checked);
  const choix = racine.querySelector(".rp-pdf-choix");
  if (choix) choix.textContent = { complet: "complet", court: "essentiel", travail: "fiche travail" }[mode];
}

document.addEventListener("bullout:rapport", (event) => {
  racine.innerHTML = composer(event.detail);
  montrer("synthese", false);
  optionsPDF();
  enTetesPDF();
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

// À l'impression : toutes les pages ; en PDF complet, les encadrés « Pour comprendre » dépliés,
// et les réponses de chaque étape seulement si la case « réponses détaillées » est cochée.
window.addEventListener("beforeprint", () => {
  if (!racine.querySelector(".rp-page")) return;
  enTetesPDF();
  racine.querySelectorAll(".rp-page").forEach((p) => { p.hidden = false; });
  if (racine.classList.contains("pdf-court")) return;
  const avecReponses = !racine.classList.contains("pdf-sans-reponses");
  racine.querySelectorAll(".rp-page details:not([open])").forEach((d) => {
    if (d.classList.contains("rp-rep") && !avecReponses) return;
    d.open = true; d.dataset.auto = "1";
  });
});
window.addEventListener("afterprint", () => {
  racine.querySelectorAll("details[data-auto]").forEach((d) => { d.open = false; delete d.dataset.auto; });
  if (racine.querySelector(".rp-page")) montrer(courante, false);
});
