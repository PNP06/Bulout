# Bull-Out — cadrage scientifique, questionnaire, moteur, récit visuel et rapport

**Version de travail : 20 novembre 2026 — analyse, sans modification du dépôt**  
**Dépôts consultés :** `PNP06/Bulout` (branche `main`) et `PNP06/Psytest` ; document utilisateur : *Bull-out : débat critique* (12 pages).

## 0. Décision directrice

Bull-Out ne devrait pas répondre seulement à « Ai-je un burn-out ? ». Son apport particulier est de séparer :

1. **Ce qui se manifeste** : épuisement, distance mentale, difficultés cognitives et émotionnelles, retentissement et sécurité.
2. **Ce qui est vécu au travail** : exigences, autonomie, arbitrages, soutien, justice, reconnaissance, qualité empêchée, emploi et valeurs.
3. **Ce qui module la situation** : récupération, ressources extraprofessionnelles, surengagement, circonstances personnelles et collectives.
4. **Ce qui peut changer** : exposition, organisation, appuis, soins, protection, traçabilité et suivi.

Un rapport crédible montre les **associations déclarées** entre ces domaines, sans les transformer en causes individuelles prouvées. Chaque dimension est descriptive avant d'être chiffrée. Une alerte clinique est indépendante d'un score élevé. Le visuel facilite la lecture, sans simuler une mesure physique de l'énergie.

**Hypothèse de conception à éprouver :** la « traversée » est le meilleur fil narratif ; le « pont sous charge » est un meilleur contre-candidat que le réservoir pour expliquer la soutenabilité du travail. L'arbitrage nécessite des prototypes et des tests utilisateurs, pas une décision esthétique prise sur le papier.

## 1. État réel de la base examinée

### Organisation du code

- `script.js` : définitions des questions, calculs de sections, seuils, profils, alertes, plan d'action, recommandations d'interlocuteurs, calcul du bullshitomètre.
- `rapport.js` : calculs interprétatifs additionnels, batteries, équilibres, SVG d'ensemble, restitution par pièces, texte du rapport et impression.
- `rapport.css` : styles et PDF court/long.
- `formation-contenu.js` : formation en neuf chapitres, cas de Sam et Léa, exercices et références.
- `parcours.js` : orchestration de la formation, navigation, progression et reprise.
- `bullshitometre-data.js` : huit questions humoristiques, poids et profils.
- `index.html` : accroche et animation de cinq actes de Sam, fondée sur une batterie chiffrée.
- `PNP06/Psytest/app/v2/draw.js` : logique du schéma Papillon, épaisseur porteuse d'information et limitation des liens causaux suggérés.

### Questionnaire actuel

**67 réponses obligatoires** : 36 (A–F, six dimensions sur 24), 6 (R, effort/récompense), 8 (BS, satire), 6 (G, appuis), 8 (contexte), 3 (alertes). Les 36 premières alimentent le total sur 144. Les autres fournissent des commentaires et croisements. Référence : `script.js`.

### Ce qui fonctionne déjà

- Style éditorial direct ; exemples Sam/Léa ; neuf chapitres ; exercices et synthèse.
- Distinction formelle entre questions notées, contexte, appuis, satire et alertes.
- Une partie des interventions porte sur le **travail réel** plutôt que sur la seule adaptation individuelle.
- Rapport avec lecture synthétique, actions concrètes, interlocuteurs, annexe des réponses ; modes PDF **complet et court** déjà présents dans `rapport.js` et `rapport.css`.
- Le message de sécurité se présente immédiatement après une réponse positive à une question d'alerte, même si ces questions arrivent à la fin.

### Constats confirmés dans le code

- `getLevel(score)` : 0–6, 7–12, 13–18, 19–24 sans étalonnage.
- `getGlobalLevel` et `determineProfile` produisent des niveaux/profils à partir de seuils composites arbitraires.
- `rapport.js` calcule une « batterie » en faisant `100 − (A + F)/48 × 100` ; ce pourcentage **ne mesure aucune énergie**.
- `rapport.js` reconstruit effort, récompense et surengagement avec `D`, `E`, `R`, `F` ; les trois lectures ne sont donc pas indépendantes.
- La perte de sens repose sur deux items (`C3`, `C5`) amplifiés sur une échelle de 24 : résolution grossière et pseudo-précision.
- Le bullshitomètre dérive des indices « % » et les croise avec la distance / le sens pour affirmer parfois que **l'humour protège**, alors que cette fonction protectrice n'est pas directement interrogée.
- Certaines phrases de synthèse prennent une observation de score pour une explication causale : « la charge a épuisé », « le recul protège », « le retour compense ».
- L'écran d'accueil simule Sam à « 80 % » et dégrade ce pourcentage, perpétuant le problème de pseudo-mesure même avant le questionnaire.

## 2. Cartographie scientifique : ce qu'on peut prétendre mesurer

### 2.1 Le statut de l'objet

La CIM-11 de l'OMS décrit le burn-out comme un **phénomène associé au contexte professionnel**, et non comme une maladie médicale classée. L'épuisement, la distance/cynisme vis-à-vis du travail et l'efficacité professionnelle réduite en sont les trois dimensions de définition. Cette classification **n'autorise pas à diagnostiquer une personne à partir des scores Bull-Out**.

La HAS demande une évaluation clinique individuelle et un diagnostic différentiel : dépression, troubles anxieux, autres causes médicales et psychosociales peuvent produire des signes communs. Un questionnaire pédagogique ne remplace pas cette évaluation.

### 2.2 Les modèles jouent des rôles différents

