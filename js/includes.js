(function () {
  // Detect if we're on GitHub Pages (repo path present) or running locally.
  const parts = location.pathname.split("/").filter(Boolean);
  const repoIdx = parts.indexOf("hernandez-paint-repair");
  const ON_GHPAGES = repoIdx >= 0;
  const BASE = ON_GHPAGES ? "/" + parts.slice(0, repoIdx + 1).join("/") : ""; // "/hernandez-paint-repair" on GH Pages, "" locally

  // Try multiple paths to find partials (works from root and subpages)
  async function fetchFirst(paths) {
    for (const p of paths) {
      try {
        const res = await fetch(p, { cache: "no-cache" });
        if (res.ok) return res.text();
      } catch (_) {}
    }
    throw new Error("Could not load partial from: " + paths.join(", "));
  }

  async function inject(id, partialRel) {
    const host = document.getElementById(id);
    if (!host) return;

    // Candidate locations for partials
    const candidates = ON_GHPAGES
      ? [BASE + partialRel] // GH Pages: always base-relative
      : [
          partialRel,               // "/partials/header.html" (if Live Server serves from project root)
          "." + partialRel,         // "./partials/header.html"
          ".." + partialRel,        // "../partials/header.html"
          "../.." + partialRel      // "../../partials/header.html"
        ];

    const html = await fetchFirst(candidates);
    host.innerHTML = html;

    fixLinks(host);
  }

  // Normalize links inside the injected header/footer so they work everywhere
  function fixLinks(scope) {
    const REPO_PREFIX = "/hernandez-paint-repair/";

    // Compute relative prefix for local subpages: "", "../", "../../", etc.
    let relPrefix = "";
    if (!ON_GHPAGES) {
      // depth = number of path segments under the project root (e.g., "services" -> depth 1)
      const depth = parts.length; // Live Server usually serves at "/", so parts is like ["services"] on /services/
      relPrefix = depth > 0 ? "../".repeat(depth) : "";
    }

    scope.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return;

      // Case 1: Links already start with the repo prefix (your header/footer)
      if (href.startsWith(REPO_PREFIX)) {
        if (ON_GHPAGES) {
          // Keep as-is on GH Pages
          return;
        } else {
          // Local: convert "/hernandez-paint-repair/path" -> relative "path" with proper "../"
          const stripped = href.slice(REPO_PREFIX.length);
          a.setAttribute("href", relPrefix + stripped);
          return;
        }
      }

      // Case 2: Plain relative links inside partial (e.g., "services/")
      if (ON_GHPAGES) {
        // Make them base-relative on GH Pages
        a.setAttribute("href", (BASE.endsWith("/") ? BASE : BASE + "/") + href.replace(/^\.?\//, ""));
      } else {
        // Local: ensure they are relative to current page depth
        // If href starts with "/", strip it
        a.setAttribute("href", href.replace(/^\//, ""));
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    inject("site-header", "/partials/header.html");
    inject("site-footer", "/partials/footer.html");
  });
})();
