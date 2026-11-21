(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
const root = document.documentElement;
const CONTACT_EMAIL = "";   // add your email, e.g. "name@domain.com"
const LINKS = { linkedin: "", github: "", instagram: "", youtube: "" };   // add full profile URLs

/* ---------- Icons, tools strip and projects ---------- */
const svg = (p, f) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="${f ? "currentColor" : "none"}" stroke="${f ? "none" : "currentColor"}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC = {
  bars: '<path d="M7 20v-8M12 20V5M17 20v-5"/>', search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  tag: '<path d="M12 3l8 8-8 10-8-10z"/><circle cx="12" cy="10" r="1.5"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  chart: '<path d="M3 17l5-6 4 3 8-9M3 21h18"/>', net: '<circle cx="12" cy="12" r="3"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
  bing: '<path d="M8 4v13l4 3 6-4-5-2-2-5z"/>', s: '<path d="M17 7c-1-2-3-3-5-3-3 0-5 1.5-5 4s2 3 5 4 5 1.5 5 4-2 4-5 4c-2 0-4-1-5-3"/>',
  a: '<circle cx="10" cy="14" r="4"/><path d="M14 10v10"/>', cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 10c0-2 5-2 5 0s-5 2-5 4 5 2 5 0"/>', plus: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>',
  spark: '<path d="M12 3l2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13c0-1.5 1-2 2.2-2 1.5 0 2.3 1 2.3 2.5V17"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
  youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  github: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'
};
$$("[data-icon]").forEach(a => a.innerHTML = svg(IC[a.dataset.icon], a.dataset.icon === "github"));
/* Tool logos live in assets/tools/<file>.png (256x256, transparent). [name, fallback icon, accent colour, file name without .png] */
const TOOLS = [["Google Analytics 4", "bars", "#f9ab00", "ga4"], ["Search Console", "search", "#4285f4", "search-console"], ["Tag Manager", "tag", "#4e9bff", "tag-manager"], ["Microsoft Clarity", "eye", "#2f8cff", "clarity"], ["Looker Studio", "chart", "#8b5cf6", "looker-studio"], ["Screaming Frog", "net", "#5bbf3a", "screaming-frog"], ["Bing Webmaster", "bing", "#22d3ee", "bing-webmaster"], ["SEMrush", "s", "#ff7a2f", "semrush"], ["Ahrefs", "a", "#4d7cff", "ahrefs"]];
const row = TOOLS.map(([n, i, c, f]) => `<li class="tool" style="--k:${c}"><img src="assets/tools/${f}.png" alt="" width="40" height="40" decoding="async" data-ic="${i}"><span>${n}</span></li>`).join("");
$("#tool-track").innerHTML = row + row.replace(/<li /g, '<li aria-hidden="true" ');
/* If a logo file is missing, fall back to the line icon so the strip never shows a broken image. */
$("#tool-track").addEventListener("error", e => { const im = e.target; if (im.tagName !== "IMG") return; const t = document.createElement("template"); t.innerHTML = svg(IC[im.dataset.ic]); im.replaceWith(t.content.firstChild); }, true);

/* Editable project placeholders: title, industry, filter, icon, hue, background image name (assets/projects/<name>.jpg, 1200x600). Replace with verified details. */
const PROJECTS = [
["SaaS &amp; Technology SEO", "SaaS / Technology", "seo", "net", 220, "saas"], ["Preschool / Education SEO", "Education", "seo", "cap", 160, "education"],
["Wealth Management SEO", "Finance", "seo", "coin", 45, "finance"], ["Healthcare SEO", "Healthcare", "seo", "plus", 190, "healthcare"],
["Website Technical SEO Audits", "Technical SEO", "seo", "search", 260, "audit"], ["GA4 &amp; GSC Performance Dashboards", "Analytics", "analytics", "bars", 30, "analytics"],
["SEO Reporting &amp; Data Visualization", "Reporting", "analytics", "chart", 280, "reporting"], ["AI Search &amp; GEO Experiments", "GEO / AI Search", "ai", "spark", 300, "ai-search"]
];
$("#filters").innerHTML = [["all", "All projects"], ["seo", "SEO"], ["analytics", "Analytics"], ["ai", "AI Search"]].map(([k, l], i) => `<button data-f="${k}" aria-pressed="${!i}">${l}</button>`).join("");
$("#project-grid").innerHTML = PROJECTS.map(([t, i, c, ic, h, s], n) => `<article class="pcard card glass tilt" data-c="${c}" style="--hue:${h}"><div class="pv"><img src="assets/projects/${s}.jpg" alt="" width="1000" height="500" loading="lazy" decoding="async" onerror="this.remove()"><span class="pi">${svg(IC[ic])}</span></div><div class="pb"><div><h3>${t}</h3><p class="ind">${i}</p></div><p>[Add a short project overview]</p><div class="pm"><div><b>My responsibilities</b>[Add your role]</div><div><b>Tools used</b><span class="ph">Add tool</span><span class="ph">Add tool</span></div></div><p class="res">Results: add only verified results</p><button class="btn" data-n="${n}">View Case Study</button></div></article>`).join("");
$("#filters").onclick = e => { const b = e.target.closest("button"); if (!b) return; $$("#filters button").forEach(x => x.setAttribute("aria-pressed", x === b)); $$(".pcard").forEach(c => c.hidden = b.dataset.f !== "all" && c.dataset.c !== b.dataset.f); };
const dlg = $("#cs");
$("#project-grid").onclick = e => {
  const b = e.target.closest("[data-n]"); if (!b) return; const [t, i] = PROJECTS[b.dataset.n];
  dlg.innerHTML = `<button class="x" aria-label="Close">&times;</button><h3>${t}</h3><p class="mut">${i}</p>` + ["Overview", "My responsibilities", "Approach", "Tools used", "Verified results"].map(s => `<section><b>${s}</b><p class="mut">[Add details. Include only facts and results you can verify.]</p></section>`).join("");
  dlg.showModal();
};
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest(".x")) dlg.close(); });

