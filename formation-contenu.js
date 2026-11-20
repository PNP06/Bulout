// Formation Bull-Out : neuf chapitres d’une page, un fil rouge (Sam, 38 ans), un exercice par chapitre.
// Chaque chapitre suit le même gabarit : ce que tu sauras faire, l’idée reçue de départ, l’essentiel,
// des exemples concrets, le piège de raisonnement, l’exercice, et la pièce du rapport qu’il éclaire.
// Le contenu de l’ancienne page « Managers » est intégré aux chapitres 5, 7, 8 et 9 : il concerne tout le monde.

export const temps = [
  "Premier temps · Nommer sans se tromper",
  "Deuxième temps · Chercher ce qui use",
  "Troisième temps · Agir sur le travail",
];

export const introduction = {
  objectif: "À la fin de la formation, tu sauras lire ton rapport Bull-Out comme un point de départ pour agir sur ton travail, et non comme un verdict sur toi.",
  pourquoi: [
    "Tu viens peut-être avec une question simple : « est-ce que je fais un burn-out ? ». Ou avec la question inverse : « tout le monde est fatigué, est-ce que j’exagère ? ». Les deux sont légitimes, et les deux vont trop vite.",
    "Le mot burn-out est partout : en réunion, sur les réseaux, à la machine à café. Chacun y met ce qu’il veut. Pour certains, c’est une grosse fatigue. Pour d’autres, une faiblesse. Pour d’autres encore, un mot à la mode. Aucune de ces trois idées n’aide à décider quoi faire lundi.",
    "La recherche raisonne autrement. Elle ne demande pas seulement « comment va la personne ? », mais aussi « qu’est-ce qui, dans le travail, l’use ? » et « qu’est-ce qu’on peut y changer ? ». C’est ce changement de regard que la formation installe, avant le questionnaire.",
    "Tu suivras Sam, 38 ans, coordinateur logistique dans une PME. Sa semaine se dégrade, puis son mois. Chaque chapitre éclaire une partie de son histoire, et une partie de ton futur rapport. Nadia, sa manager, est aussi là : ce qui se joue côté management concerne tout le monde, pas seulement les managers.",
  ],
  contrat: [
    "<b>Neuf chapitres d’une page</b>, de 4 à 8 minutes chacun (environ 55 minutes en tout), une synthèse, puis un test final qui te donne ton diplôme : c’est lui qui ouvre le questionnaire.",
    "<b>En plusieurs fois, si tu veux.</b> Rien n’est gardé sur ce site : « Enregistrer ma progression » télécharge un petit fichier, « Reprendre un fichier » te ramène où tu en étais.",
    "<b>Des sources à chaque chapitre</b>, et les points encore débattus sont signalés.",
  ],
  essentiel: [
    "Le meilleur indice n’est pas l’intensité de la fatigue, mais sa durée et ce que le repos te rend.",
    "Le burn-out a trois signes : l’épuisement, la distance mentale et la baisse d’efficacité. La fatigue n’est que le premier.",
    "L’usure s’installe quand ce que le travail demande pèse durablement plus que ce qui aide à le faire.",
    "Donner beaucoup pour peu de retour use aussi, et le surengagement rend le problème invisible.",
    "Un facteur personnel peut rendre plus vulnérable. Il ne dispense jamais de regarder le travail.",
    "Aucun dosage ne diagnostique un burn-out, et un score se lit dimension par dimension.",
    "Face à une surcharge, il faut une décision : retirer, reporter ou simplifier. Sinon, on escalade.",
    "La loi demande de prévenir, pas seulement de réparer. Ce qui protège, salarié comme manager, c’est d’avoir agi et de pouvoir le montrer.",
    "Chaque interlocuteur ouvre une porte différente : soin, aménagement, arbitrage ou protection.",
  ],
};

