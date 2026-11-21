// Formation Bull-Out : onze chapitres progressifs, un fil rouge (Sam, 38 ans), un exercice par chapitre.
// Chaque chapitre suit le même gabarit : ce que tu sauras faire, l’idée reçue de départ, l’essentiel,
// des exemples concrets, le piège de raisonnement, l’exercice, et la pièce du rapport qu’il éclaire.
// Le contenu de l’ancienne page « Managers » est intégré aux chapitres 6, 9, 10 et 11 : il concerne tout le monde.

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
    "<b>Onze chapitres progressifs</b>, de 5 à 10 minutes chacun (environ 75 minutes de lecture), une synthèse, puis un test final qui te donne ton diplôme : c’est lui qui ouvre le questionnaire.",
    "<b>En plusieurs fois, si tu veux.</b> Rien n’est gardé sur ce site : « Enregistrer ma progression » télécharge un petit fichier, « Reprendre un fichier » te ramène où tu en étais.",
    "<b>Des sources à chaque chapitre</b>, et les points encore débattus sont signalés.",
  ],
  essentiel: [
    "L’intensité de la fatigue ne suffit pas : sa durée, sa trajectoire et ce que le repos te rend aident à comprendre la situation.",
    "Le burn-out a trois signes : l’épuisement, la distance mentale et la baisse d’efficacité. La fatigue n’est que le premier.",
    "L’usure s’installe quand ce que le travail demande pèse durablement plus que ce qui aide à le faire.",
    "Donner beaucoup pour peu de retour use aussi, et le surengagement rend le problème invisible.",
    "L’absurde n’est pas un détail comique : c’est une exigence qui gêne sans rien rapporter. Ce qui compte aussi, c’est ce que tu en fais.",
    "Un facteur personnel peut rendre plus vulnérable. Il ne dispense jamais de regarder le travail.",
    "Aucun dosage ne diagnostique un burn-out, et un score se lit dimension par dimension.",
    "Pas de burn-out ne veut pas dire pas de risque : on peut être exposé·e sans être usé·e, et ça se traite quand même.",
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
      { t: "h", texte: "Le modèle effort-récupération" },
      { t: "p", html: "Ce critère a un nom : le modèle <b>effort-récupération</b> (Meijman et Mulder, 1998). Tout travail coûte un effort, et c’est normal. Ce qui use, c’est de repartir avant d’avoir récupéré : la fatigue s’additionne d’un jour sur l’autre. Pour récupérer, il faut surtout <b>décrocher</b> (ne plus penser au travail), <b>dormir</b>, et <b>garder ce qui ressource</b> : un sport, des amis, du temps à soi (Sonnentag et Fritz, 2007)." },
      { t: "p", html: "Chez Léa, la boucle se referme : effort, fatigue, repos, et elle repart. Chez Sam, elle reste ouverte : il rumine le dimanche soir, dort mal, a lâché ses soirées. C’est cette boucle qui sera <b>au centre de ton schéma</b>." },
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
        ["Harcèlement ou violence", "Humiliations, menaces, isolement, propos dégradants répétés.", "Protection, traces écrites, interlocuteurs compétents (chapitres 10 et 11)."],
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
    piece: { nom: "Ta fatigue et ton corps", texte: "Au centre de ton rapport, la question de ce chapitre : le repos te rend-il ce que le travail te prend ? L’épuisement, décrocher le soir, dormir, et ce que change un congé. À droite, ce que la fatigue abîme quand elle dure : symptômes, erreurs, ce qu’on prend pour tenir.", rapport: "la jauge « Ta fatigue », la case « Ta fatigue » et la case « Ton corps »." },
    suite: "Si le burn-out a trois signes, pourquoi ne regarde-t-on souvent que la fatigue ? C’est la question du chapitre suivant.",
  },

  // ───────────────────────────── 2
  {
    temps: 0,
    court: "Les trois signes",
    titre: "Les trois signes : s’épuiser, se détacher, douter de soi",
    duree: 8,
    savoir: [
      "Reconnaître les trois signes décrits par Christina Maslach, et pourquoi la fatigue n’est que le premier.",
      "Comprendre pourquoi le cynisme peut être une protection, et la baisse d’efficacité une conséquence plutôt qu’une incompétence.",
    ],
    arrive: "« Je ne suis pas fatigué, juste dégoûté : ce n’est donc pas de l’usure. » Ou : « Je deviens cynique, c’est mon caractère. » Ce chapitre montre que ces deux phrases décrivent souvent des signes à part entière.",
    retenir: "La psychologue Christina Maslach a structuré le burn-out autour de <b>trois dimensions distinctes</b> : épuisement, cynisme ou distance, et efficacité professionnelle diminuée. Elles peuvent coexister sans suivre obligatoirement un ordre. Regarder les trois évite de réduire l’usure à la fatigue.",
    blocs: [
      { t: "h", texte: "D'où vient le modèle de Maslach ?" },
      { t: "p", html: "Dans les années 1970, Christina Maslach étudie l'épuisement de professionnels engagés dans des relations humaines difficiles. Avec Susan Jackson, elle développe ensuite le <b>Maslach Burnout Inventory</b> (MBI, 1981), et les travaux avec Schaufeli et Leiter préciseront les trois dimensions. Ce modèle répond d'abord à la question <b>« Que vit la personne au travail ? »</b>, pas à « Qui est responsable ? »." },
      { t: "cartes", items: [
        ["Épuisement", "<b>Énergie entamée.</b> Fatigue émotionnelle, cognitive ou physique : Sam doit mobiliser davantage d'effort pour faire ce qui était habituel."],
        ["Cynisme / distance", "<b>Rapport au travail qui se refroidit.</b> Sam s'éloigne mentalement des tâches ou des interlocuteurs. Cela peut être une réaction à une exposition pénible ; ce n'est pas automatiquement une stratégie efficace."],
        ["Efficacité diminuée", "<b>Impression de moins bien accomplir son métier.</b> Le sentiment d'efficacité et les erreurs observées ne sont pas identiques : l'un est subjectif, l'autre demande des faits."],
      ] },
      { t: "p", html: "<b>Comment l'utiliser ?</b> Observe ces dimensions séparément. Une fatigue élevée sans cynisme ne raconte pas la même chose qu'un cynisme marqué avec peu de fatigue. La coexistence de plusieurs signaux oriente la discussion ; <b>elle ne révèle pas une séquence obligatoire, une cause ni un diagnostic</b>." },
      { t: "p", html: "<b>Limite :</b> le MBI est un instrument psychométrique particulier ; les questions de Bull-Out sont reformulées, mélangées à d'autres thèmes et dotées de seuils internes non étalonnés. On ne peut pas leur transférer la validation du MBI ni conclure que le travail a causé chacun des signes." },
      { t: "h", texte: "Trois signes, pas un" },
      { t: "fig", ill: "jauges", cap: "Trois signes distincts. Ils montent souvent ensemble, mais pas toujours au même rythme." },
      { t: "p", html: "Quatre semaines après le vendredi du chapitre 1, voici ce que Sam dit de lui, dans ses mots :" },
      { t: "cartes", items: [
        ["« Je suis vidé »", "<b>L’épuisement</b>. Le corps et la tête n’ont plus de réserve. Le matin, la journée paraît déjà longue."],
        ["« À quoi bon ? »", "<b>La distance mentale</b>. Sam se détache des clients, des projets, des collègues. Il répond plus sèchement, ironise, en fait le minimum."],
        ["« Je n’y arrive plus »", "<b>L’efficacité réduite</b>. Il oublie une livraison, se trompe sur un bon de commande, doute de ce qu’il sait faire."],
      ] },
      { t: "h", texte: "Le cynisme, une protection qui se retourne" },
      { t: "exemple", titre: "Le Sam d’avant, le Sam d’aujourd’hui", html: "Il y a un an, quand un client changeait d’avis, Sam reprenait le planning avec soin et l’appelait pour expliquer. Aujourd’hui, il soupire : « de toute façon, ils changeront encore d’avis ». Il n’a pas changé de caractère. Il a cessé d’investir ce qui lui coûte trop.", note: "Chez Sam, la distance semble réduire son investissement immédiat ; on ne sait pas si elle l’aide réellement à récupérer. Elle peut aussi éloigner des collègues et du sens." },
      { t: "p", html: "Le cynisme est souvent pris pour un trait de personnalité, ou pour de la mauvaise volonté. Dans la lecture de Maslach, cela peut être <b>une manière de se mettre à distance</b> : quand on ne peut plus tout donner, on donne moins. Mais ce mécanisme reste une hypothèse à vérifier chez Sam. C’est compréhensible. Mais c’est aussi un signe qu’il faut regarder, même si la fatigue n’est pas au premier plan." },
      { t: "h", texte: "Moins efficace ne veut pas dire incompétent" },
      { t: "p", html: "Quand l’efficacité baisse, la réponse réflexe est souvent individuelle : « il faut te former », « tu dois mieux t’organiser ». Or l’usure abîme d’abord l’attention, la mémoire et le sommeil. Les erreurs de Sam ne disent pas qu’il a oublié son métier : elles disent qu’<b>il travaille avec des réserves vides</b>." },
      { t: "mythes", titre: "Trois idées reçues", items: [
        ["« Le MBI diagnostique le burn-out »", "Le Maslach Burnout Inventory est un questionnaire de recherche. Il compare des groupes. Il n’a pas de seuil validé pour dire qu’une personne « est » en burn-out. Bull-Out s’inspire de ses trois dimensions sans le copier, et sans prétendre diagnostiquer."],
        ["« Burn-out égale fatigue extrême »", "On peut être très fatigué sans burn-out (après une naissance, par exemple), et en burn-out avec une distance mentale au premier plan. C’est la combinaison des signes, et leur lien avec le travail, qui compte."],
        ["« Si j’aime mon travail, je suis protégé »", "C’est souvent l’inverse. Les personnes les plus engagées donnent plus, compensent plus, et s’épuisent parfois plus vite. L’engagement n’est pas un défaut : c’est une raison de plus de surveiller la charge."],
      ] },
      { t: "principe", html: "Un signe n’est pas une étiquette. Trois signes hauts déclenchent une analyse du travail, pas un verdict sur la personne." },
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
      ["Maslach, Schaufeli & Leiter (2001) · Job burnout, Annual Review of Psychology", "https://doi.org/10.1146/annurev.psych.52.1.397"],
      ["Maslach & Leiter (2016) · Understanding the burnout experience, World Psychiatry", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4911781/"],
      ["Schaufeli, Leiter & Maslach (2009) · Burnout: 35 years of research and practice", "https://www.wilmarschaufeli.nl/publications/Schaufeli/311.pdf"],
      ["INRS · les manifestations de l’épuisement professionnel", "https://www.inrs.fr/risques/epuisement-burnout/ce-qu-il-faut-retenir.html"],
    ],
    nechange: "Repérer un signe ne t’oblige à rien. Mais un cynisme qui s’installe ou des erreurs inhabituelles sont des informations, pas des défauts à cacher.",
    piece: { nom: "Ta relation au travail", texte: "Ton rapport regarde séparément les trois signes de Maslach, marqués M : l’épuisement, déjà dans ta fatigue, puis la distance et la perte d’efficacité, avec le sens à part. Pour ne pas réduire l’usure à la fatigue.", rapport: "la case « Ta relation au travail », les pastilles M et les dimensions « Épuisement », « Distance mentale » et « Perte d’efficacité et de sens »." },
    suite: "Ces trois signes décrivent ce que tu vis. Ils ne disent pas ce qui, dans le travail, les produit. C’est le rôle du chapitre suivant.",
  },

  // ───────────────────────────── 3
  {
    temps: 1,
    court: "La balance",
    titre: "La balance : ce que le travail demande, ce qui aide à le faire",
    duree: 9,
    savoir: [
      "Classer ce qui se passe au travail en exigences et en ressources.",
      "Expliquer pourquoi la même charge peut être tenable pour l’un et usante pour l’autre.",
    ],
    arrive: "« C’est la charge : il y a trop de travail. » Parfois, oui. Mais la quantité n’explique pas tout. Deux postes aussi chargés peuvent user très différemment, selon ce qui aide à tenir.",
    retenir: "Le modèle exigences–ressources (JD-R) regarde le travail comme <b>une balance à deux plateaux</b>. D’un côté, ce qu’il demande. De l’autre, ce qui aide à le faire. Des exigences fortes ou durables associées à des ressources insuffisantes <b>augmentent le risque d’épuisement</b>. La balance est une image pédagogique, pas une formule.",
    blocs: [
      { t: "h", texte: "Le modèle JD-R : d'où vient-il et comment fonctionne-t-il ?" },
      { t: "p", html: "Demerouti, Bakker, Nachreiner et Schaufeli proposent en 2001 le modèle <b>Job Demands–Resources</b> (JD-R). Leur idée : pour comprendre l'usure, il faut décrire le <b>travail concret</b>, pas seulement les symptômes. Une exigence est un aspect qui réclame un effort soutenu ; une ressource aide à atteindre les objectifs, réduit certains coûts ou favorise l'apprentissage." },
      { t: "cartes", items: [
        ["Processus d'usure", "<b>Exigences fortes ou durables → coûts physiologiques et psychologiques.</b> Par exemple, délais intenables, interruptions et charge émotionnelle peuvent alimenter l'épuisement."],
        ["Processus motivationnel", "<b>Ressources suffisantes → possibilité de s'engager et de travailler utilement.</b> Autonomie, soutien et retours concrets ne sont pas simplement des « pauses »."],
        ["Effet tampon possible", "<b>Une ressource peut amortir certaines exigences.</b> Une équipe de renfort change l'effet d'un pic de charge ; elle ne transforme pas automatiquement une charge illimitée en travail soutenable."],
      ] },
      { t: "p", html: "<b>Comment l'appliquer à Sam ?</b> Reconstituer deux colonnes : ce qui lui demande un effort, et ce qui lui donne réellement des moyens. Puis chercher une <b>décision observable</b> : supprimer deux réunions, clarifier un arbitrage, rétablir un relais. Une appréciation positive du manager ne remplace pas un moyen de faire le travail." },
      { t: "p", html: "<b>Limite :</b> JD-R décrit des relations étudiées entre groupes et situations de travail. La « balance » est une <b>métaphore pédagogique</b>, pas une loi où 15 points de ressources annulent mécaniquement 15 points d'exigences. Dans Bull-Out, ces deux familles sont des réponses autodéclarées, non des mesures directes de l'organisation." },
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
      { t: "h", texte: "Une spirale de perte : l'éclairage complémentaire de Hobfoll" },
      { t: "p", html: "La théorie <b>Conservation of Resources</b> (COR), proposée par Stevan Hobfoll en 1989, décrit le stress comme une menace de perte, une perte réelle ou l'insuffisance des ressources obtenues après un investissement. Dans l'histoire de Sam, manquer d'un collègue l'oblige à travailler le soir ; il perd du repos ; la fatigue rend certaines tâches plus coûteuses. <b>La perte peut nourrir une autre perte.</b>" },
      { t: "exemple", titre: "Une spirale, pas une fatalité", html: "Marc part → Sam récupère son dossier → les soirées se raccourcissent → Sam fait davantage d'erreurs → les urgences se multiplient. Chaque flèche est une <b>hypothèse sur les mécanismes</b>, à vérifier avec la chronologie réelle. Un remplacement ou un arbitrage explicite peut interrompre plusieurs maillons.", note: "COR complète la balance JD-R ; Bull-Out ne calcule pas de score COR et ne démontre aucune spirale chez une personne." },
      { t: "h", texte: "La récupération, le troisième élément" },
      { t: "p", html: "La récupération est un processus <b>complémentaire</b>, pas un troisième plateau formel dans le JD-R originel. Sonnentag et Fritz (2007) en distinguent quatre expériences : <b>détachement psychologique, relaxation, maîtrise d’activités hors travail et contrôle sur son temps libre</b>. Le soir, le week-end et la pause déjeuner offrent des occasions de récupérer, pas une garantie. Quand les mails arrivent à 22 h ou que le travail déborde sur le dimanche, ces expériences peuvent être compromises. La fatigue ne se « recharge » plus, et la balance penche un peu plus chaque semaine." },
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
      ["Hobfoll (1989) · Conservation of resources", "https://pubmed.ncbi.nlm.nih.gov/2648906/"],
      ["Sonnentag & Fritz (2007) · The recovery experience questionnaire", "https://pubmed.ncbi.nlm.nih.gov/17638488/"],
      ["INRS · les facteurs de risques psychosociaux", "https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html"],
    ],
    nechange: "Dire que le travail pèse n’accuse personne. C’est décrire une situation qu’on peut modifier, et c’est plutôt une bonne nouvelle.",
    piece: { nom: "Ton travail t’aide-t-il assez ?", texte: "Ton rapport pose tes réponses sur une pesée : d’un côté ce qu’on te demande, de l’autre ce qui t’aide (marge, manager, collègues, clarté). Une phrase dit de quel côté ça penche.", rapport: "la première pesée du schéma et les dimensions « Exigences » et « Manque de ressources »." },
    suite: "Il reste une question que la balance ne pose pas : qu’est-ce que tu reçois en retour de tout cet effort ?",
  },

  // ───────────────────────────── 4
  {
    temps: 1,
    court: "Trop pour trop peu",
    titre: "Donner trop pour trop peu : l’effort et le retour",
    duree: 8,
    savoir: [
      "Repérer un déséquilibre entre l’effort fourni et ce qu’on reçoit en retour : salaire, estime, perspectives, sécurité.",
      "Reconnaître le surengagement, et comprendre pourquoi il rend le problème invisible.",
    ],
    arrive: "« La reconnaissance, c’est du bonus. L’important, c’est la paie. » Ou : « Je ne me plains pas, j’aime bien rendre service. » Ce chapitre montre ce que ces phrases laissent de côté.",
    retenir: "Le sociologue Johannes Siegrist a montré que l’usure vient aussi d’une <b>réciprocité rompue</b> : beaucoup d’efforts, peu de retour. Et le retour n’est pas que l’argent : c’est aussi l’estime, les perspectives, la sécurité de l’emploi. Quand on compense sans compter, l’organisation s’habitue à l’anormal.",
    blocs: [
      { t: "h", texte: "Siegrist : un modèle de réciprocité sociale" },
      { t: "p", html: "Johannes Siegrist formalise en 1996 le modèle <b>Effort–Reward Imbalance</b> (ERI). Il part d'une relation sociale : au travail, on fournit un effort dans l'attente d'un retour jugé acceptable. Le retour ne se résume pas au salaire : <b>estime, possibilités d'avancement et sécurité de l'emploi</b> entrent dans cette reconnaissance. Quand l'échange paraît durablement déséquilibré, les recherches associent cette exposition à davantage de problèmes de santé." },
      { t: "cartes", items: [
        ["Effort extrinsèque", "<b>Ce que le poste exige.</b> Responsabilités, pression temporelle, obligations, sollicitations et contraintes de fonctionnement."],
        ["Récompenses", "<b>Ce qui revient à la personne.</b> Argent, considération, perspectives et stabilité ; une récompense juste n'est pas toujours monétaire."],
        ["Surengagement", "<b>Un mode d'investissement possible.</b> Difficulté à décrocher, besoin de prouver sa valeur, effort prolongé même quand la contrepartie diminue."],
      ] },
      { t: "p", html: "<b>Comment l'appliquer à Sam ?</b> Il porte deux dossiers, mais son entretien n'en tient pas compte. On doit distinguer <b>un fait</b> (le dossier supplémentaire), <b>un retour</b> (absence de reconnaissance perçue) et <b>une hypothèse</b> (l'effort devient coûteux parce que l'échange semble injuste). Puis demander ce qui rendrait cet échange plus juste." },
      { t: "p", html: "<b>Limite :</b> le modèle ERI a ses propres échelles et conventions. Bull-Out n'utilise pas l'échelle ERI validée : il reconstruit une lecture avec quelques items issus aussi de JD-R. Les deux modèles qui pointent une difficulté <b>ne sont pas deux confirmations indépendantes</b>." },
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
    piece: { nom: "Ce que tu donnes est-il payé ?", texte: "Ton rapport pèse ce que tu donnes contre ce que tu reçois (estime, équité, salaire, avenir), et regarde si tu es trop investi·e (dire non, vouloir prouver).", rapport: "la seconde pesée et la case « Trop investi·e ? »." },
    suite: "Donner beaucoup pour peu, c’est déjà lourd. Donner beaucoup pour rien, c’est pire : le chapitre suivant parle de l’absurde.",
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
      ["INRS / Gollac · les six familles des facteurs de RPS", "https://www.inrs.fr/risques/psychosociaux/facteurs-risques"],
      ["Ameli · risques psychosociaux et obligation de prévention", "https://www.ameli.fr/entreprise/sante-travail/risques/risques-psychosociaux-rps"],
    ],
    nechange: "Ta vie personnelle t’appartient. Tu n’as pas à la raconter pour qu’on regarde ta charge de travail.",
    piece: { nom: "Tes appuis et ta vie hors travail", texte: "Ton rapport note ce qui te tient (tes appuis), ce que tu portes à côté (une vie perso lourde, en pointillés) et ce que le travail te fait sacrifier (loisirs, liens). Ce qui est perso change la lecture, jamais le score.", rapport: "les cases « Tes appuis » et « Ta vie hors travail », les éléments de contexte, et les interlocuteurs qu’ils font proposer." },
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
          "Oui. Ni normal ni anormal, ce chiffre ne change ce qu’il faut faire. Ce qui compte : ses trois signes, sa balance, son retour.",
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
    piece: { nom: "Les trois jauges", texte: "Ton rapport résume chaque colonne par une jauge : ton travail, ta fatigue, les impacts. Un mot, pas un pourcentage ; une tendance, pas un diagnostic. Chaque dimension se lit ensuite une par une, sans total.", rapport: "les trois jauges en tête du rapport, et les scores par dimension avec la façon de les lire." },
    suite: "Avant d’agir, une dernière carte : les six familles de risques du travail. Elles mettent un nom officiel sur ce que montre ta colonne LE TRAVAIL.",
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
    piece: { nom: "Où agir", texte: "Ton rapport montre où agir, sous chaque colonne : sur le travail d’abord (retirer, reporter, simplifier), prendre soin de toi sans tout porter seul, suivre l’impact pour voir si ça bouge. Il propose des actions à 72 heures et à deux semaines, avec des phrases prêtes à l’emploi.", rapport: "la bande « Où agir » du schéma et le plan." },
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
    piece: { nom: "Depuis quand", texte: "Ton rapport date ce que tu vis : depuis quand, dans quel sens ça évolue, ce que change un congé. Il t’aide à garder une trace utile : des faits, des dates, des demandes précises, jamais ta santé.", rapport: "la bande « Depuis quand ? » du schéma, les actions « demander » et les phrases prêtes à l’emploi." },
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
      { t: "exemple", titre: "Le retour de Sam", html: "Pendant son arrêt, Sam demande une <b>visite de pré-reprise</b> avec le médecin du travail. Ensemble, ils listent ce qui l’a usé : le dossier de Marc, les réunions à 18 h 30, les mails du soir. À la <b>visite de reprise</b>, le médecin propose un temps partiel thérapeutique les deux premiers mois. Nadia, de son côté, a fait entrer un renfort sur le dossier de Marc.", note: "Revenir au même poste, avec la même charge, c’est retrouver les mêmes causes d’usure." },
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
    piece: { nom: "Les portes", texte: "Ton rapport propose une porte par zone (le travail, toi, entre les deux), selon tes réponses, et garde la sécurité à part.", rapport: "la liste des interlocuteurs, et les numéros d’urgence en cas de signal d’alerte." },
    suite: "Tu as toutes les pièces. Avant le test final, la synthèse les rassemble : les quatre modèles, et les idées clefs à emporter.",
  },
];

