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
      questions: [
        "Après une journée de travail, je n'ai plus assez d'énergie pour mes activités personnelles habituelles.",
        "Même après repos court, j'ai l'impression de ne pas récupérer réellement.",
        "Je commence certaines journées déjà saturé à l'idée de ce qui m'attend.",
        "Les tâches ordinaires me demandent un effort disproportionné.",
        "Je deviens irritable ou hypersensible face à des sollicitations professionnelles normales (sollicitation en lien avec ma fiche de poste, que je faisais sans problème, etc.).",
        "J'ai du mal à maintenir mon attention ou ma mémoire de travail au niveau habituel."
      ]
    },
    {
      id: "B",
      title: "B. Distance mentale / cynisme",
      shortTitle: "B Distance mentale",
      type: "symptoms",
      questions: [
        "Je me surprends à me détacher mentalement du travail pour me protéger.",
        "Je deviens plus cynique sur l'utilité de ce que je fais.",
        "J'évite certaines interactions professionnelles parce qu'elles me coûtent trop.",
        "Je ressens moins d'empathie ou de patience envers des personnes avec qui je travaille.",
        "Je fais le minimum relationnel nécessaire pour tenir la journée.",
        "L'idée de démissionner ou de changer de poste me sert d'échappatoire psychologique."
      ]
    },
    {
      id: "C",
      title: "C. Efficacité / sens altérés",
      shortTitle: "C Efficacité/sens",
      type: "symptoms",
      questions: [
        "Je doute plus souvent de ma capacité à produire un travail de qualité.",
        "Je constate une baisse de qualité ou de fiabilité malgré mes efforts.",
        "J'ai du mal à voir le sens concret de mon travail.",
        "Je me sens moins compétent dans des tâches que je maîtrisais auparavant.",
        "Je termine des journées avec le sentiment de n'avoir rien accompli d'utile.",
        "Je ne me reconnais plus dans ma façon de travailler."
      ]
    },
    {
      id: "D",
      title: "D. Exigences professionnelles",
      shortTitle: "D Exigences",
      type: "work",
      questions: [
        "La quantité de travail dépasse régulièrement ce qui peut être fait correctement dans le temps disponible.",
        "Les urgences ou interruptions empêchent de travailler de manière soutenable.",
        "Je reçois des priorités contradictoires ou insuffisamment arbitrées.",
        "Je porte une responsabilité forte sans moyens ou autorité suffisants.",
        "Les exigences émotionnelles ou relationnelles de mon poste sont élevées.",
        "Je dois compenser des dysfonctionnements d'organisation pour que le travail sorte quand même."
      ]
    },
    {
      id: "E",
      title: "E. Ressources professionnelles - score inversé",
      shortTitle: "E Manque de ressources",
      type: "work",
      reversed: true,
      help: "Cette section est inversée au calcul : plus la ressource est présente, moins elle ajoute au score de risque.",
      questions: [
        "Je dispose d'une marge de manœuvre réelle pour organiser mon travail.",
        "Mon manager m'aide à arbitrer lorsque la charge dépasse la capacité réelle.",
        "Mes collègues constituent un soutien concret en cas de difficulté.",
        "Les objectifs et responsabilités sont suffisamment clairs.",
        "Mes efforts sont reconnus de manière crédible et proportionnée.",
        "Les décisions qui me concernent me paraissent globalement équitables."
      ]
    },
    {
      id: "F",
      title: "F. Récupération et signaux de santé",
      shortTitle: "F Récupération/santé",
      type: "recovery",
      questions: [
        "Je rumine le travail le soir, le week-end ou pendant les congés.",
        "Mon sommeil est moins réparateur ou perturbé par le travail.",
        "J'ai réduit mes loisirs, activités physiques ou relations sociales à cause du travail.",
        "J'ai des symptômes physiques inhabituels ou aggravés en période de travail.",
        "J'utilise davantage des stratégies de compensation pour tenir ou dormir : alcool, substances, écrans, alimentation, médicaments hors cadre prescrit.",
        "J'ai eu des oublis, erreurs, quasi-accidents ou comportements impulsifs inhabituels liés à la fatigue."
      ]
    }
  ];

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
    { id: "fearToSpeak", label: "Peur de parler", text: "J'ai peur de parler de la situation à mon manager ou à mon organisation." }
  ];

  const itemInsights = {
    A1: { interpretation: "Récupération insuffisante après la journée.", action: "Identifier ce qui peut être arrêté ou réduit en fin de journée." },
    A2: { interpretation: "Récupération courte insuffisante.", action: "Prévoir une récupération plus protégée et moins fragmentée." },
    A3: { interpretation: "Dette d'énergie anticipée dès le matin.", action: "Réduire temporairement l'exposition aux tâches les plus coûteuses." },
    A4: { interpretation: "Effort disproportionné pour des tâches ordinaires.", action: "Simplifier le niveau de qualité attendu et limiter le multitâche." },
    A5: { interpretation: "Irritabilité ou saturation face aux sollicitations.", action: "Réduire les interruptions et restaurer des plages calmes." },
    A6: { interpretation: "Saturation cognitive ou mémoire de travail fragilisée.", action: "Protéger des temps de concentration et réduire les bascules de contexte." },
    B1: { interpretation: "Mise à distance protectrice.", action: "Identifier ce qui coûte trop : conflit, absurdité, charge relationnelle ou perte de sens." },
    B2: { interpretation: "Cynisme défensif.", action: "Nommer les sources d'absurde et distinguer ce qui peut être changé de ce qui doit être arbitré." },
    B3: { interpretation: "Évitement d'interactions coûteuses.", action: "Réduire les interactions non utiles ou cadrer les échanges difficiles." },
    B4: { interpretation: "Patience ou empathie entamée.", action: "Traiter la charge émotionnelle et éviter d'ajouter du relationnel décoratif." },
    B5: { interpretation: "Retrait relationnel pour tenir.", action: "Alléger la charge sociale et clarifier les interactions indispensables." },
    B6: { interpretation: "Échappatoire psychologique.", action: "Prendre le signal au sérieux et discuter des options de réduction d'exposition." },
    C1: { interpretation: "Confiance professionnelle fragilisée.", action: "Clarifier les attentes et demander un feedback utile sur le travail réel." },
    C2: { interpretation: "Qualité ou fiabilité en baisse malgré les efforts.", action: "Réduire le multitâche et traiter les causes d'erreur." },
    C3: { interpretation: "Perte de sens.", action: "Relier les tâches aux décisions utiles ou supprimer les livrables décoratifs." },
    C4: { interpretation: "Sentiment de compétence altéré.", action: "Restaurer la maîtrise par des tâches cadrées et un périmètre réaliste." },
    C5: { interpretation: "Sentiment d'inutilité en fin de journée.", action: "Définir un résultat utile et atteignable avant d'empiler les demandes." },
    C6: { interpretation: "Décalage entre soi et sa manière de travailler.", action: "Identifier ce qui force à travailler contre ses standards professionnels." },
    D1: { interpretation: "Surcharge.", action: "Lister les tâches et demander ce qui doit être arrêté, reporté ou simplifié." },
    D2: { interpretation: "Interruptions ou urgences excessives.", action: "Bloquer des plages sans interruption et trier les urgences réelles." },
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
    F4: { interpretation: "Symptômes physiques liés au travail.", action: "Surveiller l'évolution et demander un avis santé si cela persiste ou s'aggrave." },
    F5: { interpretation: "Stratégies de compensation.", action: "Chercher un appui professionnel si ces stratégies augmentent ou deviennent nécessaires pour tenir." },
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
    B2: "cynisme défensif",
    B3: "évitement d'interactions coûteuses",
    B4: "empathie ou patience entamée",
    B5: "retrait relationnel",
    B6: "envie d'échappatoire",
    C1: "doute sur la qualité du travail",
    C2: "qualité ou fiabilité en baisse",
    C3: "perte de sens",
    C4: "sentiment de compétence altéré",
    C5: "sentiment d'utilité faible",
    C6: "décalage avec sa manière habituelle de travailler",
    D1: "surcharge",
    D2: "interruptions ou urgences excessives",
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
    F4: "symptômes physiques liés au travail",
    F5: "stratégies de compensation",
    F6: "risque fonctionnel ou sécurité"
  };

  function getHumanItemLabel(itemId) {
    return humanItemLabels[itemId] || itemInsights[itemId]?.interpretation || "signal à investiguer";
  }

  const sectionComments = {
    A: {
      faible: "L'épuisement déclaré reste bas.",
      vigilance: "L'épuisement mérite une surveillance active.",
      élevé: "Le score d'épuisement indique une dette d'énergie importante.",
      alerte: "L'épuisement est très marqué et justifie une réduction rapide de l'exposition."
    },
    B: {
      faible: "La distance mentale reste limitée.",
      vigilance: "Un retrait protecteur commence peut-être à s'installer.",
      élevé: "La distance mentale suggère une mise à distance protectrice ou un cynisme défensif.",
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
      élevé: "Les exigences professionnelles ressortent comme un facteur d'usure probable.",
      alerte: "Les exigences sont très hautes : le travail semble difficilement soutenable en l'état."
    },
    E: {
      faible: "Les ressources semblent globalement présentes.",
      vigilance: "Certaines ressources protectrices manquent.",
      élevé: "Le manque de ressources devient un facteur de risque net.",
      alerte: "Les ressources sont très insuffisantes face aux contraintes déclarées."
    },
    F: {
      faible: "La récupération semble encore fonctionner.",
      vigilance: "La récupération montre des signes de fragilité.",
      élevé: "La récupération et les signaux de santé demandent une attention particulière.",
      alerte: "La récupération est très dégradée : avis santé conseillé si cela persiste ou s'aggrave."
    }
  };

  const profileRecommendations = {
    protected: {
      title: "Profil protégé",
      recommendation: "Maintenir les protections : charge réaliste, marges de manœuvre, soutien, récupération et signaux faibles suivis régulièrement."
    },
    tension: {
      title: "Profil sous tension",
      recommendation: "Agir rapidement sur la charge, les priorités et les ressources avant que l'usure ne s'installe."
    },
    exhaustion: {
      title: "Profil d'épuisement installé",
      recommendation: "Réduire l'exposition, protéger la récupération et envisager un échange avec le médecin du travail ou le médecin traitant."
    },
    disengagement: {
      title: "Profil de désengagement / cynisme",
      recommendation: "Travailler sur reconnaissance, sens, équité, conflits, charge émotionnelle et arbitrages de charge."
    },
    alert: {
      title: "Profil d'alerte",
      recommendation: "Demander un avis médical rapide. En cas de danger immédiat : 15 / 112. En cas d'idées suicidaires en France : 3114."
    },
    mixed: {
      title: "Profil de vigilance mixte",
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
  const progressCount = document.querySelector("#progress-count");
  const progressTotal = document.querySelector("#progress-total");
  const progressBar = document.querySelector("#progress-bar");
  const resultsPanel = document.querySelector("#results");
  const profileTitle = document.querySelector("#profile-title");
  const profileSummary = document.querySelector("#profile-summary");
  const globalLevel = document.querySelector("#global-level");
  const globalScore = document.querySelector("#global-score");
  const alertMessage = document.querySelector("#alert-message");
  const scoreBars = document.querySelector("#score-bars");
  const modelReadings = document.querySelector("#model-readings");
  const contextFactors = document.querySelector("#context-factors");
  const collectiveSummary = document.querySelector("#collective-summary");
  const topItemsList = document.querySelector("#top-items-list");
  const priorityActions = document.querySelector("#priority-actions");
  const recommendedStakeholders = document.querySelector("#recommended-stakeholders");
  const resultTakeaways = document.querySelector("#result-takeaways");
  const recommendationText = document.querySelector("#recommendation-text");
  const resetButton = document.querySelector("#reset-form");
  const copyResultsButton = document.querySelector("#copy-results");
  const navToggle = document.querySelector(".nav-toggle");
  const mainMenu = document.querySelector("#main-menu");
  const navGroups = document.querySelectorAll(".nav-group");
  const riskZoneReading = document.querySelector("#risk-zone-reading");
  const plan72h = document.querySelector("#plan-72h");
  const plan2Weeks = document.querySelector("#plan-2weeks");

  let latestResultText = "";

  function buildQuestionnaire() {
    const fragment = document.createDocumentFragment();

    sections.forEach((section) => {
      const sectionElement = document.createElement("section");
      sectionElement.className = "question-section";
      sectionElement.setAttribute("aria-labelledby", `section-${section.id}`);

      const title = document.createElement("h3");
      title.id = `section-${section.id}`;
      title.textContent = section.title;
      sectionElement.appendChild(title);

      if (section.help) {
        const help = document.createElement("p");
        help.textContent = section.help;
        sectionElement.appendChild(help);
      }

      section.questions.forEach((question, index) => {
        sectionElement.appendChild(createRatingQuestion(section, question, index));
      });

      fragment.appendChild(sectionElement);
    });

    const contextSection = document.createElement("section");
    contextSection.className = "question-section";
    contextSection.setAttribute("aria-labelledby", "section-context");
    contextSection.innerHTML = "<h3 id=\"section-context\">Contexte particulier — ne compte pas dans le score</h3><p>Ces éléments ne modifient pas le score, mais ils changent la lecture du résultat. Ils peuvent orienter vers les bons interlocuteurs.</p>";
    contextQuestions.forEach((question, index) => {
      contextSection.appendChild(createYesNoQuestion(question.text, index, "context"));
    });
    fragment.appendChild(contextSection);

    const alertSection = document.createElement("section");
    alertSection.className = "question-section";
    alertSection.setAttribute("aria-labelledby", "section-alerts");
    alertSection.innerHTML = "<h3 id=\"section-alerts\">Questions d'alerte</h3><p>Répondez oui ou non. Une réponse oui déclenche un message de prudence médicale.</p>";
    alertQuestions.forEach((question, index) => {
      alertSection.appendChild(createYesNoQuestion(question, index, "alert"));
    });
    fragment.appendChild(alertSection);

    questionnaireRoot.appendChild(fragment);
    progressTotal.textContent = String(sections.length * 6 + contextQuestions.length + alertQuestions.length);
    console.debug("Questionnaire initialisé", { sections: sections.length, contextQuestions: contextQuestions.length, alertQuestions: alertQuestions.length });
  }

  function createRatingQuestion(section, question, index) {
    const name = `${section.id}${index + 1}`;
    const wrapper = document.createElement("fieldset");
    wrapper.className = "question-item";
    wrapper.innerHTML = `<legend class="question-text">${question}</legend>`;

    const options = document.createElement("div");
    options.className = "rating-options";

    ratingLabels.forEach((label, value) => {
      const option = document.createElement("label");
      option.className = "option-pill";
      option.innerHTML = `<input type="radio" name="${name}" value="${value}" required> <span>${label}</span>`;
      options.appendChild(option);
    });

    wrapper.appendChild(options);
    return wrapper;
  }

  function createYesNoQuestion(question, index, prefix = "alert") {
    const name = `${prefix}${index + 1}`;
    const wrapper = document.createElement("fieldset");
    wrapper.className = "question-item";
    wrapper.innerHTML = `<legend class="question-text">${question}</legend>`;

    const options = document.createElement("div");
    options.className = "yesno-options";
    [
      { label: "Non", value: "no" },
      { label: "Oui", value: "yes" }
    ].forEach((choice) => {
      const option = document.createElement("label");
      option.className = "option-pill";
      option.innerHTML = `<input type="radio" name="${name}" value="${choice.value}" required> <span>${choice.label}</span>`;
      options.appendChild(option);
    });
    wrapper.appendChild(options);
    return wrapper;
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
    progressCount.textContent = String(answered);
    progressTotal.textContent = String(total);
    progressBar.style.width = `${percentage}%`;
    console.debug("Progression mise à jour", { answered, total, percentage });
  }

  function getLevel(score) {
    if (score <= 6) return { label: "faible", className: "faible", riskClass: "risk-low" };
    if (score <= 12) return { label: "vigilance", className: "vigilance", riskClass: "risk-watch" };
    if (score <= 18) return { label: "élevé", className: "eleve", riskClass: "risk-high" };
    return { label: "alerte", className: "alerte", riskClass: "risk-alert" };
  }

  function getGlobalLevel(score, hasAlert) {
    if (hasAlert || score >= 109) return { label: "alerte", riskClass: "risk-alert" };
    if (score >= 73) return { label: "élevé", riskClass: "risk-high" };
    if (score >= 37) return { label: "vigilance", riskClass: "risk-watch" };
    return { label: "faible", riskClass: "risk-low" };
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
    if (hasAlert || totalScore >= 109 || Object.values(sectionScores).some((score) => score >= 22)) {
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
    const dominantNames = result.dominantDimensions.map((section) => section.shortTitle.replace(/^[A-F] /, "")).join(" et ");
    if (result.hasAlert) {
      return "Votre profil contient au moins un signal d'alerte. Ce résultat ne constitue pas un diagnostic, mais il justifie un avis médical rapide.";
    }
    if (result.profile.key === "protected") {
      return "Votre profil montre des protections encore présentes. L'enjeu est de les maintenir avant qu'elles ne deviennent optionnelles dans l'organisation réelle.";
    }
    if (result.profile.key === "tension") {
      return "Votre profil montre surtout une tension liée aux exigences professionnelles. Les symptômes cœur ne sont pas tous au niveau maximal, mais la dynamique est défavorable si rien ne change.";
    }
    if (result.profile.key === "exhaustion") {
      return "Votre profil montre surtout un épuisement associé à une récupération dégradée. Votre profil est compatible avec un niveau de risque élevé et justifie une action.";
    }
    if (result.profile.key === "disengagement") {
      return "Votre profil montre surtout un retrait mental, du cynisme défensif ou une perte de sens. Ce signal mérite d'être relié aux causes de travail, pas traité comme un défaut d'attitude.";
    }
    return `Votre profil fait ressortir principalement ${dominantNames}. Votre profil est compatible avec un niveau de risque à investiguer et justifie une action ciblée.`;
  }

  function buildModelReadings(result) {
    const scores = result.sectionScores;
    const maslachLines = [];
    if (scores.A >= 13) maslachLines.push("Le score d'épuisement indique une dette d'énergie importante.");
    if (scores.B >= 13) maslachLines.push("Le score de distance mentale suggère une mise à distance protectrice ou un cynisme défensif.");
    if (scores.C >= 13) maslachLines.push("Le score d'efficacité/sens suggère une perte de maîtrise ou une baisse du sentiment d'utilité.");
    if (scores.A >= 13 && scores.B >= 13 && scores.C >= 13) maslachLines.push("Les trois dimensions cœur sont simultanément élevées : il faut éviter de réduire le problème à une simple fatigue.");
    if (!maslachLines.length) maslachLines.push("Les dimensions cœur ne sont pas toutes élevées, mais leur évolution reste utile à suivre.");

    const jdRCauses = result.topItems
      .filter((item) => ["D", "E"].includes(item.sectionId))
      .map((item) => item.interpretation);
    const jdrLines = [
      "Le modèle JD-R suggère que le risque vient surtout d'un déséquilibre entre ce que le travail demande et ce qu'il donne comme ressources pour y faire face."
    ];
    if (scores.D >= 13) jdrLines.push("Les demandes professionnelles sont fortes.");
    if (scores.E >= 13) jdrLines.push("Les ressources protectrices semblent insuffisantes.");
    if (scores.D >= 13 && scores.E >= 13) jdrLines.push("Demandes élevées + ressources faibles : la balance est défavorable.");
    if (jdRCauses.length) jdrLines.push(`Causes probables : ${unique(jdRCauses).join(", ")}.`);

    const eriSignals = [];
    if (getItem(result.answers, "D4")?.riskScore >= 3 || getItem(result.answers, "D6")?.riskScore >= 3) eriSignals.push("effort élevé");
    if (getItem(result.answers, "E5")?.riskScore >= 3) eriSignals.push("récompense ou reconnaissance faible");
    if (getItem(result.answers, "E6")?.riskScore >= 3) eriSignals.push("injustice ou équité faible");
    if (getItem(result.answers, "F1")?.riskScore >= 3) eriSignals.push("surengagement ou rumination");
    if (getItem(result.answers, "F5")?.riskScore >= 3) eriSignals.push("stratégies de compensation");
    const eriLines = [
      "Le modèle ERI suggère un possible déséquilibre effort / récompense lorsque les efforts sont élevés, la reconnaissance faible et la récupération dégradée."
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

    if (result.hasAlert || scores.F >= 19 || contextYes.has("safetySensitiveJob")) {
      addAction("safety", "alert", "Sécurité / santé d'abord", "En cas de danger immédiat : 15 / 112. Idées suicidaires : 3114. Si un poste à enjeu de sécurité est concerné, réduire l'exposition aux tâches à risque.");
    }
    if (scores.D >= 13) {
      addAction("exposure", "load", "Réduire ou arbitrer la charge", "Lister les tâches en cours et demander explicitement ce qui doit être arrêté, reporté ou simplifié.");
    }
    if (scores.E >= 13) {
      addAction("resources", "resources", "Renforcer les ressources", "Identifier le manque principal : autonomie, soutien, clarté, reconnaissance ou équité.");
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
    if (contextYes.has("ethicalConflict")) {
      addAction("meaning", "ethics", "Clarifier le conflit éthique", "Documenter les faits, clarifier les responsabilités et chercher un appui professionnel ou collectif.");
    }
    if (contextYes.has("collectiveSignal")) {
      addAction("followup", "collective", "Lire aussi le signal comme collectif", "Comparer les contraintes partagées et envisager une remontée collective plutôt qu'une adaptation individuelle isolée.");
    }
    addAction("followup", "followup", "Suivre la trajectoire", "Refaire le questionnaire dans 2 à 4 semaines et conserver le résumé pour comparer.");
    if (!Object.values(buckets).flat().length) {
      addAction("followup", "maintain", "Maintenir les protections", "Conserver les marges de manœuvre, les temps de récupération et les arbitrages qui maintiennent le travail soutenable.");
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
      addRecommendation("emergency", "Réponse positive à une question d'alerte : en cas de danger immédiat, aide immédiate.");
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
      addRecommendation("manager", "Profil protégé : maintenir la clarté, les priorités et les protections existantes.");
      addRecommendation("occupationalNurse", "Question santé-travail ou prévention : premier échange possible.");
      addRecommendation("occupationalDoctor", "Question d'aménagement ou de prévention : avis santé-travail possible.");
    }

    if (recommendations.length === 0 && contextYes.size === 0) {
      addRecommendation("occupationalNurse", "Premier échange possible si vous hésitez sur le bon interlocuteur.");
      addRecommendation("manager", "Maintenir la clarté de charge et d'arbitrage.");
    }

    if (contextYes.has("harassment")) {
      addRecommendation("occupationalDoctor", "Contexte de harcèlement, humiliations ou violences : prévention santé-travail et confidentialité médicale.");
      addRecommendation("generalPractitioner", "Retentissement santé possible en contexte de violence ou harcèlement.");
      addRecommendation("hr", "Procédure ou signalement possible, avec prudence sur la confidentialité.");
      addRecommendation("cse", "Appui possible des représentants du personnel si la situation doit être tracée ou portée collectivement.");
      if (hasAlert) addRecommendation("emergency", "Danger immédiat ou alerte : aide urgente à envisager.");
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
      if (hasAlert || scores.F >= 19) addRecommendation("emergency", "Symptôme aigu ou danger immédiat : aide urgente.");
    }
    if (contextYes.has("fearToSpeak")) {
      addRecommendation("occupationalDoctor", "Peur de parler : échange confidentiel santé-travail possible.");
      addRecommendation("occupationalNurse", "Premier point confidentiel et orientation possible.");
      addRecommendation("psychologist", "Soutien pour clarifier la situation et préparer des limites.");
      addRecommendation("cse", "Appui possible selon le contexte relationnel et la confidentialité souhaitée.");
    }

    const selected = recommendations.slice(0, 5).map((recommendation) => ({
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

    const sectionScores = Object.fromEntries(Object.entries(sectionResults).map(([id, result]) => [id, result.score]));
    const totalScore = Object.values(sectionScores).reduce((sum, score) => sum + score, 0);
    const hasAlert = alertAnswers.some((answer) => answer.yes);
    const totalLevel = getGlobalLevel(totalScore, hasAlert);
    const profile = determineProfile(sectionScores, totalScore, hasAlert);
    const answers = buildAnswerItems(sectionResults);
    const topItems = getTopItems(answers);
    const dominantDimensions = getDominantDimensions(sectionResults);
    const modelReadingCards = buildModelReadings({ sectionScores, topItems, answers });
    const actions = generatePriorityActions({ sectionScores, hasAlert, contextAnswers });
    const stakeholderRecommendations = getRecommendedStakeholders(sectionScores, alertAnswers, profile, contextAnswers);
    const summary = buildOverallSummary({ profile, hasAlert, dominantDimensions });

    const result = {
      sectionResults,
      sectionScores,
      alertAnswers,
      contextAnswers,
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

  function renderResults(result) {
    profileTitle.textContent = result.profile.title;
    profileSummary.textContent = result.summary;
    globalLevel.innerHTML = `Niveau global : <span class="risk-tag ${result.totalLevel.riskClass}">${result.totalLevel.label}</span>`;
    globalScore.textContent = String(result.totalScore);
    alertMessage.hidden = !result.hasAlert;
    recommendationText.textContent = result.profile.recommendation;

    renderScoreBars(result);
    renderModelReadings(result.modelReadings);
    renderContextFactors(result.contextAnswers);
    renderCollectiveReading(result.contextAnswers);
    renderTopItems(result.topItems);
    renderPriorityActions(result.actions);
    renderRiskZoneReading(result);
    renderActionPlans(result);
    renderResultTakeaways(result);
    renderRecommendedStakeholders(result.stakeholderRecommendations);

    latestResultText = buildResultText(result);
    resultsPanel.hidden = false;
    resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    console.debug("Affichage des résultats terminé", { latestResultText });
  }

  function renderScoreBars(result) {
    scoreBars.innerHTML = "";
    sections.forEach((section) => {
      const sectionResult = result.sectionResults[section.id];
      const row = document.createElement("div");
      row.className = "score-row";
      row.innerHTML = `
        <div class="score-row-header">
          <span>${sectionResult.shortTitle}</span>
          <span><span class="risk-tag ${sectionResult.level.riskClass}">${sectionResult.level.label}</span> ${sectionResult.score}/24 - ${sectionResult.percent}%</span>
        </div>
        <div class="bar-track" aria-hidden="true"><span class="bar-fill ${sectionResult.level.className}" style="width: ${sectionResult.percent}%"></span></div>
        <p>${sectionResult.comment}</p>
      `;
      scoreBars.appendChild(row);
    });
  }

  function renderModelReadings(readings) {
    modelReadings.innerHTML = "";
    readings.forEach((reading) => {
      const card = document.createElement("article");
      card.className = "model-reading-card";
      card.innerHTML = `
        <h5>${reading.title}</h5>
        <span class="risk-tag risk-watch">${reading.tag}</span>
        <ul>${reading.lines.map((line) => `<li>${line}</li>`).join("")}</ul>
      `;
      modelReadings.appendChild(card);
    });
  }

  function renderContextFactors(contextAnswers) {
    const positive = contextAnswers.filter((answer) => answer.yes);
    if (!positive.length) {
      contextFactors.innerHTML = "<p>Aucun élément de contexte particulier signalé dans cette section. Cela n'exclut pas qu'un contexte non listé soit important.</p>";
      console.debug("Rendu contexte", { positive });
      return;
    }
    contextFactors.innerHTML = `
      <p>Ces éléments ne posent pas de diagnostic, mais ils peuvent changer les interlocuteurs à mobiliser et le niveau de prudence.</p>
      <ul>${positive.map((answer) => `<li><strong>${answer.label}</strong> — ${answer.text}</li>`).join("")}</ul>
    `;
    console.debug("Rendu contexte", { positive });
  }

  function renderCollectiveReading(contextAnswers) {
    const collective = contextAnswers.some((answer) => answer.id === "collectiveSignal" && answer.yes);
    collectiveSummary.textContent = collective
      ? "Le résultat ne doit pas être lu uniquement comme une difficulté individuelle. Si plusieurs personnes décrivent surcharge, flou, manque de ressources ou récupération dégradée, c'est possiblement un signal d'organisation du travail."
      : "Le résultat décrit votre situation déclarée. Si vous découvrez que d'autres personnes vivent les mêmes difficultés, la lecture peut devenir collective.";
    console.debug("Lecture individuel / collectif", { collective });
  }

  function renderTopItems(items) {
    topItemsList.innerHTML = "";
    if (!items.length) {
      topItemsList.innerHTML = "<li>Aucun item à 3 ou 4. Les signaux forts ne dominent pas dans les réponses actuelles.</li>";
      return;
    }
    items.forEach((item) => {
      const element = document.createElement("li");
      element.innerHTML = `
        <strong>${item.humanLabel} : ${item.riskScore}/4</strong>
        <p class="item-section">${item.sectionTitle}</p>
        <p>${item.question}</p>
        <p><strong>Interprétation :</strong> ${item.interpretation}</p>
        <p><strong>Action associée :</strong> ${item.action}</p>
      `;
      topItemsList.appendChild(element);
    });
  }

  function renderPriorityActions(actions) {
    priorityActions.innerHTML = "";
    actions.forEach((action) => {
      const card = document.createElement("article");
      card.className = "priority-action";
      card.innerHTML = `<strong>${action.title}</strong><p>${action.text}</p>`;
      priorityActions.appendChild(card);
    });
  }

  function renderRiskZoneReading(result) {
    if (!riskZoneReading) return;
    const activeZone = result.hasAlert || result.totalLevel.label === "alerte" ? "red" : result.totalLevel.label === "élevé" ? "orange" : "green";
    const zones = [
      {
        key: "green",
        title: "Zone verte — tension surveillée",
        text: "Faire le point, protéger la récupération et refaire le test dans 2 à 4 semaines.",
        items: ["faire le point", "protéger la récupération", "surveiller la trajectoire"]
      },
      {
        key: "orange",
        title: "Zone orange — risque installé",
        text: "Le niveau d'action recommandé augmente : agir sur la charge, la récupération et un interlocuteur utile.",
        items: ["choisir une action sur la charge", "choisir une action sur la récupération", "parler à un interlocuteur utile"]
      },
      {
        key: "red",
        title: "Zone rouge — signaux préoccupants",
        text: "Réduire l'exposition, demander un avis médical ou santé au travail, et ne pas rester seul avec la situation.",
        items: ["réduire l'exposition", "demander un avis médical ou santé au travail", "15 / 112 / 3114 si urgence ou idées suicidaires"]
      }
    ];
    riskZoneReading.innerHTML = zones.map((zone) => `
      <article class="risk-zone-card zone-${zone.key} ${zone.key === activeZone ? "is-active" : ""}">
        <h5>${zone.title}</h5>
        <p>${zone.text}</p>
        <ul>${zone.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `).join("");
  }

  function renderActionPlans(result) {
    if (!plan72h || !plan2Weeks) return;
    const topLabels = result.topItems.slice(0, 3).map((item) => item.humanLabel);
    const dominant = result.dominantDimensions[0]?.shortTitle || "la dimension dominante";
    const recoveryHigh = result.sectionScores.F >= 13;
    const demandHigh = result.sectionScores.D >= 13;
    const resourcesHigh = result.sectionScores.E >= 13;
    const plan = [
      {
        title: "À arrêter temporairement",
        items: [
          "accepter une nouvelle tâche sans arbitrage",
          demandHigh ? "répondre en temps réel à toutes les sollicitations" : "ajouter des engagements sans marge",
          "compenser seul un dysfonctionnement collectif"
        ]
      },
      {
        title: "À clarifier",
        items: [
          "priorité principale de la semaine",
          "tâches à reporter",
          "niveau de qualité attendu",
          topLabels.length ? `signal principal à discuter : ${topLabels.join(", ")}` : `dimension à discuter : ${dominant}`
        ]
      },
      {
        title: "À demander",
        items: [
          demandHigh ? "arbitrage de charge" : "point court sur les priorités",
          resourcesHigh ? "soutien, clarté ou moyen concret" : "soutien d'un collègue si utile",
          recoveryHigh ? "avis médecin du travail ou médecin traitant si la récupération reste dégradée" : "aménagement temporaire si la situation s'aggrave"
        ]
      },
      {
        title: "À surveiller",
        items: ["sommeil", "irritabilité", "erreurs", "rumination", "stratégies de compensation"]
      }
    ];
    plan72h.innerHTML = plan.map((block) => `
      <article class="action-plan-card">
        <h5>${block.title}</h5>
        <ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `).join("");
    plan2Weeks.innerHTML = [
      {
        title: "Comparer",
        items: ["refaire le questionnaire", "vérifier si le score baisse, stagne ou monte"]
      },
      {
        title: "Décider",
        items: ["vérifier si une action concrète a été obtenue", "décider si le niveau d'aide doit augmenter"]
      }
    ].map((block) => `
      <article class="action-plan-card">
        <h5>${block.title}</h5>
        <ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `).join("");
  }

  function renderResultTakeaways(result) {
    if (!resultTakeaways) return;
    const dominant = result.dominantDimensions[0];
    const topItem = result.topItems[0];
    const firstAction = result.actions[0];
    const cards = [
      {
        title: "Signal principal",
        text: dominant ? `${dominant.shortTitle} ressort à ${dominant.score}/24 (${dominant.level.label}).` : "Aucune dimension ne domine fortement."
      },
      {
        title: "Point concret",
        text: topItem ? `${topItem.humanLabel} : ${topItem.interpretation}` : "Aucun item à 3 ou 4 dans les réponses actuelles."
      },
      {
        title: "Prochaine étape",
        text: firstAction ? `${firstAction.title} : ${firstAction.text}` : "Maintenir les protections existantes."
      }
    ];
    resultTakeaways.innerHTML = cards.map((card) => `
      <article class="takeaway-card">
        <strong>${card.title}</strong>
        <p>${card.text}</p>
      </article>
    `).join("");
    console.debug("Synthèse rapide générée", cards);
  }

  function renderRecommendedStakeholders(recommendations) {
    recommendedStakeholders.innerHTML = "";
    recommendations.forEach((recommendation) => {
      const card = document.createElement("article");
      card.className = `recommended-stakeholder ${recommendation.key === "emergency" ? "stakeholder-emergency" : ""}`;
      card.innerHTML = `
        <h5>${recommendation.stakeholder.name}</h5>
        <p><strong>Pourquoi cet acteur est proposé : score + contexte.</strong> ${recommendation.why}</p>
        <p><strong>Rôle court :</strong> ${recommendation.stakeholder.shortRole}</p>
        <p><strong>Phrase utile :</strong> “${recommendation.stakeholder.script}”</p>
        <a href="${recommendation.stakeholder.anchor}">Voir la carte détaillée</a>
      `;
      recommendedStakeholders.appendChild(card);
    });
    console.debug("Rendu des interlocuteurs recommandés", recommendations.map((recommendation) => recommendation.key));
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
      `Score global : ${result.totalScore}/144 (${result.totalLevel.label})`,
      "Scores A-F :",
      ...sectionLines,
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
      "- À arrêter temporairement : accepter une nouvelle tâche sans arbitrage ; compenser seul un dysfonctionnement collectif.",
      "- À clarifier : priorité principale, tâches à reporter, niveau de qualité attendu.",
      "- À demander : arbitrage de charge, ressource concrète, appui santé-travail si nécessaire.",
      "- À surveiller : sommeil, irritabilité, erreurs, rumination, stratégies de compensation.",
      "",
      "Plan à 2 semaines : refaire le questionnaire, vérifier la trajectoire, vérifier si une action concrète a été obtenue, décider si le niveau d'aide doit augmenter.",
      "",
      "Interlocuteurs potentiellement utiles :",
      ...stakeholderLines,
      "",
      `Alerte oui/non : ${yesAlerts > 0 ? "oui" : "non"} (${yesAlerts}/3)`,
      "Rappel : un score faible ne suffit pas toujours à exclure un problème si votre sommeil, votre humeur, votre sécurité ou votre fonctionnement se dégrade.",
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
  initCopyButtons();
  initLanguageSwitcher();

  const hasQuestionnaire = Boolean(questionnaireRoot && form);

  if (hasQuestionnaire) {
    form.addEventListener("change", updateProgress);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formError.hidden = true;
      console.debug("Soumission du questionnaire burn-out");
      const result = calculateResults();

      if (!result) {
        formError.textContent = "Merci de répondre à toutes les questions avant d'afficher le résultat.";
        formError.hidden = false;
        const firstMissing = form.querySelector("input:invalid");
        firstMissing?.closest(".question-item")?.scrollIntoView({ behavior: "smooth", block: "center" });
        console.debug("Calcul interrompu : réponses manquantes");
        return;
      }

      renderResults(result);
    });

    resetButton?.addEventListener("click", () => {
      form.reset();
      resultsPanel.hidden = true;
      formError.hidden = true;
      latestResultText = "";
      updateProgress();
      console.debug("Questionnaire réinitialisé");
    });

    copyResultsButton?.addEventListener("click", () => {
      if (latestResultText) {
        copyText(latestResultText, copyResultsButton);
      }
    });

    buildQuestionnaire();
    updateProgress();
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
    getRecommendedStakeholders
  };

})();