/* ---------- Links, year, nav, theme ---------- */
$("#yr").textContent = new Date().getFullYear();
$$(".mail").forEach(a => { if (CONTACT_EMAIL) { a.href = "mailto:" + CONTACT_EMAIL; if (a.closest(".links")) a.textContent = CONTACT_EMAIL; } });
$$("[data-todo]").forEach(a => { const u = LINKS[a.dataset.todo]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; if (a.closest(".links")) a.textContent = a.dataset.todo === "linkedin" ? "LinkedIn" : "GitHub"; } });
const bg = $(".burger"), menu = $("#menu");
bg.onclick = () => bg.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.onclick = e => { if (e.target.tagName === "A") { menu.classList.remove("open"); bg.setAttribute("aria-expanded", "false"); } };
addEventListener("keydown", e => { if (e.key === "Escape") { menu.classList.remove("open"); bg.setAttribute("aria-expanded", "false"); } });
const links = $$("#menu a"), navIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("act", a.hash === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => navIO.observe(s));
let scene;
$("#theme").onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = t; try { localStorage.theme = t; } catch (e) {} scene && scene.theme(t); };

/* ---------- Card tilt + spotlight ---------- */
$$(".tilt").forEach(el => {
  el.addEventListener("pointermove", e => {
    const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
    el.style.setProperty("--mx", e.clientX - b.left + "px"); el.style.setProperty("--my", e.clientY - b.top + "px");
    if (RM || e.pointerType === "touch") return;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  el.addEventListener("pointerleave", () => el.style.transform = "");
});

/* ---------- Skill tabs ---------- */
const tabs = $$("[role=tab]");
const pick = t => tabs.forEach(x => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; $("#" + x.getAttribute("aria-controls")).hidden = !on; });
tabs.forEach((t, i) => {
  t.onclick = () => pick(t);
  t.onkeydown = e => { const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (!k) return; e.preventDefault(); const n = tabs[(i + k + tabs.length) % tabs.length]; n.focus(); pick(n); };
});
pick(tabs[0]);

/* ---------- Stat counters (only animate when a verified number is supplied) ---------- */
$$("[data-count]").forEach(el => {
  const n = +el.dataset.count; if (!n) return;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return; io.disconnect();
    if (RM || !window.gsap) { el.textContent = n; return; }
    const o = { v: 0 }; gsap.to(o, { v: n, duration: 1.6, onUpdate: () => el.textContent = Math.round(o.v) });
  }); io.observe(el);
});

