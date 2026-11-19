import { illustrations } from "./formation-illustrations.js";
import { chapitres, examen } from "./formation-contenu.js";
import { dateLocale, dessiner, exporterPNG, lireDiplome } from "./diplome.js";

const $ = (s, root = document) => root.querySelector(s);
const formation = $("#espace-formation");
const porte = $("#porte-test");
const questionnaire = $("#questionnaire");
const rapport = $("#results");
const form = $("#burnout-form");
const vues = [formation, porte, questionnaire, rapport];
const format = "bull-out-progression-3";
let acquis = new Set();
let bonnes = 0;
let dateDiplome = null;
let ouvert = false;
let page = "";
let prenom = "";
const ancreChapitre = i => "#chapitre-" + (i + 1);
const prochaineLecture = () => chapitres.findIndex((_, i) => !acquis.has(i));
const choixFichier = (label) => `<label class="resume-file">${label}<input type="file" data-import accept=".json,.png,application/json,image/png"></label>`;
const statut = '<p class="file-status" role="status"></p>';
const action = (href, label) => `<a class="button primary" href="${href}">${label}</a>`;
const garder = '<button class="button secondary" type="button" data-save>Enregistrer ma progression</button>';
const suite = i => i + 1 < chapitres.length ? ancreChapitre(i + 1) : "#quiz-final";

function entete(k, titre, lead) {
  return `<p class="course-eyebrow">${k}</p><h1 tabindex="-1">${titre}</h1><p class="course-lead">${lead}</p>`;
}

function sommaire(active) {
  const lien = (id, texte, numero, valide) => `<li><a href="${id}" ${id === active ? 'aria-current="step"' : ''}><span class="course-index">${valide ? '✓' : numero}</span><span>${texte}${valide ? '<span class="sr-only"> (validé)</span>' : ''}</span></a></li>`;
  return `<aside class="course-rail"><nav aria-label="Sommaire de la formation"><a class="rail-title" href="#formation">La formation</a>
    <ol>${chapitres.map((c, i) => lien(ancreChapitre(i), c.titre, i + 1, acquis.has(i))).join("")}
    ${lien("#quiz-final", "Test final", "?", bonnes === examen.length)}${lien("#diplome", "Mon diplôme", "◇", Boolean(dateDiplome))}</ol></nav>
    <div class="course-file">${garder}${choixFichier("Reprendre un fichier")}${statut}</div></aside>`;
}

function intro() {
  const prochain = prochaineLecture();
  return `<header class="course-hero"><div>${entete("Étape 1 · La formation", "Comprendre l’usure au travail", "Vendredi soir, deux collègues se disent épuisés. Lundi, un seul a récupéré. Pars de leur histoire, puis découvre trois façons de regarder leur travail.")}
    ${action(prochain < 0 ? "#quiz-final" : ancreChapitre(prochain), acquis.size ? "Reprendre ma formation" : "Commencer le premier chapitre")}</div>
    <div class="course-programme"><span>Ton parcours</span><strong>${acquis.size} <small>/ ${chapitres.length}</small></strong><p>chapitres validés</p><div class="course-meter">${chapitres.map((_, i) => `<i class="${acquis.has(i) ? 'on' : ''}"></i>`).join("")}</div></div></header>
    <div class="course-layout">${sommaire("#formation")}<section class="course-paper"><p class="course-eyebrow">Le programme</p><h2>Ce que tu sauras faire</h2>
    <ol class="course-objectifs">${chapitres.map((c,i) => `<li><span>${String(i+1).padStart(2,"0")}</span><div><a href="${ancreChapitre(i)}">${c.titre}</a><p>${c.objectifs[0]}</p></div></li>`).join("")}</ol>
    <p>Le test final propose huit nouvelles situations. Une fois les réponses comprises, télécharge ton diplôme pour ouvrir le questionnaire personnel. Tu peux interrompre le parcours en enregistrant ta progression dans un fichier.</p></section></div>`;
}

