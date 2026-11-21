"use strict";

// Exécution : node --test tests/mesures-rapport.test.cjs
// Aucun navigateur, réseau ou package externe requis.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(ROOT, name), "utf8");

function debugApi(responses = null) {
  // Tester aussi le calcul en situation complète, sans navigateur ni dépendance externe.
  const form = responses && {
    querySelector(selector) {
      const match = /input\[name="([^"]+)"\]:checked/.exec(selector);
      const name = match?.[1];
      if (!name || !Object.prototype.hasOwnProperty.call(responses, name)) return null;
      return { value: String(responses[name]) };
    }
  };
  const window = { addEventListener() {}, innerHeight: 800 };
  const document = {
    querySelector(selector) { return selector === "#burnout-form" ? form : null; },
    querySelectorAll() { return []; },
    addEventListener() {}, body: { className: "", classList: { contains() { return false; } } },
    title: "Bull-Out test"
  };
  const context = { window, document, console: { debug() {}, warn() {}, error() {} },
    navigator: {}, location: { hash: "", pathname: "/test", href: "https://example.invalid/test" } };
  // Respecter l'ordre de chargement réel de test.html : données BS avant moteur.
  vm.runInNewContext(read("bullshitometre-data.js"), context, { filename: "bullshitometre-data.js" });
  vm.runInNewContext(read("absurde.js"), context, { filename: "absurde.js" });
  vm.runInNewContext(read("script.js"), context, { filename: "script.js" });
  assert.ok(window.BullOutDebug, "API de test absente");
  return window.BullOutDebug;
}