/* ---------- Contact form (no backend: opens the visitor's email app) ---------- */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target), s = $("#status");
  if (![...f.values()].every(v => String(v).trim())) { s.textContent = "Please fill in every field."; return; }
  if (!CONTACT_EMAIL) { s.textContent = "Demo mode: set CONTACT_EMAIL in script.js to enable sending."; return; }
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(f.get("message") + "\n\n" + f.get("name") + " (" + f.get("email") + ")")}`;
  s.textContent = "Opening your email app...";
});

/* ---------- GSAP + ScrollTrigger ---------- */
if (window.gsap && window.ScrollTrigger && !RM) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero-in > :not(.stage-slot)", { y: 28, autoAlpha: 0, duration: 1, stagger: .16, delay: .3, ease: "power3.out" });
  gsap.utils.toArray("h2").forEach(h => gsap.from(h, { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 90%", once: true } }));
  gsap.set(".tabs", { autoAlpha: 0, y: 30 });
  ScrollTrigger.create({ trigger: ".tabs", start: "top 88%", once: true, onEnter: () => gsap.to(".tabs", { autoAlpha: 1, y: 0, duration: .7, clearProps: "transform", ease: "power2.out" }) });
}


/* ---------- SEO workflow: plays in a loop while visible ---------- */
(() => {
  const fl = $(".flow"), items = $$(".flow li"); if (!fl) return;
  if (RM) { items.forEach(li => li.classList.add("on")); return; }
  let seen = false, gen = 0, timers = [];
  const wait = (fn, ms) => timers.push(setTimeout(fn, ms));
  const stop = () => { gen++; timers.forEach(clearTimeout); timers = []; };
  const play = () => {
    const g = ++gen; items.forEach(li => li.classList.remove("on", "cur"));
    items.forEach((li, i) => wait(() => { if (g !== gen) return; items.forEach(x => x.classList.remove("cur")); li.classList.add("on", "cur"); }, 500 + i * 650));
    wait(() => { if (g === gen) items.forEach(x => x.classList.remove("cur")); }, 500 + items.length * 650 + 400);
    wait(() => { if (g === gen) play(); }, 500 + items.length * 650 + 3600);   /* hold fully lit, then restart */
  };
  new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (!seen || !timers.length) { seen = true; play(); } } else stop(); }, { threshold: .35 }).observe(fl);
})();

/* ---------- Creative gallery: drop files into assets/creative/ and they appear automatically ---------- */
$$(".shot[data-src]").forEach(f => {
  const src = f.dataset.src, v = /\.(mp4|webm)$/i.test(src), m = document.createElement(v ? "video" : "img");
  if (v) { m.muted = m.loop = m.playsInline = true; m.preload = "metadata"; m.setAttribute("muted", ""); m.onloadeddata = () => f.classList.add("has-media");
    const go = () => { m.play().then(() => f.classList.add("playing")).catch(() => {}); }, no = () => { m.pause(); f.classList.remove("playing"); };
    f.addEventListener("pointerenter", e => e.pointerType === "mouse" && go()); f.addEventListener("pointerleave", e => e.pointerType === "mouse" && no());
    f.addEventListener("click", () => m.paused ? go() : no()); }
  else { m.alt = ""; m.loading = "lazy"; m.onload = () => f.classList.add("has-media"); }
  m.onerror = () => m.remove(); m.src = src; f.prepend(m);
});

/* ---------- Video reel (theater + playlist) ---------- */
(() => {
  const box = $("#reel"); if (!box) return;
  /* EDIT THIS LIST. t = title, c = category (filters are built from these), s = video source, d = description, k = tools, p = optional poster image.
     s can be a local file ("assets/videos/name.mp4") or a YouTube link / "yt:VIDEOID". Add as many videos as you like. */
  const VIDEOS = [
    { t: "3D Typography Animation", c: "3D Art", s: "assets/videos/Project 100.mp4", d: "Add a one-line description of this piece.", k: ["Blender"] },
    { t: "Cinematic Environment Flythrough", c: "3D Art", s: "assets/videos/Project 104.mp4", d: "Add a one-line description of this piece.", k: ["Blender", "Camera animation"] },
    { t: "Lighting & Rendering Study", c: "3D Art", s: "assets/videos/Project 3.mp4", d: "Add a one-line description of this piece.", k: ["Blender", "Lighting"] },
    { t: "Motion Graphics Reel", c: "Motion Graphics", s: "assets/videos/Project 97 (2).mp4", d: "Add a one-line description of this piece.", k: ["Add tool"] },
    { t: "Cinematic Edit", c: "Video Edit", s: "assets/videos/Project 99.mp4", d: "Add a one-line description of this piece.", k: ["Add tool"] },
    { t: "Short-form Video", c: "Short-form", s: "assets/videos/Project 100.mp4", d: "Add a one-line description of this piece.", k: ["Add tool"] }
  ];
  const ytId = s => (/^yt:([\w-]{11})$/.exec(s) || /(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/.exec(s) || [])[1];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pad = n => String(n).padStart(2, "0"), hue = i => (i * 47 + 260) % 360;
  const stage = $("#stage"), list = $("#playlist"), fil = $("#reel-filters");
  let cur = 0, shown = VIDEOS.map((_, i) => i);
  fil.innerHTML = ["All", ...new Set(VIDEOS.map(v => v.c))].map((c, i) => `<button data-c="${esc(c)}" aria-pressed="${!i}">${esc(c)}</button>`).join("");
  list.innerHTML = VIDEOS.map((v, i) => {
    const id = ytId(v.s), th = v.p ? `<img src="${esc(v.p)}" alt="" loading="lazy">` : id ? `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">` : `<video src="${esc(v.s)}#t=0.8" muted playsinline preload="metadata"></video>`;
    return `<button class="vi" data-i="${i}" style="--h:${hue(i)}"><span class="th">${th}<b>${pad(i + 1)}</b></span><span class="vt"><small>${esc(v.c)}</small>${esc(v.t)}</span></button>`;
  }).join("");
  $$(".th img,.th video", list).forEach(m => m.onerror = () => m.remove());
  $$(".vi", list).forEach(b => {   /* hover = silent preview on the thumbnail */
    const m = $("video", b); if (!m || RM) return;
    b.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") m.play().catch(() => {}); });
    b.addEventListener("pointerleave", () => { m.pause(); m.currentTime = .8; });
  });
  const next = () => { const k = shown.indexOf(cur); show(shown[(k + 1) % shown.length], true); };
  function show(i, play) {
    cur = i; const v = VIDEOS[i], id = ytId(v.s), poster = v.p || (id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "");
    $$(".vi", list).forEach(b => { const on = +b.dataset.i === i; b.classList.toggle("on", on); if (on) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    stage.innerHTML = `<div class="screen" style="--h:${hue(i)}">${poster ? `<img src="${esc(poster)}" alt="">` : ""}<p class="miss"><span>Add your video here:<br><code>${esc(v.s)}</code></span></p>${id ? `<button class="bigplay" aria-label="Play ${esc(v.t)}"></button>` : ""}<span class="vf"></span><span class="rec">REC</span><span class="cnt">${pad(i + 1)} / ${pad(VIDEOS.length)}</span></div>` +
      `<div class="meta"><div><small>${esc(v.c)}</small><h4>${esc(v.t)}</h4><p>${esc(v.d || "")}</p></div><ul class="chips">${(v.k || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
    const sc = $(".screen", stage);
    if (id) {
      const go = () => { sc.classList.add("playing"); sc.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1" title="${esc(v.t)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`; };
      $(".bigplay", sc).onclick = go; if (play) go();
    } else {
      const m = document.createElement("video"); m.controls = true; m.playsInline = true; m.preload = "metadata"; if (v.p) m.poster = v.p;
      m.src = v.s + (v.p ? "" : "#t=0.8");
      m.onerror = () => { m.remove(); sc.classList.add("missing"); };
      m.onplay = () => sc.classList.add("playing"); m.onpause = () => sc.classList.remove("playing"); m.onended = () => { sc.classList.remove("playing"); if (shown.length > 1) next(); };
      sc.prepend(m); if (play) m.play().catch(() => {});
    }
  }
  fil.onclick = e => {
    const b = e.target.closest("button"); if (!b) return; $$("button", fil).forEach(x => x.setAttribute("aria-pressed", x === b));
    shown = VIDEOS.map((_, i) => i).filter(i => b.dataset.c === "All" || VIDEOS[i].c === b.dataset.c);
    $$(".vi", list).forEach(x => x.hidden = !shown.includes(+x.dataset.i)); if (!shown.includes(cur)) show(shown[0], false);
  };
  list.onclick = e => { const b = e.target.closest(".vi"); if (b) show(+b.dataset.i, true); };
  show(0, false);
})();

/* ---------- Hero: the search bar universe (Three.js) ---------- */
/* A giant 3D search bar types real queries while keywords, ranking sites, search snippets and icons orbit it.
   Every card is painted on a canvas, so all the text below is easy to edit. */
