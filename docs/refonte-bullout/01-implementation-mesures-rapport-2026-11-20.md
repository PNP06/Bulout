# Bull-Out — première implémentation de la refonte des mesures et du rapport

**20 novembre 2026 · branche `refonte-mesures-rapport-2026-11-20` · état : proposition codée, sans fusion dans `main`.**

## Intention et périmètre

La décision la plus récente du projet consiste à **conserver l'architecture visuelle du rapport actuel** (conditions de travail à gauche, état / manifestations au centre et à droite), sans choisir une nouvelle métaphore avant de clarifier ce que le questionnaire évalue.

Cette version applique des corrections à faible risque sur l'interprétation, le vocabulaire et la représentation. Elle **ne change aucune formulation des 67 questions, aucun identifiant d'item, ni le format de progression**. Le score A–F continue d'être calculé pour compatibilité interne et historique, mais n'est plus présenté comme une mesure de risque clinique.

## Modifications effectives

| Partie | Code modifié | Comportement |
|---|---|---|
| Alertes | `script.js` | Une somme A–F élevée ou une dimension à 22 ne produisent plus à elles seules un « profil d'alerte ». Celui-ci ne résulte que des questions de sécurité. |
| Orientations | `script.js`, `rapport.js` | Idées suicidaires, fonctionnement très altéré et symptômes physiques inquiétants reçoivent des messages différents. L'urgence est conditionnée à la situation actuelle, pas au score. |
| Profils et commentaires | `script.js` | Libellés descriptifs et formulations moins causales ou prédictives ; maintien de règles heuristiques pour organiser la lecture. |
| Diagramme | `rapport.js` | Les trois zones et les liens sont conservés, mais la « batterie » ne présente plus une réserve d'énergie fictive. Deux barres distinctes affichent A et F, avec leurs scores sur 24. |
| Légende du dessin | `rapport.js` | Les liens sont des regroupements pour la lecture et non des preuves causales. Les couleurs et épaisseurs sont des conventions internes. |
| Absurdité et humour | `rapport.js` | Le tableau satirique reste accessible, mais ne conclut plus que l'humour protège. Les indices sont présentés comme des scores humoristiques internes. |
| Total et trajectoire | `script.js`, `rapport.js` | Total A–F retiré des interprétations visibles ; suivi recommandé par dimension, avec faits de travail et manifestations séparés. Pas de preuve causale tirée d'une baisse après intervention. |
| Schéma explicatif | `rapport.js` | Un volet déployable distingue déclarations, transformations numériques et propriétés **non mesurées**. |
| Exemple de Sam | `script.js`, `index.html`, `charte.css` | Les pourcentages narratifs fictifs ont été remplacés par des états qualitatifs ; la silhouette d'origine et ses cinq actes sont maintenus. |
| Documentation publique | `methode.html`, `test.html`, `agir.html` | Périmètre, limites, seuils non étalonnés, orientation et nombre de réponses harmonisés avec le calcul. |
| Représentation de l'intensité | `rapport.css`, `rapport.js` | Orange pour le niveau déclaratif élevé ; rouge réservé aux signaux explicites de sécurité. |

## Ce qui n'est **pas** corrigé et ne doit pas être dissimulé

1. **Le questionnaire reste non validé psychométriquement.** Les seuils 6/12/18 et le classement des profils sont des conventions de lecture. Un score de 13/24 reste un déclencheur heuristique de commentaires et d'actions, pas un seuil diagnostique.
2. **La partie C mélange encore efficacité et sens** ; des sous-indices sont reconstruits (quatre items / deux items). L'architecture des construits doit être décidée avant de les redéfinir.
3. **La partie F regroupe des objets hétérogènes** : rumination, sommeil, loisirs, symptômes physiques, stratégies de compensation, erreurs.
4. **Les modèles JD-R et Siegrist réutilisent les mêmes questions.** Une lecture croisée n'est pas une validation indépendante.
5. **Le bullshitomètre conserve ses huit questions satiriques pondérées.** Ni son pourcentage, ni ses profils n'ont une valeur clinique.
6. **La durée, l'évolution, la qualité empêchée et la fonction réelle de l'humour ne sont pas encore interrogées** ; aucune nouvelle question n'a été ajoutée arbitrairement.
7. **Les liens graphiques restent des rapprochements conceptuels**. Même avec une légende prudente, des lecteurs peuvent leur attribuer une causalité. À tester en conditions réelles.
8. **Les anciennes réponses de progression continuent à fonctionner en théorie** car les IDs, le nombre et le format du questionnaire ne changent pas. Une vérification de restauration manuelle reste nécessaire.

## Vérifications effectuées

- Syntaxe JavaScript analysée pour le moteur et le rapport après modifications.
- Plusieurs profils synthétiques ont permis de composer intégralement un rapport sans erreur (réponses 0, 1, 2, 3 et 4, ainsi que chacune des trois alertes).
- Suite `tests/mesures-rapport.test.cjs` : `node --test tests/mesures-rapport.test.cjs`, sans dépendances.
- Workflow GitHub Actions `.github/workflows/verification.yml` : syntaxe du moteur + exécution des tests Node 22.
- Contrôles de non-régression : absence de faux pourcentage d'énergie, absence d'urgence basée sur la somme, messages de sécurité distincts, confidentialité de sauvegarde, présence des annexes.

## Vérifications manuelles avant fusion en production

- **Desktop / mobile** : vérifier les textes SVG dans la zone centrale du schéma, la taille des deux barres A/F et la lisibilité à 375 px.
- **Rapport PDF court / complet** : imprimer les deux options, contrôler sauts de page, graphes et lecture des alertes.
- **Parcours complet** : formation → diplôme → questionnaire → rapport, retour sur les questions, clavier, sauvegarde/reprise JSON et réinitialisation.
- **Contraste / accessibilité** : zoom 200 %, navigation clavier, lecteurs d'écran, préférence reduced-motion, contraste des légendes.
- **Cas fictifs contradictoires** : forte charge sans symptômes, manifestations sans forte charge, peu de difficultés avec signal de sécurité, absurdité forte sans retrait, scores élevés avec ressources fortes.
- **Retour utilisateur** : confirmer que la vue d'ensemble ne fait pas croire que toutes les relations gauche → droite sont causales.

## Décisions encore ouvertes

- Garder définitivement le visuel actuel ou le remanier une fois la taxonomie stabilisée.
- Réviser les dimensions A–F et les questions après une grille item → construit → utilité → risque de mauvaise inférence.
- Introduire une véritable temporalité (durée / évolution / réponse au retrait du travail).
- Examiner une architecture à deux niveaux : instrument de mesure existant validé si réutilisable + questionnaire explicatif Bull-Out.
- Choisir le niveau de précision du rapport court et les modalités de partage avec médecin, manager ou représentant du personnel.

**Aucune décision de publication ni de changement des questions n'est implicite dans cette branche.** La suite doit privilégier les tests de compréhension et la validation du modèle de mesure avant d'ajouter de nouvelles animations.
