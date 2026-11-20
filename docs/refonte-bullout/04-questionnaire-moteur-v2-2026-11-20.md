# Bull-Out — questionnaire et moteur, version 2026-11-v2

**20 novembre 2026 — modifications codées, PR #7 en brouillon, non fusionnées.**

## Objectif

**Séparer ce qui est ressenti, ce qui est déclaré à propos du travail et ce qui n'est qu'une hypothèse.** Ne pas présenter un assemblage original de questions comme une mesure clinique validée. Le rapport doit aider à repérer les faits, qualifier le contexte et demander un arbitrage, tout en évitant la causalité automatique et la réduction d'une situation à un score total.

Sources conceptuelles :
- OMS / CIM-11 : https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon
- INRS, six familles RPS : https://www.inrs.fr/risques/psychosociaux/facteurs-risques
- INRS, conflits de valeurs / qualité empêchée : https://www.inrs.fr/risques/stress/exposition-risques-facteurs-stress
- Schaufeli et al., Burnout Assessment Tool : https://pmc.ncbi.nlm.nih.gov/articles/PMC7766078/

Les références justifient l'intérêt des dimensions. **Elles ne valident ni les formulations originales de Bull-Out ni ses seuils.**

## Les quinze formulations modifiées

| Item | Ancienne difficulté | Formulation v2 (résumé de la décision) |
|---|---|---|
| A2 | Soirée et week-end amalgamés | Épuisement persistant après les périodes habituelles de repos |
| B1 | Supposait se détacher *pour se protéger* | Indifférence actuelle à des tâches auparavant importantes |
| B2 | Mélangeait cynisme et utilité | Amertume ou cynisme à propos du travail |
| C2 | Énonçait une baisse de qualité comme un constat objectivé | Difficulté ressentie à atteindre la qualité attendue |
| C6 | « Je ne me reconnais plus », concept trop vague | Effort supplémentaire pour obtenir un résultat satisfaisant |
| D2 | Urgences et interruptions agrégées | Interruptions qui entravent les tâches prioritaires |
| D5 | Exigences émotionnelles très abstraites | Gestion répétée d'émotions difficiles dans les échanges professionnels |
| E6 | Équité globale indéfinie | Équité de répartition des tâches et responsabilités |
| F2 | Attribuait immédiatement le sommeil au travail | Sommeil perturbé ou non réparateur, origine à préciser |
| F4 | Attribuait immédiatement les symptômes physiques au travail | Symptômes physiques inhabituels ou aggravés, origine non présumée |
| F5 | Mélangeait alcool, drogues, écrans, nourriture et médicaments | Consommations accrues pour tenir/dormir : alcool, substances ou médicaments hors prescription |
| F6 | « Erreurs liées à la fatigue » préjugeait la cause | Erreurs, oublis ou quasi-accidents inhabituels |
| G6 | « Savoir dire non » était présenté comme trait personnel protecteur | Arbitrage réellement possible face à une charge ou un délai irréaliste |
| R3 | Mélangeait stabilité et changement imposé | Sécurité perçue concernant la continuité d'emploi |
| R6 | « Penser au travail dès le réveil » pouvait être normal | Préoccupations professionnelles au réveil vécues comme pesantes |

**Limites encore présentes :** F reste hétérogène (récupération, sommeil, symptômes, consommations, incidents). La partie C rassemble efficacité et sens. Les niveaux A–F restent des conventions non étalonnées et les regroupements de profils des heuristiques. Les formulations doivent être testées auprès de personnes et ne deviennent pas des items validés parce qu'elles sont plus compréhensibles.

## Quatre nouveaux repères T, hors score

| Code | Question | Options / interprétation |
|---|---|---|
| T1 | Depuis quand les difficultés ont-elles commencé ? | Pas de difficulté ; moins d'un mois ; 1–3 mois ; 3–12 mois ; plus d'un an ; incertain |
| T2 | Quelle est leur évolution récente ? | Diminution ; stable ; augmentation ; fluctuation ; incertain ; pas de difficulté |
| T3 | Que constate la personne lorsqu'elle s'éloigne du travail ? | Non observé ; nettement mieux ; un peu mieux ; identique ; plus difficile ; pas de difficulté |
| T4 | À quelle fréquence la qualité de travail jugée nécessaire a-t-elle été empêchée ? | Échelle de fréquence 0–4 sur quatre semaines |