// Test final : onze situations nouvelles, une par chapitre. Format : [question, choix, index de la bonne réponse, explication par choix].
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
    "Chaque lundi, Nora remplit un tableau de suivi que personne ne lit. Elle en rit avec ses collègues, mais depuis un mois elle y repense le soir et dort moins bien.",
    ["C’est drôle, donc ça ne l’use pas.", "L’absurde est une exigence qui gêne, et sa façon de le prendre a changé : rire puis ruminer, c’est à regarder, avec ce tableau à remettre en question.", "Elle manque de recul : elle devrait relativiser."],
    1,
    ["Rire n’empêche pas d’être usé·e. Ce qui alerte, c’est la rumination et le sommeil.", "Exact. On regarde la tâche (à quoi sert ce tableau ?) et la réaction (le rire a laissé place à la rumination).", "Relativiser ne retire pas la tâche. Son agacement est une information, pas un défaut."]
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
    "Karim dort bien et se sent efficace. Mais au questionnaire, il signale des humiliations répétées de la part d’un responsable.",
    ["Ses signes d’usure sont bas : il n’y a pas de sujet.", "C’est une exposition à examiner et à faire cesser, même sans fatigue : on cherche les faits datés et un interlocuteur sûr.", "Le questionnaire prouve un harcèlement."],
    1,
    ["Pas de burn-out ne veut pas dire pas de risque : l’exposition se traite avant les symptômes.", "Exact. La jauge du travail dit l’exposition, les autres l’usure. On agit sur l’exposition sans attendre.", "Un questionnaire ne qualifie pas des faits. Il déclenche une vérification et une protection."]
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

