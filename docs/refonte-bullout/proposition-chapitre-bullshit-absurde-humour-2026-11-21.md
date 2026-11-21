# Bull-Out — La fabrique de l'absurde : chapitre, schéma et Bullshitomètre V3

**Proposition éditoriale et scientifique — 21 novembre 2026.**  
**Statut : document de travail à arbitrer avec David et Claude ; aucun changement de code ou de barème n'est autorisé par ce document.**

**Base inspectée :** \`main\` après fusion de la **PR #11 (V3)** : \`formation-contenu.js\` (9 chapitres et Sam), \`formation-illustrations.js\` (\`schemaRapport\`), \`rapport.js\` (matrice BS × distance/sens), \`bullshitometre-data.js\` (BS1–BS12), \`script.js\` (HR1–HR4, interprétations), \`methode.html\`, journal et notes 05–06 de \`docs/refonte-bullout/historique\`. Ce texte **part de ce qui existe**, sans refaire le travail précédent.

> **L'idée directrice : on peut mesurer la perception de situations absurdes, et demander ce que les blagues font ressentir. Mais un rire n'est pas une preuve de résilience ; une larme n'est pas une preuve de fragilité.** Le plus intéressant est souvent leur **coexistence**.

## 0. Arbitrages recommandés

| Sujet | Proposition | À ne pas faire |
|---|---|---|
| Périmètre | Ajouter un **interlude de formation « La fabrique de l'absurde »**, entre les chapitres 6 et 7, sans le mélanger aux scores de burn-out. | Faire de l'« absurdité » un quatrième signe de burn-out ou une cause certaine de symptômes. |
| Pédagogie | **Une histoire de Sam**, l'origine de Graeber, **trois définitions différentes** du bullshit, **ce que disent les enquêtes**, les mécanismes d'entretien, un exercice et un pont vers l'action. | Affirmer que « 37 % des emplois sont objectivement inutiles ». |
| Illustration | **Un petit pipeau avec les notes « COPIL », « KPI », « vFinale »**, dans un **bandeau isolé sous le schéma**, nommé « L'absurde perçu · hors score », suivi de « Ce que l'humour t'a fait ». | Une flèche pipeau → batterie : elle suggérerait une causalité que le questionnaire ne mesure pas. |
| Bullshitomètre | Conserver **12 situations satiriques**, mais faire décrire des comportements **observables sur les quatre dernières semaines**, puis laisser la chute comique dans les choix et les micro-textes. | Noter comme « inutiles » le travail indirect, la prévention des problèmes, les réunions de coordination ou le reporting réglementaire par principe. |
| Réaction émotionnelle | **Conserver HR1–HR4** (amusement, peine/malaise, minimisation, recul). Envisager un commentaire facultatif ; deux ajouts seulement en expérimentation. Restituer par constellations, pas par « type de personne ». | Un score de « lâcher-prise » déduit de quatre réactions à nos propres blagues. |
| Mise en œuvre | **Document seulement**, à relire et à confronter à 8–12 entretiens cognitifs. Toute refonte du texte des questions imposerait versionnement et migration. | Réutiliser silencieusement les anciennes réponses BS si le sens des propositions change. |

La **PR #11** introduit déjà une matrice 2 × 2 « absurde perçu × distance/sens » et quatre réactions HR. Elles sont conservées comme base. Le projet ci-dessous renforce **l'explication des mécanismes et la qualité de la mesure**, sans promettre une psychométrie absente.

---

# 1. Chapitre prêt à intégrer dans la formation

**Placement conseillé : « Interlude 6 bis » après « Ce que valent les mesures » (chapitre 6), avant « Agir sur le travail » (chapitre 7).** Environ 8–10 minutes de lecture, **hors score** et hors évaluation clinique. Ne pas renuméroter automatiquement les neuf chapitres existants ni modifier l'accès au test final sans décision explicite.

## La fabrique de l'absurde — Pourquoi travaille-t-on parfois beaucoup pour ne rien changer ?

**L'idée à retenir :** il existe une différence entre **avoir un travail inutile**, **faire des tâches inutiles dans un travail utile** et **parler comme si l'on savait ce que l'on fait**. Ces trois phénomènes se recoupent, mais ne se confondent pas.

### 1.1. Sam et le mystérieux comité qui prépare le comité

Mardi, 9 h. Sam reçoit une demande urgente : « Peux-tu préparer une vision transverse consolidée, simple mais exhaustive, pour alignement stratégique avant le pré-COPIL ? » Il pose une question raisonnable : **« Quelle décision doit-on prendre ? »** Silence. On lui demande d'abord une première version.

Mercredi, 18 h. Il a produit 28 diapositives, refait trois fois les couleurs et assisté à deux réunions pour préparer une réunion qui devrait décider **s'il faut organiser une réunion**. Ce n'est pas un problème d'incompétence : Sam sait faire son métier. C'est le **but de son travail**, momentanément, qui a disparu derrière les moyens de le montrer.

Son activité n'est pas forcément inutile. Le contrôle des risques, la coordination et la traçabilité peuvent éviter des erreurs graves — **leurs bénéfices sont parfois invisibles précisément parce que l'incident n'a pas eu lieu**. Ce qu'il faut examiner, ce n'est donc pas le nombre de slides : **qui s'en sert, pour décider quoi, et que se passerait-il si on arrêtait ?**

**Question au lecteur :** Dans l'histoire de Sam, qu'est-ce qui est absurde : son emploi, le pré-COPIL, ou l'absence de décision identifiable ? On ne peut pas conclure sans savoir **l'usage** de ce document.

### 1.2. D'où vient l'expression « bullshit jobs » ?

En **2013**, l'anthropologue **David Graeber** publie dans *STRIKE! Magazine* un essai provocateur, *On the Phenomenon of Bullshit Jobs*. Son pari : les gains de productivité n'ont pas seulement libéré du temps ; certaines organisations auraient multiplié des emplois que **leurs titulaires eux-mêmes** jugent sans contribution défendable. En **2018**, il développe la thèse dans *Bullshit Jobs: A Theory*. Ce texte est une **hypothèse anthropologique nourrie de témoignages**, pas une estimation statistique représentative. [S1–S2]

Graeber propose cinq personnages (catégories satiriques, **pas professions objectivement disqualifiées**) :

| Type chez Graeber | Idée | Exemple fictif, avec contre-exemple |
|---|---|---|
| **Flunkies — les faire-valoir** | Une présence sert surtout à afficher le statut d'un supérieur. | Une personne imposée pour « accueillir » un directeur qui n'a pas de visiteurs. **Mais** l'accueil réel est un service utile. |
| **Goons — les gros bras** | Une activité est engagée parce qu'un adversaire ou concurrent la pratique aussi. | Une surenchère de communication concurrentielle. **Mais** un avocat peut défendre des droits réels. |
| **Duct tapers — les rafistoleurs** | On entretient indéfiniment une rustine au lieu de corriger un défaut. | Chaque semaine, ressaisir manuellement les mêmes données de trois systèmes. **Mais** une solution de secours peut être nécessaire. |
| **Box tickers — les cocheurs de cases** | On produit la preuve d'une action au lieu d'en vérifier l'utilité. | Un tableau de bord sans décision ni destinataire. **Mais** la traçabilité est utile, parfois obligatoire. |
| **Taskmasters — les fabricants de travail** | Une couche de management ou une tâche se justifie par sa propre existence. | Un comité créé pour suivre les indicateurs du comité précédent. **Mais** la coordination interéquipes peut être indispensable. |

**Le piège :** une tâche difficile à voir n'est pas forcément inutile. Une personne qui prévient un accident peut avoir « zéro résultat spectaculaire » et pourtant faire un travail décisif. À l'inverse, un beau livrable n'est pas une preuve d'utilité.

### 1.3. Trois formes d'absurde, trois questions différentes

**1. L'emploi perçu comme inutile.** C'est l'interrogation de Graeber : « Au fond, si mon poste disparaissait, manquerait-il quelque chose ? » Elle porte sur la **contribution perçue**. Une personne peut se tromper sur des effets indirects, notamment si elle ne voit pas les bénéficiaires.

**2. Les tâches et processus jugés vides.** Une infirmière, un ingénieur ou un conducteur peut aimer profondément son métier et subir des heures de paperasse sans usage clair. Le **poste garde un sens** ; une **part du quotidien** paraît absurde. C'est le terrain naturel du Bullshitomètre actuel (réunions, livrables, flou, indicateurs).

**3. Le « pipeau » organisationnel.** Le sociologue des organisations **André Spicer** s'intéresse à une autre chose : les discours creux qui circulent et se reproduisent parce qu'ils procurent une **apparence de compétence, de cohérence ou de légitimité**. Cela peut fonctionner sans mensonge conscient ni intention malveillante. *Être compétent dans le langage d'une organisation n'est pas la même chose que résoudre son problème.* [S8–S9]

**La distinction à afficher en encadré dans l'interface :**

> « Ton travail ne sert à rien » est une accusation. « Cette procédure prend du temps sans qu'on sache quelle décision elle améliore » est **une hypothèse vérifiable**.

L'absurde n'est pas synonyme de surcharge : une seule tâche absurde peut être courte mais moralement irritante ; une tâche éprouvante peut être extrêmement utile. Et le **sens** n'est pas exactement l'inverse de l'absurde : on peut, la même semaine, sauver un projet et remplir un tableau qui ne sauve rien.

### 1.4. Combien de « bullshit jobs » ? La controverse est instructive

Le sondage **YouGov de 2015** au Royaume-Uni a beaucoup circulé : **37 %** des salariés interrogés déclaraient que leur travail ne contribuait pas de manière significative au monde. C'est une **perception recueillie par un sondage**, et non 37 % d'emplois objectivement superflus. [S3]

La recherche a ensuite contesté et nuancé ce récit :

| Source | Ce qu'elle observe | Ce qu'il ne faut pas en déduire |
|---|---|---|
| **Dur & van Lent (2019)**, ~100 000 salariés, 47 pays | Environ **8 %** jugent leur emploi socialement inutile ; **17 %** hésitent sur son utilité. Pas de tendance temporelle nette dans leurs données. [S4] | « Seuls 8 % ont des tâches absurdes » : l'étude porte sur l'utilité globale du **poste**, pas toutes ses tâches. |
| **Soffia, Wood & Burchell (2022)**, enquêtes européennes 2005–2015 | **4,8 %** déclarent rarement ou jamais avoir le sentiment de faire un travail utile en 2015, contre **7,8 %** en 2005 ; la perception d'inutilité est associée à un bien-être plus faible et à des conditions de management dégradées. Les grandes prédictions de Graeber ne sont pas confirmées par ces données. [S5] | Une preuve de disparition du bullshit, ni une relation causale démontrée entre inutilité ressentie et mauvaise santé. |
| **Walo (2023)**, salariés américains, N = 1 811 | **Plus de 19 %** déclarent rarement ou jamais contribuer positivement à la société ; des associations avec certaines familles professionnelles subsistent après ajustement statistique. Mais **l'autonomie et la qualité du management** comptent aussi. [S6] | Une réfutation définitive de Soffia : pays, formulations et analyses diffèrent. Certaines catégories ont de petits effectifs. |
| **Riester & Keller (2025)**, trois études, Allemagne/États-Unis | Des **épisodes perçus comme inutiles ou nuisibles** sont associés à davantage de comportements de travail contre-productifs, même en tenant compte des expériences positives. L'éthique personnelle du travail modifie parfois l'association. [S10] | Le bullshit « provoque » à lui seul ces comportements : les trois études reposent sur des associations. |
| **Riester & Keller (publié en ligne déc. 2025)**, expérience de rappel, N = 253 | Faire rappeler des épisodes de travail « bullshit », utiles ou neutres modifie notamment les **affects déclarés** et certaines **intentions**. [S11] | Un effet démontré sur les burn-out, le comportement réel futur ou l'effet de *nos* blagues. |

**Pourquoi les chiffres varient-ils ?** « Mon travail aide-t-il quelqu'un ? », « contribue-t-il au monde ? » et « mes réunions débouchent-elles sur une décision ? » ne posent **pas la même question**. Le pays, la période, les professions, les réponses possibles et la définition modifient les proportions. **Il n'existe pas un pourcentage universel de bullshit.**

**Ce qui résiste à la controverse :** le **sentiment d'inutilité** est réel, peut coexister avec un emploi utile et est associé au **mal-être** dans plusieurs études. Les mécanismes exacts et la causalité restent partiellement ouverts. En France, l'**INRS** rattache le travail jugé inutile, la qualité empêchée et les conflits éthiques aux **conflits de valeurs**, une famille reconnue de facteurs de risques psychosociaux. [S7, S12]

### 1.5. Comment une organisation fabrique-t-elle de l'absurde ?

Il n'y a pas besoin d'un chef machiavélique pour fabriquer un pré-pré-comité.

**Premier mécanisme — le moyen devient la fin.** Un indicateur sert d'abord à prendre une décision. Puis on se réunit pour justifier l'indicateur, puis on modifie le travail pour améliorer son apparence. Le sociologue **Robert K. Merton** décrivait dès 1940 ce déplacement des buts dans les bureaucraties. [S13]

**Deuxième mécanisme — montrer qu'on agit remplace parfois agir.** Une règle, un processus ou une présentation peut devenir un **signal de sérieux ou de légitimité** pour une organisation : les structures formelles jouent aussi un rôle de cérémonie, analysé par **Meyer et Rowan (1977)**. Ce n'est pas une condamnation de toutes les procédures ; certaines évitent précisément les erreurs. [S14]

**Troisième mécanisme — le langage protège le flou.** Dire « nous allons renforcer la dynamique transverse d'appropriation » n'identifie ni **qui agit**, ni **sur quoi**, ni **quand**. Spicer (2020) propose que ce jeu de langage se reproduise lorsqu'il est socialement récompensé : les mots sont compris comme un signe d'appartenance plutôt que comme une information à vérifier. [S8]

**Quatrième mécanisme — personne ne voit le résultat complet.** La division du travail, les chaînes de sous-traitance et les livrables intermédiaires éloignent une personne de l'usage final. **Hypothèse mécanistique** : l'utilité réelle peut être présente mais **invisible**. Dur & van Lent ainsi que Soffia et collègues discutent le rôle de l'organisation, de la reconnaissance et de l'autonomie dans le sentiment d'utilité. [S4–S5]

**Cinquième mécanisme — la difficulté à faire un travail dont on est fier.** Le professionnel sait ce que serait un travail de qualité mais les délais, moyens ou injonctions contradictoires l'en empêchent. C'est la **qualité empêchée**, déjà abordée par Bull-Out en **T4**. Une personne peut souffrir non d'une activité objectivement inutile, mais de **ne pas pouvoir faire utilement une activité nécessaire**. [S7]

**Fil rouge de Sam :** son tableau de bord peut servir à anticiper un vrai risque (mécanisme utile) et contenir quatre graphiques ajoutés parce qu'un comité a « besoin de voir des couleurs » (rituel sans usage clair). **Les deux sont vrais simultanément.** Il faut identifier **quelles parties** changer.

### 1.6. Pourquoi cela peut faire mal — ou faire rire

La même phrase (« On a fait une réunion pour planifier le comité d'alignement ») peut provoquer un éclat de rire, une colère froide, de la tristesse ou aucune réaction. Ce n'est pas un test de caractère.

Il existe au moins **quatre voies possibles** :

- **Incongruité / amusement :** le décalage entre « on pilote » et « on n'a pris aucune décision » déclenche le rire. Les travaux de **McGraw et Warren (2010)** sur les « violations bénignes » montrent qu'une situation peut devenir drôle quand elle est à la fois perçue comme une entorse à une norme **et suffisamment non menaçante**. La distance psychologique compte. [S15]
- **Réévaluation / recul immédiat :** une blague change, pour un instant, l'angle de vue. Une petite expérience de **Samson et collègues (2014)** sur des images négatives montre qu'une **réévaluation humoristique volontaire** peut modifier les émotions. **Ce n'était ni un questionnaire de travail ni une intervention sur le burn-out**. [S16]
- **Rappel d'une situation pénible :** la blague fait mouche parce qu'elle touche un conflit de valeurs ou un sentiment d'impuissance. **Rire et peine ne s'excluent pas.** L'intensité de l'émotion ne renseigne pas, à elle seule, sur sa cause.
- **Impression de minimisation :** « Vous en riez, mais moi je rentre chez moi en pleurant. » La personne réagit alors aussi à **notre mise en scène**, pas uniquement à son travail. L'effet de la plaisanterie dépend de la proximité, de la gravité et de la position de celui qui plaisante. [S15, S17]

**La distinction la plus utile :** prendre du recul **pendant une minute** sur une situation n'est pas la même chose que **récupérer psychologiquement après le travail**, ni que **devenir cynique**. Les recherches de **Sonnentag et Fritz (2007)** distinguent notamment détachement psychologique, relaxation, maîtrise et contrôle. HR4 de Bull-Out ne mesure **aucune de ces quatre dimensions** de récupération validées. [S18]

**L'expérience Bull-Out :** douze questions pour reconnaître des situations absurdes ; puis **quatre questions indépendantes** pour dire si l'on a souri, été blessé, trouvé les blagues minimisantes ou pris un peu de recul. Le sentiment éprouvé est une **information utile pour le dialogue**, **pas une note de résistance au stress**.

> **Paradoxe pédagogique :** celle qui rigole le plus est peut-être celle qui supporte le mieux le cirque. Ou celle qui a appris à en rire pour ne pas en pleurer. Ou simplement quelqu'un qui aime les bonnes blagues. **Nos quatre questions ne permettent pas de départager ces explications.**

### 1.7. Mini-exercice : le test de la chaise vide

**Situation.** Un comité de 9 personnes examine 18 indicateurs pendant une heure. Trois personnes préparent chacune deux heures de documents. Rien n'est décidé en séance. *Faut-il supprimer le comité ?*

**Réponse A :** Oui, un comité qui ne décide rien ne sert à rien.  
**Réponse B :** Non, toute coordination est nécessaire.  
**Réponse C :** Avant de conclure : quel était l'objectif ? Échanger des alertes, contrôler une obligation, produire un arbitrage ? Qui utilise l'information et que se passerait-il sans ce comité ?

**Correction : C.** L'absence de décision en séance n'est **pas en soi** une preuve d'inutilité : un comité peut partager des informations de sécurité. **Mais** si aucun participant ne peut nommer son destinataire, son rôle et un résultat vérifiable, il y a une **hypothèse de fonctionnement à examiner**. Le temps de préparation estimé pour l'exemple est de **6 heures-personnes**, en plus de **9 heures-personnes de réunion**. Cela rend visible le coût, sans conclure à l'inutilité.

**Le test de la chaise vide :** « Si cette réunion ou ce livrable disparaissait pendant un mois, **qui manquerait de quoi** ? » On ne le supprime pas aveuglément : on cherche une **conséquence testable**.

### 1.8. Et maintenant, que faire de l'absurde ?

**Trois questions utilisables au travail :**

1. **La décision :** « Qu'est-ce que cette slide, cet indicateur ou ce comité doit nous permettre de décider ? »
2. **Le destinataire :** « Qui utilisera le résultat, et qu'en fera-t-il ? »
3. **L'arbitrage :** « Si on garde cette demande, qu'est-ce qu'on retire, reporte ou simplifie ? »

Le but n'est pas d'apprendre à sourire pendant qu'une situation nous épuise. C'est de **décrire précisément** ce qu'on peut améliorer, tout en conservant le droit de **rire de la comédie humaine**.

**Transition vers le chapitre 7 :** *« Repérer l'absurde ne suffit pas. Agir commence au moment où l'on remplace "c'est du bullshit" par "voici le processus à changer, la décision attendue et la personne qui peut arbitrer". »*

**Pièce du schéma :** pas de nouveau facteur de burn-out. Un **satellite hors score** apparaît, sous le schéma, pour rappeler que l'absurdité ressentie et la réaction aux blagues donnent **deux éclairages distincts**, sans expliquer automatiquement la fatigue ou le retrait.

---

# 2. Le schéma complet : l'absurde comme satellite, pas comme cause prouvée

## 2.1. Pourquoi une flûte est une bonne intuition… mais pas suffisante seule

Le **pipeau** a un double sens français immédiatement compréhensible : **instrument** et **discours creux**. Son iconographie peut être drôle et discrète. Réserve scientifique : « pipeau » suggère parfois **tromperie intentionnelle**. Or une tâche absurde ou une procédure sans usage n'est pas forcément un mensonge. D'où le choix de **séparer le dessin plaisant du libellé rigoureux**.

| Image | Ce qu'elle raconte bien | Défaut |
|---|---|---|
| **Pipeau et notes musicales** | Le jargon, la mise en scène, la fanfare du reporting ; petit pictogramme très lisible. | Risque « ils nous mentent » ; n'illustre pas à lui seul les tâches inutiles. |
| Machine à bulles « KPI → COPIL → KPI » | L'auto-entretien des procédures ; lien visuel direct avec BS3, BS4, BS12. | Plus encombrante ; risque de transformer le schéma en cartoon. |
| Roue de hamster faite de slides | L'activité qui tourne sans progresser. | Confond **charge élevée** et **absence de résultat** ; connotation culpabilisante. |
| Moulin à vent de PowerPoint | Le flux de documents rédigés pour alimenter d'autres documents. | Moins immédiatement reconnaissable sur téléphone. |

**Décision proposée : conserver le pipeau comme pictogramme**, avec de petites notes **« pré-COPIL », « KPI », « vFinale »**, mais nommer la section **« Les absurdités du travail »**, pas « Les menteurs ».

## 2.2. Emplacement concret dans la V3

**Schéma PR #11 actuel :** conditions de travail **à gauche**, Sam et A/F **au centre**, manifestations **à droite** ; pièces de la formation ajoutées chapitre par chapitre. Le rapport comporte déjà **une page « Bullshitomètre »** séparée avec sa matrice. Ne pas injecter un nouveau bloc dans Maslach, JD-R ou Siegrist.

**Maquette textuelle du schéma étendu :**

\`\`\`text
             CE QUI TIRE        CE QUI RESTE        CE QUI LÂCHE
 [ TRAVAIL ]      ── liens à vérifier ──> [ TOI ] ──> [ CE QUI SE VOIT ]
  Balance JD-R                               A/F           Trois signes
  Effort / retour                          Appuis          Corps
  Contexte                                                Sécurité
 ───────────────────── fin du modèle central ──────────────────────
  ♪  [ petit pipeau ]  LES ABSURDITÉS PERÇUES     [ MIROIR ] L'HUMOUR REÇU
       Réunions · KPI · livrables                Sourire · peine · minimisation · recul
       12 réponses satiriques · hors score       4 réactions · hors score
                      AUCUNE FLÈCHE CAUSALE VERS LES SCORES
\`\`\`

**Recommandation UX :** un **bandeau sous le schéma** (fond crème très clair, fin séparateur violet, plutôt que le orange des liens de charge), avec **deux cartes latérales** : à gauche le pipeau et les **situations** ; à droite un **petit miroir** ou deux visages non caricaturaux et la **réception émotionnelle**. L'un décrit **ce qui se passe au travail** ; l'autre **comment le questionnaire a été vécu**. Rien n'oblige à associer les deux par une flèche.

**À construire si validé :** sur \`formation-illustrations.js\`, un composant satellite activé à l'interlude 6 bis, **indépendant de \`PIECES_SCHEMA\`** (ne pas perturber l'ordre des neuf chapitres) ; dans \`rapport.js\`, le même langage visuel sous la \`vueEnsemble\`. Le rail peut être **masqué dans le PDF Essentiel** et conservé dans le rapport complet ; il n'entre jamais dans la fiche de travail ni les alertes. Vérifier lisibilité à **390 px**, défilement horizontal, contraste, intitulés ARIA, SVG descriptif et impression.

**Libellé sous l'image :** « L'absurde perçu et ta réaction à l'humour sont **hors du score de burn-out**. Ils peuvent éclairer une discussion ; ils ne prouvent pas la cause d'un symptôme. »

## 2.3. Pourquoi pas une flèche « bullshit → burn-out » ?

Parce que notre questionnaire **ne permet pas** de démontrer : (a) qu'un processus est objectivement inutile, (b) qu'il a causé la fatigue, (c) que rire en protège. La recherche montre des **associations**, des effets d'**épisodes remémorés** et des mécanismes plausibles, mais pas une causalité individuelle identifiable dans le rapport Bull-Out. [S5, S10–S11]

**Remarque supplémentaire :** en cas de **T4 élevé (« qualité empêchée »)**, afficher un **renvoi textuel** « À confronter à la question T4 », pas une flèche qui additionnerait deux mesures dépendantes. Le rapport a déjà ce rapprochement.

---

# 3. Audit des 12 questions actuelles : ce qu'elles captent et ce qu'elles confondent

**État vérifié sur \`main\` :** 12 BS, ordonnées \`BS1…BS12\` ; les huit premières conservent leurs identifiants historiques et BS9–BS12 complètent le test d'origine. Quatre pondérations maison par réponse : \`absurd\`, \`meeting\`, \`dashboard\`, \`ghost\`. Le pourcentage principal est **l'indice \`absurd\` normalisé sur le barème**, **pas** le % de temps réellement perdu. Le seuil 50 % de la matrice est **narratif**, pas étalonné.

| Item | Ce qui fonctionne | Confusion actuelle / priorité |
|---|---|---|
| **BS1** « produit aujourd'hui » | Très drôle, reconnaissable. | Produit visible ≠ contribution ; **travail de prévention** oublié. Ajouter un bénéficiaire ou un résultat. |
| **BS2** « réunions remplaçables par un mail » | Réunionite identifiable. | Un mail n'est pas un comparateur universel ; mieux : **objet et résultat** d'une réunion. |
| **BS3** « outil de pilotage » | Un bon indicateur relie **donnée et décision**. | Confond utilité, culture KPI et usage décoratif ; ancrer à un cas récent. |
| **BS4** « il faut qu'on se cale » | Excellente formulation comique. | Le **flou linguistique** n'est pas toujours une absence de mandat ; demander la **suite réelle**. |
| **BS5** « impact sur les décisions » | Capte l'utilité décisionnelle. | **Contribution indirecte** et préparation de décisions valent souvent beaucoup : ne pas les pénaliser. |
| **BS6** « livrables relus » | Identifie le **retour sur le fond**. | Un document **consulté sans commentaires** peut être excellent ; demander **usage**, pas seulement relecture. |
| **BS7** « transverse » | Vocabulaire très « cadre ». | Une coordination inter-métiers peut être utile ; identifier **qui tranche** et **qui agit**. |
| **BS8** « fin de semaine » | Bonne entrée vers le ressenti. | Risque de noter le **dégoût**, le **surmenage** ou le **manque de visibilité** plutôt que l'absurde. |
| **BS9** « slide pour demain » | Illustre l'urgence artificielle. | Une demande urgente peut être légitime ; distinguer **délai arbitraire** et **besoin de décision**. |
| **BS10** « demande typique » | Très drôle sur les injonctions contradictoires. | Mesure surtout le **flou** et les **moyens manquants**, pas l'inutilité. |
| **BS11** « agenda » | Bonne mesure des interruptions / réunions. | **Double couverture BS2** ; réserver BS11 au **morcellement du travail**. |
| **BS12** « KPI » | Bon angle sur la mesure auto-entretenue. | **Double couverture BS3** ; BS3 = usage des KPI, BS12 = **prolifération et maintenance des KPI**. |

**Problèmes communs :** (1) l'option A incarne trop souvent le salarié idéal, (2) les choix D sont très drôles mais parfois irréalistes, (3) aucune période uniforme, (4) les **fonctions de coordination**, la traçabilité et l'effet préventif sont pénalisés, (5) les poids \`absurd\` ne sont **pas validés** et pondèrent parfois un **état affectif**. Un fort score peut donc refléter **l'identification à un registre humoristique** autant qu'une fréquence réelle de situations.

**Principe de refonte :** annoncer « Pense aux **quatre dernières semaines**. Choisis le **cas le plus fréquent**, pas la phrase la plus drôle. » Les **quatre options restent drôles**, mais représentent une gradation **observable**. Si l'item ne s'applique pas au métier, proposer **« Pas concerné·e » hors score** plutôt que forcer un 0 ; documenter les réponses manquantes. Tester si les répondants prennent au pied de la lettre la blague.

---

# 4. Banque de reformulations V3 — 12 questions, humour conservé

**Statut : propositions intégrales à tester, PAS à recopier directement avec les poids V2.** Les quatre options sont rangées par **degré de dysfonctionnement observé**, pas par valeur morale du métier ; les formulations sont volontairement brèves, accessibles au téléphone. L'humour est dans le **décalage**, pas dans le jugement du répondant.

**Consigne avant BS1 :** « Pendant les **4 dernières semaines**, quels petits chefs-d'œuvre de logique organisationnelle as-tu croisés ? Réponds d'après les faits, pas d'après l'envie de choisir la meilleure vanne. »

### BS1 — Produire, oui. Mais produire quoi ?
**Question :** « Cette semaine, quand tu as livré quelque chose, qui en a eu l'usage ? »  
A. « Quelqu'un s'en est servi ; oui, cette espèce existe. »  
B. « L'usage est indirect mais identifiable, même sans standing ovation. »  
C. « Le fichier est parti vers une destination vaguement professionnelle. »  
D. « Il a rejoint la réserve nationale des documents vFinale_DÉFINITIF2. »  
**Cible :** destinataire / usage déclaré, pas « effort visible ».

### BS2 — Réunionnite
**Question :** « Au cours des quatre dernières semaines, à quoi ont surtout abouti les réunions auxquelles tu as assisté ? »  
A. « À des décisions, des informations utiles ou des actions identifiables. »  
B. « À des échanges utiles, avec quelques longueurs légendaires. »  
C. « À des conclusions floues et des réunions de rattrapage. »  
D. « À l'ouverture d'un groupe Teams chargé de planifier le prochain point. »  
**Cible :** résultat des réunions, pas « aurait dû être un mail ».

### BS3 — Le KPI, outil ou accessoire ?
**Question :** « Ton tableau de bord a-t-il changé une décision ces quatre dernières semaines ? »  
A. « Oui, il a orienté ou corrigé une action. »  
B. « Il a aidé à comprendre ; la décision viendra peut-être. »  
C. « On l'a commenté, surtout pour admirer sa cohérence chromatique. »  
D. « Il a prouvé qu'on savait représenter des nombres en couleurs. »  
**Cible :** utilité décisionnelle **récente**, sans dénigrer toute mesure.

### BS4 — « On se cale »
**Question :** « Quand quelqu'un a dit "il faut qu'on se cale", que s'est-il passé ensuite ? »  
A. « On a clarifié le besoin et attribué une action. »  
B. « On a discuté utilement, puis repoussé une décision. »  
C. « On a multiplié les échanges sans responsable clairement désigné. »  
D. « On s'est recasés trois fois : le calendrier dirige désormais l'équipe. »  
**Cible :** conversion du langage en action.

### BS5 — Impact, même discret
**Question :** « Quand tu prépares une décision, peux-tu retrouver ce que ton travail a changé ? »  
A. « Oui : une décision, un risque évité ou une aide identifiable. »  
B. « Parfois, même si mon effet reste indirect et discret. »  
C. « Rarement : je transmets, puis tout disparaît dans le brouillard. »  
D. « Mon impact principal est d'occuper une case dans l'organigramme. »  
**Cible :** utilité perçue, en **reconnaissant la prévention** et les effets indirects.

### BS6 — La grotte SharePoint
**Question :** « Après livraison, que deviennent tes analyses, dossiers ou comptes rendus ? »  
A. « Ils sont utilisés, même si personne ne laisse de commentaire. »  
B. « Une partie est exploitée ; le reste vit sa petite vie documentaire. »  
C. « On demande beaucoup la mise en page, peu le résultat. »  
D. « Ils sont confiés à SharePoint pour une vie monastique sans lecteur. »  
**Cible :** **usage** du contenu ; le silence n'est pas une preuve de négligence.

### BS7 — Transversal, jusqu'où ?
**Question :** « Dans tes projets transverses, qui est responsable de la décision finale ? »  
A. « C'est clair : chacun contribue et quelqu'un arbitre. »  
B. « C'est généralement clair après une réunion ou deux. »  
C. « Plusieurs personnes valident, personne n'ose vraiment trancher. »  
D. « La décision est un être mythologique que personne n'a jamais vu. »  
**Cible :** clarté des responsabilités, pas le mot « transverse » en soi.

### BS8 — Fin de semaine : l'effet obtenu
**Question :** « À la fin d'une semaine chargée, peux-tu nommer une contribution utile ? »  
A. « Oui, visible ou invisible : j'ai fait avancer ou sécurisé quelque chose. »  
B. « Souvent, mais elle est parfois noyée dans l'administratif. »  
C. « Difficilement : j'ai beaucoup fait tourner la machine. »  
D. « J'ai surtout permis à l'organisation de se contempler en activité. »  
**Cible :** sentiment de contribution **sans confondre** fatigue et inutilité.

### BS9 — Urgence rituelle
**Question :** « Les demandes "pour demain" ont-elles un usage ou une échéance vérifiable ? »  
A. « Oui, l'urgence correspond en général à un besoin réel. »  
B. « Pas toujours, mais on peut obtenir une explication. »  
C. « Rarement ; le délai arrive avant le pourquoi. »  
D. « Le deadline est sacré. Sa raison relève du secret-défense. »  
**Cible :** justification de l'urgence, pas intensité de charge.

### BS10 — Injonctions impossibles
**Question :** « Quand on te demande du "synthétique mais exhaustif", peux-tu clarifier les critères ? »  
A. « Oui, on tranche le périmètre et les critères. »  
B. « Souvent, après une petite séance de traduction simultanée. »  
C. « Difficilement : les demandes contradictoires restent ouvertes. »  
D. « On me demande une certitude robuste à partir de données imaginaires. »  
**Cible :** **ambiguïté non arbitrée**, pas présence d'un vocabulaire ridicule.

### BS11 — L'agenda avale le travail
**Question :** « À quelle fréquence les réunions ont-elles empêché le travail qu'elles devaient faciliter ? »  
A. « Rarement : les échanges me laissent du temps pour exécuter. »  
B. « Parfois : j'arrive encore à regrouper les interruptions. »  
C. « Souvent : le travail commence quand le calendrier s'endort. »  
D. « Pour finir le travail, il faudrait refuser la réunion "suivi du travail". »  
**Cible :** **morcellement et temps disponible**, distinct du résultat des réunions (BS2).

### BS12 — Indicateurs qui se reproduisent
**Question :** « Quand un indicateur ne sert plus, que se passe-t-il ? »  
A. « On le supprime ou on le corrige en expliquant pourquoi. »  
B. « Il survit quelque temps, mais une révision reste possible. »  
C. « Il continue d'être alimenté sans décision associée. »  
D. « Il pond deux nouveaux KPI pour sécuriser son maintien en poste. »  
**Cible :** maintenance injustifiée, distincte de l'usage d'un tableau de bord (BS3).

## 4.1. Ce que ces reformulations ne résolvent PAS

- Une **réponse en quatre niveaux** n'est pas une échelle validée. Certaines options A/B sont qualitativement différentes, pas de simples niveaux de fréquence. **Revue cognitive indispensable**.
- Les **poids croisés** \`absurd/meeting/dashboard/ghost\` sont subjectifs. **Ne pas reprendre automatiquement les poids V2**. Une première version plus honnête peut **afficher les 3 thèmes** et deux exemples sans chiffre général, ou conserver un **« indice satirique de réponses »** explicitement conventionnel.
- **BS2 et BS11** se recoupent ; **BS3 et BS12** aussi. Distinguer les mécanismes ne garantit pas leur **indépendance statistique**.
- Un même environnement peut provoquer **cynisme, lassitude, colère, désintérêt** : ces émotions ne doivent pas devenir des **poids de « bullshit »**.
- Le **périmètre** (cadres / salariés de première ligne / travail indépendant / soin / production / sécurité) est insuffisamment testé. Ajouter « pas concerné » quand nécessaire, plutôt que de pénaliser par absence d'opportunité.

**Option de mesure plus exigeante — à expérimenter, pas à déployer sans test :** dissocier **fréquence factuelle** (jamais, rarement, parfois, souvent, très souvent) et **chute satirique** affichée après la réponse. Cela éliminerait l'attrait des « meilleures vannes » sur la mesure. **Compromis :** l'expérience perd une part de son humour dans les choix. Faire un **A/B test** : versions « choix drôles » vs « fréquence simple + chute », et comparer compréhension, plaisir et réponses.

---

# 5. Après les blagues : comprendre la réaction émotionnelle sans surinterpréter

## 5.1. Le mécanisme : deux observations, pas une seule

Le questionnaire actuel recueille déjà :

**A — Ce qui est reconnu dans le travail.** BS1–BS12 : situations **déclarées via des options satiriques** ; dimension principale = absurdité du barème ; thèmes = réunions, indicateurs, contribution fantôme.

**B — Ce que l'outil a fait ressentir.** HR1 amusement ; HR2 peine/malaise ; HR3 impression que les blagues minimisent ; HR4 prise de recul ressentie sur le moment. **Aucune moyenne ni score de résilience.**

Le projet gagne en profondeur **sans attribuer automatiquement à l'employeur la réaction provoquée par les formulations de Bull-Out**. Une personne peut se reconnaître dans BS et **ne pas trouver la blague drôle** ; une autre peut rire des situations absurdes d'une entreprise imaginaire **sans les avoir vécues**. Les deux configurations existent logiquement.

**Ce que HR4 permet de dire :** « Tu as déclaré avoir pris un peu de recul **sur le moment**. »  
**Ce que HR4 ne permet pas de dire :** « Tu sais lâcher prise », « tu relativises mieux que les autres », « tu es protégé contre le burn-out ». Les instruments consacrés à l'**adaptation de l'humour**, à la **régulation émotionnelle** et à la **récupération après travail** examinent d'autres situations et plusieurs items ; ils ne sont pas interchangeables. [S16, S18–S19]

## 5.2. Garder HR1–HR4, mais clarifier leur restitution

| HR | Formulation **actuelle** (à conserver comme base) | Restitution correcte |
|---|---|---|
| **HR1** | « Ces questions m'ont amusé·e ou fait sourire. » | **Amusement déclaré** ; pas fréquence du rire au quotidien. |
| **HR2** | « Certaines questions m'ont fait de la peine ou mis·e mal à l'aise. » | **Peine/malaise** ; les deux émotions sont agrégées dans **un seul item**, limite à expliciter. |
| **HR3** | « J'ai eu l'impression que ces blagues minimisaient les difficultés que je rencontre. » | **Perception de minimisation** ; ce n'est pas un « manque d'humour ». |
| **HR4** | « Sur le moment, ces questions m'ont aidé·e à prendre un peu de recul sur mon travail. » | **Recul subjectif et immédiat** ; pas détachement psychologique durable. |

**À garder :** modalités indépendantes de « Pas du tout » à « Tout à fait », « Je préfère ne pas répondre », absence de score et possibilité d'émotions contradictoires. Conserver la distinction existante entre la **matrice BS × B/C** et les **réponses HR séparées**.

**À mieux faire :** la restitution actuelle de \`interpretHumorReaction\` choisit **un titre dominant** par cascade de conditions (amusement + peine d'abord, etc.). Cela peut **rendre moins visibles** deux réactions importantes. Afficher d'abord **quatre petites cartes non classées** avec les déclarations propres à chaque personne, puis une **phrase de synthèse non exclusive**. Surtout : si HR3 est élevé, ne pas camoufler ce signal dans une note de bas de page sous une blague.

## 5.3. Petits portraits de réaction, SANS diagnostic ni type de personnalité

| Réponses | Texte proposé dans le rapport | À ne pas conclure |
|---|---|---|
| **BS haut + HR1 haut + HR4 haut** | **« Tu reconnais le cirque, et tu as pu en rire. »** Tu déclares un recul immédiat. | Qu'il n'y a pas de souffrance, ou que l'humour protège durablement. |
| **BS haut + HR2 haut + HR3 bas** | **« Ça touche un point sensible. »** Le questionnaire évoque un vécu pénible sans que tu l'aies trouvé minimisant. | Que le BS est la cause de ce vécu. |
| **BS haut + HR1 haut + HR2 haut** | **« Drôle parce que ça fait mal ? »** Rire et peine coexistent ; la personne garde la main sur l'interprétation. | Que « rire cache forcément la détresse ». |
| **BS faible + HR1 haut** | **« Le cirque t'a fait rire, sans beaucoup te ressembler. »** | Qu'une réaction légère démontre du recul face à **son propre travail**. |
| **HR3 haut**, quel que soit BS | **« Le ton t'a semblé minimiser ce que tu vis. »** Cette réaction décrit **la réception de notre humour**, à prendre en compte. | Que la personne est « susceptible » ou « incapable de relativiser ». |
| **BS haut + HR4 bas** | **« Reconnaître l'absurde ne t'a pas aidé·e à prendre du recul sur le moment. »** | Que la personne est rigide, fragile ou dépourvue d'humour. |
| **HR1 bas + HR4 haut** | **« Pas forcément drôle. Mais un autre angle de vue. »** | Que la réévaluation s'est installée durablement. |

Les quatre réactions peuvent être **simultanément fortes** : amusement, peine, minimisation et recul. **Aucune des quatre n'annule les autres**.

## 5.4. L'angle mort de HR2/HR3 : la blague « trop vraie » et la blague « déplacée »

Imaginons deux personnes qui cochent **beaucoup de malaise** :
- **Sam** : « J'ai eu mal parce que **c'est exactement mon quotidien** ; vous avez mis le doigt dessus. »
- **Léa** : « J'ai eu mal parce que **vous faites passer un sujet pénible pour une blague**. »

Ces deux mécanismes suggèrent des **actions éditoriales différentes**. HR3 capte déjà une partie du second. **Proposition à tester** : ajouter un choix qualitatif, facultatif et **non noté**, seulement après les quatre HR :

> **« Si une question t'a fait rire ou tiquer, qu'est-ce qui a surtout joué ? »**  
> « Ça ressemble trop à mon quotidien » / « La caricature m'a fait rire » / « J'ai trouvé le ton déplacé » / « Ça m'a donné une autre façon de voir les choses » / « Rien de particulier » / « Autre / je préfère ne pas répondre ».

**Réserve :** c'est une question de **motif déclaré**, pas un accès direct au mécanisme psychologique réel. Mieux vaut cette question **facultative** qu'un score supplémentaire de « capacité à relativiser ».

**Deux questions expérimentales seulement, si les entretiens montrent un manque :**
- **HR5 (colère)** : « Certaines questions m'ont agacé·e ou mis·e en colère. » Objectif : distinguer colère et peine.
- **HR6 (réalisme)** : « Ces questions décrivent une situation professionnelle que j'ai vécue récemment. » Objectif : séparer **amusement devant une caricature** et **identification à une expérience réelle**.

**Ne pas ajouter HR5 et HR6 d'emblée** : le questionnaire propose déjà 79 questions, et deux nouvelles réponses n'ont de valeur que si elles modifient la **qualité d'une interprétation** ou d'une action. L'option qualitative en une ligne semble être le meilleur premier essai.

## 5.5. Quand la réaction aide à réfléchir aux conditions de travail

L'objectif n'est pas d'évaluer une vertu individuelle, mais de poser une question productive :

- Si **BS** est élevé et **B/C3-C5** ressortent : « Quelle tâche a cessé de te sembler utile, depuis quand, et à cause de quoi selon toi ? » **Hypothèses à confronter**, pas causalité.
- Si **BS** est élevé et **recul immédiat HR4** ressort : « Cette prise de recul t'aide-t-elle à **prioriser autrement** une situation concrète, ou seulement à en rire quelques secondes ? »
- Si **HR3** est élevé : « Quelle formulation t'a paru injuste ou minimisante ? » Le premier objet d'amélioration peut être **Bull-Out lui-même**.
- Si **BS** est élevé mais **sens du travail conservé** : « Qu'est-ce qui mérite d'être protégé ? Quels rituels pourraient être allégés ? »

**Attention clinique :** le rapprochement BS × B/C **n'est pas une mesure de résilience** ; la distance B fait elle-même partie de la lecture des signes d'usure. Promouvoir le « détachement » comme méthode de survie quand B est déjà élevé peut être contradictoire. La V3 a déjà écarté les recommandations automatiques de ce type : **conserver cette garde-fou**.

---

# 6. Validation proposée : rendre l'expérience intéressante ET honnête

**Aucune validation d'une méthode n'est obtenue en ajoutant des références à la fin.** Les références établissent les **concepts** ; elles ne valident pas **nos items**.

### Étape A — Entretien cognitif (priorité 1)

**8 à 12 participants** de profils contrastés (cadres/techniciens/santé/production/indépendants, si possible) ; nombre exploratoire, **pas** puissance statistique. Leur faire lire BS1–BS12 et HR1–HR4, puis demander : **« À quel fait concret as-tu pensé ? Pourquoi cette réponse et pas la précédente ? As-tu choisi pour décrire la réalité ou pour la blague ? »** Recueillir aussi incompréhensions, stéréotypes de professions, sentiment de jugement, lecture sur mobile. Faire relire le chapitre par les deux psychologues associés au projet.

### Étape B — Contrôle des confusions (priorité 2)

Confronter, sans chercher un « chiffre parfait », les thèmes BS à :
**(i)** T4 qualité empêchée ; **(ii)** B distance ; **(iii)** C3/C5 difficultés de sens ; **(iv)** D/E exigences/ressources ; **(v)** les situations professionnelles rapportées. Chercher **les divergences explicables** : BS élevé et travail utile, BS faible et usure élevée, BS élevé et HR1 très haut, etc.

### Étape C — Effet de notre satire (priorité 3)

Dans un petit pilote, comparer **aléatoirement** une version des 12 situations avec **choix drôles** et une version avec **réponses factuelles + chute humoristique après**. Même période, mêmes situations, mêmes dimensions. Tester : compréhension, plaisir, acceptabilité, taux d'abandon, choix extrêmes, différence d'HR4 et d'HR3. **L'effet de la formulation** serait exploré, mais ne démontrerait pas la « résilience » ; pour étudier un effet durable, il faudrait un protocole de suivi distinct.

### Étape D — Si le site évolue

1. **Ne modifier aucun score A–F, aucune alerte, aucun modèle principal** en raison d'un résultat BS ou HR.
2. **Ne pas faire glisser BS dans le total de burn-out.** Ajouter éventuellement le volet 6 bis, hors score, avec un quiz de compréhension **non diagnostique**.
3. Si le texte des questions BS change substantiellement : **nouvelle version** \`versionBullshitometre\`, traçabilité, test de migration ; **ne pas réinterpréter les anciennes réponses**.
4. Si une HR change de sens : versionner \`versionReactionHumour\`, **invalider uniquement les anciennes réponses concernées** ; conserver les abstentions, ne pas inventer de choix.
5. Vérifier les quatre cases de la matrice existante, les exemples BS, HR contradictoires, BS historiquement passés, export des rapports, et **PDF Essentiel vs Complet**.
6. Mettre à jour ensemble \`methode.html\`, textes d'accessibilité, tests Node, contenus de formation et rapport ; **pas seulement une illustration**.
7. Faire un contrôle de **longueur et d'adhésion** : ne pas épuiser la personne avec une formation sur le burn-out.

### Critères d'acceptation pour Claude

- Le lecteur comprend **pourquoi 37 %, 8 %, 4,8 % et >19 % ne désignent pas la même chose**.
- Il distingue **métier utile**, **tâche absurde** et **discours pipeau**, sans dévalorisation d'une profession.
- Il comprend pourquoi une **association** entre inutilité ressentie et mal-être n'identifie **pas une causalité individuelle**.
- L'**humour reste drôle** et les propositions BS deviennent suffisamment **ancrées dans des épisodes** pour guider une discussion.
- HR3 peut être haut **en même temps** que HR1, HR2 et HR4 ; aucun « bon profil » de rire.
- Le **pipeau est clairement étiqueté « hors score »**, distinct de la balance, du retour, des manifestations et de la sécurité ; **pas de flèche causale**.
- La V3 existante reste intacte tant que David n'a pas validé le périmètre et la banque de questions.

---

# 7. Sources vérifiées et niveau de preuve

Les liens ci-dessous renvoient en priorité aux **textes originaux**, aux revues ou aux organismes publics. **Rappel :** les théories de Graeber, Merton, Meyer/Rowan et Spicer proposent des **mécanismes et des concepts** ; les études quantitatives ne démontrent pas toutes les mêmes hypothèses.

**Origines et enquêtes sur l'inutilité du travail**

- **[S1] Graeber, D. (2013).** *On the Phenomenon of Bullshit Jobs: A Work Rant*. **STRIKE! Magazine**, n°3. Essai fondateur, non enquête représentative. https://strikemag.org/bullshit-jobs/
- **[S2] Graeber, D. (2018).** *Bullshit Jobs: A Theory*. Simon & Schuster. Typologie des cinq catégories ; ouvrage théorique nourri de témoignages. https://davidgraeber.org/books/bullshit-jobs/
- **[S3] YouGov (2015).** *37% of British workers think their jobs are meaningless*. **Sondage**, pas preuve objective d'inutilité. https://yougov.com/en-gb/articles/13005-british-jobs-meaningless
- **[S4] Dur, R., & van Lent, M. (2019).** *Socially Useless Jobs*. **Industrial Relations**, 58(1), 3–16. Enquête comparative d'environ 100 000 répondants dans 47 pays ; 8 % jugent leur travail inutile, 17 % incertains. https://doi.org/10.1111/irel.12227
- **[S5] Soffia, M., Wood, A. J., & Burchell, B. (2022 ; en ligne 2021).** *Alienation Is Not ‘Bullshit’: An Empirical Critique of Graeber’s Theory of BS Jobs*. **Work, Employment and Society**, 36(5), 816–840. Enquêtes européennes ; critique de plusieurs prédictions de Graeber, association inutilité–bien-être. https://doi.org/10.1177/09500170211015067 — Synthèse de l'université de Cambridge : https://www.cam.ac.uk/research/news/one-in-twenty-workers-are-in-useless-jobs-far-fewer-than-previously-thought
- **[S6] Walo, S. (2023).** *‘Bullshit’ After All? Why People Consider Their Jobs Socially Useless*. **Work, Employment and Society**, 37(5), 1123–1146. N = 1 811 (États-Unis), complément et contradiction partielle des résultats européens, limites de comparabilité. https://doi.org/10.1177/09500170231175771

**Risques psychosociaux, organisation, modèles explicatifs**

- **[S7] INRS.** *Risques psychosociaux — Facteurs de risque*, rubrique **Conflits de valeurs** (travail jugé inutile, méthode inefficace, qualité empêchée). Source institutionnelle pour le périmètre français. https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html
- **[S8] Spicer, A. (2020).** *Playing the Bullshit Game: How Empty and Misleading Communication Takes Over Organizations*. **Organization Theory**, 1(2). Modèle théorique d'interactions auto-entretenues autour d'un langage vide. https://doi.org/10.1177/2631787720929704
- **[S9] Ferreira, M. et al. (2020, en ligne ; 2022 pour la publication selon indexation).** *This Place Is Full of It: Towards an Organizational Bullshit Perception Scale*. **Psychological Reports**. Échelle de **communication déconnectée de la vérité** : objet distinct de BS Bull-Out. https://doi.org/10.1177/0033294120978162 . **Actualisation : Stein, M. et al. (2026)**, commentaire sur les limites psychométriques de cette échelle (problèmes de structure, fidélité, items inversés) ; utile précisément pour éviter d'appeler notre BS « validé » : https://doi.org/10.1177/00332941261473850
- **[S10] Riester, J., & Keller, J. (2025 ; article en ligne sept. 2024).** *Considering the Dark Side of Work: Bullshit Job Perceptions, Deviant Work Behavior, and the Moderating Role of Work Ethic*. **Journal of Business Ethics**, 198, 675–693. Trois études transversales ; associations et modulation par éthique du travail. https://doi.org/10.1007/s10551-024-05821-w
- **[S11] Riester, J., & Keller, J. (2025, en ligne 16 décembre).** *Recollection of Bullshit Work Episodes (vs. Meaningful or Neutral Ones) Relates to Negative Affect, Deviant Work Behavior and Turnover Intentions*. **Psychological Reports**, publication en ligne. N = 253 ; expérience de **rappel d'épisodes**, et **intentions** plutôt que comportements mesurés à long terme. https://doi.org/10.1177/00332941251409172
- **[S12] DARES (2021).** *Conflits de valeurs au travail : qui est concerné et quels liens avec la santé ?* Enquête française sur conflits éthiques, qualité empêchée et sentiment d'inutilité. https://dares.travail-emploi.gouv.fr/publication/conflits-de-valeurs-au-travail-qui-est-concerne-et-quels-liens-avec-la-sante
- **[S13] Merton, R. K. (1940).** *Bureaucratic Structure and Personality*. **Social Forces**. Formulation classique du **déplacement des buts** ; proposition sociologique, pas diagnostic du dossier Sam. https://www.d.umn.edu/cla/faculty/jhamlin/4111/Merton/Social%20Theory%20and%20Social%20Structure%20Bureaucratic%20Structure%20a.htm
- **[S14] Meyer, J. W., & Rowan, B. (1977).** *Institutionalized Organizations: Formal Structure as Myth and Ceremony*. **American Journal of Sociology**, 83(2), 340–363. Théorie des **structures formelles comme signaux de légitimité**. https://doi.org/10.1086/226550

**Humour, réception émotionnelle, récupération et limites**

- **[S15] McGraw, A. P., & Warren, C. (2010).** *Benign Violations: Making Immoral Behavior Funny*. **Psychological Science**, 21(8), 1141–1149. Théorie expérimentale de la violation bénigne ; la distance psychologique peut rendre une violation drôle sans effacer les émotions négatives. https://doi.org/10.1177/0956797610376073
- **[S16] Samson, A. C., Glassco, A. L., Lee, I. A., & Gross, J. J. (2014).** *Humorous Coping and Serious Reappraisal: Short-Term and Longer-Term Effects*. **Europe's Journal of Psychology**, 10(3). Expérience n = 57 sur images négatives, **pas sur burnout au travail**. https://doi.org/10.5964/ejop.v10i3.730
- **[S17] *You Must Be Joking! Benign Violations, Power Asymmetry, and Humor in a Broader Social Context* (2019).** **Frontiers in Psychology**. La réception d'une plaisanterie varie selon les rapports de pouvoir, la distance et le contexte. https://doi.org/10.3389/fpsyg.2019.01380
- **[S18] Sonnentag, S., & Fritz, C. (2007).** *The Recovery Experience Questionnaire: Development and Validation of a Measure for Assessing Recuperation and Unwinding From Work*. **Journal of Occupational Health Psychology**, 12(3), 204–221. Quatre dimensions : détachement psychologique, relaxation, maîtrise, contrôle. **Ne pas assimiler HR4 à cette échelle.** https://doi.org/10.1037/1076-8998.12.3.204
- **[S19] Martin, R. A., Puhlik-Doris, P., Larsen, G., Gray, J., & Weir, K. (2003).** *Individual Differences in Uses of Humor and Their Relation to Psychological Well-Being: Development of the Humor Styles Questionnaire*. **Journal of Research in Personality**, 37(1), 48–75. Différentes utilisations de l'humour ; HR1–HR4 **ne constituent pas** le questionnaire validé. https://doi.org/10.1016/S0092-6566(02)00534-2

## 8. Remise à Claude : ordre de travail conseillé

1. **Lire ce document et l'état actuel de \`main\` ; décider avec David** du statut « interlude 6 bis » et du choix **pipeau + miroir** sous le schéma.
2. **Conserver le chapitre proposé comme texte pédagogique**, en vérifiant liens et nuances, puis l'intégrer aux composants existants **sans casser** les neuf étapes, la progression, l'évaluation finale et la génération du rapport.
3. **Ne pas refondre tout le Bullshitomètre d'un coup** : commencer par un prototype lisible mobile des douze items proposés, avec leurs **nouveaux objets mesurés**, puis tests cognitifs et arbitrage. Établir avant toute mise en production la version, les poids et la migration.
4. **Préserver et améliorer la restitution HR** : montrer les quatre réactions en parallèle ; ne pas créer un score de résilience, de souplesse ou de relâchement. Tester la question qualitative facultative seulement si sa valeur est démontrée.
5. Tester **UX, accessibilité, sauvegardes, rapports, PDF, cohérence du schéma**. N'écrire sur \`main\` le code qu'après validation du périmètre.

**Fin du document.**