| Cadre | Origine / principe | Ce qu'il explique utilement | Ce que Bull-Out ne doit pas en déduire |
|---|---|---|---|
| Maslach / CIM-11 | Épuisement, distance, efficacité professionnelle | Nature des manifestations | Diagnostic, causalité, seuil clinique |
| BAT, Schaufeli et al. | Épuisement, distance, difficultés émotionnelles et cognitives | Distinctions parmi les manifestations | Validité du composite Bull-Out par simple inspiration |
| JD-R, Demerouti/Bakker | Exigences et ressources ; processus d'épuisement et de motivation | Conditions de travail à investiguer | « 14 de ressources annulent 14 d'exigences » |
| ERI, Siegrist | Effort, récompenses, surengagement | Réciprocité et engagement excessif | Ratio ERI validé obtenu par mélange d'items maison |
| Six familles de Gollac / INRS | Intensité, émotion, autonomie, rapports sociaux, valeurs, insécurité | Couverture des expositions professionnelles | Diagnostic individuel ou cause certaine |
| REQ, Sonnentag/Fritz | Détachement hors travail, relaxation, maîtrise, contrôle du temps | Mécanismes de récupération | Assimiler détachement protecteur hors travail et cynisme pendant le travail |

**Point scientifique distinctif :** adopter les six familles INRS comme grille de **couverture des expositions**, tout en utilisant Maslach/BAT pour les **manifestations**. Les modèles JD-R et ERI servent de **lectures explicatives**, pas de multiplicateurs de scores.

### 2.3 Deux architectures psychométriques possibles

**Option A — instrument pédagogique entièrement original.** Conserver des questions originales et des valeurs descriptives par thème ; supprimer toute prétention à un seuil de burn-out ou à un score de risque normé. Publication transparente de la méthode, documentation d'exemples et tests logiciels. Avantage : liberté éditoriale, maîtrise des contenus ; limite : pas de validation psychométrique.

**Option B — noyau validé + modules Bull-Out.** Utiliser, sous réserve de droits de reproduction, d'adaptation linguistique et de normes pertinentes, une échelle validée telle que BAT-12 ou CBI. Les autres questions couvrent les conditions de travail, le contexte, les ressources et la préparation d'actions, sans être fusionnées dans un score diagnostique. Avantage : davantage de solidité pour les manifestations ; coût : licences/traductions/normes à vérifier, UX et architecture à adapter, et le questionnaire validé ne diagnostique pas seul.

**Position proposée :** conserver pour l'instant A, et préparer B en étude séparée. Ne pas changer les scores avant d'avoir décidé explicitement la doctrine de mesure. Déployer tout changement avec versionnement, tests et non-comparabilité des anciennes synthèses.

## 3. Audit exhaustif des questions, par fonction

Ce qui suit n'est **pas** une réécriture définitive ni une validation psychométrique. Les recommandations sont celles d'une revue conceptuelle et UX. « Garder » signifie conserver le construit et vérifier la formulation.

### A — Épuisement (6 questions)

| ID | Audit | Décision proposée |
|---|---|---|
| A1 | Énergie après le travail ; retentissement sur la vie personnelle. | **Garder**, préciser « par rapport à d'habitude » ; éviter de déduire la cause du seul libellé. |
| A2 | Récupération après soirée/week-end, mêlée à A et F. | **Garder/reformuler** : phénomène utile, mais le week-end n'est pas un test diagnostique. Séparer repos court et amélioration en congé via suivi contextuel. |
| A3 | Saturation anticipatoire avant la journée. | **Garder comme manifestation secondaire**, pas un marqueur nécessaire de burn-out. |
| A4 | « Tâches ordinaires » : personnelles ou professionnelles ? | **Préciser** les tâches liées au travail ou séparer retentissement général. |
| A5 | Irritabilité « face à des sollicitations normales » : jugement sur la normalité. | **Reformuler** : « Plus qu'avant, mes réactions émotionnelles au travail me semblent difficiles à réguler. » |
| A6 | Attention/mémoire ; très sensible à la situation de départ. | **Garder**, expliciter « inhabituellement pour moi » ; ne pas interpréter sans contexte neurocognitif ou médical. |

### B — Distance mentale / cynisme (6)

| ID | Audit | Décision proposée |
|---|---|---|
| B1 | « Me détacher pour me protéger » peut être une stratégie consciente saine. | **Reformuler** : perte durable d'intérêt/investissement involontaire, et éviter l'assimilation au détachement hors travail. |
| B2 | Cynisme envers l'utilité : chevauchement avec perte de sens (C3/C5). | **Conserver mais différencier** attitude cynique vs jugement sur l'utilité. |
| B3 | Évitement d'interactions « parce qu'elles coûtent » : utile, mais potentiellement protecteur. | **Reformuler** en changement récent et retentissement. |
| B4 | « Moins d'empathie » est moralement chargé, fortement dépendant du métier. | **Reformuler** en patience/disponibilité relationnelle par rapport à l'habitude. |
| B5 | « Minimum relationnel » peut être une frontière saine ou une modalité normale du poste. | **Remplacer** par une mesure de retrait vécu comme nouveau ou problématique. |
| B6 | Travail « mécanique » : peut décrire une tâche routinière normale. | **Garder sous condition** : changement dans le vécu (« auparavant impliqué, désormais indifférent »). |

### C — Efficacité et sens (6)

| ID | Audit | Décision proposée |
|---|---|---|
| C1 | Doute sur la qualité : sentiment d'efficacité. | **Garder** ; lié au sentiment, non à une mesure objective. |
| C2 | « Baisse de qualité ou de fiabilité » : chevauchement avec F6 erreurs et auto-évaluation imprécise. | **Clarifier** en conséquence observable ou retirer si doublon. |
| C3 | Sens concret du travail. | **Garder et isoler** comme « sens perçu », hors sous-échelle Maslach. |
| C4 | Compétence diminuée pour des tâches auparavant maîtrisées. | **Garder**, cohérent avec changement récent. |
| C5 | Rien d'utile accompli : doublon avec C3 et BS8 ; peut résulter de décisions organisationnelles. | **Transformer** en item « utilité/impact » distinct de compétence, sans score mélangé. |
| C6 | « Je ne me reconnais plus » : identité professionnelle, concept large. | **Repositionner** comme signal narratif, pas comme élément quantitatif de performance. |

