# Bull-Out — Bullshitomètre V2 : douze questions, humour et matrice de lecture

**État : implémenté sur la branche `refonte-mesures-rapport-2026-11-20`, non fusionné dans `main`.**

## Intention : le rire comme expérience, pas comme résultat de test clinique

La satire fait partie de l'identité de Bull-Out. Elle permet de nommer des situations que les questionnaires traditionnels décrivent difficilement : réunionnite, gouvernance par indicateurs, livrables qui ne servent pas à décider, demandes impossibles et flou organisé.

**Décision éditoriale :** conserver le rire, même lorsque des difficultés d'épuisement sont déclarées. **L'utilisateur choisit** de passer les questions satiriques ou de répondre, puis de replier ou non le portrait humoristique dans son rapport. **Aucun score de santé ne décide si la personne a le droit de rire.**

La séparation conceptuelle est stricte : les quatre familles de scores BS servent à une lecture satirique de situations professionnelles ; B et C3/C5 décrivent des réponses déclaratives différentes. Leur comparaison éclaire une conversation, pas un diagnostic ni un mécanisme protecteur.

## Origine et préservation des douze questions

Source interne exacte : `questionnaire_bullshit_job_satirique_html.html`, douze questions et leurs quatre choix/pondérations d'origine.

La première intégration dans Bull-Out n'avait retenu que huit questions. Pour **ne jamais renommer une réponse ancienne**, les huit identifiants BS1–BS8 sont conservés à l'identique, et les quatre questions d'origine manquantes sont ajoutées à la fin.

| ID Bull-Out | N° du questionnaire original | Sujet |
|---|---:|---|
| BS1 | 1 | Ce que tu produis aujourd'hui |
| BS2 | 2 | Réunions remplaçables par un courriel |
| BS3 | 3 | Utilité réelle de l'outil de pilotage |
| BS4 | 4 | « Il faut qu'on se cale » |
| BS5 | 5 | Impact réel sur les décisions |
| BS6 | 7 | Livrables relus sur le fond |
| BS7 | 10 | Ce que signifie « transverse » |
| BS8 | 12 | Impression à la fin d'une semaine |
| **BS9** | **6** | **Slide demandée pour demain** |
| **BS10** | **8** | **Demande typique floue ou impossible** |
| **BS11** | **9** | **Agenda saturé de synchronisations** |
| **BS12** | **11** | **KPI utiles ou autoréplicatifs** |

La séquence respecte les huit premiers identifiants, et non l'ordre du test original ; ce compromis protège les sauvegardes. Les contenus des quatre nouvelles questions et leurs poids proviennent de l'original présent dans le dépôt, sans invention de nouveaux items.

## Calcul : distinguer l'indice général des manifestations particulières

Chaque réponse satirique possède quatre poids maison : `absurd`, `meeting`, `dashboard`, `ghost`.

Pour chaque dimension, Bull-Out calcule :

```text
indice_thématique = 100 × somme(poids des réponses choisies)
                       / somme(poids maximum de chaque question sur ce thème)
```

**Correction V2 :** le grand pourcentage montré sous « indice satirique d'absurdité » est **exactement `dims.absurd`**. L'ancien affichage mélangeait les quatre dimensions pour calculer le pourcentage principal, tout en montrant un autre pourcentage pour « absurdité globale ». Les deux chiffres désignaient donc des choses différentes sans explication suffisante.

Les trois sous-indices **réunionite**, **dashboardologie**, **contribution fantôme** restent distincts et identifient le thème le plus saillant. Ils ne mesurent pas la fréquence objective d'une situation ni la proportion d'emplois inutiles.

Les quatre portraits satiriques d'origine continuent de correspondre à des quarts du barème maison. **Ces classes ne sont pas des catégories psychométriques.** Les deux choix satiriques les plus marqués sont cités pour rendre le portrait explicable ; ils n'ajoutent aucun score.

## Matrice Bullshit × distance / sens : quatre situations

### Origine de la matrice

La **matrice de couverture de quinze éléments** réalisée par Claude dans le PDF `Bull-out débat critique.pdf` (p. 3–4) compare le schéma complet aux métaphores de réservoir, tableau de bord, arbre et bateau. Elle concerne l'image d'ensemble, dont l'absurde est un élément parmi quinze.

Le **croisement 2 × 2** existait déjà dans `rapport.js` : d'un côté la satire, de l'autre la distance B ou le sens C3/C5. La V2 développe ce croisement, son texte et ses limites, sans attribuer faussement la grille 2 × 2 au tableau de couverture des quinze éléments.

| | **Distance / sens moins marqués** | **Distance ou sens plus marqués** |
|---|---|---|
| **Absurdité perçue plus marquée** | **L'absurde, mais pas le désengagement.** On peut trouver une réunion absurde sans perdre le sens de son métier. | **Le cirque commence à peser.** Coexistence de deux signaux ; chercher les faits associés sans présumer d'une cause. |
| **Absurdité perçue moins marquée** | **De vrais arbitrages, ça existe.** Peu de signaux sur ces thèmes, sans exclure d'autres difficultés. | **Le malaise sans le grand cirque.** Examiner d'autres facteurs, sans attribuer automatiquement la difficulté à l'absurde. |

