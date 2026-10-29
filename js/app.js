/* =========================================================
   MANISH.DEV — PORTFOLIO GAME LOGIC
========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const bootScreen = $("#boot-screen");
const app = $("#app");
const startButton = $("#start-game");
const bootLog = $("#boot-log");
const bootProgress = $("#boot-progress-bar");
const toast = $("#toast");

const bootMessages = [
  "Loading player profile",
  "Loading skill matrix",
  "Loading quest database",
  "Loading world map",
  "Loading achievements",
  "Synchronizing systems"
];

let bootStep = 0;

function runBoot() {
  const timer = setInterval(() => {
    if (bootStep >= bootMessages.length) {
      clearInterval(timer);
      bootProgress.style.width = "100%";
      startButton.disabled = false;
      startButton.textContent = "START GAME";
      return;
    }

    const line = document.createElement("div");
    line.className = "boot-line";
    line.innerHTML = `<span>${bootMessages[bootStep]}</span><strong>✓</strong>`;
    bootLog.appendChild(line);

    bootStep += 1;
    bootProgress.style.width = `${Math.round((bootStep / bootMessages.length) * 100)}%`;
  }, 320);
}

runBoot();

startButton.addEventListener("click", () => {
  bootScreen.style.transition = "opacity .5s ease, transform .5s ease";
  bootScreen.style.opacity = "0";
  bootScreen.style.transform = "scale(1.02)";

  setTimeout(() => {
    bootScreen.remove();
    app.classList.remove("is-hidden");
    animateStats();
    showToast("PLAYER INITIALIZED");
  }, 500);
});

/* ---------------------------------------------------------
   NAVIGATION
--------------------------------------------------------- */

const navItems = $$(".nav-item");
const sections = $$(".section");

