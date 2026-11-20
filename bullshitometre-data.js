// Le bullshitomètre, intégré au questionnaire Bull-Out (partie « Le bullshitomètre »).
// Questions et profils repris du « Grand Test du Bullshit Job » (questionnaire_bullshit_job_satirique_html.html), 8 questions sur 12.
// Ton satirique assumé ; ne compte dans aucun score de risque. Le rapport le croise avec la distance (B) et le sens (C3, C5).
window.BULLOUT_BS = {
 "dims": [
  [
   "meeting",
   "Réunionite"
  ],
  [
   "dashboard",
   "Dashboardologie"
  ],
  [
   "ghost",
   "Contribution fantôme"
  ],
  [
   "absurd",
   "Absurdité globale"
  ]
 ],
 "questions": [
  {
   "text": "Quand on te demande ce que tu as produit aujourd’hui, ta réponse la plus honnête ressemble à :",
   "sub": "Ne compte pas les mails transférés comme production industrielle.",
   "options": [
    {
     "text": "Un vrai livrable identifiable par un être humain sobre.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Un compte-rendu d’une réunion préparant une autre réunion.",
     "w": {
      "absurd": 3,
      "meeting": 4,
      "dashboard": 0,
      "ghost": 1
     }
    },
    {
     "text": "Une slide qui reformule une slide précédente avec plus de flèches.",
     "w": {
      "absurd": 4,
      "meeting": 1,
      "dashboard": 2,
      "ghost": 2
     }
    },
    {
     "text": "Une sensation diffuse d’avoir déplacé de l’air à haut niveau.",
     "w": {
      "absurd": 5,
      "meeting": 2,
      "dashboard": 0,
      "ghost": 3
     }
    }
   ]
  },
  {
   "text": "Combien de réunions pourraient être remplacées par un mail de 6 lignes ?",
   "sub": "Réponse intuitive autorisée. La réalité est probablement pire.",
   "options": [
    {
     "text": "Moins de 20 %. Mon agenda a encore une fonction biologique.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Environ la moitié, mais on perdrait le plaisir du tour de table.",
     "w": {
      "absurd": 2,
      "meeting": 3,
      "dashboard": 0,
      "ghost": 1
     }
    },
    {
     "text": "Les trois quarts, surtout celles avec “alignement” dans le titre.",
     "w": {
      "absurd": 4,
      "meeting": 5,
      "dashboard": 0,
      "ghost": 2
     }
    },
    {
     "text": "Toutes, sauf celle où quelqu’un partage son écran sans trouver l’onglet.",
     "w": {
      "absurd": 5,
      "meeting": 6,
      "dashboard": 0,
      "ghost": 2
     }
    }
   ]
  },
  {
   "text": "Ton outil de pilotage principal sert surtout à :",
   "sub": "PowerPoint, Excel, Power BI, Oracle, ou autre totem organisationnel accepté.",
   "options": [
    {
     "text": "Décider. Les données modifient vraiment les actions.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Rassurer. Le graphe est beau, donc le réel est sous contrôle.",
     "w": {
      "absurd": 3,
      "meeting": 1,
      "dashboard": 4,
      "ghost": 1
     }
    },
    {
     "text": "Montrer qu’on pilote, même quand personne ne sait quoi faire.",
     "w": {
      "absurd": 4,
      "meeting": 2,
      "dashboard": 5,
      "ghost": 2
     }
    },
    {
     "text": "Créer de nouveaux indicateurs qui justifient d’autres indicateurs.",
     "w": {
      "absurd": 5,
      "meeting": 1,
      "dashboard": 6,
      "ghost": 2
     }
    }
   ]
  },
  {
   "text": "La phrase “il faut qu’on se cale” signifie généralement :",
   "sub": "Indice : personne ne sait encore sur quoi.",
   "options": [
    {
     "text": "Fixer une décision claire avec un responsable et une échéance.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Planifier une discussion pour comprendre pourquoi on discute.",
     "w": {
      "absurd": 3,
      "meeting": 4,
      "dashboard": 0,
      "ghost": 1
     }
    },
    {
     "text": "Créer un groupe Teams qui mourra dans 8 jours.",
     "w": {
      "absurd": 4,
      "meeting": 3,
      "dashboard": 0,
      "ghost": 3
     }
    },
    {
     "text": "Éviter de dire qu’on n’a ni mandat, ni données, ni envie.",
     "w": {
      "absurd": 5,
      "meeting": 2,
      "dashboard": 1,
      "ghost": 4
     }
    }
   ]
  },
  {
   "text": "Ton niveau d’impact réel sur les décisions importantes est :",
   "sub": "On parle d’impact causal, pas de présence en copie.",
   "options": [
    {
     "text": "Direct : mes analyses changent des décisions.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Indirect : je prépare le terrain, parfois utilement.",
     "w": {
      "absurd": 1,
      "meeting": 1,
      "dashboard": 1,
      "ghost": 1
     }
    },
    {
     "text": "Décoratif : je fournis la texture cognitive autour de décisions déjà prises.",
     "w": {
      "absurd": 4,
      "meeting": 2,
      "dashboard": 2,
      "ghost": 4
     }
    },
    {
     "text": "Archéologique : je documente après coup pourquoi personne n’a décidé.",
     "w": {
      "absurd": 5,
      "meeting": 2,
      "dashboard": 3,
      "ghost": 5
     }
    }
   ]
  },
  {
   "text": "Quelle proportion de tes livrables est relue pour le fond ?",
   "sub": "Les commentaires sur la couleur des flèches ne comptent pas.",
   "options": [
    {
     "text": "La majorité : le contenu est discuté sérieusement.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Une partie : surtout les chiffres, parfois le raisonnement.",
     "w": {
      "absurd": 1,
      "meeting": 0,
      "dashboard": 1,
      "ghost": 1
     }
    },
    {
     "text": "Peu : on corrige surtout la forme et les formulations molles.",
     "w": {
      "absurd": 4,
      "meeting": 1,
      "dashboard": 2,
      "ghost": 4
     }
    },
    {
     "text": "Aucune idée : ils sont envoyés dans une grotte SharePoint.",
     "w": {
      "absurd": 5,
      "meeting": 0,
      "dashboard": 3,
      "ghost": 6
     }
    }
   ]
  },
  {
   "text": "Le mot “transverse” dans ton environnement veut dire :",
   "sub": "Mot polymorphe à haute valeur décorative.",
   "options": [
    {
     "text": "Coordination utile entre métiers interdépendants.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "Responsabilité diluée entre personnes très occupées.",
     "w": {
      "absurd": 3,
      "meeting": 2,
      "dashboard": 1,
      "ghost": 3
     }
    },
    {
     "text": "Personne ne tranche, donc tout le monde est consulté.",
     "w": {
      "absurd": 5,
      "meeting": 4,
      "dashboard": 1,
      "ghost": 4
     }
    },
    {
     "text": "Un tunnel administratif avec des livrables sur les côtés.",
     "w": {
      "absurd": 5,
      "meeting": 3,
      "dashboard": 3,
      "ghost": 5
     }
    }
   ]
  },
  {
   "text": "À la fin d’une semaine, tu as surtout l’impression :",
   "sub": "Lecture satirique non remboursée par la médecine du travail.",
   "options": [
    {
     "text": "D’avoir avancé sur des sujets concrets.",
     "w": {
      "absurd": 0,
      "meeting": 0,
      "dashboard": 0,
      "ghost": 0
     }
    },
    {
     "text": "D’avoir évité quelques dégâts invisibles.",
     "w": {
      "absurd": 2,
      "meeting": 1,
      "dashboard": 1,
      "ghost": 2
     }
    },
    {
     "text": "D’avoir été très occupé sans pouvoir prouver pourquoi.",
     "w": {
      "absurd": 4,
      "meeting": 3,
      "dashboard": 2,
      "ghost": 4
     }
    },
    {
     "text": "D’avoir participé à une simulation sociale appelée “organisation”.",
     "w": {
      "absurd": 6,
      "meeting": 3,
      "dashboard": 3,
      "ghost": 5
     }
    }
   ]
  }
 ],
 "profils": [
  {
   "titre": "anomalie productive dans un environnement encore rationnel",
   "texte": "Ton bullshitomètre reste bas. Tu sembles encore travailler sur des objets ayant un lien détectable avec le réel. Ton risque principal n’est pas l’absurdité, mais la jalousie passive de collègues coincés en pré-comité de pré-alignement.",
   "survie": "Protège tes plages de travail. Évite de signaler trop fort que ton poste a encore une utilité : cela pourrait attirer une task force.",
   "phrase": "Je propose qu’on garde le livrable simple : décision, responsable, échéance."
  },
  {
   "titre": "cadre semi-utile en zone de brouillard organisationnel",
   "texte": "Ton poste alterne entre utilité réelle et cérémonies administratives. Tu as encore un impact, mais il est parfois emballé dans une couche de slides, de comités et de “on se redit”.",
   "survie": "Applique le tri froid : ce qui change une décision mérite du temps ; ce qui rassure un organigramme mérite une version courte.",
   "phrase": "Pour éviter de produire un objet décoratif, quelle décision cette slide doit-elle permettre ?"
  },
  {
   "titre": "architecte certifié de l’alignement circulaire",
   "texte": "Ton quotidien contient une densité élevée d’objets professionnels à utilité indéterminée. Tu ne fais pas rien : tu transformes du flou en artefacts présentables. C’est une forme d’art, mais avec plus de fichiers vFinal_v8.",
   "survie": "Réduis l’investissement émotionnel. Ton poste est peut-être une machine à absorber l’anxiété managériale ; ne confonds pas urgence sociale et urgence réelle.",
   "phrase": "On peut le faire, mais je propose de distinguer le besoin de décision du besoin de réassurance."
  },
  {
   "titre": "grand prêtre du bullshit job métastable",
   "texte": "Ton indice atteint un niveau où le travail devient une performance sociale sophistiquée. Les réunions engendrent des réunions, les KPI contemplent d’autres KPI, et ton impact réel se cache probablement dans une annexe non ouverte.",
   "survie": "Détachement méthodique. Fais le minimum utile, livre proprement, protège ton énergie, et investis ton cerveau dans les sujets qui ont une causalité réelle.",
   "phrase": "Je peux produire ça, mais sans clarification de l’usage, on risque surtout de fabriquer un artefact de confort."
  }
 ]
};