// ───────────────────────────── Synthèse : les quatre modèles, les idées clefs, et « pour aller plus loin ».
export const synthese = {
  chapo: "Onze chapitres, quatre modèles principaux et trois éclairages complémentaires. Avant le test final, compare leurs questions sur une même histoire : la distinction entre <b>ce que le repos rend à Sam</b>, <b>ce qu’il ressent</b>, <b>ce que le travail lui demande</b> et <b>ce qu’il reçoit en retour</b> rend les décisions plus précises.",
  modeles: [
    { nom: "Effort-récupération", question: "Le repos répare-t-il encore la fatigue ?", image: "La boucle", idee: "Travailler fatigue, c’est normal. L’usure commence quand la récupération ne suit plus : ne plus décrocher, mal dormir, abandonner ses loisirs (Meijman et Mulder, Sonnentag).", agir: "Protéger un vrai temps de coupure, et regarder ce qui, dans le travail, empêche de décrocher : messages du soir, urgences, rumination.", chap: 0 },
    { nom: "Maslach", question: "Qu’est-ce que l’usure fait à la personne ?", image: "Les trois signes", idee: "Le burn-out, ce sont trois signes : l’épuisement, la distance mentale, la baisse d’efficacité. La fatigue n’est que le premier.", agir: "Regarder les trois signes, pas seulement la fatigue. Le cynisme et le doute de soi sont des signaux, pas des défauts.", chap: 1 },
    { nom: "JD-R", question: "Quelles conditions favorisent l’usure ?", image: "La balance", idee: "Des exigences fortes ou durables peuvent favoriser l’épuisement ; des ressources adaptées soutiennent le travail et l’engagement. Les effets varient selon la situation.", agir: "Réduire une exigence ou renforcer une ressource réelle : arbitrer un dossier, ajouter un relais, préserver du temps ou de l’autonomie.", chap: 2 },
    { nom: "Siegrist", question: "Que reçoit-on en retour de ses efforts ?", image: "La bascule", idee: "Un effort élevé associé à des récompenses faibles peut être délétère. Le surengagement peut entretenir le déséquilibre, sans être systématique.", agir: "Rendre l’effort visible, agir sur sa charge et examiner les retours : estime, perspectives, rémunération et sécurité.", chap: 3 },
  ],
  // Un même épisode concret, lu par les quatre modèles sans les confondre.
  casCommun: {
    situation: "Pendant trois mois, Sam reprend le dossier d'un collègue sans remplacement. Il s'endort en pensant aux livraisons, devient sec en réunion et dit : « Je fais deux postes, personne ne le voit ».",
    lectures: [
      { modele:"Effort-récupération", observe:"Sam s'endort en pensant aux livraisons ; le week-end ne le répare plus.", neDitPas:"Que Sam « ne sait pas se reposer ».", action:"Rendre un vrai temps de coupure possible : plus de messages le soir, un relais pendant les congés." },
      { modele:"Maslach", observe:"Épuisement, distance nouvelle, doute sur sa fiabilité.", neDitPas:"Ce qui a créé ces signes.", action:"Examiner les manifestations et leur retentissement ; proposer un avis clinique si nécessaire." },
      { modele:"JD-R", observe:"Dossiers et interruptions en hausse ; relais, autonomie et récupération en baisse.", neDitPas:"Un nombre exact d'exigences à retirer pour guérir.", action:"Retirer, reporter ou partager le dossier supplémentaire ; rétablir les moyens." },
      { modele:"Siegrist (ERI)", observe:"Effort supplémentaire visible, mais retour et perspectives insuffisants pour Sam.", neDitPas:"Que toute fatigue vient d'une injustice.", action:"Reconnaître factuellement l'effort et négocier les contreparties et les règles." },
    ],
    conclusion: "Ce sont <b>quatre questions différentes sur les mêmes faits</b> : récupération, signes, conditions, réciprocité. JD-R et ERI partagent même des informations. Les réunir améliore la discussion, pas la validité clinique des scores."
  },
  complements: [
    { nom:"Hobfoll · COR (1989)", role:"Pourquoi la situation peut s'aggraver par étapes", principe:"<b>Perdre une ressource peut entraîner d'autres pertes.</b> Le relais disparaît, les heures s'allongent, la récupération se réduit et les erreurs coûtent davantage.", exemple:"Chez Sam : un collègue non remplacé peut créer une spirale de surcharge.", limite:"Cadre mécanistique complémentaire, <b>pas un score COR</b> et aucune chaîne causale déduite des seules réponses.", lien:"https://pubmed.ncbi.nlm.nih.gov/2648906/" },
    { nom:"Gollac / INRS · six familles de RPS", role:"Où rechercher des leviers concrets dans l'organisation", principe:"<b>Intensité et temps, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs, insécurité du travail.</b> Ce classement des expositions ne constitue pas une nouvelle échelle de burn-out.", exemple:"La qualité empêchée de Sam relève des conflits de valeurs ; les urgences de l'intensité du travail.", limite:"Grille d'exposition professionnelle, <b>pas diagnostic individuel</b> ni preuve automatique de causalité.", lien:"https://www.inrs.fr/risques/psychosociaux/facteurs-risques" },
    { nom:"Clot · la qualité empêchée", role:"Pourquoi un travail mal fait use, même sans surcharge", principe:"<b>Devoir renoncer à faire du bon travail</b>, faute de temps, de moyens ou à cause de consignes, coûte autant que d'en faire trop : on fait ce qu'on juge mal fait.", exemple:"Sam bâcle les relances clients pour tenir les délais : il le vit comme une faute, pas comme une économie.", limite:"Cadre d'analyse du travail ; Bull-Out le repère par une seule question (T4), <b>hors score</b>.", lien:"https://www.inrs.fr/risques/psychosociaux/facteurs-risques" }
  ],
  clefs: [
    ["Le repos donne un indice.", "Une fatigue durable, qui revient vite malgré le repos, mérite une analyse : ce n’est pas un test diagnostique.", 0],
    ["Trois dimensions, pas une.", "Épuisement, distance mentale, efficacité ressentie. Leur présence ne suit pas une succession obligatoire.", 1],
    ["Perdre un relais change la charge réelle.", "Regarde ensemble les exigences et les ressources : aucun point de ressource n’annule mécaniquement un point de demande.", 2],
    ["L’effort mérite un retour.", "L’absence de reconnaissance ou de perspectives peut s’ajouter à la pression du travail ; il faut examiner les deux.", 3],
    ["« Perso » n’efface jamais « travail ».", "Un facteur personnel rend plus vulnérable. Il ne dispense pas de regarder la charge.", 4],
    ["Aucun dosage, aucun score total ne diagnostique.", "On lit dimension par dimension, et on parle avec un professionnel.", 5],
    ["Retirer, reporter, simplifier.", "« Fais au mieux » n’est pas une décision. Sans moyens, on remonte au lieu de compenser.", 6],
    ["Prévenir, réagir, et pouvoir le montrer.", "C’est ce que la loi attend. Une trace datée et factuelle protège celui qui alerte comme celui qui décide.", 7],
    ["Quatre portes, aucune mauvaise.", "Soin, aménagement, arbitrage, protection. Et en cas de danger : 15, 112, 3114.", 8],
  ],
  plusLoin: `
    <p>Bull-Out s’appuie sur quatre modèles parmi les plus étudiés en psychologie et en santé au travail. Aucun n’est parfait. Voici comment ils ont été construits, ce qu’ils montrent, et ce qu’ils ne montrent pas.</p>
    <h3>Effort-récupération : pourquoi le repos compte</h3>
    <p>En 1998, les psychologues néerlandais <b>Theo Meijman</b> et <b>Gijsbertus Mulder</b> proposent un modèle simple : tout travail coûte un effort, et cet effort est normal tant que la personne <b>récupère</b> ensuite. Le problème commence quand elle doit se remettre au travail avant d’avoir récupéré : la fatigue s’additionne d’un jour sur l’autre. <b>Sabine Sonnentag</b> et <b>Charlotte Fritz</b> (2007) précisent ce qui fait récupérer : se détacher psychologiquement du travail, se détendre, faire des activités qui ressourcent, garder la main sur son temps libre.</p>
    <p><b>Ce qu’on en sait</b> : le détachement psychologique est l’un des liens les mieux établis avec la fatigue et le bien-être, dans des études qui suivent les mêmes personnes au fil des jours. <b>Sa limite</b> : il décrit la récupération, pas sa cause. Ne pas décrocher peut venir d’un travail qui déborde le soir, autant que d’un trait personnel. Bull-Out ne reprend pas le questionnaire validé de Sonnentag (REQ) : il pose trois questions proches (F1 à F3).</p>
    <h3>Maslach : décrire le burn-out</h3>
    <p>Au milieu des années 1970, la psychologue <b>Christina Maslach</b> (université de Berkeley) interroge et observe des professionnels de l’aide : infirmières, travailleurs sociaux, avocats commis d’office. Elle remarque des récits très proches : épuisement émotionnel, mise à distance des personnes aidées, sentiment de ne plus être efficace. Avec <b>Susan Jackson</b>, elle construit un questionnaire de 22 questions, le <b>Maslach Burnout Inventory</b> (1981). Des analyses statistiques (analyses factorielles) sur plus d’un millier de réponses confirment que les réponses se regroupent bien en trois dimensions. Une version pour tous les métiers suit en 1996.</p>
    <p><b>Ce qu’on en sait aujourd’hui</b> : l’épuisement est la dimension centrale et la plus solide. L’efficacité réduite est la plus indépendante des deux autres, et certains chercheurs la voient comme une conséquence plutôt qu’un signe. Maslach elle-même rappelle que son questionnaire <b>n’a pas de seuil diagnostique</b> : il mesure des intensités, pas une maladie. Le lien avec la dépression reste débattu, ce qui explique pourquoi Bull-Out insiste sur l’avis d’un professionnel. D’autres outils existent, comme l’Oldenburg Burnout Inventory (2003), le Copenhagen Burnout Inventory (2005) ou le <b>Burnout Assessment Tool</b> (BAT, Schaufeli, 2020). Le BAT ajoute aux signes les troubles de l’attention et des émotions, que Bull-Out repère dans l’épuisement (A5 et A6).</p>
    <h3>JD-R : expliquer d’où vient l’usure</h3>
    <p>Le modèle <b>exigences-ressources</b> (Job Demands-Resources) est proposé en 2001 par <b>Evangelia Demerouti, Arnold Bakker</b> et leurs collègues, à partir d’une étude sur des salariés allemands de plusieurs secteurs. Il prolonge un modèle plus ancien, celui de <b>Robert Karasek</b> (1979), qui croisait la demande psychologique et la latitude de décision, puis le soutien social (Johnson, 1988). L’idée nouvelle : <b>toute exigence</b> et <b>toute ressource</b> peuvent entrer dans la balance, pas seulement la charge et l’autonomie.</p>
    <p>Le modèle décrit <b>deux processus</b>. Les exigences durables épuisent (processus de santé). Les ressources nourrissent l’engagement, et amortissent l’effet des exigences (processus de motivation). Des études longitudinales, qui suivent les mêmes personnes dans le temps, étayent ces deux voies, sans établir la cause de chaque situation individuelle. <b>Sa limite</b> : il est si souple que presque tout peut être une exigence ou une ressource. Il aide à chercher, il ne dit pas à l’avance ce qui compte dans ton poste.</p>
    <h3>Siegrist : le déséquilibre effort-récompense</h3>
    <p>Le sociologue de la santé <b>Johannes Siegrist</b> (université de Düsseldorf) part, dans les années 1980, d’études sur les maladies cardiovasculaires chez des ouvriers allemands. Son hypothèse : ce n’est pas seulement l’effort qui rend malade, c’est l’effort <b>sans réciprocité</b>. Il formalise le modèle effort-récompense (1996), avec trois formes de récompense : le salaire, l’estime, et les perspectives avec la sécurité de l’emploi. Dans le questionnaire ERI original, un rapport corrigé effort / récompense supérieur à 1 signale conventionnellement un déséquilibre ; <b>Bull-Out ne calcule pas ce ratio validé</b>. Le modèle tient aussi compte du <b>surengagement</b>, qui peut entretenir une exposition coûteuse, sans qu’on puisse le déduire de quelques réponses.</p>
    <p><b>Ce qu’on en sait</b> : de grandes cohortes, comme Whitehall II (des milliers de fonctionnaires britanniques suivis pendant des années), et des méta-analyses associent ce déséquilibre à un risque plus élevé de maladies cardiovasculaires et de dépression. Ces associations sont robustes, mais modérées : elles parlent de risques à l’échelle d’un groupe, pas du destin d’une personne.</p>
    <h3>Et en France ?</h3>
    <p>En 2011, le collège d’expertise présidé par <b>Michel Gollac</b> a proposé six familles de facteurs de risques psychosociaux : l’intensité et le temps de travail, les exigences émotionnelles, le manque d’autonomie, la mauvaise qualité des rapports sociaux, les conflits de valeurs et l’insécurité de la situation de travail. On y retrouve les modèles précédents, et les conflits de valeurs rejoignent la qualité empêchée. En 2019, l’OMS a précisé dans sa classification (CIM-11) que le burn-out est un <b>phénomène lié au travail</b>, et non une maladie médicale.</p>
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
    <p>La prévention commence par ce qui est modifiable et touche tout le monde : l’organisation du travail. C’est aussi ce que demande la loi (chapitre 10). Soutenir une personne fragilisée reste utile, mais en plus, pas à la place.</p>` },
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
// Chapitre 8 : les six familles de risques, juste avant « Agir ».
const chapitreRPS = {
  "temps": 1,
  "court": "Six familles de risques",
  "titre": "Les six familles de risques du travail : voir l’exposition avant l’usure",
  "duree": 8,
  "savoir": [
    "Distinguer une <b>exposition au travail</b> de ses conséquences sur la santé.",
    "Retrouver les six familles Gollac–INRS sur la colonne LE TRAVAIL de ton schéma, et savoir lesquelles Bull-Out explore peu.",
    "Transformer un signal en <b>fait vérifiable</b> et en première demande de prévention."
  ],
  "arrive": "« Je ne suis pas épuisé, donc il n'y a pas de risque. » Ou « notre équipe a un bon score, donc notre organisation va bien ». Les deux confondent <b>l'absence de symptôme</b> et <b>l'absence d'exposition</b>.",
  "retenir": "Les risques psychosociaux (on dit <b>RPS</b>) sont des <b>caractéristiques du travail</b> qui peuvent abîmer la santé. Le collège d’experts présidé par <b>Michel Gollac</b> les range en <b>six familles</b>. Ce ne sont ni six maladies ni six scores. Sur ton schéma, ce sont les étiquettes de la colonne LE TRAVAIL : <b>la jauge du travail dit à quoi tu es exposé·e, les deux autres ce que ça te fait</b>. On peut être exposé·e sans être usé·e, et ça se traite quand même.",
  "blocs": [
    {
      "t": "h",
      "texte": "Six familles, mais pas six diagnostics"
    },
    {
      "t": "p",
      "html": "En 2011, un collège d'experts réuni à la demande des pouvoirs publics, présidé par le statisticien et sociologue <b>Michel Gollac</b>, propose une grille pour décrire les <b>expositions psychosociales professionnelles</b>. Le but n'est pas de répartir les personnes entre « fragiles » et « solides » ; il est de mieux observer ce qui, dans l'activité et son organisation, mérite prévention. L'INRS utilise encore ces six familles pour guider cette analyse."
    },
    {
      "t": "table",
      "titre": "La même situation vue avec six angles différents",
      "cols": [
        "Famille",
        "Ce qu'on cherche",
        "Exemple avec Sam"
      ],
      "rows": [
        [
          "<b>1. Intensité et temps</b>",
          "Quantité, urgence, interruptions, horaires qui débordent.",
          "Sam termine son planning chez lui chaque soir."
        ],
        [
          "<b>2. Exigences émotionnelles</b>",
          "Faire face à la souffrance, à l'agressivité ; cacher ses émotions.",
          "Sam doit rassurer un client en colère sans pouvoir dire qu'il n'a pas de solution."
        ],
        [
          "<b>3. Autonomie</b>",
          "Pouvoir organiser son activité, décider, employer ses compétences.",
          "On modifie son périmètre sans lui demander son avis."
        ],
        [
          "<b>4. Rapports sociaux</b>",
          "Soutien, reconnaissance, équité, conflits, violences.",
          "Un collègue le soutient ; un responsable l'humilie en réunion."
        ],
        [
          "<b>5. Conflits de valeurs</b>",
          "Travail jugé inutile, contraire à l'éthique, qualité empêchée.",
          "Sam doit annoncer un délai qu'il sait impossible ou rendre un dossier bâclé."
        ],
        [
          "<b>6. Insécurité</b>",
          "Emploi, revenus, transformations imposées et avenir du métier.",
          "Son emploi est stable, mais son métier change chaque mois sans explication."
        ]
      ]
    },
    {
      "t": "h",
      "texte": "Le piège : « pas de burn-out » ne veut pas dire « pas de risque »"
    },
    {
      "t": "exemple",
      "titre": "Deux Sam, un même niveau d'usure",
      "html": "<b>Premier Sam :</b> il dort correctement et se sent efficace, mais subit régulièrement des humiliations. <b>Second Sam :</b> il est épuisé sans déclarer d'humiliations, dans une période de surcharge aiguë. Le premier a une <b>exposition à examiner même sans symptômes</b> ; le second a des <b>manifestations à prendre au sérieux</b>. Un score unique raterait l'un des deux.",
      "note": "On ne transforme pas une déclaration en diagnostic de harcèlement ; on ne l'ignore pas non plus parce que la fatigue reste faible."
    },
    {
      "t": "p",
      "html": "Les six familles ne sont pas des cases hermétiques. Une réorganisation peut à la fois provoquer des <b>horaires imprévisibles</b>, réduire l'<b>autonomie</b> et créer des <b>conflits de valeurs</b>. À l'inverse, un métier très exigeant peut être soutenable lorsque les moyens, le soutien et les possibilités d'agir sont suffisants. Cela invite à examiner les <b>combinaisons</b>, sans inventer une formule qui donnerait « 62 % de RPS »."
    },
    {
      "t": "h",
      "texte": "Ce que Bull-Out peut — et ne peut pas — explorer"
    },
    {
      "t": "p",
      "html": "Tu connais déjà la plupart des familles. Les deux pesées couvrent l’<b>intensité</b> (ce qu’on te demande), l’<b>autonomie</b> et les <b>relations</b> (ce qui t’aide), l’<b>insécurité</b> (ce que tu reçois). La famille des <b>conflits de valeurs</b>, c’est l’absurde vu de près : tâches qui ne servent à rien, qualité empêchée, ce qui va contre ce que tu crois juste (<a href=\"test.html#chapitre-5\">le chapitre sur l’absurde</a>). Six questions de plus, hors score, bouchent les trous : le travail qui <b>déborde sur le repos</b>, les <b>émotions qu’il faut cacher</b>, les <b>changements imposés</b> sans préparation, les <b>décisions prises sans toi</b>, l’<b>agressivité ou la détresse</b> des autres, un travail où tu <b>n’apprends plus</b>. Ce n’est <b>pas un questionnaire RPS validé</b> : certaines situations restent invisibles, et la fréquence déclarée ne dit ni leur gravité ni leur cause."
    },
    {
      "t": "principe",
      "html": "Sur ton schéma, les familles apparaissent en <b>pastilles numérotées</b> sur la colonne LE TRAVAIL : 1 et 2 sur « on te demande », 3 et 4 sur « ce qui t’aide », 5 sur l’absurde, 6 sur « tu reçois ». Une pastille orange avec une fatigue verte, c’est le premier Sam : <b>une exposition à traiter même si tu tiens</b>."
    },
    {
      "t": "principe",
      "html": "Une réponse élevée ne dit pas « ce salarié est à risque à 80 % ». Elle signifie : <b>« cette situation mérite un exemple et une discussion sur le travail réel »</b>. Une réponse basse ne signifie pas « exposition exclue »."
    },
    {
      "t": "h",
      "texte": "Du résultat à la prévention : trois questions"
    },
    {
      "t": "gestes",
      "items": [
        [
          "Décrire",
          "La déclaration ne remplace pas un fait situé.",
          "« Sur les quatre dernières semaines, quels horaires ont débordé, à quelles dates ? »",
          "Demander deux exemples sans réclamer d'informations de santé."
        ],
        [
          "Comprendre",
          "Chercher le mécanisme organisationnel, pas un coupable automatique.",
          "« Qui décide du planning ? Qu'est-ce qui rend l'urgence inévitable ? »",
          "Vérifier la procédure, les moyens et le retour d'expérience."
        ],
        [
          "Modifier",
          "Une mesure utile touche la situation de travail.",
          "« Peut-on stabiliser la plage sans sollicitation, et tester cela deux semaines ? »",
          "Fixer un responsable, une échéance, puis vérifier si l'exposition diminue."
        ]
      ]
    },
    {
      "t": "piege",
      "titre": "Le piège · « elle tient encore, donc tout va bien »",
      "depart": "Sam déclare une forte exposition à des changements non préparés, mais aucun signe d'épuisement marqué.",
      "etapes": [
        [
          "l'absence de symptôme devient absence de risque",
          "Il n'est pas fatigué, donc il n'y a rien à traiter."
        ],
        [
          "l'attente devient une stratégie",
          "On attend qu'il n'arrive plus à suivre pour intervenir."
        ]
      ],
      "fin": "La prévention primaire intervient <b>avant</b> l'aggravation. On peut changer des horaires, des modalités de consultation ou une procédure sans attendre un diagnostic."
    }
  ],
  "exo": {
    "titre": "Une exposition ou un diagnostic ?",
    "intro": "Choisis le raisonnement qui permet d'agir, sans sauter du signal à la conclusion.",
    "situations": [
      {
        "q": "Sam se sent bien mais dit qu'il subit des humiliations répétées.",
        "choix": [
          "Aucun sujet : ses jauges ne sont pas hautes.",
          "C'est forcément un harcèlement établi par le questionnaire.",
          "C'est une situation à examiner et à protéger, même sans manifestation d'épuisement."
        ],
        "bonne": 2,
        "fb": [
          "Les expositions existent avant les symptômes.",
          "Un questionnaire ne qualifie pas juridiquement des faits ; il déclenche une vérification appropriée.",
          "Oui. Rechercher les faits, protéger et mobiliser les bons interlocuteurs sans attendre un score élevé."
        ]
      },
      {
        "q": "Une salariée répond « souvent » à la question sur les émotions à cacher, mais son épuisement est bas.",
        "choix": [
          "Elle déclare du travail émotionnel ; vérifier contexte, intensité, marges de manœuvre.",
          "Cette réponse prouve qu'elle va faire un burn-out.",
          "Cette réponse prouve qu'elle s'est trompée sur sa fatigue."
        ],
        "bonne": 0,
        "fb": [
          "Oui. C'est une exposition déclarée, pas une prédiction individuelle.",
          "On ignore la probabilité de maladie ; aucun seuil n'est validé.",
          "Une exposition et un symptôme sont deux objets différents."
        ]
      },
      {
        "q": "Dans une entreprise, les six familles sont en bas d'un questionnaire individuel.",
        "choix": [
          "Le DUERP peut déclarer l'absence de RPS.",
          "Il faut compléter par l'observation, les échanges collectifs et les données de travail.",
          "Le seul bon indicateur est le nombre d'arrêts maladie."
        ],
        "bonne": 1,
        "fb": [
          "Le questionnaire d'une personne ne remplace pas l'analyse collective du travail.",
          "Exact. L'INRS recommande plusieurs sources et une démarche collective adaptée à l'activité.",
          "Les arrêts sont des conséquences indirectes, pas une cartographie exhaustive des expositions."
        ]
      }
    ]
  },
  "sources": [
    [
      "Gollac & Bodier (2011) · Rapport du collège d'expertise",
      "https://travail-emploi.gouv.fr/IMG/pdf/rapport_SRPST_definitif_rectifie_11_05_10.pdf"
    ],
    [
      "INRS · Les six familles de facteurs RPS",
      "https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html"
    ],
    [
      "INRS (2025) · Effets sur la santé, synthèse de plus de 800 études",
      "https://www.inrs.fr/header/presse/cp-expositions-psychosociales-effets-sante.html"
    ],
    [
      "INRS · Les questionnaires doivent être complétés par d'autres méthodes",
      "https://www.inrs.fr/risques/psychosociaux/questionnaires.html"
    ],
    [
      "COPSOQ III (2019) · Dimensions du travail psychosocial",
      "https://www.copsoq-network.org/assets/Uploads/The-Third-Version-of-the-Copenhagen-Psychosocial-Questionnaire.pdf"
    ]
  ],
  "nechange": "Un test individuel ne remplace ni une démarche d'évaluation collective des RPS, ni le DUERP, ni une enquête sur les situations de travail. <b>Rendre visible n'est pas valider psychométriquement.</b>",
  "piece": {
    "nom": "Les six pastilles",
    "texte": "Pas de boîte en plus : les six familles se posent en pastilles numérotées sur la colonne LE TRAVAIL, et s’allument quand tes réponses les signalent.",
    "rapport": "la carte des six familles, avec pour chacune ce que tes réponses en disent, ce qu’elles ne disent pas, et une question pour agir."
  },
  "suite": "On sait maintenant où chercher les expositions. Le chapitre suivant aide à transformer ces signaux en <b>arbitrages concrets</b> sur le travail."
};
// Chapitre 5 : l’absurde (écrit avec le fil « chapitre sur l’absurde »), entre Siegrist et « c’est perso ».
const PIPEAU = `<svg viewBox="0 0 320 170" role="img" aria-label="Un pipeau d'où sortent trois notes : KPI, pré-COPIL, vFinale">
  <g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <g transform="rotate(-20 150 110)"><rect x="60" y="100" width="170" height="24" rx="12"/><path d="M230 100 l26 -5 v34 l-26 -5"/></g>
    <path d="M259 62 v-30 l14 -4 M291 40 v-26 M228 42 v-22"/>
  </g>
  <g fill="currentColor"><circle cx="95" cy="124" r="4"/><circle cx="125" cy="113" r="4"/><circle cx="155" cy="102" r="4"/><circle cx="185" cy="91" r="4"/>
    <circle cx="253" cy="62" r="7"/><circle cx="285" cy="40" r="7"/><circle cx="222" cy="42" r="6"/></g>
  <g font-family="Poppins, system-ui, sans-serif" font-weight="600" font-size="14" fill="currentColor"><text x="182" y="24">KPI</text><text x="232" y="92">pré-COPIL</text><text x="258" y="14">vFinale</text></g>
</svg>`;

