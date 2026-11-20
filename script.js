(function () {
  // Anciennes adresses (tout sur une page) : index.html#questionnaire, #agir… renvoient vers la nouvelle page.
  const moved = {
    comprendre: "comprendre.html", differencier: "comprendre.html", mecanismes: "comprendre.html", science: "comprendre.html",
    questionnaire: "test.html", results: "test.html",
    aide: "agir.html", agir: "agir.html", reprise: "agir.html", outils: "agir.html", satiriques: "agir.html",
    "sources-limites": "methode.html"
  };
  const anchor = location.hash.slice(1);
  if (document.body.classList.contains("home-page") && moved[anchor]) {
    location.replace(`${moved[anchor]}#${anchor}`);
  }
})();

(function () {
  "use strict";

  const ratingLabels = [
    "0 - jamais ou presque jamais",
    "1 - rarement",
    "2 - parfois",
    "3 - souvent",
    "4 - presque toujours"
  ];

  const sections = [
    {
      id: "A",
      title: "A. Épuisement",
      shortTitle: "A Épuisement",
      type: "symptoms",
      explore: "l'énergie que le travail te prend, et ce qu'il en reste le soir.",
      sources: "Maslach Burnout Inventory (épuisement émotionnel), Burnout Assessment Tool (épuisement, altérations cognitives et émotionnelles), Copenhagen Burnout Inventory",
      chapitres: [1, 2],
      questions: [
        "Après une journée de travail, je n'ai plus assez d'énergie pour mes activités personnelles habituelles.",
        "Après mes périodes habituelles de repos, je me sens encore épuisé·e.",
        "Certaines journées, je me sens saturé·e avant même de commencer, à l'idée de ce qui m'attend.",
        "Les tâches ordinaires me demandent un effort disproportionné.",
        "Je deviens irritable ou hypersensible face à des sollicitations professionnelles normales (celles de mon poste, que je gérais sans difficulté avant).",
        "J'ai du mal à maintenir mon attention ou ma mémoire de travail au niveau habituel."
      ]
    },
    {
      id: "B",
      title: "B. Distance mentale / cynisme",
      shortTitle: "B Distance mentale",
      type: "symptoms",
      explore: "le retrait que tu prends vis-à-vis du travail et des personnes, souvent pour te protéger.",
      sources: "Maslach Burnout Inventory (cynisme), Burnout Assessment Tool (distance mentale), Oldenburg Burnout Inventory (désengagement)",
      chapitres: [2],
      questions: [
        "Des tâches professionnelles qui comptaient pour moi me laissent désormais indifférent·e.",
        "Je me surprends à parler de mon travail avec amertume ou cynisme.",
        "J'évite certaines interactions professionnelles parce qu'elles me coûtent trop.",
        "Je ressens moins d'empathie ou de patience envers des personnes avec qui je travaille.",
        "Je fais le minimum relationnel nécessaire pour tenir la journée.",
        "Je fais mon travail de façon plus mécanique, sans vraiment m'y impliquer."
      ]
    },
    {
      id: "C",
      title: "C. Efficacité / sens altérés",
      shortTitle: "C Efficacité/sens",
      type: "symptoms",
      explore: "ta confiance dans ton travail, sa qualité et le sens que tu y trouves.",
      sources: "Maslach Burnout Inventory (efficacité professionnelle), Burnout Assessment Tool (altérations cognitives)",
      chapitres: [2],
      questions: [
        "Je doute plus souvent de ma capacité à produire un travail de qualité.",
        "J'ai plus de difficultés qu'avant à atteindre le niveau de qualité attendu, malgré mes efforts.",
        "J'ai du mal à voir le sens concret de mon travail.",
        "Je me sens moins compétent·e dans des tâches que je maîtrisais auparavant.",
        "Je termine des journées avec le sentiment de n'avoir rien accompli d'utile.",
        "Je dois fournir davantage d'efforts qu'avant pour obtenir un résultat dont je suis satisfait·e."
      ]
    },
    {
      id: "D",
      title: "D. Exigences professionnelles",
      shortTitle: "D Exigences",
      type: "work",
      explore: "ce que le travail te demande : quantité, urgences, contradictions, responsabilité, charge émotionnelle.",
      sources: "modèle Exigences-Ressources (JD-R), Job Content Questionnaire de Karasek (demande psychologique), COPSOQ (exigences quantitatives et émotionnelles, conflit de rôle), ERI de Siegrist (effort)",
      chapitres: [3, 4],
      questions: [
        "La quantité de travail dépasse régulièrement ce qui peut être fait correctement dans le temps disponible.",
        "Les interruptions fréquentes m'empêchent de terminer mes tâches prioritaires.",
        "Je reçois des priorités contradictoires ou insuffisamment arbitrées.",
        "Je porte une responsabilité forte sans moyens ou autorité suffisants.",
        "Mon travail m'oblige à gérer régulièrement des émotions difficiles dans mes échanges professionnels.",
        "Je dois compenser des dysfonctionnements d'organisation pour que le travail sorte quand même."
      ]
    },
    {
      id: "E",
      title: "E. Ressources professionnelles - score inversé",
      shortTitle: "E Manque de ressources",
      type: "work",
      explore: "ce qui t'aide à faire face : marge de manœuvre, soutien, clarté, reconnaissance, équité.",
      sources: "modèle Exigences-Ressources (JD-R), Job Content Questionnaire de Karasek (latitude décisionnelle, soutien social), COPSOQ (clarté des rôles, justice), ERI de Siegrist (récompense)",
      chapitres: [3, 4],
      reversed: true,
      help: "Cette section est inversée au calcul : plus la ressource est présente, moins elle ajoute au score de risque.",
      questions: [
        "Je dispose d'une marge de manœuvre réelle pour organiser mon travail.",
        "Mon manager m'aide à arbitrer lorsque la charge dépasse la capacité réelle.",
        "Mes collègues constituent un soutien concret en cas de difficulté.",
        "Les objectifs et responsabilités sont suffisamment clairs.",
        "Mes efforts sont reconnus de manière crédible et proportionnée.",
        "La répartition des tâches et des responsabilités me paraît équitable."
      ]
    },
    {
      id: "F",
      title: "F. Récupération et signaux de santé",
      shortTitle: "F Récupération/santé",
      type: "recovery",
      explore: "ce que le repos te rend, et les signaux que ton corps et ton sommeil envoient.",
      sources: "Recovery Experience Questionnaire de Sonnentag et Fritz (détachement), ERI de Siegrist (surinvestissement), Burnout Assessment Tool (plaintes psychosomatiques)",
      chapitres: [1, 4],
      questions: [
        "Je rumine le travail le soir, le week-end ou pendant les congés.",
        "Mon sommeil est perturbé ou ne me paraît pas réparateur.",
        "J'ai réduit mes loisirs, activités physiques ou relations sociales à cause du travail.",
        "Je ressens des symptômes physiques inhabituels ou plus marqués qu'auparavant.",
        "Pour tenir ou dormir, je consomme plus souvent de l'alcool, d'autres substances ou des médicaments en dehors de leur prescription.",
        "J'ai fait davantage d'erreurs, d'oublis ou de quasi-accidents inhabituels dans mon travail."
      ]
    }
  ];

  // Partie G : ce qui t'aide à tenir. Ne compte pas dans les scores de risque : elle nourrit la page « Tes appuis » du rapport.
  const strengthPart = {
    id: "G",
    title: "G. Ce qui t'aide à tenir",
    explore: "tes points d'appui : ce qui te recharge, ce qui te soutient, ce que tu sais déjà faire pour te protéger.",
    sources: "Recovery Experience Questionnaire de Sonnentag et Fritz (détachement, relaxation, maîtrise), ressources personnelles du modèle JD-R (Xanthopoulou et al.), soutien social (Karasek), stratégies d'ajustement (Lazarus et Folkman)",
    chapitres: [3, 7],
    questions: [
      "Je vis au travail des moments où je me sens utile et à la hauteur.",
      "J'arrive à décrocher vraiment du travail au moins une soirée ou une journée par semaine.",
      "En dehors du travail, j'ai des personnes à qui je peux parler de ce que je vis.",
      "Je garde des activités qui me ressourcent (sport, nature, création, amis…) et je les pratique.",
      "Quand une difficulté se présente au travail, j'arrive à en parler ou à demander de l'aide.",
      "Quand j'indique qu'un délai ou une charge est irréaliste, un arbitrage ou un ajustement est possible."
    ]
  };

  // Partie R : l'échange (modèle de Siegrist). Hors du score sur 144, pour garder les seuils : elle complète la pièce « Le retour ».
  // R1-R3 : les trois formes de récompense (salaire, perspectives, sécurité), en sens positif. R4-R6 : le surengagement.
  const exchangePart = {
    id: "R",
    title: "R. Ce que tu donnes, ce qui revient",
    explore: "l'échange entre ce que tu investis et ce que tu reçois en retour, et ta façon de t'engager dans le travail.",
    sources: "Effort-Reward Imbalance Questionnaire de Siegrist (récompense : salaire, perspectives, sécurité de l'emploi ; surengagement)",
    chapitres: [4],
    reward: ["R1", "R2", "R3"],
    overcommitment: ["R4", "R5", "R6"],
    questions: [
      "Mon salaire est en rapport avec mon investissement et mes responsabilités.",
      "Mes perspectives d'évolution sont à la hauteur des efforts que je fournis.",
      "Je me sens en sécurité concernant la continuité de mon emploi.",
      "J'ai du mal à refuser une demande, même quand je suis déjà débordé·e.",
      "Je me sens obligé·e d'en faire plus que ce qu'on attend de moi pour prouver ma valeur.",
      "Dès le réveil, des préoccupations professionnelles me viennent à l'esprit et me pèsent."
    ]
  };

  // Partie BS : le bullshitomètre (données dans bullshitometre-data.js). Satirique, hors score.
  const BS = window.BULLOUT_BS || { questions: [], dims: [], profils: [] };
  const bullshitPart = {
    id: "BS",
    title: "Le bullshitomètre",
    explore: "la part d'absurde dans ton travail : réunions, tableaux de bord, livrables que personne ne lit. Pour rire, et pour voir si l'absurde t'amuse ou t'use.",
    sources: "« Grand Test du Bullshit Job » de Bull-Out, d'après Graeber (Bullshit Jobs, 2018) ; le sentiment d'inutilité au travail est lié au mal-être (Soffia, Wood et Burchell, 2022)",
    chapitres: [2, 4],
    questions: BS.questions
  };


  // Repères contextuels non notés : aucune unité, aucune agrégation avec A–F.
  // En particulier, un mieux hors travail n'est PAS une preuve de causalité.
  const temporalPart = {
    id: "T",
    title: "T. Depuis quand, et dans quelles conditions ?",
    explore: "la durée, l'évolution et les changements observés hors travail, sans diagnostic ni attribution causale automatique.",
    sources: "repérage clinique du burn-out (HAS), analyse des situations de travail (INRS) et questions originales Bull-Out non validées",
    chapitres: [1, 5, 6],
    questions: [
      { text: "Depuis quand ressens-tu les difficultés qui t'ont amené·e ici ?", options: [
        { text: "Je ne rencontre pas de difficulté particulière" },
        { text: "Depuis moins d'un mois" },
        { text: "Depuis un à trois mois" },
        { text: "Depuis trois mois à un an" },
        { text: "Depuis plus d'un an" },
        { text: "Je ne sais pas exactement" }
      ] },
      { text: "Ces dernières semaines, comment ces difficultés évoluent-elles ?", options: [
        { text: "Elles diminuent" }, { text: "Elles restent à peu près stables" },
        { text: "Elles augmentent" }, { text: "Elles fluctuent beaucoup" },
        { text: "Je ne sais pas" }, { text: "Je ne rencontre pas de difficulté particulière" }
      ] },
      { text: "Quand tu t'éloignes suffisamment du travail (repos, congé), que constates-tu ?", options: [
        { text: "Je n'ai pas pu le constater" }, { text: "Mes difficultés diminuent nettement" },
        { text: "Elles diminuent un peu" }, { text: "Elles changent peu" },
        { text: "Elles augmentent" }, { text: "Je ne rencontre pas de difficulté particulière" }
      ] },
      { text: "Ces quatre dernières semaines, j'ai dû renoncer à la qualité de travail que je juge nécessaire, faute de temps, de moyens ou à cause de consignes.", options: [
        { text: "Jamais ou presque" }, { text: "Rarement" }, { text: "Parfois" },
        { text: "Souvent" }, { text: "Presque toujours" }
      ] }
    ]
  };

  const alertQuestions = [
    "J'ai eu des idées noires ou suicidaires.",
    "Je me sens incapable de continuer à fonctionner normalement.",
    "J'ai des symptômes physiques inquiétants : malaise, douleur thoracique, essoufflement inhabituel, perte de contrôle."
  ];

  const contextQuestions = [
    { id: "harassment", label: "Harcèlement, humiliations, menaces ou violences", text: "Je subis ou pense subir du harcèlement, des humiliations, des menaces ou des violences." },
    { id: "ethicalConflict", label: "Conflit éthique", text: "Je vis un conflit éthique : on me demande de faire un travail contraire à mes valeurs professionnelles, à la qualité ou à la sécurité." },
    { id: "personalBurden", label: "Situation personnelle lourde", text: "Je vis en parallèle une situation personnelle lourde : deuil, séparation, maladie, aidance, charge familiale importante." },
    { id: "previousMedicalAlert", label: "Arrêt ou alerte médicale antérieure", text: "J'ai déjà eu un arrêt, une alerte médicale ou une consultation liée à cette situation de travail." },
    { id: "collectiveSignal", label: "Plusieurs collègues touchés", text: "Plusieurs collègues semblent vivre le même type d'usure ou de surcharge." },
    { id: "safetySensitiveJob", label: "Poste à enjeu de sécurité", text: "Mon poste comporte des enjeux de sécurité : conduite, machines, soins, décisions critiques, erreurs à conséquences graves." },
    { id: "fearToSpeak", label: "Peur de parler", text: "J'ai peur de parler de la situation à mon manager ou à mon organisation." },
    { id: "wantToLeave", label: "Envie de partir", text: "Je pense sérieusement à quitter mon poste ou mon métier." }
  ];

  const itemInsights = {
    A1: { interpretation: "Récupération insuffisante après la journée.", action: "Identifier ce qui peut être arrêté ou réduit en fin de journée." },
    A2: { interpretation: "Récupération courte insuffisante.", action: "Prévoir une récupération plus protégée et moins fragmentée." },
    A3: { interpretation: "Dette d'énergie anticipée dès le matin.", action: "Réduire temporairement l'exposition aux tâches les plus coûteuses." },
    A4: { interpretation: "Effort disproportionné pour des tâches ordinaires.", action: "Simplifier le niveau de qualité attendu et limiter le multitâche." },
    A5: { interpretation: "Irritabilité ou saturation face aux sollicitations.", action: "Réduire les interruptions et restaurer des plages calmes." },
    A6: { interpretation: "Saturation cognitive ou mémoire de travail fragilisée.", action: "Protéger des temps de concentration et réduire les bascules de contexte." },
    B1: { interpretation: "Indifférence croissante à des tâches auparavant importantes.", action: "Repérer depuis quand ce sentiment existe et dans quelles situations il apparaît, sans en supposer le mécanisme." },
    B2: { interpretation: "Amertume ou cynisme rapportés.", action: "Repérer les situations associées et distinguer désaccord, perte de sens et réaction à une surcharge." },
    B3: { interpretation: "Évitement d'interactions coûteuses.", action: "Réduire les interactions non utiles ou cadrer les échanges difficiles." },
    B4: { interpretation: "Patience ou empathie entamée.", action: "Traiter la charge émotionnelle et éviter d'ajouter du relationnel décoratif." },
    B5: { interpretation: "Retrait relationnel pour tenir.", action: "Alléger la charge sociale et clarifier les interactions indispensables." },
    B6: { interpretation: "Désengagement : le travail se fait en pilote automatique.", action: "Repérer depuis quand, et ce qui a coupé l'envie : charge, absurde, manque de retour. Ne pas le traiter comme un défaut de motivation." },
    C1: { interpretation: "Confiance professionnelle fragilisée.", action: "Clarifier les attentes et demander un feedback utile sur le travail réel." },
    C2: { interpretation: "Qualité ou fiabilité en baisse malgré les efforts.", action: "Réduire le multitâche et traiter les causes d'erreur." },
    C3: { interpretation: "Perte de sens.", action: "Relier les tâches aux décisions utiles ou supprimer les livrables décoratifs." },
    C4: { interpretation: "Sentiment de compétence altéré.", action: "Restaurer la maîtrise par des tâches cadrées et un périmètre réaliste." },
    C5: { interpretation: "Sentiment d'inutilité en fin de journée.", action: "Définir un résultat utile et atteignable avant d'empiler les demandes." },
    C6: { interpretation: "Effort accru pour parvenir à un travail jugé satisfaisant.", action: "Préciser les critères de qualité, le temps disponible et les éventuels obstacles." },
    D1: { interpretation: "Surcharge.", action: "Lister les tâches et demander ce qui doit être arrêté, reporté ou simplifié." },
    D2: { interpretation: "Interruptions fréquentes gênant la réalisation des priorités.", action: "Documenter deux interruptions et demander des plages de travail protégées." },
    D3: { interpretation: "Contradictions de priorité.", action: "Demander un arbitrage écrit sur la priorité de la semaine." },
    D4: { interpretation: "Responsabilité sans moyens.", action: "Rendre visible l'écart entre responsabilité, autorité et ressources." },
    D5: { interpretation: "Charge émotionnelle ou relationnelle élevée.", action: "Organiser du soutien, du relais ou un temps de décompression après les séquences lourdes." },
    D6: { interpretation: "Compensation organisationnelle.", action: "Documenter les dysfonctionnements compensés et demander un arbitrage." },
    E1: { interpretation: "Autonomie insuffisante.", action: "Négocier au moins une marge de manœuvre sur la méthode ou le rythme." },
    E2: { interpretation: "Soutien managérial insuffisant.", action: "Demander un arbitrage concret plutôt qu'un encouragement général." },
    E3: { interpretation: "Soutien collectif insuffisant.", action: "Identifier un relais, un binôme ou un partage de charge." },
    E4: { interpretation: "Clarté faible.", action: "Clarifier objectif, livrable, délai et niveau de détail attendu." },
    E5: { interpretation: "Reconnaissance faible.", action: "Rendre visible le travail invisible et demander un retour proportionné aux efforts." },
    E6: { interpretation: "Équité faible.", action: "Expliciter les critères de répartition, de décision ou de reconnaissance." },
    F1: { interpretation: "Rumination.", action: "Installer un rituel de fermeture et limiter les relances hors travail." },
    F2: { interpretation: "Sommeil perturbé.", action: "Protéger les soirées et consulter si le trouble persiste." },
    F3: { interpretation: "Loisirs et liens sociaux réduits.", action: "Réserver une activité non négociable hors travail cette semaine." },
    F4: { interpretation: "Symptômes physiques inhabituels, sans cause établie.", action: "Préciser leur nature, leur durée et demander un avis médical adapté." },
    F5: { interpretation: "Consommations augmentées pour tenir ou dormir.", action: "Examiner les produits, les prises et les interactions possibles avec un professionnel de santé, sans arrêt brutal de médicament prescrit." },
    F6: { interpretation: "Risque fonctionnel ou sécurité.", action: "Réduire l'exposition aux tâches à risque et demander de l'aide rapidement." }
  };

  const humanItemLabels = {
    A1: "énergie personnelle insuffisante après le travail",
    A2: "récupération courte insuffisante",
    A3: "saturation anticipée dès le début de journée",
    A4: "effort disproportionné pour les tâches ordinaires",
    A5: "irritabilité ou hypersensibilité",
    A6: "attention ou mémoire de travail fragilisée",
    B1: "mise à distance mentale",
    B2: "cynisme ou amertume",
    B3: "évitement d'interactions coûteuses",
    B4: "empathie ou patience entamée",
    B5: "retrait relationnel",
    B6: "travail en pilote automatique",
    C1: "doute sur la qualité du travail",
    C2: "qualité ou fiabilité en baisse",
    C3: "perte de sens",
    C4: "sentiment de compétence altéré",
    C5: "sentiment d'utilité faible",
    C6: "efforts accrus pour la qualité du travail",
    D1: "surcharge",
    D2: "interruptions fréquentes",
    D3: "priorités contradictoires",
    D4: "responsabilité sans moyens",
    D5: "charge émotionnelle ou relationnelle élevée",
    D6: "compensation de dysfonctionnements",
    E1: "autonomie insuffisante",
    E2: "soutien managérial insuffisant",
    E3: "soutien collectif insuffisant",
    E4: "clarté insuffisante",
    E5: "reconnaissance faible",
    E6: "équité faible",
    F1: "rumination",
    F2: "sommeil perturbé",
    F3: "loisirs ou liens sociaux réduits",
    F4: "symptômes physiques inhabituels",
    F5: "augmentation de consommations pour tenir ou dormir",
    F6: "risque fonctionnel ou sécurité"
  };

  function getHumanItemLabel(itemId) {
    return humanItemLabels[itemId] || itemInsights[itemId]?.interpretation || "signal à investiguer";
  }

  const sectionComments = {
    A: {
      faible: "Peu de réponses d'épuisement fréquentes dans ce module.",
      vigilance: "Quelques manifestations d'épuisement sont déclarées.",
      élevé: "Plusieurs réponses décrivent un épuisement fréquent, sans en mesurer la quantité.",
      alerte: "Les manifestations d'épuisement sont déclarées très fréquemment. Leur retentissement et leur contexte méritent une évaluation adaptée."
    },
    B: {
      faible: "La distance mentale reste limitée.",
      vigilance: "Quelques réponses décrivent une distance accrue vis-à-vis du travail.",
      élevé: "Plusieurs réponses décrivent du détachement ou du cynisme fréquent, sans en établir la fonction.",
      alerte: "Le retrait mental est très marqué : il ne faut pas le réduire à de la mauvaise volonté."
    },
    C: {
      faible: "Le sentiment d'efficacité et de sens reste relativement préservé.",
      vigilance: "Le rapport au travail commence à perdre en maîtrise ou en utilité.",
      élevé: "Le score efficacité/sens suggère une perte de maîtrise ou une baisse du sentiment d'utilité.",
      alerte: "La perte de maîtrise ou de sens est très forte et peut amplifier l'usure."
    },
    D: {
      faible: "Les exigences déclarées restent contenues.",
      vigilance: "Les exigences deviennent un point de vigilance.",
      élevé: "Plusieurs contraintes professionnelles sont déclarées fréquemment.",
      alerte: "De nombreuses contraintes sont déclarées presque toujours ; leur intensité concrète et les possibilités d'aménagement restent à examiner."
    },
    E: {
      faible: "Les ressources semblent globalement présentes.",
      vigilance: "Certaines ressources protectrices manquent.",
      élevé: "Plusieurs ressources professionnelles semblent peu disponibles d'après tes réponses.",
      alerte: "La plupart des ressources professionnelles de cette liste sont peu présentes."
    },
    F: {
      faible: "Peu de difficultés de récupération et de santé sont déclarées dans cette partie.",
      vigilance: "La récupération montre des signes de fragilité.",
      élevé: "La récupération et les signaux de santé demandent une attention particulière.",
      alerte: "De nombreuses difficultés de récupération ou de santé sont signalées fréquemment ; leur nature et leur retentissement méritent une attention particulière."
    }
  };

  const profileRecommendations = {
    protected: {
      title: "Peu de difficultés déclarées",
      recommendation: "Maintenir les protections : charge réaliste, marges de manœuvre, soutien, récupération et signaux faibles suivis régulièrement."
    },
    tension: {
      title: "Contraintes professionnelles marquées",
      recommendation: "Agir rapidement sur la charge, les priorités et les ressources avant que l'usure ne s'installe."
    },
    exhaustion: {
      title: "Épuisement et récupération difficiles",
      recommendation: "Réduire l'exposition, protéger la récupération et envisager un échange avec le médecin du travail ou le médecin traitant."
    },
    disengagement: {
      title: "Distance mentale ou difficultés de sens",
      recommendation: "Travailler sur reconnaissance, sens, équité, conflits, charge émotionnelle et arbitrages de charge."
    },
    alert: {
      title: "Signal de sécurité déclaré",
      recommendation: "Demander un avis médical rapide. En cas de danger immédiat : 15 / 112. En cas d'idées suicidaires en France : 3114."
    },
    mixed: {
      title: "Plusieurs dimensions à explorer",
      recommendation: "Identifier les sections les plus élevées, réduire les contraintes les plus coûteuses et renforcer les ressources concrètes cette semaine."
    }
  };

  const stakeholders = {
    occupationalDoctor: {
      name: "Médecin du travail",
      anchor: "#aide-medecin-travail",
      shortRole: "Prévention santé-travail, analyse du lien santé/poste et aménagements possibles.",
      script: "Je souhaite un échange confidentiel sur l'impact de ma charge sur ma santé.",
      defaultWhy: "Peut être utile pour analyser le lien entre santé, poste, charge et aménagements."
    },
    generalPractitioner: {
      name: "Médecin généraliste",
      anchor: "#aide-generaliste",
      shortRole: "Évaluation clinique, diagnostics différentiels, arrêt ou orientation si nécessaire.",
      script: "Je constate une dégradation de mon sommeil, de mon énergie et de mon fonctionnement.",
      defaultWhy: "Peut être utile si les signaux santé, sommeil ou fonctionnement deviennent importants."
    },
    occupationalNurse: {
      name: "Infirmier·ère en santé au travail",
      anchor: "#aide-infirmier-travail",
      shortRole: "Premier point santé-travail, écoute, repérage et orientation.",
      script: "J'aimerais faire un premier point santé-travail et savoir vers qui me tourner.",
      defaultWhy: "Peut être utile pour un premier échange et une orientation vers le bon acteur."
    },
    psychologist: {
      name: "Psychologue",
      anchor: "#aide-psychologue",
      shortRole: "Soutien psychologique, rumination, limites, récupération et clarification.",
      script: "Je souhaite comprendre ce qui m'épuise et préparer des limites réalistes au travail.",
      defaultWhy: "Peut être utile en cas de rumination, culpabilité, retrait ou difficulté de récupération."
    },
    psychiatrist: {
      name: "Psychiatre",
      anchor: "#aide-psychiatre",
      shortRole: "Avis médical spécialisé en santé mentale, troubles sévères ou traitement.",
      script: "Mes symptômes deviennent sévères et impactent mon fonctionnement.",
      defaultWhy: "Peut être utile si les symptômes sont sévères, persistants ou associés à un risque."
    },
    manager: {
      name: "Manager direct",
      anchor: "#aide-manager",
      shortRole: "Arbitrage de charge, priorités, délais, ressources et niveau de qualité attendu.",
      script: "Qu'est-ce qu'on retire, reporte ou simplifie ?",
      defaultWhy: "Peut être utile pour traiter la charge et les priorités, sans transmettre de détail médical."
    },
    hr: {
      name: "Ressources humaines",
      anchor: "#aide-rh",
      shortRole: "Dispositifs internes, procédures, médiation, signalements et organisation.",
      script: "Je souhaite connaître les dispositifs internes disponibles sans transmettre de détails médicaux.",
      defaultWhy: "Peut être utile si l'arbitrage managérial ne suffit pas ou si une procédure est nécessaire."
    },
    cse: {
      name: "CSE / CSSCT / représentants du personnel",
      anchor: "#aide-cse",
      shortRole: "Conditions de travail, problème collectif, alerte et conseil sur les démarches.",
      script: "Je souhaite savoir si d'autres personnes rencontrent les mêmes difficultés et quelles démarches collectives sont possibles.",
      defaultWhy: "Peut être utile si la difficulté semble collective ou récurrente dans l'organisation."
    },
    socialWorker: {
      name: "Assistant·e social·e du travail",
      anchor: "#aide-assistant-social",
      shortRole: "Droits, démarches, conséquences sociales, financières ou administratives.",
      script: "J'ai besoin d'aide pour comprendre les options et démarches possibles.",
      defaultWhy: "Peut être utile si la situation a des conséquences sociales, familiales ou administratives."
    },
    emergency: {
      name: "Urgence médicale / 3114",
      anchor: "#aide-urgence",
      shortRole: "Danger immédiat, risque suicidaire ou situation aiguë.",
      script: "Je ne me sens pas en sécurité et j'ai besoin d'aide immédiatement.",
      defaultWhy: "Réponse positive à une question d'alerte ou situation de danger immédiat."
    }
  };

  const questionnaireRoot = document.querySelector("#questionnaire-root");
  const form = document.querySelector("#burnout-form");
  const formError = document.querySelector("#form-error");
  let progressCount = document.querySelector("#progress-count");
  let progressTotal = document.querySelector("#progress-total");
  let progressBar = document.querySelector("#progress-bar");
  const resultsPanel = document.querySelector("#results");
  const resetButton = document.querySelector("#reset-form");
  const navToggle = document.querySelector(".nav-toggle");
  const mainMenu = document.querySelector("#main-menu");
  const navGroups = document.querySelectorAll(".nav-group");

  let latestResultText = "";

  // ---------- Questionnaire : écran de questions repris de Psytest ----------
  // Une partie à la fois ; fil d'Ariane des parties à gauche, numéros des questions à droite,
  // barre de progression découpée par partie, réponses compactes avec une jauge « du moins au plus ».
  const PART_ICONS = {
    A: "M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8",
    B: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.9",
    C: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    D: "M21 8v13H3V8M1 3h22v5H1zM10 12h4",
    E: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
    F: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
    R: "M7 10h14l-4-4M17 14H3l4 4",
    BS: "M19 5 5 19M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    G: "M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.5l7.1-.6z",
    T: "M12 2v4M12 18v4M4 12h4M16 12h4M12 8v4l3 2",
    context: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01",
    alerts: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"
  };
  const PART_TINTS = ["sapin", "orange", "anis", "creme", "sapin", "anis", "creme", "orange"];
  const svgIcon = (d) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  const ICON_CHECK = "M20 6 9 17l-5-5";
  const ICON_CLOCK = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2";
  const ICON_LEFT = "M15 18l-6-6 6-6";
  const ICON_RIGHT = "M9 18l6-6-6-6";
  let questionNumber = 0;

  function partHead(key, title, index, total) {
    const tint = PART_TINTS[index % PART_TINTS.length];
    return `<header class="screen-head"><span class="ti t-${tint}">${svgIcon(PART_ICONS[key] || PART_ICONS.context)}</span>`
      + `<div><p class="k">Partie ${index + 1} sur ${total}</p><h3 id="section-${key}">${title}</h3></div>`
      + `<span class="n"><b data-part-count>0</b><small>/<span data-part-total>0</span></small></span></header>`
      + `<p class="q-counter" aria-live="polite"></p>`;
  }

  function buildQuestionnaire() {
    const fragment = document.createDocumentFragment();
    const total = sections.length + 5 + (BS.questions.length ? 1 : 0);
    questionNumber = 0;

    const chapLinks = (list) => list.map((n) => `<a href="test.html#chapitre-${n}" target="_blank" rel="noopener">chapitre ${n}</a>`).join(" et ");
    const about = (explore, sources, chapitres) => `<div class="part-about"><p><b>Ce que cette partie explore :</b> ${explore}</p>`
      + `<p class="part-src"><b>Inspirée de :</b> ${sources}. Questions reformulées, non validées en l'état. Vu au ${chapLinks(chapitres)} de la formation.</p></div>`;
    const addPart = (key, title, period, help, items, index, aboutHTML = "") => {
      const part = document.createElement("section");
      part.className = "question-section";
      part.dataset.part = key;
      part.dataset.title = title.replace(/ - score inversé$/, "");
      part.setAttribute("aria-labelledby", `section-${key}`);
      part.innerHTML = partHead(key, part.dataset.title, index, total)
        + (period ? `<p class="period">${svgIcon(ICON_CLOCK)}<span>${period}</span></p>` : "")
        + aboutHTML
        + (help ? `<p class="part-help">${help}</p>` : "");
      const list = document.createElement("ol");
      list.className = "qlist";
      items.forEach((item) => list.appendChild(item));
      part.appendChild(list);
      fragment.appendChild(part);
    };

    // Ordre : la personne (A-C), le travail (D, E, R), l'absurde (BS), la récupération (F), les appuis (G), puis contexte et alertes.
    const PERIOD = "Sur les 4 dernières semaines, sauf événement exceptionnel majeur.";
    let index = 0;
    const scored = (id) => {
      const section = sections.find((s) => s.id === id);
      addPart(section.id, section.title, PERIOD, section.help,
        section.questions.map((question, qIndex) => createRatingQuestion(section, question, qIndex)), index++,
        about(section.explore, section.sources, section.chapitres));
    };
    ["A", "B", "C", "D", "E"].forEach(scored);
    addPart("R", exchangePart.title, PERIOD,
      "Les trois premières questions décrivent ce qui revient : une réponse haute est une bonne nouvelle. Les trois suivantes décrivent ta façon de t'engager. Cette partie n'entre pas dans les six scores A à F.",
      exchangePart.questions.map((question, qIndex) => createRatingQuestion(exchangePart, question, qIndex)), index++,
      about(exchangePart.explore, exchangePart.sources, exchangePart.chapitres));
    if (bullshitPart.questions.length) addPart("BS", bullshitPart.title, "Pause humour : la réponse la plus proche de ton quotidien.",
      "Ton satirique assumé. Rien ici ne compte dans les scores : le rapport s'en sert pour lire ta distance et ton rapport au sens.",
      bullshitPart.questions.map((question, qIndex) => createChoiceQuestion(bullshitPart, question, qIndex)), index++,
      about(bullshitPart.explore, bullshitPart.sources, bullshitPart.chapitres));
    scored("F");
    addPart("G", strengthPart.title, "Sur les 4 dernières semaines. Ne compte pas dans les scores de risque.",
      "Ici, une réponse haute est une bonne nouvelle : ce sont tes points d'appui. Ils forment une page à part dans ton rapport.",
      strengthPart.questions.map((question, qIndex) => createRatingQuestion(strengthPart, question, qIndex)), index++,
      about(strengthPart.explore, strengthPart.sources, strengthPart.chapitres));
    addPart("T", temporalPart.title, "Repères supplémentaires · hors score A–F.",
      "Ces questions décrivent une chronologie et une difficulté de qualité empêchée. Elles ne sont pas utilisées pour calculer un risque de burn-out.",
      temporalPart.questions.map((question, qIndex) => createChoiceQuestion(temporalPart, question, qIndex)), index++,
      about(temporalPart.explore, temporalPart.sources, temporalPart.chapitres));
    addPart("context", "Contexte particulier", "Ne compte pas dans le score.",
      "Ces éléments ne modifient pas le score, mais ils changent la lecture du résultat. Ils peuvent orienter vers les bons interlocuteurs.",
      contextQuestions.map((question, i) => createYesNoQuestion(question.text, i, "context")), index++,
      about("ce qui se passe autour du travail et dans l'équipe : cela change la lecture du résultat et les personnes à qui en parler.", "repérage clinique du syndrome d'épuisement professionnel (HAS, 2017) et prévention des risques psychosociaux (INRS)", [5]));
    addPart("alerts", "Questions d'alerte", "Réponds oui ou non.",
      "Une réponse oui déclenche un message de prudence médicale.",
      alertQuestions.map((question, i) => createYesNoQuestion(question, i, "alert")), index++);

    questionnaireRoot.appendChild(fragment);
    progressTotal.textContent = String(sections.length * 6 + exchangePart.questions.length + bullshitPart.questions.length + strengthPart.questions.length + temporalPart.questions.length + contextQuestions.length + alertQuestions.length);
    console.debug("Questionnaire initialisé", { sections: sections.length, contextQuestions: contextQuestions.length, alertQuestions: alertQuestions.length });
  }

  function questionShell(name, text) {
    questionNumber += 1;
    const item = document.createElement("li");
    item.className = "question-item q";
    item.id = `item-${name}`;
    item.dataset.n = String(questionNumber);
    item.innerHTML = `<div class="q-head"><span class="q-num" aria-hidden="true">${questionNumber}</span>`
      + `<p class="q-text" id="${name}-label"><span class="sr-only">Question ${questionNumber} : </span>${text}</p></div>`;
    return item;
  }

  function createRatingQuestion(section, question, index) {
    const name = `${section.id}${index + 1}`;
    const item = questionShell(name, question);
    const gauge = (value) => `<span class="gauge" aria-hidden="true">${[1, 2, 3, 4].map((k) => `<i class="${k <= value ? "on" : ""}"></i>`).join("")}</span>`;
    const choices = ratingLabels.map((label, value) => {
      const text = label.replace(/^\d+\s*-\s*/, "");
      return `<label class="choice"><input type="radio" name="${name}" value="${value}" required><span class="opt"><kbd class="opt-k" aria-hidden="true">${value}</kbd><span class="opt-t">${text.charAt(0).toUpperCase()}${text.slice(1)}</span>${gauge(value)}</span></label>`;
    }).join("");
    item.insertAdjacentHTML("beforeend", `<fieldset class="choices choices-5" role="radiogroup" aria-labelledby="${name}-label">${choices}</fieldset>`);
    return item;
  }

  // Question à choix (bullshitomètre) : quatre réponses rédigées, touches 1 à 4.
  function createChoiceQuestion(section, question, index) {
    const name = `${section.id}${index + 1}`;
    const item = questionShell(name, question.text);
    if (question.sub) item.querySelector(".q-head").insertAdjacentHTML("beforeend", `<p class="q-sub">${question.sub}</p>`);
    const choices = question.options.map((option, value) => `<label class="choice"><input type="radio" name="${name}" value="${value}" required><span class="opt"><kbd class="opt-k" aria-hidden="true">${section.id === "T" && index === 3 ? value : value + 1}</kbd><span class="opt-t">${option.text}</span></span></label>`).join("");
    item.insertAdjacentHTML("beforeend", `<fieldset class="choices choices-4" role="radiogroup" aria-labelledby="${name}-label">${choices}</fieldset>`);
    return item;
  }

  function createYesNoQuestion(question, index, prefix = "alert") {
    const name = `${prefix}${index + 1}`;
    const item = questionShell(name, question);
    const choices = [
      { label: "Non", value: "no", key: "N" },
      { label: "Oui", value: "yes", key: "O" }
    ].map((choice) => `<label class="choice"><input type="radio" name="${name}" value="${choice.value}" required><span class="opt"><kbd class="opt-k" aria-hidden="true">${choice.key}</kbd><span class="opt-t">${choice.label}</span></span></label>`).join("");
    item.insertAdjacentHTML("beforeend", `<fieldset class="choices choices-2" role="radiogroup" aria-labelledby="${name}-label">${choices}</fieldset>`);
    if (prefix === "alert") {
      // Ces réponses appellent des orientations distinctes ; ce questionnaire ne gradue pas l'urgence.
      const messages = [
        'Si tu as des idées suicidaires ou te sens en danger, appelle le <a href="tel:3114"><b>3114</b></a> (gratuit, 24 h/24 en France). Danger immédiat : <a href="tel:15"><b>15</b></a> ou <a href="tel:112"><b>112</b></a>.',
        "Si tu ne parviens plus à fonctionner normalement, contacte rapidement un professionnel de santé pour examiner la situation et définir l'aide adaptée.",
        'Si tu ressens actuellement une douleur thoracique, un essoufflement inhabituel, un malaise ou un autre symptôme aigu inquiétant, appelle le <a href="tel:15"><b>15</b></a> ou le <a href="tel:112"><b>112</b></a>. Sinon, demande un avis médical adapté.'
      ];
      item.insertAdjacentHTML("beforeend", `<div class="q-safety" role="alert" hidden><p><b>Cette réponse mérite une attention particulière.</b> ${messages[index]}</p><p class="q-safety-next">Tu peux continuer le questionnaire si tu le souhaites.</p></div>`);
    }
    return item;
  }

  let currentPart = 0;
  let parts = [];
  let prevButton = null;
  let nextButton = null;
  let submitButton = null;
  let navStatusEl = null;
  let partsFils = [];
  let questionsFil = null;
  let topSegments = null;
  let topLabel = null;

  const partStats = (part) => {
    const items = [...part.querySelectorAll(".question-item")];
    return { done: items.filter((item) => item.querySelector("input:checked")).length, total: items.length };
  };

  function partsFilHTML() {
    return `<ol class="fil">${parts.map((part, i) => {
      const st = partStats(part);
      return `<li data-i="${i}"><button type="button" data-go="${i}" style="--p:0%"><span class="num">${i + 1}</span><span>${part.dataset.title}</span><span class="cnt">${st.done}/${st.total}</span></button></li>`;
    }).join("")}</ol>`;
  }

  function initPaging() {
    parts = [...questionnaireRoot.querySelectorAll(".question-section")];
    if (!parts.length) return;
    form.classList.add("is-paged", "is-onebyone");

    // Mise en page à trois colonnes, comme l'écran de questions de Psytest
    const layout = document.createElement("div");
    layout.className = "q-layout";
    layout.innerHTML = `<aside class="q-rail q-rail-left" aria-label="Parties du questionnaire"><p class="rail-title">Les ${parts.length} parties</p><div class="parts-fil"></div></aside>`
      + `<div class="q-main"></div>`
      + `<aside class="q-rail q-rail-right" aria-label="Questions de cette partie"><p class="rail-title">Dans cette partie</p><ol class="fil qfil"></ol></aside>`;
    const main = layout.querySelector(".q-main");
    const progress = form.querySelector(".progress-wrap");
    form.prepend(layout);
    form.prepend(progress);
    [questionnaireRoot, form.querySelector(".form-actions"), form.querySelector("#form-error")].forEach((el) => el && main.appendChild(el));

    // Barre de progression découpée par partie (sous l'en-tête)
    progress.innerHTML = `<div class="q-top"><b class="q-top-title"></b><span class="q-top-sub"></span></div><div class="q-progress" aria-hidden="true">${parts.map((part) => `<i style="--w:${partStats(part).total}"></i>`).join("")}</div>`
      + `<span class="sr-only"><span id="progress-count">0</span> / <span id="progress-total">0</span> réponses</span>`;
    progressCount = progress.querySelector("#progress-count");
    progressTotal = progress.querySelector("#progress-total");
    progressBar = null;
    topSegments = [...progress.querySelectorAll(".q-progress i")];
    topLabel = progress.querySelector(".q-top");

    const leftFil = layout.querySelector(".parts-fil");
    leftFil.innerHTML = partsFilHTML();
    questionsFil = layout.querySelector(".qfil");

    // Navigation en bas de partie
    const actions = main.querySelector(".form-actions");
    actions.classList.add("q-nav");
    submitButton = actions.querySelector("[type='submit']");
    const resetButtonEl = actions.querySelector("#reset-form");
    actions.innerHTML = "";
    navStatusEl = document.createElement("div");
    navStatusEl.className = "nav-status";
    navStatusEl.setAttribute("aria-live", "polite");
    const buttons = document.createElement("div");
    buttons.className = "nav-buttons";
    prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "button secondary";
    nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "button primary form-nav-next";
    nextButton.innerHTML = `Partie suivante ${svgIcon(ICON_RIGHT)}`;
    submitButton.innerHTML = `Obtenir mon rapport ${svgIcon(ICON_RIGHT)}`;
    buttons.append(prevButton, nextButton, submitButton);
    const allParts = document.createElement("details");
    allParts.className = "parts only-narrow";
    allParts.innerHTML = `<summary>Toutes les parties</summary><div class="parts-fil">${partsFilHTML()}</div>`;
    const resetWrap = document.createElement("p");
    resetWrap.className = "q-reset";
    if (resetButtonEl) { resetButtonEl.className = "button ghost small"; resetWrap.appendChild(resetButtonEl); }
    actions.append(navStatusEl, buttons, allParts, resetWrap);
    partsFils = [leftFil, allParts.querySelector(".parts-fil")];

    prevButton.addEventListener("click", stepBack);
    nextButton.addEventListener("click", stepForward);
    layout.addEventListener("click", (event) => {
      const go = event.target.closest("[data-go]");
      if (go) { allParts.open = false; showPart(Number(go.dataset.go), true); }
      const q = event.target.closest("[data-q]");
      if (q) showQuestion(Number(q.dataset.q), true);
      const first = event.target.closest("#first-missing");
      if (first) markMissing(parts[currentPart]);
      const suite = event.target.closest("[data-part-next]");
      if (suite) stepForward();
    });

    form.addEventListener("change", (event) => {
      const item = event.target.closest(".question-item");
      if (item) {
        item.classList.add("is-answered");
        item.classList.remove("is-missing");
      }
      if (!form.querySelector(".question-item.is-missing")) formError.hidden = true;
      refreshPaging();
      // Comme dans Psytest : une réponse fait venir la question suivante, au même endroit.
      const safety = item?.querySelector(".q-safety");
      if (safety) safety.hidden = event.target.value !== "yes";
      if (item && item === partItems(parts[currentPart])[currentQ] && !(safety && event.target.value === "yes")) {
        clearTimeout(advanceTimer);
        advanceTimer = setTimeout(() => { if (partItems(parts[currentPart])[currentQ] === item) stepForward(); }, 320);
      }
    });

    // Clavier : 0 à 4 répondent, N ou O pour non ou oui, flèches pour revenir ou avancer, Entrée pour continuer.
    document.addEventListener("keydown", (event) => {
      if (document.querySelector("#questionnaire")?.hidden || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target.closest?.("input[type='text'], input[type='file'], textarea, select, summary, a, [contenteditable]")) return;
      if (!form.contains(document.activeElement) && document.activeElement !== document.body) return;
      const item = partItems(parts[currentPart])[currentQ];
      if (event.key === "ArrowLeft") { event.preventDefault(); stepBack(); return; }
      if (event.key === "ArrowRight") { event.preventDefault(); stepForward(); return; }
      if (event.key === "Enter" && !event.target.closest?.("button")) {
        event.preventDefault();
        if (!item || item.querySelector("input:checked")) stepForward();
        return;
      }
      if (!item) return;
      const key = event.key.toLowerCase();
      const inputs = [...item.querySelectorAll("input[type='radio']")];
      let target = null;
      if (inputs.length === 5 && /^[0-4]$/.test(key)) target = inputs[Number(key)];
      if (inputs.length === 4 && /^[1-4]$/.test(key)) target = inputs[Number(key) - 1];
      if (inputs.length === 6 && /^[1-6]$/.test(key)) target = inputs[Number(key) - 1];
      if (inputs.length === 2) target = key === "n" || key === "1" ? inputs[0] : key === "o" || key === "2" ? inputs[1] : null;
      if (!target) return;
      event.preventDefault();
      target.checked = true;
      target.focus({ preventScroll: true });
      target.dispatchEvent(new Event("change", { bubbles: true }));
    });

    showPart(0, false);
  }

  function refreshPaging() {
    if (!parts.length) return;
    const stats = parts.map(partStats);
    partsFils.forEach((fil) => fil.querySelectorAll("li").forEach((li, i) => {
      const st = stats[i];
      const complete = st.done === st.total;
      li.className = [i === currentPart ? "here" : complete ? "past" : "", complete ? "complete" : ""].join(" ").trim();
      const btn = li.querySelector("button");
      btn.style.setProperty("--p", `${st.total ? Math.round((100 * st.done) / st.total) : 0}%`);
      if (i === currentPart) btn.setAttribute("aria-current", "step"); else btn.removeAttribute("aria-current");
      li.querySelector(".cnt").textContent = `${st.done}/${st.total}`;
    }));
    topSegments.forEach((seg, i) => {
      seg.style.setProperty("--p", `${stats[i].total ? (100 * stats[i].done) / stats[i].total : 0}%`);
      seg.classList.toggle("current", i === currentPart);
    });
    const done = stats.reduce((sum, st) => sum + st.done, 0);
    const total = stats.reduce((sum, st) => sum + st.total, 0);
    topLabel.querySelector(".q-top-title").textContent = parts[currentPart].dataset.title;
    topLabel.querySelector(".q-top-sub").textContent = `Partie ${currentPart + 1}/${parts.length} · ${done}/${total} réponses`;
    const part = parts[currentPart];
    part.querySelector("[data-part-count]").textContent = String(stats[currentPart].done);
    part.querySelector("[data-part-total]").textContent = String(stats[currentPart].total);
    questionsFil.querySelectorAll("li").forEach((li) => {
      const item = document.getElementById(li.dataset.item);
      li.classList.toggle("past", Boolean(item?.querySelector("input:checked")));
    });
    const left = stats[currentPart].total - stats[currentPart].done;
    navStatusEl.innerHTML = left
      ? `<span>${left} question${left > 1 ? "s" : ""} sans réponse dans cette partie</span><button class="button link" type="button" id="first-missing">Aller à la première</button>`
      : `<span class="done">${svgIcon(ICON_CHECK)} Partie complète</span>`;
  }

  function markMissing(scope) {
    const missing = [...scope.querySelectorAll(".question-item")].filter((item) => !item.querySelector("input:checked"));
    missing.forEach((item) => item.classList.add("is-missing"));
    if (missing.length && scope === parts[currentPart]) showQuestion(partItems(scope).indexOf(missing[0]), false);
    if (missing.length) {
      formError.textContent = missing.length === 1
        ? "Il reste une question sans réponse dans cette partie."
        : `Il reste ${missing.length} questions sans réponse dans cette partie.`;
      formError.hidden = false;
      missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
      missing[0].querySelector("input")?.focus({ preventScroll: true });
    }
    return missing.length > 0;
  }

  let currentQ = 0;
  let advanceTimer = 0;
  const partItems = (part) => (part ? [...part.querySelectorAll(".question-item")] : []);
  const answerLabel = (item) => {
    const checked = item.querySelector("input:checked");
    return checked ? checked.closest(".choice").querySelector(".opt-t").textContent : "";
  };

  // Une question à la fois. Après la dernière question d'une partie : le résumé de la partie.
  function showQuestion(index, focus) {
    const part = parts[currentPart];
    const items = partItems(part);
    clearTimeout(advanceTimer);
    currentQ = Math.max(0, Math.min(items.length, index));
    items.forEach((item, i) => { item.hidden = i !== currentQ; });
    let review = part.querySelector(".part-review");
    if (!review) {
      review = document.createElement("div");
      review.className = "part-review";
      part.appendChild(review);
    }
    const inReview = currentQ === items.length;
    review.hidden = !inReview;
    part.classList.toggle("in-review", inReview);
    const isLast = currentPart === parts.length - 1;
    if (inReview) {
      const missing = items.filter((item) => !item.querySelector("input:checked")).length;
      review.innerHTML = `<p class="k">Fin de la partie</p><h4>${part.dataset.title}</h4>`
        + `<p class="muted">${missing ? `${missing} question${missing > 1 ? "s" : ""} sans réponse. Touche une ligne pour y répondre.` : "Toutes les questions ont une réponse. Touche une ligne pour changer une réponse."}</p>`
        + `<ol class="rv-list">${items.map((item, i) => `<li><button type="button" data-q="${i}" class="${item.querySelector("input:checked") ? "" : "miss"}"><span class="rv-q">${item.querySelector(".q-text").textContent.replace(/^Question \d+ : /, "")}</span><span class="rv-a">${answerLabel(item) || "<i>Sans réponse</i>"}</span></button></li>`).join("")}</ol>`
        + (isLast ? "" : `<div class="rv-actions"><button type="button" class="button primary" data-part-next>Partie suivante ${svgIcon(ICON_RIGHT)}</button></div>`);
    }
    prevButton.innerHTML = `${svgIcon(ICON_LEFT)} Précédente`;
    prevButton.disabled = currentPart === 0 && currentQ === 0;
    const answered = !inReview && items[currentQ]?.querySelector("input:checked");
    nextButton.hidden = inReview;
    nextButton.className = `button ${answered ? "primary" : "secondary"} form-nav-next`;
    nextButton.innerHTML = `${answered ? "Suivante" : "Passer"} ${svgIcon(ICON_RIGHT)}`;
    submitButton.hidden = !(isLast && inReview);
    questionsFil.querySelectorAll("li").forEach((li, i) => li.classList.toggle("here", i === currentQ));
    const counter = part.querySelector(".q-counter");
    if (counter) counter.textContent = inReview ? "Résumé" : `Question ${currentQ + 1} sur ${items.length}`;
    formError.hidden = true;
    refreshPaging();
    if (focus) {
      const titre = inReview ? review.querySelector("h4") : items[currentQ].querySelector(".q-text");
      titre.setAttribute("tabindex", "-1");
      (inReview ? titre : items[currentQ].querySelector("input:checked") || titre).focus({ preventScroll: true });
      // La question reste au même endroit : on ne fait défiler que si elle sort de l'écran.
      const box = part.getBoundingClientRect();
      if (box.top < 60 || box.top > window.innerHeight * .45) document.querySelector(".q-layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function stepForward() {
    const items = partItems(parts[currentPart]);
    if (currentQ < items.length) { showQuestion(currentQ + 1, true); return; }
    if (currentPart < parts.length - 1) { showPart(currentPart + 1, true); return; }
    form.requestSubmit(submitButton);
  }

  function stepBack() {
    if (currentQ > 0) { showQuestion(currentQ - 1, true); return; }
    if (currentPart > 0) showPart(currentPart - 1, true, true);
  }

  function showPart(index, scroll, atEnd = false) {
    if (!parts.length) return;
    currentPart = Math.max(0, Math.min(parts.length - 1, index));
    parts.forEach((part, i) => {
      part.hidden = i !== currentPart;
    });
    const items = partItems(parts[currentPart]);
    questionsFil.innerHTML = items
      .map((item, i) => `<li data-item="${item.id}"><button type="button" data-q="${i}" aria-label="Question ${item.dataset.n}">${item.dataset.n}</button></li>`).join("");
    const firstMissing = items.findIndex((item) => !item.querySelector("input:checked"));
    showQuestion(atEnd ? items.length : firstMissing < 0 ? items.length : firstMissing, scroll);
    if (scroll) {
      document.querySelector(".q-layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Fenêtre de départ, comme dans Psytest : quatre conseils pour bien répondre, montrés une fois par visite,
  // à l'ouverture du questionnaire quand aucune réponse n'est encore donnée.
  const START_TIPS = [
    ["Pense aux quatre dernières semaines.", "Pas à ta pire journée, ni à ta meilleure : à ce qui revient le plus souvent."],
    ["Réponds sur des faits récents.", "Distingue une mauvaise journée d'une difficulté qui revient. Il n'y a pas de réponse attendue."],
    ["L'échelle compte des fois.", "<b>Rarement</b> : quelques fois dans le mois. <b>Parfois</b> : environ une fois par semaine. <b>Souvent</b> : plusieurs fois par semaine. <b>Presque toujours</b> : presque tous les jours."],
    ["Décris ce que tu vis,", "pas ce que tu devrais vivre ni ce qu'un burn-out « devrait » donner."]
  ];
  let startSeen = false;
  function initStartDialog() {
    const section = document.querySelector("#questionnaire");
    if (!section || typeof HTMLDialogElement === "undefined") return;
    const open = () => {
      if (startSeen || section.hidden || form.querySelector("input:checked")) return;
      startSeen = true;
      const total = progressTotal?.textContent || "52";
      const dialog = document.createElement("dialog");
      dialog.className = "start-dialog";
      dialog.setAttribute("aria-labelledby", "start-title");
      dialog.innerHTML = `<div class="stack"><p class="eyebrow">Avant de commencer · ${total} questions, environ 12 minutes</p>`
        + `<h2 id="start-title">Quatre conseils pour bien répondre</h2>`
        + `<ol class="start-tips">${START_TIPS.map(([h, p]) => `<li><b>${h}</b> <span>${p}</span></li>`).join("")}</ol>`
        + `<p class="start-kbd only-fine">Sur ordinateur : <kbd>0</kbd> à <kbd>4</kbd> pour répondre (<kbd>1</kbd> à <kbd>4</kbd> dans le bullshitomètre), <kbd>N</kbd> ou <kbd>O</kbd> pour non ou oui, <kbd>←</kbd> pour revenir.</p>`
        + `<div class="start-note"><p><b>Rien n'est enregistré automatiquement.</b> Si tu fermes ou recharges la page, tes réponses sont perdues. Pour t'arrêter, « Enregistrer ma progression », sous les questions, télécharge un fichier.</p></div>`
        + `<div class="start-actions"><button class="button primary" type="button" data-start-ok>J'ai compris, je commence</button>`
        + `<button class="button secondary" type="button" data-start-resume>Reprendre grâce à mon fichier</button></div></div>`;
      document.body.append(dialog);
      dialog.addEventListener("close", () => {
        dialog.remove();
        document.querySelector(".q-layout")?.scrollIntoView({ block: "start" });
        parts[currentPart] && partItems(parts[currentPart])[currentQ]?.querySelector(".q-text")?.focus({ preventScroll: true });
      });
      dialog.querySelector("[data-start-ok]").addEventListener("click", () => dialog.close());
      dialog.querySelector("[data-start-resume]").addEventListener("click", () => {
        dialog.close();
        section.querySelector("[data-import]")?.click();
      });
      dialog.showModal();
      const title = dialog.querySelector("h2");
      title.setAttribute("tabindex", "-1");
      title.focus();
      dialog.scrollTop = 0;
    };
    new MutationObserver(open).observe(section, { attributes: true, attributeFilter: ["hidden"] });
    open();
  }

  function getAnsweredCount() {
    const names = new Set([...form.querySelectorAll("input[type='radio']")].map((input) => input.name));
    let answered = 0;
    names.forEach((name) => {
      if (form.querySelector(`input[name="${name}"]:checked`)) {
        answered += 1;
      }
    });
    return { answered, total: names.size };
  }

  function updateProgress() {
    const { answered, total } = getAnsweredCount();
    const percentage = total === 0 ? 0 : Math.round((answered / total) * 100);
    if (progressCount) progressCount.textContent = String(answered);
    if (progressTotal) progressTotal.textContent = String(total);
    if (progressBar) progressBar.style.width = `${percentage}%`;
    console.debug("Progression mise à jour", { answered, total, percentage });
  }

  function getLevel(score) {
    if (score <= 6) return { label: "faible", className: "faible", riskClass: "risk-low" };
    if (score <= 12) return { label: "vigilance", className: "vigilance", riskClass: "risk-watch" };
    if (score <= 18) return { label: "élevé", className: "eleve", riskClass: "risk-high" };
    return { label: "alerte", className: "alerte", riskClass: "risk-alert" };
  }

  // Compatibilité interne : le total agrège des construits hétérogènes, sans seuil clinique validé.
  function getGlobalLevel(_score, hasAlert) {
    return hasAlert
      ? { label: "signal de sécurité déclaré", riskClass: "risk-alert" }
      : { label: "non interprété", riskClass: "risk-low" };
  }

  function getSectionScore(section) {
    const rawValues = section.questions.map((_, index) => {
      const selected = form.querySelector(`input[name="${section.id}${index + 1}"]:checked`);
      return selected ? Number(selected.value) : null;
    });
    if (rawValues.includes(null)) {
      return null;
    }

    const values = section.reversed ? rawValues.map((value) => 4 - value) : rawValues;
    const score = values.reduce((sum, value) => sum + value, 0);
    const level = getLevel(score);
    const highItems = values.map((value, index) => ({ id: `${section.id}${index + 1}`, value })).filter((item) => item.value >= 3);
    const maxItems = values.map((value, index) => ({ id: `${section.id}${index + 1}`, value })).filter((item) => item.value === 4);
    const result = {
      id: section.id,
      title: section.title,
      shortTitle: section.shortTitle,
      score,
      rawValues,
      values,
      level,
      percent: Math.round((score / 24) * 100),
      highItems,
      maxItems,
      comment: sectionComments[section.id][level.label]
    };

    console.debug("Score section calculé", {
      section: section.id,
      rawValues,
      values,
      reversed: Boolean(section.reversed),
      score,
      level: level.label,
      highItems,
      maxItems
    });
    if (section.reversed) {
      console.debug("Inversion de E appliquée", { rawValues, riskValues: values });
    }
    return result;
  }

  function getAlertAnswers() {
    return alertQuestions.map((question, index) => {
      const selected = form.querySelector(`input[name="alert${index + 1}"]:checked`);
      return { question, yes: selected?.value === "yes", answered: Boolean(selected) };
    });
  }

  function getContextAnswers() {
    const answers = contextQuestions.map((question, index) => {
      const selected = form.querySelector(`input[name="context${index + 1}"]:checked`);
      return { ...question, yes: selected?.value === "yes", answered: Boolean(selected) };
    });
    console.debug("Réponses contexte", answers);
    console.debug("Contexte détecté", answers.filter((answer) => answer.yes).map((answer) => answer.id));
    return answers;
  }

  function getTemporalInsight(answers) {
    const find = (id) => (answers || []).find((a) => a.id === id);
    return {
      duration: find("T1")?.answer || null,
      evolution: find("T2")?.answer || null,
      horsTravail: find("T3")?.answer || null,
      qualiteEmpechee: find("T4")?.value ?? null
    };
  }

  function getTemporalAnswers() {
    return temporalPart.questions.map((question, index) => {
      const selected = form.querySelector(`input[name="T${index + 1}"]:checked`);
      const value = selected ? Number(selected.value) : null;
      return {
        id: `T${index + 1}`,
        question: question.text,
        value,
        answer: value === null ? null : question.options[value]?.text || null
      };
    });
  }

  function buildAnswerItems(sectionResults) {
    return sections.flatMap((section) => {
      const result = sectionResults[section.id];
      return section.questions.map((question, index) => {
        const id = `${section.id}${index + 1}`;
        return {
          id,
          sectionId: section.id,
          sectionTitle: section.shortTitle,
          question,
          rawScore: result.rawValues[index],
          riskScore: result.values[index],
          humanLabel: getHumanItemLabel(id),
          interpretation: itemInsights[id]?.interpretation || "Signal à investiguer.",
          action: itemInsights[id]?.action || "Clarifier ce qui rend cet item coûteux."
        };
      });
    });
  }

  function getTopItems(answers, minScore = 3) {
    const topItems = answers
      .filter((answer) => answer.riskScore >= minScore)
      .sort((left, right) => right.riskScore - left.riskScore || left.id.localeCompare(right.id))
      .slice(0, 5);
    console.debug("Top items détectés", { minScore, topItems });
    return topItems;
  }

  function determineProfile(sectionScores, totalScore, hasAlert) {
    const { A, B, C, D, E, F } = sectionScores;
    const allLow = Object.values(sectionScores).every((score) => score <= 6);

    let profileKey = "mixed";
    if (hasAlert) {
      profileKey = "alert";
    } else if (A >= 13 && F >= 13) {
      profileKey = "exhaustion";
    } else if (B >= 13 && (C >= 13 || D >= 13 || E >= 13)) {
      profileKey = "disengagement";
    } else if (D >= 13 && A < 13 && B < 13 && C < 13 && F < 13) {
      profileKey = "tension";
    } else if (allLow) {
      profileKey = "protected";
    }

    const profile = { key: profileKey, ...profileRecommendations[profileKey] };
    console.debug("Choix du profil", { profileKey, sectionScores, totalScore, hasAlert });
    return profile;
  }

  function getDominantDimensions(sectionResults) {
    const sorted = Object.values(sectionResults).sort((left, right) => right.score - left.score);
    const elevated = sorted.filter((section) => section.score >= 13);
    return elevated.length ? elevated : sorted.slice(0, 2);
  }

  function buildOverallSummary(result) {
    const names = result.dominantDimensions.map((section) => section.shortTitle.replace(/^[A-F] /, "").toLowerCase());
    const dominantNames = names.length > 1 ? `${names.slice(0, -1).join(", ")} et ${names[names.length - 1]}` : names[0];
    if (result.hasAlert) {
      return "Au moins une réponse relève de la sécurité ou de la santé et appelle une orientation adaptée. Ce questionnaire ne permet pas d'évaluer à lui seul le degré d'urgence.";
    }
    const tendance = result.temporalAnswers?.find((a) => a.id === "T2")?.value;
    const precisions = tendance === 2
      ? " La personne décrit aussi une aggravation récente, qui mérite d'être précisée."
      : tendance === 0 ? " La personne décrit une amélioration récente, sans que son origine soit établie."
      : "";
    if (result.profile.key === "protected") {
      return "Sur les questions proposées, peu de difficultés ressortent. Cela ne permet pas d'exclure une autre situation de santé ou de travail." + precisions;
    }
    if (result.profile.key === "tension") {
      return "Tu décris surtout des contraintes dans ton travail ; les manifestations d'épuisement ressortent moins. C'est une situation utile à examiner en prévention." + precisions;
    }
    if (result.profile.key === "exhaustion") {
      return "Tu déclares des difficultés d'épuisement et de récupération. Leur origine et leur retentissement restent à préciser." + precisions;
    }
    if (result.profile.key === "disengagement") {
      return "Tu décris une distance accrue vis-à-vis du travail ou des difficultés dans ton rapport à son utilité. Les raisons restent à explorer." + precisions;
    }
    return `Tes réponses font ressortir notamment ${dominantNames}. Ce sont des pistes de discussion, pas des causes démontrées.` + precisions;
  }

  function buildModelReadings(result) {
    const scores = result.sectionScores;
    const maslachLines = [];
    if (scores.A >= 13) maslachLines.push("Plusieurs réponses décrivent un épuisement fréquent, sans en mesurer la quantité.");
    if (scores.B >= 13) maslachLines.push("Plusieurs réponses décrivent de la distance mentale ou du cynisme, sans en établir la fonction.");
    if (scores.C >= 13) maslachLines.push("Les réponses du groupe C décrivent des difficultés de maîtrise et/ou de sens, sans permettre de les confondre.");
    if (scores.A >= 13 && scores.B >= 13 && scores.C >= 13) maslachLines.push("Plusieurs groupes de réponses ressortent simultanément. La partie C mêle efficacité et sens : ce n’est pas un score Maslach validé.");
    if (!maslachLines.length) maslachLines.push("Ces dimensions sont décrites séparément, sans seuil diagnostique ni prédiction de leur évolution.");

    const jdRCauses = result.topItems
      .filter((item) => ["D", "E"].includes(item.sectionId))
      .map((item) => item.interpretation);
    const jdrLines = [
      "La grille JD-R distingue les exigences déclarées et les ressources disponibles. Leur comparaison est descriptive : ce questionnaire ne mesure pas un rapport de compensation."
    ];
    if (scores.D >= 13) jdrLines.push("Les demandes professionnelles sont fortes.");
    if (scores.E >= 13) jdrLines.push("Les ressources protectrices semblent insuffisantes.");
    if (scores.D >= 13 && scores.E >= 13) jdrLines.push("Les exigences ressortent fortement tandis que plusieurs ressources semblent manquer. Cette configuration mérite d'être discutée.");
    if (jdRCauses.length) jdrLines.push(`Ce qui pèse le plus dans tes réponses : ${unique(jdRCauses).map((t) => t.replace(/\.$/, "").toLowerCase()).join(", ")}.`);

    const eriSignals = [];
    if (getItem(result.answers, "D4")?.riskScore >= 3 || getItem(result.answers, "D6")?.riskScore >= 3) eriSignals.push("effort élevé");
    if (getItem(result.answers, "E5")?.riskScore >= 3) eriSignals.push("récompense ou reconnaissance faible");
    if (getItem(result.answers, "E6")?.riskScore >= 3) eriSignals.push("injustice ou équité faible");
    if (getItem(result.answers, "F1")?.riskScore >= 3) eriSignals.push("surengagement ou rumination");
    if (getItem(result.answers, "F5")?.riskScore >= 3) eriSignals.push("stratégies de compensation");
    const eriLines = [
      "La grille de Siegrist explore l'effort, les récompenses et le surengagement. Bull-Out utilise ici des items reformulés et recoupés, pas le ratio validé de Siegrist."
    ];
    if (eriSignals.length) eriLines.push(`Signaux détectés : ${unique(eriSignals).join(", ")}.`);
    if (!eriSignals.length) eriLines.push("Les signaux ERI ciblés ne dominent pas, mais reconnaissance et équité restent à surveiller.");

    return [
      { title: "Lecture Maslach", tag: "Symptômes", lines: maslachLines },
      { title: "Lecture JD-R", tag: "Demandes / ressources", lines: jdrLines },
      { title: "Lecture ERI", tag: "Effort / reconnaissance", lines: eriLines }
    ];
  }

  function generatePriorityActions(result) {
    const buckets = {
      safety: [],
      exposure: [],
      resources: [],
      recovery: [],
      meaning: [],
      followup: []
    };
    const scores = result.sectionScores;
    const contextAnswers = result.contextAnswers || [];
    const contextYes = new Set(contextAnswers.filter((answer) => answer.yes).map((answer) => answer.id));
    const addAction = (bucket, id, title, text) => {
      if (!Object.values(buckets).flat().some((action) => action.id === id)) {
        buckets[bucket].push({ id, title, text });
      }
    };

// Chaque action cible une réponse de travail effectivement déclarée.
    // Ce catalogue n'établit ni diagnostic ni causalité.
    const catalogue = {
      D1: ["Arbitrer la quantité de travail", "Préparer la liste des tâches, leurs délais et le temps réellement disponible ; demander ce qui sera retiré, reporté ou simplifié."],
      D2: ["Réduire les interruptions", "Relever deux situations où les urgences ont interrompu le travail ; demander une règle d'arbitrage et un créneau protégé."],
      D3: ["Clarifier les priorités contradictoires", "Présenter deux consignes incompatibles et demander qui décide de la priorité, du délai et du niveau de qualité attendu."],
      D4: ["Aligner responsabilité et moyens", "Identifier une responsabilité sans moyens ou pouvoir de décision suffisant, puis demander les moyens ou un changement de périmètre."],
      D5: ["Organiser un soutien face aux exigences émotionnelles", "Décrire une situation relationnelle exigeante et vérifier les temps de relais, de débriefing et les appuis disponibles."],
      D6: ["Corriger un dysfonctionnement récurrent", "Noter le temps passé à compenser une défaillance d'organisation et identifier qui peut traiter sa cause."],
      E1: ["Restaurer des marges de manœuvre", "Repérer une décision sur la méthode, le rythme ou la réalisation qui pourrait être prise plus près du travail réel."],
      E2: ["Obtenir un arbitrage effectif", "Demander une décision explicite quand la charge dépasse ce qui peut être fait : qu'est-ce qui attend et qui en assume l'arbitrage ?"],
      E3: ["Organiser l'entraide concrète", "Identifier un dossier qui nécessiterait un relais, un binôme ou un appui technique ; vérifier sa disponibilité réelle."],
      E4: ["Clarifier les attentes", "Faire préciser par écrit le résultat attendu, le délai et le niveau de détail nécessaire pour une tâche récente."],
      E5: ["Rendre visible le travail réel", "Documenter les contributions et contraintes invisibles, puis demander un retour sur leur qualité et leur utilité."],
      E6: ["Expliciter les critères des décisions", "Demander sur quels critères sont réparties les tâches et les responsabilités, avec des exemples factuels."]
    };
    const principauxTravail = (partie) => (result.answers || [])
      .filter((a) => a.sectionId === partie && a.riskScore >= 3 && catalogue[a.id])
      .sort((a, b) => b.riskScore - a.riskScore);
    const premierD = principauxTravail("D")[0];
    const premierE = principauxTravail("E")[0];
    const actionPour = (partie, premier, titre, texte) => {
      const cible = premier && catalogue[premier.id];
      const mention = premier ? ` Ce point correspond à ta réponse ${premier.id}, à vérifier dans la situation réelle.` : "";
      return {
        id: cible ? `${partie}-${premier.id}` : partie,
        title: cible ? cible[0] : titre, text: (cible ? cible[1] : texte) + mention
      };
    };

    if (result.hasAlert || scores.F >= 19 || contextYes.has("safetySensitiveJob")) {
      addAction("safety", "alert", "Préciser les signaux de santé et de sécurité", "Si une question d'alerte a reçu oui, suis l'orientation correspondante. En cas de symptôme aigu ou de danger immédiat : 15 / 112 ; idées suicidaires : 3114. Si ton poste comporte un enjeu de sécurité et que ta vigilance est altérée, demande un ajustement rapide des tâches.");
    }
    if (scores.D >= 13 || premierD) {
      const a = actionPour("D", premierD, "Examiner la charge de travail", "Comparer la charge réelle aux priorités, aux délais et aux moyens disponibles.");
      addAction("exposure", a.id, a.title, a.text);
    }
    if (scores.E >= 13 || premierE) {
      const a = actionPour("E", premierE, "Examiner les ressources", "Vérifier l'autonomie, l'arbitrage, le soutien, la clarté et la reconnaissance disponibles.");
      addAction("resources", a.id, a.title, a.text);
    }
    if (scores.A >= 13 || scores.F >= 13) {
      addAction("recovery", "recovery", "Protéger la récupération", "Réduire temporairement l'exposition et restaurer des temps sans sollicitation.");
    }
    if (scores.B >= 13) {
      addAction("meaning", "meaning", "Traiter la perte de sens ou le retrait", "Identifier ce qui génère cynisme, évitement ou détachement : conflit de valeurs, absurdité, surcharge relationnelle.");
    }
    if (scores.C >= 13) {
      addAction("meaning", "mastery", "Restaurer la maîtrise", "Clarifier les critères de qualité, réduire le multi-tâche, traiter les sources d'erreurs.");
    }
    const qualityAnswer = (result.temporalAnswers || []).find((a) => a.id === "T4");
    if (qualityAnswer?.value >= 3) {
      addAction("exposure", "quality-prevented", "Examiner la qualité empêchée",
        "Noter une tâche dont la qualité souhaitée était impossible à atteindre, préciser ce qui manquait (temps, moyens, consignes) et demander un arbitrage explicite.");
    }
    if (contextYes.has("ethicalConflict")) {
      addAction("meaning", "ethics", "Clarifier le conflit éthique", "Documenter les faits, clarifier les responsabilités et chercher un appui professionnel ou collectif.");
    }
    if (contextYes.has("harassment") || contextYes.has("fearToSpeak")) {
      addAction("safety", "confidential", "Chercher un appui confidentiel", "Si parler à la hiérarchie paraît risqué, commencer par un interlocuteur de confiance : service de prévention et de santé au travail, représentants du personnel ou professionnel de santé, selon la situation.");
    }
    if (contextYes.has("collectiveSignal")) {
      addAction("followup", "collective", "Lire aussi le signal comme collectif", "Comparer les contraintes partagées et envisager une remontée collective plutôt qu'une adaptation individuelle isolée.");
    }
    // Le cas de réponses peu marquées mérite une vraie action, pas un suivi vide.
    if (!Object.values(buckets).flat().length) {
      addAction("followup", "maintain", "Décrire ce qui rend le travail soutenable", "Identifier une marge de manœuvre et un appui concret à préserver, sans présumer que tout va bien.");
    } else {
      addAction("followup", "followup", "Observer l'évolution", "Noter les situations concrètes qui changent et réexaminer les dimensions séparément dans deux à quatre semaines.");
    }

    const priority = ["safety", "exposure", "resources", "recovery", "meaning", "followup"].flatMap((bucket) => buckets[bucket]).slice(0, 5);
    console.debug("Actions prioritaires générées", { buckets, priority, context: [...contextYes] });
    return priority;
  }

  function getRecommendedStakeholders(scores, alertFlags, profile, contextAnswers = []) {
    const recommendations = [];
    const addRecommendation = (key, why) => {
      if (!recommendations.some((recommendation) => recommendation.key === key)) {
        recommendations.push({ key, why });
      }
    };

    const hasAlert = alertFlags.some((alert) => alert.yes);
    const contextYes = new Set(contextAnswers.filter((answer) => answer.yes).map((answer) => answer.id));

    if (hasAlert) {
      // La question sur le fonctionnement n'est pas, à elle seule, un signal d'urgence vitale.
      if (alertFlags[0]?.yes || alertFlags[2]?.yes) {
        addRecommendation("emergency", "En cas d'idées suicidaires ou de symptôme aigu inquiétant, une aide urgente peut être nécessaire : 3114, 15 ou 112 selon la situation.");
      }
      addRecommendation("generalPractitioner", "Signaux d'alerte : avis médical général à envisager rapidement.");
      addRecommendation("psychiatrist", "Signaux sévères possibles : avis spécialisé à envisager selon la situation.");
      addRecommendation("occupationalDoctor", "Lien santé-travail à analyser sans transmettre de détail médical à l'employeur.");
    }

    if (scores.F >= 13) {
      addRecommendation("generalPractitioner", "Score récupération/santé élevé : sommeil, symptômes ou fonctionnement à évaluer.");
      addRecommendation("occupationalDoctor", "Récupération dégradée : analyse santé-travail et aménagements possibles.");
      addRecommendation("psychologist", "Récupération psychologique, rumination ou stratégies de compensation à travailler.");
      addRecommendation("occupationalNurse", "Premier point santé-travail et orientation possible.");
    }

    if (scores.A >= 13) {
      addRecommendation("occupationalDoctor", "Épuisement élevé : compatibilité santé/poste et réduction d'exposition à discuter.");
      addRecommendation("generalPractitioner", "Épuisement élevé : causes médicales et conduite à tenir à vérifier.");
      addRecommendation("manager", "Arbitrage de charge possible, sans détail médical.");
      addRecommendation("psychologist", "Soutien utile pour récupération, limites et culpabilité.");
    }

    if (scores.D >= 13) {
      addRecommendation("manager", "Exigences élevées : besoin d'arbitrage sur charge, délais et priorités.");
      addRecommendation("occupationalDoctor", "Exigences élevées : lien santé-travail et prévention à analyser.");
      addRecommendation("cse", "Si le problème est collectif, les représentants peuvent aider à le faire remonter.");
      addRecommendation("hr", "Si l'arbitrage manque, les dispositifs internes peuvent être mobilisés.");
    }

    if (scores.E >= 13) {
      addRecommendation("manager", "Manque de ressources : autonomie, soutien, clarté ou reconnaissance à discuter.");
      addRecommendation("occupationalDoctor", "Manque de ressources : impact santé-travail et aménagements possibles.");
      addRecommendation("hr", "Ressources ou dispositifs internes à clarifier.");
      addRecommendation("cse", "Si le manque de ressources est partagé, une approche collective peut être utile.");
    }

    if (scores.B >= 13) {
      addRecommendation("psychologist", "Distance mentale ou cynisme élevés : soutien pour clarifier retrait, sens et limites.");
      addRecommendation("occupationalDoctor", "Retrait lié au travail : analyse santé-travail à envisager.");
      addRecommendation("manager", "Si la perte de sens vient de l'organisation, clarifier objectifs et absurdités sans détail médical.");
      addRecommendation("cse", "Si le problème est collectif, une remontée sur les conditions de travail peut être utile.");
    }

    if (scores.C >= 13) {
      addRecommendation("occupationalDoctor", "Efficacité ou sens altérés : analyser l'adéquation entre exigences, santé et poste.");
      addRecommendation("manager", "Clarifier critères de qualité, priorités et sources d'erreur.");
      addRecommendation("psychologist", "Soutien utile en cas de perte de confiance ou de maîtrise.");
      addRecommendation("generalPractitioner", "À envisager si la perte de fonctionnement dépasse le travail.");
    }

    if (profile.key === "protected" && recommendations.length === 0 && contextYes.size === 0) {
      addRecommendation("manager", "Peu de difficultés déclarées : maintenir la clarté, les priorités et les protections existantes.");
      addRecommendation("occupationalNurse", "Question santé-travail ou prévention : premier échange possible.");
      addRecommendation("occupationalDoctor", "Question d'aménagement ou de prévention : avis santé-travail possible.");
    }

    if (recommendations.length === 0 && contextYes.size === 0) {
      addRecommendation("occupationalNurse", "Premier échange possible si tu hésites sur le bon interlocuteur.");
      addRecommendation("manager", "Maintenir la clarté de charge et d'arbitrage.");
    }

    if (contextYes.has("harassment")) {
      addRecommendation("occupationalDoctor", "Contexte de harcèlement, humiliations ou violences : prévention santé-travail et confidentialité médicale.");
      addRecommendation("generalPractitioner", "Retentissement santé possible en contexte de violence ou harcèlement.");
      addRecommendation("hr", "Procédure ou signalement possible, avec prudence sur la confidentialité.");
      addRecommendation("cse", "Appui possible des représentants du personnel si la situation doit être tracée ou portée collectivement.");
      if (alertFlags[0]?.yes || alertFlags[2]?.yes) addRecommendation("emergency", "Idées suicidaires ou symptôme aigu : une aide urgente peut être indiquée selon la situation.");
    }
    if (contextYes.has("ethicalConflict")) {
      addRecommendation("occupationalDoctor", "Conflit éthique : impact santé-travail et prévention à discuter.");
      addRecommendation("manager", "Discussion possible si le climat permet un arbitrage clair.");
      addRecommendation("cse", "Appui collectif possible si l'enjeu dépasse la situation individuelle.");
      addRecommendation("hr", "Procédure ou arbitrage organisationnel possible si nécessaire.");
    }
    if (contextYes.has("personalBurden")) {
      addRecommendation("generalPractitioner", "Situation personnelle lourde : évaluer le retentissement global et les besoins de soin.");
      addRecommendation("psychologist", "Soutien utile pour charge émotionnelle, récupération et limites.");
      addRecommendation("socialWorker", "Droits, démarches ou aides possibles si la situation a des conséquences sociales ou administratives.");
      addRecommendation("occupationalDoctor", "Impact possible sur le poste ou besoin d'aménagement.");
    }
    if (contextYes.has("previousMedicalAlert")) {
      addRecommendation("occupationalDoctor", "Arrêt ou alerte antérieure : préparer le maintien, l'aménagement ou la reprise.");
      addRecommendation("generalPractitioner", "Suivi clinique utile après alerte ou arrêt.");
      addRecommendation("psychologist", "Soutien possible si la situation reste psychologiquement coûteuse.");
      if (scores.F >= 19 || hasAlert) addRecommendation("psychiatrist", "Gravité possible : avis spécialisé à envisager selon symptômes.");
    }
    if (contextYes.has("collectiveSignal")) {
      addRecommendation("cse", "Plusieurs collègues touchés : signal potentiellement collectif de conditions de travail.");
      addRecommendation("occupationalDoctor", "Analyse santé-travail collective possible sans diagnostic individuel transmis.");
      addRecommendation("manager", "Action possible si climat de confiance et arbitrage réel.");
      addRecommendation("hr", "Action collective ou dispositif interne possible.");
    }
    if (contextYes.has("safetySensitiveJob")) {
      addRecommendation("occupationalDoctor", "Poste à enjeu de sécurité : compatibilité santé/poste et réduction du risque.");
      addRecommendation("manager", "Réduction immédiate du risque ou ajustement temporaire des tâches.");
      addRecommendation("generalPractitioner", "Fatigue ou symptômes santé à évaluer si la sécurité peut être engagée.");
      if (alertFlags[0]?.yes || alertFlags[2]?.yes) addRecommendation("emergency", "Symptôme aigu ou danger immédiat : aide urgente selon les signes concernés.");
    }
    if (contextYes.has("fearToSpeak")) {
      addRecommendation("occupationalDoctor", "Peur de parler : échange confidentiel santé-travail possible.");
      addRecommendation("occupationalNurse", "Premier point confidentiel et orientation possible.");
      addRecommendation("psychologist", "Soutien pour clarifier la situation et préparer des limites.");
      addRecommendation("cse", "Appui possible selon le contexte relationnel et la confidentialité souhaitée.");
    }

    // Ne pas pousser automatiquement vers la hiérarchie en cas de violence ou peur de parler.
    const selected = recommendations.filter((recommendation) => !(["manager"].includes(recommendation.key) && (contextYes.has("harassment") || contextYes.has("fearToSpeak")))).slice(0, 5).map((recommendation) => ({
      ...recommendation,
      stakeholder: stakeholders[recommendation.key]
    }));
    console.debug("Recommandations d'interlocuteurs", {
      scores,
      alertFlags,
      contextAnswers,
      profile: profile.key,
      selected: selected.map((recommendation) => ({
        key: recommendation.key,
        name: recommendation.stakeholder.name,
        why: recommendation.why
      }))
    });
    return selected;
  }

  function calculateResults() {
    const sectionResults = {};
    for (const section of sections) {
      const result = getSectionScore(section);
      if (result === null) {
        return null;
      }
      sectionResults[section.id] = result;
    }

    const alertAnswers = getAlertAnswers();
    if (alertAnswers.some((answer) => !answer.answered)) {
      return null;
    }
    const contextAnswers = getContextAnswers();
    if (contextAnswers.some((answer) => !answer.answered)) {
      return null;
    }
    const strengthAnswers = strengthPart.questions.map((question, index) => {
      const selected = form.querySelector(`input[name="G${index + 1}"]:checked`);
      return { id: `G${index + 1}`, question, value: selected ? Number(selected.value) : null };
    });
    if (strengthAnswers.some((answer) => answer.value === null)) {
      return null;
    }

    const exchangeAnswers = exchangePart.questions.map((question, index) => {
      const selected = form.querySelector(`input[name="R${index + 1}"]:checked`);
      return { id: `R${index + 1}`, question, value: selected ? Number(selected.value) : null };
    });
    if (exchangeAnswers.some((answer) => answer.value === null)) {
      return null;
    }
    const temporalAnswers = getTemporalAnswers();
    if (temporalAnswers.some((answer) => answer.value === null)) return null;
    const temporalInsight = getTemporalInsight(temporalAnswers);
    const bullshit = computeBullshit();
    if (bullshit === null) {
      return null;
    }

    const sectionScores = Object.fromEntries(Object.entries(sectionResults).map(([id, result]) => [id, result.score]));
    const totalScore = Object.values(sectionScores).reduce((sum, score) => sum + score, 0);
    const hasAlert = alertAnswers.some((answer) => answer.yes);
    const totalLevel = getGlobalLevel(totalScore, hasAlert);
    const profile = determineProfile(sectionScores, totalScore, hasAlert);
    const answers = buildAnswerItems(sectionResults);
    const topItems = getTopItems(answers);
    const dominantDimensions = getDominantDimensions(sectionResults);
    const modelReadingCards = buildModelReadings({ sectionScores, topItems, answers });
    const actions = generatePriorityActions({ sectionScores, hasAlert, contextAnswers, temporalAnswers, answers });
    const stakeholderRecommendations = getRecommendedStakeholders(sectionScores, alertAnswers, profile, contextAnswers);
    const summary = buildOverallSummary({ profile, hasAlert, dominantDimensions, temporalAnswers });

    const result = {
      sectionResults,
      sectionScores,
      alertAnswers,
      contextAnswers,
      strengthAnswers,
      exchangeAnswers,
      temporalAnswers,
      temporalInsight,
      questionnaireVersion: "2026-11-v2",
      bullshit,
      totalScore,
      totalLevel,
      hasAlert,
      profile,
      answers,
      topItems,
      dominantDimensions,
      modelReadings: modelReadingCards,
      actions,
      stakeholderRecommendations,
      summary
    };
    console.debug("Résultat global calculé", result);
    return result;
  }

  // Bullshitomètre : même calcul que le test satirique (pourcentage du maximum possible, par dimension et au total).
  function computeBullshit() {
    if (!bullshitPart.questions.length) return { answers: [], percent: 0, dims: {}, profil: null };
    const keys = BS.dims.map(([key]) => key);
    const score = Object.fromEntries(keys.map((k) => [k, 0]));
    const max = Object.fromEntries(keys.map((k) => [k, 0]));
    const answers = [];
    for (const [index, question] of bullshitPart.questions.entries()) {
      const selected = form.querySelector(`input[name="BS${index + 1}"]:checked`);
      if (!selected) return null;
      const option = question.options[Number(selected.value)];
      keys.forEach((k) => {
        max[k] += Math.max(...question.options.map((o) => o.w[k] || 0));
        score[k] += option.w[k] || 0;
      });
      answers.push({ id: `BS${index + 1}`, question: question.text, value: Number(selected.value), answer: option.text });
    }
    const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
    const percent = Math.round(sum(score) / sum(max) * 100);
    const dims = Object.fromEntries(keys.map((k) => [k, Math.round(score[k] / max[k] * 100)]));
    const profil = BS.profils[percent < 25 ? 0 : percent < 50 ? 1 : percent < 75 ? 2 : 3];
    return { answers, percent, dims, profil };
  }

  function renderResults(result) {
    result.plans = buildActionPlans(result);
    latestResultText = buildResultText(result);
    // Le rapport (8 pièces, synthèse, annexes) est composé par rapport.js, à partir de ces données.
    document.dispatchEvent(new CustomEvent("bullout:rapport", {
      detail: { result, sections, strengthPart, exchangePart, temporalPart, bullshitPart, bsDims: BS.dims, stakeholders, contextQuestions, alertQuestions, ratingLabels, texte: latestResultText }
    }));
    resultsPanel.dataset.ready = "true";
    location.hash = "rapport";
  }

  // Plans à 72 heures et à 2 semaines : données seulement, le rendu est dans rapport.js.
  function buildActionPlans(result) {
  const items = result.answers || [];
  const signaux = items.filter((a) => a.riskScore >= 3);
  const pro = signaux.filter((a) => ["D", "E"].includes(a.sectionId));
  const sante = signaux.filter((a) => ["A", "B", "C", "F"].includes(a.sectionId));
  const quality = (result.temporalAnswers || []).find((a) => a.id === "T4")?.value >= 3;
  const context = new Set((result.contextAnswers || []).filter((a) => a.yes).map((a) => a.id));
  const situationProfessionnelle = pro[0]
    ? `Partir d'un exemple daté concernant « ${pro[0].humanLabel} » (${pro[0].id}).`
    : quality ? "Décrire une situation concrète dans laquelle la qualité attendue n'a pas pu être atteinte."
      : "Identifier un exemple concret de ce qui fonctionne et de ce qui gêne aujourd'hui.";
  const confidentialite = context.has("fearToSpeak") || context.has("harassment");
  const travailActions = (result.actions || [])
    .filter((a) => a.id?.startsWith("D-") || a.id?.startsWith("E-") || a.id === "quality-prevented" || ["load", "resources"].includes(a.id))
    .slice(0, 2);
  const demander = travailActions.length
    ? travailActions.map((a) => a.text)
    : ["Vérifier les priorités de la semaine et préserver les ressources qui fonctionnent."];
  const mediation = confidentialite
    ? "Choisir d'abord un interlocuteur confidentiel plutôt qu'une discussion imposée avec la hiérarchie."
    : "Formuler une demande d'arbitrage ou de soutien auprès d'un interlocuteur approprié.";
  const santeMessage = result.hasAlert
    ? "Tenir compte de la réponse de sécurité et suivre l'orientation individuelle indiquée dans la synthèse."
    : sante.length
      ? `Noter ce qui a changé dans la santé ou le fonctionnement, notamment « ${sante[0].humanLabel} » ; demander un avis si la difficulté persiste ou s'aggrave.`
      : "Ne pas déduire d'un faible score l'absence de difficulté ; demander un avis si un symptôme préoccupant apparaît.";
  const plan72h = [
    { title: "Décrire sans interpréter", items: [situationProfessionnelle, "Noter la date, la tâche, la contrainte et la conséquence observable."] },
    { title: "Demander une décision", items: [...demander, mediation] },
    { title: "Santé et sécurité", items: [santeMessage] }
  ];
  const twoWeeks = [
    { title: "Observer", items: [
      "Comparer les situations concrètes rencontrées, sans faire du total A–F une mesure de guérison.",
      "Noter l'action effectivement mise en œuvre, sa date et les nouvelles difficultés éventuelles."
    ] },
    { title: "Décider", items: [
      "Vérifier si un arbitrage, une ressource ou un aménagement a réellement été obtenu.",
      "Réexaminer séparément les manifestations, les expositions et la récupération ; consulter si la santé ou la sécurité se dégrade."
    ] }
  ];
  return { plan72h, twoWeeks };
}

  function buildResultText(result) {
    const sectionLines = sections.map((section) => {
      const sectionResult = result.sectionResults[section.id];
      return `${sectionResult.shortTitle} : ${sectionResult.score}/24 (${sectionResult.level.label})`;
    });
    const dominantLines = result.dominantDimensions.map((section) => `- ${section.shortTitle} : ${section.score}/24 (${section.level.label})`);
    const topItemLines = result.topItems.length
      ? result.topItems.map((item) => `- ${item.humanLabel} (${item.id}) : ${item.question} Score : ${item.riskScore}/4. ${item.interpretation}`)
      : ["- Aucun item à 3 ou 4."];
    const actionLines = result.actions.map((action) => `- ${action.title} : ${action.text}`);
    const stakeholderLines = result.stakeholderRecommendations.map((recommendation) => `- ${recommendation.stakeholder.name} : ${recommendation.why}`);
    const contextLines = result.contextAnswers.filter((answer) => answer.yes).map((answer) => `- ${answer.label}`);
    const collectiveLine = result.contextAnswers.some((answer) => answer.id === "collectiveSignal" && answer.yes)
      ? "Le signal peut aussi être collectif : plusieurs personnes semblent touchées."
      : "Lecture d'abord individuelle, à réviser si d'autres personnes décrivent les mêmes difficultés.";
    const yesAlerts = result.alertAnswers.filter((answer) => answer.yes).length;

    console.debug("Résumé copiable généré", {
      context: contextLines,
      collectiveLine,
      stakeholders: stakeholderLines.length
    });
    return [
      "Résultat questionnaire Bull-Out",
      "Période de référence : 4 dernières semaines",
      `Profil : ${result.profile.title}`,
      "Pas de score global de risque : les six parties regroupent symptômes, contraintes et ressources.",
      "Les niveaux par partie sont des repères descriptifs non étalonnés.",
      "Scores A-F :",
      ...sectionLines,
      "",
      "Points d'appui (G, de 0 à 4, hors score) :",
      ...result.strengthAnswers.map((answer) => `- ${answer.question} ${answer.value}/4`),
      "",
      "Ce que tu donnes, ce qui revient (R, de 0 à 4, hors score) :",
      ...result.exchangeAnswers.map((answer) => `- ${answer.question} ${answer.value}/4`),
      "",
      "Repères supplémentaires (T, hors scores et sans valeur diagnostique) :",
      ...(result.temporalAnswers || []).map((answer) => `- ${answer.question} : ${answer.answer}`),
      "Ces repères décrivent la situation, ils ne prouvent pas son origine.",
      "",
      `Bullshitomètre (hors score) : indice satirique interne ${result.bullshit.percent} %${!result.hasAlert && !(result.sectionScores.A >= 13 && result.sectionScores.F >= 13) && result.bullshit.profil ? ` (${result.bullshit.profil.titre})` : ""}`,
      "",
      "Éléments de contexte signalés :",
      ...(contextLines.length ? contextLines : ["- Aucun élément de contexte particulier signalé dans cette section."]),
      "",
      "Lecture individuel / collectif :",
      `- ${collectiveLine}`,
      "",
      "Dimensions dominantes :",
      ...dominantLines,
      "",
      "Items les plus élevés :",
      ...topItemLines,
      "",
      "Actions prioritaires :",
      ...actionLines,
      "",
      "Plan des 72 prochaines heures :",
      ...(result.plans?.plan72h || []).flatMap((p) => [`- ${p.title}`, ...p.items.map((item) => `  • ${item}`)]),
      "",
      "Dans deux semaines :",
      ...(result.plans?.twoWeeks || []).flatMap((p) => [`- ${p.title}`, ...p.items.map((item) => `  • ${item}`)]),
      "",
      "Interlocuteurs potentiellement utiles :",
      ...stakeholderLines,
      "",
      `Alerte oui/non : ${yesAlerts > 0 ? "oui" : "non"} (${yesAlerts}/3)`,
      "Rappel : un score faible ne suffit pas toujours à exclure un problème si ton sommeil, ton humeur, ta sécurité ou ton fonctionnement se dégradent.",
      "Limite :",
      "Ce résultat ne constitue pas un diagnostic médical et ne doit pas être utilisé pour évaluer professionnellement une personne."
    ].join("\n");
  }

  function getItem(answers, id) {
    return answers.find((answer) => answer.id === id);
  }

  function unique(values) {
    return [...new Set(values)];
  }

  async function copyText(text, button) {
    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copié";
      console.debug("Copie réussie", { length: text.length });
    } catch (error) {
      console.debug("Clipboard API indisponible, fallback textarea", error);
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      button.textContent = "Copié";
    }
    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1600);
  }

  function initCopyButtons() {
    const copyButtons = document.querySelectorAll(".copy-template, .copy-template-button, [data-copy-text]");
    copyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const explicitText = button.dataset.copyText;
        const container = button.closest(".template-card, .manager-tool, .manager-checklist, .causal-checklist");
        const source = container?.querySelector(".copy-source") || container?.querySelector("p");
        const text = explicitText || source?.innerText || source?.textContent || "";
        if (!text.trim()) {
          console.debug("Copie ignorée : aucun texte trouvé", { button });
          return;
        }
        console.debug("Bouton copier activé", { page: document.body.className || "index", length: text.length });
        copyText(text.trim(), button);
      });
    });
    console.debug("Boutons copier initialisés", { count: copyButtons.length });
  }

  function initNavigation() {
    if (!navToggle || !mainMenu) return;
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      mainMenu.classList.remove("is-open");
      navGroups.forEach((group) => {
        group.open = false;
      });
    };
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      mainMenu.classList.toggle("is-open", !isOpen);
    });
    navGroups.forEach((group) => {
      group.addEventListener("toggle", () => {
        if (!group.open) return;
        navGroups.forEach((otherGroup) => {
          if (otherGroup !== group) otherGroup.open = false;
        });
      });
    });
    mainMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // Barre d'étapes : étapes passées en sapin, étape en cours en orange (fil d'Ariane de Psytest).
  function initJourneySpy() {
    const links = [...document.querySelectorAll(".journey-progress a")];
    const targets = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    if (!links.length || targets.length !== links.length) return;
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = -1;
      targets.forEach((target, index) => {
        if (target.offsetParent !== null && target.getBoundingClientRect().top <= line) current = index;
      });
      links.forEach((link, index) => {
        link.classList.toggle("is-past", current > index);
        link.classList.toggle("is-current", current === index);
        if (current === index) link.setAttribute("aria-current", "step"); else link.removeAttribute("aria-current");
      });
    };
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    update();
  }

  // Sommaire latéral des pages de lecture (fil d'Ariane de Psytest) : chapitres passés en sapin, chapitre en cours en orange.
  function initChapterRail() {
    const layout = document.querySelector(".layout[data-rail-title]");
    if (!layout) return;
    const chapters = [...layout.querySelectorAll("[data-chapter]")];
    if (!chapters.length) return;
    const title = layout.dataset.railTitle;
    const listHTML = chapters.map((chapter, index) => {
      if (!chapter.id) chapter.id = `chapitre-${index + 1}`;
      return `<li><a href="#${chapter.id}"><span class="num">${String(index + 1).padStart(2, "0")}</span><span>${chapter.dataset.chapter}</span></a></li>`;
    }).join("");
    const rail = layout.querySelector(".rail");
    rail.innerHTML = `<p class="rail-title">${title}</p><ol class="fil">${listHTML}</ol>`;
    const runhead = document.createElement("details");
    runhead.className = "runhead";
    runhead.innerHTML = `<summary><span class="rh-k">${title}</span><span class="rh-s"></span></summary><ol class="fil">${listHTML}</ol>`;
    layout.querySelector(".page-main").prepend(runhead);
    runhead.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { runhead.open = false; }));
    const runLabel = runhead.querySelector(".rh-s");
    const lists = [rail, runhead].map((el) => [...el.querySelectorAll(".fil li")]);

    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = 0;
      let progress = 0;
      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= line) {
          current = index;
          progress = Math.max(0, Math.min(1, (line - rect.top) / Math.max(rect.height, 1)));
        }
      });
      lists.forEach((items) => items.forEach((item, index) => {
        item.className = index < current ? "past" : index === current ? "here" : "";
        const link = item.querySelector("a");
        link.style.setProperty("--p", index < current ? "100%" : index === current ? `${Math.round(progress * 100)}%` : "0%");
        if (index === current) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      }));
      runLabel.textContent = `${String(current + 1).padStart(2, "0")} · ${chapters[current].dataset.chapter}`;
    };
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Animation d'accueil : la semaine de Sam (exemple fictif). Cinq actes, lancés quand le bandeau est visible.
  function initHeroScene() {
    const scene = document.querySelector("#bo-scene");
    if (!scene) return;
    // Niveaux graphiques illustratifs : aucun pourcentage physiologique n’est calculé.
    const LEVELS = [80, 45, 15, 35, 35];
    const LABELS = ["En forme", "Fatigué", "Saturé", "Peu reposé", "Sous tension"];
    const CAPS = [
      "Lundi, Sam commence sa semaine <strong>avec de l'énergie</strong>. 42 mails, 3 urgences : la pression monte.",
      "Mercredi, la <strong>pause déjeuner saute</strong> et le collègue qui aidait est parti. Son dossier, lui, est resté.",
      "Vendredi : <strong>« À quoi bon ? »</strong> Sam décroche, devient cynique, fait plus d'erreurs. Plus de soirées pour souffler.",
      "Après le week-end, Sam récupère difficilement. <strong>Quatre semaines plus tard</strong>, il décrit toujours la même fatigue.",
      "Sam décrit un travail exigeant et une récupération difficile. <strong>Cela mérite d'examiner les contraintes, les ressources et sa santé</strong>, sans déduire une cause certaine de ce dessin."
    ];
    const fill = scene.querySelector("#bo-fill");
    const pct = scene.querySelector("#bo-pct");
    const caption = scene.querySelector("#bo-caption");
    const chips = [...scene.querySelectorAll("#bo-acts button")];
    const demands = [...scene.querySelectorAll(".bo-d")];
    const resources = [...scene.querySelectorAll(".bo-r")];
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let timer = null;
    let act = -1;

    // Le dessin fait évoluer un état qualitatif, non une « réserve d'énergie ».
    const show = (next) => {
      const previous = act;
      act = next;
      scene.dataset.act = String(act);
      fill.style.setProperty("--lvl", String(LEVELS[act] / 100));
      pct.textContent = LABELS[act];
      demands.forEach((d) => {
        const visible = Number(d.dataset.in) <= Math.min(act, 2);
        const wasVisible = previous >= 0 && Number(d.dataset.in) <= Math.min(previous, 2);
        d.classList.toggle("is-hidden", !visible);
        d.classList.remove("is-new");
        if (visible && !wasVisible && !reduce) { void d.getBBox(); d.classList.add("is-new"); }
      });
      resources.forEach((r) => r.classList.toggle("is-lost", act >= Number(r.dataset.out)));
      caption.innerHTML = CAPS[act];
      chips.forEach((chip, i) => {
        chip.classList.toggle("on", i === act);
        chip.classList.toggle("done", i < act);
        chip.setAttribute("aria-pressed", String(i === act));
      });
    };

    const play = (from) => {
      clearTimeout(timer);
      show(from);
      if (reduce || from >= CAPS.length - 1) return;
      timer = setTimeout(() => play(from + 1), from === 0 ? 3600 : 4200);
    };

    chips.forEach((chip, i) => chip.addEventListener("click", () => { clearTimeout(timer); show(i); }));
    scene.querySelector("#bo-replay").addEventListener("click", () => play(0));

    if (reduce) { show(CAPS.length - 1); return; }
    show(0);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(0); }
      }, { threshold: 0.4 });
      io.observe(scene);
    } else {
      play(0);
    }
  }

  function initLanguageSwitcher() {
    const languageButtons = document.querySelectorAll("[data-translate-lang]");
    if (!languageButtons.length) return;
    let translateLoader;

    const setTranslateCookie = (lang) => {
      const value = `/fr/${lang}`;
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `googtrans=${value}; path=/; expires=${expires}`;
      if (window.location.hostname) {
        document.cookie = `googtrans=${value}; domain=${window.location.hostname}; path=/; expires=${expires}`;
      }
    };

    const loadTranslator = () => {
      if (document.querySelector(".goog-te-combo")) {
        return Promise.resolve();
      }
      if (translateLoader) {
        return translateLoader;
      }

      translateLoader = new Promise((resolve, reject) => {
        window.googleTranslateElementInit = function () {
          new google.translate.TranslateElement({
            pageLanguage: "fr",
            includedLanguages: "it,en",
            autoDisplay: false
          }, "google_translate_element");
          resolve();
        };

        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      return translateLoader;
    };

    const applyLanguage = (lang, attempt = 0) => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
        return;
      }
      if (attempt < 24) {
        window.setTimeout(() => applyLanguage(lang, attempt + 1), 250);
      }
    };

    languageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const lang = button.dataset.translateLang;
        if (!lang) return;
        setTranslateCookie(lang);
        loadTranslator()
          .then(() => applyLanguage(lang))
          .catch(() => {
            window.location.reload();
          });
      });
    });
  }

  initNavigation();
  initJourneySpy();
  initChapterRail();
  initHeroScene();
  initCopyButtons();
  initLanguageSwitcher();

  const hasQuestionnaire = Boolean(questionnaireRoot && form);

  if (hasQuestionnaire) {
    const invalidateReport = () => {
      delete resultsPanel.dataset.ready;
      resultsPanel.hidden = true;
      latestResultText = "";
    };
    form.addEventListener("change", () => { invalidateReport(); updateProgress(); });
    form.addEventListener("reset", invalidateReport);
    form.addEventListener("bullout:restored", () => {
      invalidateReport();
      form.querySelectorAll(".question-item").forEach(item => {
        item.classList.toggle("is-answered", Boolean(item.querySelector("input:checked")));
        item.classList.remove("is-missing");
      });
      const firstMissing = parts.findIndex(part => partStats(part).done < partStats(part).total);
      showPart(firstMissing < 0 ? 0 : firstMissing, false);
      updateProgress();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formError.hidden = true;
      console.debug("Soumission du questionnaire burn-out");
      if (document.querySelector("#questionnaire").hidden) return;
      const result = calculateResults();

      if (!result) {
        formError.textContent = "Merci de répondre à toutes les questions avant d'afficher le résultat.";
        formError.hidden = false;
        const firstMissing = form.querySelector("input:invalid");
        const missingPart = parts.findIndex((part) => part.contains(firstMissing));
        if (missingPart >= 0) {
          showPart(missingPart, false);
          markMissing(parts[missingPart]);
        } else {
          firstMissing?.closest(".question-item")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        console.debug("Calcul interrompu : réponses manquantes");
        return;
      }

      renderResults(result);
    });

    resetButton?.addEventListener("click", () => {
      form.reset();
      form.querySelectorAll(".q-safety").forEach((box) => { box.hidden = true; });
      resultsPanel.hidden = true;
      formError.hidden = true;
      latestResultText = "";
      form.querySelectorAll(".question-item").forEach((item) => item.classList.remove("is-answered", "is-missing"));
      showPart(0, true);
      updateProgress();
      console.debug("Questionnaire réinitialisé");
    });

    document.addEventListener("click", (event) => {
      const button = event.target.closest("#copy-results");
      if (button && latestResultText) copyText(latestResultText, button);
    });

    buildQuestionnaire();
    initPaging();
    updateProgress();
    initStartDialog();
  } else {
    console.debug("Aucun questionnaire détecté sur cette page : initialisation limitée aux boutons copier", {
      page: document.body.className || document.title
    });
  }

  window.BullOutDebug = {
    sections,
    alertQuestions,
    contextQuestions,
    itemInsights,
    getHumanItemLabel,
    getLevel,
    getGlobalLevel,
    getTopItems,
    determineProfile,
    generatePriorityActions,
    stakeholders,
    getContextAnswers,
    getRecommendedStakeholders,
    strengthPart,
    exchangePart,
    temporalPart,
    getTemporalInsight,
    bullshitPart,
    getTemporalAnswers,
    calculateResults
  };

})();