### D — Exigences professionnelles (6)

| ID | Audit | Décision proposée |
|---|---|---|
| D1 | Charge supérieure à la capacité réelle de réalisation. | **Garder**, ancré sur le travail réel. |
| D2 | Urgences OU interruptions : deux mécanismes regroupés. | **Scinder ou préciser** ; si coût des questions contraignant, garder un seul construit « travail interrompu empêchant de finir ». |
| D3 | Priorités contradictoires/absence d'arbitrage. | **Garder** ; mécanisme actionnable. |
| D4 | Responsabilité sans moyens/autorité. | **Garder** ; clarifier « pouvoir de décision et moyens disponibles ». |
| D5 | Exigences émotionnelles élevées : pas nécessairement pathologiques. | **Reformuler** en effort répété de régulation/masquage des émotions exigé par le poste. |
| D6 | Compensations des dysfonctionnements. | **Garder**, sans confondre avec surengagement volontaire. |

### E — Ressources professionnelles (6)

| ID | Audit | Décision proposée |
|---|---|---|
| E1 | Autonomie. | **Garder**. |
| E2 | Arbitrage par manager. | **Garder** ; peut coexister avec D3 si l'arbitrage reste tardif, pas automatiquement contradiction. |
| E3 | Soutien des collègues. | **Garder**. |
| E4 | Clarté des objectifs. | **Garder** ; distinction possible entre objectifs clairs et priorités contradictoires. |
| E5 | Reconnaissance. | **Garder** ; utilisée dans ERI, mais pas comme preuve indépendante. |
| E6 | Justice/équité. | **Garder** ; distinguer ressources JD-R et facteur social/ERI dans la restitution. |

**Couverture manquante :** insécurité de la situation de travail, qualité empêchée et conflits de valeurs ont une présence secondaire (R3/contexte), insuffisante pour expliquer certains profils. Le problème n'est pas de multiplier les questions D/E ; il est de ne pas perdre les six familles INRS.

### F — Récupération, santé et conséquences (6)

| ID | Audit | Décision proposée |
|---|---|---|
| F1 | Rumination hors travail. | **Garder**, spécifiquement dans récupération ; ne pas considérer automatiquement comme surengagement ERI. |
| F2 | Sommeil perturbé. | **Garder**, mais distinguer « je l'attribue au travail » et simple trouble du sommeil. |
| F3 | Réduction des loisirs et relations : retentissement, pas mécanisme de récupération. | **Déplacer** en conséquences et fonctionnement personnel. |
| F4 | Symptômes physiques non spécifiques. | **Garder comme signal**, sans leur attribuer une cause professionnelle médicale. |
| F5 | Mélange alcool, substances, écran, alimentation, médicaments hors prescription. | **Refondre** en question sur changement de stratégies pour faire face, puis sous-question facultative, privée, non transmise à un manager ; ne pas assimiler toute augmentation d'écran à une consommation problématique. |
| F6 | Erreurs/quasi-accidents/impulsivité : sécurité, pas récupération. | **Déplacer** vers un signal de fonctionnement/sécurité, avec orientation graduée selon les conséquences. |

### R — Récompense et surengagement (6)

| ID | Audit | Décision proposée |
|---|---|---|
| R1 | Salaire en rapport avec le travail. | **Garder** (perception de réciprocité, non indice salarial objectif). |
| R2 | Perspectives d'évolution. | **Garder**. |
| R3 | Sécurité de l'emploi. | **Garder**, mais élargir aux restructurations/changements imposés si l'objectif est de couvrir Gollac. |
| R4 | Difficulté à refuser. | **Reformuler** pour distinguer pression organisationnelle et surengagement personnel. |
| R5 | Besoin de prouver sa valeur en faisant davantage. | **Garder** comme mécanisme de surengagement possible. |
| R6 | Pensées professionnelles dès le réveil : peut être anticipation ordinaire. | **Reformuler** : difficulté à mettre fin à l'investissement au-delà des attentes professionnelles et de son propre choix. |

### G — Ressources et appuis (6)

| ID | Audit | Décision proposée |
|---|---|---|
| G1 | Moments d'utilité et d'efficacité : chevauchement C. | **Conserver comme appui**, pas comme nouveau score confirmatoire. |
| G2 | Décrochage hors travail : proche de l'inverse F1. | **Garder**, mais éviter le double comptage. |
| G3 | Soutien extraprofessionnel. | **Garder** ; respecter la confidentialité. |
| G4 | Activités ressourçantes. | **Garder**. |
| G5 | Demande d'aide au travail. | **Garder** ; capacité et environnement favorable sont à distinguer. |
| G6 | Capacité à dire non : inverse proche R4. | **Fusionner la logique avec R4** ou reformuler pour mesurer les possibilités concrètes d'arbitrage. |

### BS — Huit questions satiriques

| ID | Thème observé | Décision proposée |
|---|---|---|
| BS1 | Livrable quotidien utile vs artefact. | **Conserver en satire optionnelle** ; ne pas assimiler production invisible et inutilité. |
| BS2 | Réunions remplaçables. | **Conserver** ; l'évaluation est sarcastique, non quantitative. |
| BS3 | Outils de pilotage/indicateurs. | **Conserver** ; utile à la critique organisationnelle. |
| BS4 | « Se caler » et indécision. | **Conserver** ; ponctuation satirique. |
| BS5 | Influence sur décisions. | **Conserver**, avec prudence : influence indirecte ne signifie pas absence d'utilité. |
| BS6 | Livrables relus pour le fond. | **Conserver**, possible indicateur de valeur empêchée. |
| BS7 | Transversalité/absence d'arbitrage. | **Conserver**, mais préserver la nuance sur une coordination réellement utile. |
| BS8 | Sentiment d'avancer à la fin de la semaine. | **Garder en satire**, sans le combiner comme mesure de perte de sens. |