/*PAINT-START*/
const FONT = "Poppins,system-ui,-apple-system,'Segoe UI',sans-serif", M = 24;
const PAL = {
  dark: { dark: true, card: "rgba(23,17,50,.95)", chip: "rgba(30,22,66,.95)", edge: "rgba(165,125,255,.75)", tx: "#f3f1ff", mut: "#b3aed0", link: "#a9c0ff", url: "#6fe3cb", glow: "rgba(145,94,255,.55)", soft: "rgba(255,255,255,.08)" },
  light: { dark: false, card: "rgba(255,255,255,.98)", chip: "rgba(255,255,255,.98)", edge: "rgba(120,80,230,.6)", tx: "#1b1235", mut: "#5d5682", link: "#3f27c7", url: "#07806b", glow: "rgba(120,80,230,.35)", soft: "rgba(120,80,230,.09)" }
};
const IPATH = {
  mic: ["M9 4.5a3 3 0 0 1 6 0V11a3 3 0 0 1-6 0z", "M5.5 11a6.5 6.5 0 0 0 13 0", "M12 17.5V21"],
  lens: ["M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"],
  pin: ["M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"],
  chart: ["M3 17l5-6 4 3 8-9", "M3 21h18"],
  star: ["M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"],
  link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"],
  spark: ["M12 3l2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7z"],
  globe: ["M3 12h18", "M12 3c3.2 3 3.2 15 0 18", "M12 3c-3.2 3-3.2 15 0 18"],
  search: ["M15 15l5.5 5.5"]
};
const ICIRC = { lens: [12, 12.5, 3], globe: [12, 12, 9], search: [10.5, 10.5, 6], pin: [12, 10, 2.5] };
const cvs = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; };
const rr = (x, a, b, w, h, r) => { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); };
const ico = (x, name, cx, cy, s, col, lw, fill) => {
  x.save(); x.translate(cx - s / 2, cy - s / 2); x.scale(s / 24, s / 24); x.strokeStyle = x.fillStyle = col; x.lineWidth = lw || 1.9; x.lineCap = x.lineJoin = "round";
  (IPATH[name] || []).forEach(d => { const p = new Path2D(d); fill ? x.fill(p) : x.stroke(p); });
  const c = ICIRC[name]; if (c) { x.beginPath(); x.arc(c[0], c[1], c[2], 0, 6.2832); fill ? x.fill() : x.stroke(); }
  x.restore();
};
const wrap = (x, t, mw, n) => {
  const ls = []; let l = "";
  t.split(" ").forEach(w => { const tt = l ? l + " " + w : w; if (x.measureText(tt).width > mw && l) { ls.push(l); l = w; } else l = tt; });
  ls.push(l); return ls.slice(0, n);
};
const fit = (x, t, wt, size, mw) => { x.font = `${wt} ${size}px ${FONT}`; const w = x.measureText(t).width; if (w > mw) x.font = `${wt} ${Math.floor(size * mw / w)}px ${FONT}`; };
const panel = (x, a, b, w, h, r, p) => {
  x.save(); x.shadowColor = p.glow; x.shadowBlur = 30; rr(x, a, b, w, h, r); x.fillStyle = p.card; x.fill(); x.restore();
  rr(x, a, b, w, h, r); x.lineWidth = 2.5; x.strokeStyle = p.edge; x.stroke();
};
const fav = (x, cx, cy, r) => { const g = x.createLinearGradient(cx - r, cy - r, cx + r, cy + r); g.addColorStop(0, "#915eff"); g.addColorStop(1, "#00cea8"); x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fillStyle = g; x.fill(); };

/* Keyword chip, styled like an autocomplete suggestion */
const paintChip = (it, p) => {
  const f = `600 36px ${FONT}`, mx = document.createElement("canvas").getContext("2d"); mx.font = f;
  const tw = Math.ceil(mx.measureText(it.text).width), h = 100, w = tw + 116 + M * 2, col = it.c[p.dark ? 0 : 1], [c, x] = cvs(w, h + M * 2);
  x.save(); x.shadowColor = p.glow; x.shadowBlur = 22; rr(x, M, M, w - M * 2, h, h / 2); x.fillStyle = p.chip; x.fill(); x.restore();
  rr(x, M, M, w - M * 2, h, h / 2); x.lineWidth = 2.5; x.strokeStyle = col; x.stroke();
  ico(x, "search", M + 52, M + h / 2, 34, col, 2.3);
  x.font = f; x.textBaseline = "middle"; x.fillStyle = p.tx; x.fillText(it.text, M + 88, M + h / 2 + 2);
  return c;
};

/* Round glass icon */
const paintDisc = (it, p) => {
  const S = 190, [c, x] = cvs(S, S), col = it.c[p.dark ? 0 : 1];
  x.save(); x.shadowColor = col; x.shadowBlur = 26; x.beginPath(); x.arc(S / 2, S / 2, S / 2 - M, 0, 6.2832); x.fillStyle = p.card; x.fill(); x.restore();
  x.beginPath(); x.arc(S / 2, S / 2, S / 2 - M, 0, 6.2832); x.lineWidth = 4; x.strokeStyle = col; x.stroke();
  ico(x, it.ic, S / 2, S / 2, 66, col, 2.1);
  return c;
};

/* Mini website that ranks #1 */
const paintSite = (it, p) => {
  const W = 560, H = 400, [c, x] = cvs(W, H), w = W - M * 2, h = H - M * 2, col = it.c[p.dark ? 0 : 1];
  panel(x, M, M, w, h, 24, p);
  x.save(); rr(x, M, M, w, h, 24); x.clip();
  x.fillStyle = p.soft; x.fillRect(M, M, w, 58);
  ["#ff6b6b", "#ffc857", "#5fe3a1"].forEach((k, i) => { x.beginPath(); x.arc(M + 30 + i * 24, M + 29, 7, 0, 6.2832); x.fillStyle = k; x.fill(); });
  rr(x, M + 120, M + 13, w - 150, 32, 16); x.fillStyle = p.soft; x.fill();
  x.font = `500 19px ${FONT}`; x.fillStyle = p.mut; x.textBaseline = "middle"; x.fillText(it.url, M + 140, M + 30);
  const g = x.createLinearGradient(M, M + 78, M + w, M + 202); g.addColorStop(0, it.a); g.addColorStop(1, it.b);
  rr(x, M + 22, M + 78, w - 44, 124, 16); x.fillStyle = g; x.fill();
  x.fillStyle = "rgba(255,255,255,.95)"; rr(x, M + 46, M + 102, 190, 20, 10); x.fill();
  x.fillStyle = "rgba(255,255,255,.6)"; rr(x, M + 46, M + 134, 140, 12, 6); x.fill();
  x.fillStyle = "#fff"; rr(x, M + 46, M + 160, 92, 26, 13); x.fill();
  x.fillStyle = "rgba(255,255,255,.22)"; x.beginPath(); x.arc(M + w - 110, M + 140, 50, 0, 6.2832); x.fill(); x.beginPath(); x.arc(M + w - 76, M + 172, 28, 0, 6.2832); x.fill();
  const cw = (w - 44 - 28) / 3;
  for (let i = 0; i < 3; i++) {
    const a = M + 22 + i * (cw + 14); rr(x, a, M + 222, cw, 100, 14); x.fillStyle = p.soft; x.fill();
    x.beginPath(); x.arc(a + 24, M + 248, 9, 0, 6.2832); x.fillStyle = col; x.fill();
    x.fillStyle = p.mut; x.globalAlpha = .5; rr(x, a + 14, M + 272, cw - 28, 9, 4.5); x.fill(); rr(x, a + 14, M + 290, cw - 56, 9, 4.5); x.fill(); x.globalAlpha = 1;
  }
  x.restore();
  const bx = W - M - 18, by = M + 8; x.save(); x.shadowColor = "#00cea8"; x.shadowBlur = 18;
  const bg = x.createLinearGradient(bx - 30, by - 30, bx + 30, by + 30); bg.addColorStop(0, "#00cea8"); bg.addColorStop(1, "#3d8bff");
  x.beginPath(); x.arc(bx, by, 30, 0, 6.2832); x.fillStyle = bg; x.fill(); x.restore();
  x.font = `700 26px ${FONT}`; x.fillStyle = "#fff"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(it.rank, bx, by + 2);
  return c;
};

