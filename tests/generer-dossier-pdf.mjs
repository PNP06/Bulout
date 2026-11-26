// Génère bull-out-dossier.pdf (le dossier stagiaire, remis après la synthèse et avec le diplôme) à partir de dossier.html, via Chromium.
// Exécution : npm i --no-save --no-package-lock playwright && node tests/generer-dossier-pdf.mjs
// À relancer après chaque modification de dossier.html ou dossier.css.
// Le script échoue si un contenu déborde de sa feuille A4 ou si le dossier ne fait pas exactement cinq pages.
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SORTIE = join(ROOT, "bull-out-dossier.pdf");
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png" };

const serveur = createServer(async (req, res) => {
  try {
    const chemin = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname).replace(/^\/+/, "") || "dossier.html";
    const complet = resolve(ROOT, chemin);
    if (!complet.startsWith(ROOT + sep) || !existsSync(complet)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": MIME[extname(complet)] || "application/octet-stream" });
    res.end(await readFile(complet));
  } catch (err) { res.writeHead(500); res.end(String(err)); }
});
await new Promise((ok) => serveur.listen(0, "127.0.0.1", ok));

let navigateur;
try {
  try { navigateur = await chromium.launch({ headless: true, channel: "chrome" }); }
  catch { navigateur = await chromium.launch({ headless: true }); }
  const page = await navigateur.newPage();
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(e.message));
  page.on("requestfailed", (r) => erreurs.push("Ressource manquante : " + r.url()));
  await page.goto(`http://127.0.0.1:${serveur.address().port}/dossier.html`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.querySelectorAll(".page").length === 5);
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);

  // Chaque feuille doit tenir dans sa page A4 (297 mm) : sinon le texte serait coupé.
  const debords = await page.$$eval(".page", (feuilles) => feuilles.map((f, i) => ({ i: i + 1, depasse: f.scrollHeight - f.clientHeight })).filter((x) => x.depasse > 1));
  if (debords.length) throw new Error("Le dossier déborde de la page A4 : " + debords.map((d) => `feuille ${d.i} (+${d.depasse} px)`).join(", ") + ". Raccourcis le texte ou réduis un bloc.");
  const polices = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family + " " + f.weight));
  if (!polices.some((p) => p.includes("Inter"))) throw new Error("La police Inter du dossier n’est pas chargée : " + polices.join(", "));
  if (erreurs.length) throw new Error(erreurs.join("\n"));

  const feuilles = await page.$$eval(".page", (f) => f.length);
  if (feuilles !== 5) throw new Error(`Le dossier doit comporter cinq pages A4 et en contient ${feuilles}.`);
  const chapitres = await page.$$eval(".keyitem", (items) => items.length);
  if (chapitres !== 11) throw new Error(`Le dossier doit reprendre onze idées clefs et en contient ${chapitres}.`);
  const texte = await page.evaluate(() => document.body.textContent);
  for (const n of ["3114", "15", "112", "JD-R", "Siegrist", "Maslach", "Conflits de valeurs", "Intensité et temps", "À qui poser ma question"]) if (!texte.includes(n)) throw new Error("Absent du dossier : " + n);
  // Le dossier doit également se consulter sur un écran étroit sans défilement horizontal.
  await page.emulateMedia({ media: "screen" });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (mobile > 1) throw new Error("Débordement horizontal sur mobile : +" + mobile + " px");
  await page.emulateMedia({ media: "print" });
  const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (pages !== feuilles) throw new Error(`Le PDF fait ${pages} page(s) pour ${feuilles} feuille(s).`);
  await writeFile(SORTIE, pdf);
  console.log(`bull-out-dossier.pdf écrit : ${pages} page(s) A4, ${Math.round(pdf.length / 1024)} Ko.`);
} finally {
  await navigateur?.close();
  serveur.close();
}
