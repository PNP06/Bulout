// Rapport Bull-Out : composé à partir des réponses calculées par script.js (événement « bullout:rapport »).
// Structure reprise de Papillon (psytest) : une synthèse, puis une étape par pièce vue dans la formation
// (les 8 pièces annoncées par les chapitres), puis des annexes qui montrent le calcul, les réponses et les sources.
// Rien n'est envoyé : tout est calculé et affiché dans cet onglet.
import { chapitres } from "./formation-contenu.js";

const VERSION = "2026.11";
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
const COUL = [C.mid, "#b45a12", C.orange, C.rouge];
const niv = (d) => NIV[d.level.label];
const tag = (d) => `<span class="rp-niv n${niv(d).n}">${niv(d).mot}</span>`;
const NOMS = { A: "Épuisement", B: "Distance mentale", C: "Efficacité et sens", D: "Exigences du travail", E: "Manque de ressources", F: "Récupération et santé" };
const chapLien = (n) => `<a href="test.html#chapitre-${n}" target="_blank" rel="noopener">chapitre ${n} · ${esc(chapitres[n - 1].court)}</a>`;

// ───────── Appuis : ce qui tient encore, ressources présentes, points forts personnels (partie G)
const TIENT = {
  A1: "il te reste de l'énergie pour ta vie personnelle", A2: "un repos court te fait encore récupérer", A3: "tu commences tes journées sans saturation",
  A4: "les tâches ordinaires ne te coûtent pas d'effort démesuré", A5: "tu restes calme face aux sollicitations habituelles", A6: "ton attention et ta mémoire tiennent",
  B1: "tu restes engagé·e dans ton travail", B2: "tu crois à l'utilité de ce que tu fais", B3: "tu ne fuis pas les échanges au travail",
  B4: "ta patience envers les autres est intacte", B5: "tu gardes des relations au-delà du minimum", B6: "tu n'as pas besoin de penser à partir pour tenir",
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
function batterie(A, F) {
  const reste = Math.max(0, Math.round(100 - ((A + F) / 48) * 100));
  const w = Math.round((reste / 100) * 196);
  const coul = reste >= 60 ? C.mid : reste >= 35 ? "#b45a12" : C.orange;
  return `<svg class="rp-art" viewBox="0 0 320 120" role="img" aria-label="Batterie : environ ${reste} % de charge, d'après tes réponses Épuisement et Récupération">
    <rect x="40" y="22" width="210" height="76" rx="14" fill="${C.card}" stroke="${C.sapin}" stroke-width="4"/>
    <rect x="250" y="44" width="14" height="32" rx="4" fill="${C.sapin}"/>
    <rect x="47" y="29" width="${w}" height="62" rx="9" fill="${coul}"/>
    ${[1, 2, 3].map((k) => `<line x1="${47 + k * 49}" y1="29" x2="${47 + k * 49}" y2="91" stroke="${C.card}" stroke-width="3"/>`).join("")}
    <text x="145" y="114" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="13" fill="${C.sapin}">≈ ${reste} % de charge</text>
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
      <text x="${x + 20}" y="${H + 40}" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="12" fill="${C.sapin}">${["Épuisement", "Distance", "Efficacité"][i]}</text>
      <text x="${x + 20}" y="14" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="${C.sapin}">${d.score}/24</text>`;
  }).join("");
  return `<svg class="rp-art" viewBox="0 0 320 170" role="img" aria-label="Trois jauges : épuisement ${sr.A.score}, distance ${sr.B.score}, efficacité ${sr.C.score} sur 24">${cols}</svg>`;
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