**Axe horizontal**, dans l'implémentation : B ≥ 13/24 ou C3+C5 ≥ 5/8. **Axe vertical** : indice satirique d'absurdité ≥ 50 %. **Les seuils sont des conventions narratives arbitraires, non étalonnées** ; l'application les annonce près de la matrice.

Le moteur `analyseBullshitMatrix()` produit désormais `key`, titre, interprétation, blague, question à poser, état des deux axes et repère de qualité empêchée (T4). Le rapport consomme cette lecture calculée, au lieu d'inventer une interprétation en dehors du moteur.

### Exemple : absurdité élevée, retrait faible

- Phrase satirique : « Le PowerPoint est peut-être absurde. Ton rapport au travail ne l'est pas forcément. »
- Lecture : la personne rapporte des situations bureaucratiques absurdes **mais ne rapporte pas autant de distance ou de perte de sens**.
- Question proposée : « Quels aspects de ton travail restent utiles malgré les rituels qui semblent superflus ? »
- **Ce qu'on ne conclut pas :** « l'humour protège », « les conditions sont soutenables », ou « aucun burn-out ».

### Axe complémentaire : quel bullshit ressort ?

En dehors de la matrice, le rapport relève la plus forte des trois formes particulières :

- **Réunionite :** « À quelle décision précise doit aboutir cette réunion, et qui en est responsable ? »
- **Dashboardologie :** « Quelle décision ce KPI permet-il réellement de prendre ou de modifier ? »
- **Contribution fantôme :** « Qui se sert de ce livrable et qu'est-ce que son contenu change concrètement ? »

Le cas échéant, **T4 qualité empêchée** est mis à proximité de la matrice, sans le fondre dans l'indice satirique. BS décrit des **choix de réponses humoristiques**, T4 la fréquence déclarée d'un empêchement professionnel.

## Présentation et choix de la personne

- La **pause BS de douze questions est facultative** ; elle peut être passée en bloc, sans produire un faux 0 %.
- Si elle est renseignée, le profil satirique d'origine reste **visible par défaut**, même si le rapport comprend des manifestations d'épuisement ; le portrait est **repliable**.
- Le ton reste franc et drôle ; les conseils du profil d'origine sont balisés comme « manuel de survie satirique », pas comme recommandations de santé.
- Le rapport **Essentiel** se concentre sur les décisions ; le rapport complet contient la satire. La fiche professionnelle destinée au dialogue au travail exclut tout le rapport BS, les manifestations et les alertes de santé.
- L'annexe conserve les réponses BS. Le questionnaire principal passe de **71 à 75 propositions de questions**, dont 12 peuvent être passées.

## Compatibilité des sauvegardes

`bull-out-progression-8`, `versionQuestions: "2026-11-v2"`, `versionBullshitometre: "2026-11-bs-v2"`.

- Anciennes réponses **BS1–BS8** conservées sans changement d'identifiant.
- **BS9–BS12** doivent être renseignées pour un portrait complet.
- Si une sauvegarde V7 marquait **BS1–BS8 comme sautées**, le choix « passer la pause BS » est étendu automatiquement aux quatre nouvelles questions.
- Les questions d'alerte demeurent exclues des fichiers de reprise.

## Références scientifiques à ne pas confondre avec la satire

1. David Graeber (2018), *Bullshit Jobs*. Hypothèse anthropologique influente, non dispositif de mesure scientifique validé.
2. Soffia, Wood & Burchell (2022), *Alienation Is Not ‘Bullshit’*, *Work, Employment and Society*. La perception d'un emploi inutile est associée au mal-être, mais les auteurs contestent les propositions majeures de la théorie de Graeber. https://doi.org/10.1177/09500170211015067
3. Martin et al. (2003), *Individual differences in uses of humor and their relation to psychological well-being*, *Journal of Research in Personality*. Les usages/sty​les d'humour sont pluriels ; le BS de Bull-Out **ne les mesure pas**. https://doi.org/10.1016/S0092-6566(02)00534-2
4. INRS, six familles de risques psychosociaux et conflits de valeurs : https://www.inrs.fr/risques/psychosociaux/facteurs-risques

**Conclusion :** on peut faire rire **et** traiter sérieusement un signal de santé, parce qu'on garde les deux registres distincts.

## Vérifications à poursuivre avant publication

- 12 questions lues au téléphone, y compris les quatre nouvelles, et navigation clavier.
- Import d'un vrai fichier V7 avec huit réponses BS ou huit « skip ».
- Scénarios des quatre cadrans, BS à 0 %, à 100 %, et BS passé.
- Contrôle de la mise en page complète (matrice 2 × 2, portrait repliable, extrait de deux réponses) et des PDF imprimés.
- Test de compréhension : une personne distingue-t-elle les deux axes, et comprend-elle que le % de bullshit n'est pas une probabilité ni une proportion de tâches inutiles ?

Aucune validation psychométrique n'est revendiquée.
