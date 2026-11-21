// Bullshitomètre Bull-Out, version 3 (13 questions).
// Les chutes satiriques du test d'origine sont gardées ; chaque question porte sur un fait des 4 dernières semaines.
// Option 5 « Pas concerné·e » : w = null, la question sort du calcul (ni score, ni maximum).
// BS13 couvre les tâches « déraisonnables » (qui ne devraient pas être les tiennes), l'autre moitié des tâches illégitimes (Semmer et al., 2015).
// Les poids restent des conventions internes : l'indice alimente une famille de la jauge « Ton travail » (voir absurde.js), sans prétention psychométrique.
// Les réponses des versions précédentes ne sont pas réutilisées (les questions ont changé de sens) : voir parcours.js.
window.BULLOUT_BS = {
  "dims": [
    [
      "meeting",
      "Réunionite"
    ],
    [
      "dashboard",
      "Dashboardologie"
    ],
    [
      "ghost",
      "Contribution fantôme"
    ],
    [
      "notmine",
      "Pas ton boulot"
    ],
    [
      "absurd",
      "Absurdité globale"
    ]
  ],
  "questions": [
    {
      "text": "Ce que tu as livré ces dernières semaines, quelqu’un s’en est servi ?",
      "sub": "Éviter une catastrophe compte. Transférer un mail, non.",
      "options": [
        {
          "text": "Oui, et j’ai vu la personne s’en servir. Spécimen rare, mais documenté.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Indirectement : ça a évité un problème, donc personne ne l’a remarqué.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "Il est parti « pour info » vers une liste de diffusion de 40 personnes.",
          "w": {
            "absurd": 3,
            "meeting": 1,
            "dashboard": 0,
            "ghost": 3,
            "notmine": 0
          }
        },
        {
          "text": "Il dort dans un dossier nommé vFinale_DEF_v3_OK_relu.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 1,
            "ghost": 5,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Tes réunions de ces 4 dernières semaines ont surtout débouché sur :",
      "sub": "Un compte rendu qui fixe la date de la prochaine réunion n’est pas une décision.",
      "options": [
        {
          "text": "Des décisions, avec un nom et une date à côté.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Des infos utiles, entre deux tours de table légendaires.",
          "w": {
            "absurd": 1,
            "meeting": 2,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "« On se refait un point », avec un enthousiasme modéré.",
          "w": {
            "absurd": 3,
            "meeting": 4,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "Une réunion pour préparer la réunion qui décidera s’il faut se réunir.",
          "w": {
            "absurd": 5,
            "meeting": 6,
            "dashboard": 0,
            "ghost": 2,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Le dernier tableau de bord que tu as alimenté a changé quoi ?",
      "sub": "Pas de tableau de bord ? Choisis « pas concerné·e » et savoure ta chance.",
      "options": [
        {
          "text": "Une décision : on a corrigé quelque chose grâce à lui.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Il a aidé à comprendre ; la décision est en route.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 1,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "On l’a regardé. Longtemps. On a surtout parlé des couleurs.",
          "w": {
            "absurd": 3,
            "meeting": 1,
            "dashboard": 4,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Rien, mais il est passé du vert pomme au vert sapin : grosse semaine.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 6,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Après le dernier « il faut qu’on se cale », il s’est passé quoi ?",
      "sub": "Indice : regarde s’il y a eu un responsable.",
      "options": [
        {
          "text": "Un besoin clarifié, un responsable, une échéance. Rideau.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Une bonne discussion, puis une décision repoussée d’une semaine.",
          "w": {
            "absurd": 1,
            "meeting": 2,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Un groupe Teams, mort de solitude au bout de 8 jours.",
          "w": {
            "absurd": 3,
            "meeting": 3,
            "dashboard": 0,
            "ghost": 3,
            "notmine": 0
          }
        },
        {
          "text": "On s’est recalés trois fois. Le calendrier dirige désormais l’équipe.",
          "w": {
            "absurd": 5,
            "meeting": 5,
            "dashboard": 0,
            "ghost": 2,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Quand tu cherches ce que ton travail a changé, tu trouves :",
      "sub": "L’impact indirect compte. Un risque évité aussi, même s’il ne fait pas de bruit.",
      "options": [
        {
          "text": "Une décision, un risque évité ou quelqu’un d’aidé. Je peux le nommer.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Un effet indirect mais réel : je prépare le terrain pour d’autres.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "Du brouillard : je transmets, puis plus de nouvelles.",
          "w": {
            "absurd": 3,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 4,
            "notmine": 0
          }
        },
        {
          "text": "Une case dans l’organigramme, très bien tenue.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 1,
            "ghost": 5,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Ce que tu livres (analyses, dossiers, comptes rendus), on en fait quoi ?",
      "sub": "Pas de commentaire ne veut pas dire pas lu. Les remarques sur la couleur des flèches, en revanche…",
      "options": [
        {
          "text": "On s’en sert, même si personne ne dit merci.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Une partie sert, le reste vit sa petite vie documentaire.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 2,
            "notmine": 0
          }
        },
        {
          "text": "On me fait surtout reprendre la mise en page.",
          "w": {
            "absurd": 3,
            "meeting": 0,
            "dashboard": 2,
            "ghost": 3,
            "notmine": 0
          }
        },
        {
          "text": "Ça part dans une grotte SharePoint, pour une vie monastique sans lecteur.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 1,
            "ghost": 6,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Dans tes projets à plusieurs équipes, qui tranche à la fin ?",
      "sub": "Coordonner, c’est utile. Consulter tout le monde pour ne fâcher personne, c’est autre chose.",
      "options": [
        {
          "text": "C’est clair : chacun contribue, quelqu’un arbitre.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "C’est clair… après deux réunions de clarification.",
          "w": {
            "absurd": 1,
            "meeting": 2,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Tout le monde valide, personne ne décide.",
          "w": {
            "absurd": 4,
            "meeting": 4,
            "dashboard": 0,
            "ghost": 3,
            "notmine": 0
          }
        },
        {
          "text": "La décision est une créature mythologique : tout le monde en parle, personne ne l’a vue.",
          "w": {
            "absurd": 5,
            "meeting": 4,
            "dashboard": 0,
            "ghost": 4,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "À la fin d’une semaine chargée, peux-tu citer une chose utile que tu as faite ?",
      "sub": "La question n’est pas « es-tu épuisé·e ». C’est « à quoi ça a servi ».",
      "options": [
        {
          "text": "Oui : j’ai fait avancer ou sécurisé un vrai sujet.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Oui, mais il faut la chercher sous la pile administrative.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "J’ai beaucoup fait tourner la machine. Sur quoi, c’est flou.",
          "w": {
            "absurd": 4,
            "meeting": 2,
            "dashboard": 0,
            "ghost": 4,
            "notmine": 0
          }
        },
        {
          "text": "J’ai participé à une simulation sociale appelée « organisation ».",
          "w": {
            "absurd": 6,
            "meeting": 3,
            "dashboard": 2,
            "ghost": 5,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "La dernière demande « pour demain », c’était pour quoi faire ?",
      "sub": "Une vraie urgence, ça existe. Une urgence sans raison, aussi. Le dieu Template, lui, a toujours soif.",
      "options": [
        {
          "text": "Un vrai besoin, une vraie échéance. J’ai compris pourquoi.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Je ne savais pas, j’ai demandé, on m’a répondu.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "Le délai est arrivé bien avant le pourquoi.",
          "w": {
            "absurd": 3,
            "meeting": 0,
            "dashboard": 1,
            "ghost": 3,
            "notmine": 0
          }
        },
        {
          "text": "Elle a été ouverte trois semaines plus tard. Ou jamais. Le mystère reste entier.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 2,
            "ghost": 4,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "La demande la plus typique que tu reçois ressemble à :",
      "sub": "Choisis celle qui te donne le plus envie de regarder par la fenêtre.",
      "options": [
        {
          "text": "Un problème défini, des critères, une échéance.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "« Un truc simple, mais complet », et on finit par clarifier.",
          "w": {
            "absurd": 2,
            "meeting": 0,
            "dashboard": 1,
            "ghost": 1,
            "notmine": 0
          }
        },
        {
          "text": "« Synthétique mais exhaustif, et pas trop chargé », sans plus de précision.",
          "w": {
            "absurd": 4,
            "meeting": 0,
            "dashboard": 2,
            "ghost": 3,
            "notmine": 0
          }
        },
        {
          "text": "« Une analyse robuste à partir d’informations absentes. Pour hier. »",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 3,
            "ghost": 4,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Ces dernières semaines, ton agenda t’a laissé du temps pour faire le travail ?",
      "sub": "Le calendrier est parfois le scanner cérébral de l’organisation.",
      "options": [
        {
          "text": "Oui : des plages pour avancer, quelques points utiles.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "À peu près, en regroupant les réunions comme je peux.",
          "w": {
            "absurd": 1,
            "meeting": 2,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Le vrai travail commence quand le calendrier s’endort.",
          "w": {
            "absurd": 3,
            "meeting": 5,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Pour finir le travail, il faudrait sécher le point « suivi du travail ».",
          "w": {
            "absurd": 5,
            "meeting": 6,
            "dashboard": 1,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Quand un indicateur ne sert plus à rien, que devient-il ?",
      "sub": "Un KPI peut éclairer le réel. Il peut aussi le maquiller avec autorité.",
      "options": [
        {
          "text": "On le supprime. Paix à son âme.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Il traîne un moment, puis quelqu’un finit par le retirer.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 2,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "On continue de le remplir, au cas où quelqu’un le regarderait.",
          "w": {
            "absurd": 4,
            "meeting": 0,
            "dashboard": 5,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Il se reproduit : il a désormais deux petits KPI qui lui ressemblent.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 6,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    },
    {
      "text": "Ces dernières semaines, on t’a confié des tâches qui ne devraient pas être les tiennes ?",
      "sub": "Aider un collègue, c’est normal. Devenir le service informatique officieux, moins.",
      "options": [
        {
          "text": "Non, je fais mon métier.",
          "w": {
            "absurd": 0,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 0
          }
        },
        {
          "text": "Parfois, pour dépanner, et c’est réciproque.",
          "w": {
            "absurd": 1,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 0,
            "notmine": 2
          }
        },
        {
          "text": "Souvent : je fais aussi le travail d’un poste jamais remplacé.",
          "w": {
            "absurd": 3,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 5
          }
        },
        {
          "text": "Je suis désormais aussi standardiste, archiviste et responsable de la machine à café.",
          "w": {
            "absurd": 5,
            "meeting": 0,
            "dashboard": 0,
            "ghost": 1,
            "notmine": 6
          }
        },
        {
          "text": "Pas concerné·e : ça n’existe pas dans mon travail.",
          "w": null
        }
      ]
    }
  ],
  "profils": [
    {
      "titre": "anomalie productive dans un environnement encore rationnel",
      "texte": "Ton bullshitomètre reste bas. Tu sembles encore travailler sur des objets ayant un lien détectable avec le réel. Ton risque principal n’est pas l’absurdité, mais la jalousie passive de collègues coincés en pré-comité de pré-alignement.",
      "survie": "Protège tes plages de travail. Évite de signaler trop fort que ton poste a encore une utilité : cela pourrait attirer une task force.",
      "phrase": "Je propose qu’on garde le livrable simple : décision, responsable, échéance."
    },
    {
      "titre": "cadre semi-utile en zone de brouillard organisationnel",
      "texte": "Ton poste alterne entre utilité réelle et cérémonies administratives. Tu as encore un impact, mais il est parfois emballé dans une couche de slides, de comités et de “on se redit”.",
      "survie": "Applique le tri froid : ce qui change une décision mérite du temps ; ce qui rassure un organigramme mérite une version courte.",
      "phrase": "Pour éviter de produire un objet décoratif, quelle décision cette slide doit-elle permettre ?"
    },
    {
      "titre": "architecte certifié de l’alignement circulaire",
      "texte": "Ton quotidien contient une densité élevée d’objets professionnels à utilité indéterminée. Tu ne fais pas rien : tu transformes du flou en artefacts présentables. C’est une forme d’art, mais avec plus de fichiers vFinal_v8.",
      "survie": "Réduis l’investissement émotionnel. Ton poste est peut-être une machine à absorber l’anxiété managériale ; ne confonds pas urgence sociale et urgence réelle.",
      "phrase": "On peut le faire, mais je propose de distinguer le besoin de décision du besoin de réassurance."
    },
    {
      "titre": "grand prêtre du bullshit job métastable",
      "texte": "Ton indice atteint un niveau où le travail devient une performance sociale sophistiquée. Les réunions engendrent des réunions, les KPI contemplent d’autres KPI, et ton impact réel se cache probablement dans une annexe non ouverte.",
      "survie": "Détachement méthodique. Fais le minimum utile, livre proprement, protège ton énergie, et investis ton cerveau dans les sujets qui ont une causalité réelle.",
      "phrase": "Je peux produire ça, mais sans clarification de l’usage, on risque surtout de fabriquer un artefact de confort."
    }
  ],
  "version": "2026-11-bs-v3",
  "consigne": "Pense à tes 4 dernières semaines. Choisis ce qui arrive le plus souvent, pas la vanne la plus drôle (on sait, c’est dur).",
  "origin": "Grand Test du Bullshit Job de Bull-Out, réécrit en V3 (13 questions) : mêmes chutes, questions ancrées sur 4 semaines, prévention et coordination non pénalisées, BS13 sur les tâches déraisonnables (Semmer, tâches illégitimes)."
};
