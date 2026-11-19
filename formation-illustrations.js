// Schémas pédagogiques. Les légendes décrivent aussi les relations représentées.
export const illustrations = [
  {
    titre: "Deux vendredis qui se ressemblent, deux suites différentes",
    legende: "Schéma fictif. Les lignes relient les observations du récit. Leur hauteur illustre la fatigue ressentie, sans échelle clinique.",
    description: "Vendredi, les deux lignes partent du même niveau. Celle de Léa descend dès lundi. Celle de Sam reste élevée trois semaines plus tard.",
    hauteur: 160,
    dessin: `
      <text x="8" y="18" class="">Fatigue ressentie</text>
      <path d="M28 40V125H288" class="axis"/>
      <path d="M30 52 Q96 100 145 104 T283 113" />
      <path d="M30 52 Q94 60 145 57 T283 54" class="alt"/>
      <text x="294" y="60" class="">Sam</text>
      <text x="294" y="119" class="">Léa</text>
      <text x="16" y="150" class="">Vendredi</text>
      <text x="119" y="150" class="">Lundi</text>
      <text x="220" y="150" class="">Trois semaines</text>`
  },
  {
    titre: "Trois indices dans la journée de Sam",
    legende: "Se sentir vidé renseigne sur l’énergie. Éviter un appel renseigne sur la relation au travail. Pour savoir comment Sam juge son efficacité, il faut le lui demander.",
    description: "Une batterie accompagne la fatigue, un téléphone le retrait relationnel et une note relue la question de l’efficacité ressentie.",
    hauteur: 164,
    dessin: `
      <rect x="22" y="16" width="42" height="25" rx="3" />
      <path d="M65 24h5v10h-5 M28 32h8" />
      <text x="90" y="35" class="">« Je termine vidé. »</text>
      <path d="M22 70q19 -16 41 0l-5 8 -11 -5 1 -5q-6 -2 -12 0l1 5 -10 5z" />
      <text x="90" y="76" class="">« Je laisse sonner. »</text>
      <rect x="28" y="108" width="28" height="37" rx="3" />
      <path d="M33 118h17m-17 7h15m-15 7h10" />
      <text x="90" y="124" class="">« Je relis trois fois. »</text>
      <text x="90" y="147" class="small">Que pense-t-il du résultat ?</text>`
  },
  {
    titre: "Une matinée, deux façons de travailler",
    legende: "Chaque rupture représente un appel fictif. Le relais libère une plage continue. Il reste à vérifier qui répond aux appels et qui arbitre les deux dossiers urgents.",
    description: "Cinq plages de travail séparées par quatre appels occupent la première ligne. Une seule plage continue occupe la deuxième.",
    hauteur: 156,
    dessin: `
      <text x="12" y="22" class="">Sans relais</text>
      <rect x="16" y="32" width="55" height="17" rx="3" class="solid"/>
      <rect x="85" y="32" width="44" height="17" rx="3" class="solid"/>
      <rect x="143" y="32" width="72" height="17" rx="3" class="solid"/>
      <rect x="230" y="32" width="34" height="17" rx="3" class="solid"/>
      <rect x="279" y="32" width="61" height="17" rx="3" class="solid"/>
      <path d="M77 27v28" class="alt"/>
      <path d="M136 27v28" class="alt"/>
      <path d="M222 27v28" class="alt"/>
      <path d="M272 27v28" class="alt"/>
      <text x="12" y="88" class="">Avec relais des appels</text>
      <rect x="16" y="99" width="324" height="17" rx="3" class="solid"/>
      <text x="12" y="143" class="">9 h</text>
      <text x="306" y="143" class="">11 h</text>`
  },
  {
    titre: "Deux colonnes dans le bilan de Lina",
    legende: "La ligne vide indique précisément où l’échange se déséquilibre. Accorder du temps de tutorat agirait sur la charge. Reconnaître ce tutorat dans l’évaluation agirait sur le retour reçu.",
    description: "Les dossiers clos figurent dans les deux colonnes. Le tutorat figure uniquement dans celle du travail fourni.",
    hauteur: 148,
    dessin: `
      <text x="12" y="25" class="">Travail fourni</text>
      <text x="197" y="25" class="">Travail reconnu</text>
      <path d="M12 39h336 M177 14v116" class="axis"/>
      <text x="12" y="70" class="">Dossiers clos</text>
      <text x="197" y="70" class="">Dossiers clos</text>
      <text x="12" y="116" class="">Tutorat</text>
      <path d="M197 116h132" class="alt"/>`
  },
  null,
  {
    titre: "Deux groupes peuvent partager la même valeur",
    legende: "Chaque point représente une personne fictive. La ligne verticale coupe les deux groupes au même résultat. Connaître ce résultat seul laisse donc plusieurs explications possibles.",
    description: "Deux rangées de points se recouvrent. Une verticale passe par un membre de chaque groupe au même résultat.",
    hauteur: 157,
    dessin: `
      <text x="10" y="24" class="">Groupe A</text>
      <text x="10" y="86" class="">Groupe B</text>
      <circle cx="50" cy="44" r="5" class="solid"/>
      <circle cx="77" cy="44" r="5" class="solid"/>
      <circle cx="99" cy="44" r="5" class="solid"/>
      <circle cx="130" cy="44" r="5" class="solid"/>
      <circle cx="158" cy="44" r="5" class="solid"/>
      <circle cx="186" cy="44" r="5" class="solid"/>
      <circle cx="221" cy="44" r="5" class="solid"/>
      <rect x="95" y="98" width="8" height="8" rx="3" />
      <rect x="141" y="98" width="8" height="8" rx="3" />
      <rect x="182" y="98" width="8" height="8" rx="3" />
      <rect x="207" y="98" width="8" height="8" rx="3" />
      <rect x="229" y="98" width="8" height="8" rx="3" />
      <rect x="260" y="98" width="8" height="8" rx="3" />
      <rect x="287" y="98" width="8" height="8" rx="3" />
      <path d="M186 28V118" class="alt"/>
      <path d="M20 127h288l-7 -4m7 4 -7 4" class="axis"/>
      <text x="78" y="152" class="small">Valeur du dosage →</text>`
  },
  {
    titre: "Deux profils, un total identique",
    legende: "Exemple de calcul. Les quatre autres dimensions valent zéro. Le total de 24/144 invite à deux conversations différentes selon la dimension qui contribue le plus.",
    description: "Profil A : épuisement 18 et exigences 6 sur 24. Profil B : épuisement 6 et exigences 18 sur 24.",
    hauteur: 184,
    dessin: `
      <text x="10" y="19" class="">Profil A</text>
      <text x="12" y="47" class="small">Épuisement</text>
      <text x="12" y="70" class="small">Exigences</text>
      <rect x="125" y="33" width="135" height="15" rx="3" class="solid"/>
      <rect x="125" y="56" width="45" height="15" rx="3" />
      <text x="270" y="47" class="small">18/24</text>
      <text x="180" y="70" class="small">6/24</text>
      <text x="10" y="111" class="">Profil B</text>
      <text x="12" y="139" class="small">Épuisement</text>
      <text x="12" y="162" class="small">Exigences</text>
      <rect x="125" y="125" width="45" height="15" rx="3" class="solid"/>
      <rect x="125" y="148" width="135" height="15" rx="3" />
      <text x="180" y="139" class="small">6/24</text>
      <text x="270" y="162" class="small">18/24</text>`
  },
  {
    titre: "Deux urgences pour le même vendredi",
    legende: "Rendre le choix visible permet de négocier un délai précis. Au point de suivi, on vérifie aussi si le report a déplacé la surcharge vers quelqu’un d’autre.",
    description: "Deux dossiers sont prévus vendredi. Après arbitrage, A reste vendredi et B est reporté à lundi.",
    hauteur: 145,
    dessin: `
      <text x="12" y="22" class="">Avant arbitrage</text>
      <text x="200" y="22" class="">Après arbitrage</text>
      <path d="M12 36h336" class="axis"/>
      <text x="12" y="70" class="">A · vendredi</text>
      <text x="12" y="117" class="">B · vendredi</text>
      <path d="M126 64h48l-7 -5m7 5 -7 5" />
      <path d="M126 110h48l-7 -5m7 5 -7 5" />
      <text x="200" y="70" class="">A · vendredi</text>
      <text x="200" y="117" class="">B · lundi</text>`
  },
  {
    titre: "Une reprise, trois décisions différentes",
    legende: "Sam peut discuter de sa santé en consultation, des adaptations avec la médecine du travail et des dossiers à reprendre avec son responsable. Chaque échange a un objet précis.",
    description: "Trois branches relient la reprise aux soins par le médecin traitant, aux aménagements avec le médecin du travail et aux priorités avec le responsable.",
    hauteur: 173,
    dessin: `
      <text x="10" y="90" class="">Reprise</text>
      <path d="M83 84h18v-57h22 M101 84h22 M101 84v55h22" />
      <text x="137" y="31" class="">Médecin traitant</text>
      <text x="137" y="51" class="small">Évaluer la santé</text>
      <text x="137" y="87" class="">Médecin du travail</text>
      <text x="137" y="107" class="small">Proposer un aménagement</text>
      <text x="137" y="143" class="">Responsable</text>
      <text x="137" y="163" class="small">Arbitrer les dossiers</text>`
  }
];