**Refonte du bulletin satirique** : aucune notion d'« indice 83 % d'absurdité » comme mesure ; pas de titre dépréciatif si détresse importante ; ne pas conclure « ton humour te protège » sans question sur la fonction vécue de l'humour. Proposer « pause satire » facultative, après la partie santé, et conserver un ton sérieux dans le rapport clinique.

### Contexte — Huit oui/non

| Clé | Audit et amélioration |
|---|---|
| `harassment` | Garder en contexte de protection ; ne pas « scorer » le harcèlement, ne pas conclure juridiquement à son existence. |
| `ethicalConflict` | Garder, mais une sous-question graduée sur la **qualité empêchée** est utile. |
| `personalBurden` | Garder avec liberté de ne pas répondre ; ni minimisation du travail ni causalité personnelle automatique. |
| `previousMedicalAlert` | Garder ; éviter de mélanger consultation passée et épisode grave actuel. |
| `collectiveSignal` | Garder comme indice de problème partagé, **pas** preuve que l'organisation est causalement seule responsable. |
| `safetySensitiveJob` | Garder comme **contexte de conséquences possibles**, ne pas déclencher automatiquement un niveau d'urgence clinique. |
| `fearToSpeak` | Garder ; oriente hors hiérarchie si nécessaire. |
| `wantToLeave` | Garder comme projet/intention, non signe médical ou « symptôme du corps ». |

### Alertes — Trois oui/non

| ID | Limite majeure | Recommandation |
|---|---|---|
| Alerte 1 | « J'ai eu des idées noires ou suicidaires » : formulation et temporalité trop vagues ; une pensée ancienne peut déclencher le même message qu'un danger actuel. | Définir la période ; distinguer pensées de mort, idées suicidaires actuelles et danger immédiat avec orientation adaptée ; ressource 3114 immédiatement accessible. Ne pas inventer un score de risque suicidaire. |
| Alerte 2 | « Incapable de continuer à fonctionner normalement » mélange différents degrés de difficultés. | Demander le degré de retentissement, et orienter vers un avis de santé sans l'assimiler systématiquement à une urgence vitale. |
| Alerte 3 | Douleur thoracique, essoufflement, malaise, perte de contrôle dans une seule question. | Information claire : symptôme aigu inquiétant = appel au 15/112 ; ne pas demander d'attendre la fin du parcours. |

**Contrainte sécurité :** l'encart de sécurité doit rester visible sur toutes les pages, y compris au début du test. Une réponse d'alerte oui déclenche une orientation immédiatement. Cela ne nécessite pas le remplissage des 67 questions ni le calcul d'un score.

## 4. Les nouvelles informations à capter (sans allonger automatiquement le parcours)

### Quatre dimensions aujourd'hui sous-documentées

1. **Chronologie / trajectoire** : depuis quand ? amélioration/stabilité/aggravation ?
2. **Variation selon l'exposition au travail** : dégradation en travail, amélioration en congé, persistance partout ? À interpréter prudemment.
3. **Qualité empêchée / conflit de valeurs** : devoir renoncer à un travail conforme aux critères professionnels à cause de l'organisation.
4. **Retentissement** : effets sur le fonctionnement et conséquences de sécurité, sans fusionner avec le score d'épuisement.

### Propositions de questions conditionnelles

**T1 — Durée** : « Depuis quand les difficultés que tu viens de décrire sont-elles présentes ? » (moins de deux semaines ; deux à quatre semaines ; un à trois mois ; plus de trois mois ; fluctuant ; pas de difficulté notable).

**T2 — Évolution** : « Sur les dernières semaines, leur intensité… » (diminue ; reste stable ; augmente ; varie fortement ; ne sait pas).

**T3 — Variation au travail** : « Lorsque tu n'es pas exposé à ton travail plusieurs jours, ces difficultés… » (diminuent nettement ; diminuent un peu ; ne changent pas ; augmentent ; pas eu de coupure suffisante). Ne pas nommer « test des vacances » diagnostique.

**V1 — Qualité empêchée** : « Je dois renoncer à un travail que je juge correct ou sûr parce que les moyens ou les délais sont insuffisants. » (0–4 sur quatre semaines).

**V2 — Conflit éthique** (si contexte oui) : « Ces demandes me mettent-elles en désaccord avec mes obligations professionnelles ou mes valeurs ? » (rarement à presque toujours / préfère ne pas répondre).

**BS-R — Réaction à l'absurde** (si module satirique activé) : « Quand une partie du travail me paraît absurde, cela provoque surtout… » (de l'amusement sans retentissement ; de la frustration ; de la résignation ; de la souffrance ; autre / ne sait pas). Ce n'est pas une échelle validée de coping par l'humour.

**REQ — Récupération approfondie** (facultatif en cas de difficulté de récupération) : quatre questions fonctionnelles distinctes sur détachement, détente, maîtrise et contrôle du temps hors travail, plutôt que prétendre qu'un seul score en résume les mécanismes.

### Stratégie de longueur

Deux niveaux plutôt que 75 questions obligatoires :

- **Tronc central** court, conservant une couverture des manifestations et expositions, avec accès direct au rapport descriptif.
- **Approfondissements ciblés** lorsqu'une situation le justifie : récupération, sens/qualité empêchée, sécurité, contexte collectif, satire.

Le module satirique doit être **facultatif** : une personne exténuée ne doit pas avoir à choisir huit réponses ironiques pour accéder à un compte rendu utile.

**Arbitrage à ne pas éluder :** s'il faut réduire la longueur, certaines questions actuelles devront être remplacées plutôt que simplement ajoutées. La sélection finale nécessite tests cognitifs auprès des utilisateurs.

## 5. Moteur d'interprétation proposé

### 5.1 Séparer calcul, observation et interprétation

Trois étages explicites :

- **OBSERVATION** : « Vous avez répondu “souvent” à la question sur les priorités contradictoires. »
- **REGROUPEMENT DESCRIPTIF** : « L'absence d'arbitrage fait partie des difficultés professionnelles les plus présentes dans vos réponses. »
- **HYPOTHÈSE DE TRAVAIL** : « Il pourrait être utile de vérifier si les arbitrages manquants contribuent aux difficultés que vous décrivez. »

