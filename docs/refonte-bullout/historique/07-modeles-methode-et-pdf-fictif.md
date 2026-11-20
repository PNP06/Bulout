# Formation, modèles et méthode — bilan de la PR #10

**Date : 20 novembre 2026. Statut : PR de revue, non fusionnée sur `main`.**

## Pourquoi cette passe ?

La formation de Bull-Out comportait déjà neuf chapitres, des illustrations et une synthèse des trois modèles. L'observation est donc plus précise que « il n'y a pas de synthèse » : **la synthèse existait, mais les trois modèles n'étaient pas comparés sur les mêmes faits, et leurs origines/limites n'étaient pas suffisamment explicitées dans le parcours de lecture.**

La page `methode.html` existait également et détaillait les 79 questions, les scores et plusieurs limites. La page de référence de **la Méthode Papillon** (`PNP06/psytest/docs/v2/spec/methode-et-limites.md`) ajoute une démarche plus reproductible : contexte, hypothèses, construction, vérification réalisée, propriétés non évaluées, éthique, décision. **Nous avons enrichi la page existante**, sans effacer son contenu.

## Trois cadres principaux et leurs champs d'application

| Cadre | Origine documentée | Questions | Usage Bull-Out | Limite |
|---|---|---|---|---|
| Maslach | Maslach & Jackson, MBI 1981 ; synthèses ultérieures Maslach et coll. | Que ressent la personne au travail ? | A, B et C décrivent des dimensions différentes | Ni instrument MBI, ni diagnostic, ni séquence causale |
| JD-R | Demerouti et coll., 2001 | Qu'exige le travail, et avec quelles ressources ? | Deux familles d'items D/E, métaphore de balance | Une demande n'est pas annulée arithmétiquement par un « point » de ressource |
| Effort–récompense (Siegrist) | Siegrist, 1996 | L'échange efforts–retours est-il perçu comme équitable ? | Relecture de D, E, R, F | Plusieurs items communs à JD-R ; pas de double preuve |

**Cas transversal à la synthèse :** Sam porte un dossier supplémentaire, perd du temps de récupération, devient distant et n'obtient pas de reconnaissance. Le tableau de la formation sépare, pour les trois modèles, ce qui est **observé**, ce qui **n'est pas démontré**, et les **décisions utiles**.

## Trois éclairages supplémentaires, zéro nouvelle note clinique

- **Hobfoll, COR (1989)** : la perte d'une ressource peut amorcer d'autres pertes ; la spirale reste une hypothèse dans un cas individuel. https://pubmed.ncbi.nlm.nih.gov/2648906/
- **Collège Gollac / INRS** : six familles de RPS (intensité/temps, émotions, autonomie, relations, conflits de valeurs, insécurité) ; grille pour analyser les expositions, pas un score de santé. https://www.inrs.fr/risques/psychosociaux/facteurs-risques
- **Sonnentag et Fritz (2007)** : détachement, relaxation, maîtrise d'activités hors travail et contrôle ; Bull-Out ne reproduit pas le questionnaire REQ. https://pubmed.ncbi.nlm.nih.gov/17638488/

Ces explications se trouvent dans le chapitre JD-R et dans la synthèse. Elles **ne modifient aucun score A–F, R, G, BS ou HR**, ni le moteur du rapport.

## Page Méthode enrichie

Ajouts dans `methode.html` :

1. Tableau comparatif des six cadres et des inférences interdites.
2. Construction des 79 questions et leur base temporelle.
3. Six hypothèses de conception H1–H6, avec limites et études nécessaires.
4. Tableau « vérifié automatiquement / non évalué scientifiquement ».
5. Confidentialité, fichiers et PDF, traduction tierce, politique de partage.
6. Sources originales supplémentaires et glossaire méthodologique.

**Attention :** il n'y a pas eu de validation psychométrique avec des personnes. Les mots « fidélité », « sensibilité », « spécificité », « seuil » et « efficacité préventive » restent des **propriétés à étudier**, pas des succès revendiqués.

## Essai technique et confidentialité

Le script `tests/generer-pdf-exemple.mjs` lance un navigateur Chromium local, pose **79 réponses fictives** via les vrais boutons HTML de Bull-Out, exécute **le moteur et le rendu de rapport d'origine**, puis imprime :

- `rapport-essentiel-fictif.pdf` ;
- `rapport-complet-fictif.pdf` ;
- `fiche-travail-fictive.pdf`.

Il écrit aussi `resultat-moteur.json` et des captures d'écran. Il vérifie les trois PDF et l'absence d'erreur JavaScript. Le script passe les étapes de diplôme **seulement dans le banc d'essai**, pour ne pas transformer une démonstration de code en parcours utilisateur long.

Le profil est clairement fictif ; aucun questionnaire réel n'est importé, transmis, stocké ni utilisé. **Le rapport original reste sur le site ; le PDF de synthèse séparé a été déposé dans la bibliothèque ChatGPT, dossier `Site bulout`.**

L'artefact GitHub Actions a été produit avec succès : https://github.com/PNP06/Bulout/actions/runs/44819080817 (trois PDF du site, données JSON et capture). Les exécutions suivantes exercent aussi l'affichage de la synthèse comparative et de la méthode sur desktop/mobile.

## Conditions avant publication

- Relecture scientifique du texte enrichi et des affirmations de causalité.
- Contrôle des captures de synthèse et de la méthode à 390 px et 1280 px (les seules assertions automatisées sur les largeurs ne remplacent pas une lecture humaine).
- Vérifier le niveau d'exigence adapté au parcours : chapitres 2–4 plus longs (8, 9 et 8 minutes), neuf chapitres totalisant environ 62 minutes.
- Les 79 questions et leur moteur, la navigation de formation et l'ancienne PR #9 **doivent rester inchangés**.
- La PR #10 reste en **brouillon** tant que ces vérifications éditoriales/visuelles ne sont pas réalisées.
