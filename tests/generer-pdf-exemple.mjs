// Profil de validation entièrement fictif. Aucun utilisateur réel ni aucune réponse envoyée.
// Exécution : npm i --no-save --no-package-lock playwright && node tests/generer-pdf-exemple.mjs
// Génère le rapport réel Bull-Out (moteur script.js + rapport.js) via Chromium.
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
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
    [3,2,4,3,2,1].forEach((v,i)=>response["RPS"+(i+1)]=v);
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
  if(synth.items!==88)throw new Error(`Attendu 88 réponses, reçu ${synth.items}`);
  if(synth.alertes)throw new Error("Le profil d'exemple ne doit pas déclencher de réponse de sécurité");
  await page.addStyleTag({content:`@media print {
    .site-header, .site-footer, #questionnaire, #espace-formation, #porte-test,
    .main-nav, .nav-direct, .translation-widget { display:none !important; }
    #results {display:block !important;}
  }`});
  await page.screenshot({path:join(OUT,"capture-synthese.png"),fullPage:true});
  // Contrôler la véritable synthèse du rapport sur téléphone, et non seulement la formation.
  await page.setViewportSize({width:390,height:844});
  const mobileReport = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    reportWidth: Math.round(document.querySelector("#results").getBoundingClientRect().width)
  }));
  if (mobileReport.documentWidth > mobileReport.viewport + 2)
    throw new Error("Rapport mobile : débordement horizontal " + mobileReport.documentWidth + " > " + mobileReport.viewport);
  await page.screenshot({path:join(OUT,"rapport-synthese-mobile.png"),fullPage:true});
  await writeFile(join(OUT,"verification-rapport-mobile.json"),JSON.stringify(mobileReport,null,2),"utf8");
  await page.setViewportSize({width:1280,height:900});
  const modes=[["synthese","rapport-synthese-seule-fictif.pdf"],["court","rapport-essentiel-fictif.pdf"],["complet","rapport-complet-fictif.pdf"],["travail","fiche-travail-fictive.pdf"]];
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
    const textePdf=execFileSync("pdftotext",["-layout",join(OUT,file),"-"],{encoding:"utf8"});
    if(textePdf.trim().length<1000 || !textePdf.includes("Bull-Out"))
      throw new Error("PDF vide ou contenu du rapport non extractible: "+file);
    if(mode==="travail" && !textePdf.includes("Préparer une discussion"))
      throw new Error("La fiche travail n'imprime pas ses informations.");
  }
  // Matrice de vérification du vrai moteur : tous les calculs, le rendu et l'impression
  // sont rejoués avec des profils fictifs contrastés, sans changer l'algorithme.
  const scenarios = [
    {id:"stable",niveau:"bas",alertes:[],contextes:[],skipBS:true,formats:["synthese"]},
    {id:"exposition-forte",niveau:"haut",alertes:[],contextes:[7],skipBS:false,formats:["synthese"]},
    {id:"alerte-score-bas",niveau:"bas",alertes:[2],contextes:[],skipBS:false,formats:["synthese"]},
    {id:"alertes-contexte-risque",niveau:"haut",alertes:[1,3],contextes:[1,7],skipBS:false,formats:["synthese","travail"]}
  ];
  const controlesScenarios=[];
  for(const scenario of scenarios) {
    const resultat=await page.evaluate((c)=>{
      const Q=window.BullOutDebug, form=document.querySelector("#burnout-form");
      const choisir=(name,value)=>{
        const el=form.querySelector('input[name="'+name+'"][value="'+String(value)+'"]');
        if(!el)throw new Error("Option manquante : "+name+"="+value);
        el.checked=true;
      };
      for(const id of ["A","B","C","D","E","F"])
        for(let i=1;i<=6;i++) choisir(id+i,c.niveau==="haut" ? (id==="E"?0:4) : (id==="E"?4:0));
      for(let i=1;i<=6;i++){
        choisir("G"+i,c.niveau==="haut"?0:4);
        choisir("R"+i,c.niveau==="haut"?4:0);
        choisir("RPS"+i,c.niveau==="haut"?4:0);
      }
      choisir("T1",c.niveau==="haut"?4:0);
      choisir("T2",c.niveau==="haut"?2:5);
      choisir("T3",c.niveau==="haut"?3:5);
      choisir("T4",c.niveau==="haut"?4:0);
      for(let i=1;i<=13;i++)choisir("BS"+i,c.skipBS?"skip":c.niveau==="haut"?3:0);
      for(let i=1;i<=4;i++)choisir("HR"+i,c.skipBS?5:0);
      for(let i=1;i<=2;i++)choisir("RA"+i,c.skipBS?4:0);
      Q.contextQuestions.forEach((_,i)=>choisir("context"+(i+1),c.contextes.includes(i+1)?"yes":"no"));
      Q.alertQuestions.forEach((_,i)=>choisir("alert"+(i+1),c.alertes.includes(i+1)?"yes":"no"));
      document.querySelector("#questionnaire").hidden=false;
      const r=Q.calculateResults();
      if(!r)throw new Error(c.id+": moteur n'a pas retourné de résultat");
      form.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true}));
      const root=document.querySelector("#results");
      const synthesis=root.querySelector("#rapport-synthese");
      if(!synthesis || root.dataset.ready!=="true")throw new Error(c.id+": rapport non rendu");
      document.querySelector("#questionnaire").hidden=true;
      root.hidden=false;
      const qtexte=synthesis.querySelector(".rp-syn-questions")?.textContent || "";
      const securite=synthesis.querySelector(".rp-securite")?.textContent || "";
      const pages=[...root.querySelectorAll(".rp-page")];
      return {
        id:c.id,score:r.totalScore,profil:r.profile?.key,
        hasAlert:r.hasAlert,skipBS:r.bullshit.skipped,
        pages:pages.length,
        alerteSecurite:securite.length>0,
        orientation3114:securite.includes("3114"),
        orientationFonctionnement:securite.includes("Fonctionnement très perturbé"),
        orientationPhysique:securite.includes("Symptômes physiques préoccupants"),
        questionsManager:qtexte.includes("Pour ton manager"),
        questionsSur:qtexte.includes("Pour un interlocuteur sûr"),
        rail:!!root.querySelector(".rp-rail"),
        menuMobile:!!root.querySelector(".rp-fil-menu"),
        bandeauHorizontal:!!root.querySelector(".rp-ariane")
      };
    },scenario);
    if(resultat.hasAlert!==(scenario.alertes.length>0))throw new Error(scenario.id+": alerte incohérente");
    if(resultat.skipBS!==scenario.skipBS)throw new Error(scenario.id+": choix de passer le bullshitomètre non respecté");
    if(resultat.pages!==15)throw new Error(scenario.id+": pages HTML manquantes ("+resultat.pages+")");
    if(!resultat.rail||!resultat.menuMobile||resultat.bandeauHorizontal)
      throw new Error(scenario.id+": navigation latérale ou mobile régressée");
    if(resultat.alerteSecurite!==resultat.hasAlert)
      throw new Error(scenario.id+": bandeau de sécurité incohérent");
    if(scenario.alertes.includes(1)&&!resultat.orientation3114)
      throw new Error(scenario.id+": orientation suicidaire 3114 absente");
    if(scenario.alertes.includes(2)&&!resultat.orientationFonctionnement)
      throw new Error(scenario.id+": orientation de fonctionnement absente");
    if(scenario.alertes.includes(3)&&!resultat.orientationPhysique)
      throw new Error(scenario.id+": orientation de santé physique absente");
    if(scenario.contextes.includes(1)||scenario.contextes.includes(7)){
      if(!resultat.questionsSur||resultat.questionsManager)
        throw new Error(scenario.id+": proposition de parler au manager dans un contexte risqué");
    }
    for(const mode of scenario.formats) {
      await page.evaluate(value=>{
        const choix=document.querySelector('input[name="rp-pdf"][value="'+value+'"]');
        if(!choix)throw new Error("Mode d'impression absent : "+value);
        choix.checked=true;
        choix.dispatchEvent(new Event("change",{bubbles:true}));
      },mode);
      const fichier=join(OUT,"controle-"+scenario.id+"-"+mode+".pdf");
      await page.pdf({path:fichier,format:"A4",printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false});
      const buffer=await readFile(fichier);
      if(buffer.byteLength<10000||buffer.subarray(0,5).toString()!=="%PDF-")
        throw new Error(scenario.id+": PDF "+mode+" invalide");
      const textePdf=execFileSync("pdftotext",["-layout",fichier,"-"],{encoding:"utf8"});
      if(textePdf.trim().length<700)throw new Error(scenario.id+": PDF "+mode+" sans contenu lisible");
      if(mode==="synthese" && resultat.hasAlert &&
         !/Un signal de sécurité est déclaré/i.test(textePdf))
        throw new Error(scenario.id+": alerte absente du vrai PDF");
      if(mode==="travail" &&
         (!textePdf.includes("Préparer une discussion") ||
          /3114|idées noires|suicidaires|symptômes physiques préoccupants|Un signal de sécurité est déclaré/i.test(textePdf)))
        throw new Error(scenario.id+": fuite de santé ou contenu manquant dans le PDF de travail");
    }
    controlesScenarios.push(resultat);
    if(pageErrors.length)throw new Error(scenario.id+": erreur JavaScript : "+pageErrors.join(" ; "));
  }
  await writeFile(join(OUT,"verification-scenarios-moteur.json"),JSON.stringify(controlesScenarios,null,2),"utf8");
  console.log("MATRICE_PROFILS="+JSON.stringify(controlesScenarios));
  // Recette visuelle minimale des deux zones nouvellement développées.
  // Le navigateur charge ici le parcours normal : seul l'essai du questionnaire
  // désactive localement le verrou du diplôme, jamais le site servi au public.
  const captures = [
    {name:"resume-modeles-ordinateur",url:"test.html#modeles-resume",width:1280,selector:"#resume-cas"},
    {name:"resume-modeles-mobile",url:"test.html#modeles-resume",width:390,selector:"#resume-cas"},
    {name:"synthese-ordinateur",url:"test.html#synthese",width:1280,selector:"#s-schema"},
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
  console.log("PDF_VALIDES=4;REPONSES_FICTIVES="+synth.items+";ERREURS_JS="+pageErrors.length);
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>serve.close(resolve));
}
