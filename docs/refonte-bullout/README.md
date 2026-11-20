# Bull-Out — chantier de refonte (documentaire)

**Dernière mise à jour : 20 novembre 2026.**  
**État : implémentation en cours sur une branche de revue, sans fusion ni déploiement. Le schéma existant reste la base ; les choix de questionnaire demeurent provisoires.**

## Point d'entrée pour reprendre le travail

1. **Lire d'abord [le journal des échanges et décisions ouvertes](00-journal-et-decisions.md).** Il distingue les critiques de Claude, les hypothèses proposées par ChatGPT, les objections formulées ensuite et le recadrage le plus récent.
2. **Lire ensuite [l'inventaire des 67 questions, des calculs et des 15 éléments du schéma](inventaire-questions-mesures-calculs.md).** C'est la photographie du code actuel et des usages réels.
3. Pour les propositions précédentes, consulter les **archives**, sans les interpréter comme des décisions :
   - [Premier cadrage scientifique et UX](archives/cadrage-scientifique-ux-2026-11-20-v1.md)
   - [Premier comparateur HTML : traversée et pont](archives/comparateur-metaphores-2026-11-20-v1.html)

## Implémentation en cours (branche de refonte, novembre 2026)

La branche conserve **les 67 questions et leurs identifiants**, et la structure du schéma en trois zones, tout en corrigeant les mesures et en reconstruisant le rapport autour du lecteur. Pour éviter de confondre une hypothèse d'étude avec une décision validée, reprendre les documents dans cet ordre :

- [Journal de la discussion et des arbitrages encore ouverts](00-journal-et-decisions.md)
- [Inventaire des 67 questions et des transformations mathématiques](inventaire-questions-mesures-calculs.md)
- [Première implémentation : scores, sécurité et interprétations](01-implementation-mesures-rapport-2026-11-20.md)
- [Deuxième implémentation : rapport court, présentation, graphique progressif, fiche travail et carnet](03-ameliorations-rapport-2026-11-20.md)
- [Audit scientifique et éditorial question par question pour la prochaine version](02-audit-questionnaire-prochaine-version.md)
- [Suite de tests automatisés](../../tests/mesures-rapport.test.cjs) et [workflow GitHub Actions](../../.github/workflows/verification.yml)

**PR en brouillon :** [#7 — Refonte des mesures et du rapport](https://github.com/PNP06/Bulout/pull/7). Elle ne modifie pas le site publié tant qu'elle n'est pas fusionnée.

**Attention :** cette branche n'a pas encore été fusionnée dans `main`. Ce README distingue donc la décision de conserver provisoirement le visuel et les modifications de texte/code réalisées depuis.

## Recadrage le plus récent

Le schéma **actuellement utilisé dans le rapport Bull-Out** peut finalement être plus pertinent que les métaphores nouvelles. Son agencement de gauche à droite permet de distinguer les conditions de travail, la situation de la personne et les manifestations, sans réduire le problème à un simple « niveau d'énergie ».

**Il n'est ni adopté définitivement ni rejeté.** Avant de remplacer le dessin, il faut définir et auditer ce que Bull-Out mesure réellement, ce qu'il calcule et ce qu'il infère. Les pistes « réservoir », « tableau de bord », « arbre », « bateau », « pont » et « traversée » restent historiques et non décidées.

## Ce qui doit rester vrai

- Les premières modifications de `script.js`, `rapport.js`, `rapport.css`, `index.html` et des pages publiques ont été demandées dans les cycles suivants, mais uniquement sur une branche de revue. La **formulation et le nombre des questions restent inchangés**.
- Ne pas confondre manifestation, exposition, ressource, contexte, signal de sécurité et action.
- Distinguer les **réponses observées**, les **scores artisanaux**, les **représentations visuelles** et les **hypothèses explicatives**.
- Ne pas présenter comme une mesure physiologique le « pourcentage de batterie », comme des preuves indépendantes les lectures JD-R/ERI qui réutilisent les mêmes questions, ou comme validation clinique des seuils internes.
- Préserver le fond et l'identité éditoriale de Bull-Out ; ne pas imposer mécaniquement la métaphore de Papillon.
- Prioriser l'audit des questions et des décisions que les réponses permettent, puis seulement le design.

## Références dans le code

| Besoin | Source |
|---|---|
| Questions et calculs A–F, G, R, contexte, alertes, profils | [script.js](../../script.js) |
| Huit questions satiriques et pondérations | [bullshitometre-data.js](../../bullshitometre-data.js) |
| Rapport, batterie, graphiques et règles d'interprétation | [rapport.js](../../rapport.js) |
| Formation, modèles et cas fictifs | [formation-contenu.js](../../formation-contenu.js) |
| PDF court / long | [rapport.css](../../rapport.css) |
| Animation d'accueil | [index.html](../../index.html) |

Les documents distinguent les décisions confirmées, les travaux effectivement codés et les hypothèses encore à valider. La validation de la mise en page réelle et du parcours complet reste nécessaire avant fusion.

Le dépôt est public : aucun détail privé de conversation ni réponse individuelle à un questionnaire ne doit être ajouté aux documents versionnés.
