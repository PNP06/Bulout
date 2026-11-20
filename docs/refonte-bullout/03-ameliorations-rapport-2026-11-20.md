# Bull-Out — rapport personnel : deuxième passe, cadrage produit et recette

**Date : 20 novembre 2026 · statut : code réalisé sur `refonte-mesures-rapport-2026-11-20`, en revue dans [PR #7](https://github.com/PNP06/Bulout/pull/7), non fusionné.**

## 1. Ce qui a été repris de nos débats et de Psytest / Papillon

La différence avec Papillon ne se résumait pas à une métaphore graphique. Les documents examinés dans `PNP06/Psytest` — notamment `docs/v2/spec/rapport.md` et `app/v2/report.js` — privilégient **une lecture personnelle rapide, puis la compréhension et les annexes**. Ils distinguent l'information déclarée, les hypothèses et les limites de la lecture.

Le rapport Bull-Out suivait surtout l'ordre des neuf pièces de la formation, avec synthèse, appuis et satire avant le plan. Il était donc complet, mais le lecteur fatigué devait chercher le prochain geste utile.

**Principe retenu pour cette branche :** **le rapport suit les questions de la personne, pas l'ordre des chapitres**. La formation conserve les neuf chapitres.

## 2. Modifications effectivement réalisées

| Objet | Avant | Dans la branche |
|---|---|---|
| Première lecture | Synthèse longue : grand schéma, nombreuses cartes et sommaire détaillé | Trois cartes **Ce que tu vis / Ce que tu décris au travail / Ce sur quoi tu peux t'appuyer**, ancrées sur les questions individuelles les plus saillantes, limites d'interprétation explicites |
| Qualité des réponses | Contrôle de forme essentiellement dans l'annexe | Encadré descriptif en synthèse, avant les résultats, signalant les contrastes peu lisibles sans conclure à une réponse invalide ou insincère |
| Accès aux actions | Neuf pièces puis plan (navigation possible) | Après la synthèse : plan, interlocuteurs, fiche travail ; les détails sous **« Approfondir »** |
| Schéma d'ensemble | Trois zones + fils à lecture directe, avec pourcentage fictif d'énergie | Trois zones et fils **conservés**, deux scores A/F distincts ; lecture progressive en quatre étapes et légende sans causalité |
| Version mobile du schéma | SVG vertical | SVG vertical maintenu, avec les mêmes couches de lecture |
| Parcours graphique | Une image complète à consulter | Étapes pilotables **manifestations / conditions / appuis / vue complète**, chacune avec texte accessible et bouton actif |
| Efficacité / sens | Sous-scores C ramenés artificiellement à 24 | **Efficacité C1/C2/C4/C6 sur 16 ; sens C3/C5 sur 8**, avec largeur proportionnelle au vrai maximum |
| Risques psychosociaux | D/E et modèles JD-R/ERI | Tableau documenté des **six familles INRS/Gollac** : items couverts, cas signalés, lacunes, sans score inventé |
| Actions | Actions souvent liées au total de section | Si une question D/E est fortement déclarée, une action adaptée à l'item est proposée même si le total de la section est bas |
| Interlocuteurs | Possibilité de pousser automatiquement vers le manager | Si la personne signale peur de parler ou harcèlement, pas de recommandation automatique du manager ; appui confidentiel suggéré |
| Urgences | Mélange possible de niveaux de sécurité | Les trois alertes et leurs orientations sont dissociées des scores ; F élevé seul ne signifie pas danger vital |
| Bullshitomètre | Surnom satirique et conseils humoristiques même en cas d'épuisement marqué | **Profil satirique accessible et repliable** quel que soit le niveau d'épuisement, avec une matrice séparant absurdité perçue, distance et sens. Le signal médical reste traité à part, sans inférer un effet protecteur de l'humour |
| Versions PDF | Court/long déjà existants | Par défaut **Essentiel** (synthèse, plan, portes), **Complet** (toutes les pièces/annexes), **Fiche travail** (seule la page D/E, sans réponses de santé) |
| Fiche travail | Demandes factuelles disponibles dans certaines pièces | Page autonome préparant une discussion : contraintes D, ressources E, arbitrage demandé, exemples à dater ; pas de réponses de santé |
| Suivi | Refaire le questionnaire dans deux/quatre semaines | **Carnet imprimable à deux et quatre semaines**, avec faits, dates, décisions, manifestations et point à réexaminer ; pas de suivi par total agrégé |
| Résumé copiable | Plan générique, parfois différent du calcul | Réutilise les propositions générées réellement par le moteur ; copie signalée comme personnelle et sensible |

Les éléments de la synthèse et la fiche de travail reposent sur les **réponses déclarées**. Ils ne constituent ni une preuve d'exposition objective, ni une démonstration de cause du symptôme. L'architecture visuelle actuelle demeure donc l'hypothèse de référence, pas un modèle causal validé.

## 3. À quoi servent les quatre étapes du schéma ?

**1. Manifestations.** Montrer la situation rapportée, sans encore afficher toute l'organisation. Comprendre que l'épuisement, les troubles de récupération, la distance et la qualité vécue ne sont pas nécessairement une seule chose.

**2. Conditions.** Ajouter les contraintes D, les ressources E, les lectures de Siegrist et le contexte déclaré. L'interface ne doit jamais faire croire qu'une barre de demandes cause mathématiquement une barre de symptômes.

**3. Appuis.** Examiner les ressources G et des possibilités de récupération déclarées, sans présenter l'existence d'un soutien comme une compensation automatique.

**4. Vue complète.** Revenir au schéma d'origine, avec ses trois zones et la possibilité de chercher des hypothèses. L'épaisseur des traits est une convention de représentation, pas une force causale.

Cette interaction utilise des groupes SVG séparés, des boutons accessibles, un état `aria-pressed`, un commentaire `aria-live`, et une transition désactivée quand l'utilisateur préfère les animations réduites. L'impression rétablit la vue complète.

**Choix encore ouvert :** la mise en lumière successive est une version pragmatique. Elle n'est pas une animation narrative au défilement comparable à celle envisagée pour Papillon. Il faut l'évaluer avec de vrais lecteurs avant d'aller plus loin.

## 4. Les trois publics de document : préserver la confidentialité

| Document | Pour quoi faire | Contenu |
|---|---|---|
| **Essentiel** | Lire sa situation et préparer une consultation ou une décision personnelle | Synthèse, proposition d'action, interlocuteurs, y compris messages de sécurité si signalés |
| **Complet** | Comprendre les modèles et relire les réponses | Toutes les pièces, BS, contexte, calculs, annexes, et réponses individuelles seulement si option cochée |
| **Fiche travail** | Discuter d'une organisation du travail sans divulguer sa santé | D/E, demandes d'arbitrage, observations à vérifier ; **ni questions A/B/C/F, ni alerte, ni consommation, ni contexte personnel, ni scores** |

La fiche travail doit être vérifiée sur le **PDF réellement imprimé**, pas seulement dans le contenu HTML. Aucun manager ne doit exiger de connaître la version personnelle.

## 5. État de l'audit du questionnaire

Voir [l'audit question par question](02-audit-questionnaire-prochaine-version.md) et [l'inventaire exact des 67 réponses](inventaire-questions-mesures-calculs.md).

**Pas de nouvelle question dans cette branche.** L'audit distingue ce qui peut être conservé, reformulé ou reclassé. Les lacunes scientifiques les plus informatives sont : temporalité et évolution ; qualité empêchée/conflits de valeurs ; attribution des symptômes ; nature de la récupération ; fonction réelle de l'humour. Il faudra aussi traiter le mélange des dimensions C et F et plusieurs formulations causalement orientées.

Toute modification d'item nécessitera une migration du format de sauvegarde et un examen des résultats antérieurs ; il serait trompeur de modifier les intitulés en conservant les mêmes seuils sans étude.

## 6. Vérifications automatisées et critères de réussite

Workflow `.github/workflows/verification.yml` : exécution de `node --check script.js` et de la suite Node `node --test tests/mesures-rapport.test.cjs`. La suite comporte **29 tests automatisés** à la date de cette mise à jour. Les scénarios portent sur :
- 75 questions proposées ; conservation de BS1–BS8 et ajout de BS9–BS12 ; migration v7 → v8 ;
- seuils non cliniques et alertes distinctes du total ;
- rendu HTML pour réponses 0–4 et pour chaque alerte ;
- absence de fausse batterie chiffrée et vrai dénominateur du sens ;
- premiers écrans et exports différenciés ;
- absence de réponses médicales dans la fiche travail ;
- six familles INRS et limites de couverture ;
- actions spécifiques à D/E, peur de parler et orientation proportionnée ;
- schéma en quatre étapes, grands/petits SVG et impression ;
- retrait de la satire en cas de signaux importants.

Un test de code n'est pas une validation scientifique, ni une capture de rendu.

## 7. Recette manuelle **obligatoire avant fusion**

1. **À l'écran :** parcours complet `Formation → Diplôme → Questionnaire → Synthèse → Plan → Portes → Approfondir`, y compris retour sur les réponses, navigation au clavier, zoom 200 % et préférence `prefers-reduced-motion`.
2. **SVG desktop et mobile :** vérifier que le texte des colonnes reste lisible, que les quatre étapes éclairent le bon groupe, que le bouton sélectionné se distingue, et que l'alerte reste visible dans toutes les étapes.
3. **Trois PDF :** imprimer `Essentiel`, `Complet`, `Fiche travail`. Contrôler nombre de pages, pagination, lisibilité, graphes, coupures et **confidentialité de la fiche travail**. Le volume exact des PDF **n'est pas encore vérifié**.
4. **Fichiers de progression :** enregistrer et importer une sauvegarde partielle ancienne et nouvelle, vérifier que les questions d'alerte ne figurent pas dans le JSON ; essayer le questionnaire avec toutes les réponses « parfois » et avec un seul item D3 marqué.
5. **Qualité narrative :** faire lire le rapport fictif à une personne qui s'interroge sur son travail, puis demander : « Qu'est-ce qui ressort ? Qu'est-ce que Bull-Out ne peut pas conclure ? Que peux-tu faire d'abord ? ».
6. **Accessibilité :** lecteurs d'écran pour le graphique et ses étapes, contrastes, parcours clavier des pièces, absence de contenu tronqué sur téléphone.
7. **Traçabilité :** conserver le résultat des essais et les corrections de bugs dans le dépôt avant de publier.

### Critères pour accepter la version

- La personne identifie les **manifestations** et les **conditions de travail** comme deux familles distinctes, sans considérer que le dessin prouve une relation de cause.
- Le rapport court permet de trouver **une piste d'action et un interlocuteur** sans parcourir toutes les pages.
- Le PDF « Fiche travail » ne divulgue pas des réponses de santé ni un indicateur de sévérité médicale.
- Les scénarios de sécurité ne sont jamais masqués par l'humour ou par un score bas.
- La navigation fonctionne sur mobile et ne fait pas disparaître le détail scientifique.
- Aucun résultat non étalonné n'est présenté comme une probabilité clinique, une mesure d'énergie ou une preuve de guérison.

## 8. Arbitrages encore ouverts

- Faut-il conserver les fils reliant graphiquement les trois zones, même légendés comme non causaux ? C'est un **risque de compréhension** à évaluer, pas une question seulement décorative.
- Le rapport Essentiel tient-il réellement en un faible nombre de pages une fois imprimé ? À mesurer sur le rendu.
- Les seuils des six scores maison sont-ils utiles pour orienter des choix, ou vaut-il mieux fonder les déclencheurs sur certains items ?
- Quel statut donner à la qualité empêchée, la temporalité et les conflits de valeurs dans la prochaine version du questionnaire ?
- Quel noyau de mesure existant, validé et réutilisable, serait compatible avec les ambitions de Bull-Out ?

**Ne pas fusionner automatiquement.** L'étape suivante exige un contrôle visuel et fonctionnel de l'application, puis des essais de compréhension auprès de personnes réelles.
