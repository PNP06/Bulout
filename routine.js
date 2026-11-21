// Feuillet personnel du rapport : une routine d'observation, pas une nouvelle mesure.
// Aucune donnée n'est envoyée ni stockée par ce module.
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export function produireRoutine({ travail, signe, appui, action, actionDetail }) {
  const repere = (titre, texte) => '<div><p class="k">' + titre + '</p><p>' + esc(texte) + '</p></div>';
  return `<header class="rp-etape-head rp-routine-head">
      <p class="rp-n">Ton rapport personnel · fiche à imprimer</p>
      <h2 tabindex="-1">Ta routine du lundi et du vendredi</h2>
      <p class="rp-question">Préparer une semaine tenable, puis voir ce qui a changé.</p>
      <p class="rp-intro">Cinq minutes deux fois par semaine. Pas besoin de te renoter : <b>observe le travail réel, ta récupération et une décision concrète</b>. Cette page s'appuie sur tes réponses initiales.</p>
    </header>
    <section class="rp-routine-reperes" aria-label="Points personnels de départ">
      ${repere("01 · Une situation de travail à observer", travail)}
      ${repere("02 · Une manifestation à regarder", signe)}
      ${repere("03 · Une ressource à préserver", appui)}
      <div><p class="k">04 · Une première piste d'action</p><p><b>${esc(action)}</b> — ${esc(actionDetail)}</p></div>
    </section>
    <div class="rp-routine-jours">
      <section class="rp-routine-jour" aria-label="Questions du lundi">
        <div class="rp-routine-jour-titre"><span class="rp-jour-badge">LUNDI</span><h3>Avant de commencer</h3></div>
        <ol><li><b>Exigences :</b> qu'est-ce qui risque de déborder cette semaine ?</li>
          <li><b>Ressources :</b> qu'est-ce qui m'aiderait réellement ?</li>
          <li><b>Arbitrage :</b> que faut-il retirer, reporter ou simplifier ?</li></ol>
        <div class="rp-routine-ligne"><b>Une demande à formuler :</b><span></span></div>
      </section>
      <section class="rp-routine-jour" aria-label="Questions du vendredi">
        <div class="rp-routine-jour-titre"><span class="rp-jour-badge">VENDREDI</span><h3>Avant de décrocher</h3></div>
        <ol><li><b>Travail :</b> une contrainte, un soutien, une décision ont-ils changé ?</li>
          <li><b>Récupération :</b> ai-je pu décrocher et me reposer ?</li>
          <li><b>Impacts :</b> plus de distance, de doutes ou de tensions hors travail ?</li></ol>
        <div class="rp-routine-ligne"><b>Un fait que je retiens :</b><span></span></div>
      </section>
    </div>
    <section class="rp-routine-traces" aria-labelledby="rp-routine-traces-titre">
      <h3 id="rp-routine-traces-titre">Quatre semaines, quatre traces — pas un score de plus.</h3>
      <table><thead><tr><th scope="col">Semaine</th><th scope="col">Qu'est-ce qui a changé, concrètement ?</th><th scope="col">Quelle action / décision pour la suite ?</th></tr></thead>
      <tbody>${[1,2,3,4].map(n => '<tr><th scope="row">' + n + '</th><td></td><td></td></tr>').join("")}</tbody></table>
    </section>
    <p class="rp-routine-limite"><b>Comment interpréter :</b> si une difficulté persiste, s'aggrave ou touche davantage ta vie, parle-en à un interlocuteur adapté et, si besoin, à un professionnel de santé. Une amélioration après une action ne démontre pas à elle seule son efficacité. Aucun résultat médical ne découle de cette routine.</p>`;
}