/* Search results: v = "res" (classic result), "feat" (featured snippet), "ai" (AI overview that cites you) */
const paintSnip = (it, p) => {
  const W = 680, H = 280, [c, x] = cvs(W, H), cw = W - M * 2, ch = H - M * 2, px = M + 30, mw = cw - 60, col = it.c[p.dark ? 0 : 1];
  panel(x, M, M, cw, ch, 22, p); x.textBaseline = "middle";
  const tag = (label, icn) => {
    x.font = `600 18px ${FONT}`; const tw = x.measureText(label).width, w = tw + 62;
    x.globalAlpha = .17; rr(x, px, M + 20, w, 36, 18); x.fillStyle = col; x.fill(); x.globalAlpha = 1;
    ico(x, icn, px + 22, M + 38, 20, col, 2.2); x.fillStyle = col; x.fillText(label, px + 40, M + 39);
  };
  if (it.v === "res") {
    fav(x, px + 15, M + 40, 15); x.font = `500 21px ${FONT}`; x.fillStyle = p.tx; x.fillText(it.site, px + 42, M + 32);
    x.font = `400 16px ${FONT}`; x.fillStyle = p.url; x.fillText(it.crumb, px + 42, M + 55);
    fit(x, it.title, 600, 32, mw); x.fillStyle = p.link; x.fillText(it.title, px, M + 96);
    x.font = `400 21px ${FONT}`; x.fillStyle = p.mut; wrap(x, it.desc, mw, 2).forEach((l, i) => x.fillText(l, px, M + 134 + i * 28));
    for (let i = 0; i < 5; i++) ico(x, "star", px + 12 + i * 25, M + 200, 22, "#f5a623", 1, true);
    x.font = `500 19px ${FONT}`; x.fillStyle = p.mut; x.fillText("4.9", px + 142, M + 201);
  } else if (it.v === "feat") {
    tag(it.tag, "star");
    fit(x, it.q, 700, 32, mw); x.fillStyle = p.tx; x.fillText(it.q, px, M + 88);
    x.font = `400 21px ${FONT}`; x.fillStyle = p.mut; wrap(x, it.desc, mw, 3).forEach((l, i) => x.fillText(l, px, M + 124 + i * 27));
    fav(x, px + 10, M + 206, 10); x.font = `500 17px ${FONT}`; x.fillStyle = p.url; x.fillText(it.site, px + 28, M + 207);
  } else {
    tag(it.tag, "spark");
    x.font = `400 22px ${FONT}`; x.fillStyle = p.tx; wrap(x, it.desc, mw, 3).forEach((l, i) => x.fillText(l, px, M + 90 + i * 30));
    x.font = `500 17px ${FONT}`; x.fillStyle = p.mut; x.fillText("Sources", px, M + 206);
    [0, 1, 2].forEach(i => { const cx = px + 98 + i * 30; fav(x, cx, M + 206, 11); x.lineWidth = i ? 2 : 3; x.strokeStyle = i ? p.card : "#00cea8"; x.stroke(); });
  }
  return c;
};

/* The big bar's face: typed query, magnifier, mic and lens. `full` fixes the font size for the whole query so it never jumps while typing. */
const paintFace = (x, W, H, txt, caret, full) => {
  x.clearRect(0, 0, W, H);
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#e9e2ff");
  rr(x, 0, 0, W, H, H / 2); x.fillStyle = g; x.fill();
  rr(x, 6, 6, W - 12, H - 12, H / 2 - 6); x.lineWidth = 3; x.strokeStyle = "rgba(109,61,240,.2)"; x.stroke();
  ico(x, "search", H * .52, H / 2, H * .24, "#6d3df0", 2.3);
  const x0 = H * .52 + H * .24, maxW = W - H * 1.22 - 100 - x0;
  fit(x, full || txt || "search", 500, H * .27, maxW); x.textBaseline = "middle"; x.fillStyle = "#1b1235";
  x.fillText(txt, x0, H / 2 + H * .012);
  if (caret) { const w = x.measureText(txt).width, fs = parseFloat(x.font.split(" ")[1]); x.fillStyle = "#6d3df0"; x.fillRect(x0 + w + 8, H / 2 - fs * .5, 7, fs); }
  x.fillStyle = "rgba(27,18,53,.14)"; x.fillRect(W - H * 1.22, H * .28, 3, H * .44);
  ico(x, "mic", W - H * .9, H / 2, H * .26, "#6d3df0", 2); ico(x, "lens", W - H * .46, H / 2, H * .26, "#0a8f78", 2);
};
const paint = (it, p) => ({ chip: paintChip, disc: paintDisc, site: paintSite, snip: paintSnip })[it.k](it, p);
/*PAINT-END*/

