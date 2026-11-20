import { illustrations, pieceRapport } from "./formation-illustrations.js";
import { chapitres, examen, introduction, synthese, temps } from "./formation-contenu.js";
import { dateLocale, dessiner, exporterPNG, lireDiplome } from "./diplome.js";

const $ = (s, root = document) => root.querySelector(s);
const formation = $("#espace-formation");
const porte = $("#porte-test");
const questionnaire = $("#questionnaire");
const rapport = $("#results");
const form = $("#burnout-form");
const vues = [formation, porte, questionnaire, rapport];
const format = "bull-out-progression-10";
const reponsesReformulees = new Set(["A2","B1","B2","C2","C6","D2","D5","E6","F2","F4","F5","F6","G6","R3","R6"]);
let acquis = new Set();
let bonnes = 0;
let dateDiplome = null;
let ouvert = false;
let page = "";
let prenom = "";
// Réponses justes de l’exercice du chapitre affiché (une par situation). Rien n’est noté ni gardé.
let justes = new Set();

const ancre = i => "#chapitre-" + (i + 1);
const prochaine = () => chapitres.findIndex((_, i) => !acquis.has(i));
const lettre = i => String.fromCharCode(65 + i);
const nombres = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];
const nb = n => nombres[n] ?? String(n);
const Nb = n => nb(n).charAt(0).toUpperCase() + nb(n).slice(1);
// Les trois phrases à retenir par cœur : répétées dans la synthèse et sur la page du diplôme.
const troisPhrases = `<div class="fo-trois"><p class="fo-label">À retenir par cœur</p><ol><li>On agit à gauche, sur le travail. On mesure à droite, sur la personne.</li><li>Face à une surcharge : retirer, reporter ou simplifier. Sinon, on remonte.</li><li>Prévenir, réagir aux alertes, et pouvoir le montrer.</li></ol></div>`;
const plusLoin = `<details class="fo-details fo-plusloin"><summary>Pour aller plus loin : comment ces modèles ont été construits</summary>${synthese.plusLoin}</details>`;
const minutes = chapitres.reduce((s, c) => s + c.duree, 0);
const nomsPieces = chapitres.map(c => c.piece.nom);
const choixFichier = label => `<label class="resume-file">${label}<input type="file" data-import accept=".json,.png,application/json,image/png"></label>`;
const statut = '<p class="file-status" role="status"></p>';
const garder = '<button class="btn-save" type="button" data-save><span aria-hidden="true">↓</span> Enregistrer ma progression</button>';
const bouton = (href, label, cls = "primary") => `<a class="button ${cls}" href="${href}">${label}</a>`;
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ───────── Rail de gauche : sommaire de la formation
function rail(actif) {
  const item = (href, num, texte, fait) => `<li class="${href === actif ? "ici" : ""} ${fait ? "fait" : ""}"><a href="${href}" ${href === actif ? 'aria-current="step"' : ""}><span class="fo-num">${fait ? "✓" : num}</span><span>${texte}${fait ? '<span class="sr-only"> (validé)</span>' : ""}</span></a></li>`;
  let html = `<li class="${actif === "#formation" ? "ici" : ""}"><a href="#formation" ${actif === "#formation" ? 'aria-current="step"' : ""}><span class="fo-num">·</span><span>Introduction</span></a></li>`;
  temps.forEach((tp, k) => {
    html += `<li class="fo-rail-temps" aria-hidden="true">${tp.split("·")[1].trim()}</li>`;
    chapitres.forEach((c, i) => { if (c.temps === k) html += item(ancre(i), String(i + 1).padStart(2, "0"), c.court, acquis.has(i)); });
  });
  html += item("#synthese", "★", "Synthèse", false) + item("#quiz-final", "?", "Test final", bonnes === examen.length) + item("#diplome", "◇", "Ton diplôme", Boolean(dateDiplome));
  return `<aside class="fo-rail" aria-label="Sommaire de la formation"><p class="fo-rail-titre">La formation</p><ol>${html}</ol>
    <div class="fo-rail-prog"><span>${acquis.size} / ${chapitres.length} chapitres</span><i style="--p:${acquis.size / chapitres.length}"></i></div>
    <div class="fo-rail-file">${garder}${choixFichier("Reprendre un fichier")}${statut}</div></aside>`;
}

// Rail de droite : « Dans cette page »
function dansLaPage(titres) {
  if (!titres.length) return "<aside class=\"fo-toc\"></aside>";
  return `<aside class="fo-toc" aria-label="Dans cette page"><p>Dans cette page</p><ol>${titres.map(([id, t]) => `<li><a href="#${id}" data-ancre>${t}</a></li>`).join("")}</ol></aside>`;
}

function cadre(actif, contenu, titres = []) {
  return `<div class="fo-layout">${rail(actif)}<article class="fo-page">${contenu}
    <p class="fo-avert">Cette formation est une synthèse pédagogique. Elle ne remplace ni un avis médical, ni un avis juridique. Les exemples servent à apprendre à raisonner, pas à juger des personnes.</p></article>${dansLaPage(titres)}</div>`;
}