Ne jamais écrire automatiquement « Les arbitrages insuffisants sont la cause de votre épuisement » sur la base de questions transversales.

### 5.2 Modèle de données

```text
manifestations
  epuisement
  distance_mentale
  emotionnel
  cognitif
  efficacite_percue
  sens_percu  [distinct des symptômes canoniques]

expositions
  intensite_temps
  exigences_emotionnelles
  autonomie
  rapports_sociaux
  conflits_valeurs_qualite_empechee
  insecurite_situation
  reconnaissance_recompense
  surcharge_organisationnelle

ressources
  ressources_professionnelles
  soutiens_personnels
  recuperation_hors_travail
  marges_arbitrage

contexte
  facteurs_personnels
  facteurs_collectifs
  climat_expression
  anciennete_evolution
  enjeux_securite

alertes
  orientation_urgente
  avis_medical_rapide
  points_a_discuter

actions
  exposition
  arbitrage
  ressources
  sante_travail
  soins
  protection
  traces
  suivi
```

Chaque construit doit avoir un identifiant, une définition, des items sources, une règle de gestion de données absentes, une durée de référence, une note sur ses limites et une phrase de restitution. Les modèles théoriques sont des **vues** sur ces données ; ils ne dupliquent pas les réponses.

### 5.3 Pas de « gravité » globale issue d'une somme arbitraire

Conserver des scores descriptifs et leurs libellés (fréquence ou intensité déclarée). Pour déclencher une action, utiliser des règles **traçables** : symptôme de sécurité => action immédiate ; difficultés fréquentes et retentissement => avis de santé ; exigences élevées sans ressources => échange sur organisation ; difficultés de sens sans épuisement => exploration du travail et des valeurs.

Une bande de lecture peut afficher « signal isolé », « difficultés répétées », « retentissement marqué », mais **ne pas présenter ces classes comme des seuils cliniques validés**. Leur éventuelle qualification nécessite justification, tests sur vignettes et évaluation empirique.

### 5.4 Les négations ne sont pas des preuves

- Score peu élevé ≠ absence de problème.
- Peu de demandes professionnelles déclarées ≠ symptômes non liés au travail.
- Ressources présentes ≠ demandes compensées quantitativement.
- Distance mentale élevée ≠ humour protecteur.
- Plusieurs collègues touchés ≠ preuve unique d'une cause organisationnelle.
- Sentiment d'inutilité ≠ emploi objectivement inutile.
- Aucune alerte signalée ≠ absence de danger.

### 5.5 Règles d'urgence et de destinataire

Le chemin de soins doit être séparé de la gravité instrumentale ; ne jamais fusionner « poste à enjeu de sécurité » et « urgence médicale ». Le questionnaire ne fait **aucune évaluation du risque suicidaire**, mais il doit permettre d'accéder aux numéros pertinents et de demander rapidement de l'aide.

Définir trois exports distincts :

1. **Pour soi** : détails complets si souhaités, thèmes sensibles inclus seulement au choix.
2. **Pour un professionnel de santé** : symptômes, chronologie, retentissement, questions personnelles facultatives ; peut rester détaillé.
3. **Pour un manager / représentant** : faits de travail, exemples, demandes, arbitrages, interlocuteurs ; **pas** de symptômes, d'idées suicidaires, de consommations, ni de contexte personnel par défaut.

## 6. Métaphores : critères de décision

### Critères non négociables

1. Lecture en moins de 10 secondes sans légende complète.
2. Distinguer conditions du travail et manifestations chez une personne.
3. Rendre perceptibles les ressources et les marges de manœuvre.
4. Représenter le sens/la qualité empêchée sans transformer tous les phénomènes en énergie.
5. Admettre plusieurs profils incompatibles avec l'idée « plus les charges sont hautes, plus la personne doit être épuisée ».
6. Construction progressive en formation **et** affichage fidèle dans le rapport.
7. Aucune visualisation de risque suicidaire sous forme de jeu, score ou pièce dramatique.
8. Lisibilité à l'impression noir/blanc, sur mobile, sans animation, et accessibilité au clavier/lecteur d'écran.
9. Ne pas suggérer une causalité qui n'a pas été mesurée.

### Matrice qualitative

| Métaphore | Clarté instantanée | Progression | Sens/valeurs | Action organisationnelle | Risque d'erreur scientifique | Verdict de travail |
|---|---|---|---|---|---|---|
| Réservoir | Forte pour la fatigue | Moyenne | Faible | Moyenne | Fort : énergie pseudo-mesurée et compensation automatique | Partie pédagogique, pas nécessairement centre |
| Tableau de bord | Très forte pour état | Faible | Moyenne | Faible | Moyen : impression de mesure certifiée | Synthèse complémentaire |
| Pont sous charge | Forte pour soutenabilité | Forte | Moyenne | Très forte | Moyen : confondre pont et salarié | Contre-candidat sérieux |
| Traversée | Forte si dessin sobre | Très forte | Forte | Forte | Moyen : moraliser la capacité à « marcher » | **Concept narratif favori à prototyper** |
| Arbre | Moyenne | Forte | Moyenne | Moyenne | Moyen : équivalences forcées | Option esthétique secondaire |
| Bateau qui coule | Forte | Forte | Moyenne | Forte | Fort : dramatisation et culpabilisation | À écarter comme image centrale |

### 6.1 La traversée : architecture visuelle précise

**Concevoir deux niveaux distincts :**

**Décor / parcours**, visible à gauche et au fond : responsabilités professionnelles, charge de tâches, urgences, priorités contradictoires, réorganisations, ambiance relationnelle et destination du travail. Ces éléments appartiennent aux conditions de travail.

**Personnage / vécu**, visible au premier plan : signes d'épuisement, retrait mental, difficultés émotionnelles/cognitives. On ne lui attribue pas un nombre de points de vie ou d'énergie ; les observations sont des indications textuelles rattachées à des éléments visuels sobres.

