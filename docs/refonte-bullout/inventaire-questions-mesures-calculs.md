# Bull-Out — inventaire de ce qui est réellement demandé, calculé et représenté

**État du dépôt : 20 novembre 2026 — branche `main`, avant la PR d'audit du soir.** Les lignes barrées ou annotées ont été corrigées depuis : voir [l'audit](historique/audit-2026-11-20.md).  
**Statut : photographie du code, non validation scientifique, aucune décision de réécriture.**  
Fichiers de référence : [script.js](../../script.js), [rapport.js](../../rapport.js), [bullshitometre-data.js](../../bullshitometre-data.js), [formation-contenu.js](../../formation-contenu.js).

## 1. Quatre niveaux qu'il ne faut pas confondre

1. **Réponse observée** : ce que la personne coche, dans une période donnée ; c'est une déclaration, pas une observation externe.
2. **Indicateur construit** : somme de réponses, inversion, moyenne repondérée, pourcentage, seuil ou profil décidé par le code.
3. **Traduction graphique** : épaisseur d'un trait, niveau de batterie, jauge, couleur, alerte, interprétation textuelle.
4. **Inférence** : explication possible, attribution au travail, conseil ou hypothèse causale. La réponse ne prouve pas l'inférence.

Parler de « ce qu'on mesure » exige de préciser le niveau. Les échelles A–F sont des **scores internes à Bull-Out**, inspirés de modèles scientifiques mais non étalonnés. Elles ne produisent ni diagnostic ni probabilité de burn-out. Les autres modules ne doivent pas être assimilés à des validations indépendantes.

## 2. Comptage réel et périmètre

| Bloc | Questions | Type d'item | Statut de calcul |
|---|---:|---|---|
| A à F | 36 (6 × 6) | Fréquence 0 à 4 | Score par dimension, total 0–144 |
| G | 6 | Fréquence 0 à 4, sens positif | Appuis, hors total |
| R | 6 | Fréquence 0 à 4, récompenses positives / surengagement négatif | Lectures reconstruites, hors total |
| BS | 8 | Quatre choix satiriques pondérés | Indices artisanaux %, hors total |
| Contexte | 8 | Oui / non | Modifie commentaire et orientation, pas le total |
| Sécurité | 3 | Oui / non | Déclenche un signal distinct, hors total |
| **Total** | **67** | Plusieurs systèmes de réponse | Toutes obligatoires dans le flux actuel |

**Période déclarée** : quatre dernières semaines pour les parties notées ; les questions de contexte et de sécurité ne précisent pas toujours une temporalité propre. Les réponses G, R et les scores A–F ne donnent pas une histoire longitudinale.

## 3. Grille des dimensions et usages codés

| Bloc | Catégorie | Contenu déclaré | Transformation et utilisation actuelle |
|---|---|---|---|
| A | Manifestations | Épuisement, anticipation de la journée, altérations émotionnelles et cognitives | Score A (0–24) ; profils, verdict, visuel et calcul artificiel de batterie. |
| B | Manifestations | Distance au travail, cynisme, évitement | Score B (0–24) ; profil de désengagement, graphique, croisement avec bullshitomètre. |
| C | Manifestations et rapport au travail | Efficacité, confiance, perception de sens et identité professionnelle | Score C (0–24), puis sous-groupes efficacité C1/C2/C4/C6 et perte de sens C3/C5. |
| D | Exposition professionnelle déclarée | Charge, interruptions, ambiguïté, responsabilités, émotion, dysfonctionnements | Score D (0–24) ; lecture JD-R ; D1/D4/D6 réutilisés pour l'effort Siegrist. |
| E | Ressources professionnelles déclarées | Autonomie, arbitrage, entraide, clarté, reconnaissance, équité | Score E inversé (24 - somme brute E) ; présence de ressources = 24 - E ; E5/E6 réutilisés pour les récompenses. |
| F | Récupération, retentissement, comportements, sécurité | Rumination, sommeil, loisirs, symptômes, stratégies de compensation, erreurs | Score F (0–24) ; batterie A+F, corps F2/F4/F5/F6, recharge F1/F3, surengagement F1. |
| G | Appuis déclarés hors score global | Utilité, capacité à décrocher, liens, activités, demande d'aide, négociation | Six réponses positives 0–4 ; nombre de points forts (réponses 3–4), annexe et conseils. |
| R | Récompenses et surengagement hors score global | Salaire, perspectives, sécurité d'emploi, difficulté à refuser, besoin de prouver, anticipation | R1–R3 positives ; R4–R6 signes de surengagement ; reprises dans la lecture Siegrist. |

