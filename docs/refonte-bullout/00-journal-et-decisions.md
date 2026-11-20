# Bull-Out — journal de discussion et décisions de conception

**Date de synthèse : 20 novembre 2026**  
**Portée : échanges sur la refonte de Bull-Out ; aucun changement fonctionnel décidé.**  
**Dépôt : `PNP06/Bulout`, branche `main`.**  

Ce document vise à préserver **le raisonnement, les divergences et les questions ouvertes** pour que les prochaines itérations (humaines ou assistées par IA) ne recommencent pas à zéro. Il ne faut pas confondre une proposition émise, un accord provisoire et une décision validée.

## 1. Intention de départ confirmée par le porteur du projet

- Amener Bull-Out au niveau de qualité éditoriale, scientifique et pédagogique de Psytest / « méthode Papillon », sans dupliquer artificiellement le graphisme de ce dernier.
- Améliorer la pertinence des questions, la façon de calculer et d'interpréter les réponses, et la capacité du rapport à réellement aider un cadre ou un salarié qui s'interroge sur sa situation.
- Établir une **métaphore visuelle structurante et progressive** si elle rend l'ensemble plus intelligible, mais ne pas choisir une métaphore comme fin en soi.
- Conserver la franchise du ton et la vocation pédagogique ; éviter le diagnostic automatique et les prétentions psychométriques injustifiées.
- Examiner l'existant avant tout changement, comparer les propositions et ne pas modifier le site avant stabilisation du fond.

## 2. Premier cycle : critique du rapport et exploration des images (échanges Claude, 20/11/2026)

Document d'origine : *Bull-out : débat critique* (PDF de 12 pages fourni dans la conversation ; non inclus dans ce dépôt).

### 2.1 Critiques formulées

1. **Seuils non étalonnés** : découpage par quarts de l'échelle, pouvant déclencher un langage alarmiste.
2. **Fausse précision des chiffres** : « % de batterie » dérivé de A et F ; « perte de sens sur 24 » issue de deux items multipliés par six.
3. **Modèles non indépendants** : JD-R et Siegrist réutilisent des questions D/E ; divergences potentielles entre manque de ressources et ressources présentes.
4. **Bullshitomètre** : satire parfois inadaptée à un niveau d'épuisement important ; le modèle infère que l'humour protège sans le mesurer directement.
5. **Rapport trop long** : proposition d'une synthèse très courte et d'annexes.
6. **Défauts ponctuels** : incohérences textuelles, lien HTML dans le PDF, déploiement depuis `main` sans relecture.

**Corrections factuelles ultérieures** : les options de PDF court/long sont déjà présentes dans `rapport.js` et `rapport.css` ; la phrase selon laquelle « parfois partout » conduit à 13/24 est arithmétiquement incorrecte (six réponses « parfois » donnent 12/24). Ces corrections ne suppriment pas les problèmes de fond.

### 2.2 Quatre métaphores examinées dans ce cycle

- **Réservoir / baignoire** : flux qui vident, flux qui rechargent, voyants d'effet ; suggestion initiale de Claude.
- **Tableau de bord** : état immédiatement lisible, mais faiblesse pour montrer les mécanismes.
- **Arbre** : racines / sol / sève / feuillage ; représentation poétique, associations parfois artificielles.
- **Bateau prenant l'eau** : lisible pour l'urgence, mais anxiogène et pouvant donner le sentiment qu'il suffit de « pomper davantage ».

Claude a établi une liste de **quinze éléments** représentés par le rapport et tenté de faire entrer chaque élément dans les quatre métaphores (PDF p. 3–9). Ce travail a établi une contrainte de couverture, pas démontré la pertinence d'une nouvelle métaphore.

### 2.3 Différences avec Papillon

Ont été discutés : la progression en plusieurs étapes, le fil d'Ariane, un personnage fil rouge, l'image construite chapitre après chapitre, des options de rapport court et de partage, la confidentialité, l'harmonie entre formation et rapport.

**Statut à la fin de ce cycle** : analyse provisoirement acceptée comme base de débat ; **aucune métaphore choisie, aucun code à modifier**.

## 3. Deuxième cycle : analyse du dépôt avec ChatGPT (20/11/2026)

Inspection de `script.js`, `rapport.js`, `formation-contenu.js`, `parcours.js`, `bullshitometre-data.js`, `rapport.css`, `index.html` et de certains fichiers `Psytest`.

### 3.1 Constat partagé comme axe de travail, pas décision finale

Le questionnaire traite simultanément des manifestations, des conditions de travail, des ressources, de la récupération, de la perception d'utilité, du contexte, de la sécurité et des pistes d'action. Cette richesse n'est pas suffisamment hiérarchisée.

Le moteur utilise des seuils et des valeurs dérivées avec une précision qui dépasse ce que permet la mesure. Les modèles sont utiles comme cadres de lecture mais ne sont pas nécessairement des confirmations indépendantes, car ils se recoupent.

### 3.2 Nouvelles pistes proposées

- **Pont sous charge** : expliquer qu'un système peut encore fonctionner tout en étant soumis à des contraintes non soutenables. Limites : récupération personnelle, reconnaissance et sens difficiles à placer.
- **Traversée / chemin** : suivre une personne soumise à des charges, obstacles, ressources, pauses, perte de sens et actions. Limites : peut faire croire que le problème vient de la résistance du marcheur plutôt que des conditions imposées.
- **Conserver le schéma actuel** n'avait pas été examiné avec assez de sérieux comme option de référence : point à corriger.