**Appuis / leviers**, à droite ou au bord du chemin : possibilités d'arbitrage, soutien, autonomie, reconnaissance, récupération en dehors du travail, interlocuteurs. Ce ne sont pas des « potions » qui effacent automatiquement le sac à dos.

**Contexte**, hors paysage principal : cartes discrètes « facteurs personnels », « collectif », « sécurité », sans flèches causales ni couleur de danger attribuée automatiquement.

**Sens et utilité**, au niveau de la destination et du rapport au chemin : le parcours peut être éprouvant mais jugé utile ; il peut aussi être relativement peu exigeant mais perçu comme dépourvu de sens. Le dessin doit permettre les deux profils.

**ERI**, en annotation contextuelle : « ce qu'on te demande / ce qui est reconnu en retour » ; on ne doit pas forcer salaire, statut, sécurité et estime à devenir des aliments ou étapes de ravitaillement.

**Satire**, en calque facultatif : portion de parcours qui tourne à vide, réunions qui se renvoient des panneaux, livrables sans utilisateur identifié. Le calque satirique ne modifie pas les manifestations ou le niveau d'urgence.

### 6.2 Grammaire graphique

- Couleur **orange** : sollicitations rapportées ; **sapin** : appuis réels ; **anis** : pistes d'action ; **crème** : fond neutre ; **violet discret** éventuel : rapport au sens. Toujours doubler la couleur par mot, forme ou motif.
- Taille / épaisseur : intensité **relative des réponses dans un thème**, jamais probabilité de maladie ni causalité chiffrée.
- Présence d'une pièce : dimension questionnée ; **absence** : dimension non affichée, pas « absence prouvée ».
- Traits : catégories ou appartenance, **pas** flèches d'une cause vers un symptôme.
- Trois blocs typographiques seulement visibles simultanément : « ce qui est décrit », « ce qui peut contribuer », « où agir ».
- Légende explicite et accessible : « Image de vos réponses, non mesure physique ni diagnostic ».
- Contrôle d'animation : jouer / mettre en pause / rejouer ; option mouvement réduit respectée ; scène imprimable sans JS.

### 6.3 Les étapes de construction de la traversée

**Formation — neuf chapitres :**

| Chapitre existant | Ce qu'on apprend | Pièce visuelle ajoutée |
|---|---|---|
| 1. Fatigue ou usure | Distinguer fatigue, récupération, retentissement | Personnage et état raconté sans pourcentage |
| 2. Trois signes | Épuisement, distance, efficacité | Trois manifestations qualitatives distinctes |
| 3. Balance / JD-R | Exigences et ressources | Charges/obstacles et appuis sur le parcours |
| 4. Retour / ERI | Réciprocité et surengagement | Question « pour quoi et pour quel retour ? » + bagage que l'on accepte de porter |
| 5. Contexte | Travail, personnel, collectif | Étiquettes contextuelles hors du mécanisme principal |
| 6. Mesures | Validité et incertitude | Légende sur les limites ; **aucune nouvelle pièce fictive** |
| 7. Agir | Réduire, reporter, simplifier | Chemins d'action / arbitrages sur les contraintes |
| 8. Traces | Faire remonter des faits | Carnet de bord / faits datés (hors santé) |
| 9. Portes | Choisir le bon interlocuteur | Accès aux ressources pertinentes hors chemin |

**Questionnaire :** ne pas montrer une « progression de diagnostic » en direct : risque de modifier les réponses. Afficher seulement la progression de complétion. **Rapport :** révéler l'image adaptée aux réponses et ses explications en couches, puis proposer une synthèse imprimable.

### 6.4 Le pont sous charge : maquette concurrente

L'image centrale est un **ouvrage / système de travail**, pas la personne. Les charges représentent les tâches, délais, interruptions et exigences. Les appuis représentent autonomie, arbitrages, coopération et moyens. Les déformations de l'ouvrage sont des indices de **fonctionnement du système de travail**, pas des symptômes cliniques. Les signes personnels figurent dans une zone distincte avec une personne hors du pont.

Un pont peut :

- supporter une charge forte mais cohérente avec ses appuis ;
- fonctionner sous contrainte sans présenter encore d'effets individuels ;
- présenter des difficultés malgré une charge apparente faible si son organisation est défaillante ;
- être solide et mener vers une destination jugée inutile.

**Contreparties :** la récupération individuelle, les récompenses et le vécu subjectif s'intègrent moins bien. Ne pas le choisir uniquement parce qu'il plaît à un public d'ingénieurs.

## 7. Quatre profils tests pour invalider une mauvaise métaphore

**Vignettes entièrement fictives ; valeurs illustratives, non profils cliniques.**

**Profil P1 — Le travail devient insoutenable, mais la personne va encore relativement bien.** Exigences fortes, ressources faibles, peu de symptômes. L'image doit montrer les contraintes **sans inventer un épuisement**. Action : prévention organisationnelle.

**Profil P2 — Épuisement important sans expositions professionnelles très élevées déclarées.** Symptômes + récupération dégradée + contexte personnel exigeant. L'image doit préserver l'incertitude causale et proposer une exploration clinique, **sans imputer automatiquement le problème au travail ou à la vie personnelle**.

**Profil P3 — Perte de sens et qualité empêchée sans grand épuisement.** Faible charge, conflits de valeurs, sentiment de travail inutile, cynisme élevé. L'image doit montrer une crise de sens/qualité sans « batterie vide ». Action : clarification du travail, de ses fins, de ses arbitrages.

**Profil P4 — Scores faibles, signal d'alerte positif.** Aucune couleur verte ou « profil protégé » ne doit masquer une alerte. L'orientation clinique est autonome et hors métaphore.

**Profil P5 — Bonne récupération grâce au détachement hors travail, mais forte distance au travail.** L'image doit éviter de confondre deux formes de « détachement » qui ont des significations différentes.