function composerRapport() {
  // Le schéma (schema.js) est inliné : mêmes fonctions que dans le navigateur, sans les mots-clés de module.
  const schema = read("schema.js").replace(/^export\s+/gm, "");
  const code = "const { schemaDouble } = (() => {\n" + schema + "\nreturn { schemaDouble };\n})();\n" + read("rapport.js")
    .replace(/^import\s+\{\s*chapitres\s*\}\s+from\s+["']\.\/formation-contenu\.js["'];?\s*/m, "")
    .replace(/^import\s+\{\s*schemaDouble\s*\}\s+from\s+["']\.\/schema\.js["'];?\s*/m, "");
  const root = { addEventListener() {}, querySelectorAll() { return []; }, querySelector() { return null; } };
  const document = { querySelector() { return root; }, addEventListener() {} };
  const window = { addEventListener() {} };
  const chapitres = Array.from({ length: 11 }, (_, i) => ({
    court: "Chapitre " + (i + 1), piece: { nom: "Pièce " + (i + 1) }
  }));
  return new Function("document", "window", "chapitres", code + "\nreturn composer;")(document, window, chapitres);
}

const api = debugApi();
const composer = composerRapport();
const ratingLabels = ["0 - jamais", "1 - rarement", "2 - parfois", "3 - souvent", "4 - presque toujours"];

function fixture(value, alertes = [false, false, false]) {
  const sectionResults = {}, answers = [];
  for (const section of api.sections) {
    const risk = section.reversed ? 4 - value : value;
    const score = risk * section.questions.length;
    const rawValues = Array(section.questions.length).fill(value);
    const values = Array(section.questions.length).fill(risk);
    sectionResults[section.id] = {
      id: section.id, title: section.title, shortTitle: section.shortTitle,
      score, rawValues, values, level: api.getLevel(score),
      percent: Math.round(score / 24 * 100), highItems: [], maxItems: [], comment: "Valeurs de test"
    };
    section.questions.forEach((question, index) => answers.push({
      id: section.id + (index + 1), sectionId: section.id,
      sectionTitle: section.shortTitle, rawScore: value, riskScore: risk,
      question, humanLabel: question, interpretation: "Réponse déclarée", action: "Examiner cette réponse"
    }));
  }
  const sectionScores = Object.fromEntries(Object.entries(sectionResults).map(([k, v]) => [k, v.score]));
  const totalScore = Object.values(sectionScores).reduce((sum, n) => sum + n, 0);
  const hasAlert = alertes.some(Boolean);
  const profile = api.determineProfile(sectionScores, totalScore, hasAlert);
  return {
    result: {
      sectionResults, sectionScores, answers, hasAlert, profile, totalScore,
      totalLevel: api.getGlobalLevel(totalScore, hasAlert), summary: "Résumé fictif",
      alertAnswers: alertes.map((yes, i) => ({ yes, question: api.alertQuestions[i], answered: true })),
      contextAnswers: api.contextQuestions.map((context) => ({ ...context, yes: false, answered: true })),
      strengthAnswers: api.strengthPart.questions.map((question, i) => ({ id: "G" + (i + 1), question, value })),
      exchangeAnswers: api.exchangePart.questions.map((question, i) => ({ id: "R" + (i + 1), question, value })),
      rpsAnswers: api.rpsPart.questions.map((question, i) => ({ id: "RPS" + (i + 1), question, value })),
       temporalAnswers: api.temporalPart.questions.map((question, i) => {
        const n = i === 0 ? 2 : i === 1 ? 1 : i === 2 ? 0 : value;
        return { id: "T" + (i + 1), question: question.text, value: n, answer: question.options[n].text };
      }),
      bullshit: { percent: 0, dims: { meeting: 0, dashboard: 0, ghost: 0, absurd: 0 }, answers: [],
        profil: { titre: "Profil fictif", texte: "Pour test", survie: "Test", phrase: "Exemple" } },
      modelReadings: [0, 1, 2].map(() => ({ lines: ["Lecture fictive"] })),
      dominantDimensions: Object.values(sectionResults).slice(0, 2), topItems: answers.slice(0, 4),
      actions: [{ title: "Action fictive", text: "À examiner" }],
      stakeholderRecommendations: [{ key: "manager", why: "Test", stakeholder: { name: "Manager" } }],
      plans: { plan72h: [{ title: "À court terme", items: ["Examiner"] }],
        twoWeeks: [{ title: "À deux semaines", items: ["Réexaminer"] }] }
    },
    sections: api.sections, strengthPart: api.strengthPart, exchangePart: api.exchangePart,
    temporalPart: api.temporalPart, rpsPart: api.rpsPart,
    bullshitPart: api.bullshitPart, bsDims: [["meeting", "Réunionite"]],
    ratingLabels
  };
}

test("le questionnaire compte 88 questions, dont 13 satiriques, 4 réactions à l'humour, 2 sur l'absurde et 6 sur le travail au quotidien, non notées", () => {
  assert.equal(api.sections.length, 6);
  assert.ok(api.sections.every((s) => s.questions.length === 6));
  assert.equal(api.strengthPart.questions.length, 6);
  assert.equal(api.exchangePart.questions.length, 6);
  assert.equal(api.bullshitPart.questions.length, 13);
  assert.equal(api.humorReactionPart.questions.length, 4);
  assert.equal(api.absurdeReactionPart.questions.length, 2);
  assert.equal(api.contextQuestions.length, 8);
  assert.equal(api.alertQuestions.length, 3);
  assert.equal(api.temporalPart.questions.length, 4);
  assert.equal(api.rpsPart.questions.length, 6);
  assert.equal(6 * 6 + 6 + 6 + 6 + 13 + 4 + 2 + 8 + 3 + 4, 88);
});

test("un total maximal ne déclenche pas d'alerte à lui seul", () => {
  assert.equal(api.getGlobalLevel(144, false).label, "non interprété");
  const s = { A: 24, B: 24, C: 24, D: 24, E: 24, F: 24 };
  assert.notEqual(api.determineProfile(s, 144, false).key, "alert");
  assert.equal(api.determineProfile(s, 144, true).key, "alert");
});

test("les six niveaux restent des seuils descriptifs internes", () => {
  assert.equal(api.getLevel(6).label, "faible");
  assert.equal(api.getLevel(7).label, "vigilance");
  assert.equal(api.getLevel(12).label, "vigilance");
  assert.equal(api.getLevel(13).label, "élevé");
  assert.equal(api.getLevel(19).label, "alerte"); // clé historique, traduite par « très élevé »
});

for (const value of [0, 1, 2, 3, 4]) {
  test("le rapport se compose avec toutes les réponses à " + value, () => {
    const html = composer(fixture(value));
    // Mêmes trois zones partout (accueil, formation, rapport), sans lettres de questionnaire dans le schéma.
    assert.match(html, /LE TRAVAIL/);
    assert.match(html, /L&#39;IMPACT DANS TA VIE|L'IMPACT DANS TA VIE/);
    assert.match(html, />Ta fatigue</);
    assert.match(html, />Depuis quand \?</);
    assert.match(html, />L&#39;absurde<|>L'absurde</);
    assert.match(html, /Ton travail t&#39;aide-t-il assez \?|Ton travail t'aide-t-il assez \?/);
    // Les trois cadrans du rapport sont les trois jauges : ton travail, ta fatigue, les impacts.
    assert.match(html, /<p class="k">Ton travail<\/p>/);
    assert.match(html, /<p class="k">Ta fatigue<\/p>/);
    assert.match(html, /<p class="k">Les impacts<\/p>/);
    // Une réponse n'est dessinée qu'à un seul endroit ; plus de fils entre les colonnes.
    const large = html.match(/<svg class="rp-ensemble large"[\s\S]*?<\/svg>/)[0];
    assert.equal((large.match(/>Épuisement</g) || []).length, 1);
    assert.equal((large.match(/>Sommeil perturbé</g) || []).length, 1);
    assert.doesNotMatch(large, />Le retour<|>Ce qui se voit<|undefined|NaN/);
    assert.doesNotMatch(html, /Ce qui tire|Ce qui lâche|Deux repères déclarés|Épuisement \(A\)|Les fils rapprochent/);
    assert.match(html, /L'ordre des colonnes n'est pas une preuve/);
    assert.doesNotMatch(html, /≈\s*\d+\s*% de charge/i);
    assert.doesNotMatch(html, /Batterie à environ\s*\d+\s*%/);
    assert.doesNotMatch(html, /Le total, pour comparer dans le temps/);
  });
}

for (let signal = 0; signal < 3; signal += 1) {
  test("le rapport n'affiche que l'orientation associée au signal " + (signal + 1), () => {
    const flags = [false, false, false]; flags[signal] = true;
    const html = composer(fixture(1, flags));
    assert.match(html, /Au moins un signal de sécurité a été déclaré/);
    const expected = ["Idées noires ou suicidaires", "Fonctionnement très perturbé", "Symptômes physiques préoccupants"];
    assert.ok(html.includes(expected[signal]));
    for (let i = 0; i < 3; i += 1) {
      if (i !== signal) assert.equal(html.includes(expected[i]), false, "Message non concerné " + i);
    }
  });
}

test("la grille satirique n'attribue pas une protection non mesurée à l'humour", () => {
  const f = fixture(0);
  f.result.sectionResults.B.score = 0;
  f.result.bullshit.percent = 75;
  const html = composer(f);
  assert.match(html, /ne mesure ni ton usage habituel de l\u0027humour/);
  assert.doesNotMatch(html, /Ton humour est un appui/);
});

test("le rapport conserve des annexes et des options d'impression", () => {
  const html = composer(fixture(2));
  assert.match(html, /annexe-1/);
  assert.match(html, /annexe-2/);
  assert.match(html, /annexe-3/);
  assert.match(html, /name="rp-pdf"/);
});

test("une difficulté de fonctionnement seule ne suggère pas automatiquement les urgences", () => {
  const scores = { A: 6, B: 6, C: 6, D: 6, E: 6, F: 6 };
  const profil = api.determineProfile(scores, 36, true);
  const recommandations = api.getRecommendedStakeholders(
    scores, [{ yes: false }, { yes: true }, { yes: false }], profil, []
  );
  assert.equal(recommandations.some((r) => r.key === "emergency"), false);
  const pourIdeesSuicidaires = api.getRecommendedStakeholders(
    scores, [{ yes: true }, { yes: false }, { yes: false }], profil, []
  );
  assert.equal(pourIdeesSuicidaires.some((r) => r.key === "emergency"), true);
});

test("les réponses aux questions d'alerte restent exclues du fichier de progression", () => {
  const src = read("parcours.js");
  assert.match(src, /filter\(r => !r\.name\.startsWith\("alert"\)\)/);
  assert.match(src, /const progression = \{ format, versionFormation: VERSION_FORMATION, versionQuestions: "2026-11-rps-v1", versionBullshitometre: "2026-11-bs-v3", versionReactionHumour: "2026-11-hr-v2", versionReactionAbsurde: "2026-11-ra-v1", chapitres: \[\.\.\.acquis\], bonnes, dateDiplome, ouvert, reponses \}/);
});

test("l'exemple d'accueil ne simule plus de pourcentage d'énergie", () => {
  const html = read("index.html");
  assert.match(html, /id="bo-fill-a"/);
  assert.match(html, /id="bo-fill-f"/);
  assert.match(html, />Épuisement</);
  assert.match(html, />Mal à récupérer</);
  assert.doesNotMatch(html, /partie A|· F</);
  assert.match(html, /class="bo-legende"/);
  assert.doesNotMatch(html, /id="bo-pct"[^>]*>\d+ %/);
});


function pageDuRapport(html, id) {
  const start = html.indexOf('data-page="' + id + '"');
  assert.ok(start >= 0, "Page absente : " + id);
  const next = html.indexOf('<section class="rp-page', start + 1);
  return html.slice(start, next >= 0 ? next : undefined);
}

test("le rapport commence par la synthèse, le plan et les interlocuteurs", () => {
  const html = composer(fixture(2));
  const positions = ["synthese", "plan", "portes", "travail"].map((id) => html.indexOf('data-page="' + id + '"'));
  assert.ok(positions.every((n) => n >= 0));
  assert.ok(positions.every((n, i) => i === 0 || n > positions[i - 1]), "Parcours principal mal ordonné");
  assert.match(html, /Approfondir · modèles, appuis, annexes/);
  assert.match(html, /Ce que tu vis/);
  assert.match(html, /Ce que tu décris au travail/);
  assert.match(html, /Ce sur quoi tu peux t'appuyer/);
});

test("la fiche travail ne divulgue pas les réponses sensibles du rapport personnel", () => {
  const html = composer(fixture(4, [true, false, true]));
  const fiche = pageDuRapport(html, "travail");
  assert.match(fiche, /conditions de travail/i);
  assert.match(fiche, /Contraintes à vérifier/);
  assert.match(fiche, /Ressources à examiner/);
  assert.doesNotMatch(fiche, /Idées noires ou suicidaires/);
  assert.doesNotMatch(fiche, /douleur thoracique|3114|suicidaires :/);
  assert.doesNotMatch(fiche, /mon énergie et mon sommeil|compensations pour tenir/i);
  const css = read("rapport.css");
  assert.match(css, /\.rapport\.pdf-travail \.rp-page:not\(\[data-page="travail"\]\)\s*\{ display: none !important; \}/);
  assert.match(css, /\.rapport\.pdf-travail \.rapport-cover/);
});

test("l'export Essentiel est proposé par défaut, avec option distincte pour le travail", () => {
  const html = composer(fixture(1));
  assert.match(html, /name="rp-pdf" value="court" checked/);
  assert.match(html, /name="rp-pdf" value="travail"/);
  assert.match(html, /name="rp-pdf" value="complet"/);
});

test("les sous-groupes efficacité et sens restent sur leurs dénominateurs réels", () => {
  const html = composer(fixture(4));
  assert.match(html, /16\/16/);
  assert.match(html, /8\/8/);
  assert.doesNotMatch(html, /perte de sens\s*24\/24/);
});

test("la grille INRS couvre six familles sans score RPS inventé", () => {
  const html = composer(fixture(2));
  const bloc = pageDuRapport(html, "rps");
  for (const categorie of [
    "Intensité et temps de travail", "Exigences émotionnelles",
    "Autonomie et marges de manœuvre", "Rapports sociaux au travail",
    "Conflits de valeurs", "Insécurité professionnelle"
  ]) assert.ok(bloc.includes(categorie), categorie);
  assert.match(bloc, /aucun total|six nouvelles échelles|hors score/i);
});

test("un signal D3 isolé déclenche une action d'arbitrage même si le total D reste bas", () => {
  const scores = { A: 0, B: 0, C: 0, D: 4, E: 0, F: 0 };
  const actions = api.generatePriorityActions({ sectionScores: scores, hasAlert: false,
    contextAnswers: [], answers: [{ id: "D3", sectionId: "D", riskScore: 4 }] });
  assert.ok(actions.some((a) => a.id === "D-D3" && /priorités contradictoires/.test(a.title)));
});

test("les scores bas donnent un conseil utile, pas seulement de refaire le questionnaire", () => {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  const actions = api.generatePriorityActions({ sectionScores: scores, hasAlert: false,
    contextAnswers: [], answers: [] });
  assert.ok(actions.some((a) => a.id === "maintain"));
});

test("la peur de parler ne conduit pas automatiquement vers son manager", () => {
  const scores = { A: 18, B: 12, C: 6, D: 18, E: 18, F: 12 };
  const profile = api.determineProfile(scores, 84, false);
  const c = [{ id: "fearToSpeak", yes: true }];
  const recos = api.getRecommendedStakeholders(scores,
    [{ yes: false }, { yes: false }, { yes: false }], profile, c);
  assert.equal(recos.some((r) => r.key === "manager"), false);
  const actions = api.generatePriorityActions({ sectionScores: scores, hasAlert: false,
    contextAnswers: c, answers: [] });
  assert.ok(actions.some((a) => a.id === "confidential"));
});

test("l'incapacité de fonctionner avec un conflit relationnel ne crée pas une urgence vitale automatique", () => {
  const scores = { A: 18, B: 18, C: 18, D: 18, E: 18, F: 18 };
  const profile = api.determineProfile(scores, 108, true);
  const c = [{ id: "harassment", yes: true }];
  const recos = api.getRecommendedStakeholders(scores,
    [{ yes: false }, { yes: true }, { yes: false }], profile, c);
  assert.equal(recos.some((r) => r.key === "emergency"), false);
});


test("le schéma présente quatre étapes de lecture, également sur mobile", () => {
  const html = composer(fixture(2));
  for (const etape of ["personne", "travail", "appuis", "tout"]) {
    assert.match(html, new RegExp('data-vue-etape="' + etape + '"'));
  }
  assert.match(html, /data-lecture="tout"/);
  const svgs = [...html.matchAll(/<svg class="rp-ensemble (?:large|etroit)"[^>]*>[\s\S]*?<\/svg>/g)];
  assert.equal(svgs.length, 2);
  for (const [i, match] of svgs.entries()) {
    const svg = match[0];
    for (const couche of ["work", "person", "support", "manifest"]) {
      assert.match(svg, new RegExp('class="rp-layer rp-layer-' + couche + '"'), "SVG " + i + " manque " + couche);
    }
    assert.equal((svg.match(/<g\b/g) || []).length, (svg.match(/<\/g>/g) || []).length,
      "SVG " + i + " comporte un groupe non fermé");
  }
});

test("l'impression réaffiche toutes les couches même si une étape a été sélectionnée", () => {
  const css = read("rapport.css");
  assert.match(css, /@media print\s*\{[\s\S]*?\.rp-ensemble \.rp-layer \{ opacity: 1 !important; \}/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("la satire reste choisie par la personne même avec un épuisement marqué", () => {
  const html = composer(fixture(4));
  const page = pageDuRapport(html, "absurde");
  assert.match(page, /Verdict du ministère des livrables/);
  assert.match(page, /Profil fictif/);
  assert.match(page, /Tu peux replier cette section/);
  assert.match(page, /ni un diagnostic, ni un conseil médical/);
});

test("la satire reste disponible à faible intensité, clairement séparée du commentaire scientifique", () => {
  const html = composer(fixture(0));
  const page = pageDuRapport(html, "absurde");
  assert.match(page, /Profil fictif/);
  assert.match(page, /Indice satirique/);
});


test("le carnet décrit deux et quatre semaines sans conclure à une guérison par score", () => {
  const html = composer(fixture(2));
  const carnet = pageDuRapport(html, "carnet");
  assert.match(carnet, /Dans deux semaines/);
  assert.match(carnet, /Dans quatre semaines/);
  assert.match(carnet, /Quels faits ont changé/);
  assert.match(carnet, /quelle action a été décidée/i);
  assert.match(carnet, /pas une preuve automatique/);
  assert.doesNotMatch(carnet, /score global|\d+\/144/);
});

test("les PDF court et travail sont strictement séparés par leurs règles CSS", () => {
  const css = read("rapport.css");
  // V3 : l'essentiel garde la synthèse, le plan et les interlocuteurs (les appuis sont résumés dans la synthèse).
  assert.match(css, /\.pdf-court \.rp-page:not\(\[data-page="synthese"\]\):not\(\[data-page="plan"\]\):not\(\[data-page="portes"\]\)/);
  assert.match(css, /\.rapport\.pdf-travail \.rp-page:not\(\[data-page="travail"\]\)/);
  assert.match(css, /\.rapport\.pdf-travail \.rapport-cover, \.rapport\.pdf-travail \.rp-fin/);
  const source = read("rapport.js");
  assert.match(source, /mode === "court"/);
  assert.match(source, /mode === "travail"/);
});

test("tous les contenus de santé restent hors de la fiche travail", () => {
  const html = composer(fixture(4, [true, true, true]));
  const fiche = pageDuRapport(html, "travail");
  for (const terme of ["A1", "B1", "C1", "F1", "Alerte 1", "F5", "3114", "15 / 112", "profil satirique"]) {
    assert.doesNotMatch(fiche, new RegExp(terme, "i"), "Fuite potentielle : " + terme);
  }
});


test("les réponses uniformes sont signalées dans la synthèse sans invalider le rapport", () => {
  const html = composer(fixture(2));
  const syn = pageDuRapport(html, "synthese");
  assert.match(syn, /Ces réponses se lisent-elles facilement/);
  assert.match(syn, /Certains contrastes sont peu informatifs/);
  assert.match(syn, /ne mesure ni la sincérité ni la validité clinique/);
  assert.match(syn, /Ce que tu vis/);
});

test("les différences entre dimensions restent descriptives, même lorsque les réponses varient", () => {
  const f = fixture(2);
  f.result.sectionResults.A.rawValues = [0, 1, 2, 3, 4, 2];
  f.result.sectionResults.B.rawValues = [4, 3, 2, 1, 0, 2];
  // Le rapport reçoit un ensemble de réponses variées sans les convertir en validité clinique.
  const html = composer(f);
  assert.match(html, /Ce contrôle ne mesure ni la sincérité ni la validité clinique|Cela ne valide pas pour autant le questionnaire/);
});


test("les questions révisées ne présupposent plus une protection ou une causalité", () => {
  const section = (id) => api.sections.find((s) => s.id === id);
  assert.match(section("B").questions[0], /indifférent/);
  assert.doesNotMatch(section("B").questions[0], /pour me protéger/);
  assert.match(section("F").questions[1], /Mon sommeil est perturbé/);
  assert.doesNotMatch(section("F").questions[1], /par le travail/);
  assert.match(api.strengthPart.questions[5], /arbitrage/);
});

test("T4 décrit la qualité empêchée sans entrer dans le total des six scores", () => {
  const f = fixture(4);
  assert.equal(f.result.temporalAnswers[3].value, 4);
  assert.equal(f.result.totalScore, 120); // E est inversé et reste à 0.
  const html = composer(f);
  assert.match(html, /Qualité empêchée/);
  assert.match(html, /T4/);
  assert.match(html, /hors score/);
});

test("une qualité empêchée fréquente déclenche une action de travail spécifique", () => {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  const actions = api.generatePriorityActions({ sectionScores: scores, hasAlert: false,
    answers: [], contextAnswers: [], temporalAnswers: [{ id: "T4", value: 4 }] });
  assert.ok(actions.some((a) => a.id === "quality-prevented"));
});

test("la chronologie alimente la lecture du rapport sans déduire de causalité", () => {
  const f = fixture(2);
  f.result.temporalAnswers[1] = { id: "T2", question: "Évolution", value: 2,
    answer: api.temporalPart.questions[1].options[2].text };
  f.result.temporalAnswers[2] = { id: "T3", question: "Hors travail", value: 1,
    answer: api.temporalPart.questions[2].options[1].text };
  const html = composer(f);
  assert.match(html, /Elles augmentent/);
  assert.match(html, /Mes difficultés diminuent nettement/);
  assert.match(html, /ne suffisent pas à diagnostiquer/);
});

test("la sauvegarde v7 conserve les items anciens non modifiés et avertit de ceux à refaire", () => {
  const src = read("parcours.js");
  assert.match(src, /const format = "bull-out-progression-11"/);
  assert.match(src, /versionQuestions: "2026-11-v2"/);
  assert.match(src, /reponsesReformulees/);
  assert.match(src, /Object.entries\(anciennes\).filter/);
  assert.match(src, /sont à renseigner de nouveau/);
});


test("la pause satirique peut être entièrement passée sans créer de faux score", () => {
  const f = fixture(2);
  f.result.bullshit = { skipped: true, answers: [], percent: null, dims: {}, profil: null };
  const html = composer(f);
  const bsPage = pageDuRapport(html, "absurde");
  assert.match(bsPage, /aucun indice calculé/);
  assert.doesNotMatch(bsPage, /null\s*%|0\s*% du barème/);
  assert.doesNotMatch(bsPage, /Profil fictif|À sortir en réunion/);
  assert.match(html, /Ce que tu vis/);
});

test("le bullshitomètre fait partie du parcours, les anciennes sauvegardes « passées » restent lisibles", () => {
  const code = read("script.js");
  assert.doesNotMatch(code, /data-skip-bs|data-skip-hr/);
  assert.match(code, /value="skip"/);
  assert.match(code, /selections\.every\(\(input\) => input\?\.value === "skip"\)/);
  assert.match(code, /selections\.some\(\(input\) => !input \|\| input\.value === "skip"\)/);
});

test("le moteur produit des plans fondés sur des faits, jamais sur un total de guérison", () => {
  const engine = read("script.js");
  assert.match(engine, /function buildActionPlans\(result\)/);
  assert.match(engine, /Noter la date, la tâche, la contrainte et la conséquence observable/);
  assert.match(engine, /sans faire du total A–F une mesure de guérison/);
  assert.doesNotMatch(engine, /vérifier si le score baisse, stagne ou monte/);
});


test("la qualité empêchée isolée n'est pas reclassée en situation protégée", () => {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  const repere = [{ id: "T4", value: 4 }];
  const p = api.determineProfile(scores, 0, false, repere);
  assert.notEqual(p.key, "protected");
  const sans = api.determineProfile(scores, 0, false, []);
  assert.equal(sans.key, "protected");
});

test("la qualité empêchée justifie un interlocuteur organisationnel sauf si parler est dangereux", () => {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  const temporal = [{ id: "T4", value: 4 }];
  const prof = api.determineProfile(scores, 0, false, temporal);
  const alerts = [{ yes: false }, { yes: false }, { yes: false }];
  const noRisk = api.getRecommendedStakeholders(scores, alerts, prof, [], temporal);
  assert.ok(noRisk.some((x) => x.key === "manager"));
  const afraid = api.getRecommendedStakeholders(scores, alerts, prof,
    [{ id: "fearToSpeak", yes: true }], temporal);
  assert.equal(afraid.some((x) => x.key === "manager"), false);
});


function completeAnswers(options = {}) {
  const source = debugApi();
  const inputs = {};
  for (const section of source.sections) {
    for (let i = 0; i < section.questions.length; i++) {
      inputs[section.id + (i + 1)] = section.reversed ? 4 : 0;
    }
  }
  for (let i = 0; i < source.strengthPart.questions.length; i++) inputs["G" + (i + 1)] = 2;
  for (let i = 0; i < source.exchangePart.questions.length; i++) inputs["R" + (i + 1)] = 2;
  for (let i = 0; i < source.temporalPart.questions.length; i++) inputs["T" + (i + 1)] = 1;
  for (let i = 0; i < source.rpsPart.questions.length; i++) inputs["RPS" + (i + 1)] = 0;
  for (let i = 0; i < source.contextQuestions.length; i++) inputs["context" + (i + 1)] = "no";
  for (let i = 0; i < source.alertQuestions.length; i++) inputs["alert" + (i + 1)] = "no";
  for (let i = 0; i < source.bullshitPart.questions.length; i++) {
    inputs["BS" + (i + 1)] = options.skipBS ? "skip" : 0;
  }
  for (let i = 0; i < source.humorReactionPart.questions.length; i++) {
    inputs["HR" + (i + 1)] = options.skipBS || options.skipHR ? 5 : 0;
  }
  for (let i = 0; i < (source.absurdeReactionPart?.questions.length || 0); i++) {
    inputs["RA" + (i + 1)] = options.skipBS ? 4 : 0;
  }
  return { ...inputs, ...(options.overrides || {}) };
}

test("le moteur exécute les 88 réponses avec la pause satirique passée", () => {
  const data = completeAnswers({ skipBS: true });
  const engine = debugApi(data);
  const result = engine.calculateResults();
  assert.ok(result);
  assert.equal(result.totalScore, 0);
  assert.equal(result.temporalAnswers.length, 4);
  assert.equal(result.questionnaireVersion, "2026-11-rps-v1");
  assert.equal(result.rpsAnswers.length, 6);
  assert.equal(result.bullshit.skipped, true);
  assert.equal(result.bullshit.percent, null);
  assert.equal(result.hasAlert, false);
  assert.match(composer({ ...fixture(0), result: { ...fixture(0).result, ...result,
    modelReadings: result.modelReadings,
    plans: { plan72h: [], twoWeeks: [] } } }), /ne contient pas de réponses aux questions satiriques/);
});

test("le moteur calcule un indice satirique uniquement après douze réponses réelles", () => {
  const data = completeAnswers();
  const normal = debugApi(data).calculateResults();
  assert.ok(normal);
  assert.equal(normal.bullshit.skipped, false);
  assert.ok(Number.isFinite(normal.bullshit.percent));
  assert.ok(normal.bullshit.percent >= 0 && normal.bullshit.percent <= 100);
  const partiallySkipped = { ...data, BS3: "skip" };
  assert.equal(debugApi(partiallySkipped).calculateResults(), null);
});

test("une alerte et une qualité empêchée isolée agissent indépendamment du score A–F", () => {
  const data = completeAnswers({ skipBS: true, overrides: { alert2: "yes", T4: 4 } });
  const result = debugApi(data).calculateResults();
  assert.ok(result);
  assert.equal(result.totalScore, 0);
  assert.equal(result.hasAlert, true);
  assert.notEqual(result.profile.key, "protected");
  assert.ok(result.actions.some((a) => a.id === "quality-prevented"));
  assert.equal(result.stakeholderRecommendations.some((a) => a.key === "emergency"), false);
});

test("une réponse manquante dans T empêche la fabrication d'un rapport complet", () => {
  const answers = completeAnswers({ skipBS: true });
  delete answers.T2;
  assert.equal(debugApi(answers).calculateResults(), null);
});


test("le bullshitomètre V3 : 13 questions ancrées sur 4 semaines, chutes gardées, « pas concerné·e » hors calcul", () => {
  const source = debugApi();
  const q = source.bullshitPart.questions;
  assert.equal(q.length, 13);
  assert.match(q[1].text, /4 dernières semaines/);
  assert.match(q[5].options[3].text, /grotte SharePoint/);
  assert.match(q[3].options[2].text, /groupe Teams/);
  assert.match(q[12].text, /ne devraient pas être les tiennes/);
  for (const question of q) {
    assert.equal(question.options.length, 5);
    assert.equal(question.options[4].w, null);
    assert.match(question.options[4].text, /Pas concerné·e/);
    // A = situation saine, poids nul ; D = la chute la plus absurde.
    assert.equal(question.options[0].w.absurd, 0);
    assert.ok(question.options[3].w.absurd >= question.options[2].w.absurd);
  }
});

test("« pas concerné·e » sort la question du calcul, sans la compter comme saine", () => {
  const base = Object.fromEntries(Array.from({ length: 13 }, (_, i) => ["BS" + (i + 1), 3]));
  const tout = debugApi(completeAnswers({ overrides: base })).calculateResults();
  const sansTableau = debugApi(completeAnswers({ overrides: { ...base, BS3: 4, BS12: 4 } })).calculateResults();
  assert.equal(tout.bullshit.percent, 100);
  assert.equal(sansTableau.bullshit.percent, 100, "Deux questions non concernées ne font pas baisser l'indice");
  assert.equal(sansTableau.bullshit.concerned, 11);
  const rien = debugApi(completeAnswers({ overrides: Object.fromEntries(Array.from({ length: 13 }, (_, i) => ["BS" + (i + 1), 4])) })).calculateResults();
  assert.equal(rien.bullshit.percent, null);
  assert.equal(rien.lectureAbsurde.score.n, null);
});

test("l’indice général et l’absurdité globale ont exactement la même valeur", () => {
  for (const response of [0, 1, 2, 3]) {
    const input = completeAnswers({ overrides: Object.fromEntries(
      Array.from({ length: 13 }, (_, index) => ["BS" + (index + 1), response])) });
    const result = debugApi(input).calculateResults();
    assert.ok(result);
    assert.equal(result.bullshit.count, 13);
    assert.equal(result.bullshit.percent, result.bullshit.dims.absurd);
    assert.equal(result.bullshit.version, "2026-11-bs-v3");
  }
});

test("les quatre cadrans distinguent l’absurdité du retrait et du sens", () => {
  const api = debugApi();
  const responses = completeAnswers();
  const full = api.sections;
  const make = (b,c3,c5) => ({
    B: {score:b}, C:{values:[0,0,c3,0,c5,0]}
  });
  const high = {skipped:false,percent:90};
  const low = {skipped:false,percent:5};
  for (const [bs,sections,key] of [
    [high, make(0,0,0), "hb"], [high,make(18,0,0),"hh"],
    [low,make(18,0,0),"bh"],[low,make(0,0,0),"bb"],
    [high,make(0,3,2),"hh"]
  ]) {
    const matrix = api.analyseBullshitMatrix(bs,sections);
    assert.equal(matrix.key,key);
    assert.ok(matrix.interpretation);
    assert.ok(matrix.question);
    assert.ok(matrix.joke);
  }
  assert.equal(api.analyseBullshitMatrix({skipped:true,percent:null},make(20,4,4)),null);
});

test("la matrice du rapport explique ses axes, affiche l’humour et une question concrète", () => {
  const input = completeAnswers({overrides: Object.fromEntries(Array.from({length:12},(_,i)=>["BS"+(i+1),3]))});
  const engine = debugApi(input).calculateResults();
  assert.ok(engine.bullshit.matrix);
  const report = composer({...fixture(2),result:{...fixture(2).result,...engine,
    plans:fixture(2).result.plans}});
  const page = pageDuRapport(report,"absurde");
  assert.match(page,/Le paradoxe intéressant/);
  assert.match(page,/Absurdité haute/);
  assert.match(page,/Distance \/ sens/);
  assert.match(page,/Question anti-bullshit|Une question utile/);
  assert.match(page,/Verdict du ministère/);
  assert.match(page,/Retrouver mes 13 réponses/);
});

test("l’ancienne sauvegarde v7 ne renumérote pas BS1–BS8 et respecte le saut volontaire", () => {
  const code = read("parcours.js");
  assert.match(code,/p\?\.format === "bull-out-progression-7"/);
  assert.match(code,/Array\.from\(\{ length: 8 \}/);
  assert.match(code,/BS\$\{i\}/);
  assert.match(code,/i = 9; i <= 12/);
  assert.match(code,/versionBullshitometre: "2026-11-bs-v2"/);
});


test("la migration réelle d'un BS v7 complet conserve les huit réponses sans les décaler", () => {
  const src = read("parcours.js");
  const match = src.match(/function migrerBullshitometreV7\(reponses\) \{[\s\S]*?\n\}/);
  assert.ok(match,"Fonction de migration absente");
  const migrate = new Function(match[0] + ";return migrerBullshitometreV7;")();
  const old = Object.fromEntries(Array.from({length:8},(_,i)=>["BS"+(i+1),String(i%4)]));
  const migrated = migrate(old);
  for(let i=1;i<=8;i++) assert.equal(migrated["BS"+i],old["BS"+i]);
  for(let i=9;i<=12;i++) assert.equal(migrated["BS"+i],undefined);
  assert.equal(Object.keys(migrated).length,8);
});

test("la migration réelle respecte le saut volontaire des huit questions BS en v7", () => {
  const source = read("parcours.js").match(/function migrerBullshitometreV7\(reponses\) \{[\s\S]*?\n\}/);
  const migrate = new Function(source[0] + ";return migrerBullshitometreV7;")();
  const old = Object.fromEntries(Array.from({length:8},(_,i)=>["BS"+(i+1),"skip"]));
  const migrated = migrate({...old,D1:"3"});
  assert.equal(migrated.D1,"3");
  for(let i=1;i<=12;i++) assert.equal(migrated["BS"+i],"skip");
  const mixed = migrate({...old,BS1:"1"});
  assert.equal(mixed.BS1,"1");
  assert.equal(mixed.BS9,undefined,"Ne pas confondre réponse partielle et saut complet");
});


test("les quatre questions d'expérience de l'humour restent distinctes, avec « je préfère ne pas répondre »", () => {
  const part = api.humorReactionPart;
  assert.equal(part.id, "HR");
  assert.equal(part.questions.length, 4);
  assert.match(part.questions[0].text, /amusé·e|sourire/);
  assert.match(part.questions[1].text, /peine|mal à l.aise/);
  assert.match(part.questions[2].text, /minimisaient les difficultés/);
  assert.match(part.questions[3].text, /prendre un peu de recul/);
  assert.ok(part.questions.every(q => q.options.length === 6 && q.options[5].text.includes("préfère")));
});

test("une personne peut rire et être peinée à la fois, sans étiquette clinique", () => {
  const data = completeAnswers({overrides: {HR1:4,HR2:4,HR3:4,HR4:1}});
  const r = debugApi(data).calculateResults();
  assert.ok(r);
  assert.equal(r.humorReaction.skipped,false);
  assert.equal(r.humorReaction.interpretation.mixedEmotions,true);
  assert.equal(r.humorReaction.interpretation.minimizationPerceived,true);
  assert.match(r.humorReaction.interpretation.text,/minimisaient tes difficultés/);
  assert.match(r.humorReaction.interpretation.title,/fait rire.*touche/);
  assert.match(r.humorReaction.interpretation.warning,/aucun score clinique/);
  assert.equal(r.humorReaction.answers.length,4);
});

test("prise de recul déclarée et rire sont deux réactions distinctes", () => {
  const response = completeAnswers({overrides:{HR1:0,HR2:0,HR3:2,HR4:4}});
  const r = debugApi(response).calculateResults();
  assert.ok(r);
  assert.match(r.humorReaction.interpretation.title,/Du recul, même sans grand éclat de rire/);
  assert.equal(r.humorReaction.interpretation.perceivedDistance,true);
  assert.equal(r.humorReaction.interpretation.mixedEmotions,false);
  assert.doesNotMatch(r.humorReaction.interpretation.text,/protège durablement/);
});

test("quatre réactions neutres ou non renseignées ne deviennent pas un diagnostic", () => {
  const neutral = debugApi(completeAnswers({overrides:{HR1:0,HR2:0,HR3:0,HR4:0}})).calculateResults();
  assert.ok(neutral);
  assert.match(neutral.humorReaction.interpretation.title,/réaction plus nuancée/);
  const skipped = debugApi(completeAnswers({skipHR:true})).calculateResults();
  assert.ok(skipped);
  assert.equal(skipped.humorReaction.skipped,true);
  assert.equal(skipped.humorReaction.interpretation,null);
  assert.equal(skipped.bullshit.skipped,false);
  assert.ok(Number.isFinite(skipped.bullshit.percent));
});

test("une ancienne sauvegarde où la pause humour était passée neutralise aussi le ressenti", () => {
  const result = debugApi(completeAnswers({skipBS:true})).calculateResults();
  assert.ok(result);
  assert.equal(result.bullshit.skipped,true);
  assert.equal(result.humorReaction.skipped,true);
  assert.equal(result.humorReaction.answers.length,0);
  assert.equal(result.humorReaction.interpretation,null);
});

test("le rapport restitue l'expérience de l'humour sans toucher à la matrice ou aux scores", () => {
  const r = debugApi(completeAnswers({overrides:{HR1:4,HR2:4,HR3:3,HR4:3}})).calculateResults();
  assert.ok(r);
  const state = fixture(2);
  const html = composer({...state,result:{...state.result,...r,plans:state.result.plans}});
  const page = pageDuRapport(html,"absurde");
  assert.match(page,/Et toi, comment as-tu vécu ces blagues/);
  assert.match(page,/Ça fait rire\. Et ça touche/);
  assert.match(page,/Rire, ressentir de la peine, avoir l'impression que des difficultés sont minimisées/);
  assert.match(page,/Matrice : absurdité perçue, distance et sens/);
  assert.match(page,/aucun score clinique|ne démontre pas/);
  const fiche = pageDuRapport(html,"travail");
  assert.doesNotMatch(fiche,/HR1|HR2|amusé·e|m'ont fait de la peine/i);
});

test("le rapport ne fabrique pas de réaction quand la partie a été passée", () => {
  const r = debugApi(completeAnswers({skipHR:true})).calculateResults();
  const state=fixture(0);
  const html = composer({...state,result:{...state.result,...r,plans:state.result.plans}});
  assert.match(pageDuRapport(html,"absurde"),/Tu as préféré ne pas répondre/);
  assert.doesNotMatch(pageDuRapport(html,"absurde"),/Ça fait rire\. Et ça touche/);
});

test("l'import v8 est repris en v9 et conserve la décision de passer les modules BS/HR", () => {
  const src=read("parcours.js");
  assert.match(src,/const format = "bull-out-progression-11"/);
  assert.match(src,/p\?\.format === "bull-out-progression-8"/);
  assert.match(src,/versionReactionHumour: "2026-11-hr-v2"/);
  assert.match(src,/reponses\[`HR\$\{i\}`\] = "5"/);
  assert.match(src,/i = 1; i <= 4/);
});


test("une minimisation ressentie sans peine reste un jugement sur l'humour, pas une blessure supposée", () => {
  const r = debugApi(completeAnswers({overrides:{HR1:0, HR2:0, HR3:4, HR4:0}})).calculateResults();
  assert.ok(r);
  assert.match(r.humorReaction.interpretation.title,/semblé banaliser/);
  assert.equal(r.humorReaction.interpretation.minimizationPerceived,true);
  assert.equal(r.humorReaction.interpretation.mixedEmotions,false);
  assert.doesNotMatch(r.humorReaction.interpretation.text,/t'ont peiné·e|mis·e mal à l'aise/);
});

test("on peut être amusé par la satire et trouver qu'elle minimise le problème", () => {
  const r = debugApi(completeAnswers({overrides:{HR1:4, HR2:0, HR3:4, HR4:0}})).calculateResults();
  assert.ok(r);
  assert.match(r.humorReaction.interpretation.title,/Drôle, mais peut-être trop léger/);
  assert.equal(r.humorReaction.interpretation.minimizationPerceived,true);
  assert.match(r.humorReaction.interpretation.text,/deux appréciations peuvent coexister/);
});

test("la prise de recul n'efface pas une banalisation perçue", () => {
  const r = debugApi(completeAnswers({overrides:{HR1:0, HR2:0, HR3:4, HR4:4}})).calculateResults();
  assert.ok(r);
  assert.equal(r.humorReaction.interpretation.perceivedDistance,true);
  assert.equal(r.humorReaction.interpretation.minimizationPerceived,true);
  assert.match(r.humorReaction.interpretation.text,/prise de recul sur le moment/);
  assert.match(r.humorReaction.interpretation.warning,/aucun score clinique/);
});

test("la nouvelle HR3 reste exclue des scores BS, A-F et de la matrice", () => {
  const low = debugApi(completeAnswers({overrides:{HR3:0}})).calculateResults();
  const high = debugApi(completeAnswers({overrides:{HR3:4}})).calculateResults();
  assert.equal(low.totalScore,high.totalScore);
  assert.equal(low.bullshit.percent,high.bullshit.percent);
  assert.equal(low.bullshit.matrix.key,high.bullshit.matrix.key);
  assert.equal(low.humorReaction.interpretation.minimizationPerceived,false);
  assert.equal(high.humorReaction.interpretation.minimizationPerceived,true);
  assert.equal(high.humorReactionVersion,"2026-11-hr-v2");
});


test("une sauvegarde v9 ne réattribue jamais l'ancienne réponse HR3", () => {
  const code = read("parcours.js");
  const found = code.match(/function migrerReactionHumourV9\(reponses\) \{[\s\S]*?\n\}/);
  assert.ok(found, "Migration du changement de question HR3 manquante");
  const migrate = new Function(found[0] + "\nreturn migrerReactionHumourV9;")();
  const v9 = { A1:"2", BS1:"3", HR1:"4", HR2:"1", HR3:"4", HR4:"2" };
  const migrated = migrate(v9);
  assert.equal(migrated.reponsesARelire,1);
  assert.equal(migrated.reponses.HR3,undefined);
  for (const k of ["A1","BS1","HR1","HR2","HR4"]) assert.equal(migrated.reponses[k],v9[k]);
  assert.equal(v9.HR3,"4","La migration ne modifie pas le fichier source");
});

test("une abstention explicite HR3 est conservée lors de l'import v9", () => {
  const code = read("parcours.js");
  const found = code.match(/function migrerReactionHumourV9\(reponses\) \{[\s\S]*?\n\}/);
  const migrate = new Function(found[0] + "\nreturn migrerReactionHumourV9;")();
  assert.equal(migrate({HR3:"5"}).reponses.HR3,"5");
  assert.equal(migrate({HR3:"5"}).reponsesARelire,0);
  assert.equal(migrate({HR1:"3"}).reponsesARelire,0);
  assert.equal(migrate({HR1:"3"}).reponses.HR3,undefined);
  assert.match(code,/const format = "bull-out-progression-11"/);
  assert.match(code,/versionReactionHumour: "2026-11-hr-v2"/);
});

test("les six réponses au ressenti humoristique sont lisibles sur mobile et accessibles au clavier", () => {
  const js = read("script.js"), css = read("charte.css");
  assert.match(js,/section.id === "HR" \? "choices choices-humor"/);
  assert.match(js,/inputs.length === 6 && \/\^\[1-6\]\$\/.test\(key\)/);
  assert.match(css,/\.choices-humor \{ grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(css,/@media \(max-width: 620px\)[\s\S]*?\.choices-humor/);
  assert.match(css,/\.choices-humor \.choice:last-child \{ grid-column: 1 \/ -1/);
  assert.match(js,/questions proposées, environ 15 à 20 minutes/);
});


test("la formation conserve trois modèles principaux et explique leur origine et leurs limites", () => {
  const code = read("formation-contenu.js").replace(/^export const /gm, "const ");
  const {chapitres} = new Function(code + "\nreturn {chapitres};")();
  assert.equal(chapitres.length, 11);
  assert.match(chapitres[4].court, /absurde/i);
  assert.match(chapitres[7].titre, /six familles de risques/i);
  for(const i of [1,2,3]) {
    const c=chapitres[i];
    const prose=c.blocs.filter(b=>b.t==="p").map(b=>b.html).join(" ");
    assert.match(prose,/Limite/i,`Chapitre ${i+1} : limite absente`);
    assert.match(prose,/Comment (l'utiliser|l'appliquer)|Comment l'appliquer/i,`Chapitre ${i+1} : fonctionnement absent`);
    assert.match(prose,/Maslach|Demerouti|Siegrist/i,`Chapitre ${i+1} : origine absente`);
    assert.ok(c.duree>=8,`Chapitre ${i+1} devrait annoncer plus de lecture`);
  }
  const jdr=chapitres[2];
  assert.ok(jdr.blocs.some(x=>x.t==="p" && /Hobfoll/.test(x.html)));
  assert.ok(jdr.blocs.some(x=>x.t==="p" && /Sonnentag/.test(x.html)));
});

test("la synthèse compare les quatre modèles sur les mêmes faits et ne crée pas de nouveaux scores", () => {
  const code=read("formation-contenu.js").replace(/^export const /gm,"const ");
  const {synthese}=new Function(code+"\nreturn {synthese};")();
  assert.deepEqual(Array.from(synthese.modeles.map(x=>x.nom)),["Effort-récupération","Maslach","JD-R","Siegrist"]);
  assert.equal(synthese.casCommun.lectures.length,4);
  for(const x of synthese.casCommun.lectures) {
    assert.ok(x.observe.length>20 && x.neDitPas.length>15 && x.action.length>25);
  }
  const complements=synthese.complements;
  assert.equal(complements.length,3);
  for(const name of ["Hobfoll","Gollac","Clot"]) {
    const m=complements.find(x=>x.nom.includes(name));
    assert.ok(m,`Cadre complémentaire absent : ${name}`);
    assert.match(m.limite,/pas|aucun|non|ne /i);
    assert.match(m.lien,/^https:\/\//);
  }
  const render=read("parcours.js"),css=read("formation.css");
  for(const id of ["s-croisement","s-complements"])assert.ok(render.includes(id));
  assert.match(render,/synthese\.casCommun\.lectures\.map/);
  assert.match(render,/synthese\.complements\.map/);
  assert.match(css,/fo-complement/);
});

test("le récapitulatif des trois modèles suit immédiatement le chapitre 4", () => {
  const render=read("parcours.js");
  assert.match(render,/function resumeModelesPage\(\)/);
  assert.match(render,/i === 3 \? `<a class="fo-pager-next" href="#modeles-resume">/);
  assert.match(render,/i === 4 \? `<a class="fo-pager-prev" href="#modeles-resume">/);
  assert.match(render,/hash === "#modeles-resume" \? resumeModelesPage\(\)/);
  assert.match(render,/synthese\.casCommun\.lectures\.map/);
  assert.match(render,/resume-limites/);
  const visual=read("tests/generer-pdf-exemple.mjs");
  assert.match(visual,/resume-modeles-mobile/);
  assert.match(visual,/resume-modeles-ordinateur/);
});

test("la page Méthode détaille la construction, les hypothèses testables et les inconnues", () => {
  const html=read("methode.html");
  for(const id of ["mesure","modeles-et-perimetres","construction-hypotheses","verification-inconnues","donnees-decisions","sources-limites"]) {
    assert.match(html,new RegExp('id="'+id+'"'));
  }
  for(let i=1;i<=6;i++)assert.match(html,new RegExp("H"+i+" ·"));
  assert.match(html,/sensibilité, spécificité, fidélité/i);
  assert.match(html,/pas des versions officielles validées/);
  assert.match(html,/Les 88 questions/);
  assert.match(html,/traduction automatique fournie par Google/);
  assert.match(html,/une simulation réussie valide un comportement du programme/i);
});

test("le test PDF couvre vraiment 88 réponses fictives et ne collecte aucune donnée réelle", () => {
  const js=read("tests/generer-pdf-exemple.mjs");
  const yml=read(".github/workflows/rapport-fictif.yml");
  for(const x of ["#burnout-form","calculateResults()","submit","page.pdf(","rapport-essentiel-fictif.pdf","rapport-complet-fictif.pdf","fiche-travail-fictive.pdf"]) {
    assert.ok(js.includes(x),`Élément absent du test navigateur : ${x}`);
  }
  assert.match(js,/synth\.items!==88/);
  assert.match(js,/if\(synth\.alertes\)/);
  assert.match(js,/pageErrors\.length/);
  assert.match(yml,/actions\/upload-artifact@v4/);
});

// ───────── V3 : synthèse qui commence par l'essentiel, et schéma construit au fil des chapitres.
test("la synthèse ouvre sur le feu et les trois cadrans, puis le schéma, et replie les quatre modèles", () => {
  const html = pageDuRapport(composer(fixture(3)), "synthese");
  const tete = html.indexOf('class="rp-tete"'), vue = html.indexOf('class="rp-vue"'), suite = html.indexOf('class="rp-syn-priorites"'), detail = html.indexOf('class="rp-syn-detail"'), modeles = html.indexOf('class="rp-modeles-lus"');
  assert.ok(tete > 0 && vue > tete && suite > vue && detail > suite && modeles > detail, "ordre attendu : feu et cadrans, schéma, par quoi commencer, puis le détail replié");
  assert.match(html, /Effort-récupération · ta fatigue/);
  assert.match(html, /Maslach · les pastilles M/);
  assert.match(html, /Exigences-ressources · la première pesée/);
  assert.match(html, /Effort-récompense · la seconde pesée/);
  assert.match(html, /quatre angles, pas quatre preuves/);
});

function schemaApi() {
  const code = read("schema.js").replace(/^export\s+/gm, "");
  return new Function(code + "\nreturn { schema, PIECES };")();
}

test("chaque chapitre pose sa pièce et sa règle, comme le papillon de Papillon", () => {
  const { schema, PIECES } = schemaApi();
  assert.equal(PIECES.length, 11, "une entrée par chapitre");
  assert.ok(PIECES.every((p) => p.length > 0), "aucun chapitre sans pièce");
  const halos = (svg) => (svg.match(/<rect [^>]*fill="#d8f25c"/g) || []).length;
  // Schéma vide : aucune pièce posée, aucune surlignée ; le cadre est déjà là.
  const vide = schema({ chapitre: -1 });
  assert.equal(halos(vide), 0);
  assert.match(vide, /encore vide/);
  assert.match(vide, /Depuis quand \?/);
  // Chapitre 3 : la première pesée seule est nouvelle ; la seconde reste en attente.
  const ch3 = schema({ chapitre: 2 });
  assert.equal(halos(ch3), 1);
  assert.match(ch3, /Ton travail t('|&#39;)aide-t-il assez/);
  assert.doesNotMatch(ch3, /Tu reçois/);
  // Chapitre 4 : Siegrist en deux moitiés (la pesée donner/recevoir, trop investi·e ?).
  assert.equal(halos(schema({ chapitre: 3 })), 2);
  // Chapitre 5 : l'absurde et ton recul face à lui.
  assert.equal(halos(schema({ chapitre: 4 })), 2);
  assert.doesNotMatch(schema({ chapitre: 3 }), /du travail pour rien/);
  // Chapitre 8 : les six familles de risques, en pastilles sur LE TRAVAIL (pas de boîte en plus).
  assert.match(schema({ chapitre: 7 }), /<title>Conflits de valeurs<\/title>/);
  assert.doesNotMatch(schema({ chapitre: 6 }), /<title>Conflits de valeurs<\/title>/);
  // Chapitre 7 : les trois jauges.
  assert.match(schema({ chapitre: 6 }), /Les impacts/);
  assert.doesNotMatch(schema({ chapitre: 5 }), />Les impacts</);
  // Schéma complet : tout est posé, rien n'est surligné, la sécurité reste à part.
  const complet = schema();
  assert.equal(halos(complet), 0);
  assert.match(complet, /Sécurité, toujours à part/);
  assert.equal((complet.match(/>Épuisement</g) || []).length, 1);
  for (let i = -1; i <= 11; i++) for (const etroit of [false, true]) assert.doesNotMatch(schema({ chapitre: i, etroit }), /undefined|NaN/);
});

test("la formation et l'accueil montrent le schéma du rapport", () => {
  const parcours = read("parcours.js");
  assert.match(parcours, /schemaRapport\(i\)/);
  assert.match(parcours, /schemaRapport\(-1/);
  assert.match(read("index.html"), /import \{ schemaRapport \} from "\.\/formation-illustrations\.js"/);
  assert.match(read("index.html"), /Quatre façons de regarder le burn-out/);
});

test("les six compléments RPS sont hors score et exigent une réponse explicite", () => {
  const a = completeAnswers({ skipBS: true, overrides: { RPS1: 4, RPS2: 4, RPS3: 4, RPS4: 4, RPS5: 4, RPS6: 4 } });
  const result = debugApi(a).calculateResults();
  assert.ok(result);
  assert.equal(result.totalScore, 0, "les RPS ne modifient pas A–F");
  assert.equal(result.rpsAnswers.filter((r) => r.value === 4).length, 6);
  delete a.RPS3;
  assert.equal(debugApi(a).calculateResults(), null, "une nouvelle question requise manquante bloque le rapport");
});

test("RPS et humiliation restent visibles même quand les manifestations A–F sont basses", () => {
  const f = fixture(0);
  f.result.contextAnswers = f.result.contextAnswers.map((x) => ({...x, yes: x.id === "harassment"}));
  f.result.rpsAnswers = api.rpsPart.questions.map((question, i) => ({ id: "RPS" + (i + 1), question, value: i === 2 ? 4 : 0 }));
  const report = composer(f);
  // Violences déclarées : la synthèse le dit même quand l'usure est basse.
  assert.match(pageDuRapport(report, "synthese"), /À ne pas laisser de côté/);
  assert.match(pageDuRapport(report, "synthese"), /humiliations ou des violences/);
  assert.match(pageDuRapport(report, "rps"), /Les six familles de risques du travail/);
  assert.match(pageDuRapport(report, "rps"), /RPS3/);
  assert.match(pageDuRapport(report, "rps"), /Rapports sociaux au travail/);
  assert.match(pageDuRapport(report, "travail"), /RPS3/);
});

test("la synthèse ne répète pas la lecture exposition/usure quand elle ne change rien", () => {
  // Toutes les réponses au maximum : le travail pèse ET la personne est usée ; la phrase n'apporte rien.
  const f = fixture(4);
  f.result.contextAnswers = f.result.contextAnswers.map((x) => ({...x, yes: false}));
  f.result.rpsAnswers = api.rpsPart.questions.map((question, i) => ({ id: "RPS" + (i + 1), question, value: 0 }));
  assert.doesNotMatch(pageDuRapport(composer(f), "synthese"), /À ne pas laisser de côté/);
});

// ───────── L'absurde : famille de la jauge du travail, portrait du recul, migration V11
const absurde = require(path.join(ROOT, "absurde.js"));

test("l'absurde devient une famille de la jauge du travail, sur les mêmes 4 crans", () => {
  const crans = [0, 1, 2, 3].map((reponse) => {
    const r = debugApi(completeAnswers({ overrides: Object.fromEntries(Array.from({ length: 13 }, (_, i) => ["BS" + (i + 1), reponse])) })).calculateResults();
    return r.lectureAbsurde.score;
  });
  assert.equal(crans[0].n, 0);
  assert.equal(crans[0].mot, "ça va");
  assert.equal(crans[3].n, 3);
  assert.equal(crans[3].mot, "ça use beaucoup");
  assert.ok(crans[3].lignes.length > 0 && crans[3].lignes.length <= 3);
  assert.ok(crans.every((c, i) => i === 0 || c.n >= crans[i - 1].n));
});

test("une sauvegarde sans BS V3 n'invente pas de niveau d'absurde", () => {
  assert.deepEqual(absurde.scoreAbsurde({ bullshit: { skipped: true } }), { n: null, mot: "non renseigné", lignes: [] });
  assert.equal(absurde.scoreAbsurde({ bullshit: { skipped: false, version: "2026-11-bs-v2", percent: 80, dims: {} } }).n, null);
  assert.equal(absurde.reculAbsurde({}).mot, "non renseigné");
});

test("le portrait du recul croise RA1 avec la récupération et la distance, sans points", () => {
  const ra = (v1, v2 = 0) => ({ skipped: false, answers: [{ id: "RA1", value: v1 }, { id: "RA2", value: v2 }] });
  const bsHaut = { skipped: false, version: "2026-11-bs-v3", percent: 80, dims: { meeting: 80 } };
  const rire = absurde.reculAbsurde({ bullshit: bsHaut, reactionAbsurde: ra(0), sectionScores: { F: 4, B: 4 } });
  assert.match(rire.titre, /cirque/);
  const rireFatigue = absurde.reculAbsurde({ bullshit: bsHaut, reactionAbsurde: ra(0), sectionScores: { F: 18, B: 4 } });
  assert.match(rireFatigue.titre, /récupères mal/);
  const rumine = absurde.reculAbsurde({ bullshit: bsHaut, reactionAbsurde: ra(2), sectionScores: { F: 18 } });
  assert.match(rumine.texte, /pas un manque d'humour/);
  assert.match(rumine.texte, /récupération le confirme/);
  const retrait = absurde.reculAbsurde({ bullshit: bsHaut, reactionAbsurde: ra(3, 3), sectionScores: { B: 16 } });
  assert.match(retrait.titre, /cessé d'attendre du sens/);
  assert.equal(retrait.lignes[1].mot, "plutôt en solo");
  // Aucun score caché : le portrait ne renvoie que des mots.
  for (const p of [rire, rireFatigue, rumine, retrait]) assert.deepEqual(Object.keys(p).sort(), ["lignes", "mot", "texte", "titre"]);
});

test("RA1 et RA2 n'entrent dans aucun score A–F ni dans l'indice satirique", () => {
  const a = debugApi(completeAnswers({ overrides: { RA1: 0, RA2: 0 } })).calculateResults();
  const b = debugApi(completeAnswers({ overrides: { RA1: 3, RA2: 3 } })).calculateResults();
  assert.equal(JSON.stringify(a.sectionScores), JSON.stringify(b.sectionScores));
  assert.equal(a.totalScore, b.totalScore);
  assert.equal(a.bullshit.percent, b.bullshit.percent);
  assert.notEqual(a.lectureAbsurde.recul.titre, b.lectureAbsurde.recul.titre);
  const refus = debugApi(completeAnswers({ overrides: { RA1: 4, RA2: 4 } })).calculateResults();
  assert.ok(refus, "« Je préfère ne pas répondre » est une réponse valide");
  assert.equal(refus.lectureAbsurde.recul.mot, "non renseigné");
});

test("la migration V11 retire les anciennes réponses BS sans en inventer, et prolonge un saut complet", () => {
  const code = read("parcours.js");
  const found = code.match(/function migrerBullshitometreV10\(reponses\) \{[\s\S]*?\n\}/);
  const migrate = new Function(found[0] + "\nreturn migrerBullshitometreV10;")();
  const old = { A1: "2", HR1: "3", ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => ["BS" + (i + 1), "1"])) };
  const m = migrate(old);
  assert.equal(m.reponses.A1, "2");
  assert.equal(m.reponses.HR1, "3");
  assert.equal(m.reponses.BS1, undefined);
  assert.equal(m.reponsesARelire, 12);
  const saut = migrate(Object.fromEntries(Array.from({ length: 12 }, (_, i) => ["BS" + (i + 1), "skip"])));
  for (let i = 1; i <= 13; i++) assert.equal(saut.reponses["BS" + i], "skip");
  assert.equal(saut.reponses.RA1, "4");
  assert.equal(saut.reponsesARelire, 0);
});

test("l'absurde est le chapitre 5, avec sa pièce, ses rappels et l'ancienne adresse redirigée", async () => {
  const { chapitres, examen, introduction } = await import(path.join(ROOT, "formation-contenu.js"));
  assert.equal(chapitres.length, 11);
  assert.equal(examen.length, 11, "une situation par chapitre");
  assert.equal(introduction.essentiel.length, 11, "un essentiel par chapitre");
  const c = chapitres[4];
  assert.match(c.court, /absurde/i);
  assert.equal(c.exo.situations.length, 3);
  for (const s of c.exo.situations) assert.equal(s.choix.length, s.fb.length);
  for (const b of c.blocs.filter((x) => x.t === "rappel")) assert.ok(chapitres[b.chap], "Rappel vers un chapitre existant");
  assert.ok(chapitres.every((ch) => ch.plusLoin && ch.plusLoin.titre), "chaque chapitre a son « pour aller plus loin »");
  assert.match(chapitres[7].plusLoin.titre + chapitres[7].titre, /famille|RPS|risque/i);
  const render = read("parcours.js");
  assert.match(render, /if \(hash === "#absurde"\) \{ location\.replace\("#chapitre-5"\); return; \}/);
  assert.match(render, /\^#chapitre-\(\[1-9\]\[0-9\]\?\)\$/, "les chapitres 10 et 11 sont joignables");
  assert.doesNotMatch(render, /formation-absurde/);
  assert.match(absurde.pictoPipeau(0, 0, 40), /^<g class="picto-pipeau"/);
});

test("le dossier stagiaire reprend les onze chapitres et le PDF contient six pages A4 illustrées", () => {
  const memo = read("memo.html");
  assert.match(memo, /Dossier stagiaire/i);
  assert.equal((memo.match(/class="feuille"/g) || []).length, 6, "six planches A4");
  assert.equal((memo.match(/class="chap-heading"/g) || []).length, 11, "un rappel par chapitre");
  for (const chapitre of Array.from({ length: 11 }, (_, i) => i + 1)) {
    assert.ok(memo.includes('id="chap-' + chapitre + '"'), "chapitre " + chapitre + " joignable");
  }
  for (const sujet of ["Maslach", "Siegrist", "JD-R", "Gollac", "bullshit", "récupération"]) {
    assert.ok(memo.toLowerCase().includes(sujet.toLowerCase()), "notion à retrouver : " + sujet);
  }
  assert.ok((memo.match(/<svg/g) || []).length >= 7, "plusieurs schémas vectoriels pédagogiques");
  assert.doesNotMatch(memo, /<script/i, "aucun script ne lit de réponses personnelles");
  const pdf = fs.readFileSync(path.join(ROOT, "bull-out-memo.pdf"));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.equal((pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length, 6, "le PDF doit être régénéré sur six pages");
  assert.match(read("parcours.js"), /href="bull-out-memo\.pdf" download/, "bouton à côté du diplôme");
  assert.match(read("rapport.js"), /href="bull-out-memo\.pdf"/, "lien dans le rapport");
  assert.match(read("memo.css"), /--anis:/);
});

test("la routine du rapport personnel ne se confond pas avec le dossier stagiaire", () => {
  const rapport = read("rapport.js");
  const routine = read("routine.js");
  const css = read("rapport.css");
  assert.match(rapport, /produireRoutine/);
  assert.match(rapport, /id: "routine"/);
  assert.match(rapport, /"portes", "routine", "travail"/, "la routine est visible tôt dans le rapport");
  assert.match(css, /pdf-court[\s\S]*data-page="routine"/, "la routine est dans le PDF Essentiel");
  assert.match(css, /pdf-travail[\s\S]*data-page="travail"/, "la fiche travail exclut les données personnelles");
  assert.match(routine, /LUNDI/);
  assert.match(routine, /VENDREDI/);
  assert.match(routine, /Quatre semaines/);
  assert.doesNotMatch(routine, /localStorage|sessionStorage|fetch\(/);
});