## 4. Les questions actuelles, dans leur formulation exacte

Les textes ci-dessous sont extraits de `script.js` et `bullshitometre-data.js`, sans reformulation. Leur présence dans une section ne signifie pas que tous les items mesurent le même construit.

### A — Épuisement, anticipation de la journée, altérations émotionnelles et cognitives

- **A1** — Après une journée de travail, je n'ai plus assez d'énergie pour mes activités personnelles habituelles.
- **A2** — Même après un repos court (une soirée, un week-end), j'ai l'impression de ne pas récupérer réellement.
- **A3** — Certaines journées, je me sens saturé·e avant même de commencer, à l'idée de ce qui m'attend.
- **A4** — Les tâches ordinaires me demandent un effort disproportionné.
- **A5** — Je deviens irritable ou hypersensible face à des sollicitations professionnelles normales (celles de mon poste, que je gérais sans difficulté avant).
- **A6** — J'ai du mal à maintenir mon attention ou ma mémoire de travail au niveau habituel.

### B — Distance au travail, cynisme, évitement

- **B1** — Je me surprends à me détacher mentalement du travail pour me protéger.
- **B2** — Je deviens plus cynique sur l'utilité de ce que je fais.
- **B3** — J'évite certaines interactions professionnelles parce qu'elles me coûtent trop.
- **B4** — Je ressens moins d'empathie ou de patience envers des personnes avec qui je travaille.
- **B5** — Je fais le minimum relationnel nécessaire pour tenir la journée.
- **B6** — Je fais mon travail de façon plus mécanique, sans vraiment m'y impliquer.

### C — Efficacité, confiance, perception de sens et identité professionnelle

- **C1** — Je doute plus souvent de ma capacité à produire un travail de qualité.
- **C2** — Je constate une baisse de qualité ou de fiabilité malgré mes efforts.
- **C3** — J'ai du mal à voir le sens concret de mon travail.
- **C4** — Je me sens moins compétent·e dans des tâches que je maîtrisais auparavant.
- **C5** — Je termine des journées avec le sentiment de n'avoir rien accompli d'utile.
- **C6** — Je ne me reconnais plus dans ma façon de travailler.

### D — Charge, interruptions, ambiguïté, responsabilités, émotion, dysfonctionnements

- **D1** — La quantité de travail dépasse régulièrement ce qui peut être fait correctement dans le temps disponible.
- **D2** — Les urgences ou interruptions empêchent de travailler de manière soutenable.
- **D3** — Je reçois des priorités contradictoires ou insuffisamment arbitrées.
- **D4** — Je porte une responsabilité forte sans moyens ou autorité suffisants.
- **D5** — Les exigences émotionnelles ou relationnelles de mon poste sont élevées.
- **D6** — Je dois compenser des dysfonctionnements d'organisation pour que le travail sorte quand même.

### E — Autonomie, arbitrage, entraide, clarté, reconnaissance, équité

- **E1** — Je dispose d'une marge de manœuvre réelle pour organiser mon travail.
- **E2** — Mon manager m'aide à arbitrer lorsque la charge dépasse la capacité réelle.
- **E3** — Mes collègues constituent un soutien concret en cas de difficulté.
- **E4** — Les objectifs et responsabilités sont suffisamment clairs.
- **E5** — Mes efforts sont reconnus de manière crédible et proportionnée.
- **E6** — Les décisions qui me concernent me paraissent globalement équitables.

### F — Rumination, sommeil, loisirs, symptômes, stratégies de compensation, erreurs

- **F1** — Je rumine le travail le soir, le week-end ou pendant les congés.
- **F2** — Mon sommeil est moins réparateur ou perturbé par le travail.
- **F3** — J'ai réduit mes loisirs, activités physiques ou relations sociales à cause du travail.
- **F4** — J'ai des symptômes physiques inhabituels ou aggravés en période de travail.
- **F5** — J'utilise davantage des stratégies de compensation pour tenir ou dormir : alcool, substances, écrans, alimentation, médicaments hors cadre prescrit.
- **F6** — J'ai eu des oublis, erreurs, quasi-accidents ou comportements impulsifs inhabituels liés à la fatigue.

