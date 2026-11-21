// Bull-Out · lecture de l'absurde.
// Script classique (chargé avant script.js dans test.html), exposé sur window.BullOutAbsurde,
// et exporté en CommonJS pour les tests Node. Aucune dépendance au dessin du schéma.
//
// - scoreAbsurde(result)  → la 4e famille de la jauge « Ton travail » : { n: 0..3 | null, mot, lignes }
// - reculAbsurde(result)  → la case « Ta façon de prendre l'absurde » dans « Toi », sans points : { mot, titre, texte, lignes }
// - pictoPipeau(x, y, taille) → fragment SVG du pipeau (traits en currentColor)
//
// `result` est l'objet renvoyé par calculateResults() (script.js) : on y lit bullshit, reactionAbsurde,
// humorReaction et sectionScores. Une sauvegarde sans réponses BS V3 renvoie n: null (« non renseigné »).
(function (root) {
  "use strict";

  const VERSION_BS = "2026-11-bs-v3";
  // Mêmes mots et mêmes 4 crans que les autres familles de la jauge.
  const MOTS = ["ça va", "à surveiller", "ça use", "ça use beaucoup"];
  const cran = (pc) => (pc < 25 ? 0 : pc < 50 ? 1 : pc < 75 ? 2 : 3);
  const LIBELLES = {
    meeting: "Réunions sans décision",
    dashboard: "Indicateurs sans usage",
    ghost: "Travail sans lecteur",
    notmine: "Pas ton boulot"
  };
  // Distance (B) et récupération (F) : sur 24, « marqué » à partir de 13, comme la matrice existante.
  const SEUIL_MARQUE = 13;

  function scoreAbsurde(result) {
    const bs = result && result.bullshit;
    if (!bs || bs.skipped || bs.version !== VERSION_BS || !Number.isFinite(bs.percent)) {
      return { n: null, mot: "non renseigné", lignes: [] };
    }
    const n = cran(bs.percent);
    const lignes = Object.keys(LIBELLES)
      .map((key) => ({ key, pc: Number(bs.dims && bs.dims[key]) || 0 }))
      .filter((d) => d.pc >= 25)
      .sort((a, b) => b.pc - a.pc)
      .slice(0, 3)
      .map((d) => ({ label: LIBELLES[d.key], mot: MOTS[cran(d.pc)], n: cran(d.pc) }));
    return { n, mot: MOTS[n], lignes };
  }

  const valeur = (reaction, id) => {
    const a = reaction && !reaction.skipped && (reaction.answers || []).find((x) => x.id === id);
    return a && Number.isInteger(a.value) ? a.value : null;
  };

  function reculAbsurde(result) {
    const reaction = result && result.reactionAbsurde;
    const ra1 = valeur(reaction, "RA1");
    const ra2 = valeur(reaction, "RA2");
    const scores = (result && result.sectionScores) || {};
    const recupDifficile = Number(scores.F) >= SEUIL_MARQUE;
    const distanceMarquee = Number(scores.B) >= SEUIL_MARQUE;
    const absurde = scoreAbsurde(result);
    const beaucoup = absurde.n !== null && absurde.n >= 2;

    let mot, titre, texte;
    if (ra1 === null) {
      mot = "non renseigné";
      titre = "Tu as préféré ne pas le dire";
      texte = "Aucune lecture de ton recul n'est proposée. Rien n'oblige à rire, à s'agacer ou à relativiser.";
    } else if (ra1 === 0) {
      mot = "du recul";
      if (recupDifficile) {
        titre = "Tu en ris, mais tu récupères mal";
        texte = "Tu dis en rire et passer à autre chose. Pourtant, tu as du mal à récupérer en ce moment. Le rire aide sur le moment ; il ne remplace pas une vraie coupure.";
      } else if (beaucoup) {
        titre = "Tu vois le cirque, et tu en ris";
        texte = "Ton recul semble te protéger : garde-le. Et garde aussi l'envie de changer ce qui peut l'être, car l'absurde, lui, ne disparaît pas en riant.";
      } else {
        titre = "Du recul, et peu d'absurde à digérer";
        texte = "Tu en ris et tu passes à autre chose, et ton travail en contient peu. Plutôt bon signe.";
      }
    } else if (ra1 === 1) {
      mot = "un agacement qui passe";
      titre = "Ça t'agace, puis ça redescend";
      texte = "C'est une réaction saine : l'absurde te heurte parce que le travail bien fait compte pour toi." +
        (beaucoup ? " Avec autant d'absurde au quotidien, vérifie que ça continue de redescendre." : "");
    } else if (ra1 === 2) {
      mot = "ça te suit le soir";
      titre = "L'absurde te suit à la maison";
      texte = "Ce n'est pas un manque d'humour : c'est souvent le signe que ça touche à ce qui compte pour toi. Quand l'absurde revient le soir, couper devient difficile." +
        (recupDifficile ? " Ta récupération le confirme : c'est à regarder de près." : "");
    } else {
      mot = "plus de réaction";
      if (distanceMarquee) {
        titre = "Tu as cessé d'attendre du sens";
        texte = "Ça protège un temps. Mais avec la distance que tu décris, c'est aussi l'un des trois signes d'usure. À regarder de près, et à dire.";
      } else {
        titre = "Tu ne réagis plus";
        texte = "Ne plus s'en faire peut être du recul, ou le début d'un retrait. La différence : est-ce que ton travail garde du sens pour toi ?";
      }
    }

    const hr = result && result.humorReaction && result.humorReaction.interpretation;
    if (hr && hr.mixedEmotions) texte += " Tu as aussi ri et eu de la peine devant nos blagues : drôle parce que c'est vrai ? Aucune des deux réactions n'annule l'autre.";
    if (hr && hr.minimizationPerceived) texte += " Le ton du test t'a semblé minimiser ce que tu vis : tu as raison de le dire, ce que tu vis est sérieux.";

    // `court` : le mot du schéma (24 caractères au plus) ; `n` : la couleur du point, sans aucun point de score.
    const lignes = [];
    if (ra1 !== null) lignes.push({ label: "Face à l'absurde", mot, court: ["du recul", "ça passe", "ça te suit le soir", "plus de réaction"][ra1], n: [0, 0, 2, distanceMarquee ? 2 : 1][ra1] });
    if (ra2 !== null) lignes.push({ label: "En rire ensemble", mot: ["possible, et ça soude", "avec quelques collègues", "difficile ici", "plutôt en solo"][ra2], court: ["ça soude", "avec certains", "difficile ici", "plutôt en solo"][ra2], n: ra2 >= 2 ? 1 : 0 });
    if (hr && hr.title) lignes.push({ label: "Les blagues du test", mot: hr.title });
    return { mot, titre, texte, lignes: lignes.slice(0, 3) };
  }

  // Pipeau dessiné dans une boîte de 100 × 100, mis à l'échelle de `taille` (px) et posé en (x, y).
  function pictoPipeau(x = 0, y = 0, taille = 40) {
    const k = (Number(taille) || 40) / 100;
    return `<g class="picto-pipeau" transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <g transform="rotate(-30 50 60)"><rect x="10" y="52" width="66" height="16" rx="8"/><path d="M76 52 l14 -3 v22 l-14 -3"/>
      <circle cx="26" cy="60" r="2.5" fill="currentColor"/><circle cx="40" cy="60" r="2.5" fill="currentColor"/><circle cx="54" cy="60" r="2.5" fill="currentColor"/></g>
      <path d="M72 22 v-16 l12 -3"/><circle cx="68" cy="22" r="5" fill="currentColor" stroke="none"/>
      <path d="M90 40 v-14"/><circle cx="86" cy="40" r="4.5" fill="currentColor" stroke="none"/></g>`;
  }

  const api = { VERSION_BS, MOTS, scoreAbsurde, reculAbsurde, pictoPipeau };
  root.BullOutAbsurde = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
