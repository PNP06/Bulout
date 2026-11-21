# Bull-Out : journal des décisions

Ce journal sépare ce qui a été **proposé**, ce qui a été **décidé** et ce qui reste **ouvert**. Une idée notée ici n'est pas une décision tant qu'elle n'est pas dans la colonne « décidé ».

## L'intention

David veut amener Bull-Out au niveau de rigueur et de pédagogie de Papillon (psytest), sans copier son graphisme :

- des questions pertinentes, des calculs honnêtes, un rapport qui aide vraiment un salarié ou un cadre à décider quoi faire ;
- une image d'ensemble qui rend le tout lisible, si elle aide (pas une métaphore pour le plaisir) ;
- un ton franc, pédagogique, sans diagnostic automatique ni prétention scientifique abusive.

## 20 novembre, matin : la critique du rapport (avec Claude Sonnet)

Document : « Bull-out : débat critique » (doc Claude privé de David).

Cinq critiques, vérifiées ensuite dans le code :

1. **Seuils trop sensibles.** Les niveaux sont des quarts de l'échelle, sans étalonnage, et un seul signe élevé suffisait pour afficher « Ça ne va pas bien : agis cette semaine ».
2. **Fausse précision.** Le « 38 % » de batterie sortait d'une formule sans fondement ; la « perte de sens 15/24 » reposait sur deux questions.
3. **Modèles non indépendants.** Siegrist réutilise D1, D4, D6, E5, E6, déjà comptées dans la balance JD-R. Et les ressources apparaissaient sous deux chiffres (« manque 14 », « présentes 10 »).
4. **Bullshitomètre contradictoire.** Il conseillait « détachement méthodique » à des personnes dont la distance est déjà un signe d'usure, et affichait un titre moqueur à quelqu'un d'épuisé.
5. **Rapport trop long.** 33 pages en PDF par défaut.

Correction apportée l'après-midi : « parfois partout » donne 12/24, pas 13/24. Le fond de la critique tient.

Quatre images d'ensemble ont été comparées (réservoir, tableau de bord, arbre, bateau). Sonnet recommandait le réservoir, avec un tableau de bord en bandeau d'ouverture.

## 20 novembre, après-midi : inventaire (avec ChatGPT)

- Inventaire complet des 67 questions, des calculs et des 15 éléments du dessin : [inventaire](inventaire-questions-mesures-calculs.md).
- Deux autres images proposées (pont sous charge, traversée), archivées.
- **Recadrage de David** : le schéma actuel du rapport est peut-être le meilleur ; avant de changer le dessin, il faut savoir ce qu'on mesure vraiment.

## 20 novembre, soir : audit et corrections (avec Claude Opus)