function composer({ result: r, sections, strengthPart, ratingLabels }) {
  const sr = r.sectionResults;
  const sec = Object.fromEntries(sections.map((s) => [s.id, s]));
  const L = lisibilite(r, ratingLabels);
  const ressources = 24 - sr.E.score; // E est compté à l'envers : ressources présentes = 24 - score de manque
  const ctxOui = r.contextAnswers.filter((a) => a.yes);
  const item = (id) => r.answers.find((a) => a.id === id);
  const haut = (id) => item(id).riskScore >= 3;
  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date());

  // ───────── Sécurité
  const securite = r.hasAlert ? `<div class="rp-securite" role="alert"><p><b>Une de tes réponses demande de l'aide rapidement.</b> Ce n'est pas un diagnostic, mais il ne faut pas rester seul·e avec.</p>
    <p>Idées suicidaires : <a href="tel:3114"><b>3114</b></a>, gratuit, 24 h/24. Danger immédiat : <a href="tel:15"><b>15</b></a> ou <a href="tel:112"><b>112</b></a>. Sinon, prends rendez-vous cette semaine avec ton médecin traitant ou le médecin du travail.</p></div>` : "";

  // ───────── Lectures courtes, réutilisées dans la synthèse et les étapes
  const coeur = ["A", "B", "C"].map((id) => sr[id]);
  const coeurHauts = coeur.filter((d) => d.score >= 13);
  const lectureUsure = coeurHauts.length === 3 ? "Les trois jauges sont hautes en même temps : l'usure ne se résume pas à la fatigue."
    : coeurHauts.length ? `${cap(liste(coeurHauts.map((d) => NOMS[d.id].toLowerCase())))} ${coeurHauts.length > 1 ? "ressortent" : "ressort"} nettement ; ${coeurHauts.length === 1 ? "les deux autres jauges" : "la troisième"} moins.`
      : coeur.some((d) => d.score >= 7) ? "Aucune jauge n'est haute, mais au moins une est à surveiller." : "Les trois jauges restent basses.";
  const penche = sr.D.score - ressources;
  const lectureBalance = penche >= 4 ? `Les exigences (${sr.D.score}/24) pèsent plus lourd que les ressources (${ressources}/24).`
    : penche <= -4 ? `Les ressources (${ressources}/24) compensent les exigences (${sr.D.score}/24).`
      : `Exigences (${sr.D.score}/24) et ressources (${ressources}/24) s'équilibrent à peu près.`;
  const effortIds = ["D1", "D4", "D6"], retourIds = ["E5", "E6"];
  const effort = Math.round(effortIds.reduce((s, id) => s + item(id).riskScore, 0) / effortIds.length * 6);
  const retour = Math.round(retourIds.reduce((s, id) => s + item(id).rawScore, 0) / retourIds.length * 6);
  const lectureRetour = effort - retour >= 6 ? "Tu donnes beaucoup et tu reçois peu en retour : le déséquilibre effort-reconnaissance est net."
    : effort - retour >= 2 ? "L'effort dépasse un peu ce que tu reçois en retour." : "Ce que tu reçois en retour reste à la hauteur de l'effort déclaré.";
  const reste = Math.max(0, Math.round(100 - ((sr.A.score + sr.F.score) / 48) * 100));
  const lectureBatterie = sr.A.score >= 13 && sr.F.score >= 13 ? "Le travail prend beaucoup, et le repos ne rend plus assez : c'est le signe central de l'usure."
    : sr.A.score >= 13 ? "Le travail prend beaucoup d'énergie ; la récupération tient encore, mais elle est sollicitée."
      : sr.F.score >= 13 ? "L'énergie au travail tient, mais la récupération se dégrade : sommeil, rumination ou corps envoient des signaux."
        : sr.A.score >= 7 || sr.F.score >= 7 ? "La batterie se vide plus vite qu'avant, sans être à plat." : "La batterie se recharge encore correctement.";

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
    garder: "Garde ces appuis en tête : le plan (pièce 7) s'en sert. On reprend maintenant les pièces une à une, dans l'ordre de la formation."
  };

  // ───────── Les 8 étapes (une par pièce de la formation)
  const pieces = chapitres.map((c) => c.piece.nom);
  const etapes = [
    {
      id: "batterie", chap: 1, titre: "La batterie", q: "Le repos te rend-il ce que le travail te prend ?",
      intro: "Une fatigue se répare avec du repos. L'usure, non : la batterie ne remonte plus, même après le week-end. On regarde ici l'épuisement (A) et la récupération (F).",
      bref: `${lectureBatterie} Épuisement : ${niv(sr.A).mot} (${sr.A.score}/24). Récupération et santé : ${niv(sr.F).mot} (${sr.F.score}/24).`,
      corps: `<div class="rp-duo"><div>${batterie(sr.A.score, sr.F.score)}<p class="rp-legende">Image de tes réponses A et F, pas une mesure physiologique. Plus les deux scores montent, plus la charge baisse.</p></div>
        <div>${carte(`Épuisement ${tag(sr.A)}`, `<p>${esc(sr.A.comment)}</p>`)}${carte(`Récupération et santé ${tag(sr.F)}`, `<p>${esc(sr.F.comment)}</p>`)}
        ${haut("A2") ? `<p class="rp-cle"><b>Question clé :</b> tu réponds que même un repos court ne te fait plus récupérer (A2). C'est « le test des vacances » du chapitre 1 : ce qui ne remonte pas avec le repos ne relève plus de la simple fatigue.</p>` : ""}</div></div>
        <h4 class="rp-h">Tes réponses</h4>${reponses(sr.A, sec.A, ratingLabels, r)}${reponses(sr.F, sec.F, ratingLabels, r)}
        ${haut("F5") || haut("F6") ? `<p class="rp-cle"><b>À ne pas laisser de côté :</b> ${[haut("F5") ? "des stratégies pour tenir ou dormir (F5)" : "", haut("F6") ? "des erreurs ou quasi-accidents liés à la fatigue (F6)" : ""].filter(Boolean).join(" et ")}. Ce sont des signaux de sécurité : parles-en à un médecin.</p>` : ""}`,
      comprendre: pourComprendre("Fatigue, stress ou usure", `<p>Le stress est une réaction d'adaptation à une exigence. La fatigue se répare avec le repos. Le burn-out est décrit par l'OMS (CIM-11, 2019) comme un <b>phénomène lié au travail</b>, résultant d'un stress chronique au travail qui n'a pas été géré avec succès. Ce n'est pas une maladie dans la classification, et aucun test sanguin ou hormonal ne le mesure chez une personne.</p><p>La question des vacances est donc la plus parlante : si l'énergie revient puis repart en quelques jours de reprise, c'est le travail qui la consomme, pas un manque de repos.</p>`, chapLien(1)),
      garder: `${lectureBatterie} On regarde maintenant si l'usure touche aussi ta relation au travail et ta confiance.`
    },
    {
      id: "jauges", chap: 2, titre: "Les trois jauges", q: "L'usure touche-t-elle seulement ton énergie, ou aussi ta relation au travail et ta confiance ?",
      intro: "Le modèle de Christina Maslach décrit le burn-out par trois signes qui peuvent monter séparément : s'épuiser (A), se détacher (B), douter de son efficacité ou du sens (C).",
      bref: `${lectureUsure} Épuisement ${niv(sr.A).mot}, distance ${niv(sr.B).mot}, efficacité et sens ${niv(sr.C).mot}.`,
      corps: `<div class="rp-duo"><div>${jauges(sr)}<p class="rp-legende">Les pointillés marquent les seuils de lecture (6, 12 et 18 sur 24).</p></div>
        <div>${r.modelReadings[0].lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        ${sr.B.score >= 7 ? `<p class="rp-cle"><b>La distance n'est pas un défaut d'attitude.</b> Se détacher protège d'abord : c'est souvent une réponse à ce qui coûte trop (absurdité, conflit, surcharge relationnelle).</p>` : ""}</div></div>
        <h4 class="rp-h">Distance mentale ${tag(sr.B)}</h4>${reponses(sr.B, sec.B, ratingLabels, r)}
        <h4 class="rp-h">Efficacité et sens ${tag(sr.C)}</h4>${reponses(sr.C, sec.C, ratingLabels, r)}`,
      comprendre: pourComprendre("D'où viennent les trois jauges", `<p>Maslach et Jackson ont construit en 1981 le Maslach Burnout Inventory autour de trois dimensions : épuisement émotionnel, dépersonnalisation (devenue « cynisme »), accomplissement personnel réduit. Schaufeli et ses collègues ont proposé en 2020 le Burnout Assessment Tool, qui garde l'épuisement et la distance mentale et ajoute les altérations cognitives (attention, mémoire : A6) et émotionnelles (irritabilité : A5).</p><p>Les questions de Bull-Out reprennent ces dimensions avec des formulations nouvelles. Elles n'ont pas les propriétés mesurées de ces outils : on lit des tendances, pas un score normé.</p>`, chapLien(2)),
      garder: "Les jauges disent ce que tu ressens. La suite cherche d'où cela vient : ce que le travail te demande, et ce qui t'aide à le faire."
    },
    {
      id: "balance", chap: 3, titre: "La balance", q: "Ce que le travail te demande est-il compensé par ce qui t'aide à le faire ?",
      intro: "Le modèle Exigences-Ressources (JD-R, Demerouti et Bakker, 2001) pose les exigences du travail (D) sur un plateau et les ressources (E) sur l'autre. L'usure vient d'un déséquilibre durable, pas d'une exigence isolée.",
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
      intro: "Le modèle de Johannes Siegrist (ERI, 1996) regarde l'équilibre entre l'effort fourni et ce qui revient : reconnaissance, équité, perspectives. Il ajoute le surinvestissement, la difficulté à décrocher du travail.",
      bref: `${lectureRetour}${haut("F1") ? " Tu rumines souvent le travail hors des heures : signe possible de surinvestissement." : ""}`,
      corps: `<div class="rp-duo"><div>${balance(effort, retour, 24, "Effort", "Retour", `Bascule : effort ${effort}, retour ${retour} sur 24`)}<p class="rp-legende">Effort : moyenne de D1, D4 et D6. Retour : moyenne de E5 et E6 (reconnaissance, équité). Ramenés sur 24 pour être comparables.</p></div>
        <div>${r.modelReadings[2].lines.map((l) => `<p>${esc(l)}</p>`).join("")}</div></div>
        <h4 class="rp-h">Les questions utilisées ici</h4><ol class="rp-items">${["D1", "D4", "D6", "E5", "E6", "F1"].map((id) => { const a = item(id); return `<li class="${a.riskScore >= 3 ? "haut" : ""}"><span class="rp-id">${id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.riskScore)}<span>${esc(ratingLabels[a.rawScore].replace(/^\d+\s*-\s*/, ""))}${id.startsWith("E") ? " <small>(compté à l'envers)</small>" : ""}</span></span></li>`; }).join("")}</ol>`,
      comprendre: pourComprendre("Effort, récompense, surinvestissement", `<p>Dans le modèle ERI, le risque pour la santé monte quand un effort élevé rencontre une récompense faible (salaire, estime, sécurité de l'emploi, perspectives). Le surinvestissement, le fait de ne pas arriver à décrocher, amplifie le risque. Le questionnaire de Siegrist compte plus de vingt questions ; Bull-Out n'en garde que six repères : c'est une piste de lecture, pas le calcul du ratio d'origine.</p>`, chapLien(4)),
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
        ${carte("Le total, pour comparer dans le temps", `<p><b>${r.totalScore}/144</b> (${r.hasAlert ? "alerte" : esc(r.totalLevel.label)}). Il additionne des signes (A, B, C, F) et des causes (D, E) : utile pour voir si la situation bouge entre deux passages, pas pour te situer.</p>`)}</div>
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
        <div class="rp-trajet"><p><b>Si le total baisse :</b> ce qui a été fait aide, garde-le.</p><p><b>S'il reste haut :</b> passe de l'adaptation individuelle à une action sur la charge, les ressources ou l'organisation.</p><p><b>S'il monte :</b> réduis l'exposition et demande de l'aide, c'est prioritaire.</p></div>`,
      comprendre: pourComprendre("Pourquoi commencer par le travail", `<p>Les recommandations de prévention (INRS) classent les actions : <b>primaire</b>, agir sur les causes (charge, organisation) ; <b>secondaire</b>, aider les personnes à faire face ; <b>tertiaire</b>, soigner et accompagner le retour. Les plus efficaces sur la durée sont primaires. Le chapitre 7 donne des phrases prêtes à l'emploi pour demander un arbitrage.</p>`, chapLien(7)),
      garder: "Un plan se tient mieux à plusieurs. Dernière pièce : à qui en parler."
    },
    {
      id: "portes", chap: 8, titre: "Les portes", q: "À qui en parler, et pour quoi faire ?",
      intro: "Chaque interlocuteur ouvre une porte différente : soin, santé au travail, arbitrage de la charge, appui collectif. Les informations médicales restent chez les soignants ; ton manager n'a pas à connaître tes scores.",
      bref: `Proposés d'après tes réponses : ${esc(liste(r.stakeholderRecommendations.map((x) => minus(x.stakeholder.name))))}.`,
      corps: `<div class="rp-portes">${r.stakeholderRecommendations.map((x) => carte(esc(x.stakeholder.name), `<p class="rp-pourquoi">${esc(x.why)}</p><p><b>Son rôle :</b> ${esc(x.stakeholder.shortRole)}</p><p class="rp-phrase">« ${esc(x.stakeholder.script)} »</p><a href="agir.html${x.stakeholder.anchor}">Fiche détaillée</a>`, x.key === "emergency" ? "urgence" : "")).join("")}</div>
        <p class="rp-urgences"><b>Toujours valable :</b> idées suicidaires, <a href="tel:3114">3114</a> (gratuit, 24 h/24). Danger immédiat : <a href="tel:15">15</a> ou <a href="tel:112">112</a>.</p>`,
      comprendre: pourComprendre("Ce que peut faire le médecin du travail", `<p>Le médecin du travail est tenu au secret médical vis-à-vis de l'employeur. Tu peux le voir à ta demande, sans passer par ton manager. Il peut proposer des aménagements de poste ou de temps de travail, et alerter sur des risques collectifs sans révéler ce que tu lui as dit.</p>`, chapLien(8)),
      garder: "Garde ce rapport et refais le questionnaire dans deux à quatre semaines : c'est la trajectoire qui compte."
    }
  ];

  // ───────── Synthèse
  const synCartes = [
    ["Tes réponses", L.fiable ? "Lisibles telles quelles" : "À lire avec prudence", `Sur les quatre dernières semaines.${L.paires.length ? ` ${L.paires.length} point${L.paires.length > 1 ? "s" : ""} à clarifier (annexe 1).` : ""}`, "annexes"],
    ["L'usure", coeurHauts.length ? liste(coeurHauts.map((d) => `${NOMS[d.id].toLowerCase()} (${niv(d).mot})`)) : "Pas de jauge haute", lectureUsure, "jauges"],
    ["Le travail", penche >= 4 ? "La balance penche du côté des exigences" : penche <= -4 ? "Les ressources compensent" : "Balance à peu près équilibrée", lectureBalance, "balance"],
    ["La récupération", `${cap(niv(sr.F).mot)} (${sr.F.score}/24)`, `Batterie à environ ${reste} %. ${esc(sr.F.comment)}`, "batterie"],
    ["Tes appuis", forts.length ? liste(forts.slice(0, 3).map((a) => APPUIS[a.id][0].toLowerCase())) : ressPresentes.length ? cap(liste(ressPresentes.slice(0, 2).map((id) => RESSOURCES[id][0].toLowerCase()))) : "À reconstruire", forts.length || ressPresentes.length ? "Ce sur quoi t'appuyer pour agir." : "Peu d'appuis nets : la page propose des premiers pas.", "appuis"]
  ];
  const synthese = `<header class="rp-syn-head"><p class="course-eyebrow">Synthèse</p><h2 tabindex="-1">Ce qui ressort de tes réponses</h2>
      <p>${esc(r.summary)}</p></header>${securite}
    <div class="rp-syn-cartes">${synCartes.map(([k, t, d, cible]) => `<button type="button" class="rp-syn-carte" data-aller="${cible}"><span class="k">${k}</span><span class="t">${esc(cap(t))}</span><span class="d">${d}</span></button>`).join("")}</div>
    ${ctxOui.length ? `<p class="rp-syn-ctx"><b>Contexte signalé :</b> ${esc(liste(ctxOui.map((a) => a.label.toLowerCase())))}. Cela ne change pas les scores, mais la lecture (pièce 5).</p>` : ""}
    <div class="rp-duo"><div class="rp-syn-bloc"><h3>Par quoi commencer</h3><ol>${r.actions.slice(0, 3).map((a) => `<li><b>${esc(a.title)}.</b> ${esc(a.text)}</li>`).join("")}</ol></div>
    <div class="rp-syn-bloc"><h3>Trois questions à emporter</h3><ul class="rp-q3">${questions.map(([k, q]) => `<li><span class="k">${k}</span>${esc(q)}</li>`).join("")}</ul></div></div>
    <div class="rp-syn-bloc rp-sommaire"><h3>Ton rapport, page par page</h3><p>D'abord tes appuis, puis les huit pièces de la formation, dans le même ordre.</p>
      <ol><li><button type="button" data-aller="appuis"><span class="n">★</span><span><b>Tes appuis</b><small>${esc(lectureAppuis)}</small></span></button></li>${etapes.map((e, i) => `<li><button type="button" data-aller="${e.id}"><span class="n">${i + 1}</span><span><b>${esc(pieces[i])}</b><small>${e.bref.replace(/<[^>]+>/g, "")}</small></span></button></li>`).join("")}</ol></div>`;

  // ───────── Annexes
  const definitions = `<h3>1. Comment ce rapport est construit</h3>
    <div class="rp-box ${L.fiable ? "ok" : "attention"}"><p class="k">État de tes réponses</p><p><b>${L.fiable ? "Lisibles telles quelles." : "À lire avec prudence."}</b> ${L.fiable ? "Toutes les questions ont une réponse, et elles sont variées." : `${cap(L.prudence.join(" ; "))}. C'est possible, mais cela rend les écarts entre dimensions moins parlants.`} Ces contrôles portent sur la forme des réponses ; ils ne mesurent pas leur sincérité.</p>
    ${L.paires.length ? `<p class="k">Points à clarifier</p><ul>${L.paires.map(([, , t, q]) => `<li>${esc(t)} <i>${esc(q)}</i></li>`).join("")}</ul><p>Ce ne sont pas des erreurs : deux réponses qui surprennent côte à côte sont souvent les plus utiles à discuter.</p>` : ""}</div>
    <ol class="rp-construit">
      <li><b>Les questions.</b> 36 questions notées de 0 (jamais ou presque) à 4 (presque toujours), sur les quatre dernières semaines, en six parties de six (A à F). Puis 6 questions sur ce qui t'aide (G, hors score), 7 questions de contexte et 3 questions d'alerte, en oui ou non.</li>
      <li><b>Le score d'une dimension.</b> La somme de ses six réponses, de 0 à 24. Les questions E décrivent des ressources : elles sont comptées à l'envers (4 moins la réponse) pour que, partout, un score haut signale une difficulté.</li>
      <li><b>Les niveaux.</b> 0 à 6 bas, 7 à 12 à surveiller, 13 à 18 élevé, 19 à 24 très élevé : quatre quarts de l'échelle, choisis pour la lecture, sans étalonnage.</li>
      <li><b>La lecture d'ensemble.</b> Alerte si une question d'alerte reçoit oui, si le total atteint 109 ou si une dimension atteint 22. Sinon : épuisement installé si A et F atteignent 13 ; désengagement si B atteint 13 avec C, D ou E ; tension si seul D atteint 13 ; protégé si toutes les dimensions restent à 6 ou moins ; vigilance mixte dans les autres cas.</li>
      <li><b>Les actions et les interlocuteurs.</b> Proposés par des règles explicites à partir des dimensions à 13 ou plus, des réponses à 3 ou 4 et du contexte. La sécurité passe toujours en premier.</li>
      <li><b>Le contexte et tes appuis.</b> Ne modifient aucun score. Le contexte change les interlocuteurs proposés et la lecture ; les appuis (G, ressources E présentes, réponses à 0 ou 1) forment la page « Tes appuis ».</li>
    </ol>
    <p><b>Ce qui n'est pas validé.</b> Les questions s'inspirent d'outils reconnus (annexe 3), mais elles ont été reformulées et assemblées : le questionnaire Bull-Out n'a pas fait l'objet d'une étude de fidélité, de validité ni d'étalonnage. La validation des outils sources ne s'étend pas à ce composite. Il ne pose pas de diagnostic et ne doit pas servir à évaluer une personne au travail.</p>`;

  const annexeReponses = `<h3>2. Tes réponses, question par question</h3><p class="rp-legende">La jauge montre la valeur comptée dans le score (après inversion pour E).</p>
    ${sections.map((s) => `<h4 class="rp-h">${esc(s.title.replace(/ - score inversé$/, ""))} · ${sr[s.id].score}/24 ${tag(sr[s.id])}</h4>${reponses(sr[s.id], s, ratingLabels, r)}`).join("")}
    <h4 class="rp-h">${esc(strengthPart.title)} · hors score</h4><ol class="rp-items">${g.map((a) => `<li class="${a.value >= 3 ? "fort" : ""}"><span class="rp-id">${a.id}</span><span class="rp-q">${esc(a.question)}</span><span class="rp-a">${jauge(a.value)}<span>${esc(ratingLabels[a.value].replace(/^\d+\s*-\s*/, ""))}</span></span></li>`).join("")}</ol>
    <h4 class="rp-h">Contexte</h4><ol class="rp-items">${r.contextAnswers.map((a, i) => `<li><span class="rp-id">X${i + 1}</span><span class="rp-q">${esc(a.text)}</span><span class="rp-a"><span>${a.yes ? "Oui" : "Non"}</span></span></li>`).join("")}</ol>
    <p class="rp-legende">Les réponses aux trois questions d'alerte ne sont pas reprises ici : seul le message de sécurité apparaît, en tête de rapport, si l'une a reçu oui.</p>`;

  const annexeSources = `<h3>3. Les modèles et questionnaires dont les questions s'inspirent</h3>
    <p>Chaque partie du questionnaire reprend des dimensions décrites par ces travaux. Les questions ont été réécrites en français simple ; aucune n'est une traduction d'un item protégé.</p>
    <table class="rp-table rp-sources"><thead><tr><th scope="col">Partie</th><th scope="col">Ce qu'elle explore</th><th scope="col">Inspirée de</th></tr></thead><tbody>
    ${sections.map((s) => `<tr><th scope="row"><span class="rp-id">${s.id}</span> ${NOMS[s.id]}</th><td>${esc(cap(s.explore))}</td><td>${esc(cap(s.sources))}.</td></tr>`).join("")}
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
      <li>Pejtersen, J. H., Kristensen, T. S., Borg, V., Bjorner, J. B. (2010). The second version of the Copenhagen Psychosocial Questionnaire. <i>Scandinavian Journal of Public Health</i>, 38(3 suppl), 8-24.</li>
      <li>Xanthopoulou, D., Bakker, A. B., Demerouti, E., Schaufeli, W. B. (2007). The role of personal resources in the job demands-resources model. <i>International Journal of Stress Management</i>, 14(2), 121-141.</li>
      <li>Lazarus, R. S., Folkman, S. (1984). <i>Stress, appraisal, and coping</i>. New York : Springer.</li>
      <li>Sonnentag, S., Fritz, C. (2007). The Recovery Experience Questionnaire. <i>Journal of Occupational Health Psychology</i>, 12(3), 204-221.</li>
    </ul><p>Pour le détail et les limites : <a href="methode.html">Méthode et limites</a>.</p>`;

  // ───────── Pages
  const pages = [
    { id: "synthese", court: "Synthèse", html: synthese },
    { id: "appuis", court: "Tes appuis", html: `<header class="rp-etape-head rp-appuis-head"><p class="rp-n">Avant les huit pièces</p>
        <h2 tabindex="-1">${pageAppuis.titre}</h2><p class="rp-question">${pageAppuis.q}</p><p class="rp-intro">${pageAppuis.intro}</p></header>
        ${bref(pageAppuis.bref)}<div class="rp-corps">${pageAppuis.corps}</div>${pageAppuis.comprendre}${garder(pageAppuis.garder)}` },
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
