# Bull-Out — après le Bullshitomètre : comment les questions ont été vécues

**20 novembre 2026 · implémentation sur la branche de refonte, PR #7 en brouillon · pas de publication sur main.**

## Idée de départ

Après les douze questions satiriques, demander à la personne comment elle a reçu l'humour : **a-t-elle souri, eu de la peine, trouvé les blagues minimisantes, ou pris du recul ?**

Ce n'est **ni un score supplémentaire de burn-out, ni une mesure de résilience**. C'est un retour immédiat sur un questionnaire satirique. Une même personne peut avoir ri et s'être sentie blessée : les deux événements ne sont ni opposés ni annulables par un score.

Le module est placé immédiatement **après BS1–BS12**, avant les questions de récupération/santé. Quatre nouveaux emplacements sont proposés, portant le parcours à **79 questions proposées dont 16 facultatives** (12 BS, quatre HR).

## Formulations retenues

| ID | Question | Ce qui est demandé | Ce qui n'est pas démontré |
|---|---|---|---|
| HR1 | « Ces questions m'ont amusé·e ou fait sourire. » | Amusement perçu immédiatement | Que la personne utilise souvent l'humour pour faire face aux difficultés |
| HR2 | « Certaines questions m'ont fait de la peine ou mis·e mal à l'aise. » | Ressenti négatif provoqué ou associé aux formulations | Que le questionnaire crée une souffrance durable ou qu'une fragilité clinique existe |
| HR3 | « J’ai eu l’impression que ces blagues minimisaient les difficultés que je rencontre. » | Appréciation de l’humour : banalisation ou minimisation perçue | Qu’une intention de minimiser existait, ou que la blague a objectivement aggravé la situation |
| HR4 | « Sur le moment, ces questions m'ont aidé·e à prendre un peu de recul sur mon travail. » | Prise de recul perçue après l'exposition aux questions | Qu'un mécanisme de réévaluation cognitive s'est durablement installé ou réduit le stress |

**Modalités indépendantes pour chaque question :** « Pas du tout », « Un peu », « Moyennement », « Beaucoup », « Tout à fait », « Je préfère ne pas répondre ».

Ces catégories sont des repères de réponse et non une échelle étalonnée. **Aucun total, aucune moyenne, aucun classement de « bon humour »** n'est calculé. Les quatre réponses sont indépendantes et peuvent toutes être élevées.

## Fonctionnement et choix utilisateur

- Le Bullshitomètre BS reste facultatif.
- Le bouton « Passer cette pause humoristique » passe aussi les quatre questions HR : on ne demande pas de juger une expérience que la personne n'a pas faite.
- Si BS a été rempli, HR peut être renseigné, passé en entier ou refusé question par question, sans bloquer le rapport.
- Le module apparaît dans le rapport personnel complet et le résumé personnel copiable, **jamais dans la fiche de discussion sur les conditions de travail**.
- La sauvegarde V10 (`bull-out-progression-10`) contient `versionReactionHumour: "2026-11-hr-v2"`. Les anciennes sauvegardes V8/V9 sont migrées. La question HR3 ayant changé de contenu, **une ancienne réponse HR3 entre 0 et 4 est effacée et doit être redonnée** ; une ancienne abstention (« 5 ») reste conservée. Toutes les réponses inchangées sont préservées.

## Comment restituer sans surinterpréter

Le moteur `interpretHumorReaction` construit une **phrase descriptive**, pas une typologie clinique :

- **Amusement et peine élevés** : « Ça fait rire. Et ça touche. » Les deux réponses sont affirmées sans les interpréter comme contradictoires.
- **Peine élevée** : reconnaître une formulation éprouvante, sans attribuer un manque d'humour à la personne.
- **Amusement et recul élevés** : « Du rire et un peu de recul. » Cette prise de recul est **déclarée** et **immédiate**, sans preuve d'effet protecteur durable.
- **Recul élevé sans grand amusement** : le déplacement du regard est distingué de l'émotion plaisante.
- **Impression de minimisation élevée** : décrire une perception du propos, même sans peine déclarée. Elle peut coexister avec l’amusement ou le recul ; elle ne démontre ni une intention de dénigrer ni un effet nocif durable.
- **Aucun ressenti particulièrement marqué / réponses refusées** : pas de jugement, pas de profil inventé.

Le report conserve l'ancienne **matrice 2×2** (absurdité satirique × distance/perte de sens). Les réponses HR s'ajoutent comme une **troisième lecture séparée**, non comme un troisième axe converti en matrice plus complexe.

**Cas pédagogique :** une personne déclare beaucoup d'absurdité, peu de distance au travail, beaucoup d'amusement et beaucoup de peine. Le rapport ne conclut ni « l'humour protège » ni « la personne vit mal son travail parce qu'elle est blessée ». La perception que la satire minimise les difficultés est examinée séparément du rire et de la peine. Il décrit une expérience ambivalente et invite à regarder les situations réellement évoquées.

## Statut scientifique

La psychologie de l'humour distingue l'appréciation de l'humour, l'amusement, les émotions négatives, l'impression de banalisation, la réévaluation cognitive et les usages de l'humour face au stress. Ces construits ne sont pas interchangeables ; les relations varient avec la personne et le contexte.

- Samson, Glassco, Lee et Gross (2014), *Humorous Coping and Serious Reappraisal: Short-Term and Longer-Term Effects*, `Europe's Journal of Psychology` : https://doi.org/10.5964/ejop.v10i3.730
- *Play-mirth theory: a cognitive appraisal theory of humor* (2024), `Frontiers in Psychology` : https://pmc.ncbi.nlm.nih.gov/articles/PMC11659645/
- *Laughter-inducing Interventions for Workplace Stress Management: A Scoping Review* (2026) : https://pubmed.ncbi.nlm.nih.gov/42857295/ . La revue souligne les nombreuses limites de qualité des études d'intervention existantes.

**Aucune de ces études ne valide HR1–HR4.** Le module mesure uniquement les réponses déclarées à ces quatre formulations, après exposition à un contenu satirique précis. Il ne permet pas d'établir un effet thérapeutique, une causalité sur le bien-être, une capacité habituelle de résilience ou un trait psychologique.

## Recette de vérification avant publication

1. BS complet puis HR complet : quatre réponses affichées séparément, dont le cas rire **et** peine.
2. BS complet puis HR passé : BS est calculé, aucune réaction n'est inventée.
3. BS entièrement passé : HR passé automatiquement, matrice BS et portrait non calculés.
4. Anciennes sauvegardes V8 et V9 : pas de perte des douze réponses satiriques ; préserver HR1, HR2 et HR4, mais demander à nouveau HR3 si elle avait été renseignée avant sa reformulation.
5. Ordinateur et mobile : vérifier les six choix, la touche 1–6 et le rendu de quatre cartes dans le rapport.
6. PDF complet : HR doit apparaître comme **ressenti déclaratif** ; PDF de fiche travail : ni HR ni les réponses de santé.
7. Lecture test avec des personnes : différencient-elles « cette blague m'a fait rire » de « je vais mieux grâce à cette blague » ?

**Ne pas fusionner sans recette visuelle des PDF et de la saisie sur mobile.**