David demande un audit complet et une version valable. Détail dans [l'audit](historique/audit-2026-11-20.md).

| Sujet | Décidé et fait |
|---|---|
| Batterie | Plus de pourcentage : quatre crans et un mot (préservée, entamée, basse, très basse), d'après le niveau moyen de A et F. |
| Indicateurs reconstruits | Effort, récompense, surengagement, efficacité, sens : niveau en mots seulement. |
| Verdict de la synthèse | Orange seulement si deux signes d'usure sont élevés ensemble, ou un très élevé ; un seul signe élevé donne « Ça tient, mais ça s'use : agis maintenant ». |
| Alerte | Une charge très haute (D ou E à 22 ou plus) ne déclenche plus le message « demande de l'aide maintenant » : seuls les signes d'usure, le total et les questions de sécurité le font. |
| Siegrist et JD-R | Le rapport, la légende du dessin et la page Méthode disent que les deux lectures partagent cinq questions : deux angles, pas deux preuves. |
| Ressources | Un seul vocabulaire : « ressources présentes » (en mots), et le score « manque de ressources » expliqué comme le même résultat vu de l'autre côté. |
| Bullshitomètre | Profil satirique replié quand l'usure est élevée ou que l'absurde use ; pas de « mode de survie » par le détachement quand la distance est déjà haute. |
| Ouverture du rapport | Encadré « Comment lire ce rapport » ; bandeau tableau de bord à trois cadrans (ce qui tire, ce qui reste, ce qui lâche) au-dessus du dessin. |
| PDF | Court par défaut (9 pages au lieu de 33). |
| Méthode | Nouvelle section « Ce que Bull-Out mesure, calcule et déduit », avec toutes les règles de calcul et nos limites. |

**Ouvert** : garder le schéma actuel corrigé ou passer au réservoir (question posée à David).

## 20 novembre, fin de soirée : une seule version sur main

Deux chantiers avaient avancé en parallèle depuis le même point de départ : la version 2 de ChatGPT (PR #7, 79 questions, tests automatiques) et l'audit de Claude (PR #8, déjà en ligne). Ils ont été réunis :

| Sujet | Retenu |
|---|---|
| Questionnaire, moteur, sauvegardes, fiche travail, carnet, tests | Version 2 (ChatGPT). |
| Bullshitomètre | 12 questions et matrice de la V2, avec les 4 questions de réaction à l'humour. Choix de David : la pause humour fait partie du parcours, on ne peut plus la sauter en bloc. Chaque question de réaction garde « je préfère ne pas répondre ». Les anciennes sauvegardes où elle était passée restent lisibles. Les notes 04 à 06 décrivent l'état antérieur (facultatif). |
| Feu de la synthèse | Règle de l'audit : orange seulement si deux signes d'usure sont élevés ensemble (ou un très élevé) ; rouge seulement pour une réponse de sécurité (V2). |
| Image d'ensemble | Schéma de la V2 (A et F séparés, construction en quatre étapes), avec le bandeau tableau de bord de l'audit au-dessus. |
| Effort, récompense, surengagement, ressources | En mots (audit). Efficacité et sens à leur vraie échelle, /16 et /8 (V2). |
| Couverture du rapport et page Méthode | Encadré « Comment lire » et section « Ce qu'on mesure », mis à jour pour 79 questions. |
| Textes | Tutoiement de l'audit ; textes de la V2 ailleurs. |

## 20 novembre, nuit : la V3

David : « je veux que les gens comprennent les différentes façons d'aborder le burn-out » et « qu'à chaque fin de chapitre on voie une partie du schéma final du rapport, comme pour Papillon ». La PR #10 de ChatGPT (modèles approfondis, synthèse après le chapitre 4, page Méthode, PDF fictifs) est reprise telle quelle, puis :

| Sujet | Décidé et fait |
|---|---|
| Schéma construit par chapitre | Fin de chaque chapitre : le schéma du rapport avec l'exemple de Sam, la pièce du chapitre en anis, les suivantes en pointillés. 1 : A et F, le corps. 2 : les trois signes. 3 : la balance et les appuis. 4 : le retour. 5 : le contexte. 6 : les fils (« des liens à vérifier, pas des causes »). 7 : les trois cadrans. 8 : pas de pièce. 9 : la sécurité. Schéma vide dans l'introduction. |
| Les modèles sur l'accueil | Section « Trois façons de regarder le burn-out » (Maslach, balance, retour, avec leurs chapitres), les trois éclairages complémentaires, et le schéma complet. |
| Synthèse du rapport | Ordre : feu et trois cadrans, par quoi commencer, schéma, puis « Trois modèles, trois questions sur tes réponses » (en mots), puis les trois lectures, la durée et la qualité des réponses. |
| PDF essentiel | Synthèse, plan, interlocuteurs : 9 pages au lieu de 13, sans pages presque vides. |
| Dépôt | Notes du 20 novembre rangées dans `historique/` ; vieux dossiers de sauvegarde supprimés (l'historique Git les garde) ; README à la racine. |

## 21 novembre 2026 · Audit du schéma (remplace la PR 12)

Audit présenté à David dans un artifact (« Audit du schéma Bull-Out »), avec six décisions. Problèmes trouvés : l'épuisement (A) dessiné deux fois, le sommeil (F2) aussi, l'effort compté deux fois à gauche, le temps jamais dessiné, un chapitre 8 sans pièce, le perso rangé dans « ton travail ».

| Sujet | Décidé et fait |
|---|---|
| Un seul dessin | `schema.js` sert l'accueil, la formation et le rapport (deux mises en page : ordinateur et téléphone). Le cadre ne bouge pas d'un chapitre à l'autre. |
| Une réponse, un endroit | Centre : ta récupération (F1 à F3). Droite : les trois signes (A, B, C) et le corps (F4 à F6). Gauche : la balance, le retour (reconnaissance, salaire), l'absurde (bullshitomètre, qualité empêchée T4). |
| Quatre modèles | Effort-récupération (chapitre 1, centre), Maslach (2, droite), exigences-ressources (3, gauche), effort-récompense (4 : le retour à gauche, le surengagement au centre). Clot remplace Sonnentag dans les éclairages. |
| Une pièce, une règle | 1 récupération et corps · 2 trois signes · 3 balance · 4 retour, engagement, absurde · 5 autour de toi · 6 fils · 7 où agir · 8 depuis quand · 9 portes et sécurité. |
| Synthèse du rapport | Feu et cadrans (le cadran du centre devient « Toi · ta récupération »), schéma, par quoi commencer ; le reste replié sous « Lire en détail ». |
| Inchangé | Questions, seuils, alertes, verdict, scores A à F. |

## 21 novembre, matin : le schéma repris à partir de ce qu'on mesure

Analyse : https://claude.ai/artifact/CjsygfBStQtGaygTQ4mUXq (les 79 questions, leur modèle, leur place ; trois maquettes). David choisit la maquette A.

| Sujet | Décidé et fait |
|---|---|
| Vue d'ensemble | Trois jauges en haut, dans le schéma et en tête du rapport : **ton travail**, **ta fatigue**, **les impacts**. Le travail prend la famille la plus lourde (charge, manque d'aide, effort sans retour, absurde) ; la fatigue, l'épuisement et ce que le repos répare (A, F1, F2) ; les impacts, le signe le plus net (distance, efficacité, sens, corps, loisirs). |
| Trois colonnes | LE TRAVAIL / TOI / L'IMPACT DANS TA VIE. Chaque case pose une question simple. |
| Les modèles en images | Deux pesées (« Ton travail t'aide-t-il assez ? », JD-R ; « Ce que tu donnes est-il payé ? », Siegrist) avec une étiquette par plateau et une phrase qui dit de quel côté ça penche ; la boucle du repos (effort-récupération) ; les pastilles M (Maslach : l'épuisement dans ta fatigue, la distance et l'efficacité dans l'impact). |
| Une question, une place | D1, D4, D6 dans la première pesée (la seconde y renvoie) ; E5, E6 dans « tu reçois » ; F1 dans ta fatigue (« trop investi·e ? » = R4 à R6) ; F3 dans ta vie hors travail. Les scores et seuils ne changent pas. |
| Mots | « Le retour » devient « tu donnes / tu reçois » ; « ce qui se voit », « l'impact dans ta vie » ; « ton engagement », « trop investi·e ? » ; « autour de toi », « tes appuis » + « ta vie hors travail ». |
| Fils | Retirés : ils faisaient croire à des causes. |
| L'absurde | Dans le périmètre (demande de David) : une case du travail, famille de la jauge ; ton recul face à l'absurde chez toi, sans points. Questions et chapitre : fil dédié (`absurde.js`). |
| RPS | La pièce `familles` (pastilles 1 à 6 de Gollac sur les cases du travail) est prête dans `schema.js`, à insérer au chapitre RPS. |

## Questions encore ouvertes

1. **Validation** : avec les deux psys, tester la fidélité des parties A à F et la pertinence des seuils sur de vraies réponses (anonymes, avec accord).
2. **Sens et absurde** : le sens repose sur deux questions. Faut-il une ou deux questions de plus (qualité empêchée, conflit de valeurs) ?
3. **Facteurs de risques (INRS, Gollac)** : exigences émotionnelles (une question) et insécurité (une question) sont peu couvertes.
4. **Mise en ligne** : chaque fusion dans `main` part en ligne en 5 minutes. Une branche « production » relue avant mise en ligne serait plus sûre.