function exercice(q, termine, suivant) {
  const [question, options, bonne, correction] = q;
  return `<section class="course-exo" aria-labelledby="exo-question"><h2 id="exo-question" tabindex="-1">${question}</h2>
    <div class="course-options">${options.map((o, i) => `<button type="button" data-reponse="${i}" ${termine ? 'disabled' : ''} class="${termine && i === bonne ? 'juste' : ''}"><span aria-hidden="true">${String.fromCharCode(65+i)}</span>${o}</button>`).join("")}</div>
    <p class="correction" role="status">${termine ? "Réponse comprise. " + correction : ""}</p>
    <div class="exo-suite" ${termine ? '' : 'hidden'}>${suivant}</div></section>`;
}

function tableau({ titre, colonnes, lignes }) {
  return `<div class="cours-table"><table><caption>${titre}</caption><thead><tr>${colonnes.map(c => `<th scope="col">${c}</th>`).join("")}</tr></thead>
    <tbody>${lignes.map(([nom, ...valeurs]) => `<tr><th scope="row">${nom}</th>${valeurs.map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function sectionsCours(sections) {
  return sections.map(([titre, texte]) => `<section class="course-lesson"><h2>${titre}</h2><p>${texte}</p></section>`).join("");
}

function entrainement([question, options]) {
  return `<div class="course-warmup" role="group" aria-labelledby="course-warmup-heading">
    <h3 id="course-warmup-heading">${question}</h3>
    <div class="course-options">${options.map((option, index) =>
      `<button type="button" data-entrainement="${index}" aria-pressed="false">${option}</button>`).join("")}</div>
    <p class="correction" role="status"></p>
  </div>`;
}

function chapitre(i) {
  const c = chapitres[i];
  const image = illustrations[i];
  return `<div class="course-layout">${sommaire(ancreChapitre(i))}<article class="course-paper">
    ${entete("Chapitre " + (i+1) + " sur " + chapitres.length, c.titre, c.question)}
    <section class="course-goals"><h2>Ce que tu sauras faire</h2>
      <ul>${c.objectifs.map(objectif => `<li>${objectif}</li>`).join("")}</ul></section>
    <p class="course-arrive">${c.scene}</p>
    <p class="course-key">${c.essentiel}</p>
    ${sectionsCours(c.avant)}
    <figure class="course-diagram">
      <h2>${image.titre}</h2>
      <svg viewBox="0 0 364 ${image.hauteur}" role="img" aria-labelledby="schema-titre schema-description">
        <title id="schema-titre">${image.titre}</title><desc id="schema-description">${image.description}</desc>${image.dessin}
      </svg>
      <figcaption>${image.legende}</figcaption>
    </figure>
    ${sectionsCours(c.cours)}
    ${c.tableaux.map(tableau).join("")}
    ${c.fiches ? `<section><h2>${i === 6 ? "Choisir une action et préparer sa formulation" : "Préparer le premier échange"}</h2><p>${i === 6 ? "Choisis le levier qui répond à la contrainte observée." : "Choisis l’interlocuteur dont le rôle correspond à ta demande."}</p>
      ${c.fiches.map(([titre, etapes]) => `<details class="cours-fiche"><summary>${titre}</summary><dl class="course-notions">${etapes.map(([k,v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></details>`).join("")}</section>` : ""}
    <section class="course-practice" aria-labelledby="course-practice-heading">
      <h2 id="course-practice-heading">À toi de jouer</h2>
      ${entrainement(c.entrainement)}
    </section>
    <aside class="course-transfer"><h2>Dans ton rapport Bull-Out</h2><p>${c.rapport}</p>
      <h3>Et toi ?</h3><p>${c.reflexion}</p>
      <p>${c.transition}</p></aside>
    ${exercice(c.exercice, acquis.has(i), action(suite(i), i+1 < chapitres.length ? "Chapitre suivant →" : "Aller au test final →"))}
    <details><summary>Sources scientifiques et institutionnelles</summary><ul>${c.references.map(([titre,url]) => `<li><a href="${url}" target="_blank" rel="noopener">${titre} ↗</a></li>`).join("")}</ul></details></article></div>`;
}

function quiz() {
  let contenu;
  if (acquis.size < chapitres.length) {
    contenu = entete("Fin de la formation", "Le test final", "Valide les huit exercices pour accéder aux huit questions de synthèse.") + action(ancreChapitre(prochaineLecture()), "Aller au premier exercice restant");
  } else if (bonnes === examen.length) {
    contenu = entete("Test final terminé", "Les huit situations sont résolues", "Tu peux maintenant conserver ton diplôme Bull-Out.") + action("#diplome", "Voir mon diplôme →");
  } else {
    contenu = entete("Fin de la formation", "Le test final", "Une situation à la fois. Après chaque réponse, lis l’explication. Tu peux réessayer.") +
      `<div class="quiz-avance"><span>Question ${bonnes + 1} sur ${examen.length}</span><progress value="${bonnes}" max="${examen.length}" aria-label="Questions validées"></progress></div>` +
      exercice(examen[bonnes], false, '<button type="button" class="button primary" data-suite>Continuer →</button>');
  }
  return `<div class="course-layout">${sommaire("#quiz-final")}<article class="course-paper">${contenu}</article></div>`;
}

function diplome() {
  const contenu = !dateDiplome
    ? entete("Diplôme Bull-Out", "Ton diplôme de formation", "Il se débloque après les huit chapitres et le test final.") + action(acquis.size < chapitres.length ? ancreChapitre(prochaineLecture()) : "#quiz-final", "Continuer la formation")
    : entete("Étape 1 terminée", "Ton diplôme Bull-Out", "Conserve cette image. Elle ouvre le questionnaire aujourd’hui et lors d’une prochaine visite.") +
      `<label class="prenom">Prénom sur le diplôme (facultatif)<input id="prenom" maxlength="32" autocomplete="off"></label>
      <canvas id="apercu-diplome" width="1600" height="960" role="img" aria-label="Diplôme Bull-Out de prévention de l’épuisement professionnel"></canvas>
      <div class="parcours-tools"><button type="button" class="button primary" data-diplome>Télécharger mon diplôme PNG</button>
      <a id="ouvrir-test" class="button secondary" href="#questionnaire" ${ouvert ? '' : 'hidden'}>Commencer le test personnel →</a></div>${statut}`;
  return `<div class="course-layout">${sommaire("#diplome")}<article class="course-paper">${contenu}</article></div>`;
}

function porteHTML() {
  const lienFormation = dateDiplome ? "#diplome" : acquis.size ? (prochaineLecture() < 0 ? "#quiz-final" : ancreChapitre(prochaineLecture())) : "#formation";
  return `<div class="course-paper gate">${entete("Étape 2 · Le test personnel", "Ouvrir le test Bull-Out", "Ton diplôme de formation ouvre les huit parties du questionnaire. À la fin, tu obtiens ton rapport personnel.")}
    <div class="gate-choices"><section><h2>J’ai mon diplôme</h2><p>Choisis ton diplôme PNG ou ton fichier de progression Bull-Out. Il est lu dans cet onglet.</p>${choixFichier("Choisir mon fichier")}${statut}</section>
    <section><h2>${dateDiplome ? "Ma formation est terminée" : "Je suis la formation"}</h2><p>Huit chapitres, des exercices corrigés et un test final pour apprendre à lire le rapport.</p>${action(lienFormation, dateDiplome ? "Retrouver mon diplôme" : "Accéder à la formation")}</section></div>
    <a href="agir.html#aide">Accéder directement aux ressources d’aide →</a></div>`;
}

function afficher(focus = true) {
  const hash = location.hash || "#questionnaire";
  const numero = /^#chapitre-([1-8])$/.exec(hash);
  const enFormation = Boolean(numero) || ["#formation","#quiz-final","#diplome"].includes(hash);
  const demandeRapport = hash === "#results" || hash === "#rapport" || hash.startsWith("#rapport-");
  const vue = enFormation ? formation : !ouvert ? porte : demandeRapport && rapport.dataset.ready ? rapport : questionnaire;
  if (demandeRapport && vue !== rapport) history.replaceState(null, "", "#questionnaire");
  const ancien = page;
  page = enFormation ? hash : vue.id;
  vues.forEach(v => v.hidden = v !== vue);
  document.body.classList.toggle("lecture-rapport", vue === rapport);
  document.querySelectorAll(".site-nav .nav-direct").forEach(a => {
    if (a.hash === (enFormation ? "#formation" : "#questionnaire")) a.setAttribute("aria-current","page");
    else a.removeAttribute("aria-current");
  });
  if (enFormation) {
    const html = numero ? chapitre(Number(numero[1])-1) : hash === "#quiz-final" ? quiz() : hash === "#diplome" ? diplome() : intro();
    formation.innerHTML = '<div class="course-wrap">' + html + '</div>';
    if ($("#prenom")) {
      $("#prenom").value = prenom;
      actualiserImage();
      document.fonts.ready.then(actualiserImage);
    }
  } else if (vue === porte) porte.innerHTML = porteHTML();
  else if (vue === rapport) {
    $("#rapport-date").textContent = "Établi le " + new Intl.DateTimeFormat("fr-FR", { dateStyle:"long" }).format(new Date()) + " · " + form.querySelectorAll("input:checked").length + " réponses";
  }
  document.title = (vue.querySelector("h1")?.textContent || "Le parcours") + " · Bull-Out";
  if (vue === rapport && hash.startsWith("#rapport-")) document.getElementById(hash.slice(1))?.scrollIntoView();
  else if (focus && ancien !== page) {
    vue.querySelector("h1")?.focus({preventScroll:true});
    window.scrollTo({top:0, behavior:"instant"});
  }
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

const controles = [...form.querySelectorAll('input[type="radio"]')].filter(r => !r.name.startsWith("alert"));
function enregistrer(btn) {
  const reponses = questionnaire.hidden ? {} : Object.fromEntries(
    controles.filter(r => r.checked).map(r => [r.name, r.value])
  );
  const progression = { format, chapitres:[...acquis], bonnes, dateDiplome, ouvert, reponses };
  telecharger(new Blob([JSON.stringify(progression)], {type:"application/json"}), "bull-out-progression.json");
  message(btn, "Progression téléchargée. Garde ce fichier pour reprendre.");
}

function message(el, msg) {
  const parent = el.closest(".course-file, .gate-choices section, .course-paper, #questionnaire");
  const zone = parent?.querySelector(".file-status");
  if (zone) zone.textContent = msg;
}

function restaurer(p) {
  // Les anciens diplômes ouvrent toujours le test. Pour un cours interrompu,
  // seules les unités équivalentes sont reprises, le nouveau quiz repart au début.
  if (p?.format === "bull-out-progression-1" && Array.isArray(p.chapitres)) {
    const correspondance = [1, 2, 3, 5, 6];
    const anciens = p.chapitres;
    const termine = anciens.length === 5 && p.bonnes === 8 && Boolean(p.dateDiplome);
    if (new Set(anciens).size !== anciens.length || !anciens.every(i => Number.isInteger(i) && i >= 0 && i < 5) ||
        !Number.isInteger(p.bonnes) || p.bonnes < 0 || p.bonnes > 8 || (p.bonnes > 0 && anciens.length !== 5) ||
        (!termine && (p.dateDiplome !== null || p.ouvert || p.bonnes === 8))) throw new Error("Ancienne progression incohérente.");
    p = { ...p, format, chapitres: termine ? chapitres.map((_, i) => i) : anciens.map(i => correspondance[i]), bonnes: termine ? examen.length : 0 };
  }
  if (p?.format === "bull-out-progression-2" && Array.isArray(p.chapitres)) {
    p = { ...p, format, chapitres: p.chapitres.map(i => i === 0 ? 1 : i === 1 ? 0 : i) };
  }
  const sansErreur = p?.format === format && Array.isArray(p.chapitres) && p.chapitres.length <= chapitres.length &&
    p.chapitres.every(i => Number.isInteger(i) && i >= 0 && i < chapitres.length) &&
    new Set(p.chapitres).size === p.chapitres.length && Number.isInteger(p.bonnes) && p.bonnes >= 0 && p.bonnes <= examen.length &&
    (p.bonnes === 0 || p.chapitres.length === chapitres.length) && typeof p.ouvert === "boolean" &&
    (p.bonnes === examen.length ? /^\d{4}-\d\d-\d\d$/.test(p.dateDiplome) && Number.isFinite(Date.parse(p.dateDiplome)) : p.dateDiplome === null && !p.ouvert) &&
    p.reponses && typeof p.reponses === "object" && !Array.isArray(p.reponses);
  if (!sansErreur) throw new Error("Ce fichier ne correspond pas à une progression Bull-Out valide.");
  const selections = Object.entries(p.reponses).map(([nom, valeur]) => controles.find(r => r.name === nom && r.value === valeur));
  if (selections.some(r => !r) || (selections.length && !p.ouvert)) throw new Error("Les réponses de ce fichier sont illisibles.");
  form.reset();
  selections.forEach(r => r.checked = true);
  form.dispatchEvent(new Event("bullout:restored"));
  acquis = new Set(p.chapitres);
  bonnes = p.bonnes;
  ouvert = p.ouvert;
  dateDiplome = p.dateDiplome;
  prenom = "";
  return ouvert ? "#questionnaire" : dateDiplome ? "#diplome" : prochaineLecture() < 0 ? "#quiz-final" : ancreChapitre(prochaineLecture());
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
  } catch (e) {
    message(input, e instanceof SyntaxError ? "Fichier illisible. Choisis un fichier de progression Bull-Out." : e.message);
  } finally { input.value = ""; }
}

function corrigerEntrainement(btn) {
  const chapitreActuel = chapitres[Number(page.split("-")[1]) - 1];
  const [, , bonne, explications] = chapitreActuel.entrainement;
  const choix = Number(btn.dataset.entrainement);
  const bloc = btn.closest(".course-warmup");
  bloc.querySelectorAll("[data-entrainement]").forEach(option => {
    const selection = option === btn;
    const correcte = Number(option.dataset.entrainement) === bonne;
    option.classList.toggle("juste", selection && correcte);
    option.classList.toggle("a-revoir", selection && !correcte);
    option.setAttribute("aria-pressed", String(selection));
  });
  $(".correction", bloc).textContent = explications[choix];
}

function repondre(btn) {
  const final = page === "#quiz-final";
  const i = final ? bonnes : Number(page.split("-")[1])-1;
  const q = final ? examen[i] : chapitres[i].exercice;
  const bloc = btn.closest(".course-exo");
  const ok = Number(btn.dataset.reponse) === q[2];
  $(".correction",bloc).textContent = (ok ? "Exact. " : "À revoir. ") + q[3] + (ok ? "" : " Essaie à nouveau.");
  if (!ok) { btn.classList.add("a-revoir"); return; }
  btn.classList.add("juste");
  bloc.querySelectorAll("[data-reponse]").forEach(b => b.disabled = true);
  if (final) {
    bonnes++;
    if (bonnes === examen.length) dateDiplome = dateLocale();
    $("progress",formation).value = bonnes;
    $("[data-suite]",bloc).textContent = bonnes === examen.length ? "Voir mon diplôme →" : "Question suivante →";
  } else {
    acquis.add(i);
    $(".course-rail", formation).outerHTML = sommaire(page);
  }
  $(".exo-suite",bloc).hidden = false;
  $(".exo-suite",bloc).firstElementChild.focus({preventScroll:true});
}

document.addEventListener("click", async e => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.hasAttribute("data-entrainement")) corrigerEntrainement(btn);
  if (btn.hasAttribute("data-reponse")) repondre(btn);
  if (btn.hasAttribute("data-suite")) {
    if (bonnes === examen.length) location.hash = "diplome";
    else { afficher(false); $("#exo-question").focus(); }
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
document.addEventListener("change", e => { if (e.target.matches("[data-import]")) importer(e.target); });
document.addEventListener("input", e => {
  if (e.target.id === "prenom") { prenom = e.target.value; actualiserImage(); }
});
window.addEventListener("hashchange", () => afficher());
afficher(false);
