const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  const currentPage = document.body.dataset.page;
  if (link.dataset.page === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach((link) => {
  link.target = "_blank";
  const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
  rel.add("noopener");
  rel.add("noreferrer");
  link.setAttribute("rel", Array.from(rel).join(" "));
});

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const mapBuilderConfigs = [
  {
    id: "learning-circle",
    title: "Learning Circle Map",
    filename: "learning-circle-map.md",
    tag: "Shared language",
    purpose: "Use this when people are still finding shared words, shared facts and shared trust.",
    aiInstruction: "Help us turn early community notes into plain language, shared questions and a careful next-step map. Do not pretend this group has consent or authority it has not named.",
  },
  {
    id: "community-association",
    title: "Community Association Map",
    filename: "association-map.md",
    tag: "Local activity",
    purpose: "Use this for events, workshops, grants, repair days, media, noticeboards and local coordination.",
    aiInstruction: "Help us organise the project, risks, sources, roles, public updates and practical next steps. Keep claims modest unless the evidence is named.",
  },
  {
    id: "coop-mutual",
    title: "Co-op Or Mutual Map",
    filename: "coop-mutual-map.md",
    tag: "Member owned",
    purpose: "Use this when members may become users, owners, voters, contributors or shared-risk participants.",
    aiInstruction: "Help us compare member-owned options, mutual care choices, governance questions and plain-language risks. Keep member consent and fair records central.",
  },
  {
    id: "company-guarantee",
    title: "Company Limited By Guarantee Map",
    filename: "guarantee-company-map.md",
    tag: "Public purpose",
    purpose: "Use this for larger public-purpose work that may involve directors, members, grants, reporting and professional advice.",
    aiInstruction: "Help us map public-purpose governance, grant readiness, director questions, reporting duties, risks and evidence gaps in plain Australian English.",
  },
  {
    id: "country-data",
    title: "Country And Data Pathway Map",
    filename: "country-data-map.md",
    tag: "Country and data",
    purpose: "Use this when Native Title, cultural authority, Indigenous data, place knowledge or Country-led consent may be central.",
    aiInstruction: "Help us prepare respectful questions and source trails without speaking for Traditional Owners, native title holders, Elders or community authorities.",
  },
  {
    id: "professional-mutual",
    title: "Professional Mutual Branch Map",
    filename: "mutual-branch-map.md",
    tag: "Insurance reform",
    purpose: "Use this for prevention-first insurance, mutual protection, claims rules, reserves, risk data, professional oversight and law reform.",
    aiInstruction: "Help us map lawful mutual protection options, prevention evidence, current insurance needs, reform ideas and advice gaps. Do not call a pool insurance unless the legal basis is clear.",
  },
];

initMapBuilders();

function initMapBuilders() {
  const host = document.querySelector("[data-map-builders]");
  if (!host) return;

  host.innerHTML = mapBuilderConfigs.map(renderMapBuilder).join("");
  host.querySelectorAll("[data-project-map-form]").forEach((form) => {
    setupMapBuilder(form);
  });
}

function renderMapBuilder(config) {
  return `
    <article class="builder-panel" id="form-${config.id}" data-builder-id="${config.id}">
      <div class="builder-heading">
        <p class="eyebrow">${config.tag}</p>
        <h3>${config.title}</h3>
        <p>${config.purpose}</p>
      </div>
      <div class="builder-layout">
        <form class="builder-form" data-project-map-form data-builder-id="${config.id}" data-builder-title="${config.title}" data-default-filename="${config.filename}" data-ai-instruction="${config.aiInstruction}">
          <div class="form-grid two">
            <label>Working title
              <input name="title" placeholder="Example: Minjerribah community wealth conversation">
            </label>
            <label>Suggested file name
              <input name="filename" placeholder="${config.filename}">
            </label>
            <label>Explorer, group or project owner
              <input name="explorer" placeholder="Optional">
            </label>
            <label>Place or project area
              <input name="place" placeholder="Street, town, island, region, online space">
            </label>
          </div>
          <label>What are you trying to understand or prepare?
            <textarea name="purpose" rows="3" placeholder="Name the project, question, worry, hope, decision or opportunity."></textarea>
          </label>
          <label>What already feels known?
            <textarea name="known" rows="4" placeholder="Facts, history, local knowledge, past attempts, people, dates, rough numbers, useful links."></textarea>
          </label>
          <label>What is uncertain, sensitive or contested?
            <textarea name="uncertain" rows="4" placeholder="Things that need checking, permission, cultural care, legal advice, source review or private handling."></textarea>
          </label>
          <div class="form-grid two">
            <label>Self-sovereignty boundary
              <textarea name="boundary" rows="4" placeholder="What stays private, trusted-only, public, or undecided? Who can change that?"></textarea>
            </label>
            <label>People and authority map
              <textarea name="authority" rows="4" placeholder="Who is affected? Who holds local, cultural, legal, lived, family or professional authority?"></textarea>
            </label>
          </div>
          <label>Place, data and source map
            <textarea name="sources" rows="5" placeholder="Locations, buildings, Country, datasets, websites, PDFs, photos, ledgers, meeting notes, official records, local stories. One clue per line is fine."></textarea>
          </label>
          <label>Value and quality-of-life map
            <textarea name="valueMap" rows="4" placeholder="Clean energy, insurance, wealth, food, health, housing, data, local intelligence, learning, safety, care, repair, culture, ecology."></textarea>
          </label>
          <label>Risk and care map
            <textarea name="riskMap" rows="4" placeholder="What could go wrong? Who could be harmed? What normal insurance, legal, cultural, tax, technical or safety advice may matter?"></textarea>
          </label>
          <label>AI expedition request
            <textarea name="aiRequest" rows="4" placeholder="What would you like an AI model to help with after reading this file?"></textarea>
          </label>
          <label>Questions to carry into the wider world
            <textarea name="questions" rows="4" placeholder="Questions for AI, community meetings, government, funders, advisers, Traditional Owner authorities, family or project partners."></textarea>
          </label>
          <div class="builder-actions">
            <button class="button" type="submit">Update markdown</button>
            <button class="button ghost" type="button" data-copy-map>Copy markdown</button>
            <button class="button ghost" type="button" data-download-map>Download .md</button>
            <button class="button danger" type="button" data-clear-map>Clear this form</button>
          </div>
          <p class="status-line" data-map-status aria-live="polite">Ready.</p>
        </form>
        <aside class="output-panel" aria-label="Generated Markdown output">
          <label>Generated Markdown
            <textarea class="markdown-output" data-map-output readonly spellcheck="false"></textarea>
          </label>
        </aside>
      </div>
    </article>
  `;
}

function setupMapBuilder(form) {
  const panel = form.closest(".builder-panel");
  const output = panel.querySelector("[data-map-output]");
  const status = panel.querySelector("[data-map-status]");
  const storageKey = `community-wealth-map:${form.dataset.builderId}`;

  const setStatus = (message) => {
    status.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      status.textContent = "Ready.";
    }, 2400);
  };

  const save = () => {
    const data = readMapForm(form);
    localStorage.setItem(storageKey, JSON.stringify(data));
    output.value = buildProjectMapMarkdown(form, data);
  };

  hydrateMapForm(form, storageKey);
  save();

  form.addEventListener("input", save);
  form.addEventListener("change", save);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    save();
    setStatus("Markdown updated.");
  });

  form.querySelector("[data-copy-map]").addEventListener("click", async () => {
    save();
    try {
      await navigator.clipboard.writeText(output.value);
    } catch {
      output.removeAttribute("readonly");
      output.select();
      document.execCommand("copy");
      output.setAttribute("readonly", "readonly");
      output.blur();
    }
    setStatus("Markdown copied.");
  });

  form.querySelector("[data-download-map]").addEventListener("click", () => {
    const data = readMapForm(form);
    save();
    const filename = filenameForMap(data, form.dataset.defaultFilename);
    downloadMarkdownFile(filename, output.value);
    setStatus(`${filename} is ready.`);
  });

  form.querySelector("[data-clear-map]").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    form.reset();
    save();
    setStatus("Answers cleared.");
  });
}

function readMapForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function hydrateMapForm(form, storageKey) {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    saved = {};
  }

  Object.entries(saved).forEach(([name, value]) => {
    const field = form.elements[name];
    if (field) field.value = value;
  });
}

function buildProjectMapMarkdown(form, data) {
  const today = new Date().toISOString().slice(0, 10);
  const title = valueOr(data.title, form.dataset.builderTitle);
  const filename = filenameForMap(data, form.dataset.defaultFilename);

  return [
    "---",
    "schema: community_sovereignty_project_map.v0",
    `title: ${yamlValue(title)}`,
    `pathway: ${yamlValue(form.dataset.builderTitle)}`,
    `file_name: ${yamlValue(filename)}`,
    `created: ${yamlValue(today)}`,
    `updated: ${yamlValue(today)}`,
    "source_site: moreton-bay-community-wealth-and-mutuals",
    "privacy_note: browser_local_until_shared_by_the_visitor",
    "---",
    "",
    `# ${title}`,
    "",
    "## How To Use This File With AI",
    "This file is a prepared map, not proof. It gives an AI model a safer starting area before a wider expedition into the internet, community conversations, grant portals, government systems, corporate offers or legal research.",
    "",
    "Ask the AI to stay inside the boundaries named here, mark uncertainty clearly, ask before using private material, and separate facts from guesses.",
    "",
    "## Pathway",
    form.dataset.builderTitle,
    "",
    "## Explorer Or Group",
    paragraph(data.explorer, "Not recorded yet."),
    "",
    "## Place Or Project Area",
    paragraph(data.place, "Not recorded yet."),
    "",
    "## What This Map Is Preparing",
    paragraph(data.purpose, "Name the project, question, worry, hope, decision or opportunity."),
    "",
    "## What Already Feels Known",
    paragraph(data.known, "Add facts, history, local knowledge, past attempts, people, dates, rough numbers and links."),
    "",
    "## What Is Uncertain, Sensitive Or Contested",
    paragraph(data.uncertain, "Add points that need checking, permission, cultural care, legal advice, source review or private handling."),
    "",
    "## Self-Sovereignty Boundary",
    paragraph(data.boundary, "Mark what stays private, trusted-only, public, or undecided. Name who can change that boundary."),
    "",
    "## People And Authority Map",
    paragraph(data.authority, "Name affected people and the local, cultural, legal, lived, family or professional authority that may matter."),
    "",
    "## Place, Data And Source Map",
    listFromLines(data.sources, "Add locations, buildings, Country, datasets, websites, PDFs, photos, ledgers, meeting notes, official records or local stories."),
    "",
    "## Value And Quality-Of-Life Map",
    paragraph(data.valueMap, "Map clean energy, insurance, wealth, food, health, housing, data, local intelligence, learning, safety, care, repair, culture and ecology."),
    "",
    "## Risk And Care Map",
    paragraph(data.riskMap, "Name possible harm, missing advice, normal insurance needs, legal questions, cultural care, tax, technical or safety checks."),
    "",
    "## AI Expedition Request",
    paragraph(data.aiRequest, form.dataset.aiInstruction),
    "",
    "## Questions To Carry Into The Wider World",
    listFromLines(data.questions, "Add questions for AI, community meetings, government, funders, advisers, Traditional Owner authorities, family or project partners."),
    "",
    "## Simple AI Instruction",
    form.dataset.aiInstruction,
    "",
    "If important context is missing, ask plain questions before making a confident plan.",
    "",
  ].join("\n");
}

function valueOr(value, fallback) {
  const text = String(value || "").trim();
  return text || fallback;
}

function paragraph(value, fallback) {
  return valueOr(value, fallback || "Left open.");
}

function listFromLines(value, fallback) {
  const lines = String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return `- ${fallback}`;
  return lines.map((line) => `- ${line}`).join("\n");
}

function filenameForMap(data, fallback) {
  const explicit = String(data.filename || "").trim();
  if (explicit) return explicit.endsWith(".md") ? explicit : `${slugify(explicit)}.md`;
  return fallback || `${slugify(data.title || "community-project-map")}.md`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "community-project-map";
}

function yamlValue(value) {
  const text = String(value || "").trim();
  if (!text) return '""';
  if (/^[A-Za-z0-9_.:/@-]+$/.test(text)) return text;
  return JSON.stringify(text);
}

function downloadMarkdownFile(filename, markdown) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