Ces questions sont **des informations descriptives, pas une échelle**. Elles ne sont ni additionnées entre elles, ni introduites dans A–F, ni transformées en probabilité de burn-out. T4 peut déclencher une suggestion de documenter un exemple de qualité empêchée et de demander un arbitrage. T1–T3 enrichissent la synthèse et les annexes, sans déduction causale à partir de la seule variation pendant les congés.

**Total du parcours : 75 emplacements de questions** : les 67 historiques, quatre repères T et quatre questions satiriques BS9–BS12 restaurées depuis l’original à 12 questions. Les douze questions BS peuvent être **passées en bloc** ; en ce cas elles ne produisent ni pourcentage ni profil. Le chemin reste fonctionnel et le formulaire garde sa progression.

## Moteur et restitution

- La sécurité est uniquement déclenchée par les réponses aux **trois questions dédiées**, pas par un total arbitraire. L'urgence vitale n'est pas inférée d'une simple difficulté de fonctionnement.
- Les actions D/E peuvent être déclenchées sur un **item fréquent isolé**, même lorsque le total de la section est inférieur au seuil de commentaire.
- La qualité empêchée (T4 ≥3) entraîne une action spécifique, sans être assimilée à un diagnostic ou à une preuve objective.
- La synthèse distingue **manifestations**, **conditions de travail**, **ressources**, **chronologie** et **sécurité**.
- Les plans à 72 heures et à deux semaines sont reliés aux réponses saillantes et suivent des **faits, décisions datées et changements observés**, pas l'évolution d'un score total.
- Une réponse de harcèlement ou de peur de parler n'oriente pas automatiquement la personne vers son manager.
- Le document « Fiche travail » ne reprend que les expositions professionnelles D/E et la qualité empêchée T4. Il ne reprend pas les réponses de santé, le contexte personnel, les alertes ou les consommations.
- Le bullshitomètre est satirique et facultatif. S'il a été passé, le rapport indique explicitement **non renseigné**. Les surnoms satiriques restent disponibles, même si des difficultés de santé ressortent : ils sont clairement identifiés comme humour, repliables par la personne et ne remplacent jamais l’orientation médicale.

## Compatibilité des anciennes sauvegardes

Format `bull-out-progression-8`, champs explicites `versionQuestions: "2026-11-v2"` et `versionBullshitometre: "2026-11-bs-v2"`. Les anciens fichiers v7 sont repris sans réaffecter BS1–BS8 ; si la pause satirique avait été passée, les quatre nouvelles questions conservent ce choix.

Les fichiers des versions précédentes peuvent être repris. Pour les quinze questions reformulées, **la réponse ancienne est écartée** au lieu d'être présentée comme réponse à une nouvelle question. Les autres réponses sont conservées. Les nouveaux repères T doivent être remplis. La sauvegarde continue d'exclure les trois réponses d'alerte.

Il est interdit de traiter un changement brut entre score v1 et score v2 comme une évolution de santé : **les questions ont changé**. Cela s'applique aussi au carnet de suivi, qui propose de documenter des observations concrètes.

## Vérification

La branche contient une suite Node dans `tests/mesures-rapport.test.cjs`, exécutée automatiquement par `.github/workflows/verification.yml`. Elle comporte **48 cas déclarés (plus les cas paramétrés)**, dont une vérification de l'exécution intégrale du moteur avec 71 réponses et avec le bullshitomètre renseigné ou passé. Le workflow vérifie aussi la syntaxe du moteur et des modules du rapport et du parcours. Ajouter lors de la recette :

1. Parcours complet sur téléphone et ordinateur, clavier sur les options T de six réponses et bouton de saut BS.
2. Sauvegarde à mi-parcours en v7, reprise d'une vraie sauvegarde v6, confirmation que seuls les quinze items changés sont redemandés.
3. BS complet, BS passé, BS repris après saut : aucun faux pourcentage, aucun formulaire bloqué sans explication.
4. Cas opposés : expositions fortes sans manifestations ; santé dégradée sans forte exposition ; qualité empêchée isolée ; amélioration pendant les congés sans preuve causale ; peur de parler ; signal de sécurité.
5. PDF Essentiel, Complet et Fiche travail : inspection de la pagination et des données effectivement imprimées.

**Statut scientifique : questions originales et règles internes, non validées psychométriquement.** Le prochain changement de construit ou de seuil doit être accompagné d'un protocole de compréhension des questions et de validation distinct des tests de code.
