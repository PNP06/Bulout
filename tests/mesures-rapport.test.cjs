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

function debugApi() {
  const window = { addEventListener() {}, innerHeight: 800 };
  const document = {
    querySelector() { return null; }, querySelectorAll() { return []; },
    addEventListener() {}, body: { className: "", classList: { contains() { return false; } } },
    title: "Bull-Out test"
  };
  const context = { window, document, console: { debug() {}, warn() {}, error() {} },
    navigator: {}, location: { hash: "", pathname: "/test", href: "https://example.invalid/test" } };
  // Respecter l'ordre de chargement réel de test.html : données BS avant moteur.
  vm.runInNewContext(read("bullshitometre-data.js"), context, { filename: "bullshitometre-data.js" });
  vm.runInNewContext(read("script.js"), context, { filename: "script.js" });
  assert.ok(window.BullOutDebug, "API de test absente");
  return window.BullOutDebug;
}

function composerRapport() {
  const code = read("rapport.js").replace(/^import\s+\{\s*chapitres\s*\}\s+from\s+["']\.\/formation-contenu\.js["'];?\s*/m, "");
  const root = { addEventListener() {}, querySelectorAll() { return []; }, querySelector() { return null; } };
  const document = { querySelector() { return root; }, addEventListener() {} };
  const window = { addEventListener() {} };
  const chapitres = Array.from({ length: 9 }, (_, i) => ({
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
    bullshitPart: api.bullshitPart, bsDims: [["meeting", "Réunionite"]],
    ratingLabels
  };
}

test("le questionnaire garde 67 questions dont six dimensions de six items", () => {
  assert.equal(api.sections.length, 6);
  assert.ok(api.sections.every((s) => s.questions.length === 6));
  assert.equal(api.strengthPart.questions.length, 6);
  assert.equal(api.exchangePart.questions.length, 6);
  assert.equal(api.bullshitPart.questions.length, 8);
  assert.equal(api.contextQuestions.length, 8);
  assert.equal(api.alertQuestions.length, 3);
  assert.equal(6 * 6 + 6 + 6 + 8 + 8 + 3, 67);
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
    assert.match(html, /Deux repères déclarés/);
    assert.match(html, /CONDITIONS ET RESSOURCES DÉCLARÉES/);
    assert.match(html, /Les fils rapprochent des thèmes/);
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
  assert.match(html, /ce questionnaire ne demande pas si l’humour t’aide réellement/);
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
  assert.match(src, /const progression = \{ format, chapitres: \[\.\.\.acquis\], bonnes, dateDiplome, ouvert, reponses \}/);
});

test("l'exemple d'accueil ne simule plus de pourcentage d'énergie", () => {
  const html = read("index.html");
  assert.match(html, /Ressenti de Sam/);
  assert.match(html, /En forme/);
  assert.doesNotMatch(html, /id="bo-pct"[^>]*>80 %/);
});