function initScene() {
  const cv = $("#scene"), hero = $("#top"), slot = $(".stage-slot"); if (!cv || !hero) return;
  let r; try { if (!window.THREE) throw 0; r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch (e) { hero.classList.add("no-gl"); return; }
  const T = THREE, clamp = (v, a, b) => Math.min(Math.max(v, a), b), gl2 = r.capabilities.isWebGL2;
  r.outputEncoding = T.sRGBEncoding;
  const sc = new T.Scene(), cam = new T.PerspectiveCamera(36, 1, .1, 200), root3 = new T.Group(), tilt = new T.Group(); sc.add(root3); root3.add(tilt);
  let th = root.dataset.theme === "light" ? "light" : "dark";

  /* ---- Reflections: a tiny studio of coloured light panels, baked once ---- */
  let env = null;
  try {
    const pm = new T.PMREMGenerator(r), es = new T.Scene(); es.background = new T.Color(0x0a0620);
    const lp = (w, h, col, x, y, z) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(3), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); es.add(m); };
    lp(30, 8, 0xffffff, 0, 18, 6); lp(10, 30, 0x915eff, -22, 0, 4); lp(10, 30, 0x00cea8, 22, -2, 4); lp(40, 6, 0xbf61ff, 0, -16, 8);
    env = pm.fromScene(es, .04).texture; pm.dispose();
  } catch (e) { env = null; }

  /* ---- The search bar: a bevelled pill slab with a painted face ---- */
  const bw = 9.6, bh = 1.9, dp = .8, bt = .14, rad = bh / 2;
  const sh = new T.Shape(); sh.moveTo(-bw / 2 + rad, -bh / 2); sh.lineTo(bw / 2 - rad, -bh / 2); sh.absarc(bw / 2 - rad, 0, rad, -Math.PI / 2, Math.PI / 2, false);
  sh.lineTo(-bw / 2 + rad, bh / 2); sh.absarc(-bw / 2 + rad, 0, rad, Math.PI / 2, Math.PI * 1.5, false);
  const geo = new T.ExtrudeGeometry(sh, { depth: dp, bevelEnabled: true, bevelThickness: bt, bevelSize: .11, bevelSegments: 6, curveSegments: 72 }); geo.translate(0, 0, -dp / 2);
  const sideMat = new T.MeshStandardMaterial({ color: 0x8f63ff, metalness: .85, roughness: .24, emissive: 0x2a1580, emissiveIntensity: .55 }), capMat = new T.MeshStandardMaterial({ color: 0xf1ecff, roughness: .4 });
  if (env) { sideMat.envMap = env; sideMat.envMapIntensity = 1.4; }
  const bar = new T.Mesh(geo, [capMat, sideMat]); tilt.add(bar);
  const FW = 2048, FH = Math.round(FW * bh / bw), [fc, fx] = cvs(FW, FH), faceTex = new T.CanvasTexture(fc);
  faceTex.encoding = T.sRGBEncoding; faceTex.anisotropy = Math.min(8, r.capabilities.getMaxAnisotropy());
  const face = new T.Mesh(new T.PlaneGeometry(bw, bh), new T.MeshBasicMaterial({ map: faceTex, transparent: true, toneMapped: false })); face.position.z = dp / 2 + bt + .006; bar.add(face);
  sc.add(new T.AmbientLight(0x8a7cff, .55));
  const key = new T.DirectionalLight(0xffffff, .9); key.position.set(-4, 8, 10); sc.add(key);
  const vl = new T.PointLight(0x915eff, 1.7, 45); vl.position.set(8, -2, 6); sc.add(vl);
  const tl = new T.PointLight(0x00cea8, 1.3, 45); tl.position.set(-9, -3, 6); sc.add(tl);

  /* ---- Glow behind and beneath the bar, a shockwave ring, and drifting dust ---- */
  const radial = (stops) => { const [c, x] = cvs(256, 256), g = x.createRadialGradient(128, 128, 0, 128, 128, 128); stops.forEach(s => g.addColorStop(s[0], s[1])); x.fillStyle = g; x.fillRect(0, 0, 256, 256); return new T.CanvasTexture(c); };
  const glowTex = radial([[0, "rgba(255,255,255,1)"], [.35, "rgba(255,255,255,.4)"], [1, "rgba(255,255,255,0)"]]), dotTex = radial([[0, "rgba(255,255,255,1)"], [.4, "rgba(255,255,255,.7)"], [1, "rgba(255,255,255,0)"]]);
  const mkGlow = (w, h, x, y, z, col, rx) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: glowTex, color: col, transparent: true, depthWrite: false })); m.position.set(x, y, z); if (rx) m.rotation.x = rx; tilt.add(m); return m; };
  const glowA = mkGlow(26, 11, 0, 0, -3, 0x915eff), glowB = mkGlow(14, 6, 5, -1.6, -2.5, 0x00cea8), pool = mkGlow(22, 9, 0, -3.7, 0, 0x915eff, -Math.PI / 2);
  const shock = new T.Mesh(new T.RingGeometry(.97, 1, 160), new T.MeshBasicMaterial({ color: 0xbfa8ff, transparent: true, depthWrite: false, opacity: 0 })); shock.rotation.x = -Math.PI / 2; shock.visible = false; tilt.add(shock);
  const dN = innerWidth < 720 ? 260 : 520, dpos = new Float32Array(dN * 3);
  for (let i = 0; i < dN; i++) dpos.set([(Math.random() - .5) * 36, (Math.random() - .5) * 20, (Math.random() - .5) * 20 - 2], i * 3);
  const dg = new T.BufferGeometry(); dg.setAttribute("position", new T.BufferAttribute(dpos, 3));
  const dust = new T.Points(dg, new T.PointsMaterial({ size: .09, map: dotTex, transparent: true, depthWrite: false })); root3.add(dust);

  /* ---- What orbits the bar. EDIT the text here. Colours: v violet, t teal, a amber, p pink, b blue ---- */
  const C = { v: ["#b48cff", "#6d3df0"], t: ["#2ee6c5", "#0a8f78"], a: ["#ffc857", "#b9780a"], p: ["#ff7ac8", "#c42a8f"], b: ["#7db0ff", "#2f62d9"] };
  const chip = (text, c, s) => ({ k: "chip", text, c: C[c], s: s || 1 }), disc = (ic, c, s) => ({ k: "disc", ic, c: C[c], s: s || 1 });
  const site = (url, c, a, b) => ({ k: "site", url, c: C[c], a, b, rank: "#1", s: 1 });
  const RINGS = [
    { R: 6.2, sq: .72, tilt: .36, roll: .04, sp: .075, items: [chip("technical seo", "v"), disc("chart", "t"), chip("core web vitals", "b"), disc("pin", "p"), chip("schema markup", "a"), disc("star", "a"), chip("featured snippet", "t"), disc("link", "b")] },
    { R: 8.1, sq: .66, tilt: .34, roll: -.05, sp: -.05, items: [
      { k: "snip", v: "res", c: C.b, site: "yourbrand.com", crumb: "yourbrand.com \u203a services \u203a seo", title: "SEO Services That Bring Customers", desc: "Technical SEO, content and local search that turn searches into enquiries.", s: 1 },
      site("yourbrand.com", "v", "#7c4dff", "#c05bff"), chip("search intent", "p"),
      { k: "snip", v: "feat", c: C.t, tag: "Featured snippet", q: "What is GEO?", desc: "Generative Engine Optimization earns your brand a place inside AI-generated answers.", site: "yourbrand.com", s: 1 },
      site("yourstore.in", "t", "#00b894", "#3d8bff"), chip("ai overviews", "v"),
      { k: "snip", v: "ai", c: C.v, tag: "AI Overview", desc: "Clear answers, structured data and a trusted brand make it easier for AI search to cite you.", s: 1 },
      site("yourclinic.co", "p", "#ff6bb5", "#ff9a5b"), chip("organic traffic", "t")] },
    { R: 4.9, sq: .8, tilt: .6, roll: .55, sp: .12, items: [disc("spark", "v", .9), chip("GEO", "v", .88), disc("globe", "b", .9), chip("AEO", "t", .88), disc("search", "p", .9), chip("GA4", "a", .88), chip("backlinks", "b", .88)] }
  ];
  const items = []; let ready = false, ringK = 1, itemK = 1, tiltK = 1, dist = 18;
  const PPU = { chip: 190, disc: 190, site: 175, snip: 160 };

  const tint = () => {   /* dark: additive glow on a dark page. light: soft normal-blended haze on a pale page */
    const d = th === "dark", add = d ? T.AdditiveBlending : T.NormalBlending;
    [[glowA, .55, .26], [glowB, .38, .18], [pool, .5, .3]].forEach(([m, a, l]) => { m.material.blending = add; m.material.opacity = d ? a : l; m.material.needsUpdate = true; m.userData.o = m.material.opacity; });
    glowA.material.color.set(d ? 0x915eff : 0x8a5cff); glowB.material.color.set(d ? 0x00cea8 : 0x1fc7a8); pool.material.color.set(d ? 0x915eff : 0x7c4dff);
    shock.material.blending = add; shock.material.color.set(d ? 0xbfa8ff : 0x6d3df0); shock.material.needsUpdate = true;
    dust.material.blending = add; dust.material.color.set(d ? 0xcdb8ff : 0x7c4dff); dust.material.opacity = d ? .6 : .4; dust.material.needsUpdate = true;
    RINGS.forEach(g => { if (g.line) { g.line.material.color.set(d ? 0xa98bff : 0x6d3df0); g.line.material.opacity = d ? .22 : .3; } });
  };
  const repaint = () => { if (!ready) return; const p = PAL[th]; items.forEach(it => { it.tex.image = paint(it, p); it.tex.needsUpdate = true; }); };
  const build = () => {
    const p = PAL[th], aniso = Math.min(4, r.capabilities.getMaxAnisotropy());
    RINGS.forEach((rg, ri) => {
      rg.g = new T.Group(); tilt.add(rg.g);
      const pts = new T.EllipseCurve(0, 0, rg.R, rg.R * rg.sq, 0, 6.2832, false, 0).getPoints(180).map(v => new T.Vector3(v.x, 0, v.y));
      rg.line = new T.LineLoop(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ transparent: true, depthWrite: false })); rg.g.add(rg.line);
      rg.items.forEach((it, k) => {
        const cv2 = paint(it, p), tex = new T.CanvasTexture(cv2); tex.encoding = T.sRGBEncoding; tex.anisotropy = aniso;
        if (!gl2) { tex.generateMipmaps = false; tex.minFilter = T.LinearFilter; }
        it.tex = tex; it.mat = new T.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false });
        it.mesh = new T.Mesh(new T.PlaneGeometry(cv2.width / PPU[it.k], cv2.height / PPU[it.k]), it.mat); rg.g.add(it.mesh);
        it.ang = k / rg.items.length * 6.2832 + ri * 1.1; it.ph = k * 2.3 + ri * 1.7; it.ring = rg; it.i = items.length; items.push(it);
      });
    });
    ready = true; introAt = performance.now(); nextAt = introAt + 1500; tint(); layout(); if (RM) frame(performance.now());
  };

  /* ---- Layout: the bar sits where the CSS slot is; narrow screens get tighter, steeper orbits ---- */
  const layout = () => {
    const w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    r.setPixelRatio(Math.min(devicePixelRatio, w < 720 ? 1.75 : 2)); r.setSize(w, h, false);
    const narrow = w < 720, mid = w < 1100, frac = narrow ? .9 : mid ? .72 : .56, tanH = Math.tan(cam.fov * Math.PI / 360);
    cam.aspect = w / h; dist = (bw + .4) / frac / cam.aspect / (2 * tanH); cam.position.set(0, 0, dist);
    const sr = slot.getBoundingClientRect(), cr = cv.getBoundingClientRect(), cy = sr.top + sr.height / 2 - cr.top;
    cam.setViewOffset(w, h, 0, h / 2 - cy, w, h);   /* shifts the picture so the bar's centre lands on the slot */
    ringK = narrow ? .6 : mid ? .82 : 1; itemK = narrow ? .78 : mid ? .9 : 1; tiltK = narrow ? 1.9 : mid ? 1.25 : 1;
    RINGS.forEach(g => { if (g.g) g.g.rotation.set(g.tilt * tiltK, 0, g.roll); });
    cam.updateProjectionMatrix(); if (RM) frame(performance.now());
  };

  /* ---- Typed queries ---- */
  const QS = ["seo specialist near me", "why did my traffic drop", "how to rank on google", "what is geo in seo", "get cited by ai search", "grow my organic traffic", "best technical seo audit"];
  let qi = 0, ci = RM ? QS[0].length : 0, phase = "type", nextAt = performance.now() + 1500, caretOn = true, caretAt = 0, dirty = true;
  const face$ = () => { paintFace(fx, FW, FH, QS[qi].slice(0, ci), caretOn, QS[qi]); faceTex.needsUpdate = true; dirty = false; };
  const typing = now => {
    if (now - caretAt > 520) { caretAt = now; caretOn = !caretOn; dirty = true; }
    if (now < nextAt) return;
    if (phase === "type") { ci++; dirty = true; caretOn = true; if (ci >= QS[qi].length) { phase = "hold"; nextAt = now + 2300; shockT = 0; boost = 2.6; } else nextAt = now + 55 + Math.random() * 60; }
    else if (phase === "hold") { phase = "erase"; nextAt = now; }
    else if (phase === "erase") { ci = Math.max(ci - 1, 0); dirty = true; if (!ci) { phase = "gap"; nextAt = now + 450; } else nextAt = now + 22; }
    else { qi = (qi + 1) % QS.length; phase = "type"; nextAt = now + 200; dirty = true; }
  };

  /* ---- Frame ---- */
  const V = new T.Vector3(), Q = new T.Quaternion(), QW = new T.Quaternion(), EU = new T.Euler();
  let mx = 0, my = 0, px = 0, py = 0, boost = 1, shockT = 1, ang = 0, vis = true, run = false, introAt = null; const t0 = performance.now(); let last = t0;
  const frame = now => {
    const dt = Math.min((now - last) / 1000, .05); last = now; const tm = (now - t0) / 1000;
    const u = RM ? 1 : introAt === null ? 0 : clamp((now - introAt) / 2600, 0, 1), e = 1 - Math.pow(1 - u, 3), sp = RM ? 0 : clamp(scrollY / innerHeight, 0, 1);
    if (!RM) { px += (mx - px) * .05; py += (my - py) * .05; boost += (1 - boost) * clamp(dt * 1.6, 0, 1); ang += dt * boost; }
    cam.position.z = dist * (1 - .2 * sp);
    root3.position.y = RM ? 0 : Math.sin(tm * .9) * .1;
    tilt.scale.setScalar(.82 + .18 * e);
    tilt.rotation.set(.13 + py * .16 - sp * .1, px * .32 + (RM ? 0 : Math.sin(tm * .35) * .05) - (1 - e) * .7, RM ? 0 : Math.sin(tm * .6) * .012);
    root3.updateMatrixWorld(true);
    if (!RM && ready) typing(now); if (dirty) face$();
    if (ready) RINGS.forEach(rg => {
      rg.g.getWorldQuaternion(Q); Q.invert();
      rg.items.forEach(it => {
        const a = it.ang + ang * rg.sp, ei = clamp(e * 1.3 - it.i * .014, 0, 1), k = rg.R * ringK * (.35 + .65 * ei);
        it.mesh.position.set(Math.cos(a) * k, 0, Math.sin(a) * k * rg.sq);
        V.copy(it.mesh.position).applyMatrix4(rg.g.matrixWorld);
        const d = clamp(.5 + V.z / 12, 0, 1);
        it.mat.opacity = ei * (.4 + .6 * d); it.mat.color.setScalar(.55 + .45 * d);
        it.mesh.scale.setScalar(it.s * itemK * (.6 + .4 * ei));
        it.mesh.quaternion.copy(Q).multiply(cam.quaternion);
        if (!RM) { EU.set(Math.sin(tm * .7 + it.ph) * .2, Math.sin(tm * .5 + it.ph * 1.7) * .32, 0); it.mesh.quaternion.multiply(QW.setFromEuler(EU)); }
      });
    });
    if (shockT < 1) { shockT += dt / 1.8; shock.visible = true; shock.scale.setScalar((2.6 + shockT * 7.5) * ringK); shock.material.opacity = Math.max(1 - shockT, 0) * (th === "dark" ? .55 : .4); } else shock.visible = false;
    const pulse = 1 + (RM ? 0 : Math.sin(tm * 1.2) * .1) + Math.max(1 - shockT, 0) * .35;
    [glowA, glowB, pool].forEach(m => { m.material.opacity = (m.userData.o || .3) * pulse * (.4 + .6 * e); });
    dust.rotation.y = RM ? 0 : tm * .01;
    r.render(sc, cam);
  };
  const loop = now => { if (!vis) { run = false; return; } run = true; requestAnimationFrame(loop); frame(now); };

  addEventListener("resize", layout); layout(); tint();
  if ("ResizeObserver" in window) { const ro = new ResizeObserver(layout); ro.observe(hero); ro.observe(slot); }
  const fonts = document.fonts && document.fonts.load ? Promise.race([Promise.all(["500 20px Poppins", "600 20px Poppins", "700 20px Poppins"].map(f => document.fonts.load(f))), new Promise(ok => setTimeout(ok, 1800))]) : Promise.resolve();
  fonts.catch(() => {}).then(() => { dirty = true; build(); layout(); });
  if (RM) { dirty = true; frame(performance.now()); }
  else {
    addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !run) { last = performance.now(); requestAnimationFrame(loop); } }).observe(hero); requestAnimationFrame(loop);
  }
  const theme = t => { th = t === "light" ? "light" : "dark"; tint(); repaint(); if (RM) frame(performance.now()); };
  return { theme };
}
(window.requestIdleCallback || setTimeout)(() => scene = initScene());
})();
