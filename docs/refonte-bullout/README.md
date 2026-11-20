# Bull-Out : notes de refonte

**Mise à jour : 20 novembre 2026, nuit (V3).**

Ce dossier garde le raisonnement derrière les choix de Bull-Out, pour qu'une prochaine séance (humaine ou avec une IA) reparte de là où on s'est arrêté.

## Par où commencer

1. **[Le journal des décisions](00-journal-et-decisions.md)** : qui a proposé quoi, ce que David a décidé, ce qui reste ouvert. C'est le document le plus à jour.
2. **[L'inventaire des questions et des calculs](inventaire-questions-mesures-calculs.md)** : état de départ (67 questions), annoté. Pour la version actuelle à 79 questions, la référence est le code (`script.js`) et la page [Méthode et limites](../../methode.html#mesure).
3. **[Historique](historique/)** : les notes de travail du 20 novembre, dans l'ordre (corrections, audit question par question, moteur V2, bullshitomètre à 12 questions, réaction à l'humour, modèles et PDF fictifs, audit du soir) et les archives (propositions non retenues). Elles décrivent des états passés : en cas de doute, le journal et le code font foi.

## Ce qui doit rester vrai

- **Le slogan** « prévention burn-out sans bullshit » apparaît partout, et en grand sur l'accueil. On tutoie.
- **Trois modèles, trois questions** : Maslach (ce qui se voit chez toi), exigences-ressources (ce que le travail demande et ce qui aide), effort-récompense (ce que tu donnes et ce qui revient). Ils partagent des questions : **trois angles, pas trois preuves**.
- **Un seul schéma**, celui du rapport : le travail à gauche, toi au centre (A et F), ce qui se voit à droite. La formation le construit pièce par pièce, un chapitre après l'autre, comme le papillon de Papillon.
- **Séparer quatre choses** : ce que la personne répond, ce que Bull-Out calcule, ce que le dessin montre, ce que le rapport en déduit.
- **Pas de fausse précision** : pas de pourcentage d'énergie ; les indicateurs faits de peu de questions sont donnés en mots.
- **Le questionnaire n'est pas validé.** Il s'inspire d'outils reconnus ; fidélité, structure et seuils restent à tester avec les deux psys.
- **La pause humour fait partie du parcours** (12 questions du bullshitomètre, puis 4 sur la façon dont on l'a vécue, avec « je préfère ne pas répondre »).
- **Le dépôt est public** : aucune conversation privée ni réponse individuelle dans ces documents.

## Où regarder dans le code

| Besoin | Fichier |
|---|---|
| Questions, scores A à F, profils, alertes, sauvegardes | [script.js](../../script.js) |
| Questions et poids du bullshitomètre | [bullshitometre-data.js](../../bullshitometre-data.js) |
| Rapport : synthèse, cadrans, schéma, pièces, annexes, PDF | [rapport.js](../../rapport.js), [rapport.css](../../rapport.css) |
| Formation : chapitres, cas, quiz, diplôme | [formation-contenu.js](../../formation-contenu.js), [parcours.js](../../parcours.js) |
| Illustrations et schéma du rapport construit par chapitre | [formation-illustrations.js](../../formation-illustrations.js) (`schemaRapport`) |
| Ce qu'on mesure et nos limites, pour le public | [methode.html](../../methode.html) |
| Tests | `node --test tests/mesures-rapport.test.cjs` ; PDF fictifs : `tests/generer-pdf-exemple.mjs` |
| Mise en ligne (bullout.ddlab.fr) | [worker.js](../../worker.js) : sert la branche `main` (cache 5 min) |
