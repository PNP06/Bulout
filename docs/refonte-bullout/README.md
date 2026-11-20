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

La branche conserve **les six groupes A–F de six items et leurs identifiants**, mais **15 formulations ont été revues et 4 repères T ajoutés** : le parcours propose désormais 75 questions, dont 12 satiriques facultatives. Les huit BS d’origine intégrées restent à leur place ; les quatre absentes sont ajoutées sous BS9–BS12. Le schéma reste en trois zones ; le moteur et le rapport ont été révisés. Pour éviter de confondre une hypothèse d'étude avec une décision validée, reprendre les documents dans cet ordre :

- [Journal de la discussion et des arbitrages encore ouverts](00-journal-et-decisions.md)
- [Inventaire des 67 questions et des transformations mathématiques](inventaire-questions-mesures-calculs.md)
- [Première implémentation : scores, sécurité et interprétations](01-implementation-mesures-rapport-2026-11-20.md)
- [Deuxième implémentation : rapport court, présentation, graphique progressif, fiche travail et carnet](03-ameliorations-rapport-2026-11-20.md)
- [Audit scientifique et éditorial initial question par question](02-audit-questionnaire-prochaine-version.md)
- [**Version codée du questionnaire et du moteur : 15 reformulations, 4 repères T, BS facultatif, migration des sauvegardes**](04-questionnaire-moteur-v2-2026-11-20.md)
- [**Bullshitomètre V2 : 12 questions d’origine, matrice croisée, humour et limites**](05-bullshitometre-12-questions-matrice.md)
- [Suite de tests automatisés](../../tests/mesures-rapport.test.cjs) et [workflow GitHub Actions](../../.github/workflows/verification.yml)

**PR en brouillon :** [#7 — Refonte des mesures et du rapport](https://github.com/PNP06/Bulout/pull/7). Elle ne modifie pas le site publié tant qu'elle n'est pas fusionnée.

**Attention :** cette branche n'a pas encore été fusionnée dans `main`. Ce README distingue donc la décision de conserver provisoirement le visuel et les modifications de texte/code réalisées depuis.

## Recadrage le plus récent

Le schéma **actuellement utilisé dans le rapport Bull-Out** peut finalement être plus pertinent que les métaphores nouvelles. Son agencement de gauche à droite permet de distinguer les conditions de travail, la situation de la personne et les manifestations, sans réduire le problème à un simple « niveau d'énergie ».

**Il n'est ni adopté définitivement ni rejeté.** Avant de remplacer le dessin, il faut définir et auditer ce que Bull-Out mesure réellement, ce qu'il calcule et ce qu'il infère. Les pistes « réservoir », « tableau de bord », « arbre », « bateau », « pont » et « traversée » restent historiques et non décidées.

## Ce qui doit rester vrai

- Les modifications récentes portent aussi sur les questions : quinze ont été reformulées et quatre repères non notés ont été ajoutés, avec une migration des fichiers de progression. Les décisions et tests figurent dans le document 04. Aucun déploiement de cette branche n’a été réalisé.
- Ne pas confondre manifestation, exposition, ressource, contexte, signal de sécurité et action.
- Distinguer les **réponses observées**, les **scores artisanaux**, les **représentations visuelles** et les **hypothèses explicatives**.
- Ne pas présenter comme une mesure physiologique le « pourcentage de batterie », comme des preuves indépendantes les lectures JD-R/ERI qui réutilisent les mêmes questions, ou comme validation clinique des seuils internes.
- Préserver le fond et l'identité éditoriale de Bull-Out ; ne pas imposer mécaniquement la métaphore de Papillon.
- Prioriser l'audit des questions et des décisions que les réponses permettent, puis seulement le design.

## Références dans le code

| Besoin | Source |
|---|---|
| Questions et calculs A–F, G, R, contexte, alertes, profils | [script.js](../../script.js) |
| Douze questions satiriques et pondérations | [bullshitometre-data.js](../../bullshitometre-data.js) |
| Rapport, batterie, graphiques et règles d'interprétation | [rapport.js](../../rapport.js) |
| Formation, modèles et cas fictifs | [formation-contenu.js](../../formation-contenu.js) |
| PDF court / long | [rapport.css](../../rapport.css) |
| Animation d'accueil | [index.html](../../index.html) |

Les documents distinguent les décisions confirmées, les travaux effectivement codés et les hypothèses encore à valider. La validation de la mise en page réelle et du parcours complet reste nécessaire avant fusion.

Le dépôt est public : aucun détail privé de conversation ni réponse individuelle à un questionnaire ne doit être ajouté aux documents versionnés.
