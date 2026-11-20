# Bull-Out : notes de refonte

**Mise à jour : 20 novembre 2026, au soir.**

Ce dossier garde le raisonnement derrière les choix de Bull-Out, pour qu'une prochaine séance (humaine ou avec une IA) reparte de là où on s'est arrêté, sans tout redécouvrir.

## Par où commencer

1. **[L'audit du 20 novembre](audit-2026-11-20.md)** : ce qui n'allait pas, ce qui a été corrigé, ce qui reste à faire. C'est le document le plus à jour.
2. **[Le journal des décisions](00-journal-et-decisions.md)** : qui a proposé quoi, ce qui a été décidé, ce qui reste ouvert.
3. **[L'inventaire des 67 questions et des calculs](inventaire-questions-mesures-calculs.md)** : pour chaque question, ce qu'elle mesure, comment elle est comptée et où elle apparaît dans le rapport.
4. Les **[archives](archives/)** gardent des propositions de l'après-midi (cadrage, comparateur de métaphores). Ce ne sont pas des décisions.

## Ce qui doit rester vrai

- **Séparer quatre choses** : ce que la personne répond, ce que Bull-Out calcule, ce que le dessin montre, ce que le rapport en déduit. Le rapport et la page [Méthode et limites](../../methode.html#mesure) le disent en clair.
- **Pas de fausse précision** : pas de pourcentage d'énergie, pas de chiffre « sur 24 » pour un indicateur fait de deux à six questions. On donne un niveau, en mots.
- **Deux modèles qui partagent des questions ne sont pas deux preuves.** La lecture effort-récompense (Siegrist) reprend cinq questions de la balance exigences-ressources (D1, D4, D6, E5, E6).
- **Le questionnaire n'est pas validé.** Il s'inspire d'outils reconnus ; fidélité, structure et seuils restent à tester.
- **Le ton reste franc**, et le slogan « prévention burn-out sans bullshit » apparaît partout.
- **Le dépôt est public** : aucune conversation privée ni réponse individuelle dans ces documents.

## Où regarder dans le code

| Besoin | Fichier |
|---|---|
| Questions, scores A à F, profils, alertes | [script.js](../../script.js) |
| Questions et poids du bullshitomètre | [bullshitometre-data.js](../../bullshitometre-data.js) |
| Rapport : synthèse, tableau de bord, dessin, pièces, annexes | [rapport.js](../../rapport.js), [rapport.css](../../rapport.css) |
| Formation : chapitres, cas, quiz | [formation-contenu.js](../../formation-contenu.js), [parcours.js](../../parcours.js) |
| Ce qu'on mesure et nos limites, pour le public | [methode.html](../../methode.html) |
| Mise en ligne (bullout.ddlab.fr) | [worker.js](../../worker.js) : sert la branche `main` |