export const chapitres = [
  // ───────────────────────────── 1
  {
    temps: 0,
    court: "Fatigue ou usure ?",
    titre: "Fatigue, stress ou burn-out : ce que le repos te rend",
    duree: 5,
    savoir: [
      "Distinguer une fatigue qui passe d’une usure qui s’installe, avec un critère simple : ce que le repos te rend.",
      "Dire ce que l’Organisation mondiale de la santé appelle burn-out, et ce qu’elle n’appelle pas ainsi.",
    ],
    arrive: "« Je suis crevé, c’est sûrement un burn-out. » Ou l’inverse : « Tout le monde est fatigué, c’est normal. » Les deux phrases vont trop vite. Ce chapitre donne un critère pour ne se tromper dans aucun sens.",
    retenir: "Le burn-out n’est pas une grosse fatigue. L’OMS le décrit comme un <b>phénomène lié au travail</b> : un stress chronique au travail qui n’a pas été bien géré, avec trois signes (épuisement, distance mentale, efficacité réduite). Le meilleur indice n’est pas l’intensité de la fatigue, c’est <b>sa durée</b> et <b>ce que le repos te rend</b>.",
    blocs: [
      { t: "h", texte: "Le critère du week-end" },
      { t: "p", html: "Vendredi soir, Sam et sa collègue Léa viennent de livrer un gros dossier en urgence. Tous les deux disent la même phrase : « je suis vidé ». À ce moment-là, rien ne permet de les distinguer. Pour les comprendre, il faut les retrouver <b>après</b>." },
      { t: "fig", ill: "weekend", cap: "Même vendredi, deux suites différentes. Ce qui distingue une fatigue d’une usure, c’est ce que le repos rend." },
      { t: "p", html: "Lundi, Léa a retrouvé de l’énergie. Trois semaines plus tard, elle a repris le tennis. Sam, lui, a dormi tout le week-end sans récupérer. Il annule ses soirées, relit trois fois le même mail. La différence ne tient pas à la dureté du vendredi : elle tient à <b>ce que le repos leur rend</b>, et à <b>ce qu’ils arrivent encore à faire</b>." },
      { t: "exemple", titre: "Le test des vacances", html: "Sam part dix jours en congé. Il revient reposé. Trois jours après la reprise, il est aussi vidé qu’avant. Ce retour rapide ne prouve pas que le travail est la seule cause. Mais il en fait <b>une piste sérieuse</b> : ce qui revient avec le travail mérite d’être regardé de près.", note: "Une fatigue qui revient avec la reprise est une information, pas un échec des vacances." },
      { t: "h", texte: "Ce que dit l’OMS" },
      { t: "p", html: "Depuis 2022, la Classification internationale des maladies de l’OMS (CIM-11) décrit le burn-out comme un <b>phénomène professionnel</b>, et non comme une maladie. Il résulte d’un stress chronique au travail qui n’a pas été géré avec succès. Il se reconnaît à trois signes :" },
      { t: "cartes", items: [
        ["Épuisement", "Une fatigue qui dure, que le repos ne compense plus."],
        ["Distance mentale", "Se détacher de son travail, devenir cynique ou négatif à son sujet."],
        ["Efficacité réduite", "L’impression de moins bien faire, plus d’erreurs, moins de confiance."],
      ] },
      { t: "p", html: "Un point compte beaucoup : la CIM-11 réserve ce mot au <b>contexte du travail</b>. Une fatigue liée à un deuil, à un bébé qui ne dort pas ou à une maladie n’est pas un burn-out, même si elle épuise autant." },
      { t: "mythes", titre: "Trois idées reçues", items: [
        ["« Le burn-out n’existe pas officiellement »", "Il est décrit par l’OMS dans la CIM-11. Il n’y est pas classé comme une maladie, mais comme un phénomène lié au travail, ce qui ne le rend pas moins réel : c’est justement ce qui oriente la prévention vers le travail."],
        ["« C’est une dépression au travail »", "Les deux peuvent coexister, mais ce n’est pas la même chose. Une dépression déborde en général le travail : plus d’envie de rien, même le week-end, même avec ses proches, une culpabilité forte. Elle appelle un avis médical, quel que soit le contexte."],
        ["« Ça arrive aux faibles »", "Le burn-out touche souvent des personnes très engagées dans leur travail. Ce n’est pas une question de solidité : on ne demande pas à un pont « solide » de porter indéfiniment deux fois sa charge."],
      ] },
      { t: "h", texte: "Ne pas tout appeler burn-out" },
      { t: "p", html: "Tout malaise au travail n’est pas un burn-out. Ce n’est pas une question de vocabulaire : <b>le mot change la réponse</b>. Voici six situations qui se ressemblent au début, et qui n’appellent pas la même aide." },
      { t: "table", titre: "Six situations à distinguer", cols: ["Situation", "Ce qui la signale", "Ce qui aide"], rows: [
        ["Fatigue passagère", "Elle passe avec un week-end, un congé court, une semaine plus calme.", "Protéger la récupération, surveiller."],
        ["Stress aigu", "Une réaction forte à un événement précis : une échéance, une crise, un conflit.", "Traiter l’événement, vérifier que la tension ne s’installe pas."],
        ["Burn-out", "Une usure liée au travail qui dure : épuisement, distance, efficacité en baisse.", "Analyser le travail réel, réduire ce qui use, demander un avis de santé."],
        ["Dépression", "Humeur basse, perte d’envie, culpabilité, souvent au-delà du travail.", "Un avis médical ou psychologique, sans attendre."],
        ["Harcèlement ou violence", "Humiliations, menaces, isolement, propos dégradants répétés.", "Protection, traces écrites, interlocuteurs compétents (chapitres 8 et 9)."],
        ["Conflit éthique", "Devoir faire un travail contraire à ses valeurs, à la qualité ou à la sécurité.", "Clarifier les responsabilités, documenter, chercher un appui collectif."],
      ] },
      { t: "principe", html: "Se tromper de mot, c’est se tromper de porte. Une dépression appelle un soin, un harcèlement une protection, une surcharge un arbitrage. Plusieurs situations peuvent aussi coexister : on traite alors chacune." },
      { t: "piege", titre: "Le piège · « tout le monde est fatigué »", depart: "Dans l’équipe de Sam, tout le monde se dit fatigué depuis des semaines.", etapes: [
        ["ce qui est fréquent devient normal", "Donc c’est normal."],
        ["ce qui est normal devient sans risque", "Donc ce n’est pas un problème."],
        ["sans risque devient sans action", "Donc il n’y a rien à faire."],
      ], fin: "Une fatigue partagée par toute une équipe n’est pas la preuve que tout va bien. C’est souvent <b>un signal sur l’organisation du travail</b>." },
    ],
    exo: {
      titre: "Le bon mot",
      intro: "Sam, Léa et Karim travaillent dans le même service. Chacun dit « je n’en peux plus ». Quel mot, et quelle réponse, pour chacun ?",
      situations: [
        { q: "Sam revient de dix jours de congé, reposé. Trois jours après la reprise, il est aussi vidé qu’avant. Que retenir ?", choix: [
          "C’est forcément un burn-out : le travail est la cause.",
          "Le travail devient une piste sérieuse : ce qui revient avec la reprise mérite d’être regardé.",
          "Ses congés étaient trop courts : il lui faut simplement plus de repos.",
        ], bonne: 1, fb: [
          "Pas si vite. La chronologie rend le travail plausible, mais d’autres choses ont pu changer entre-temps : le sommeil, la vie personnelle. On en fait une piste, pas une conclusion.",
          "Oui. Une fatigue qui revient avec le travail est un indice fort. La suite consiste à chercher ce qui, au travail, revient avec elle : les interruptions, les horaires, un dossier précis.",
          "Le repos a fonctionné : Sam était reposé. C’est le retour au travail qui le vide à nouveau. Plus de congés ne changeraient pas ce qui l’attend à la reprise.",
        ] },
        { q: "Léa dort mal depuis l’annonce d’une réorganisation, la semaine dernière. Elle se sent tendue en permanence.", choix: [
          "Un stress aigu lié à un événement précis : à prendre au sérieux, et à surveiller dans la durée.",
          "Un burn-out qui commence : il faut l’arrêter tout de suite.",
          "Rien de particulier : tout le monde est stressé par une réorganisation.",
        ], bonne: 0, fb: [
          "Oui. L’événement est identifié et récent. La question est de savoir si la tension s’apaise ou s’installe. Une réorganisation mal expliquée peut aussi devenir une exigence durable.",
          "Une semaine, c’est trop court pour parler d’usure installée. Ce qui compte : comment ça évolue dans les semaines qui viennent, et ce que la réorganisation change à son travail.",
          "Que ce soit fréquent ne veut pas dire que c’est sans effet. Le stress de Léa est réel, et il mérite qu’on suive ce qu’il devient.",
        ] },
        { q: "Karim n’a plus envie de rien, même le week-end, même avec ses amis. Il se sent coupable de tout.", choix: [
          "C’est un burn-out, puisque c’est au travail que ça a commencé.",
          "Il lui faut des vacances pour se changer les idées.",
          "Une perte d’envie qui déborde le travail appelle un avis médical : cela peut être une dépression.",
        ], bonne: 2, fb: [
          "Le point de départ ne suffit pas. Quand la perte d’envie et la culpabilité envahissent toute la vie, il faut un avis médical, quelle que soit l’origine.",
          "Des vacances ne soignent pas une dépression possible, et le retard peut coûter cher. Ce que décrit Karim appelle d’abord un avis médical.",
          "Oui. Les signes de Karim dépassent le travail. Un médecin ou un psychologue peut faire le point. Cela n’empêche pas, en parallèle, de regarder son travail.",
        ] },
      ],
    },
    sources: [
      ["OMS · le burn-out, un phénomène professionnel (CIM-11)", "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases"],
      ["HAS · repérage et prise en charge clinique du syndrome d’épuisement professionnel", "https://www.has-sante.fr/jcms/c_2769318/fr/reperage-et-prise-en-charge-cliniques-du-syndrome-d-epuisement-professionnel-ou-burnout"],
      ["INRS · épuisement professionnel ou burnout", "https://www.inrs.fr/risques/epuisement-burnout/ce-qu-il-faut-retenir.html"],
    ],
    nechange: "Que ce ne soit « pas encore » un burn-out ne veut pas dire que tout va bien. Une fatigue qui ne passe plus mérite qu’on agisse maintenant, pas quand elle aura un nom.",
    piece: { nom: "La batterie", texte: "Ton rapport commence par l’énergie : ce que tu dépenses, et ce que le repos te rend.", rapport: "la synthèse, le niveau d’action, et les dimensions « Épuisement » et « Récupération »." },
    suite: "Si le burn-out a trois signes, pourquoi ne regarde-t-on souvent que la fatigue ? C’est la question du chapitre suivant.",
  },

  // ───────────────────────────── 2
  {
    temps: 0,
    court: "Les trois signes",
    titre: "Les trois signes : s’épuiser, se détacher, douter de soi",
    duree: 5,
    savoir: [
      "Reconnaître les trois signes décrits par Christina Maslach, et pourquoi la fatigue n’est que le premier.",
      "Comprendre pourquoi le cynisme peut être une protection, et la baisse d’efficacité une conséquence plutôt qu’une incompétence.",
    ],
    arrive: "« Je ne suis pas fatigué, juste dégoûté : ce n’est donc pas de l’usure. » Ou : « Je deviens cynique, c’est mon caractère. » Ce chapitre montre que ces deux phrases décrivent souvent des signes à part entière.",
    retenir: "La psychologue Christina Maslach a décrit le burn-out comme <b>trois signes qui s’enchaînent souvent</b> : on s’épuise, on se protège en prenant de la distance, puis on a l’impression de moins bien faire. Repérer les deux derniers évite de passer à côté d’une usure qui ne se présente pas comme de la fatigue.",
    blocs: [
      { t: "h", texte: "Trois jauges, pas une" },
      { t: "fig", ill: "jauges", cap: "Trois jauges distinctes. Elles montent souvent ensemble, mais pas toujours au même rythme." },
      { t: "p", html: "Quatre semaines après le vendredi du chapitre 1, voici ce que Sam dit de lui, dans ses mots :" },
      { t: "cartes", items: [
        ["« Je suis vidé »", "<b>L’épuisement</b>. Le corps et la tête n’ont plus de réserve. Le matin, la journée paraît déjà longue."],
        ["« À quoi bon ? »", "<b>La distance mentale</b>. Sam se détache des clients, des projets, des collègues. Il répond plus sèchement, ironise, en fait le minimum."],
        ["« Je n’y arrive plus »", "<b>L’efficacité réduite</b>. Il oublie une livraison, se trompe sur un bon de commande, doute de ce qu’il sait faire."],
      ] },
      { t: "h", texte: "Le cynisme, une protection qui se retourne" },
      { t: "exemple", titre: "Le Sam d’avant, le Sam d’aujourd’hui", html: "Il y a un an, quand un client changeait d’avis, Sam reprenait le planning avec soin et l’appelait pour expliquer. Aujourd’hui, il soupire : « de toute façon, ils changeront encore d’avis ». Il n’a pas changé de caractère. Il a cessé d’investir ce qui lui coûte trop.", note: "La distance protège l’énergie à court terme. À long terme, elle coupe du sens du travail et des collègues qui pourraient aider." },
      { t: "p", html: "Le cynisme est souvent pris pour un trait de personnalité, ou pour de la mauvaise volonté. Dans le modèle de Maslach, c’est d’abord une <b>stratégie de protection</b> : quand on ne peut plus tout donner, on donne moins. C’est compréhensible. Mais c’est aussi un signe qu’il faut regarder, même si la fatigue n’est pas au premier plan." },
      { t: "h", texte: "Moins efficace ne veut pas dire incompétent" },
      { t: "p", html: "Quand l’efficacité baisse, la réponse réflexe est souvent individuelle : « il faut te former », « tu dois mieux t’organiser ». Or l’usure abîme d’abord l’attention, la mémoire et le sommeil. Les erreurs de Sam ne disent pas qu’il a oublié son métier : elles disent qu’<b>il travaille avec des réserves vides</b>." },
      { t: "mythes", titre: "Trois idées reçues", items: [
        ["« Le MBI diagnostique le burn-out »", "Le Maslach Burnout Inventory est un questionnaire de recherche. Il compare des groupes. Il n’a pas de seuil validé pour dire qu’une personne « est » en burn-out. Bull-Out s’inspire de ses trois dimensions sans le copier, et sans prétendre diagnostiquer."],
        ["« Burn-out égale fatigue extrême »", "On peut être très fatigué sans burn-out (après une naissance, par exemple), et en burn-out avec une distance mentale au premier plan. C’est la combinaison des signes, et leur lien avec le travail, qui compte."],
        ["« Si j’aime mon travail, je suis protégé »", "C’est souvent l’inverse. Les personnes les plus engagées donnent plus, compensent plus, et s’épuisent parfois plus vite. L’engagement n’est pas un défaut : c’est une raison de plus de surveiller la charge."],
      ] },
      { t: "principe", html: "Un signe n’est pas une étiquette. Trois jauges hautes déclenchent une analyse du travail, pas un verdict sur la personne." },
      { t: "piege", titre: "Le piège · de l’erreur au défaut", depart: "Sam fait plus d’erreurs qu’avant.", etapes: [
        ["un effet devient un trait", "Donc Sam est moins compétent."],
        ["un trait appelle une solution individuelle", "Donc il doit suivre une formation."],
        ["la cause est oubliée", "Et sa charge reste exactement la même."],
      ], fin: "Chaque saut éloigne un peu plus du travail réel. Le bon réflexe : <b>se demander ce que l’erreur dit des conditions dans lesquelles elle a été faite</b>." },
    ],
    exo: {
      titre: "Quel signe chez Sam ?",
      intro: "Trois phrases de Sam, entendues la même semaine. Laquelle des lectures est la plus juste ?",
      situations: [
        { q: "« De toute façon, ça ne sert à rien de bien faire, ils changeront d’avis. »", choix: [
          "De la distance mentale : Sam se protège en se détachant.",
          "De la lucidité : il a simplement compris comment fonctionne l’entreprise.",
          "De la paresse : il cherche une excuse pour en faire moins.",
        ], bonne: 0, fb: [
          "Oui. Ce détachement est l’un des trois signes. Il peut contenir une part de lucidité sur l’organisation, et c’est justement pour ça qu’il faut regarder ce qui le provoque.",
          "Il y a peut-être du vrai dans ce qu’il dit sur l’organisation. Mais le « ça ne sert à rien » est un signe en lui-même : Sam a cessé d’investir son travail.",
          "La paresse ne change pas soudainement après des années d’engagement. Un détachement nouveau chez quelqu’un d’investi est un signe d’usure, pas un défaut moral.",
        ] },
        { q: "Sam relit trois fois le même mail sans le comprendre, puis oublie une livraison.", choix: [
          "Un manque de compétence, à corriger par une formation.",
          "Une efficacité réduite, qui peut être une conséquence de l’usure.",
          "Un simple manque de concentration, sans importance.",
        ], bonne: 1, fb: [
          "Sam fait ce métier depuis des années. Des erreurs nouvelles disent plus souvent quelque chose des conditions de travail que des compétences.",
          "Oui. Attention, mémoire et sommeil sont les premiers touchés par l’usure. Ce signe se regarde avec les deux autres.",
          "Ce n’est pas sans importance : une erreur de livraison a des conséquences, et elle s’ajoute aux signaux d’usure de Sam.",
        ] },
        { q: "Sam dit : « Je ne suis pas fatigué, je suis juste dégoûté. »", choix: [
          "Alors ce n’est pas de l’usure : il faut de la fatigue pour parler de burn-out.",
          "Il faut attendre que la fatigue arrive avant de s’inquiéter.",
          "La distance mentale compte même sans fatigue : c’est un signe à part entière.",
        ], bonne: 2, fb: [
          "Les trois signes peuvent évoluer séparément. Un détachement fort, même sans fatigue, mérite qu’on s’y arrête.",
          "Attendre, c’est laisser l’usure s’installer. Le dégoût de Sam est déjà une information utile.",
          "Oui. Chez certaines personnes, la distance arrive en premier. Il faut la regarder pour elle-même.",
        ] },
      ],
    },
    sources: [
      ["Maslach & Leiter (2016) · Understanding the burnout experience, World Psychiatry", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4911781/"],
      ["Schaufeli, Leiter & Maslach (2009) · Burnout: 35 years of research and practice", "https://www.wilmarschaufeli.nl/publications/Schaufeli/311.pdf"],
      ["INRS · les manifestations de l’épuisement professionnel", "https://www.inrs.fr/risques/epuisement-burnout/ce-qu-il-faut-retenir.html"],
    ],
    nechange: "Repérer un signe ne t’oblige à rien. Mais un cynisme qui s’installe ou des erreurs inhabituelles sont des informations, pas des défauts à cacher.",
    piece: { nom: "Les trois jauges", texte: "Ton rapport regarde séparément l’épuisement, la distance et l’efficacité, pour ne pas réduire l’usure à la fatigue.", rapport: "les dimensions « Épuisement », « Distance mentale » et « Efficacité et sens », et la lecture Maslach." },
    suite: "Ces trois signes décrivent ce que tu vis. Ils ne disent pas ce qui, dans le travail, les produit. C’est le rôle du chapitre suivant.",
  },

  // ───────────────────────────── 3
  {
    temps: 1,
    court: "La balance",
    titre: "La balance : ce que le travail demande, ce qui aide à le faire",
    duree: 6,
    savoir: [
      "Classer ce qui se passe au travail en exigences et en ressources.",
      "Expliquer pourquoi la même charge peut être tenable pour l’un et usante pour l’autre.",
    ],
    arrive: "« C’est la charge : il y a trop de travail. » Parfois, oui. Mais la quantité n’explique pas tout. Deux postes aussi chargés peuvent user très différemment, selon ce qui aide à tenir.",
    retenir: "Le modèle exigences–ressources (JD-R) regarde le travail comme <b>une balance à deux plateaux</b>. D’un côté, ce qu’il demande. De l’autre, ce qui aide à le faire. L’usure s’installe quand les exigences pèsent durablement plus lourd, et que la récupération ne compense plus.",
    blocs: [
      { t: "h", texte: "Deux plateaux" },
      { t: "fig", ill: "balance", cap: "Les exigences d’un côté, les ressources de l’autre, la récupération au milieu. La balance penche quand on ajoute d’un côté, ou quand on retire de l’autre." },
      { t: "p", html: "Les <b>exigences</b>, c’est tout ce qui demande un effort durable : la quantité de travail, les délais, les interruptions, le flou sur ce qu’on attend, la charge émotionnelle, les ordres contradictoires. Les <b>ressources</b>, c’est tout ce qui aide à faire face : l’autonomie, le soutien d’un collègue ou d’un manager, des priorités claires, des moyens suffisants, du temps pour se concentrer." },
      { t: "exemple", titre: "La semaine de Sam, plateau par plateau", html: "Lundi : 42 mails, 3 urgences « pour hier ». Mercredi : une réunion à 18 h 30, et le dossier de Marc, le collègue parti, qui atterrit sur son bureau. Côté exigences, ça s’empile. Mais regarde l’autre plateau : la pause déjeuner saute, Marc n’est plus là pour l’aider, les soirées passent à rattraper. <b>La semaine de Sam n’a pas seulement ajouté du poids d’un côté. Elle en a retiré de l’autre.</b>", note: "Perdre une ressource pèse souvent autant qu’ajouter une tâche, et se voit beaucoup moins." },
      { t: "h", texte: "La même charge, deux équipes" },
      { t: "p", html: "Imagine deux équipes qui traitent exactement le même volume. Dans la première, la manager fixe trois priorités chaque lundi, protège une matinée sans réunion et décide ce qui peut attendre. Dans la seconde, les priorités changent chaque jour et tout est urgent. Même quantité, deux balances différentes. C’est pour ça que <b>le bon indicateur n’est pas la quantité de travail</b>, mais l’équilibre entre exigences, ressources et récupération." },
      { t: "cartes", items: [
        ["Exigences évitables", "Ressaisies, outils qui plantent, réunions sans décision, urgences qui n’en sont pas. Les retirer ne coûte presque rien."],
        ["Exigences du métier", "Un pic saisonnier, un client difficile. On ne les supprime pas, mais on peut les limiter dans le temps et les compenser."],
        ["Ressources réelles", "Un relais, du temps protégé, une décision claire. Elles changent la journée, pas seulement l’ambiance."],
      ] },
      { t: "h", texte: "La récupération, le troisième élément" },
      { t: "p", html: "La balance a un pivot : la récupération. Le soir, le week-end, la pause déjeuner. Quand les mails arrivent à 22 h ou que le travail déborde sur le dimanche, la récupération s’use aussi. La fatigue ne se « recharge » plus, et la balance penche un peu plus chaque semaine." },
      { t: "mythes", titre: "Trois idées reçues", items: [
        ["« Il suffit de mieux s’organiser »", "L’organisation personnelle aide à la marge. Mais aucune méthode de productivité ne fait tenir trois urgences dans une seule journée, ni ne remplace un collègue parti. Cette phrase transforme un problème de balance en problème de personne."],
        ["« Une charge élevée, c’est toujours toxique »", "Non. Avec des ressources solides, une charge élevée peut même être stimulante : c’est l’autre moitié du modèle JD-R, qui décrit l’engagement. Le danger, c’est la charge élevée sans ressources, et qui dure."],
        ["« Une salle de sieste compense »", "Une ressource cosmétique (une appli, un baby-foot, un atelier) ne pèse rien si les exigences restent les mêmes. Elle peut même agacer, quand elle remplace une vraie décision."],
      ] },
      { t: "principe", html: "Prévenir, c’est d’abord retirer ce qui est évitable et rendre ce qui manque, avant de demander aux gens d’être plus résistants." },
      { t: "piege", titre: "Le piège · le temporaire qui dure", depart: "L’équipe de Sam perd un collègue, qui n’est pas remplacé.", etapes: [
        ["le manque devient une consigne", "« On fait avec, c’est temporaire. »"],
        ["le temporaire devient la règle", "Six mois plus tard, c’est le fonctionnement normal."],
        ["l’usure devient individuelle", "« Sam ne tient plus le rythme. »"],
      ], fin: "Une exception qui dure devient une organisation. La question utile : <b>combien de temps, et quels critères pour en sortir ?</b>" },
    ],
    exo: {
      titre: "Exigence ou ressource ?",
      intro: "Trois éléments du quotidien de Sam. Sur quel plateau de la balance les poser ?",
      situations: [
        { q: "Nadia, la manager de Sam, fixe chaque lundi les trois priorités de la semaine et dit ce qui peut attendre.", choix: [
          "Une exigence de plus : encore une réunion.",
          "Une ressource : des priorités claires allègent la charge.",
          "Ni l’un ni l’autre : c’est son travail de manager.",
        ], bonne: 1, fb: [
          "Une réunion courte qui produit des décisions fait gagner du temps toute la semaine. C’est l’inverse d’une exigence.",
          "Oui. La clarté est l’une des ressources les plus efficaces : elle évite à chacun de trancher seul entre des urgences contradictoires.",
          "C’est son travail, et c’est précisément une ressource pour l’équipe. Quand ce travail-là n’est pas fait, la balance penche.",
        ] },
        { q: "Le logiciel de commandes plante deux fois par jour, et il faut tout ressaisir.", choix: [
          "Une exigence évitable : la retirer ne coûte presque rien.",
          "Une contrainte du métier, à accepter.",
          "Un détail, sans effet sur l’usure.",
        ], bonne: 0, fb: [
          "Oui. Ce sont les exigences les plus faciles à retirer, et les plus usantes, parce qu’elles n’apportent rien.",
          "Rien dans le métier de Sam n’exige de ressaisir des commandes. C’est un dysfonctionnement, et il se corrige.",
          "Deux ressaisies par jour, c’est une heure par semaine, et une irritation quotidienne. Les petites exigences évitables s’additionnent.",
        ] },
        { q: "L’entreprise offre une application de méditation, mais les urgences continuent.", choix: [
          "Une solution qui rééquilibre la balance.",
          "Une exigence de plus.",
          "Un petit plus, qui laisse le plateau des exigences intact.",
        ], bonne: 2, fb: [
          "La méditation peut aider certaines personnes. Mais elle ne retire aucune urgence : la balance penche toujours du même côté.",
          "Elle n’alourdit pas la charge. Le problème est ailleurs : elle ne change rien au plateau qui pèse.",
          "Oui. Une ressource individuelle ne compense pas des exigences intactes. Elle est utile en plus, jamais à la place.",
        ] },
      ],
    },
    sources: [
      ["Demerouti, Bakker et al. (2001) · The job demands-resources model of burnout", "https://doi.org/10.1037/0021-9010.86.3.499"],
      ["Bakker & Demerouti (2017) · Job demands-resources theory: taking stock and looking forward", "https://doi.org/10.1037/ocp0000056"],
      ["INRS · les facteurs de risques psychosociaux", "https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html"],
    ],
    nechange: "Dire que le travail pèse n’accuse personne. C’est décrire une situation qu’on peut modifier, et c’est plutôt une bonne nouvelle.",
    piece: { nom: "La balance", texte: "Ton rapport pose tes réponses sur les deux plateaux, pour voir lequel pèse le plus.", rapport: "les dimensions « Exigences » et « Ressources », et la lecture JD-R." },
    suite: "Il reste une question que la balance ne pose pas : qu’est-ce que tu reçois en retour de tout cet effort ?",
  },

  // ───────────────────────────── 4
  {
    temps: 1,
    court: "Trop pour trop peu",
    titre: "Donner trop pour trop peu : l’effort et le retour",
    duree: 5,
    savoir: [
      "Repérer un déséquilibre entre l’effort fourni et ce qu’on reçoit en retour : salaire, estime, perspectives, sécurité.",
      "Reconnaître le surengagement, et comprendre pourquoi il rend le problème invisible.",
    ],
    arrive: "« La reconnaissance, c’est du bonus. L’important, c’est la paie. » Ou : « Je ne me plains pas, j’aime bien rendre service. » Ce chapitre montre ce que ces phrases laissent de côté.",
    retenir: "Le sociologue Johannes Siegrist a montré que l’usure vient aussi d’une <b>réciprocité rompue</b> : beaucoup d’efforts, peu de retour. Et le retour n’est pas que l’argent : c’est aussi l’estime, les perspectives, la sécurité de l’emploi. Quand on compense sans compter, l’organisation s’habitue à l’anormal.",
    blocs: [
      { t: "h", texte: "Une bascule entre effort et retour" },
      { t: "fig", ill: "bascule", cap: "D’un côté ce que tu donnes, de l’autre ce que tu reçois. Le surengagement appuie encore sur le côté de l’effort." },
      { t: "p", html: "Le modèle effort–récompense (ERI) pose une question simple : <b>est-ce que l’échange est juste ?</b> On accepte souvent de donner beaucoup, pendant un temps, si on sait que ça sera vu, reconnu, ou que ça ouvre quelque chose. L’usure arrive quand l’effort reste haut et que le retour ne vient pas." },
      { t: "cartes", items: [
        ["Le salaire", "La paie, les primes, les heures payées ou récupérées."],
        ["L’estime", "Que le travail soit vu, nommé, respecté, y compris en réunion."],
        ["Les perspectives", "Une évolution possible, des compétences qui comptent."],
        ["La sécurité", "Savoir que son poste, ses horaires, son équipe ne vont pas changer sans prévenir."],
      ] },
      { t: "exemple", titre: "L’entretien annuel de Sam", html: "Depuis trois mois, Sam porte le dossier de Marc en plus du sien. Il reste le soir, appelle les fournisseurs pendant ses congés. À l’entretien annuel : « objectifs atteints, rien à signaler ». Augmentation identique à toute l’équipe. Le poste de responsable qu’on lui avait laissé espérer est confié à quelqu’un de l’extérieur.", note: "Aucune de ces décisions n’est forcément injuste prise seule. Ensemble, elles disent à Sam que son effort n’a pas compté." },
      { t: "h", texte: "Le surengagement, ou le héros qui compense" },
      { t: "p", html: "Siegrist décrit un deuxième élément : le <b>surengagement</b>. Ce n’est pas un défaut, c’est une façon de travailler : du mal à dire non, le besoin de prouver sa valeur, répondre aux mails le soir « pour être tranquille demain », la peur d’être jugé si on ralentit." },
      { t: "p", html: "Le surengagement protège l’équipe à court terme : grâce à Sam, les livraisons partent. Mais il <b>rend le dysfonctionnement invisible</b>. Personne ne voit plus qu’il manque une personne, puisque le travail est fait. Le jour où Sam ralentit, on ne voit plus le manque : on voit Sam qui « lâche »." },
      { t: "mythes", titre: "Deux idées reçues", items: [
        ["« La reconnaissance, c’est dire merci »", "Un merci compte. Mais un merci chaque semaine sans aucun changement de charge, d’horaires ou de perspectives finit par sonner creux. La reconnaissance qui rééquilibre se voit dans les décisions."],
        ["« Ceux qui en font plus sont les plus solides »", "Ce sont souvent les plus exposés. Ils absorbent ce que l’organisation ne règle pas, jusqu’au jour où ils ne peuvent plus."],
      ] },
      { t: "principe", html: "Quand quelqu’un compense en silence, le problème disparaît des radars. Rendre l’effort visible fait partie de la prévention." },
      { t: "piege", titre: "Le piège · l’effort qui devient normal", depart: "Sam fait des heures en plus pour boucler le dossier de Marc.", etapes: [
        ["l’exception devient attendue", "Le dossier de Marc fait désormais partie de son poste."],
        ["l’effort devient invisible", "Plus personne ne voit le travail en plus."],
        ["le retrait devient une faute", "Quand Sam ralentit, on lui reproche de lâcher."],
      ], fin: "Ce qui était un effort exceptionnel est devenu la norme, sans que personne ne l’ait décidé. <b>Dire à voix haute ce qu’on compense</b> est la première façon d’en sortir." },
    ],
    exo: {
      titre: "Ce qui manque à Sam",
      intro: "Trois moments de la vie de Sam au travail. Qu’est-ce qui se passe du côté de la bascule ?",
      situations: [
        { q: "Sam est correctement payé, mais son travail en plus n’est jamais mentionné en réunion d’équipe.", choix: [
          "Il n’y a pas de problème : le salaire est correct.",
          "Il manque un retour d’estime : l’effort n’est pas vu.",
          "Sam devrait demander une augmentation.",
        ], bonne: 1, fb: [
          "Le salaire n’est qu’une partie du retour. Un effort invisible pèse, même bien payé.",
          "Oui. L’estime est une partie du retour à part entière. Qu’elle manque ne relève pas de la susceptibilité.",
          "Peut-être, mais ce n’est pas ce qui manque ici. Le problème, c’est que personne ne nomme le travail qu’il fait.",
        ] },
        { q: "Sam répond à ses mails à 23 h « pour être tranquille demain ».", choix: [
          "Un signe de surengagement, qui empêche la récupération.",
          "Une bonne organisation personnelle.",
          "La preuve qu’il aime son travail, donc qu’il n’y a pas de risque.",
        ], bonne: 0, fb: [
          "Oui. C’est l’un des signes décrits par Siegrist : la difficulté à couper. Et cela entame la récupération du chapitre 3.",
          "Ce qui ressemble à de l’organisation est souvent une façon de compenser une charge trop grande pour la journée.",
          "Aimer son travail ne protège pas. Les personnes très engagées sont souvent les plus exposées.",
        ] },
        { q: "Nadia remercie chaleureusement Sam chaque vendredi. Mais rien ne change dans sa charge.", choix: [
          "C’est suffisant : la reconnaissance est là.",
          "C’est inutile : mieux vaut ne rien dire.",
          "Un merci sans changement ne rééquilibre pas : il faut aussi agir sur l’effort ou les perspectives.",
        ], bonne: 2, fb: [
          "Le merci est sincère, mais la bascule ne bouge pas. À la longue, il risque même de nourrir le cynisme du chapitre 2.",
          "Le merci a de la valeur. Il ne suffit pas seul, c’est tout.",
          "Oui. La reconnaissance qui compte se voit dans les décisions : retirer une tâche, payer les heures, ouvrir une perspective.",
        ] },
      ],
    },
    sources: [
      ["Siegrist (1996) · Adverse health effects of high-effort/low-reward conditions", "https://doi.org/10.1037/1076-8998.1.1.27"],
      ["Siegrist & Li (2016) · Associations of extrinsic and intrinsic components of work stress with health", "https://doi.org/10.3390/ijerph13040432"],
      ["INRS · manque de reconnaissance et risques psychosociaux", "https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html"],
    ],
    nechange: "Aimer son travail ne protège pas de l’usure. Ce n’est pas un défaut d’en faire beaucoup : c’est une information sur ce que le poste demande vraiment.",
    piece: { nom: "Le retour", texte: "Ton rapport regarde aussi ce que tu reçois en échange de ton effort, et ton rapport au travail en dehors des heures.", rapport: "la lecture ERI (effort, reconnaissance, surengagement)." },
    suite: "Et si, en plus, Sam traverse quelque chose de lourd dans sa vie personnelle ? Est-ce que ça change tout ? C’est le piège du chapitre suivant.",
  },

  // ───────────────────────────── 5
  {
    temps: 1,
    court: "Le piège du « c’est perso »",
    titre: "Le piège du « c’est perso »",
    duree: 6,
    savoir: [
      "Faire la différence entre un facteur qui rend plus vulnérable et une cause qui dispenserait d’agir.",
      "Remplacer les phrases réflexes (« il est fragile », « personne d’autre ne se plaint ») par des questions sur le travail.",
    ],
    arrive: "« C’est surtout perso : il se sépare. » Ou, pour soi : « C’est moi qui suis trop sensible. » Ces phrases soulagent tout le monde. Elles ferment aussi la discussion sur le travail.",
    retenir: "Un facteur personnel peut exister, et compter. Il <b>change la vulnérabilité</b>, il ne dit rien de la charge, des moyens ou des arbitrages. La question utile n’est pas « est-ce que c’est perso ? », mais « <b>qu’est-ce qui, dans le travail, était connu, prévisible ou modifiable ?</b> »",
    blocs: [
      { t: "h", texte: "Deux choses vraies en même temps" },
      { t: "fig", ill: "verre", cap: "La vie personnelle remplit une partie du verre. Au travail, on n’a la main que sur le robinet du travail, et c’est souvent le plus facile à fermer." },
      { t: "exemple", titre: "Le printemps de Sam", html: "En mars, Sam se sépare. Nadia le sait, sans les détails. Au même moment, Sam porte un dossier critique : délais courts, réunions tardives, priorités qui changent chaque semaine. Il dit plusieurs fois qu’il dort mal et ne récupère plus. Nadia répond : « je comprends, mais le projet ne peut pas attendre ». Rien n’est retiré, aucun relais n’est organisé. En juin, Sam est arrêté.", note: "La séparation explique une vulnérabilité. Elle n’efface pas une charge connue, maintenue malgré des signaux clairs." },
      { t: "cartes", items: [
        ["Ce qui est personnel", "La séparation, la fatigue émotionnelle, le contexte familial."],
        ["Ce qui relève du travail", "La charge critique, les réunions tardives, les priorités changeantes, l’absence de relais, des signaux connus."],
        ["Ce qui était possible", "Réduire la charge un temps, clarifier les priorités, organiser un relais, éviter les réunions tardives, proposer le médecin du travail, revoir la situation à deux semaines."],
      ] },
      { t: "p", html: "Rien dans la dernière colonne ne demandait à Nadia de connaître la vie privée de Sam. <b>Personnel ne veut pas dire hors travail</b>, et ne veut pas dire hors prévention." },
      { t: "h", texte: "Mauvaise lecture, bonne question" },
      { t: "p", html: "Ces phrases sont souvent dites de bonne foi, par un manager, un collègue, ou par soi-même. Chacune ferme une porte. Chacune peut être remplacée par une question qui la rouvre." },
      { t: "paires", titre: "Les phrases réflexes, et les questions qui les remplacent", gauche: "Réflexe", droite: "Question plus juste", items: [
        ["« Il avait des problèmes personnels. »", "Quels facteurs de travail ont pu contribuer, ou aggraver la situation ?"],
        ["« Elle est fragile. »", "Le poste était-il tenable pour une personne normalement attentive, avec les moyens disponibles ?"],
        ["« Il ne sait pas s’organiser. »", "Les priorités étaient-elles claires ? A-t-on retiré des tâches, ou seulement ajouté ?"],
        ["« Personne d’autre ne s’est plaint. »", "Y avait-il des signaux faibles : heures tardives, erreurs, irritabilité, départs, arrêts ?"],
        ["« Il n’y avait pas de harcèlement. »", "Un risque existe aussi sans harcèlement : surcharge, flou, ordres contradictoires, absence d’arbitrage."],
        ["« On lui avait proposé de l’aide. »", "Qu’est-ce qui a été concrètement retiré, reporté, simplifié ou renforcé ?"],
        ["« C’était une période exceptionnelle. »", "Combien de temps a-t-elle duré ? Quels critères étaient prévus pour en sortir ?"],
      ] },
      { t: "h", texte: "Quand c’est toi qui le penses" },
      { t: "p", html: "Le piège ne vient pas que des autres. « Je suis trop perfectionniste », « je n’ai pas les épaules », « les autres y arrivent bien » : on se l’applique souvent à soi-même. Essaie la même méthode. Le niveau de qualité attendu a-t-il été dit clairement ? Les autres ont-ils la même charge, les mêmes interruptions, le même dossier en plus ? Ton exigence envers toi-même est peut-être réelle. <b>Elle n’explique pas à elle seule une balance qui penche.</b>" },
      { t: "principe", html: "Une vulnérabilité n’efface jamais l’obligation de traiter une exposition connue. Et ta vie personnelle t’appartient : tu n’as pas à la raconter pour qu’on regarde ta charge." },
      { t: "piege", titre: "Le piège · la cause qui arrange", depart: "Sam se sépare, et il dort mal.", etapes: [
        ["une cause possible devient la seule", "Donc sa fatigue vient de sa séparation."],
        ["la seule cause devient une excuse", "Donc le travail n’y est pour rien."],
        ["aucune cause au travail, aucune action", "Donc on maintient la charge."],
      ], fin: "La cause qui arrange tout le monde est rarement la seule. <b>Avant de conclure « c’est perso », vérifier ce qui, dans le travail, était connu et modifiable.</b>" },
    ],
    exo: {
      titre: "Perso, ou travail ?",
      intro: "Nadia, la manager de Sam, cherche à comprendre ce qui se passe. Et Sam aussi. Quelle est la lecture la plus juste ?",
      situations: [
        { q: "Nadia pense : « Personne d’autre ne s’est plaint, donc le problème vient de Sam. »", choix: [
          "C’est logique : si les autres tiennent, la charge est tenable.",
          "Il faut demander à Sam des détails sur sa santé pour trancher.",
          "L’absence de plainte n’est pas une preuve : il faut regarder les signaux faibles dans l’équipe.",
        ], bonne: 2, fb: [
          "Les autres ont peut-être une charge différente, ou se taisent aussi. L’absence de plainte ne dit pas que tout va bien.",
          "Nadia n’a pas à connaître la santé de Sam. Elle peut, en revanche, regarder le travail : heures, erreurs, départs, arrêts.",
          "Oui. Heures tardives, erreurs, tensions, arrêts : ces signaux disent plus que le silence. Et beaucoup de gens épuisés ne se plaignent pas.",
        ] },
        { q: "Sam se dit : « Je suis trop perfectionniste, c’est mon problème. »", choix: [
          "Peut-être, mais d’abord : le niveau de qualité attendu a-t-il été dit clairement ?",
          "C’est vrai : il doit apprendre à lâcher prise.",
          "Le perfectionnisme mène toujours au burn-out.",
        ], bonne: 0, fb: [
          "Oui. Sans niveau de qualité défini, chacun vise le maximum par défaut. Clarifier ce qui est « suffisant » est une ressource.",
          "Lâcher prise sur quoi ? Si personne n’a dit ce qui peut être fait plus simplement, c’est le travail qu’il faut clarifier, pas seulement Sam.",
          "Non. C’est un facteur parmi d’autres, qui joue surtout quand la charge et le flou sont là.",
        ] },
        { q: "Que peut faire Nadia, sans entrer dans la vie privée de Sam ?", choix: [
          "Lui demander ce qui se passe chez lui, pour mieux comprendre.",
          "Réduire un temps sa charge, clarifier les priorités, organiser un relais et proposer le médecin du travail.",
          "Attendre que sa situation personnelle s’arrange.",
        ], bonne: 1, fb: [
          "Ce n’est pas son rôle, et ça n’aiderait pas à décider. Tout ce qui est utile se joue sur le travail.",
          "Oui. Aucune de ces actions ne demande de détail personnel. Elles agissent sur ce que Nadia peut vraiment changer.",
          "Attendre, c’est laisser la charge s’ajouter à une période difficile. C’est précisément le scénario qui a mal fini.",
        ] },
      ],
    },
    sources: [
      ["Code du travail, article L4121-1 · obligation de sécurité de l’employeur (santé physique et mentale)", "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035640828"],
      ["INRS · prévention des risques psychosociaux", "https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html"],
      ["Ameli · risques psychosociaux et obligation de prévention", "https://www.ameli.fr/entreprise/sante-travail/risques/risques-psychosociaux-rps"],
    ],
    nechange: "Ta vie personnelle t’appartient. Tu n’as pas à la raconter pour qu’on regarde ta charge de travail.",
    piece: { nom: "Le contexte", texte: "Ton rapport note ce qui se passe autour (situation personnelle lourde, collègues touchés, peur de parler) : cela change la lecture, sans changer le score.", rapport: "les éléments de contexte, et les interlocuteurs qu’ils font proposer." },
    suite: "Et si un test sanguin pouvait trancher ? Le chapitre suivant regarde ce que valent les mesures, cortisol compris.",
  },

  // ───────────────────────────── 6
  {
    temps: 1,
    court: "Ce que valent les mesures",
    titre: "Cortisol, questionnaires, scores : ce que valent les mesures",
    duree: 5,
    savoir: [
      "Expliquer pourquoi aucun dosage (cortisol, dopamine…) ne diagnostique un burn-out.",
      "Lire un score comme un point de départ : deux personnes peuvent avoir le même total pour des raisons opposées.",
    ],
    arrive: "« Un test salivaire de cortisol va enfin prouver mon burn-out. » Ou : « J’ai 72 sur 144, donc je suis à 50 %. » Ces deux idées promettent une certitude que les mesures ne donnent pas.",
    retenir: "Le stress chronique a bien des effets dans le corps. Mais <b>aucun marqueur ne permet de diagnostiquer un burn-out chez une personne</b>, et la « fatigue surrénalienne » n’est pas un diagnostic reconnu. De même, un score de questionnaire n’est pas une mesure de maladie : il montre <b>où regarder</b>.",
    blocs: [
      { t: "h", texte: "Pourquoi le cortisol ne tranche pas" },
      { t: "p", html: "Le cortisol est une hormone du stress. Son niveau varie énormément <b>au cours d’une même journée</b> (il culmine au réveil), selon le sommeil, les médicaments, le moment du prélèvement et la méthode du laboratoire. Les études sur le burn-out ont trouvé des cortisols plus hauts, plus bas, ou identiques : aucune valeur ne sépare les personnes épuisées des autres." },
      { t: "fig", ill: "nuages", cap: "Chaque point est une personne fictive. Même si les moyennes diffèrent un peu, les deux groupes se recouvrent largement : une valeur seule ne dit pas dans quel groupe tu es." },
      { t: "exemple", titre: "Le kit à 89 euros", html: "Un ami de Sam lui conseille un test salivaire en ligne, « pour mesurer ses surrénales ». Le résultat arrive avec une recommandation : une cure de compléments pour « rééquilibrer » ses hormones, 45 euros par mois. Rien dans ce parcours ne regarde ses délais, ses réunions tardives ou le dossier de Marc.", note: "Un test qui ne change aucune décision sur le travail n’aide pas à prévenir." },
      { t: "mythes", titre: "Quatre phrases à reformuler", items: [
        ["« C’est ton cortisol »", "Le cortisol est un marqueur de stress possible, pas un diagnostic. Il varie selon l’heure, le sommeil, les médicaments et la méthode de mesure."],
        ["« Tes surrénales sont épuisées »", "La « fatigue surrénalienne » n’est pas un diagnostic reconnu par les sociétés savantes d’endocrinologie. Mieux vaut chercher les causes réelles : sommeil, charge, santé, dépression."],
        ["« Tu manques de dopamine »", "La motivation met en jeu de nombreux circuits. Réduire l’usure à une molécule ne dit rien de ce qu’il faut changer, ni au travail, ni ailleurs."],
        ["« Un test salivaire va confirmer ton burn-out »", "Aucun seuil biologique n’est validé pour cela. L’évaluation repose sur un entretien, les signes et le contexte de travail."],
      ] },
      { t: "h", texte: "Deux profils, un même score" },
      { t: "p", html: "Le questionnaire Bull-Out donne un total sur 144. C’est tentant de ne regarder que lui. Mais regarde Sam et Léa : <b>même total, deux situations opposées</b>." },
      { t: "fig", ill: "profils", cap: "Sam et Léa ont tous les deux 72 sur 144. Chez Sam, ce sont l’épuisement et les exigences qui pèsent. Chez Léa, la distance mentale et le manque de ressources." },
      { t: "p", html: "Pour Sam, la première action porte sur la charge et la récupération. Pour Léa, sur le sens, le soutien et la clarté. Un même chiffre aurait conduit à la même réponse, et elle aurait été fausse pour l’un des deux. C’est pour ça que le rapport se lit <b>dimension par dimension</b>." },
      { t: "h", texte: "Ce que le score ne dit pas" },
      { t: "cartes", items: [
        ["Une probabilité", "72 sur 144 ne veut pas dire « 50 % de risque ». Le score place des réponses sur une échelle, rien de plus."],
        ["L’avenir", "Il décrit les quatre dernières semaines. Après des vacances ou un pic exceptionnel, il faut le refaire plus tard."],
        ["Que tout va bien", "Un score bas peut cacher une situation compensée, minimisée, ou une autre cause. Ton jugement compte."],
      ] },
      { t: "principe", html: "Une mesure n’a de valeur que si elle aide à décider. Un dosage de cortisol ne change pas ce qu’il faut faire au travail. Une lecture par dimension, si." },
      { t: "piege", titre: "Le piège · du laboratoire à « mes surrénales »", depart: "Une étude trouve, en moyenne, un cortisol différent chez des personnes épuisées.", etapes: [
        ["une moyenne devient une cause", "Donc le burn-out est un problème de cortisol."],
        ["ce qui vaut pour un groupe devient vrai pour moi", "Donc mon test dira si j’en fais un."],
        ["la biologie devient la solution", "Donc des compléments vont me réparer."],
      ], fin: "Chaque saut ajoute une affirmation que l’étape précédente ne démontre pas. Et le dernier saut éloigne complètement du travail." },
    ],
    exo: {
      titre: "Que dit la mesure ?",
      intro: "Sam et Léa cherchent un chiffre qui tranche. Que peut-on vraiment en conclure ?",
      situations: [
        { q: "Le test salivaire de Sam revient « normal ».", choix: [
          "Il n’est donc pas en burn-out.",
          "Ce résultat ne dit rien de sa situation : on revient aux signes et au travail.",
          "Il faut refaire le test dans un vrai laboratoire.",
        ], bonne: 1, fb: [
          "Un cortisol normal n’exclut rien. Beaucoup de personnes épuisées ont des valeurs normales.",
          "Oui. Ni normal ni anormal, ce chiffre ne change ce qu’il faut faire. Ce qui compte : ses trois jauges, sa balance, son retour.",
          "Même au laboratoire, aucun seuil ne permet de diagnostiquer un burn-out. Le problème n’est pas la qualité du test, c’est la question qu’on lui pose.",
        ] },
        { q: "Sam et Léa ont tous les deux 72 sur 144.", choix: [
          "Ils ont le même problème, et les mêmes actions à prévoir.",
          "Ils ont chacun 50 % de risque de burn-out.",
          "Il faut regarder les dimensions : le même total peut cacher deux profils opposés.",
        ], bonne: 2, fb: [
          "Le total cache la répartition. Chez Sam, la charge ; chez Léa, le sens et le soutien. Les actions ne sont pas les mêmes.",
          "Le score n’est pas une probabilité. Il place des réponses sur une échelle.",
          "Oui. C’est la lecture par dimension qui oriente l’action.",
        ] },
        { q: "Sam refait le questionnaire au retour de deux semaines de vacances. Son score est bas.", choix: [
          "Le score couvre quatre semaines, vacances comprises : il faudra le refaire quelques semaines après la reprise.",
          "Tout va bien : le problème est réglé.",
          "Le questionnaire est faux.",
        ], bonne: 0, fb: [
          "Oui. Le chapitre 1 l’a montré : ce qui compte, c’est ce qui revient avec le travail.",
          "Les vacances ont reposé Sam. Elles n’ont rien changé à ce qui l’attend à la reprise.",
          "Il n’est pas faux : il décrit fidèlement des semaines de repos. C’est le moment choisi qui ne convient pas.",
        ] },
      ],
    },
    sources: [
      ["Danhof-Pont et al. (2011) · Biomarkers in burnout: a systematic review", "https://doi.org/10.1016/j.jpsychores.2010.10.012"],
      ["Cadegiani & Kater (2016) · Adrenal fatigue does not exist: a systematic review", "https://doi.org/10.1186/s12902-016-0128-4"],
      ["Endocrine Society · la « fatigue surrénalienne » n’est pas un diagnostic", "https://www.endocrine.org/patient-engagement/endocrine-library/adrenal-fatigue"],
    ],
    nechange: "Qu’aucun test sanguin ne voie ton usure ne veut pas dire qu’elle n’existe pas. Elle se lit dans ce que tu vis et dans ton travail : c’est là que Bull-Out regarde.",
    piece: { nom: "Les dimensions", texte: "Ton rapport détaille six dimensions, à lire une par une plutôt que de t’arrêter au total.", rapport: "les scores par dimension et la façon de les lire." },
    suite: "Comprendre ne suffit pas. Le dernier temps de la formation passe à l’action : que peut-on changer, et qui peut le faire ?",
  },

  // ───────────────────────────── 7
  {
    temps: 2,
    court: "Agir sur le travail",
    titre: "Agir sur le travail réel : retirer, reporter, simplifier",
    duree: 7,
    savoir: [
      "Transformer « fais au mieux » en une décision : retirer, reporter ou simplifier.",
      "Repérer les signaux faibles, individuels et collectifs, et noter les décisions : le travail, jamais la santé.",
    ],
    arrive: "« Ma porte est ouverte. » « On verra après le pic. » « On va faire une formation gestion du stress. » Ces phrases sont souvent sincères. Mais elles ne changent rien au travail.",
    retenir: "Que tu sois salarié, collègue ou manager, le levier le plus efficace est le même : <b>agir sur le travail réel</b>. Face à une surcharge, il faut au moins une décision claire parmi trois : <b>retirer, reporter, simplifier</b>. Et quand on n’a pas les moyens de décider, on remonte le problème au lieu de laisser l’équipe compenser.",
    blocs: [
      { t: "h", texte: "La règle des trois décisions" },
      { t: "fig", ill: "pile", cap: "Une pile qui déborde a trois sorties. « Fais au mieux » n’en est pas une : c’est laisser la personne trier seule." },
      { t: "p", html: "Quand tout ne peut pas être fait, quelqu’un va forcément trier. La seule question est : <b>qui, et est-ce que ça se voit ?</b> Si personne ne décide, c’est la personne surchargée qui trie, seule, le soir, et c’est elle qui portera la faute de ce qui n’est pas fait." },
      { t: "exemple", titre: "Le point charge de 15 minutes", html: "Nadia et Sam prennent un quart d’heure, avec cinq questions : ce qui est demandé, ce qui bloque, ce qui dépasse, ce qu’on retire ou reporte, ce qu’on suit dans deux semaines. Décisions : Léa reprend le dossier de Marc deux jours par semaine ; les relances clients sont reportées à la fin du mois ; le reporting hebdomadaire passe de trois pages à cinq lignes. Point de suivi le 15.", note: "Quinze minutes, trois décisions, une date. C’est ça, la différence entre écouter et agir." },
      { t: "h", texte: "Quatre gestes, pour chacun" },
      { t: "p", html: "Ces gestes ont longtemps été présentés comme « des outils pour managers ». Ils concernent tout le monde : le manager les décide, le salarié peut les demander, le collègue peut les soutenir." },
      { t: "gestes", items: [
        ["Clarifier", "Dire ce qui est prioritaire, ce qui peut attendre, et le niveau de qualité attendu.", "« Parmi ces trois dossiers, lequel passe en premier ? »", "Fixer chaque semaine les priorités, et ce qui peut attendre."],
        ["Arbitrer", "Quand tout ne tient pas, décider ce qui sort, plutôt que laisser chacun trier seul.", "« Je ne peux pas tout tenir d’ici vendredi. Qu’est-ce qui peut glisser ? »", "Retirer, reporter ou simplifier au moins une tâche, explicitement."],
        ["Protéger", "Limiter les urgences artificielles, les interruptions et les sollicitations hors horaires.", "« Je coupe mes notifications de 9 h à 11 h pour finir le planning. »", "Protéger des plages sans réunion, ne pas écrire le soir sans nécessité."],
        ["Remonter", "Quand les moyens manquent, porter le problème au bon niveau au lieu de compenser.", "« Je signale par écrit que ce délai n’est pas tenable avec l’équipe actuelle. »", "Tracer l’impossibilité et demander des moyens ou un délai à sa hiérarchie."],
      ] },
      { t: "h", texte: "Les phrases qui aggravent" },
      { t: "table", titre: "Ce qui donne l’impression d’agir, et ce qui agit vraiment", cols: ["Phrase", "Pourquoi elle aggrave", "Ce qui aide vraiment"], rows: [
        ["« Tout est prioritaire. »", "C’est impossible, et ça pousse chacun à compenser seul.", "Classer : maintenant, plus tard, en plus simple, pas du tout."],
        ["« Ma porte est toujours ouverte. »", "Les personnes épuisées viennent rarement demander.", "Des points de charge courts, avec des décisions."],
        ["« Il faut mieux s’organiser. »", "Ça transforme un problème de charge en problème de personne.", "Repérer ce qui consomme le temps, et le retirer."],
        ["« On verra après le pic. »", "Le pic devient souvent le mode normal.", "Limiter la durée du pic, et dire comment on en sort."],
        ["« Je ne veux pas savoir, c’est perso. »", "Ça laisse les signaux s’installer.", "Parler charge, récupération, priorités, sans demander de détail médical."],
        ["« On va faire une formation gestion du stress. »", "Cosmétique si les contraintes restent les mêmes.", "D’abord retirer l’évitable et rendre les moyens. Former ensuite."],
      ] },
      { t: "h", texte: "Les signaux faibles" },
      { t: "p", html: "Un signal n’est pas une preuve. Mais plusieurs signaux répétés sont une information, pour soi comme pour une équipe." },
      { t: "deux", items: [
        ["Chez une personne", ["Une fatigue qui dure", "Des erreurs inhabituelles", "De l’irritabilité, un retrait soudain", "Une perte de confiance", "Un sommeil évoqué comme dégradé", "« Je n’y arrive plus »"]],
        ["Dans une équipe", ["Plusieurs personnes surchargées", "Des réunions qui ne décident rien", "Des urgences permanentes", "Des mails le soir et le week-end", "Des départs ou des arrêts répétés", "Des « héros » qui compensent"]],
      ], note: "Un signal collectif n’est pas une somme de fragilités individuelles. C’est souvent une information sur l’organisation du travail." },
      { t: "h", texte: "Tracer les décisions" },
      { t: "p", html: "Une décision qui n’est écrite nulle part n’existe pas longtemps. Après un point charge, on note ce qui a été retiré, reporté ou simplifié, et la date du prochain point. Le chapitre suivant montre pourquoi cette trace protège aussi, devant la loi." },
      { t: "cartes", items: [
        ["À noter", "Les points de charge, les décisions de retrait ou de report, les priorités écrites, les demandes de moyens, la date de suivi."],
        ["À ne jamais noter", "Les détails de santé, les diagnostics, la vie privée. On note les contraintes du travail et les décisions, pas la personne."],
      ] },
      { t: "trames", titre: "Des phrases prêtes à l’emploi", items: [
        ["Demander un arbitrage (salarié)", "Je ne peux pas tenir ces trois dossiers d’ici vendredi avec la qualité attendue. Lequel passe en premier, et lequel peut attendre ou être simplifié ?"],
        ["Ouvrir un point charge (manager)", "Je voudrais faire un point sur la charge réelle. L’objectif n’est pas de juger ton organisation, mais de voir ce qui dépasse et ce qu’on peut arbitrer."],
        ["Répondre à un signal de fatigue", "Je note que la situation pèse sur ta récupération. Je ne vais pas te demander de détails médicaux. Regardons ce qui, dans le travail, peut être réduit ou clarifié."],
        ["Remonter un manque de moyens", "Le niveau de contrainte dépasse ce que je peux régler à mon niveau. Je remonte le sujet et je demande un appui sur la charge, les moyens ou les délais."],
      ] },
      { t: "principe", html: "La bienveillance sans décision ne protège personne. Ce qui protège l’équipe, et le manager, c’est ce qui a été concrètement retiré, reporté, simplifié ou demandé." },
      { t: "piege", titre: "Le piège · écouter sans décider", depart: "L’équipe de Sam est en surcharge depuis trois mois.", etapes: [
        ["l’écoute remplace la décision", "Nadia : « je sais que c’est dur, on doit passer le cap »."],
        ["le cap devient permanent", "Aucune tâche n’est retirée, rien n’est remonté."],
        ["le risque devient individuel", "Trois mois plus tard, un arrêt long : « il était fragile »."],
      ], fin: "À chaque étape, une décision était possible. <b>La seule réponse qui ne protège personne, c’est de ne rien décider.</b>" },
    ],
    exo: {
      titre: "La semaine impossible",
      intro: "Trois dossiers urgents pour vendredi, une équipe en sous-effectif. Que faire, côté Sam et côté Nadia ?",
      situations: [
        { q: "Sam sait qu’il ne pourra pas tenir les trois dossiers d’ici vendredi. Que dire à Nadia ?", choix: [
          "« Je vais faire au mieux. »",
          "« Je ne peux pas tenir les trois d’ici vendredi. Lequel passe en premier, et lequel peut attendre ou être simplifié ? »",
          "Rien : il ne veut pas passer pour quelqu’un qui ne suit pas.",
        ], bonne: 1, fb: [
          "« Au mieux » laisse Sam trier seul, le soir, et porter seul ce qui ne sera pas fait.",
          "Oui. Sam ne se plaint pas : il demande un arbitrage précis, qui oblige à une décision.",
          "Se taire, c’est le surengagement du chapitre 4. Le problème devient invisible, et finit par retomber sur Sam.",
        ] },
        { q: "Nadia n’a ni budget pour un renfort, ni le pouvoir de décaler le client.", choix: [
          "Elle demande à l’équipe de tenir encore un peu.",
          "Elle propose une formation gestion du stress.",
          "Elle note l’impossibilité et la remonte à sa hiérarchie, avec une demande précise : des moyens ou un délai.",
        ], bonne: 2, fb: [
          "« Encore un peu » est la phrase du piège : le temporaire qui dure.",
          "Une formation ne change ni le délai ni l’effectif. Elle peut venir plus tard, pas à la place.",
          "Oui. Quand on n’a pas la main, sa part est de remonter, par écrit, avec une demande précise. C’est aussi ce qui protège Nadia.",
        ] },
        { q: "Après le point charge, que doit noter Nadia ?", choix: [
          "Les décisions sur le travail : ce qui est retiré, reporté, simplifié, et la date du prochain point.",
          "Les problèmes de sommeil dont Sam a parlé.",
          "Rien, pour que ça reste informel.",
        ], bonne: 0, fb: [
          "Oui. On trace le travail et les décisions. C’est ce qui permettra de vérifier, dans deux semaines, si quelque chose a changé.",
          "Jamais. Les détails de santé ne se notent pas. Seules les contraintes et les décisions de travail le sont.",
          "Sans trace, impossible de vérifier que la décision a été tenue, ni de montrer qu’elle a été prise.",
        ] },
      ],
    },
    sources: [
      ["INRS · risques psychosociaux, ce qu’il faut retenir", "https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html"],
      ["INRS · réglementation en matière de risques psychosociaux", "https://www.inrs.fr/risques/psychosociaux/reglementation.html"],
    ],
    nechange: "Agir sur le travail ne veut pas dire que tout dépend de toi. Si tu n’as pas la main, ta part est de dire clairement ce qui ne tient pas, et à qui.",
    piece: { nom: "Le plan", texte: "Ton rapport propose des actions à 72 heures et à deux semaines, avec des phrases prêtes à l’emploi.", rapport: "les actions à arrêter, clarifier, demander et surveiller." },
    suite: "Agir sur le travail, c’est aussi ce que la loi attend. Que dit-elle exactement, et comment se protéger ? C’est le chapitre suivant.",
  },

  // ───────────────────────────── 8
  {
    temps: 2,
    court: "Ce que dit la loi",
    titre: "Ce que dit la loi, et comment se protéger",
    duree: 8,
    savoir: [
      "Dire ce que la loi exige vraiment de l’employeur, et ce qu’elle attend de chaque salarié, manager compris.",
      "Savoir ce que risquent l’employeur et le manager, et comment chacun se protège : par l’action, et par la trace de l’action.",
    ],
    arrive: "« Tant qu’il n’y a pas de harcèlement, on ne risque rien. » Ou, côté salarié : « De toute façon, c’est parole contre parole. » Les deux idées sont fausses, et elles font perdre des mois.",
    retenir: "L’employeur doit <b>prévenir</b> les risques pour la santé physique et mentale, pas seulement réparer les dégâts (article L4121-1 du Code du travail). Il s’en sort s’il <b>prouve</b> avoir pris les mesures de prévention nécessaires. Une surcharge connue et laissée sans réponse suffit à engager sa responsabilité, <b>même sans harcèlement</b>. Pour le salarié comme pour le manager, ce qui protège, c’est d’avoir agi, et de pouvoir le montrer : <b>des faits, des dates, des demandes écrites</b>.",
    blocs: [
      { t: "h", texte: "Ce que la loi demande vraiment" },
      { t: "p", html: "Le Code du travail impose à l’employeur une <b>obligation de sécurité</b> : prendre les mesures nécessaires pour protéger la santé physique <b>et mentale</b> des salariés (article L4121-1). Ces mesures comprennent la prévention, l’information, la formation, et surtout une <b>organisation et des moyens adaptés</b>. L’article suivant (L4121-2) fixe l’ordre : éviter les risques, les évaluer, les <b>combattre à la source</b>, adapter le travail à l’homme, et planifier la prévention en y intégrant l’organisation du travail." },
      { t: "fig", ill: "niveaux", cap: "Trois niveaux de prévention. Une formation au stress ou une cellule d’écoute sont utiles, mais elles viennent après : la loi demande d’abord d’agir sur ce qui use." },
      { t: "cartes", items: [
        ["Évaluer, par écrit", "Chaque entreprise doit tenir un <b>document unique d’évaluation des risques</b> (DUERP), qui inclut les risques psychosociaux, et le mettre à jour. Tu peux demander à le consulter."],
        ["Prouver la prévention", "Depuis un arrêt de 2015 (Cour de cassation, « Air France »), l’employeur échappe à sa responsabilité s’il <b>prouve</b> avoir pris toutes les mesures prévues par la loi. C’est une obligation de moyens renforcée : la preuve d’action est au cœur du sujet."],
        ["Chacun a sa part", "L’article L4122-1 demande aussi à <b>chaque salarié</b> de prendre soin de sa santé et de celle des autres, selon sa formation et ses moyens. Un manager est un salarié : sa part, c’est d’alerter, d’arbitrer ce qu’il peut, et de remonter le reste."],
      ] },
      { t: "h", texte: "Ce que risque l’employeur" },
      { t: "p", html: "Concrètement, quatre situations peuvent se présenter. Plus l’employeur avait été prévenu, plus ce qu’il risque est lourd s’il n’a rien fait." },
      { t: "table", titre: "Quatre situations, de la plus fréquente à la plus grave", cols: ["Ce qui s’est passé", "Comment le droit l’appelle", "Ce que l’employeur peut devoir faire"], rows: [
        ["Sam a écrit qu’il était débordé. Rien n’a changé, et sa santé s’est dégradée.", "Un <b>manquement à l’obligation de sécurité</b> : l’employeur savait, et n’a pas protégé sa santé.", "Verser des dommages et intérêts, fixés par le conseil de prud’hommes."],
        ["Sam ne peut plus continuer. Il demande au juge de rompre son contrat à cause de ce manquement.", "Une <b>résiliation judiciaire</b> (ou une <b>prise d’acte</b>, si Sam part de lui-même et saisit ensuite le juge).", "Si le juge donne raison à Sam : payer comme pour un licenciement injustifié (indemnités et dommages et intérêts)."],
        ["Le burn-out de Sam est reconnu comme maladie professionnelle. Son employeur avait été alerté.", "Une <b>faute inexcusable</b> : l’employeur connaissait le danger, ou aurait dû le connaître, et n’a pas pris les mesures pour l’éviter.", "Payer, en plus de la Sécurité sociale, une rente majorée et la réparation des souffrances subies."],
        ["Un chef humilie Sam devant l’équipe, de façon répétée.", "Du <b>harcèlement moral</b>.", "Faire cesser les faits et réparer. Si Sam est licencié pour s’en être plaint, le licenciement est annulé. L’auteur peut être poursuivi au pénal."],
      ] },
      { t: "details", titre: "Le burn-out peut-il être reconnu en maladie professionnelle ?", html: "<p>Oui, mais c’est exigeant. Le burn-out ne figure dans aucun tableau de maladies professionnelles. La demande passe donc par un <b>comité régional</b> (CRRMP), qui doit établir un lien <b>direct et essentiel</b> avec le travail habituel, et une incapacité permanente estimée à au moins 25 % (article L461-1 du Code de la sécurité sociale). La demande se fait auprès de la CPAM, avec un certificat de ton médecin. Les dossiers bien documentés (charge, alertes écrites, réponses) ont plus de chances d’aboutir.</p>" },
      { t: "h", texte: "Ce que risque le manager" },
      { t: "p", html: "Le manager n’est pas l’employeur. Il ne répond pas de tout, et il ne peut pas décider ce qu’il n’a pas les moyens de décider. Mais il n’est pas à l’abri pour autant :" },
      { t: "cartes", items: [
        ["Disciplinaire", "L’employeur doit faire cesser un harcèlement. Un manager qui humilie, menace ou isole peut être sanctionné, jusqu’au licenciement pour faute grave."],
        ["Civil", "Un salarié auteur de harcèlement engage sa <b>responsabilité personnelle</b> envers la victime, même s’il agissait dans le cadre de ses fonctions."],
        ["Pénal", "Le harcèlement moral est un délit : jusqu’à <b>deux ans</b> de prison et <b>30 000 €</b> d’amende (article 222-33-2 du Code pénal). Dans l’affaire France Télécom, confirmée par la Cour de cassation en 2025, des dirigeants ont été condamnés pour une politique d’entreprise qui dégradait les conditions de travail : un « harcèlement institutionnel », sans viser une personne en particulier."],
        ["Délégation de pouvoirs", "Un manager qui a reçu par écrit la compétence, l’autorité et les moyens en santé et sécurité peut répondre pénalement à la place du chef d’entreprise. Sans les moyens, la délégation se discute : d’où l’importance d’écrire quand ils manquent."],
      ] },
      { t: "exemple", titre: "Deux Nadia, la même surcharge", html: "<b>Première Nadia</b> : elle répète « on doit passer le cap », ne note rien, ne remonte rien. Quand Sam est arrêté, rien ne montre qu’elle a vu, ni qu’elle a agi. <b>Deuxième Nadia</b> : elle fait un point charge, note les décisions, et écrit à son directeur : « avec l’effectif actuel, le délai du client X n’est pas tenable ; je demande un renfort ou un report ». Le directeur ne répond pas. Quand Sam est arrêté, la trace montre qu’elle a fait sa part : <b>le problème remonte à celui qui avait les moyens</b>.", note: "La deuxième Nadia n’a pas évité l’arrêt. Mais elle a agi, et elle peut le montrer. C’est exactement ce que la loi attend." },
      { t: "h", texte: "Se protéger, côté salarié" },
      { t: "trames", sansCopie: true, titre: "Cinq gestes, dans l’ordre", items: [
        ["1 · Demander par écrit", "Un mail court et factuel à ton manager : ce qui est demandé, ce qui ne tient pas, ce que tu proposes. Exemple : « Avec le dossier de Marc en plus du mien, je ne peux pas tenir le délai du 15. Je propose de reporter les relances clients. Qu’en penses-tu ? »"],
        ["2 · Tenir un journal factuel", "Chaque semaine : tes horaires réels, les urgences, les demandes du soir ou du week-end, les décisions prises. Des faits et des dates, pas des jugements. Garde aussi tes demandes et les réponses reçues."],
        ["3 · Voir le médecin du travail", "Tu peux demander une visite à tout moment, sans dire pourquoi à ton employeur. Il est tenu au secret médical et peut proposer des aménagements. Vois aussi ton médecin traitant si ta santé se dégrade."],
        ["4 · S’appuyer sur le collectif", "Le CSE dispose d’un droit d’alerte quand la santé physique ou mentale des salariés est atteinte. L’inspection du travail peut aussi être saisie, et un syndicat ou un avocat peut te conseiller avant toute démarche."],
        ["5 · Ne pas attendre pour se renseigner", "Les actions en justice ont des délais : en général deux ans pour ce qui touche à l’exécution du contrat, cinq ans pour le harcèlement. Se renseigner tôt ne t’engage à rien."],
      ] },
      { t: "details", titre: "Et le droit de retrait ? Et enregistrer en cachette ?", html: "<p><b>Le droit de retrait</b> (article L4131-1) est réservé à un danger <b>grave et imminent</b>. Il est rarement adapté à une surcharge qui dure depuis des mois, et un retrait jugé injustifié peut entraîner une retenue de salaire. À manier avec un conseil.</p><p><b>Enregistrer une réunion à l’insu des autres</b> abîme la confiance, et n’est admis comme preuve qu’à des conditions strictes : que ce soit indispensable, et proportionné. Les demandes écrites, le journal et les témoignages sont presque toujours plus utiles.</p>" },
      { t: "h", texte: "Se protéger, côté manager" },
      { t: "deux", items: [
        ["Ce qui te protège", ["Des points charge avec des décisions notées", "Des priorités écrites, partagées avec l’équipe", "L’impossibilité remontée par écrit, avec une demande précise", "Une formation aux risques psychosociaux, que tu peux demander", "Le DUERP connu, et tes alertes qui l’alimentent", "Ta propre charge surveillée : tu as droit aux mêmes portes"]],
        ["Ce qui t’expose", ["Une surcharge connue, laissée sans décision", "Des objectifs intenables relayés sans le signaler", "Des propos humiliants, des menaces, des pressions répétées", "Demander des détails médicaux", "Mettre à l’écart quelqu’un qui a alerté", "Ne rien noter, « pour que ça reste informel »"]],
      ], note: "Ne jamais noter la santé : seulement le travail, les contraintes et les décisions." },
      { t: "principe", html: "La loi ne demande à personne d’être parfait. Elle demande de <b>prévenir</b>, de <b>réagir aux alertes</b>, et de <b>pouvoir le montrer</b>. Une trace écrite, datée et factuelle protège à la fois celui qui alerte et celui qui décide." },
      { t: "piege", titre: "Le piège · « pas de harcèlement, donc pas de risque »", depart: "Personne n’a été insulté ni humilié dans l’équipe de Sam.", etapes: [
        ["l’absence d’agressivité devient une absence de risque", "« Il n’y a pas de harcèlement ici. »"],
        ["l’absence de risque devient une absence d’obligation", "« Donc on n’a rien à faire de particulier. »"],
        ["la surcharge connue devient un choix", "Six mois sans mesure, malgré des alertes écrites."],
      ], fin: "L’obligation de sécurité porte sur <b>tous</b> les risques pour la santé mentale, pas seulement le harcèlement. Une surcharge connue et ignorée suffit." },
    ],
    exo: {
      titre: "Qui risque quoi ?",
      intro: "Trois situations, inspirées de cas réels. Pour chacune, choisis la lecture la plus juste.",
      situations: [
        { q: "Nadia a écrit à son directeur que le délai n’était pas tenable, et demandé un renfort. Pas de réponse. Deux mois plus tard, Sam est arrêté pour épuisement.", choix: [
          "Nadia est seule responsable : c’est sa manager.",
          "L’employeur, alerté par écrit et resté sans réponse, peut avoir manqué à son obligation de sécurité. La trace de Nadia montre qu’elle a fait sa part.",
          "Personne : il n’y a eu ni insulte ni harcèlement.",
        ], bonne: 1, fb: [
          "Nadia n’avait ni budget ni pouvoir sur le délai. Elle a fait ce qui était à sa portée : alerter, par écrit, avec une demande précise.",
          "Oui. L’alerte écrite déplace la question vers celui qui avait les moyens d’agir, et qui ne l’a pas fait.",
          "C’est le piège du chapitre : l’obligation de sécurité couvre aussi une surcharge connue et ignorée.",
        ] },
        { q: "Sam veut se protéger avant d’en parler plus haut. Que lui conseiller ?", choix: [
          "Enregistrer les réunions en cachette, pour avoir des preuves.",
          "Exercer son droit de retrait et rester chez lui.",
          "Écrire ses demandes, tenir un journal factuel de sa charge, et voir le médecin du travail.",
        ], bonne: 2, fb: [
          "Risqué : cela abîme la confiance, et n’est admis comme preuve qu’à des conditions strictes. L’écrit et le journal font mieux.",
          "Le droit de retrait vise un danger grave et imminent. Pour une surcharge durable, il expose Sam à une retenue de salaire.",
          "Oui. Des faits datés, des demandes écrites et un avis médical : c’est ce qui pèse, et ce qui ouvre des solutions.",
        ] },
        { q: "Un chef d’équipe crie régulièrement sur une collègue devant tout le monde. Le directeur répond : « il a de bons résultats ».", choix: [
          "L’employeur doit faire cesser ces agissements : enquête, mesures de protection, sanction si les faits sont établis.",
          "Rien à faire tant que la collègue ne porte pas plainte.",
          "Le chef d’équipe ne risque rien personnellement : il agit pour l’entreprise.",
        ], bonne: 0, fb: [
          "Oui. Des humiliations répétées peuvent constituer un harcèlement moral, que l’employeur doit prévenir et faire cesser. Les résultats ne changent rien.",
          "L’employeur n’attend pas une plainte : dès qu’il sait, il doit agir. Attendre engage sa responsabilité.",
          "Faux : l’auteur d’un harcèlement répond personnellement, sur le plan disciplinaire, civil et pénal.",
        ] },
      ],
    },
    sources: [
      ["Code du travail, article L4121-1 · obligation de sécurité", "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035640828"],
      ["INRS · réglementation en matière de risques psychosociaux", "https://www.inrs.fr/risques/psychosociaux/reglementation.html"],
      ["INRS · responsabilités de l’employeur en santé et sécurité", "https://www.inrs.fr/demarche/responsabilites/ce-qu-il-faut-retenir.html"],
      ["Service-public.fr · harcèlement moral au travail", "https://www.service-public.fr/particuliers/vosdroits/F2347"],
      ["Service-public.fr · obligations de l’employeur en santé et sécurité", "https://entreprendre.service-public.fr/vosdroits/F33437"],
    ],
    nechange: "Ces repères ne remplacent pas un avis juridique. Ils servent à savoir quand demander conseil, et à ne pas attendre d’être à bout pour le faire.",
    piece: { nom: "Les traces", texte: "Ton rapport t’aide à garder une trace utile : des faits, des dates, et des demandes précises, jamais ta santé.", rapport: "les actions « demander » et les phrases prêtes à l’emploi." },
    suite: "Il reste une question : à qui en parler, selon ce qui se passe ? C’est le dernier chapitre.",
  },

  // ───────────────────────────── 9
  {
    temps: 2,
    court: "À qui en parler",
    titre: "À qui en parler, et comment",
    duree: 6,
    savoir: [
      "Choisir la bonne porte selon le besoin : soin, aménagement, arbitrage ou protection.",
      "Préparer une reprise après un arrêt, sans revenir dans exactement le même travail.",
    ],
    arrive: "« Je ne veux pas voir le médecin du travail, il va me déclarer inapte. » Ou : « Les RH, c’est l’employeur, ça ne sert à rien. » Ces idées font souvent attendre trop longtemps.",
    retenir: "Chaque interlocuteur ouvre une porte différente. Le <b>médecin généraliste</b> soigne et peut arrêter. Le <b>médecin du travail</b>, tenu au secret médical, peut proposer des aménagements. Le <b>manager et les RH</b> arbitrent la charge. Le <b>CSE</b> porte un problème collectif. En cas de danger, le <b>15</b> ou le <b>112</b>, et le <b>3114</b> pour les idées suicidaires.",
    blocs: [
      { t: "h", texte: "Quatre portes" },
      { t: "fig", ill: "portes", cap: "Quatre besoins, quatre portes. Aucune n’est la mauvaise : chacune peut t’orienter vers les autres." },
      { t: "portes", items: [
        ["Être soigné", "Médecin généraliste, psychologue, psychiatre.", "Quand le sommeil, l’humeur ou la santé se dégradent, quel que soit le lien avec le travail."],
        ["Adapter le poste", "Médecin du travail, infirmier ou infirmière en santé au travail.", "Pour des aménagements (horaires, tâches, télétravail) sans exposer ta santé à ton employeur."],
        ["Arbitrer la charge", "Manager, hiérarchie, ressources humaines.", "Pour retirer, reporter, simplifier, ou obtenir des moyens."],
        ["Protéger, ensemble", "CSE, représentants du personnel, inspection du travail, assistant social du travail.", "Quand plusieurs personnes sont touchées, ou en cas de harcèlement ou de violence."],
      ] },
      { t: "urgence", html: "<b>En cas de danger immédiat</b> : appelle le <a href=\"tel:15\">15</a> ou le <a href=\"tel:112\">112</a>. <b>Idées suicidaires</b>, pour toi ou un proche : le <a href=\"tel:3114\">3114</a>, 24 h/24, gratuit et confidentiel." },
      { t: "h", texte: "Le médecin du travail, ce qu’il fait vraiment" },
      { t: "p", html: "C’est la porte la plus méconnue, et souvent la plus utile. Tu peux <b>demander à le voir à tout moment</b>, sans passer par ton employeur pour expliquer pourquoi. Il est tenu au <b>secret médical</b> : il ne transmet pas ton diagnostic. Il connaît les postes de l’entreprise et peut proposer des aménagements : horaires, répartition des tâches, temps partiel thérapeutique, télétravail." },
      { t: "mythes", titre: "Deux idées reçues", items: [
        ["« Il va me déclarer inapte »", "L’inaptitude est rare, encadrée, et ne se décide qu’après une étude du poste et un échange avec toi. Le médecin du travail cherche d’abord à adapter le poste pour que tu puisses rester."],
        ["« Les RH, c’est l’employeur, ça ne sert à rien »", "Les RH représentent l’employeur, qui a justement l’obligation de prévenir les risques. Une demande écrite et précise (« ma charge ne tient pas, voici pourquoi ») les oblige à y répondre."],
      ] },
      { t: "h", texte: "Quand faire monter le sujet" },
      { t: "table", titre: "Qui solliciter, selon la situation", cols: ["Situation", "Premier niveau", "Si ça ne suffit pas"], rows: [
        ["Surcharge ponctuelle", "Le manager : arbitrer, suivre.", "Point de suivi à deux semaines."],
        ["Surcharge durable, sans marge", "Manager et hiérarchie.", "RH, service de prévention, direction."],
        ["La santé est touchée", "Médecin du travail, médecin généraliste.", "Psychologue, psychiatre."],
        ["Plusieurs personnes touchées", "Une analyse collective.", "CSE ou CSSCT, prévention, médecine du travail."],
        ["Harcèlement ou violence", "Protection et confidentialité.", "RH, procédure interne, représentants, inspection du travail."],
        ["Le manager n’a pas les moyens", "Tracer l’impossibilité.", "Hiérarchie, RH, prévention."],
        ["Danger immédiat", "15 ou 112.", "3114 en cas de risque suicidaire."],
      ] },
      { t: "h", texte: "Préparer la reprise" },
      { t: "exemple", titre: "Le retour de Sam", html: "Pendant son arrêt, Sam demande une <b>visite de pré-reprise</b> avec le médecin du travail. Ensemble, ils listent ce qui l’a usé : le dossier de Marc, les réunions à 18 h 30, les mails du soir. À la <b>visite de reprise</b>, le médecin propose un temps partiel thérapeutique les deux premiers mois. Nadia, de son côté, a fait entrer un renfort sur le dossier de Marc.", note: "Revenir au même poste, avec la même charge, c’est remettre la même batterie dans le même circuit." },
      { t: "cartes", items: [
        ["Pendant l’arrêt", "La visite de pré-reprise (possible dès 30 jours d’arrêt) prépare le retour avec le médecin du travail, sans que l’employeur soit présent."],
        ["Au retour", "La visite de reprise est obligatoire après certains arrêts (60 jours pour une maladie non professionnelle). Elle vérifie que le poste est compatible avec ta santé."],
        ["Les premières semaines", "Ce qui reprend, ce qui ne reprend pas encore, ce qui a changé dans le poste, et une date pour faire le point."],
      ] },
      { t: "trames", titre: "Pour ouvrir la conversation", items: [
        ["Avec le médecin du travail", "Je viens parce que ma charge de travail a des effets sur ma santé depuis plusieurs semaines. Je voudrais savoir quels aménagements sont possibles."],
        ["Avec ton médecin traitant", "Depuis six semaines, je dors mal, je n’arrive plus à récupérer le week-end et je fais des erreurs inhabituelles au travail. Ça ne passe pas avec le repos."],
        ["Avec ton manager", "J’aimerais qu’on fasse un point sur ma charge. Je n’ai pas besoin d’entrer dans les détails personnels : je voudrais qu’on regarde ce qui peut être réduit ou reporté."],
      ] },
      { t: "principe", html: "Demander de l’aide tôt n’est pas un aveu de faiblesse. C’est le moment où il y a le plus de portes ouvertes, et le plus de choses encore faciles à changer." },
      { t: "piege", titre: "Le piège · la porte qu’on croit fermée", depart: "Sam va mal depuis deux mois.", etapes: [
        ["une peur devient une règle", "« Le médecin du travail va me déclarer inapte. »"],
        ["une porte fermée devient toutes", "« Donc je n’en parle à personne. »"],
        ["le silence devient la solution", "« J’attends que ça passe. »"],
      ], fin: "Aucune de ces étapes n’est vérifiée. Et attendre est la seule option qui ne peut rien changer." },
    ],
    exo: {
      titre: "La bonne porte",
      intro: "Trois situations dans l’entourage de Sam. Vers qui se tourner en premier ?",
      situations: [
        { q: "Sam voudrait des horaires aménagés, sans expliquer sa santé à Nadia.", choix: [
          "Le médecin du travail : il peut proposer des aménagements sans révéler le diagnostic.",
          "Les RH, en leur racontant toute sa situation.",
          "Personne : il n’a pas le droit de demander un aménagement.",
        ], bonne: 0, fb: [
          "Oui. Le médecin du travail est tenu au secret. Il transmet seulement ce qui concerne le poste.",
          "Sam n’a pas à raconter sa santé aux RH. Le médecin du travail est la porte faite pour ça.",
          "Il en a le droit, et le médecin du travail est là pour l’étudier avec lui.",
        ] },
        { q: "Plusieurs collègues de Sam vivent la même surcharge depuis des mois.", choix: [
          "Chacun voit son médecin, séparément.",
          "Le CSE ou les représentants du personnel, pour porter le problème comme un problème collectif.",
          "Rien : si tout le monde est touché, c’est le métier qui veut ça.",
        ], bonne: 1, fb: [
          "C’est utile pour la santé de chacun. Mais un problème collectif a besoin d’une réponse collective, sinon il reste découpé en « cas ».",
          "Oui. Un signal collectif est une information sur l’organisation : c’est le rôle du CSE de la porter.",
          "C’est le piège du chapitre 1 : ce qui est fréquent n’est pas pour autant sans risque.",
        ] },
        { q: "Léa confie à Sam qu’elle n’en peut plus et qu’elle pense parfois à « disparaître ».", choix: [
          "Lui conseiller de prendre des vacances.",
          "En parler d’abord à Nadia, pour qu’elle allège sa charge.",
          "Prendre ses mots au sérieux, rester avec elle, et appeler ensemble le 3114 (ou le 15 en cas de danger immédiat).",
        ], bonne: 2, fb: [
          "Ces mots peuvent signaler un risque suicidaire. Ils demandent une aide spécialisée, maintenant.",
          "Alléger sa charge viendra ensuite. D’abord, Léa a besoin d’une aide spécialisée, et de ne pas rester seule.",
          "Oui. On peut appeler le 3114 pour quelqu’un d’autre, ou avec lui. Parler du suicide ne donne pas l’idée de passer à l’acte : ça ouvre une porte.",
        ] },
      ],
    },
    sources: [
      ["Service-public.fr · visite médicale à la demande du salarié", "https://www.service-public.fr/particuliers/vosdroits/F34052"],
      ["Service-public.fr · visites de pré-reprise et de reprise", "https://www.service-public.fr/particuliers/vosdroits/F34048"],
      ["3114 · numéro national de prévention du suicide", "https://3114.fr/"],
      ["INRS · les acteurs de la prévention en entreprise", "https://www.inrs.fr/demarche/acteurs-prevention/ce-qu-il-faut-retenir.html"],
    ],
    nechange: "Tu n’as pas à trouver la porte parfaite. N’importe quelle porte ouverte vaut mieux que le silence : chacun peut t’orienter vers le bon interlocuteur.",
    piece: { nom: "Les portes", texte: "Ton rapport propose des interlocuteurs selon tes réponses, avec ce que chacun peut faire pour toi.", rapport: "la liste des interlocuteurs, et les numéros d’urgence en cas de signal d’alerte." },
    suite: "Tu as toutes les pièces. Avant le test final, la synthèse les rassemble : les trois modèles en une image, et les idées clefs à emporter.",
  },
];

// Test final : neuf situations nouvelles. Format : [question, choix, index de la bonne réponse, explication par choix].
export const examen = [
  [
    "Après trois semaines de vacances, Inès a récupéré. Quatre jours après la reprise, elle est de nouveau épuisée. Que retenir ?",
    ["Ses vacances étaient trop courtes.", "Le travail devient une piste sérieuse : il faut regarder ce qui revient avec la reprise.", "C’est forcément un burn-out."],
    1,
    ["Le repos a fonctionné : c’est la reprise qui l’épuise à nouveau.", "Exact. Une fatigue qui revient avec le travail oriente vers le travail, sans encore conclure.", "C’est une piste forte, pas une conclusion : d’autres facteurs peuvent jouer."],
  ],
  [
    "Marc ne se sent pas fatigué. Mais il trouve son travail absurde et n’en fait plus que le minimum depuis deux mois.",
    ["Sans fatigue, ce n’est pas de l’usure.", "C’est un trait de caractère.", "La distance mentale est un signe à part entière, à regarder pour lui-même."],
    2,
    ["Les trois signes peuvent évoluer séparément. Un détachement durable compte.", "Un changement récent chez quelqu’un d’investi est un signe, pas un trait.", "Exact. Le détachement peut être le premier signe à apparaître."],
  ],
  [
    "Dans une équipe, les priorités changent chaque semaine et rien n’est arbitré. Personne n’est insulté ni humilié.",
    ["Il peut y avoir un vrai risque, sans harcèlement : flou et absence d’arbitrage suffisent.", "Sans harcèlement, il n’y a pas de risque.", "C’est le rythme normal d’une entreprise."],
    0,
    ["Exact. Un risque peut naître de l’organisation et de l’inaction, sans comportement agressif.", "Le harcèlement n’est qu’une forme de risque parmi d’autres.", "Un flou permanent est une exigence évitable, pas une fatalité."],
  ],
  [
    "Depuis six mois, Paul compense les absences de son équipe, le soir et le week-end. À son entretien : « rien à signaler ».",
    ["Paul est solide, il n’y a pas d’inquiétude à avoir.", "Un déséquilibre entre effort et retour, entretenu par le surengagement.", "Il devrait simplement demander une prime."],
    1,
    ["Ceux qui compensent le plus sont souvent les plus exposés.", "Exact. Son effort est devenu invisible, et rien ne revient en échange.", "Une prime changerait le retour, pas l’effort ni la récupération. Il faut regarder les deux côtés."],
  ],
  [
    "Une manager dit : « Elle traverse un divorce, donc ce n’est pas le travail. »",
    ["C’est probablement vrai : il faut attendre que ça passe.", "Il faut lui demander des détails pour en être sûr.", "Un facteur personnel n’efface pas une charge connue : il faut vérifier ce qui, au travail, était modifiable."],
    2,
    ["Attendre, c’est laisser une charge s’ajouter à une période difficile.", "Sa vie privée ne la regarde pas, et n’aiderait pas à décider.", "Exact. La vulnérabilité ne dispense pas d’agir sur l’exposition professionnelle."],
  ],
  [
    "Un site propose un test salivaire de cortisol pour « confirmer votre burn-out ».",
    ["Aucun dosage ne diagnostique un burn-out : le résultat ne changerait rien à ce qu’il faut faire.", "C’est utile si le test est fait en laboratoire.", "Un cortisol bas prouve l’épuisement des surrénales."],
    0,
    ["Exact. Aucun seuil n’est validé, et la question reste le travail.", "Même en laboratoire, aucune valeur ne permet de trancher pour une personne.", "La « fatigue surrénalienne » n’est pas un diagnostic reconnu."],
  ],
  [
    "Face à une surcharge, un manager dit à son équipe : « Faites au mieux. »",
    ["C’est une bonne réponse : il fait confiance à l’équipe.", "Ce n’est pas un arbitrage : il faut retirer, reporter ou simplifier, ou remonter le problème.", "Il devrait plutôt proposer une formation au stress."],
    1,
    ["La confiance ne remplace pas la décision : chacun trie seul, et porte seul ce qui n’est pas fait.", "Exact. La règle des trois décisions, ou l’escalade si on n’a pas les moyens.", "Une formation ne change pas la pile de travail."],
  ],
  [
    "Dans une équipe, personne n’a été insulté ni humilié. Mais une surcharge, signalée par écrit, dure depuis six mois sans aucune mesure.",
    ["Sans harcèlement, l’employeur n’a rien à craindre.", "L’employeur peut avoir manqué à son obligation de sécurité : il devait prévenir un risque connu.", "C’est aux salariés de mieux s’organiser."],
    1,
    ["L’obligation de sécurité couvre tous les risques pour la santé mentale, pas seulement le harcèlement.", "Exact. Il devait agir à la source, et pouvoir prouver qu’il l’a fait.", "Une surcharge signalée et durable est un problème d’organisation, que l’employeur doit traiter."],
  ],
  [
    "Une collègue dit qu’elle pense à mettre fin à ses jours.",
    ["Changer de sujet pour ne pas l’encourager.", "Lui conseiller de voir un médecin la semaine prochaine.", "La prendre au sérieux, rester avec elle, appeler le 3114, ou le 15 en cas de danger immédiat."],
    2,
    ["En parler n’encourage pas le passage à l’acte. Le silence isole.", "La semaine prochaine, c’est trop tard s’il y a un danger. L’aide spécialisée existe 24 h/24.", "Exact. On peut appeler le 3114 pour quelqu’un d’autre, ou avec lui."],
  ],
];

// ───────────────────────────── Synthèse : les trois modèles, les idées clefs, et « pour aller plus loin ».
export const synthese = {
  chapo: "Neuf chapitres, trois modèles, une seule logique. Avant le test final, voici ce qu’il faut emporter. Relis cette page autant de fois qu’il le faut : c’est elle qui doit rester.",
  modeles: [
    { nom: "Maslach", question: "Qu’est-ce que l’usure fait à la personne ?", image: "Les trois jauges", idee: "Le burn-out, ce sont trois signes : l’épuisement, la distance mentale, la baisse d’efficacité. La fatigue n’est que le premier.", agir: "Regarder les trois jauges, pas seulement la fatigue. Le cynisme et le doute de soi sont des signaux, pas des défauts.", chap: 1 },
    { nom: "JD-R", question: "D’où vient l’usure ?", image: "La balance", idee: "L’usure s’installe quand ce que le travail demande pèse durablement plus que ce qui aide à le faire. Perdre une ressource pèse autant qu’ajouter une tâche.", agir: "Alléger un plateau ou charger l’autre : retirer une exigence, ou rendre une ressource (un collègue, du temps, de l’autonomie).", chap: 2 },
    { nom: "Siegrist", question: "Pourquoi ça ne se voit pas ?", image: "La bascule", idee: "Donner beaucoup pour peu de retour use aussi. Et le surengagement cache le problème, jusqu’au moment où il éclate.", agir: "Rendre l’effort visible, et le reconnaître autrement que par un merci : estime, perspectives, sécurité.", chap: 3 },
  ],
  clefs: [
    ["Le repos est le test.", "Une fatigue que le week-end ne répare plus est une information, pas une faiblesse.", 0],
    ["Trois signes, pas un.", "Épuisement, distance, efficacité réduite. Le cynisme protège l’énergie, puis coupe du sens.", 1],
    ["Une ressource perdue pèse autant qu’une tâche ajoutée.", "Regarde les deux plateaux de la balance, surtout celui qu’on oublie.", 2],
    ["L’effort invisible use deux fois.", "Une fois par la charge, une fois par l’absence de retour.", 3],
    ["« Perso » n’efface jamais « travail ».", "Un facteur personnel rend plus vulnérable. Il ne dispense pas de regarder la charge.", 4],
    ["Aucun dosage, aucun score total ne diagnostique.", "On lit dimension par dimension, et on parle avec un professionnel.", 5],
    ["Retirer, reporter, simplifier.", "« Fais au mieux » n’est pas une décision. Sans moyens, on remonte au lieu de compenser.", 6],
    ["Prévenir, réagir, et pouvoir le montrer.", "C’est ce que la loi attend. Une trace datée et factuelle protège celui qui alerte comme celui qui décide.", 7],
    ["Quatre portes, aucune mauvaise.", "Soin, aménagement, arbitrage, protection. Et en cas de danger : 15, 112, 3114.", 8],
  ],
  plusLoin: `
    <p>Bull-Out s’appuie sur trois modèles parmi les plus étudiés en psychologie et en santé au travail. Aucun n’est parfait. Voici comment ils ont été construits, ce qu’ils montrent, et ce qu’ils ne montrent pas.</p>
    <h3>Maslach : décrire le burn-out</h3>
    <p>Au milieu des années 1970, la psychologue <b>Christina Maslach</b> (université de Berkeley) interroge et observe des professionnels de l’aide : infirmières, travailleurs sociaux, avocats commis d’office. Elle remarque des récits très proches : épuisement émotionnel, mise à distance des personnes aidées, sentiment de ne plus être efficace. Avec <b>Susan Jackson</b>, elle construit un questionnaire de 22 questions, le <b>Maslach Burnout Inventory</b> (1981). Des analyses statistiques (analyses factorielles) sur plus d’un millier de réponses confirment que les réponses se regroupent bien en trois dimensions. Une version pour tous les métiers suit en 1996.</p>
    <p><b>Ce qu’on en sait aujourd’hui</b> : l’épuisement est la dimension centrale et la plus solide. L’efficacité réduite est la plus indépendante des deux autres, et certains chercheurs la voient comme une conséquence plutôt qu’un signe. Maslach elle-même rappelle que son questionnaire <b>n’a pas de seuil diagnostique</b> : il mesure des intensités, pas une maladie. Le lien avec la dépression reste débattu, ce qui explique pourquoi Bull-Out insiste sur l’avis d’un professionnel. D’autres outils existent, comme l’Oldenburg Burnout Inventory (2003), le Copenhagen Burnout Inventory (2005) ou le Burnout Assessment Tool (2020).</p>
    <h3>JD-R : expliquer d’où vient l’usure</h3>
    <p>Le modèle <b>exigences-ressources</b> (Job Demands-Resources) est proposé en 2001 par <b>Evangelia Demerouti, Arnold Bakker</b> et leurs collègues, à partir d’une étude sur des salariés allemands de plusieurs secteurs. Il prolonge un modèle plus ancien, celui de <b>Robert Karasek</b> (1979), qui croisait la demande psychologique et la latitude de décision, puis le soutien social (Johnson, 1988). L’idée nouvelle : <b>toute exigence</b> et <b>toute ressource</b> peuvent entrer dans la balance, pas seulement la charge et l’autonomie.</p>
    <p>Le modèle décrit <b>deux processus</b>. Les exigences durables épuisent (processus de santé). Les ressources nourrissent l’engagement, et amortissent l’effet des exigences (processus de motivation). Des études longitudinales, qui suivent les mêmes personnes dans le temps, confirment ces deux voies. <b>Sa limite</b> : il est si souple que presque tout peut être une exigence ou une ressource. Il aide à chercher, il ne dit pas à l’avance ce qui compte dans ton poste.</p>
    <h3>Siegrist : le déséquilibre effort-récompense</h3>
    <p>Le sociologue de la santé <b>Johannes Siegrist</b> (université de Düsseldorf) part, dans les années 1980, d’études sur les maladies cardiovasculaires chez des ouvriers allemands. Son hypothèse : ce n’est pas seulement l’effort qui rend malade, c’est l’effort <b>sans réciprocité</b>. Il formalise le modèle effort-récompense (1996), avec trois formes de récompense : le salaire, l’estime, et les perspectives avec la sécurité de l’emploi. Le rapport entre effort et récompense se calcule ; au-dessus de 1, il y a déséquilibre. Il ajoute un trait personnel, le <b>surengagement</b>, qui aggrave l’effet du déséquilibre.</p>
    <p><b>Ce qu’on en sait</b> : de grandes cohortes, comme Whitehall II (des milliers de fonctionnaires britanniques suivis pendant des années), et des méta-analyses associent ce déséquilibre à un risque plus élevé de maladies cardiovasculaires et de dépression. Ces associations sont robustes, mais modérées : elles parlent de risques à l’échelle d’un groupe, pas du destin d’une personne.</p>
    <h3>Et en France ?</h3>
    <p>En 2011, le collège d’expertise présidé par <b>Michel Gollac</b> a proposé six familles de facteurs de risques psychosociaux : l’intensité et le temps de travail, les exigences émotionnelles, le manque d’autonomie, la mauvaise qualité des rapports sociaux, les conflits de valeurs et l’insécurité de la situation de travail. On y retrouve les trois modèles. En 2019, l’OMS a précisé dans sa classification (CIM-11) que le burn-out est un <b>phénomène lié au travail</b>, et non une maladie médicale.</p>
    <h3>Les limites communes</h3>
    <ul>
      <li>La plupart des études reposent sur des <b>questionnaires remplis par les personnes</b> elles-mêmes, ce qui mélange parfois l’état et la perception.</li>
      <li>Beaucoup sont <b>transversales</b> (une photo à un instant) : elles montrent des liens, pas toujours des causes. Les études longitudinales, plus rares, vont pourtant dans le même sens.</li>
      <li>Les effets mesurés sont <b>des moyennes</b> : deux personnes avec le même score peuvent vivre des situations très différentes.</li>
    </ul>
    <p>C’est pour ça que le questionnaire Bull-Out <b>s’inspire</b> de ces modèles sans prétendre poser un diagnostic. Le détail des questions, du barème et des sources est dans <a href="methode.html">Méthode et limites</a>.</p>`,
};

// ───────────────────────────── Pour aller plus loin : un volet replié à la fin de chaque chapitre.
// Ce qui a été étudié, comment, et ce que la recherche ne sait pas encore. Facultatif, mais vérifiable.
export const plusLoin = [
  // 1
  { titre: "d’où vient le mot, et ce que dit l’OMS", html: `
    <h3>Un mot né sur le terrain</h3>
    <p>Le mot apparaît dans la littérature scientifique en <b>1974</b>, sous la plume du psychiatre new-yorkais <b>Herbert Freudenberger</b>. Il décrit l’épuisement des bénévoles d’une clinique gratuite, et le sien. Au même moment, la psychologue <b>Christina Maslach</b> observe les mêmes récits chez des soignants et des travailleurs sociaux (chapitre 2). Le burn-out naît donc d’observations cliniques, avant d’être mesuré.</p>
    <h3>Ce que dit l’OMS</h3>
    <p>Dans sa classification internationale (<b>CIM-11</b>, adoptée en 2019, en vigueur depuis 2022), l’OMS décrit le burn-out comme un <b>syndrome résultant d’un stress chronique au travail qui n’a pas été géré avec succès</b>. Elle retient trois dimensions : l’épuisement, la distance mentale ou le cynisme vis-à-vis du travail, et une efficacité professionnelle réduite. Deux précisions comptent : il <b>ne s’applique qu’au contexte du travail</b>, et il est classé parmi les « facteurs influant sur l’état de santé », <b>pas parmi les maladies</b>. En France, la Haute Autorité de santé a publié en 2017 une fiche de repérage et de prise en charge à destination des médecins.</p>
    <h3>Pourquoi le repos est un bon test</h3>
    <p>La recherche sur la <b>récupération</b> (Sabine Sonnentag et ses collègues, depuis les années 2000) montre que le repos répare quand il permet quatre choses : se <b>détacher</b> mentalement du travail, se <b>détendre</b>, vivre des expériences qui donnent un sentiment de <b>maîtrise</b>, et garder le <b>contrôle</b> de son temps libre. Quand le travail envahit les soirées et les week-ends, ces quatre leviers s’éteignent. C’est pour ça qu’une fatigue qui ne passe plus avec le repos est un signal.</p>
    <h3>Ce qui reste débattu</h3>
    <p>Le recouvrement entre burn-out et <b>dépression</b> fait débat : certains chercheurs (dont Renzo Bianchi) estiment que les deux se confondent largement, d’autres défendent une distinction. En pratique, ce débat ne change pas le réflexe : si l’humeur, le sommeil ou l’envie de vivre se dégradent, on consulte.</p>` },
  // 2
  { titre: "comment le modèle de Maslach a été construit", html: `
    <p>Au milieu des années 1970, <b>Christina Maslach</b> (université de Berkeley) interroge des professionnels de l’aide : infirmières, travailleurs sociaux, avocats commis d’office. Les récits se ressemblent : épuisement émotionnel, mise à distance des personnes aidées, sentiment de ne plus être efficace. Avec <b>Susan Jackson</b>, elle construit un questionnaire de 22 questions, le <b>Maslach Burnout Inventory</b> (1981). Des analyses statistiques (analyses factorielles) sur plus d’un millier de réponses montrent que les réponses se regroupent bien en <b>trois dimensions</b>. Une version pour tous les métiers suit en 1996 : épuisement, cynisme, efficacité professionnelle.</p>
    <h3>Ce qu’on en sait aujourd’hui</h3>
    <ul>
      <li>L’<b>épuisement</b> est la dimension centrale et la plus solide.</li>
      <li>Le <b>cynisme</b> est souvent décrit comme une réponse à l’épuisement : on investit moins pour se protéger. Michael Leiter et Christina Maslach ont proposé cet enchaînement ; les études le confirment en partie seulement.</li>
      <li>L’<b>efficacité réduite</b> est la plus indépendante des deux autres. Certains chercheurs y voient une conséquence plutôt qu’un signe.</li>
      <li>Le questionnaire <b>n’a pas de seuil diagnostique</b> : il mesure des intensités, pas une maladie. Ses auteurs déconseillent de classer les personnes en « burn-out » ou « pas burn-out » à partir d’un score.</li>
    </ul>
    <p>D’autres questionnaires existent : l’Oldenburg Burnout Inventory (2003), le Copenhagen Burnout Inventory (2005) ou le Burnout Assessment Tool (2020), qui ajoute des troubles de la concentration et de l’émotion.</p>` },
  // 3
  { titre: "comment le modèle exigences-ressources a été construit", html: `
    <h3>Un héritier de Karasek</h3>
    <p>En 1979, le sociologue <b>Robert Karasek</b> propose un premier modèle : le travail devient pesant quand une <b>forte demande</b> psychologique se combine à une <b>faible latitude</b> de décision. Le soutien social (collègues, hiérarchie) est ajouté en 1988 par Jeffrey Johnson. Ce modèle a été très étudié, notamment pour les maladies cardiovasculaires.</p>
    <h3>La balance, en 2001</h3>
    <p>Le modèle <b>exigences-ressources</b> (Job Demands-Resources) est proposé en 2001 par <b>Evangelia Demerouti, Arnold Bakker</b> et leurs collègues, à partir d’une étude sur des salariés allemands de plusieurs secteurs. L’idée nouvelle : <b>toute exigence</b> et <b>toute ressource</b> peuvent entrer dans la balance, pas seulement la charge et l’autonomie. Le modèle décrit <b>deux processus</b> : les exigences durables épuisent ; les ressources nourrissent l’engagement et amortissent l’effet des exigences. Des études qui suivent les mêmes personnes pendant plusieurs années confirment ces deux voies.</p>
    <h3>Pourquoi perdre une ressource pèse lourd</h3>
    <p>La théorie de la <b>conservation des ressources</b> (Stevan Hobfoll, 1989) va dans le même sens : nous cherchons à protéger ce qui nous aide, et une <b>perte</b> de ressource pèse davantage qu’un gain équivalent. C’est ce qui arrive à Sam quand Marc part sans être remplacé.</p>
    <h3>Sa limite</h3>
    <p>Le modèle est si souple que presque tout peut être une exigence ou une ressource. Il aide à chercher dans un poste précis ; il ne dit pas à l’avance ce qui compte dans le tien.</p>` },
  // 4
  { titre: "comment le modèle effort-récompense a été construit", html: `
    <p>Le sociologue de la santé <b>Johannes Siegrist</b> (université de Düsseldorf) part, dans les années 1980, d’études sur les maladies cardiovasculaires chez des ouvriers allemands. Son hypothèse : ce n’est pas seulement l’effort qui rend malade, c’est l’effort <b>sans réciprocité</b>. Il formalise le modèle effort-récompense en 1996, avec trois formes de récompense : le salaire, l’estime, et les perspectives avec la sécurité de l’emploi.</p>
    <p>Le questionnaire associé permet de calculer un <b>rapport entre effort et récompense</b> : au-dessus de 1, il y a déséquilibre. Siegrist ajoute un trait personnel, le <b>surengagement</b> (du mal à dire non, à décrocher), qui aggrave l’effet du déséquilibre.</p>
    <h3>Ce qu’on en sait</h3>
    <p>De grandes cohortes, comme <b>Whitehall II</b> (des milliers de fonctionnaires britanniques suivis pendant des années), et des méta-analyses associent ce déséquilibre à un risque plus élevé de <b>maladies cardiovasculaires</b> et de <b>dépression</b>. Ces liens sont solides, mais d’ampleur modérée : ils décrivent des risques à l’échelle d’un groupe, pas le destin d’une personne.</p>
    <h3>En France</h3>
    <p>En 2011, le collège d’expertise présidé par <b>Michel Gollac</b> a retenu six familles de facteurs de risques psychosociaux : l’intensité et le temps de travail, les exigences émotionnelles, le manque d’autonomie, les rapports sociaux dégradés, les conflits de valeurs et l’insécurité de la situation de travail. Le manque de reconnaissance y figure en bonne place.</p>` },
  // 5
  { titre: "facteurs personnels et facteurs de travail", html: `
    <h3>Le modèle stress-vulnérabilité</h3>
    <p>En santé mentale, on décrit depuis la fin des années 1970 un modèle <b>stress-vulnérabilité</b> : chacun a un seuil, qui dépend de son histoire, de sa santé et de ce qu’il vit ; les contraintes s’ajoutent jusqu’à le dépasser. Une séparation, un deuil ou une maladie baissent le seuil. Ils n’expliquent pas à eux seuls ce qui le fait dépasser.</p>
    <h3>Ce que montrent les études</h3>
    <p>Des méta-analyses trouvent des liens entre certains traits de personnalité (comme une forte sensibilité émotionnelle) et le burn-out. Mais les facteurs liés au travail pèsent au moins autant. Christina Maslach et Michael Leiter en décrivent six : la charge, le contrôle, la reconnaissance, la qualité du collectif, l’équité et l’accord avec les valeurs du travail. Ce sont des leviers sur lesquels on peut agir, contrairement à la personnalité.</p>
    <h3>Ce que ça change en pratique</h3>
    <p>La prévention commence par ce qui est modifiable et touche tout le monde : l’organisation du travail. C’est aussi ce que demande la loi (chapitre 8). Soutenir une personne fragilisée reste utile, mais en plus, pas à la place.</p>` },
  // 6
  { titre: "biomarqueurs, questionnaires et seuils", html: `
    <h3>Le cortisol</h3>
    <p>Le cortisol varie selon l’heure, le sommeil, l’alimentation, les médicaments et la façon dont l’échantillon est prélevé. Les revues de la littérature sur les marqueurs biologiques du burn-out (par exemple Danhof-Pont et ses collègues, 2011) concluent qu’<b>aucun marqueur</b> ne permet de le diagnostiquer : les résultats des études vont dans des sens différents, et les différences trouvées sont des moyennes de groupe.</p>
    <h3>Les questionnaires</h3>
    <p>Un questionnaire bien construit est <b>fiable</b> (il donne des résultats stables) et <b>valide</b> (il mesure bien ce qu’il prétend mesurer). Même dans ce cas, un score individuel comporte une <b>marge d’erreur</b> : deux points d’écart ne veulent souvent rien dire. Les seuils (« à partir de tant, c’est un burn-out ») sont des conventions, pas des frontières naturelles.</p>
    <h3>Ce que ça change pour ton rapport</h3>
    <p>Le rapport Bull-Out se lit dimension par dimension, et comme un point de départ pour en parler. Le détail des questions, du barème et des limites est dans <a href="methode.html">Méthode et limites</a>.</p>` },
  // 7
  { titre: "ce que la recherche dit des actions qui marchent", html: `
    <h3>Individuel ou organisationnel ?</h3>
    <p>Les interventions contre l’épuisement se rangent en deux familles : celles qui aident la personne (gestion du stress, méditation, entraînement à la résilience) et celles qui changent le travail (charge, horaires, organisation des équipes, soutien des managers). Des méta-analyses chez les médecins, publiées en 2016 (West et ses collègues, <i>The Lancet</i>) et en 2017 (Panagioti et ses collègues, <i>JAMA Internal Medicine</i>), trouvent que les deux réduisent le burn-out, avec des effets <b>modestes</b>, et des effets un peu plus nets pour les actions sur l’organisation.</p>
    <h3>Combiner, et durer</h3>
    <p>Les synthèses en santé au travail (par exemple Anthony LaMontagne et ses collègues, 2007) concluent que les approches les plus efficaces <b>combinent</b> les trois niveaux de prévention, en commençant par l’organisation. Les actions ponctuelles, comme une formation isolée, ont rarement un effet durable.</p>
    <h3>Les limites</h3>
    <p>Les études sont souvent courtes, faites dans quelques secteurs (surtout la santé), et de qualité inégale. Elles convergent pourtant sur un point : agir sur le travail ne nuit jamais, et une action individuelle seule laisse la cause en place.</p>` },
  // 8
  { titre: "les textes et les grandes décisions", html: `
    <h3>Une obligation qui s’est durcie, puis précisée</h3>
    <ul>
      <li><b>2002</b> : dans les arrêts sur l’amiante, la Cour de cassation parle d’une obligation de sécurité « de résultat », et définit la <b>faute inexcusable</b> : l’employeur avait ou aurait dû avoir conscience du danger, et n’a pas pris les mesures pour en préserver le salarié.</li>
      <li><b>2008 et 2010</b> : deux accords nationaux interprofessionnels, sur le stress au travail puis sur le harcèlement et la violence, engagent les entreprises à prévenir ces risques.</li>
      <li><b>2015</b> : l’arrêt « Air France » précise que l’employeur peut s’exonérer s’il prouve avoir pris toutes les mesures de prévention prévues par la loi. La même année, la loi « Rebsamen » inscrit dans le Code de la sécurité sociale que les <b>pathologies psychiques</b> peuvent être reconnues comme maladies professionnelles.</li>
      <li><b>2019 à 2025</b> : dans l’affaire <b>France Télécom</b>, le tribunal correctionnel (2019), la cour d’appel (2022) puis la Cour de cassation (2025) retiennent un <b>harcèlement moral institutionnel</b> : une politique d’entreprise peut constituer un harcèlement, même sans viser une personne en particulier.</li>
    </ul>
    <h3>Les articles à connaître</h3>
    <p>Code du travail : L4121-1 et L4121-2 (obligation et principes de prévention), L4121-3 et R4121-1 (évaluation des risques, document unique), L4122-1 (obligations de chaque salarié), L4131-1 (droit d’alerte et de retrait), L1152-1 à L1152-6 (harcèlement moral). Code pénal : 222-33-2 (harcèlement moral). Code de la sécurité sociale : L452-1 (faute inexcusable), L461-1 (maladies professionnelles).</p>
    <p class="fo-small">Ces repères sont une synthèse. Le droit évolue, et chaque situation dépend de ses faits : pour une démarche, prends conseil auprès d’un avocat, d’un syndicat ou de l’inspection du travail.</p>` },
  // 9
  { titre: "le suivi de santé au travail et le retour après un arrêt", html: `
    <h3>Ce que la loi de 2021 a changé</h3>
    <p>La loi du 2 août 2021 pour renforcer la prévention en santé au travail a créé, entre autres, le <b>rendez-vous de liaison</b> : pendant un arrêt de plus de 30 jours, l’employeur peut proposer un échange (que le salarié est libre d’accepter) pour préparer le retour, avec le service de prévention et de santé au travail. Elle a aussi fixé la <b>visite de pré-reprise</b> à partir de 30 jours d’arrêt, et la <b>visite de reprise</b> après 60 jours d’arrêt pour une maladie non professionnelle.</p>
    <h3>Ce qui aide à revenir</h3>
    <p>Les revues de la littérature sur le retour au travail après un trouble psychique (dont une revue Cochrane mise à jour en 2020) trouvent des bénéfices aux interventions qui <b>associent</b> le soin et des changements dans le travail, comme une reprise progressive ou des tâches adaptées. Les preuves restent de qualité limitée, mais elles vont dans le même sens que l’expérience des médecins du travail : revenir dans exactement le même travail expose à rechuter.</p>
    <h3>Le 3114</h3>
    <p>Le numéro national de prévention du suicide, ouvert en 2021, est joignable 24 h/24, gratuitement. Il répond aux personnes en détresse, à leurs proches, et aux professionnels qui s’inquiètent pour quelqu’un.</p>` },
];
chapitres.forEach((c, i) => { c.plusLoin = plusLoin[i]; });