**Profil P6 — Charge forte, autonomie et soutien forts, peu de symptômes.** L'image doit représenter exigences et ressources conjointes, **sans poser qu'elles s'annulent arithmétiquement**.

Tester les conceptions à l'aide des six vignettes sur ordinateur, mobile, lecteur d'écran et PDF noir/blanc. Si des utilisateurs attribuent spontanément le rôle de « cause » à une flèche non justifiée, le design échoue.

## 8. Rapport cible : comprendre avant de détailler

### 8.1 Restitution initiale, visible sans explorer 33 pages

**Bloc 1 — Ce que je décris.** Deux ou trois observations concrètes, pas un verdict. Exemple fictif : « La fatigue revient plusieurs fois par semaine et le sommeil se dégrade. La confiance dans la qualité du travail reste présente. »

**Bloc 2 — Ce qui caractérise mon travail.** Exigences dominantes, ressources, facteurs de valeurs, contexte ; avec libellés « vous déclarez » / « peut contribuer ».

**Bloc 3 — Ce qui tient encore.** Ressources réelles, sans culpabiliser la personne et sans dire qu'elles suffisent.

**Bloc 4 — Les premières démarches.** Deux actions concrètes, un interlocuteur pertinent et la question à lui poser.

**Visuel central** : image globale adaptée, sobre, accessible, légendée.

### 8.2 Trois exports explicitement différents

- **Résumé personnel** : situation, déterminants possibles, appuis, plan, questions.
- **Fiche santé** : symptômes, durée/évolution, retentissement, contexte choisi, questions au soignant ; pas de prétendu diagnostic.
- **Fiche travail** : faits organisationnels et demandes, sans santé ni données sensibles par défaut.

### 8.3 Rapport long = profondeur à la demande

Annexes : items/réponses ; modèles détaillés (origine, mécanisme, limites) ; analyses qualitatives ; hypothèses alternatives ; preuves et sources ; journal d'actions ; indicateurs de suivi. **Ne pas organiser le rapport personnel uniquement comme la répétition des neuf chapitres de cours**.

### 8.4 Règles rédactionnelles

- Pas de « Ça va » / « Ça ne va pas » déterminé automatiquement par un seuil sur 24.
- Pas de pourcentage d'énergie.
- Pas d'affirmation causale individuelle sans preuve.
- Pas de phrase « pas de problème » parce qu'un domaine est faiblement marqué.
- Préférer « Tu décris souvent… », « Cette combinaison invite à examiner… », « Voici ce que tu peux demander… ».
- Les données de santé restent dans le rapport personnel ou de santé ; les exports manager n'en contiennent pas par défaut.
- La longueur se réduit par hiérarchie et affichage progressif, pas en supprimant les explications scientifiques accessibles.

## 9. Architecture produit : même cohérence que Papillon, sans copier le visuel

### 9.1 Trois moments

1. **Comprendre** — formation scénarisée Sam/Léa, métaphore construite progressivement.
2. **Faire le point** — questionnaire en modules, progression de complétion, consentements et questions facultatives claires.
3. **Agir / relire** — synthèse, hypothèses, leviers, interlocuteurs, exports, suivi dans le temps.

Le diplôme pédagogique peut rester comme récompense de formation, mais **ne devrait pas conditionner l'accès à un bilan personnel utile**. Ce point nécessite un audit UX spécifique avant modification.

### 9.2 Animation d'accueil

Conserver les cinq actes existants (lundi, mercredi, vendredi, quatre semaines, problème), **mais transformer le récit** : Sam voit la charge, les priorités, les ressources et le vécu changer. Il n'est jamais « à 80 % d'énergie » comme si un capteur l'avait mesurée. Une bascule finale révèle que « tenir » n'équivaut pas toujours à « pouvoir tenir durablement ».

### 9.3 Confidentialité et sécurité

L'affirmation « rien ne quitte votre navigateur » doit être vérifiée techniquement par audit des scripts, chargements tiers, éventuels logs, erreurs, exports et déploiement. Aucun champ de santé ne doit finir dans une URL, un analytics, des logs ou un PDF manager par défaut. Reprise volontaire par fichier et versionnement local transparent.

Le questionnaire ne doit pas être un outil individuel d'évaluation RH ni de classement des salariés. Exposer ces limites à l'accueil, dans la méthode et dans les exports.

## 10. Architecture technique cible (sans prescrire une réécriture intégrale)

Le code actuel mêle définitions, calculs, interprétations, rendu, contenus pédagogiques et règles. Une meilleure séparation fonctionnelle facilitera la vérification :

```text
Questions avec identifiants immuables, dimension, période, caractère sensible,
source conceptuelle, règle si absence de réponse
              ↓
Normalisation des réponses (aucune interprétation)
              ↓
Observations descriptives et calculs traçables
              ↓
Règles de sécurité indépendantes et priorisées
              ↓
Hypothèses explicatives explicitement non causales
              ↓
Recommandations classées par situation / interlocuteur
              ↓
Trois consommateurs : visuel, rapport, export confidentiel
```

**Ne pas migrer en force** : commencer par tests de caractérisation sur les comportements actuels, comparer les outputs de vignettes, conserver des adaptateurs de données anciennes et déployer sur branche de travail. Le code devra proposer un schéma capable d'inclure / masquer les dimensions nouvelles sans casser les exports existants.

### Tests prioritaires

**Calcul :** mêmes entrées → mêmes dimensions ; calcul descriptif exact ; traitement des données manquantes ; pas de dérive de pondération lorsque l'on ajoute un item ; pas de « 38 % » affiché.

**Interprétation :** observation ≠ cause ; profils contradictoires ; absence de données ≠ score nul ; seuils explicitement non étalonnés ; distinction sens/efficacité, état/cause, humour/épuisement.

**Sécurité :** P4 déclenche un message immédiatement et indépendamment du score ; numéros 3114 et 15/112 accessibles ; pas de score suicidaire ; pas de confusion entre poste sensible et situation d'urgence.

