# Bull-Out · prévention burn-out sans bullshit

Site éducatif de prévention du burn-out : une formation en dix chapitres, un questionnaire de 86 questions et un rapport personnel. Tout se calcule dans le navigateur : rien n'est envoyé.
En ligne : [bullout.ddlab.fr](https://bullout.ddlab.fr) (l'ancienne adresse bull-out.netlify.app reste active).

Développé avec deux psys, et en discussion avec un juge aux prud'hommes. Ce n'est pas un outil de diagnostic, et le questionnaire n'est pas validé scientifiquement : voir [Méthode et limites](methode.html).

## Le parcours

1. **La formation** (`test.html#formation`) : dix chapitres avec Sam en fil rouge, un exercice par chapitre, une synthèse des trois modèles après le chapitre 4, une synthèse finale, un test final et un diplôme. À la fin de chaque chapitre, une pièce du schéma du rapport se pose.
2. **Le questionnaire** (`test.html#questionnaire`) : six parties notées A à F (0 à 24), puis des parties hors score (retour Siegrist, quatre repères RPS, bullshitomètre et réaction à l'humour, appuis, durée et évolution, contexte, sécurité).
3. **Le rapport** : feu et trois cadrans, schéma (le travail, toi, ce qui se voit), lecture des trois modèles, plan d'action, interlocuteurs, pièces détaillées, annexes. PDF essentiel, complet, ou fiche travail sans données de santé.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : slogan, animation de Sam, les trois modèles, le schéma du rapport |
| `test.html`, `parcours.js`, `formation-contenu.js`, `formation-illustrations.js`, `formation.css`, `diplome.js` | Formation, questionnaire, diplôme |
| `script.js`, `bullshitometre-data.js` | Questions, calculs, profils, actions, interlocuteurs, sauvegardes |
| `rapport.js`, `rapport.css` | Le rapport et ses PDF |
| `agir.html`, `methode.html`, `comprendre.html`, `presentation.html`, `formation.html` | Pages d'appui |
| `questionnaire decision.html`, `questionnaire_bullshit_job_satirique_html.html` | Deux questionnaires satiriques autonomes |
| `managers.html` | Ancienne page, renvoie vers les chapitres de la formation |
| `styles.css`, `charte.css`, `fonts/` | Charte DD Lab (sapin, crème, anis, orange ; Poppins et Inter) |
| `worker.js`, `wrangler.jsonc` | Worker Cloudflare `bullout` : sert la branche `main` (cache 5 minutes) |
| `backups/archive-v1/` | Première version du site, gardée pour mémoire (non servie en ligne) |
| `docs/refonte-bullout/` | Journal des décisions et notes de refonte |

## Vérifier

```sh
node --test tests/mesures-rapport.test.cjs        # calculs, rapport, formation : sans navigateur
npm i --no-save --no-package-lock playwright && node tests/generer-pdf-exemple.mjs   # PDF fictifs
```

Les deux tournent dans GitHub Actions à chaque PR. Toute fusion dans `main` part en ligne en 5 minutes environ.