function openSection(id) {
  navItems.forEach(item => {
    item.classList.toggle("active", item.dataset.section === id);
  });

  sections.forEach(section => {
    section.classList.toggle("active", section.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach(item => {
  item.addEventListener("click", () => openSection(item.dataset.section));
});

/* Keyboard shortcuts */
const shortcuts = {
  "1": "character",
  "2": "quests",
  "3": "skills",
  "4": "world",
  "5": "inventory",
  "6": "achievements",
  "7": "contact"
};

document.addEventListener("keydown", event => {
  if (event.key in shortcuts && !isTyping()) {
    openSection(shortcuts[event.key]);
  }

  if (event.key === "Escape") {
    const modal = $("#detail-modal");
    if (modal?.open) modal.close();
  }
});

function isTyping() {
  const tag = document.activeElement?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea";
}

/* ---------------------------------------------------------
   STATS ANIMATION
--------------------------------------------------------- */

let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;

  $$(".stat").forEach((stat, index) => {
    const value = Number(stat.dataset.value || 0);
    const fill = $(".stat-track i", stat);

    fill.style.width = "0%";

    setTimeout(() => {
      fill.style.transition = "width 1s cubic-bezier(.2,.8,.2,1)";
      fill.style.width = `${value}%`;
    }, 120 + index * 80);
  });
}

/* ---------------------------------------------------------
   QUEST DATA (PORTFOLIO PROJECTS)
--------------------------------------------------------- */

const guilds = {
  codecandy: "CODECANDY / BRIGHT SOLUTIONS · 2022–NOW",
  qed42: "QED42 · 2019–2022",
  addweb: "ADDWEB SOLUTION · 2016–2019",
  softtech: "SOFTTECH INFOSYS · 2015–2016"
};

const quests = [
  {
    id: "banking-dms",
    guild: "codecandy",
    type: "MAIN QUEST",
    title: "BANKING DOCUMENT MANAGEMENT",
    summary: "Drupal 11 document management system for a bank: book and template sync, publishing, LDAP and PDF output.",
    tags: ["DRUPAL 11", "PHP 8", "LDAP", "PDF", "PHPUNIT"],
    reward: 3000,
    mission: "Build and maintain a document management platform used by a bank to author, sync and publish its documentation.",
    systems: [
      "Book and template synchronisation with publishing workflows",
      "LDAP authentication for bank staff",
      "PDF output of published documents",
      "PHPUnit kernel tests covering the backend logic"
    ]
  },
  {
    id: "genetic-reporting",
    guild: "codecandy",
    type: "BOSS QUEST",
    title: "GENETIC DIAGNOSTICS REPORTING",
    summary: "Upgraded a genetic diagnostics reporting tool from Drupal 8 to Drupal 11 on PHP 8.4.",
    tags: ["DRUPAL 8 → 11", "PHP 8.4", "SOLR", "JSON:API"],
    reward: 3500,
    mission: "Take a long-running diagnostics reporting platform through three major Drupal versions without losing functionality.",
    systems: [
      "Drupal core upgrade 8 → 9 → 10 → 11 and PHP 8.4 compatibility",
      "Apache Solr search with multiple collections via Search API",
      "JSON:API fixes for connected clients",
      "Refactoring legacy custom code along the way"
    ]
  },
  {
    id: "env-credits",
    guild: "codecandy",
    type: "MAIN QUEST",
    title: "ENVIRONMENTAL CREDITS PLATFORM",
    summary: "Drupal 10 platform for environmental credits with Stripe payments, recurring subscriptions and REST APIs.",
    tags: ["DRUPAL 10", "STRIPE", "SUBSCRIPTIONS", "REST"],
    reward: 2800,
    mission: "Power the purchase and management of environmental credits with reliable payment flows and APIs.",
    systems: [
      "Stripe payment integration",
      "Recurring subscription billing",
      "Custom REST endpoints in Drupal",
      "Cypress end-to-end tests for key workflows"
    ]
  },
  {
    id: "tender-portal",
    guild: "codecandy",
    type: "MAIN QUEST",
    title: "TENDER MANAGEMENT PORTAL",
    summary: "Drupal 7 + CiviCRM portal with a supplier risk register, tender audit trail and award workflows.",
    tags: ["DRUPAL 7", "CIVICRM", "WORKFLOWS", "AUDIT"],
    reward: 2500,
    mission: "Support a full tender lifecycle, from supplier vetting through to awarding contracts, on top of CiviCRM.",
    systems: [
      "Supplier risk register",
      "Tender audit trail",
      "Tender award workflows",
      "Custom Drupal 7 modules integrated with CiviCRM"
    ]
  },
  {
    id: "event-sites",
    guild: "codecandy",
    type: "MAIN QUEST",
    title: "EVENT & CONFERENCE SITES",
    summary: "Drupal 7 + CiviCRM conference sites with presenter listings, abstract submissions and edit locking.",
    tags: ["DRUPAL 7", "CIVICRM", "EVENTS"],
    reward: 2000,
    mission: "Run conference websites where presenters submit abstracts and organisers manage the programme.",
    systems: [
      "Presenter listings",
      "Abstract submission flow",
      "Edit locking to prevent conflicting changes",
      "CiviCRM event integration"
    ]
  },
  {
    id: "gitlab-trello",
    guild: "codecandy",
    type: "SIDE QUEST",
    title: "GITLAB ↔ TRELLO SYNC",
    summary: "n8n automation workflow that keeps GitLab issue boards and Trello in sync.",
    tags: ["N8N", "GITLAB", "TRELLO", "AUTOMATION"],
    reward: 1200,
    mission: "Remove manual double-entry between developer issue boards and client-facing Trello boards.",
    systems: [
      "n8n workflow triggered by GitLab issue changes",
      "Mapping of GitLab board lists to Trello lists",
      "Streamlined task management across platforms"
    ]
  },
  {
    id: "acquia-multisite",
    guild: "qed42",
    type: "MAIN QUEST",
    title: "ENTERPRISE MULTISITE PLATFORM",
    summary: "Multi-site architecture on Acquia Cloud Site Factory with centralised content via Acquia Content Hub.",
    tags: ["ACQUIA ACSF", "CONTENT HUB", "DRUPAL 8/9", "CACHING"],
    reward: 3000,
    mission: "Support scalable enterprise deployments across many sites sharing a single codebase and content source.",
    systems: [
      "Acquia Cloud Site Factory multi-site management",
      "Acquia Content Hub configured and synchronised across sites",
      "Performance tuning with Drupal aggregation and caching",
      "Custom modules, themes and third-party API integrations"
    ]
  },
  {
    id: "qed42-upgrades",
    guild: "qed42",
    type: "BOSS QUEST",
    title: "DRUPAL 7 → 8 → 9 UPGRADES",
    summary: "Migrated content and functionality from Drupal 7 to 8, then upgraded Drupal 8 sites to 9.",
    tags: ["MIGRATE API", "COMPOSER", "SYMFONY", "DEPRECATIONS"],
    reward: 3000,
    mission: "Move client platforms to modern Drupal while keeping data consistent and features at parity.",
    systems: [
      "Drupal 7 → 8 content and feature migration",
      "Drupal 8 → 9 core upgrade and deprecation fixes",
      "Composer dependency resolution",
      "Regression testing and debugging"
    ]
  },
  {
    id: "drupal-org",
    guild: "qed42",
    type: "SIDE QUEST",
    title: "DRUPAL.ORG CONTRIBUTIONS",
    summary: "Contributed code and patches back to the Drupal open-source community.",
    tags: ["OPEN SOURCE", "PATCHES", "DRUPAL.ORG"],
    reward: 1500,
    mission: "Give back fixes found during client work so the whole community benefits.",
    systems: [
      "Patches and issue fixes for contributed modules",
      "Code reviews in the Drupal.org issue queue"
    ],
    link: ["VIEW DRUPAL.ORG PROFILE", "https://www.drupal.org/u/msuthars"]
  },
  {
    id: "commerce",
    guild: "addweb",
    type: "MAIN QUEST",
    title: "DRUPAL COMMERCE STOREFRONTS",
    summary: "Customised Drupal Commerce with Stripe, GlobalOne Payment and PayPal plugins.",
    tags: ["DRUPAL COMMERCE", "STRIPE", "PAYPAL", "GLOBALONE"],
    reward: 2200,
    mission: "Deliver online stores with tailored checkout and multiple payment gateways.",
    systems: [
      "Drupal Commerce implementation and customisation",
      "Stripe, GlobalOne Payment and PayPal gateways",
      "Full-stack theming and back-end work"
    ]
  },
  {
    id: "invoice-sync",
    guild: "addweb",
    type: "MAIN QUEST",
    title: "INVOICE & ACCOUNTING SYNC",
    summary: "Integrated invoice listings with QuickBooks and Zoho, with OAuth and custom APIs.",
    tags: ["QUICKBOOKS", "ZOHO", "OAUTH", "REST"],
    reward: 2000,
    mission: "Keep invoice data flowing between Drupal sites and the client's accounting systems.",
    systems: [
      "QuickBooks and Zoho integrations",
      "OAuth authentication",
      "Custom APIs and Drupal Views REST output"
    ]
  },
  {
    id: "legacy-migrations",
    guild: "addweb",
    type: "BOSS QUEST",
    title: "LEGACY MIGRATIONS",
    summary: "Complex data migrations from Drupal 6 and 7 to Drupal 8 with core and custom migrate plugins.",
    tags: ["DRUPAL 6 → 8", "DRUPAL 7 → 8", "MIGRATE", "FEEDS"],
    reward: 2500,
    mission: "Bring clients off end-of-life Drupal versions with minimal downtime.",
    systems: [
      "Drupal 6 → 8 and 7 → 8 upgrades",
      "Default and custom migrate plugins",
      "Feeds module integration"
    ]
  },
  {
    id: "wordpress",
    guild: "softtech",
    type: "TUTORIAL QUEST",
    title: "WORDPRESS PLUGINS & THEMES",
    summary: "First steps as a PHP developer: custom WordPress plugins and themes.",
    tags: ["PHP", "WORDPRESS", "THEMES"],
    reward: 800,
    mission: "Learn professional PHP development through a hands-on internship.",
    systems: [
      "Custom WordPress plugins",
      "Custom WordPress themes"
    ]
  },
  {
    id: "react",
    guild: null,
    type: "CURRENT QUEST",
    active: true,
    title: "REACT APPRENTICE",
    summary: "Expanding frontend skills and building modern React interfaces and applications.",
    tags: ["REACT", "JAVASCRIPT", "UI"],
    reward: 1000,
    mission: "Expand modern frontend capabilities while bringing strong backend experience into React applications.",
    systems: [
      "React component architecture",
      "Modern JavaScript patterns",
      "Decoupled Drupal frontends",
      "Interactive UI development"
    ],
    systemsLabel: "Current objectives"
  }
];

const modal = $("#detail-modal");
const modalTitle = $("#modal-title");
const modalBody = $("#modal-body");
const modalEyebrow = $("#modal-eyebrow");
const questList = $("#quest-list");
const questCounter = $("#quest-counter");

function questEyebrow(quest) {
  return `${quest.type} / ${quest.active ? "ACTIVE" : guilds[quest.guild]}`;
}

function renderQuests(filter = "all") {
  const visible = quests.filter(quest => filter === "all" || quest.guild === filter);

  questList.innerHTML = visible.map(quest => `
    <button class="quest-card ${quest.active ? "active-quest" : "complete"}" data-quest="${quest.id}">
      <div class="quest-icon">${quest.active ? "◉" : "✓"}</div>
      <div class="quest-body">
        <span class="quest-type">${questEyebrow(quest)}</span>
        <h2>${quest.title}</h2>
        <p>${quest.summary}</p>
        <div class="tags">${quest.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      </div>
      <div class="quest-reward"><small>REWARD</small><strong>+${quest.reward} XP</strong></div>
    </button>
  `).join("");

  questCounter.textContent = `${String(visible.length).padStart(2, "0")} QUESTS`;
}

renderQuests();

$$("#quest-filters button").forEach(button => {
  button.addEventListener("click", () => {
    $$("#quest-filters button").forEach(b => b.classList.toggle("active", b === button));
    renderQuests(button.dataset.filter);
  });
});

questList.addEventListener("click", event => {
  const card = event.target.closest(".quest-card");
  const quest = card && quests.find(q => q.id === card.dataset.quest);
  if (!quest) return;

  openDetail(quest.title, questEyebrow(quest), `
    <div class="modal-content-copy">
      <p><strong>Mission:</strong> ${quest.mission}</p>
      <p><strong>${quest.systemsLabel || "Battle systems"}:</strong></p>
      <ul class="modal-list">
        ${quest.systems.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <p><strong>Stack:</strong> ${quest.tags.join(" · ")}</p>
      <p><strong>Reward:</strong> +${quest.reward} XP</p>
      ${quest.link ? `<p><a class="btn" href="${quest.link[1]}" target="_blank" rel="noopener">${quest.link[0]}</a></p>` : ""}
    </div>
  `);
});

$("#modal-close").addEventListener("click", () => modal.close());

modal.addEventListener("click", event => {
  if (event.target === modal) modal.close();
});

/* ---------------------------------------------------------
   SKILLS
--------------------------------------------------------- */

const skillInfo = {
  PHP: ["PHP", "Core backend language", "LVL 95", "PHP 8.x across Drupal, WordPress and custom backend systems, up to PHP 8.4."],
  Drupal: ["Drupal", "CMS / Application Framework", "LVL 93", "9 years with Drupal 6 through 11: custom modules, themes, migrations, upgrades, APIs and commerce."],
  CiviCRM: ["CiviCRM", "CRM", "LVL 80", "Tender management and event sites built on Drupal 7 + CiviCRM."],
  MySQL: ["MySQL", "Database", "LVL 88", "MySQL / MariaDB and Redis for relational data, caching and application integration."],
  API: ["REST API", "Integrations", "LVL 90", "Custom REST endpoints, JSON:API, OAuth and third-party integrations such as QuickBooks and Zoho."],
  JavaScript: ["JavaScript", "Frontend", "LVL 75", "Interactive interfaces with HTML, CSS, JavaScript and jQuery."],
  SASS: ["SASS", "Styling", "LVL 75", "SASS and Bootstrap for Drupal and WordPress theming."],
  WordPress: ["WordPress", "CMS", "LVL 70", "Custom plugins and themes, where the journey started."],
  React: ["React", "Frontend Framework", "LVL 45", "Current learning path focused on modern component-based UI."],
  PHPUnit: ["PHPUnit", "Testing", "LVL 85", "Kernel tests that keep Drupal backend functionality robust."],
  Cypress: ["Cypress", "Testing", "LVL 80", "End-to-end tests validating Drupal workflows and UI interactions."],
  Solr: ["Solr", "Search", "LVL 80", "Apache Solr with multiple collections integrated through Search API."],
  Stripe: ["Commerce", "Payments", "LVL 85", "Drupal Commerce with Stripe, PayPal and GlobalOne Payment, including recurring subscriptions."],
  Git: ["Git / CI", "Version Control", "LVL 85", "Git on GitHub and GitLab with CI/CD pipelines."],
  Docker: ["Docker", "Development", "LVL 70", "Containerized local development with Docker and DDEV."],
  Lagoon: ["Lagoon", "Hosting", "LVL 65", "Deploying Drupal sites on the Lagoon container platform."],
  n8n: ["n8n", "Automation", "LVL 70", "Workflow automation, e.g. syncing GitLab issue boards with Trello."]
};

$$(".skill-node").forEach(node => {
  node.addEventListener("click", () => {
    const data = skillInfo[node.dataset.skill];
    if (!data) return;
    openDetail(data[0], data[1], `
      <div class="modal-content-copy">
        <p><strong>${data[1]}</strong></p>
        <p>${data[3]}</p>
        <p><strong>Current level:</strong> ${data[2]}</p>
      </div>
    `);
  });
});

/* ---------------------------------------------------------
   INVENTORY
--------------------------------------------------------- */

$$(".item-card").forEach(item => {
  item.addEventListener("click", () => {
    const data = skillInfo[item.dataset.item];
    if (!data) {
      openDetail(item.dataset.item, "EQUIPMENT", `
        <div class="modal-content-copy">
          <p>Custom development equipment / capability used in project work.</p>
        </div>
      `);
      return;
    }

    openDetail(data[0], "EQUIPPED TECHNOLOGY", `
      <div class="modal-content-copy">
        <p><strong>${data[1]}</strong></p>
        <p>${data[3]}</p>
        <p><strong>Level:</strong> ${data[2]}</p>
      </div>
    `);
  });
});

/* ---------------------------------------------------------
   WORLD MAP
--------------------------------------------------------- */

const locations = {
  academy: ["ACADEMY", "EDUCATION / 2013–2016", "The starting chapter: learning the foundations of programming and information technology.", [
    "Bachelor of Computer Application, IT — D.R. B.R. Ambedkar Govt. College, Sri Ganganagar, RJ (2013)",
    "Master of Computer Application, IT — L J Institute of Management Studies, Ahmedabad, GJ (2016)"
  ]],
  softtech: ["SOFTTECH INFOSYS", "PHP DEVELOPER / MAR 2015 – MAY 2016 / AHMEDABAD", "PHP development internship and first professional quests.", [
    "Hands-on experience with WordPress",
    "Custom plugins and themes to extend WordPress functionality"
  ]],
  addweb: ["ADDWEB SOLUTION", "SOFTWARE ENGINEER / JUN 2016 – JUN 2019 / AHMEDABAD", "Entering Drupal territory: full-stack Drupal development, commerce and integrations.", [
    "Drupal 7 → 8 upgrade projects with minimal downtime",
    "Custom modules and themes, front-end theming and back-end implementation",
    "Drupal Commerce with Stripe, GlobalOne Payment and PayPal",
    "OAuth, custom APIs and Drupal Views REST output",
    "Drupal 6 → 8 migrations with custom plugins and Feeds",
    "Invoice integrations with QuickBooks and Zoho"
  ]],
  qed42: ["QED42", "SENIOR DRUPAL DEVELOPER / JUN 2019 – JUL 2022 / PUNE", "Enterprise Drupal: multi-site platforms, performance and major upgrades.", [
    "Multi-site architecture on Acquia Cloud Site Factory",
    "Acquia Content Hub synchronised across sites",
    "Drupal 7 → 8 migration and Drupal 8 → 9 core upgrades",
    "Performance tuning with aggregation and caching",
    "Third-party API integrations",
    "Code and patches contributed to Drupal.org",
    "Earned Acquia Certified Drupal Backend Specialist — Drupal 9 (July 2021)"
  ]],
  codecandy: ["CODECANDY", "FULL STACK DEVELOPER / JUL 2022 – NOW / REMOTE (BRIGHT SOLUTIONS, GERMANY)", "The current chapter: long-running client platforms for Bright Solutions in Germany.", [
    "RESTful JSON APIs and custom REST endpoints in Drupal",
    "PHPUnit kernel tests and Cypress end-to-end tests",
    "Drupal core upgrades 8 → 9 → 10 → 11",
    "Apache Solr with multiple collections via Search API",
    "n8n automation syncing GitLab issue boards with Trello",
    "Refactoring legacy code to modern development practices"
  ]]
};

$$(".map-node").forEach(node => {
  node.addEventListener("click", () => {
    const location = locations[node.dataset.location];
    if (!location) return;

    openDetail(location[0], location[1], `
      <div class="modal-content-copy">
        <p>${location[2]}</p>
        <ul class="modal-list">
          ${location[3].map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `);
  });
});

/* ---------------------------------------------------------
   GENERIC DETAIL MODAL
--------------------------------------------------------- */

function openDetail(title, eyebrow, body) {
  modalEyebrow.textContent = eyebrow;
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  modal.showModal();
}

/* ---------------------------------------------------------
   TOAST
--------------------------------------------------------- */

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

/* ---------------------------------------------------------
   DYNAMIC YEAR
--------------------------------------------------------- */

$("#year").textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   SUBTLE POINTER GLOW
--------------------------------------------------------- */

const root = document.documentElement;

document.addEventListener("pointermove", event => {
  root.style.setProperty("--mouse-x", `${event.clientX}px`);
  root.style.setProperty("--mouse-y", `${event.clientY}px`);
});

/* ---------------------------------------------------------
   IMAGE-FREE AVATAR FALLBACK
   Replace .avatar-large content with an image later.
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  showToast("SYSTEM READY");
});