Un premier dossier de cadrage et un comparateur HTML ont été produits, puis archivés ici :
- [Cadrage scientifique/UX v1](archives/cadrage-scientifique-ux-2026-11-20-v1.md)
- [Comparateur exploratoire de métaphores v1](archives/comparateur-metaphores-2026-11-20-v1.html)

Ces livrables **ne valent ni validation des hypothèses, ni décision de mise en production**.

## 4. Troisième cycle : recadrage du besoin par le porteur du projet (20/11/2026)

> « Je suis pas convaincu, au final, la proposition qui est actuellement dans Bull-Out dans l'exemple du rapport est peut-être la meilleure ? [...] Peut-être qu'il faudrait avant tout faire le point sur ce que l'on mesure. »

**Point de décision actuel :**

1. **Suspendre le remplacement du dessin.**
2. **Prendre le schéma actuel du rapport comme référence sérieuse**, au même niveau que les nouvelles idées. Il possède une architecture utile : ce qui sollicite / la personne ou l'état / ce qui se manifeste.
3. **Priorité immédiate : inventorier les construits, les questions, les calculs, les recouvrements et les inférences.**
4. Ce n'est qu'après cette cartographie qu'on pourra décider : conserver le visuel, l'améliorer localement, ou le remplacer.
5. **Ne pas retoucher le site, la formation, le questionnaire ou le rapport dans cette phase documentaire.**

Le mot « peut-être » est déterminant : l'ancien schéma **n'est pas validé comme résultat définitif**. Il est réhabilité comme hypothèse principale à challenger loyalement.

## 5. Les trois catégories à distinguer pour chaque élément du rapport

### A. Déclarations directes
Exemples : répondre « souvent » à une question d'épuisement ; déclarer une forte charge, une faible autonomie, des idées suicidaires, la présence d'un soutien.

### B. Indicateurs calculés
Exemples : somme A/24, score E inversé, effort moyen sur trois questions, sous-score C sur deux items, indice BS pondéré.

Ces chiffres reflètent des conventions de calcul ; ils ne sont pas automatiquement validés et ne doivent pas être présentés comme des grandeurs biologiques.

### C. Interprétations et hypothèses
Exemples : « l'humour te protège », « la charge explique ta fatigue », « les ressources compensent », « batterie restante 38 % », « profil d'épuisement installé ».

Pour chacune, préciser : sur quelles réponses elle repose, ce qu'elle suppose, la preuve disponible, les explications alternatives et l'action concrète qu'elle permet.

Le document [Inventaire des 67 questions, calculs et 15 éléments](inventaire-questions-mesures-calculs.md) donne le détail code → indicateur → visuel.

## 6. Questions ouvertes (pas des décisions)

1. **Objet primaire** : Bull-Out mesure-t-il les manifestations du burn-out, les facteurs RPS, le retentissement, ou s'agit-il d'une méthode d'exploration guidée multi-domaines ? L'architecture doit l'énoncer.
2. **Domaines de manifestation** : épuisement, distance, efficacité, sens, cognitif, émotionnel, retentissement doivent-ils être regroupés ou séparés ?
3. **Facteurs professionnels** : faut-il structurer la couverture selon les six familles INRS / Gollac en complément de JD-R et Siegrist ?
4. **Double emploi des questions** : existe-t-il une redondance utile ou des recomptages trompeurs ?
5. **Temporalité** : les quatre semaines suffisent-elles ? Faut-il distinguer durée, évolution, repos et exposition au travail ?
6. **Seuils et alertes** : quelles règles sont descriptives, lesquelles prétendent déclencher une orientation urgente, et sont-elles justifiables ?
7. **Sens et absurdité** : ne pas confondre travail jugé inutile, qualité empêchée, valeurs contrariées, cynisme et capacité à en rire.
8. **Priorisation des ajouts** : apporter une information qui change réellement l'interprétation sans aggraver la charge de réponse.
9. **Dessin** : conserver les zones, corriger la batterie et les traits, ou retenir une autre représentation ? Un test sur des profils fictifs et des cas opposés doit précéder le choix.

## 7. Critères pour la prochaine étape

Une **cartographie de mesure** doit pour chaque concept préciser :

- La définition du construit et son statut (manifestation, exposition, ressource, contexte, risque de sécurité, objectif d'action).
- Les questions exactes et leur temporalité, une par une.
- Le calcul, les inversions et les réutilisations.
- Le statut de la preuve (modèle de recherche reconnu / item maison / indicateur inventé / hypothèse).
- Le comportement en cas de réponses contradictoires ou de situations inhabituelles.
- L'usage du résultat dans le rapport et le dessin.
- Les risques de mauvaise interprétation et les propositions à tester.

**Interdiction méthodologique** : ne pas modifier automatiquement les seuils, ne pas ajouter des questions et ne pas refaire le visuel parce qu'une proposition paraît séduisante. Toute décision doit être fondée sur la fonction recherchée, les cas qu'elle éclaire et les limites assumées.

## 8. Portée de ce journal

Le dépôt GitHub est **public**. Ce journal consigne uniquement le travail de conception et de méthode. Il n'archive ni l'intégralité littérale des conversations personnelles, ni les données médicales ou privées de participants. Le PDF d'origine reste la pièce jointe à la conversation qui l'a fourni.

**État : documentation uniquement. Les arbitrages scientifiques et graphiques restent ouverts.**
