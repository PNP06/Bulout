// Profil de validation entièrement fictif. Aucun utilisateur réel ni aucune réponse envoyée.
// Exécution : npm i --no-save --no-package-lock playwright && node tests/generer-pdf-exemple.mjs
// Génère le rapport réel Bull-Out (moteur script.js + rapport.js) via Chromium.
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "tests", "artefacts-exemple");
const MIME = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml", ".json":"application/json",
  ".png":"image/png", ".woff2":"font/woff2" };
await mkdir(OUT, {recursive:true});
const serve = createServer(async(req,res)=>{
  try {
    const u = new URL(req.url, "http://127.0.0.1");
    const path = decodeURIComponent(u.pathname).replace(/^\/+/, "") || "index.html";
    const full = resolve(ROOT, path);
    if (!full.startsWith(ROOT + sep) || !existsSync(full)) { res.writeHead(404);res.end("Missing");return; }
    const content = await readFile(full);
    res.writeHead(200,{"content-type":MIME[extname(full)] || "application/octet-stream", "cache-control":"no-store"});
    res.end(content);
  } catch(err) {res.writeHead(500);res.end(String(err));}
});
await new Promise(resolve=>serve.listen(0,"127.0.0.1",resolve));
const port=serve.address().port;
let browser;
try {
  browser=await chromium.launch({headless:true,channel:"chrome",args:["--no-sandbox","--disable-dev-shm-usage"]});
  const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  const pageErrors=[];
  page.on("pageerror",e=>pageErrors.push(e.message));
  // Le parcours réel conditionne le questionnaire à la formation/diplôme.
  // Seul ce banc d'essai contourne cette navigation : les calculs et le rapport sont intacts.
  await page.route("**/parcours.js",route=>route.abort());
  await page.goto(`http://127.0.0.1:${port}/test.html`,{waitUntil:"load"});
  await page.waitForFunction(()=>Boolean(window.BullOutDebug && document.querySelector('input[name="A1"]') && document.querySelector("#results")));
  const synth=await page.evaluate(()=>{
    const Q=window.BullOutDebug;
    const response={};
    const sections={
      A:[3,3,2,2,3,2],B:[2,3,2,1,1,2],C:[2,2,3,2,3,2],
      D:[4,3,3,3,2,3],E:[1,1,2,1,1,2],F:[3,3,2,2,1,2]
    };
    for(const [id,vals] of Object.entries(sections))vals.forEach((v,i)=>response[id+(i+1)]=v);
    [3,1,3,2,1,2].forEach((v,i)=>response["G"+(i+1)]=v);
    [2,1,2,3,3,2].forEach((v,i)=>response["R"+(i+1)]=v);
    [3,2,2,3].forEach((v,i)=>response["T"+(i+1)]=v);
    [3,2,4,3].forEach((v,i)=>response["RPS"+(i+1)]=v);
    [1,2,2,3,2,1,3,2,1,2,3,2,2].forEach((v,i)=>response["BS"+(i+1)]=v);
    [2,1].forEach((v,i)=>response["RA"+(i+1)]=v);
    [4,2,3,3].forEach((v,i)=>response["HR"+(i+1)]=v);
    Q.contextQuestions.forEach((_,i)=>response["context"+(i+1)]=[2,5].includes(i+1)?"yes":"no");
    Q.alertQuestions.forEach((_,i)=>response["alert"+(i+1)]="no");
    const names=Object.keys(response);
    const missing=[];
    for(const [name,value] of Object.entries(response)){
      const node=document.querySelector(`input[name="${name}"][value="${value}"]`);
      if(!node)missing.push(name+"="+value);
      else node.checked=true;
    }
    if(missing.length)throw new Error("Inputs introuvables : "+missing.join(", "));
    document.querySelector("#questionnaire").hidden=false;
    const r=Q.calculateResults();
    if(!r)throw new Error("Le vrai moteur n'a pas calculé de résultat.");
    const form=document.querySelector("#burnout-form");
    form.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
    if(document.querySelector("#results").dataset.ready!=="true")
      throw new Error("Le rapport réel n'a pas été rendu.");
    document.querySelector("#questionnaire").hidden=true;
    document.querySelector("#results").hidden=false;
    const summary={
      fictif:true,scenario:"Surcharge prolongée, ressources réduites, récupération fragile ; aucune alerte de sécurité",
      items: names.length,sections:Object.fromEntries(Object.entries(r.sectionScores)),totalDescriptif:r.totalScore,
      profil:r.profile?.key,alertes:r.hasAlert,
      temporal:r.temporalAnswers.map(x=>({id:x.id,reponse:x.answer})),
      bullshit:{percent:r.bullshit.percent,dims:r.bullshit.dims,portrait:r.bullshit.profil?.titre,matrix:r.bullshit.matrix?.title},
      humor:r.humorReaction?.answers.map(x=>({id:x.id,reponse:x.answer})),
      reaction:r.humorReaction?.interpretation?.title,
      actions:r.actions.map(x=>x.title),
      interlocuteurs:r.stakeholderRecommendations.map(x=>x.stakeholder?.name).filter(Boolean)
    };
    return summary;
  });
  if(pageErrors.length)throw new Error("Erreurs JavaScript page: "+pageErrors.join(" ; "));
  if(synth.items!==86)throw new Error(`Attendu 86 réponses, reçu ${synth.items}`);
  if(synth.alertes)throw new Error("Le profil d'exemple ne doit pas déclencher de réponse de sécurité");
  await page.addStyleTag({content:`@media print {
    .site-header, .site-footer, #questionnaire, #espace-formation, #porte-test,
    .main-nav, .nav-direct, .translation-widget { display:none !important; }
    #results {display:block !important;}
  }`});
  await page.screenshot({path:join(OUT,"capture-synthese.png"),fullPage:true});
  const modes=[["court","rapport-essentiel-fictif.pdf"],["complet","rapport-complet-fictif.pdf"],["travail","fiche-travail-fictive.pdf"]];
  for(const [mode,file] of modes){
    await page.evaluate(value=>{
      const e=document.querySelector(`input[name="rp-pdf"][value="${value}"]`);
      if(!e)throw new Error("Mode PDF introuvable: "+value);
      e.checked=true;
      e.dispatchEvent(new Event("change",{bubbles:true}));
    },mode);
    await page.pdf({path:join(OUT,file),format:"A4",printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false});
    const buffer=await readFile(join(OUT,file));
    if(buffer.byteLength<10000 || buffer.subarray(0,5).toString()!=="%PDF-")
      throw new Error("PDF manquant ou invalide: "+file);
  }
  // Recette visuelle minimale des deux zones nouvellement développées.
  // Le navigateur charge ici le parcours normal : seul l'essai du questionnaire
  // désactive localement le verrou du diplôme, jamais le site servi au public.
  const captures = [
    {name:"resume-modeles-ordinateur",url:"test.html#modeles-resume",width:1280,selector:"#resume-cas"},
    {name:"resume-modeles-mobile",url:"test.html#modeles-resume",width:390,selector:"#resume-limites"},
    {name:"synthese-ordinateur",url:"test.html#synthese",width:1280,selector:"#s-croisement"},
    {name:"synthese-mobile",url:"test.html#synthese",width:390,selector:"#s-complements"},
    {name:"methode-ordinateur",url:"methode.html",width:1280,selector:"#verification-inconnues"},
    {name:"methode-mobile",url:"methode.html",width:390,selector:"#construction-hypotheses"}
  ];
  const visualChecks = [];
  for (const c of captures) {
    const tab=await browser.newPage({viewport:{width:c.width,height:840},deviceScaleFactor:1});
    const errors=[];
    tab.on("pageerror",err=>errors.push(err.message));
    try {
      await tab.goto(`http://127.0.0.1:${port}/${c.url}`,{waitUntil:"load"});
      await tab.waitForSelector(c.selector,{state:"visible",timeout:12000});
      const status=await tab.evaluate((selector)=>{
        const element=document.querySelector(selector);
        const rect=element.getBoundingClientRect();
        return {
          viewport:window.innerWidth,documentWidth:document.documentElement.scrollWidth,
          elementWidth:Math.round(rect.width),
          modelCards:document.querySelectorAll(".fo-complement").length,
          summaryModelCards:document.querySelectorAll(".fo-modele").length,
          comparedRows:document.querySelectorAll(".fo-modeles-comparaison tbody tr").length,
          methodHypotheses:document.querySelectorAll("#construction-hypotheses tbody tr").length
        };
      },c.selector);
      if(errors.length)throw new Error(c.name+": "+errors.join("; "));
      if(status.documentWidth > status.viewport+2)throw new Error(c.name+": débordement horizontal "+
        status.documentWidth+" > "+status.viewport);
      if(c.name.startsWith("resume-modeles") && (status.summaryModelCards!==4 || status.comparedRows!==4))
        throw new Error(c.name+": attendu 4 modèles principaux et 4 lectures comparatives");
      if(c.name.startsWith("synthese") && status.modelCards!==3)
        throw new Error(c.name+": 3 cadres complémentaires attendus, "+status.modelCards+" trouvés");
      if(c.name.startsWith("methode") && status.methodHypotheses!==6)
        throw new Error(c.name+": 6 hypothèses attendues, "+status.methodHypotheses+" trouvées");
      await tab.screenshot({path:join(OUT,c.name+".png"),fullPage:true});
      visualChecks.push({name:c.name,...status,errors:0});
    } finally { await tab.close(); }
  }
  await writeFile(join(OUT,"verification-affichage.json"),JSON.stringify(visualChecks,null,2),"utf8");
  console.log("FORMATION_METHODE_VISUAL_CHECKS="+JSON.stringify(visualChecks));
  await writeFile(join(OUT,"resultat-moteur.json"),JSON.stringify(synth,null,2),"utf8");
  console.log("BULLOUT_RESULT_JSON="+JSON.stringify(synth));
  console.log("PDF_VALIDES=3;REPONSES_FICTIVES="+synth.items+";ERREURS_JS="+pageErrors.length);
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>serve.close(resolve));
}