### G — Utilité, capacité à décrocher, liens, activités, demande d'aide, négociation

- **G1** — Je vis au travail des moments où je me sens utile et à la hauteur.
- **G2** — J'arrive à décrocher vraiment du travail au moins une soirée ou une journée par semaine.
- **G3** — En dehors du travail, j'ai des personnes à qui je peux parler de ce que je vis.
- **G4** — Je garde des activités qui me ressourcent (sport, nature, création, amis…) et je les pratique.
- **G5** — Quand une difficulté se présente au travail, j'arrive à en parler ou à demander de l'aide.
- **G6** — Je sais dire non, ou négocier un délai, quand la charge devient trop lourde.

### R — Salaire, perspectives, sécurité d'emploi, difficulté à refuser, besoin de prouver, anticipation

- **R1** — Mon salaire est en rapport avec mon investissement et mes responsabilités.
- **R2** — Mes perspectives d'évolution sont à la hauteur des efforts que je fournis.
- **R3** — Ma situation d'emploi me paraît stable : je ne crains pas de perdre mon poste ou de subir un changement imposé.
- **R4** — J'ai du mal à refuser une demande, même quand je suis déjà débordé·e.
- **R5** — Je me sens obligé·e d'en faire plus que ce qu'on attend de moi pour prouver ma valeur.
- **R6** — Dès le réveil, je pense déjà aux problèmes du travail.

### BS — Bullshitomètre (huit questions à choix satiriques)

- **BS1** — Quand on te demande ce que tu as produit aujourd’hui, ta réponse la plus honnête ressemble à :
- **BS2** — Combien de réunions pourraient être remplacées par un mail de 6 lignes ?
- **BS3** — Ton outil de pilotage principal sert surtout à :
- **BS4** — La phrase “il faut qu’on se cale” signifie généralement :
- **BS5** — Ton niveau d’impact réel sur les décisions importantes est :
- **BS6** — Quelle proportion de tes livrables est relue pour le fond ?
- **BS7** — Le mot “transverse” dans ton environnement veut dire :
- **BS8** — À la fin d’une semaine, tu as surtout l’impression :

Chaque option est dotée de poids propres pour les quatre sous-indices : `meeting / dashboard / ghost / absurd`. Ce ne sont pas des intensités psychométriques. Les intitulés visibles sont : Réunionite, Dashboardologie, Contribution fantôme, Absurdité globale.

### Contexte — huit éléments oui / non

- **X1 / harassment** — Je subis ou pense subir du harcèlement, des humiliations, des menaces ou des violences.
- **X2 / ethicalConflict** — Je vis un conflit éthique : on me demande de faire un travail contraire à mes valeurs professionnelles, à la qualité ou à la sécurité.
- **X3 / personalBurden** — Je vis en parallèle une situation personnelle lourde : deuil, séparation, maladie, aidance, charge familiale importante.
- **X4 / previousMedicalAlert** — J'ai déjà eu un arrêt, une alerte médicale ou une consultation liée à cette situation de travail.
- **X5 / collectiveSignal** — Plusieurs collègues semblent vivre le même type d'usure ou de surcharge.
- **X6 / safetySensitiveJob** — Mon poste comporte des enjeux de sécurité : conduite, machines, soins, décisions critiques, erreurs à conséquences graves.
- **X7 / fearToSpeak** — J'ai peur de parler de la situation à mon manager ou à mon organisation.
- **X8 / wantToLeave** — Je pense sérieusement à quitter mon poste ou mon métier.

### Alertes — trois éléments oui / non

- **Alerte 1** — J'ai eu des idées noires ou suicidaires.
- **Alerte 2** — Je me sens incapable de continuer à fonctionner normalement.
- **Alerte 3** — J'ai des symptômes physiques inquiétants : malaise, douleur thoracique, essoufflement inhabituel, perte de contrôle.

Les trois questions d'alerte mélangent des situations de gravité et d'urgence différentes. Leur réponse positive déclenche aujourd'hui un même dispositif d'orientation. L'enjeu n'est pas de réduire la sécurité à un score, mais de personnaliser le message en fonction du signal réellement déclaré.

## 5. Calculs du moteur : ce qui est dérivé, non directement mesuré

