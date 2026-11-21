// Formation Bull-Out · interlude « L'absurde ».
// Placé après la page « Les trois modèles, ensemble » (après le chapitre 4) et avant le chapitre « c'est perso ».
// Il n'est PAS dans le tableau `chapitres` : aucun index ne bouge, il ne conditionne pas le diplôme.
// Même gabarit qu'un chapitre, plus un bloc « rappel » (Tu te souviens ?) qui renvoie vers un chapitre par son index.
// Sources principales en fin de fichier ; la proposition de recherche d'origine est dans
// docs/refonte-bullout/proposition-chapitre-bullshit-absurde-humour-2026-11-21.md.

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

export const interludeAbsurde = {
  court: "L’absurde",
  titre: "L’absurde : en rire, en souffrir, ou les deux",
  duree: 10,
  savoir: [
    "Distinguer un emploi jugé inutile, des tâches vides dans un métier qui a du sens, et un discours creux.",
    "Comprendre pourquoi l’absurde use : c’est une exigence qui gêne, un effort sans retour, et une petite vexation à chaque fois.",
    "Lire ta réaction à l’absurde (rire, agacement, rumination, indifférence) sans en faire un test de caractère.",
  ],
  arrive: "« Mon travail, c’est du bullshit. » Ou l’inverse : « Faut pas tout prendre au sérieux, ris-en. » La première phrase accuse sans rien changer. La seconde demande de sourire pendant que la situation use. Cet interlude cherche ce qu’il y a entre les deux.",
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
    { t: "rappel", chap: 5, html: "Un chiffre ne vaut que par la question posée. Ces quatre pourcentages en sont l’exemple parfait : <b>il n’existe pas de pourcentage universel du bullshit</b>. Ce qui tient d’une étude à l’autre : le sentiment d’inutilité est réel, il existe aussi dans des emplois utiles, et il va de pair avec plus de mal-être." },

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
    { t: "rappel", chap: 8, html: "Pouvoir <b>en rire avec un collègue</b> est déjà un appui. Rire seul dans son coin protège beaucoup moins : le rire partagé rapproche, le rire en solo isole." },

    { t: "h", texte: "Que faire de l’absurde ?" },
    { t: "trames", titre: "Trois questions à poser au travail", items: [
      ["La décision", "Qu’est-ce que cette slide, cet indicateur ou ce comité doit nous permettre de décider ?"],
      ["Le destinataire", "Qui va utiliser le résultat, et qu’en fera-t-il ?"],
      ["L’arbitrage", "Si on garde cette demande, qu’est-ce qu’on retire, reporte ou simplifie ?"],
    ] },
    { t: "rappel", chap: 6, html: "Retirer, reporter, simplifier. L’absurde est <b>ce qu’on retire le plus facilement</b> : personne ne regrette un rapport que personne ne lisait. Le reporting de Sam qui passe de trois pages à cinq lignes est une victoire contre l’absurde." },
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
  plusLoin: { titre: "les tâches illégitimes, et ce que mesure vraiment le bullshitomètre", html: `
    <p>Le questionnaire de Semmer (Bern Illegitimate Tasks Scale) compte huit questions : quatre sur les tâches <b>inutiles</b> (« des tâches dont on se demande pourquoi elles existent »), quatre sur les tâches <b>déraisonnables</b> (« des tâches qui devraient être faites par quelqu’un d’autre »). Bull-Out ne reprend pas cette échelle : il garde l’humour du « Grand Test du Bullshit Job », mais réécrit ses questions pour qu’elles portent sur des faits des quatre dernières semaines, et ajoute une question sur les tâches qui ne sont pas les tiennes.</p>
    <p>Ce que le bullshitomètre <b>montre</b> : la part de situations absurdes que tu reconnais dans ton quotidien, en quatre thèmes (réunions, indicateurs, travail sans destinataire, tâches qui ne sont pas les tiennes). Ce qu’il <b>ne montre pas</b> : qu’un processus est objectivement inutile, ni qu’il a causé à lui seul ta fatigue. Les poids des réponses sont des conventions, à relire avec les psychologues du projet.</p>
    <p>Et ta réaction ? Les deux questions « dans la vraie vie » ne donnent pas de points : ruminer le soir est déjà mesuré par ta récupération, et ne plus réagir par ta distance. Les compter deux fois gonflerait ton score.</p>` },
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