// ───────── Blocs de contenu
function bloc(b, titres) {
  switch (b.t) {
    case "h": { const id = "s-" + slug(b.texte); titres.push([id, b.texte]); return `<h2 id="${id}" class="fo-h">${b.texte}</h2>`; }
    case "p": return `<p>${b.html}</p>`;
    case "fig": return `<figure class="fo-fig">${illustrations[b.ill]}<figcaption>${b.cap}</figcaption></figure>`;
    case "exemple": return `<aside class="fo-exemple"><p class="fo-label">Exemple · ${b.titre}</p><p>${b.html}</p>${b.note ? `<p class="fo-exemple-note">${b.note}</p>` : ""}</aside>`;
    case "cartes": return `<div class="fo-cartes" style="--n:${b.items.length}">${b.items.map(([k, v]) => `<div class="fo-carte"><h3>${k}</h3><p>${v}</p></div>`).join("")}</div>`;
    case "mythes": { const id = "s-" + slug(b.titre); titres.push([id, b.titre]); return `<h2 id="${id}" class="fo-h">${b.titre}</h2><div class="fo-mythes">${b.items.map(([q, r]) => `<details class="fo-mythe"><summary>${q}</summary><p>${r}</p></details>`).join("")}</div>`; }
    case "principe": return `<aside class="fo-principe"><p class="fo-label">Principe à garder</p><p>${b.html}</p></aside>`;
    case "piege": return `<aside class="fo-piege"><p class="fo-label">${b.titre}</p><ol class="fo-chaine"><li class="fo-chaine-depart"><span>Ce qui est observé</span>${b.depart}</li>${b.etapes.map(([saut, phrase]) => `<li class="fo-saut"><b>Saut</b> ${saut}</li><li class="fo-chaine-pas">${phrase}</li>`).join("")}</ol><p>${b.fin}</p></aside>`;
    case "table": return `<div class="fo-table"><table><caption>${b.titre}</caption><thead><tr>${b.cols.map(c => `<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${b.rows.map(([a, ...r]) => `<tr><th scope="row">${a}</th>${r.map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    case "paires": return `<div class="fo-paires"><p class="fo-label">${b.titre}</p><div class="fo-paires-tete" aria-hidden="true"><span>${b.gauche}</span><span>${b.droite}</span></div><ul>${b.items.map(([a, z]) => `<li><span class="fo-paire-a"><span class="sr-only">${b.gauche} : </span>${a}</span><span class="fo-paire-z"><span class="sr-only">${b.droite} : </span>${z}</span></li>`).join("")}</ul></div>`;
    case "gestes": return `<div class="fo-gestes">${b.items.map(([nom, def, toi, manager]) => `<div class="fo-geste"><h3>${nom}</h3><p>${def}</p><dl><div><dt>Tu peux dire</dt><dd>${toi}</dd></div><div><dt>Côté manager</dt><dd>${manager}</dd></div></dl></div>`).join("")}</div>`;
    case "deux": return `<div class="fo-deux">${b.items.map(([k, l]) => `<div><h3>${k}</h3><ul>${l.map(x => `<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>${b.note ? `<p class="fo-note">${b.note}</p>` : ""}`;
    case "details": return `<details class="fo-details"><summary>${b.titre}</summary>${b.html}</details>`;
    case "trames": return `<div class="fo-trames"><p class="fo-label">${b.titre}</p>${b.items.map(([k, v]) => `<div class="fo-trame"><h3>${k}</h3><p>${v}</p>${b.sansCopie ? "" : '<button type="button" class="fo-copier" data-copier>Copier</button>'}</div>`).join("")}</div>`;
    case "portes": return `<div class="fo-portes">${b.items.map(([k, qui, quand]) => `<div><h3>${k}</h3><p class="fo-qui">${qui}</p><p>${quand}</p></div>`).join("")}</div>`;
    case "urgence": return `<p class="fo-urgence">${b.html}</p>`;
    default: return "";
  }
}

// ───────── Introduction
function intro() {
  const p = prochaine();
  const reprendre = acquis.size ? bouton(p < 0 ? "#quiz-final" : ancre(p), "Reprendre la lecture →") : bouton(ancre(0), "Commencer la lecture →");
  const contenu = `
    <p class="fo-pill">Étape 1 sur 3 · La formation</p>
    <h1 tabindex="-1">Comprendre l’usure au travail avant de la mesurer</h1>
    <aside class="fo-objectif"><p class="fo-label">Objectif</p><p>${introduction.objectif}</p></aside>
    <section class="fo-carton"><h2 id="s-pourquoi" class="fo-h">Pourquoi une formation avant le test ?</h2>${introduction.pourquoi.map(x => `<p>${x}</p>`).join("")}
      <ul class="fo-contrat">${introduction.contrat.map(x => `<li>${x}</li>`).join("")}</ul>
      <div class="fo-cta">${reprendre}${choixFichier("Reprendre un fichier")}</div>${statut}</section>
    <h2 id="s-modeles" class="fo-h">Trois façons de regarder le burn-out</h2>
    <p>Commençons par le mot. L’OMS, dans sa classification internationale (<b>CIM-11</b>, en vigueur depuis 2022), décrit le burn-out comme un <b>syndrome dû à un stress chronique au travail qui n’a pas été géré avec succès</b>. Ce n’est pas une maladie : c’est un phénomène lié au travail, avec trois signes, l’épuisement, la distance mentale et la baisse d’efficacité.</p>
    <p>Pour comprendre d’où il vient, la recherche s’appuie surtout sur <b>trois modèles</b>. Le premier décrit ce que l’usure fait à la personne (<b>Maslach</b>, chapitre 2). Les deux autres cherchent les causes dans le travail : la balance entre ce qu’il demande et ce qui aide à le faire (<b>JD-R</b>, chapitre 3), et l’équilibre entre l’effort et le retour (<b>Siegrist</b>, chapitre 4). Toute la formation s’appuie sur eux. Tu les retrouveras à la fin, dans la synthèse.</p>
    <figure class="fo-fig">${illustrations.modeles}<figcaption>Deux modèles regardent le travail, un regarde la personne. Garde cette image en tête : c’est la carte de toute la formation.</figcaption></figure>
    <h2 id="s-essentiel" class="fo-h-label">Avant de lire : l’essentiel en ${nb(introduction.essentiel.length)} idées</h2>
    <ol class="fo-essentiel">${introduction.essentiel.map((x, i) => `<li><span class="fo-ess-n">${String(i + 1).padStart(2, "0")}</span><p>${x}</p><a href="${ancre(i)}">Lire le chapitre ${i + 1}</a></li>`).join("")}</ol>
    <h2 id="s-programme" class="fo-h-label">Le programme</h2>
    ${temps.map((tp, k) => `<div class="fo-temps"><p class="fo-label">${tp}</p><ol>${chapitres.map((c, i) => c.temps === k ? `<li><a href="${ancre(i)}"><span class="fo-num">${acquis.has(i) ? "✓" : String(i + 1).padStart(2, "0")}</span><span><b>${c.titre}</b><small>${c.savoir[0]} Environ ${c.duree} minutes.</small></span></a></li>` : "").join("")}</ol></div>`).join("")}
    <div class="fo-pager"><span></span><a class="fo-pager-next" href="${ancre(0)}"><small>Commencer →</small><b>1 · ${chapitres[0].court}</b></a></div>`;
  return cadre("#formation", contenu, [["s-pourquoi", "Pourquoi une formation ?"], ["s-modeles", "Trois façons de regarder"], ["s-essentiel", `L’essentiel en ${nb(introduction.essentiel.length)} idées`], ["s-programme", "Le programme"]]);
}

// ───────── Chapitre
function exerciceHTML(i) {
  const e = chapitres[i].exo;
  const fait = acquis.has(i);
  return `<section class="fo-exo" aria-labelledby="exo-titre"><h2 id="exo-titre" class="fo-h">À toi de jouer</h2>
    <p class="fo-exo-t"><b>${e.titre}${/[?!]$/.test(e.titre) ? "" : "."}</b> ${e.intro}</p>
    <ol class="fo-sits">${e.situations.map((s, k) => `<li class="fo-sit" data-sit="${k}"><p class="fo-sit-q"><span class="fo-label">Situation ${k + 1} sur ${e.situations.length}</span>${s.q}</p>
      <div class="fo-choix" role="group" aria-label="Réponses de la situation ${k + 1}">${s.choix.map((c, j) => `<button type="button" data-sit="${k}" data-choix="${j}" aria-pressed="${fait && j === s.bonne}" class="${fait && j === s.bonne ? "juste" : ""}"><b>${lettre(j)}</b><span>${c}</span></button>`).join("")}</div>
      <p class="fo-fb ${fait ? "ok" : ""}" aria-live="polite" ${fait ? "" : "hidden"}>${fait ? s.fb[s.bonne] : ""}</p></li>`).join("")}</ol>
    <p class="fo-exo-note" role="status">${fait ? "Exercice réussi : le chapitre est validé." : "Choisis une réponse : l’explication s’affiche tout de suite. Le chapitre est validé quand les trois situations sont résolues. Rien n’est noté ni envoyé."}</p></section>`;
}

function chapitre(i) {
  const c = chapitres[i];
  const titres = [];
  const corps = c.blocs.map(b => bloc(b, titres)).join("");
  titres.push(["exo-titre", "À toi de jouer"], ["s-plusloin", "Pour aller plus loin"]);
  const avant = i > 0 ? `<a class="fo-pager-prev" href="${ancre(i - 1)}"><small>← Retour à</small><b>${i} · ${chapitres[i - 1].court}</b></a>` : `<a class="fo-pager-prev" href="#formation"><small>← Retour à</small><b>Introduction</b></a>`;
  const apres = i + 1 < chapitres.length ? `<a class="fo-pager-next" href="${ancre(i + 1)}"><small>Chapitre suivant →</small><b>${i + 2} · ${chapitres[i + 1].court}</b></a>` : `<a class="fo-pager-next" href="#synthese"><small>Pour finir →</small><b>La synthèse</b></a>`;
  const contenu = `
    <p class="fo-temps-k">${temps[c.temps]}</p>
    <header class="fo-chap-tete"><span class="fo-chap-n">${String(i + 1).padStart(2, "0")}</span><div><p class="fo-chap-meta">Chapitre ${i + 1} sur ${chapitres.length} · environ ${c.duree} minutes</p><h1 tabindex="-1">${c.titre}</h1></div></header>
    <section class="fo-savoir"><p class="fo-label">Ce que tu sauras faire</p><ul>${c.savoir.map(s => `<li>${s}</li>`).join("")}</ul></section>
    <aside class="fo-arrive"><p class="fo-label">Tu arrives peut-être avec</p><p>${c.arrive}</p></aside>
    <aside class="fo-retenir"><p class="fo-label">À retenir</p><p>${c.retenir}</p></aside>
    ${corps}
    ${exerciceHTML(i)}
    <details id="s-plusloin" class="fo-details fo-plusloin"><summary>Pour aller plus loin : ${c.plusLoin.titre}</summary>${c.plusLoin.html}</details>
    <details class="fo-sources"><summary>Sources de ce chapitre</summary><ul>${c.sources.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t} ↗</a></li>`).join("")}</ul></details>
    <aside class="fo-nechange"><p class="fo-label">Ce que ça ne change pas</p><p>${c.nechange}</p></aside>
    <aside class="fo-piece">${pieceRapport(i, nomsPieces)}<div><p class="fo-label">Ton rapport · pièce ${i + 1} sur ${chapitres.length} : ${c.piece.nom.toLowerCase()}</p><p>${c.piece.texte}</p><p class="fo-piece-ou">Dans ton rapport : ${c.piece.rapport}</p></div></aside>
    <div class="fo-pause"><p>Tu peux t’arrêter ici. « Enregistrer ma progression » télécharge un petit fichier pour reprendre plus tard, sur cet appareil ou un autre.</p>${garder}${statut}</div>
    <p class="fo-suite">${c.suite}</p>
    <nav class="fo-pager" aria-label="Chapitres">${avant}${apres}</nav>`;
  return cadre(ancre(i), contenu, titres);
}

// ───────── Test final et diplôme
function quiz() {
  let contenu;
  if (acquis.size < chapitres.length) {
    const manque = chapitres.map((c, i) => acquis.has(i) ? "" : `<li><a href="${ancre(i)}">${i + 1} · ${c.court}</a></li>`).join("");
    contenu = `<p class="fo-pill">Pour finir</p><h1 tabindex="-1">Le test final</h1><p class="fo-lead">Il s’ouvre quand les ${nb(chapitres.length)} exercices sont réussis. Il te reste :</p><ul class="fo-manque">${manque}</ul>${bouton(ancre(prochaine()), "Aller au prochain exercice →")}`;
  } else if (bonnes === examen.length) {
    contenu = `<p class="fo-pill">Test final réussi</p><h1 tabindex="-1">Les ${nb(examen.length)} situations sont résolues</h1><p class="fo-lead">Tu sais assembler les pièces. Ton diplôme t’attend.</p>${bouton("#diplome", "Voir mon diplôme →")}`;
  } else {
    const [q, choix] = examen[bonnes];
    contenu = `<p class="fo-pill">Pour finir · ${nb(examen.length)} situations nouvelles</p><h1 tabindex="-1">Le test final</h1>
      <p class="fo-lead">Une situation à la fois. Après chaque réponse, lis l’explication. Tu peux réessayer autant de fois que tu veux.</p>
      <div class="fo-quiz-avance"><span>Situation ${bonnes + 1} sur ${examen.length}</span><progress value="${bonnes}" max="${examen.length}" aria-label="Situations résolues"></progress></div>
      <section class="fo-exo fo-quiz" aria-labelledby="quiz-q"><p id="quiz-q" class="fo-sit-q" tabindex="-1">${q}</p>
      <div class="fo-choix" role="group" aria-label="Réponses">${choix.map((c, j) => `<button type="button" data-final="${j}" aria-pressed="false"><b>${lettre(j)}</b><span>${c}</span></button>`).join("")}</div>
      <p class="fo-fb" aria-live="polite" hidden></p><div class="fo-quiz-suite" hidden><button type="button" class="button primary" data-suite>Situation suivante →</button></div></section>`;
  }
  return cadre("#quiz-final", contenu);
}

function synthesePage() {
  const titres = [["s-modeles", "Les trois modèles"], ["s-croisement", "Les trois modèles sur un même cas"], ["s-complements", "Trois éclairages complémentaires"], ["s-clefs", "Les idées clefs"], ["s-plusloin", "Pour aller plus loin"]];
  const dernier = chapitres.length - 1;
  const contenu = `
    <p class="fo-pill">Synthèse · avant le test final</p>
    <h1 tabindex="-1">Ce qu’il faut emporter</h1>
    <p class="fo-lead">${synthese.chapo}</p>
    <h2 id="s-modeles" class="fo-h">Les trois modèles, en une image</h2>
    <figure class="fo-fig">${illustrations.modeles}<figcaption>Deux modèles regardent le travail, un regarde la personne. C’est pour ça qu’on agit d’abord sur le travail : c’est là que sont les causes.</figcaption></figure>
    <div class="fo-modeles">${synthese.modeles.map(m => `<section class="fo-modele"><p class="fo-modele-nom">${m.nom} · ${m.image.toLowerCase()}</p><h3>${m.question}</h3><p>${m.idee}</p><p class="fo-modele-agir"><b>Pour agir :</b> ${m.agir}</p><a href="${ancre(m.chap)}">Revoir le chapitre ${m.chap + 1}</a></section>`).join("")}</div>
    ${troisPhrases}
    <h2 id="s-croisement" class="fo-h">Un même problème, trois questions différentes</h2>
    <p>Les théories se lisent mieux sur <b>les mêmes faits</b> que dans trois chapitres séparés.</p>
    <article class="fo-exemple"><h3>Sam, trois mois après le départ de Marc</h3><p>${synthese.casCommun.situation}</p></article>
    <div class="fo-table fo-modeles-comparaison"><table>
      <caption>Ce que chaque modèle éclaire, et ce qu'il ne prouve pas</caption>
      <thead><tr><th scope="col">Modèle</th><th scope="col">Ce qu'il permet de voir</th><th scope="col">Ce qu'il ne conclut pas</th><th scope="col">Question pour agir</th></tr></thead>
      <tbody>${synthese.casCommun.lectures.map(x => `<tr><th scope="row">${x.modele}</th><td>${x.observe}</td><td>${x.neDitPas}</td><td><b>${x.action}</b></td></tr>`).join("")}</tbody>
    </table></div>
    <p class="fo-synthese-principe">${synthese.casCommun.conclusion}</p>
    <h2 id="s-complements" class="fo-h">Trois autres éclairages, sans multiplier les scores</h2>
    <p>Les trois modèles principaux ne répondent pas à tout. D'autres cadres permettent de comprendre <b>la spirale des pertes</b>, <b>les expositions professionnelles</b> et <b>la récupération hors travail</b>.</p>
    <div class="fo-complements">${synthese.complements.map(x => `<article class="fo-complement">
      <p class="fo-label">Cadre complémentaire · pas une nouvelle note Bull-Out</p>
      <h3>${x.nom}</h3><p><b>À quoi il sert.</b> ${x.role}.</p>
      <p><b>Son principe.</b> ${x.principe}</p>
      <p><b>Chez Sam.</b> ${x.exemple}</p>
      <p class="fo-complement-limite"><b>Sa limite.</b> ${x.limite}</p>
      <a href="${x.lien}" target="_blank" rel="noopener">Lire la source scientifique ou institutionnelle</a>
    </article>`).join("")}</div>
    <h2 id="s-clefs" class="fo-h">Les ${nb(synthese.clefs.length)} idées clefs</h2>
    <p>Une par chapitre. Si tu ne dois retenir qu’une phrase de chaque chapitre, c’est celle-là.</p>
    <ol class="fo-clefs">${synthese.clefs.map(([phrase, detail, i], k) => `<li><span class="fo-clef-n">${String(k + 1).padStart(2, "0")}</span><div><p class="fo-clef-p">${phrase}</p><p>${detail}</p><a href="${ancre(i)}">Chapitre ${i + 1} · ${chapitres[i].court}</a></div></li>`).join("")}</ol>
    <h2 id="s-plusloin" class="fo-h">Pour aller plus loin</h2>
    <p>Comment ces modèles ont été construits, ce qu’ils prouvent et ce qu’ils ne prouvent pas. Facultatif, mais utile pour lire ton rapport avec recul.</p>
    ${plusLoin}
    <nav class="fo-pager" aria-label="Chapitres"><a class="fo-pager-prev" href="${ancre(dernier)}"><small>← Retour à</small><b>${dernier + 1} · ${chapitres[dernier].court}</b></a><a class="fo-pager-next" href="#quiz-final"><small>Pour finir →</small><b>Le test final</b></a></nav>`;
  return cadre("#synthese", contenu, titres);
}

function diplome() {
  const contenu = !dateDiplome
    ? `<p class="fo-pill">Ton diplôme</p><h1 tabindex="-1">Ton diplôme de formation</h1><p class="fo-lead">Il se débloque après les ${nb(chapitres.length)} chapitres et le test final.</p>${bouton(acquis.size < chapitres.length ? ancre(prochaine()) : "#quiz-final", "Continuer la formation →")}`
    : `<p class="fo-pill">Étape 1 terminée</p><h1 tabindex="-1">Ton diplôme Bull-Out</h1><p class="fo-lead">Garde cette image : elle ouvre le questionnaire aujourd’hui, et lors d’une prochaine visite.</p>
      <label class="prenom">Prénom sur le diplôme (facultatif)<input id="prenom" maxlength="32" autocomplete="off"></label>
      <canvas id="apercu-diplome" width="1600" height="960" role="img" aria-label="Diplôme Bull-Out de prévention de l’épuisement professionnel"></canvas>
      <div class="fo-cta"><button type="button" class="button primary" data-diplome>Télécharger mon diplôme</button>
      <a id="ouvrir-test" class="button anis" href="#questionnaire" ${ouvert ? "" : "hidden"}>Commencer le questionnaire →</a></div>${statut}
      <h2 class="fo-h-label">Avant le questionnaire</h2>${troisPhrases}${plusLoin}`;
  return cadre("#diplome", contenu);
}

function porteHTML() {
  const lien = dateDiplome ? "#diplome" : acquis.size ? (prochaine() < 0 ? "#quiz-final" : ancre(prochaine())) : "#formation";
  return `<div class="fo-gate"><p class="fo-pill">Étape 2 sur 3 · Le questionnaire</p><h1 tabindex="-1">Ouvrir le questionnaire Bull-Out</h1>
    <p class="fo-lead">Ton diplôme de formation ouvre les questions. À la fin, tu obtiens ton rapport personnel. Rien n’est envoyé : tout reste dans ce navigateur.</p>
    <div class="fo-gate-choix"><section><h2>J’ai mon diplôme</h2><p>Choisis ton diplôme (image PNG) ou ton fichier de progression. Il est lu dans cet onglet, sans être envoyé.</p>${choixFichier("Choisir mon fichier")}${statut}</section>
    <section><h2>${dateDiplome ? "Ma formation est terminée" : "Je commence par la formation"}</h2><p>${Nb(chapitres.length)} chapitres courts, des exercices corrigés et un test final, pour lire ton rapport comme un point de départ.</p>${bouton(lien, dateDiplome ? "Retrouver mon diplôme" : "Entrer dans la formation →")}</section></div>
    <p><a href="agir.html#aide">Besoin d’aide maintenant ? Les ressources d’aide sont accessibles directement →</a></p></div>`;
}

// ───────── Affichage
function afficher(focus = true) {
  const hash = location.hash || "#questionnaire";
  const numero = /^#chapitre-([1-9])$/.exec(hash);
  const valide = numero && Number(numero[1]) <= chapitres.length;
  const enFormation = Boolean(valide) || ["#formation", "#synthese", "#quiz-final", "#diplome"].includes(hash);
  const demandeRapport = hash === "#results" || hash === "#rapport" || hash.startsWith("#rapport-");
  if (numero && !valide) { location.replace("#chapitre-" + chapitres.length); return; }
  const vue = enFormation ? formation : !ouvert ? porte : demandeRapport && rapport.dataset.ready ? rapport : questionnaire;
  if (demandeRapport && vue !== rapport) history.replaceState(null, "", "#questionnaire");
  const ancien = page;
  page = enFormation ? hash : vue.id;
  vues.forEach(v => v.hidden = v !== vue);
  document.body.classList.toggle("lecture-rapport", vue === rapport);
  document.body.classList.toggle("en-formation", enFormation);
  document.querySelectorAll(".site-nav .nav-direct").forEach(a => {
    const cible = enFormation ? "#formation" : "#questionnaire";
    if (a.hash === cible && a.pathname.endsWith("test.html")) a.setAttribute("aria-current", "page"); else if (a.pathname.endsWith("test.html")) a.removeAttribute("aria-current");
  });
  if (enFormation) {
    if (page !== ancien) justes = new Set();
    const html = valide ? chapitre(Number(numero[1]) - 1) : hash === "#synthese" ? synthesePage() : hash === "#quiz-final" ? quiz() : hash === "#diplome" ? diplome() : intro();
    formation.innerHTML = html;
    if ($("#prenom")) {
      $("#prenom").value = prenom;
      actualiserImage();
      document.fonts.ready.then(actualiserImage);
    }
    suivreToc();
  } else if (vue === porte) porte.innerHTML = porteHTML();
  else if (vue === rapport) {
    $("#rapport-date").textContent = "Établi le " + new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date());
  }
  document.title = (vue.querySelector("h1")?.textContent || "Le parcours") + " · Bull-Out";
  if (vue === rapport && hash.startsWith("#rapport-")) document.getElementById(hash.slice(1))?.scrollIntoView();
  else if (focus && ancien !== page) {
    vue.querySelector("h1")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

// Le sommaire de droite suit la lecture.
let observateur;
function suivreToc() {
  observateur?.disconnect();
  const liens = [...formation.querySelectorAll(".fo-toc a")];
  if (!liens.length || !("IntersectionObserver" in window)) return;
  const cibles = liens.map(a => document.getElementById(a.hash.slice(1))).filter(Boolean);
  observateur = new IntersectionObserver(entrees => {
    entrees.forEach(e => {
      if (!e.isIntersecting) return;
      liens.forEach(a => a.classList.toggle("ici", a.hash === "#" + e.target.id));
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  cibles.forEach(c => observateur.observe(c));
}

function actualiserImage() {
  const canvas = $("#apercu-diplome");
  if (canvas) dessiner(canvas, dateDiplome, prenom);
}

function telecharger(blob, nom) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

const controles = () => [...form.querySelectorAll('input[type="radio"]')].filter(r => !r.name.startsWith("alert"));
function enregistrer(btn) {
  const reponses = questionnaire.hidden ? {} : Object.fromEntries(controles().filter(r => r.checked).map(r => [r.name, r.value]));
  const progression = { format, versionQuestions: "2026-11-v2", versionBullshitometre: "2026-11-bs-v2", versionReactionHumour: "2026-11-hr-v2", chapitres: [...acquis], bonnes, dateDiplome, ouvert, reponses };
  telecharger(new Blob([JSON.stringify(progression)], { type: "application/json" }), "bull-out-progression.json");
  message(btn, "Progression téléchargée. Garde ce fichier pour reprendre.");
}

function message(el, msg) {
  const parent = el.closest(".fo-rail-file, .fo-pause, .fo-gate-choix section, .fo-page, #questionnaire");
  const zone = parent?.querySelector(".file-status");
  if (zone) zone.textContent = msg;
}

const dateValide = d => typeof d === "string" && /^\d{4}-\d\d-\d\d$/.test(d) && Number.isFinite(Date.parse(d));

// V7 → V8 : fonction pure, testable sans interface.
// Les huit réponses BS existantes conservent leur identifiant, même si leur ordre
// diffère de celui du test satirique autonome de douze questions.
function migrerBullshitometreV7(reponses) {
  const anciennes = reponses && typeof reponses === "object" && !Array.isArray(reponses) ? reponses : {};
  const resultat = { ...anciennes };
  const sautees = Array.from({ length: 8 }, (_, i) => anciennes[`BS${i + 1}`] === "skip").every(Boolean);
  if (sautees) {
    for (let i = 9; i <= 12; i += 1) resultat[`BS${i}`] = "skip";
  }
  return resultat;
}

// HR3 a changé de question. Une valeur V9 ne peut pas devenir une réponse V10.
// Une ancienne abstention explicite (valeur 5) peut être conservée.
function migrerReactionHumourV9(reponses) {
  const ancien = reponses && typeof reponses === "object" && !Array.isArray(reponses) ? reponses : {};
  const nouveau = { ...ancien };
  let reponsesARelire = 0;
  if (Object.prototype.hasOwnProperty.call(nouveau, "HR3") && nouveau.HR3 !== "5") {
    delete nouveau.HR3;
    reponsesARelire = 1;
  }
  return { reponses: nouveau, reponsesARelire };
}

function restaurer(p) {
  const formatOriginal = p?.format;
  let reponsesARelire = 0;
  // Fichiers des premières versions : un diplôme obtenu reste valable ;
  // un parcours inachevé reprend au début, les chapitres ayant été entièrement réécrits.
  if (/^bull-out-progression-[1-4]$/.test(p?.format || "")) {
    const fini = dateValide(p.dateDiplome);
    p = { format, chapitres: fini ? chapitres.map((_, i) => i) : [], bonnes: fini ? examen.length : 0, dateDiplome: fini ? p.dateDiplome : null, ouvert: fini && Boolean(p.ouvert), reponses: fini && p.reponses && typeof p.reponses === "object" ? p.reponses : {} };
  }
  // Version à huit chapitres : un chapitre sur la loi a été inséré en 8e position.
  if (p?.format === "bull-out-progression-5" && Array.isArray(p.chapitres)) {
    const fini = dateValide(p.dateDiplome);
    const liste = fini ? chapitres.map((_, i) => i) : p.chapitres.map(i => (Number.isInteger(i) && i >= 7 ? i + 1 : i));
    p = { ...p, format, chapitres: liste, bonnes: fini ? examen.length : liste.length === chapitres.length ? p.bonnes : 0 };
  }
  // Une réponse à une formulation antérieure n'est pas automatiquement transposable.
  if (p?.format === "bull-out-progression-6" || (/^bull-out-progression-[1-5]$/.test(formatOriginal || "") && p?.format === format)) {
    const anciennes = p.reponses && typeof p.reponses === "object" && !Array.isArray(p.reponses) ? p.reponses : {};
    const gardees = Object.entries(anciennes).filter(([id]) => !reponsesReformulees.has(id));
    reponsesARelire = Object.keys(anciennes).length - gardees.length;
    p = { ...p, format, versionQuestions: "2026-11-v2", reponses: Object.fromEntries(gardees) };
  }
  // V7 : huit questions satiriques déjà présentes (BS1–BS8), conservées sous le même identifiant.
  // Quatre nouvelles questions complètent désormais le jeu : BS9–BS12.
  // Si la personne avait passé toute la pause humour, conserver ce choix pour les 12.
  if (p?.format === "bull-out-progression-7") {
    p = { ...p, format, versionBullshitometre: "2026-11-bs-v2",
      reponses: migrerBullshitometreV7(p.reponses) };
  }
  // V8 : la satire à douze questions existait, mais pas les quatre réponses HR.
  // Si toute la satire avait été sautée, prolonger ce choix à HR1–HR4.
  // Sinon, conserver les réponses et inviter à remplir ou passer la nouvelle partie.
  if (p?.format === "bull-out-progression-8" || p?.format === "bull-out-progression-9") {
    p = { ...p, format, versionReactionHumour: "2026-11-hr-v2" };
  }
  // V9 → V10 : HR3 a changé de construit (identification → banalisation ressentie).
  // Ne pas transférer une réponse à l'ancienne formulation ; conserver un refus (5).
  if (formatOriginal === "bull-out-progression-9") {
    const migrationHR = migrerReactionHumourV9(p.reponses);
    reponsesARelire += migrationHR.reponsesARelire;
    p = { ...p, reponses: migrationHR.reponses };
  }
  if (["bull-out-progression-7", "bull-out-progression-8"].includes(formatOriginal)) {
    const reponses = { ...p.reponses };
    const sautBS = Array.from({ length: 12 }, (_, i) => reponses[`BS${i + 1}`] === "skip").every(Boolean);
    if (sautBS) for (let i = 1; i <= 4; i++) reponses[`HR${i}`] = "5";
    p = { ...p, reponses, versionReactionHumour: "2026-11-hr-v2" };
  }
  const sansErreur = p?.format === format && Array.isArray(p.chapitres) && p.chapitres.length <= chapitres.length &&
    p.chapitres.every(i => Number.isInteger(i) && i >= 0 && i < chapitres.length) &&
    new Set(p.chapitres).size === p.chapitres.length && Number.isInteger(p.bonnes) && p.bonnes >= 0 && p.bonnes <= examen.length &&
    (p.bonnes === 0 || p.chapitres.length === chapitres.length) && typeof p.ouvert === "boolean" &&
    (p.bonnes === examen.length ? dateValide(p.dateDiplome) : p.dateDiplome === null && !p.ouvert) &&
    p.reponses && typeof p.reponses === "object" && !Array.isArray(p.reponses);
  if (!sansErreur) throw new Error("Ce fichier ne correspond pas à une progression Bull-Out valide.");
  const tous = controles();
  const selections = Object.entries(p.reponses).map(([nom, valeur]) => tous.find(r => r.name === nom && r.value === String(valeur)));
  if (selections.some(r => !r) || (selections.length && !p.ouvert)) throw new Error("Les réponses de ce fichier sont illisibles.");
  form.reset();
  selections.forEach(r => r.checked = true);
  form.dispatchEvent(new Event("bullout:restored"));
  acquis = new Set(p.chapitres);
  bonnes = p.bonnes;
  ouvert = p.ouvert;
  dateDiplome = p.dateDiplome;
  prenom = "";
  window.BullOutRestauration = { ancienFormat: formatOriginal, reponsesARelire };
  return ouvert ? "#questionnaire" : dateDiplome ? "#diplome" : prochaine() < 0 ? "#quiz-final" : acquis.size ? ancre(prochaine()) : "#formation";
}

async function importer(input) {
  const fichier = input.files[0];
  if (!fichier) return;
  try {
    if (fichier.size > 6 * 1024 * 1024) throw new Error("Ce fichier est trop volumineux. Choisis le PNG ou le fichier de progression Bull-Out d’origine.");
    let destination;
    // Les gestionnaires de téléchargement peuvent retirer l’extension du fichier.
    const prefixe = await fichier.slice(0, 64).text();
    if (/\.json$/i.test(fichier.name) || fichier.type === "application/json" || prefixe.trimStart().startsWith("{")) {
      if (fichier.size > 32000) throw new Error("Ce fichier de progression est trop volumineux.");
      if ((acquis.size || form.querySelector("input:checked")) && !window.confirm("Remplacer la progression de cet onglet par celle du fichier ?")) return;
      destination = restaurer(JSON.parse(await fichier.text()));
    } else {
      const date = lireDiplome(await fichier.arrayBuffer());
      if (!date) throw new Error("Diplôme non reconnu. Choisis le PNG Bull-Out d’origine ou un fichier de progression Bull-Out.");
      dateDiplome = date;
      acquis = new Set(chapitres.map((_, i) => i));
      bonnes = examen.length;
      ouvert = true;
      destination = "#questionnaire";
    }
    if (location.hash === destination) afficher(); else location.hash = destination;
    const migration = window.BullOutRestauration;
    message(input, migration?.reponsesARelire
      ? `Progression reprise : ${migration.reponsesARelire} question(s) reformulée(s) sont à renseigner de nouveau. Les autres réponses ont été conservées.`
      : "Progression restaurée. Vérifie les réponses manquantes avant d'obtenir ton rapport.");
    window.BullOutRestauration = null;
  } catch (e) {
    message(input, e instanceof SyntaxError ? "Fichier illisible. Choisis un fichier de progression Bull-Out." : e.message);
  } finally { input.value = ""; }
}

// Exercice d’un chapitre : chaque situation affiche son explication tout de suite.
function repondreSituation(btn) {
  const i = Number(page.split("-")[1]) - 1;
  const k = Number(btn.dataset.sit), j = Number(btn.dataset.choix);
  const s = chapitres[i].exo.situations[k];
  const li = btn.closest(".fo-sit");
  const ok = j === s.bonne;
  li.querySelectorAll("button").forEach(b => { b.classList.remove("juste", "a-revoir"); b.setAttribute("aria-pressed", "false"); });
  btn.classList.add(ok ? "juste" : "a-revoir");
  btn.setAttribute("aria-pressed", "true");
  const fb = $(".fo-fb", li);
  fb.hidden = false;
  fb.className = "fo-fb " + (ok ? "ok" : "ko");
  fb.textContent = (ok ? "Oui. " : "Pas tout à fait. ") + s.fb[j].replace(/^Oui\. /, "") + (ok ? "" : " Essaie une autre réponse.");
  if (ok) justes.add(k);
  if (justes.size === chapitres[i].exo.situations.length && !acquis.has(i)) {
    acquis.add(i);
    $(".fo-exo-note", formation).textContent = "Exercice réussi : le chapitre est validé.";
    $(".fo-rail", formation).outerHTML = rail(page);
  }
}

function repondreFinal(btn) {
  const [, , bonne, corrections] = examen[bonnes];
  const j = Number(btn.dataset.final);
  const bloc = btn.closest(".fo-quiz");
  const ok = j === bonne;
  bloc.querySelectorAll("[data-final]").forEach(b => { b.classList.remove("juste", "a-revoir"); b.setAttribute("aria-pressed", "false"); });
  btn.classList.add(ok ? "juste" : "a-revoir");
  btn.setAttribute("aria-pressed", "true");
  const fb = $(".fo-fb", bloc);
  fb.hidden = false;
  fb.className = "fo-fb " + (ok ? "ok" : "ko");
  fb.textContent = corrections[j] + (ok ? "" : " Essaie une autre réponse.");
  if (!ok) return;
  bloc.querySelectorAll("[data-final]").forEach(b => b.disabled = true);
  bonnes++;
  if (bonnes === examen.length) dateDiplome = dateLocale();
  $("progress", formation).value = bonnes;
  const suite = $(".fo-quiz-suite", bloc);
  suite.hidden = false;
  suite.firstElementChild.textContent = bonnes === examen.length ? "Voir mon diplôme →" : "Situation suivante →";
  suite.firstElementChild.focus({ preventScroll: true });
}

document.addEventListener("click", async e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.hasAttribute("data-choix")) repondreSituation(btn);
  if (btn.hasAttribute("data-final")) repondreFinal(btn);
  if (btn.hasAttribute("data-suite")) {
    if (bonnes === examen.length) location.hash = "diplome";
    else { afficher(false); $("#quiz-q")?.focus(); }
  }
  if (btn.hasAttribute("data-copier")) {
    const texte = btn.parentElement.querySelector("p").textContent;
    try { await navigator.clipboard.writeText(texte); btn.textContent = "Copié ✓"; } catch { btn.textContent = "Sélectionne le texte pour le copier"; }
    setTimeout(() => { btn.textContent = "Copier"; }, 2500);
  }
  if (btn.hasAttribute("data-save")) enregistrer(btn);
  if (btn.hasAttribute("data-diplome")) {
    btn.disabled = true;
    try {
      await document.fonts.ready;
      actualiserImage();
      const blob = await exporterPNG($("#apercu-diplome"), dateDiplome);
      telecharger(blob, "diplome-bull-out-" + dateDiplome + ".png");
      ouvert = true;
      $("#ouvrir-test").hidden = false;
      message(btn, "Diplôme téléchargé. Ton questionnaire est ouvert.");
      $("#ouvrir-test").focus();
    } catch { message(btn, "Le diplôme n’a pas pu être créé. Réessaie le téléchargement."); }
    finally { btn.disabled = false; }
  }
  if (btn.id === "imprimer") window.print();
});
// Les liens « Dans cette page » défilent sans changer d’écran (le hash sert à la navigation).
document.addEventListener("click", e => {
  const a = e.target.closest("a[data-ancre]");
  if (!a) return;
  e.preventDefault();
  const cible = document.getElementById(a.hash.slice(1));
  if (cible?.tagName === "DETAILS") cible.open = true;
  cible?.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.addEventListener("change", e => { if (e.target.matches("[data-import]")) importer(e.target); });
document.addEventListener("input", e => {
  if (e.target.id === "prenom") { prenom = e.target.value; actualiserImage(); }
});
window.addEventListener("hashchange", () => afficher());
afficher(false);