| Objet calculé | Formule / règle actuelle | Ce qu'on peut en dire |
|---|---|---|
| `A` à `F` | Six réponses de 0 à 4 → somme 0–24. Pour E : 4 – réponse brute | Sommes descriptives, à homogénéité et validité non démontrées |
| Niveaux A–F | 0–6 faible ; 7–12 vigilance ; 13–18 élevé ; 19–24 alerte | **Seuils arbitraires par quarts de l'échelle**, non cliniques |
| Total | A+B+C+D+E+F → 0–144 | Mélange manifestations, expositions et ressources : aucune signification psychométrique validée |
| Niveau global | Alerte si drapeau ou total ≥109 ; élevé ≥73 ; vigilance ≥37 | Seuils internes non validés |
| Profil | Alerte si drapeau, total ≥109 ou signe d'usure (A, B, C, F) ≥22 *(D et E exclus depuis le 20/11 au soir)* ; puis règles basées sur A/F/B/C/D/E | Catégories heuristiques, sensibles aux seuils et à l'ordre des règles |
| « Énergie restante » | ~~`100 - ((A + F)/48 × 100)`~~ remplacé le 20/11 au soir par le niveau de `(A + F) / 2`, en quatre crans, sans pourcentage | L'ancien pourcentage était fictif ; le niveau en crans reste une convention |
| JD-R « équilibre » | D vs `24-E`, lecture par différence | Comparaison descriptive ; pas une compensation quantitative prouvée |
| ERI « effort » | Moyenne `D1, D4, D6` ×6 | Recomposition maison, pas l'échelle ERI validée |
| ERI « récompense » | Moyenne `E5, E6, R1, R2, R3` ×6 | Réutilise E et les réponses R |
| « Surengagement » | Moyenne `R4, R5, R6, F1` ×6 | Réutilise une question F de rumination |
| Efficacité | Moyenne `C1, C2, C4, C6` ×6 | Indice maison de quatre items |
| Perte de sens | Moyenne `C3, C5` ×6 | Seulement deux items ; variations grossières masquées par l'échelle sur 24 |
| « Absurdité » | Somme des poids des réponses BS / somme maximale théorique, en % ; quatre sous-indices | Pourcentage satirique, pas mesure psychométrique |
| « Humour protecteur » | `BS≥50 %` croisé à `B<13` et `perteSens<13` | Le mécanisme protecteur de l'humour **n'est pas questionné directement** |
| « Appuis » | G réponses ≥3 ; E présence ≥3 ; réponses de difficulté faibles | Liste d'indicateurs favorables ; ne calcule pas une protection objective |
| « Recharge » dans le dessin | `8-F1-F3` + nombre de réponses G fortes + éventuel humour | Inférence visuelle arbitraire |
| Corps et sécurité | F2, F4, F5, F6 ; parfois « envie de partir » du contexte | Catégories de retentissement mêlées ; envie de partir ≠ symptôme corporel |
| « Validité des réponses » | Détection de réponses identiques / extrêmes et quelques paires incohérentes | Contrôle descriptif de forme, **pas preuve de validité, fidélité ou sincérité** |

`rapport.js` calcule une seconde couche de mesures et de commentaires, parfois distincte des sorties de `script.js`. Une modification du moteur doit donc cartographier **les deux fichiers**.

## 6. Les quinze éléments du schéma actuel : leur provenance exacte

| Pièce visible du diagramme | Questions / calcul | Nature épistémique |
|---|---|---|
| 1. Exigences | D1–D6 | Déclaration par score |
| 2. Ressources professionnelles présentes | E1–E6, somme positive `24-E` | Déclaration inversée pour l'affichage |
| 3. Effort | D1, D4, D6 | Reconstruction partielle ERI |
| 4. Récompense / retour | E5, E6, R1–R3 | Reconstruction partielle ERI |
| 5. Surengagement | R4–R6 + F1 | Reconstruction partielle ERI |
| 6. Contexte | X1–X8, sous-ensemble choisi | Déclaration binaire ; épaisseur conventionnelle |
| 7. Batterie / énergie qui reste | A1–A6 + F1–F6 | Valeur dérivée **sans unité réelle** |
| 8. Ce qui recharge / appuis | F1, F3, G1–G6, éventuellement BS+B+C | Lecture composite non validée |
| 9. Épuisement | A1–A6 | Score de manifestations |
| 10. Distance / cynisme | B1–B6 | Score de manifestations |
| 11. Efficacité | C1, C2, C4, C6 | Sous-score maison |
| 12. Perte de sens | C3, C5 | Sous-score maison |
| 13. Signaux « du corps » | F2, F4, F5, F6 + envie de partir selon contexte | Regroupe sommeil, physiologie, stratégies, sécurité, projet de départ |
| 14. Alerte | Trois questions dédiées | Signal distinct, non proportionnel |
| 15. Absurde | BS1–BS8 + croisement B et C3/C5 | Indicateur satirique et interprétation secondaire |