**Confidentialité :** export manager exclut santé, idées suicidaires, substances, contexte personnel et détails privés, sauf inclusion explicite et distincte ; aucun envoi réseau non voulu ; fichier de reprise reste sous contrôle utilisateur.

**Graphique :** tests automatisés des labels et des valeurs de réponse ; accessibilité clavier, contraste, `prefers-reduced-motion` ; capture SVG/PDF non tronquée en mobile ; noir et blanc ; chargement hors ligne si annoncé.

**Compatibilité :** les rapports antérieurs portent leur version de questionnaire ; nouvelles dimensions/algorithmes non comparés comme si les scores étaient identiques.

## 11. Backlog ordonné par risque d'erreur

| Priorité | Chantier | Pourquoi d'abord | Critère de réussite |
|---|---|---|---|
| P0 | Temporalité et traitement des alertes | Erreur de gravité et orientation possible | Aucun signal majeur banalisé ; pas d'urgence artificielle produite par un simple poste à enjeu |
| P0 | Supprimer les pourcentages d'énergie et les seuils présentés comme cliniques | Fausse mesure et faux sentiment de validation | Aucune grandeur présentée comme mesurée sans base |
| P0 | Revoir la fusion A–F/144 et les formulations causales | Confusion causes/conséquences | Chaque restitution pointe ses données et ses limites |
| P0 | Sécuriser exports et distinction santé/travail | Confidentialité / usage abusif | Export travail sans santé par défaut |
| P1 | Revoir B, C, F, R, G et supprimer les ambiguïtés/doublons | Qualité de l'information | Une question cible une dimension principale ; changements explicites |
| P1 | Introduire temporalité, retentissement, qualité empêchée | Discrimination entre situations | P1 à P6 deviennent lisibles, sans attribution excessive |
| P1 | Rendre BS facultatif et cliniquement neutre | Cohérence du parcours | Aucun message de santé tiré du satirique seul |
| P1 | Refondre synthèse et rapport court | Actionnabilité | Compréhensible en 60 secondes ; 2 actions utilisables |
| P1 | Prototyper traversée vs pont | Coeur pédagogique | Tests sur 6 profils, mobile, N&B, accessibilité |
| P2 | Animation scrollytelling et construction progressive | Effet Papillon | Même langage visuel sur accueil, formation, rapport |
| P2 | Carnet de suivi à 2/4 semaines | Comprendre une trajectoire | Comparaison sur mêmes items/version + changement contextuel |
| P2 | Étudier noyau BAT-12/CBI | Validité scientifique potentielle | Droits, langue, normes, usage et limites documentés |

## 12. Critères d'acceptation du projet

1. En première lecture, l'utilisateur distingue **son vécu**, **les conditions de travail** et **les actions possibles**.
2. Deux personnes avec symptômes identiques mais contextes différents n'obtiennent pas le même discours causal automatique.
3. Une personne avec peu de symptômes mais des expositions professionnelles fortes ne reçoit pas « tout va bien ».
4. Une personne avec forte souffrance mais faibles expositions déclarées reçoit une orientation pertinente, sans accusation ni diagnostic hors champ.
5. La qualité empêchée et le conflit éthique sont visibles même sans charge excessive.
6. Le sens, l'efficacité et la distance mentale sont distingués.
7. Les modèles JD-R, ERI et Maslach sont décrits dans leur origine, principes, apports et limites, sans prétendre qu'ils constituent trois validations indépendantes.
8. Aucun score arbitraire ne devient risque clinique, niveau d'énergie ou verdict définitif.
9. La satire peut être désactivée sans perdre les résultats sérieux.
10. La scène centrale se lit à toutes les tailles, sans animation et en noir et blanc ; elle ne lie pas visuellement causes et symptômes sans justification.
11. La fiche pour un manager ne divulgue aucun élément de santé par défaut.
12. Les tests logiciels et vignettes restent reproductibles et versionnés.

## 13. Références principales à conserver dans la méthode

- OMS — *Burn-out an occupational phenomenon* (CIM-11) : https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon
- HAS — *Repérage et prise en charge cliniques du syndrome d'épuisement professionnel* (2017) : https://www.has-sante.fr/jcms/c_2769318/fr
- INRS — *Facteurs de risques psychosociaux* : https://www.inrs.fr/risques/psychosociaux/facteurs-risques
- INRS — *Exemples d'exposition et facteurs de stress* : https://www.inrs.fr/risques/stress/exposition-risques-facteurs-stress
- Schaufeli et al. (2020) — *Burnout Assessment Tool: development, validity and reliability* : https://pmc.ncbi.nlm.nih.gov/articles/PMC7766078/
- BAT-12 (2022), réduction et validation psychométrique : https://pmc.ncbi.nlm.nih.gov/articles/PMC8939057/
- Bakker et al. (2023) — *Job Demands–Resources Theory: Ten Years Later* : https://doi.org/10.1146/annurev-orgpsych-120920-053933
- Sonnentag & Fritz (2007) — *Recovery Experience Questionnaire* : https://pubmed.ncbi.nlm.nih.gov/17638488/
- Validation française du REQ (2024) : https://pmc.ncbi.nlm.nih.gov/articles/PMC11480058/
- Soffia, Wood & Burchell (2022) — *Alienation Is Not 'Bullshit'*, critique empirique de Graeber : https://doi.org/10.1177/09500170211015067
- NFA — *Copenhagen Burnout Inventory*, conditions d'usage : https://nfa.dk/vaerktoejer/spoergeskemaer/spoergeskema-til-maaling-af-udbraendthed-cbi/copenhagen-burnout-inventory-cbi

---

**Décision à prendre avant tout code :** le cœur de Bull-Out sera-t-il un instrument **descriptif original** (recommandation immédiate) ou une **échelle standardisée + modules originaux** (projet distinct) ? Cette décision détermine les règles de score, les seuils éventuels et l'éthique du rapport. La métaphore vient ensuite, pas à la place de cette clarification.