const SISYPHE = `<svg viewBox="0 0 320 180" role="img" aria-label="Sisyphe pousse en haut d'une colline un rocher marqué vFinale">
  <g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 170 L230 40 L310 40"/><circle cx="168" cy="58" r="26"/>
    <circle cx="122" cy="80" r="8"/><path d="M118 88 L110 118 M112 96 L140 82 M112 100 L142 92 M110 118 L120 140 M110 118 L94 134"/>
  </g>
  <g font-family="Poppins, system-ui, sans-serif" font-weight="600" fill="currentColor"><text x="146" y="63" font-size="13">vFinale</text><text x="16" y="28" font-size="13">Il faut imaginer Sam heureux ?</text></g>
</svg>`;

const chapitreAbsurde = {
  temps: 1,
  court: "L’absurde",
  titre: "L’absurde : en rire, en souffrir, ou les deux",
  duree: 10,
  savoir: [
    "Distinguer un emploi jugé inutile, des tâches vides dans un métier qui a du sens, et un discours creux.",
    "Comprendre pourquoi l’absurde use : c’est une exigence qui gêne, un effort sans retour, et une petite vexation à chaque fois.",
    "Lire ta réaction à l’absurde (rire, agacement, rumination, indifférence) sans en faire un test de caractère.",
  ],
  arrive: "« Mon travail, c’est du bullshit. » Ou l’inverse : « Faut pas tout prendre au sérieux, ris-en. » La première phrase accuse sans rien changer. La seconde demande de sourire pendant que la situation use. Ce chapitre cherche ce qu’il y a entre les deux.",
  retenir: "L’absurde au travail n’est pas un détail comique : c’est une <b>exigence qui gêne</b>, sans rien rapporter, et elle use, parfois plus que la charge elle-même. Ce qui compte aussi, c’est <b>ce que tu en fais</b> : en rire et passer à autre chose protège ; ruminer le soir ou ne plus réagir du tout sont des signaux. On peut en rire. On peut aussi le retirer.",
  blocs: [
    { t: "fig", svg: PIPEAU, cap: "Le pipeau : un instrument, et un mot pour le discours creux. Dans ton rapport, c’est l’icône de l’absurde, dans la colonne « Ton travail »." },

    { t: "h", texte: "Sam et le comité qui prépare le comité" },
    { t: "exemple", titre: "Mardi, 9 h", html: "Sam reçoit une demande urgente : « Peux-tu préparer une vision transverse consolidée, simple mais exhaustive, pour alignement avant le pré-COPIL ? » Il pose une question raisonnable : <b>« Quelle décision doit-on prendre ? »</b> Silence. On lui demande d’abord une première version. Mercredi, 18 h : 28 diapositives, trois changements de couleurs, et deux réunions pour préparer une réunion qui doit décider <b>s’il faut organiser une réunion</b>.", note: "Sam n’est pas incompétent. C’est le but de son travail qui a disparu derrière les moyens de le montrer." },
    { t: "p", html: "Attention, ce travail n’est pas forcément inutile. Contrôler un risque, coordonner des équipes ou garder une trace peut éviter des erreurs graves, et ces bénéfices sont souvent <b>invisibles précisément parce que l’incident n’a pas eu lieu</b>. La bonne question n’est donc pas « combien de slides ? », mais : <b>qui s’en sert, pour décider quoi, et que se passerait-il si on arrêtait ?</b>" },

    { t: "h", texte: "D’où vient l’expression « bullshit jobs »" },
    { t: "p", html: "En 2013, l’anthropologue <b>David Graeber</b> publie dans un petit magazine londonien un essai qui fait le tour du monde. Il remarque que beaucoup de gens jugent <b>eux-mêmes</b> que leur emploi ne sert à rien, et que les gains de productivité n’ont pas libéré le temps promis. En 2018, il en tire un livre, <i>Bullshit Jobs</i>. C’est une thèse nourrie de témoignages, pas une statistique." },
    { t: "table", titre: "Les cinq personnages de Graeber, avec leur contre-exemple", cols: ["Personnage", "L’idée", "Attention"], rows: [
      ["Le faire-valoir", "Être là pour que le chef ait l’air important.", "Un vrai accueil rend service."],
      ["Le gros bras", "Faire parce que le concurrent fait pareil.", "Un avocat peut défendre de vrais droits."],
      ["Le rafistoleur", "Réparer chaque semaine la même rustine au lieu de corriger le défaut.", "Une solution de secours est parfois nécessaire."],
      ["Le cocheur de cases", "Prouver qu’on a agi plutôt que vérifier que ça sert.", "La traçabilité est parfois obligatoire, et utile."],
      ["Le contremaître", "Créer du travail pour les autres, ou un comité pour suivre le comité.", "Coordonner des équipes peut être indispensable."],
    ] },
    { t: "principe", html: "Une tâche difficile à voir n’est pas forcément inutile. Un beau livrable n’est pas forcément utile. Aucun métier n’est absurde par nature." },

    { t: "h", texte: "Quatre formes d’absurde à ne pas confondre" },
    { t: "cartes", items: [
      ["Un emploi jugé inutile", "« Si mon poste disparaissait, manquerait-il quelque chose ? » C’est la question de Graeber. On peut se tromper : les bénéficiaires sont parfois loin."],
      ["Des tâches vides dans un métier utile", "L’infirmière qui aime son métier et passe une heure par jour sur des formulaires que personne ne lit. Le poste garde son sens ; une partie du quotidien, non."],
      ["Le discours creux", "« Renforcer la dynamique transverse d’appropriation. » André Spicer montre que ce langage se répand parce qu’il donne l’air compétent, souvent sans mensonge conscient."],
      ["Les tâches illégitimes", "La forme la mieux étudiée : des tâches <b>inutiles</b> (« pourquoi faire ça du tout ? ») et des tâches <b>déraisonnables</b> (« pourquoi est-ce à moi de le faire ? »)."],
    ] },
    { t: "p", html: "Depuis 2010, l’équipe du psychologue <b>Norbert Semmer</b>, à l’université de Berne, mesure ces tâches illégitimes avec un court questionnaire validé. Les études les relient au stress, à l’irritation et à l’épuisement, <b>même quand on tient compte de la charge totale</b>. Autrement dit : ce n’est pas seulement qu’on en fait trop, c’est qu’on fait ce qui ne devrait pas exister, ou pas par soi." },
    { t: "principe", html: "« Ton travail ne sert à rien » est une accusation. « Cette procédure prend du temps sans qu’on sache quelle décision elle améliore » est une hypothèse qu’on peut vérifier." },

    { t: "h", texte: "Combien de bullshit jobs ? Les chiffres se contredisent" },
    { t: "table", titre: "Quatre chiffres célèbres, quatre questions différentes", cols: ["Source", "Chiffre", "Ce qu’on a vraiment demandé"], rows: [
      ["Sondage YouGov, Royaume-Uni, 2015", "37 %", "Mon travail n’apporte rien de significatif au monde."],
      ["Dur et van Lent, 47 pays, 2019", "8 %", "Mon emploi est socialement inutile (17 % hésitent)."],
      ["Soffia, Wood et Burchell, Europe, 2022", "4,8 %", "Je n’ai jamais ou rarement le sentiment de faire un travail utile (7,8 % en 2005)."],
      ["Walo, États-Unis, 2023", "19 %", "Je contribue rarement ou jamais positivement à la société."],
    ] },
    { t: "rappel", chap: 6, html: "Un chiffre ne vaut que par la question posée. Ces quatre pourcentages en sont l’exemple parfait : <b>il n’existe pas de pourcentage universel du bullshit</b>. Ce qui tient d’une étude à l’autre : le sentiment d’inutilité est réel, il existe aussi dans des emplois utiles, et il va de pair avec plus de mal-être." },

    { t: "h", texte: "Comment une organisation fabrique de l’absurde, sans méchant" },
    { t: "deux", items: [
      ["Ce qui l’installe", [
        "<b>Le moyen devient le but.</b> L’indicateur servait à décider ; on finit par travailler pour qu’il soit beau. Le sociologue Robert Merton l’avait décrit dès 1940.",
        "<b>Montrer qu’on agit remplace agir.</b> Une procédure rassure et signale le sérieux, même quand elle ne change rien (Meyer et Rowan, 1977).",
        "<b>Le langage protège le flou.</b> Une phrase sans qui, sans quoi et sans quand ne peut pas échouer.",
      ]],
      ["Ce qui le rend invisible", [
        "<b>Personne ne voit le résultat complet.</b> Avec les livrables intermédiaires et la sous-traitance, l’utilité existe parfois, mais loin de soi.",
        "<b>La qualité empêchée.</b> Tu sais ce que serait un travail bien fait, et on ne te laisse pas le faire. Ce n’est pas la tâche qui est inutile : c’est de ne pas pouvoir la faire utilement.",
        "<b>Le temporaire qui dure.</b> Une rustine installée « pour trois semaines » devient un poste à temps partiel.",
      ]],
    ] },
    { t: "p", html: "Les experts réunis par Michel Gollac rangent le travail jugé inutile et la qualité empêchée parmi les <b>conflits de valeurs</b>, l’une des six familles de risques psychosociaux. On y revient dans le chapitre sur les six familles." },

    { t: "h", texte: "L’absurde, vu par les modèles que tu connais" },
    { t: "rappel", chap: 1, html: "Sam soupirait : « de toute façon, ils changeront encore d’avis ». La distance protège, puis se retourne. <b>L’absurde répété est l’une des portes de la distance</b> : à force de faire ce qui ne sert pas, on cesse d’attendre que ça serve. Maslach et Leiter citent d’ailleurs le désaccord de valeurs parmi les six terrains qui usent." },
    { t: "rappel", chap: 2, html: "Toutes les exigences ne se valent pas. Les recherches distinguent celles qui <b>stimulent</b> (un défi, une responsabilité) et celles qui <b>gênent</b> (paperasse, flou, procédures sans but). Les secondes usent nettement plus, et ne motivent jamais. L’absurde est une exigence qui gêne. Et le dossier de Marc, posé sur le bureau de Sam, est une tâche « déraisonnable » : ce n’était pas la sienne." },
    { t: "rappel", chap: 3, html: "Une slide que personne ne lit est un effort au <b>retour nul par construction</b> : ni estime, ni utilité, ni perspective. Et la personne qui surinvestit est souvent celle qui peaufine trois fois le document inutile." },
    { t: "p", html: "C’est pour cela que l’absurde a sa place <b>dans la jauge de ton travail</b>, à côté de la balance et de la bascule : dans ton rapport, c’est une quatrième famille, mesurée par le bullshitomètre." },

    { t: "h", texte: "Le cœur de l’affaire : ce que l’absurde te fait" },
    { t: "p", html: "La même phrase (« on a fait une réunion pour planifier le comité d’alignement ») fait rire l’un, met l’autre en colère, et rend un troisième triste. Ce n’est pas un test de caractère. Mais ça dit quelque chose." },
    { t: "p", html: "<b>Pourquoi ça vexe autant.</b> Semmer parle de « stress comme offense à soi ». Une tâche absurde ne fatigue pas seulement : elle dit quelque chose de la place qu’on te donne. <i>« On me fait faire ça, à moi ? »</i> C’est pour ça qu’une tâche de dix minutes peut gâcher une journée, et que la réaction émotionnelle compte plus que la durée." },
    { t: "p", html: "<b>Pourquoi on en rit.</b> Une situation devient drôle quand elle bouscule une règle tout en restant assez peu menaçante (McGraw et Warren, 2010). Si elle te touche de trop près, elle cesse d’être drôle. Et rire et peine peuvent arriver ensemble : « c’est drôle parce que c’est vrai »." },
    { t: "fig", svg: SISYPHE, cap: "Camus, Le Mythe de Sisyphe (1942) : on ne choisit pas toujours l’absurde, on choisit un peu ce qu’on en fait." },
    { t: "p", html: "Dans <i>Le Mythe de Sisyphe</i>, Albert Camus appelle absurde le choc entre notre besoin de sens et un monde qui n’en donne pas. Sisyphe pousse son rocher pour rien, et Camus conclut : « il faut imaginer Sisyphe heureux ». On ne demande à personne d’être heureux de pousser des slides. Mais l’idée tient : <b>ta réaction à l’absurde est une information</b>, sur toi et sur ce que le travail te coûte." },
    { t: "table", titre: "Trois choses qui se ressemblent, et ne sont pas pareilles", cols: ["", "Ce que c’est", "Ce que ça fait"], rows: [
      ["Le recul", "Tu en ris, tu vois la situation autrement, tu passes à autre chose.", "Ça protège."],
      ["La récupération", "Le soir, tu n’y penses plus, tu te reposes vraiment.", "Ça protège. C’est « Ta récupération », dans ton rapport."],
      ["Le cynisme", "Tu ne réagis plus parce que tu as cessé d’attendre que ça ait du sens.", "Ça soulage un temps, mais c’est l’un des trois signes d’usure."],
    ] },
    { t: "mythes", titre: "Trois idées reçues sur l’humour au travail", items: [
      ["« Celui qui rit de tout est le plus solide »", "Peut-être. Ou il a appris à en rire pour ne pas en pleurer. Ou il aime juste les bonnes blagues. Un rire seul ne permet pas de trancher : il faut regarder aussi la récupération et la distance."],
      ["« Celui que ça agace manque d’humour »", "S’agacer devant l’absurde, puis lâcher, est une réaction saine : on est heurté parce que le travail bien fait compte. C’est le même piège que « c’est perso » : la réaction est personnelle, l’absurde est organisationnel."],
      ["« Ne plus réagir, c’est avoir pris du recul »", "Parfois. Mais ne plus attendre de sens, c’est aussi la définition de la distance du chapitre 2. La différence se voit à une question : ton travail garde-t-il du sens pour toi ?"],
    ] },
    { t: "p", html: "<b>Ce que fait le test.</b> Treize questions pour repérer l’absurde dans ton quotidien, sur les quatre dernières semaines. Puis on regarde ta réaction : aux blagues du test, et surtout aux absurdités de ta vraie vie, et si l’on peut en rire à plusieurs autour de toi. Le rapport croise ta réaction avec ta récupération et ta distance, et te la décrit en une phrase, <b>sans note</b> : ton humour te protège-t-il, ou cache-t-il une usure ?" },
    { t: "rappel", chap: 10, html: "Pouvoir <b>en rire avec un collègue</b> est déjà un appui. Rire seul dans son coin protège beaucoup moins : le rire partagé rapproche, le rire en solo isole." },

    { t: "h", texte: "Que faire de l’absurde ?" },
    { t: "trames", titre: "Trois questions à poser au travail", items: [
      ["La décision", "Qu’est-ce que cette slide, cet indicateur ou ce comité doit nous permettre de décider ?"],
      ["Le destinataire", "Qui va utiliser le résultat, et qu’en fera-t-il ?"],
      ["L’arbitrage", "Si on garde cette demande, qu’est-ce qu’on retire, reporte ou simplifie ?"],
    ] },
    { t: "rappel", chap: 8, html: "Retirer, reporter, simplifier. L’absurde est <b>ce qu’on retire le plus facilement</b> : personne ne regrette un rapport que personne ne lisait. Le reporting de Sam qui passe de trois pages à cinq lignes est une victoire contre l’absurde." },
    { t: "piege", titre: "Le piège · de « c’est absurde » à « ça ne sert à rien de parler »", depart: "Sam trouve son pré-COPIL absurde.", etapes: [
      ["l’absurde devient une blague", "On en rit à la machine à café, et on recommence lundi."],
      ["la blague devient une fatalité", "« De toute façon, c’est comme ça ici. »"],
      ["la fatalité devient du silence", "Plus personne ne demande à quoi sert le comité."],
    ], fin: "Le rire est précieux, mais il ne retire rien. Agir commence quand on remplace « c’est du bullshit » par <b>« voici le processus à changer, la décision attendue et la personne qui peut trancher »</b>." },
  ],
  exo: {
    titre: "Le test de la chaise vide",
    intro: "Trois situations. Pour chacune, quelle est la lecture la plus juste ?",
    situations: [
      { q: "Un comité de 9 personnes passe une heure sur 18 indicateurs. Trois personnes ont préparé deux heures chacune. Rien n’est décidé. Faut-il le supprimer ?", choix: [
        "Oui : un comité qui ne décide rien ne sert à rien.",
        "Non : toute coordination est nécessaire.",
        "Avant de trancher : à quoi devait-il servir, qui utilise l’information, que se passerait-il sans lui pendant un mois ?",
      ], bonne: 2, fb: [
        "Trop vite. Un comité peut partager des alertes utiles sans rien décider en séance.",
        "Trop vite aussi. 15 heures de travail par séance (6 de préparation, 9 de réunion) méritent au moins une question.",
        "Oui. C’est le test de la chaise vide : « si ça disparaissait un mois, qui manquerait de quoi ? ». On cherche une conséquence vérifiable, pas une condamnation.",
      ] },
      { q: "Depuis le départ de Marc, Sam gère aussi les commandes de fournitures de tout l’étage. Ça ne prend qu’une heure par semaine, mais ça l’agace énormément. Que retenir ?", choix: [
        "Une heure, ce n’est rien : Sam exagère.",
        "C’est une tâche « déraisonnable » : ce n’est pas son travail. Ce type de tâche use plus que sa durée ne le laisse croire.",
        "Sam devrait apprendre à relativiser.",
      ], bonne: 1, fb: [
        "La durée n’est pas tout. Une tâche qui ne devrait pas être la sienne dit quelque chose de la place qu’on lui donne : c’est ce qui vexe.",
        "Oui. C’est l’autre moitié des tâches illégitimes. La question utile : à qui revient-elle vraiment, et qui peut le décider ?",
        "Son agacement est une information, pas un défaut. Le relativiser ne retire pas la tâche.",
      ] },
      { q: "Léa rit de toutes les absurdités du service. Depuis deux mois, elle ne réagit même plus, ne propose plus rien et dort mal. Que retenir ?", choix: [
        "Elle a pris du recul : c’est une bonne nouvelle.",
        "Ne plus réagir et mal dormir peuvent signaler une distance qui s’installe et une récupération qui se dégrade : c’est à regarder.",
        "Elle manque de sérieux.",
      ], bonne: 1, fb: [
        "Peut-être au début. Mais ne plus rien proposer et mal dormir ne ressemblent pas à du recul : plutôt à la distance du chapitre 2.",
        "Oui. Le rire seul ne dit pas tout : c’est son association avec la distance et le sommeil qui alerte.",
        "Rire n’est pas un manque de sérieux. Ici, c’est le changement qui compte, pas l’humour.",
      ] },
    ],
  },
  sources: [
    ["Graeber (2018) · Bullshit Jobs: A Theory", "https://davidgraeber.org/books/bullshit-jobs/"],
    ["Semmer et al. (2015) · Illegitimate tasks as a source of work stress, Work & Stress", "https://doi.org/10.1080/02678373.2014.1003996"],
    ["LePine, Podsakoff & LePine (2005) · Challenge and hindrance stressors, Academy of Management Journal", "https://doi.org/10.5465/amj.2005.18803921"],
    ["Dur & van Lent (2019) · Socially useless jobs, Industrial Relations", "https://doi.org/10.1111/irel.12227"],
    ["Soffia, Wood & Burchell (2022) · Alienation is not “bullshit”, Work, Employment and Society", "https://doi.org/10.1177/09500170211015067"],
    ["Walo (2023) · “Bullshit” after all? Work, Employment and Society", "https://doi.org/10.1177/09500170231175771"],
    ["Spicer (2020) · Playing the bullshit game, Organization Theory", "https://doi.org/10.1177/2631787720929704"],
    ["McGraw & Warren (2010) · Benign violations, Psychological Science", "https://doi.org/10.1177/0956797610376073"],
    ["Sonnentag & Fritz (2007) · The Recovery Experience Questionnaire", "https://doi.org/10.1037/1076-8998.12.3.204"],
    ["INRS · facteurs de risques psychosociaux (conflits de valeurs)", "https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html"],
  ],
  nechange: "Rire de l’absurde n’oblige pas à l’accepter, et s’en agacer n’est pas un défaut. Dans les deux cas, la question reste la même : qu’est-ce qu’on peut retirer ?",
  piece: { nom: "L’absurde", texte: "Ton rapport ajoute l’absurde comme quatrième famille de « Ton travail », et décrit dans « Toi » ta façon de le prendre.", rapport: "la boîte « L’absurde » (pipeau) dans la jauge du travail, la case « Ta façon de prendre l’absurde », et la page du bullshitomètre." },
  suite: "L’absurde vient de l’organisation. Et quand, en plus, la vie personnelle de Sam se complique ? C’est le piège du chapitre suivant.",
};

