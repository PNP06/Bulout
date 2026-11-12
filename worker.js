// Bull-Out sur bullout.ddlab.fr : Worker Cloudflare du compte DD Lab.
// Il sert les fichiers du dépôt public PNP06/Bulout (branche main) directement depuis GitHub,
// sans passer par Netlify. Un push sur main est visible ici en 5 minutes au plus (cache).
// Netlify (bull-out.netlify.app) reste en ligne pour les liens déjà partagés.
// Le site ne reçoit et ne conserve aucune réponse : tout se calcule dans le navigateur.
const REPO = "https://raw.githubusercontent.com/PNP06/Bulout/main";
const CANONICAL = "bullout.ddlab.fr";
const ALIASES = ["bulout.ddlab.fr"];
const TTL = 300;
const HIDDEN = /^\/(\.|backups\/|archive v1\/|worker\.js$|wrangler\.jsonc$|readme)/i;
const TYPES = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
  woff2: "font/woff2",
  pdf: "application/pdf",
};
const SECURITY = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

async function fromRepo(path) {
  return fetch(REPO + path, { cf: { cacheTtl: TTL, cacheEverything: true } });
}

export default {
  async fetch(request) {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Méthode non autorisée", { status: 405, headers: { Allow: "GET, HEAD" } });
    }
    const url = new URL(request.url);
    if (ALIASES.includes(url.hostname)) {
      url.hostname = CANONICAL;
      return Response.redirect(url.toString(), 301);
    }
    let path = url.pathname;
    if (path.endsWith("/")) path += "index.html";
    if (HIDDEN.test(decodeURIComponent(path))) return notFound();

    let res = await fromRepo(path);
    let ext = (path.split("/").pop().match(/\.([a-z0-9]+)$/i) || [])[1];
    if (res.status === 404 && !ext) {
      res = await fromRepo(path + ".html");
      ext = "html";
    }
    if (!res.ok) return notFound();

    const headers = new Headers(SECURITY);
    headers.set("content-type", TYPES[(ext || "html").toLowerCase()] || "application/octet-stream");
    headers.set("cache-control", ext === "woff2" ? "public, max-age=86400" : `public, max-age=${TTL}`);
    return new Response(request.method === "HEAD" ? null : res.body, { status: 200, headers });
  },
};

function notFound() {
  const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page introuvable · Bull-Out</title><body style="font-family:system-ui;background:#f6efe2;color:#123a33;padding:3rem 1.5rem;max-width:40rem;margin:auto"><h1>Page introuvable</h1><p>Bull-Out · Prévention burn-out sans bullshit</p><p><a href="/" style="color:#b4512b">Retour à l'accueil</a></p></body></html>`;
  return new Response(html, { status: 404, headers: { "content-type": "text/html; charset=utf-8", ...SECURITY } });
}