**Conclusion sur le visuel** : les quinze éléments n'ont pas la même solidité ; les traiter comme quinze flux comparables induit en erreur. Le schéma existant peut toutefois rester le meilleur **organisateur conceptuel** si les conventions graphiques deviennent explicites et si les fausses grandeurs sont abandonnées.

## 7. Réemploi, recouvrement et fausses confirmations

- D1/D4/D6 sont présents dans la lecture JD-R et dans « effort » de Siegrist.
- E5/E6 se retrouvent dans ressources JD-R et récompenses Siegrist.
- F1 apparaît dans récupération et surengagement.
- C3/C5 participent à C, à la perte de sens et au croisement avec BS.
- B sert à la lecture de l'épuisement et du bullshitomètre.
- G1 est proche de C1/C4/C5 dans le thème du sentiment d'efficacité / utilité.
- G2 (décrochage hors travail) est voisin de F1 (rumination).
- G6 (savoir dire non) est voisin de R4 (difficulté à refuser).
- Certains items de C (efficacité/sens) recouvrent sémantiquement des réponses de BS (utilité des livrables).

**Conséquence** : des lectures complémentaires ne sont pas trois preuves indépendantes. Il faut compter les réponses une fois et présenter les modèles comme des hypothèses de lecture.

## 8. Couverture des six familles de facteurs RPS selon l'INRS / Gollac

| Famille | Éléments qui y contribuent actuellement | Couverture probable / limite |
|---|---|---|
| Intensité et temps du travail | D1, D2, D6 | Plusieurs angles, mais pas d'horaires ou d'amplitude explicites |
| Exigences émotionnelles | D5 | Un seul item, très large |
| Autonomie | E1, E2, D4 | Plusieurs facettes, confond parfois moyens et autorité |
| Rapports sociaux | E2, E3, E5, E6, contexte harcèlement | Bonne amorce ; conflits/violences pas détaillés |
| Conflits de valeurs | Contexte conflit éthique, C3/C5, BS | **Sous-couvert** côté exposition ; manque de qualité empêchée explicite |
| Insécurité de la situation | R3 | Un seul item, mélange peur de perdre et changement imposé |

Il s'agit d'une **cartographie conceptuelle**, pas d'une démonstration de couverture psychométrique. Référentiel INRS : https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html

## 9. Décisions ouvertes avant la conception graphique

1. **But de Bull-Out** : mesurer des symptômes de burn-out, cartographier des conditions de travail, préparer une décision ou articuler ces trois fonctions ? Avec quelle priorité ?
2. **Statut des échelles** : sommes descriptives maison ou noyau psychométrique validé à examiner séparément ?
3. **Quel rôle pour chaque question** : mesure, contexte, alerte, aide à l'action ou humour ?
4. **Quels recouvrements conserver** : redondance utile pour vérification ou répétition inutile ?
5. **Quelle formulation pour les profils et les urgences** : interprétations prudentes mais exploitables, sans bannière alarmiste automatique ?
6. **Quels éléments de la vue d'ensemble sont observés, reconstruits ou hypothétiques** : convention visuelle et légende accessibles ?
7. **Quand ajouter des questions** : seulement si une décision interprétative précise en a besoin ; priorité à durée, évolution, qualité empêchée, distinction de l'humour et du retentissement.
8. **Métaphore** : ne rien trancher avant que la taxonomie des mesures et la logique d'inférence soient stabilisées.

## 10. Sources de référence pour l'étape suivante

- OMS — burn-out, CIM-11 (QD85), phénomène professionnel : https://www.who.int/news-room/detail/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases
- INRS — facteurs RPS, six familles : https://www.inrs.fr/risques/psychosociaux/facteurs-risques.html
- Schaufeli et coll. (2020) — construction et validation BAT : https://pmc.ncbi.nlm.nih.gov/articles/PMC7766078/
- Pour l'origine précise des questions et des autres références, voir `formation-contenu.js` et `methode.html`.

**Ce dossier décrit l'existant ; il ne constitue pas une consigne de réécriture automatique.**