// Ordre final : 1–4, 5 l’absurde, 6 « c’est perso », 7 les mesures, 8 les six familles, 9 agir, 10 la loi, 11 les portes.
chapitres.splice(6, 0, chapitreRPS);
chapitres.splice(4, 0, chapitreAbsurde);
plusLoin.splice(6, 0, {
  "titre": "les six familles de RPS, leur origine et leurs limites",
  "html": "<h3>Un référentiel de facteurs, pas une nouvelle maladie</h3><p>Le collège d'expertise réuni à la demande du ministère du Travail (rapport Gollac/Bodier, 2011) regroupe les facteurs psychosociaux en six familles. L'INRS les utilise pour guider l'observation et la prévention <b>dans des situations de travail réelles</b>.</p><p>Ces catégories ne sont ni mutuellement exclusives ni un score de diagnostic. Une faible fréquence déclarée peut masquer un événement rare mais grave ; une réponse élevée doit être confrontée aux horaires, procédures, moyens et interactions.</p><h3>Pourquoi seulement six questions supplémentaires ?</h3><p>Bull-Out pose déjà des questions sur charge, soutien, autonomie, reconnaissance, insécurité de l'emploi, qualité empêchée et conflit éthique. Les six questions ajoutées (repos, émotions cachées, changements imposés, décisions prises sans toi, agressivité ou détresse d'autrui, compétences inemployées) complètent ces lacunes, <b>sans créer un total RPS</b>. Elles ne reproduisent ni le COPSOQ III ni une échelle validée.</p><p>Dans une organisation, l'INRS recommande de confronter questionnaires, entretiens, observations et données sur le travail. Le rapport individuel Bull-Out ne permet pas d'établir un DUERP.</p>"
});
plusLoin.splice(4, 0, { titre: "les tâches illégitimes, et ce que mesure vraiment le bullshitomètre", html: `
    <p>Le questionnaire de Semmer (Bern Illegitimate Tasks Scale) compte huit questions : quatre sur les tâches <b>inutiles</b> (« des tâches dont on se demande pourquoi elles existent »), quatre sur les tâches <b>déraisonnables</b> (« des tâches qui devraient être faites par quelqu’un d’autre »). Bull-Out ne reprend pas cette échelle : il garde l’humour du « Grand Test du Bullshit Job », mais réécrit ses questions pour qu’elles portent sur des faits des quatre dernières semaines, et ajoute une question sur les tâches qui ne sont pas les tiennes.</p>
    <p>Ce que le bullshitomètre <b>montre</b> : la part de situations absurdes que tu reconnais dans ton quotidien, en quatre thèmes (réunions, indicateurs, travail sans destinataire, tâches qui ne sont pas les tiennes). Ce qu’il <b>ne montre pas</b> : qu’un processus est objectivement inutile, ni qu’il a causé à lui seul ta fatigue. Les poids des réponses sont des conventions, à relire avec les psychologues du projet.</p>
    <p>Et ta réaction ? Les deux questions « dans la vraie vie » ne donnent pas de points : ruminer le soir est déjà mesuré par ta récupération, et ne plus réagir par ta distance. Les compter deux fois gonflerait ton score.</p>` });
chapitres.forEach((c, i) => { c.plusLoin = plusLoin[i]; });
