/* =========================================================
   MANISH.DEV — PORTFOLIO CONTENT
========================================================= */

export const sections = [
  { id: "character", label: "CHARACTER" },
  { id: "quests", label: "QUEST LOG" },
  { id: "skills", label: "SKILL TREE" },
  { id: "world", label: "WORLD MAP" },
  { id: "inventory", label: "INVENTORY" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "contact", label: "JOIN PARTY" }
];

export const bootMessages = [
  "Loading player profile",
  "Loading skill matrix",
  "Loading quest database",
  "Loading world map",
  "Loading achievements",
  "Synchronizing systems"
];

/* ---------------------------------------------------------
   CHARACTER
--------------------------------------------------------- */

export const profile = [
  ["EXPERIENCE", "11 YEARS"],
  ["DRUPAL", "9 YEARS / D6 → D11"],
  ["CURRENT GUILD", "CODECANDY"],
  ["LOCATION", "INDIA / REMOTE"],
  ["EDUCATION", "MCA, 2016"],
  ["LANGUAGES", "EN / HI / GU / MARWARI"]
];

export const quickTags = ["PHP 8", "DRUPAL 11", "CIVICRM", "SOLR", "PHPUNIT", "CYPRESS", "DOCKER"];

export const stats = [
  ["PHP", 95],
  ["DRUPAL", 93],
  ["REST / JSON:API", 90],
  ["MYSQL / MARIADB", 88],
  ["TESTING", 84],
  ["CIVICRM", 80],
  ["JAVASCRIPT", 75],
  ["REACT", 45]
];

/* ---------------------------------------------------------
   QUESTS (PORTFOLIO PROJECTS)
--------------------------------------------------------- */

export const guilds = {
  codecandy: "CODECANDY / BRIGHT SOLUTIONS · 2022–NOW",
  qed42: "QED42 · 2019–2022",
  addweb: "ADDWEB SOLUTION · 2016–2019",
  softtech: "SOFTTECH INFOSYS · 2015–2016"
};

export const questFilters = [
  ["all", "ALL"],
  ["codecandy", "CODECANDY"],
  ["qed42", "QED42"],
  ["addweb", "ADDWEB"],
  ["softtech", "SOFTTECH"]
];

export const quests = [
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

export function questEyebrow(quest) {
  return `${quest.type} / ${quest.active ? "ACTIVE" : guilds[quest.guild]}`;
}

/* ---------------------------------------------------------
   SKILLS & INVENTORY
--------------------------------------------------------- */

export const skillInfo = {
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

/* [skill key, label, level, learning?] */
export const skillTree = [
  ["BACKEND", [
    ["PHP", "PHP 8", 95],
    ["Drupal", "DRUPAL", 93],
    ["CiviCRM", "CIVICRM", 80],
    ["MySQL", "MYSQL", 88],
    ["API", "REST API", 90]
  ]],
  ["FRONTEND", [
    ["JavaScript", "JAVASCRIPT", 75],
    ["SASS", "SASS", 75],
    ["WordPress", "WORDPRESS", 70],
    ["React", "REACT", 45, true]
  ]],
  ["QUALITY", [
    ["PHPUnit", "PHPUNIT", 85],
    ["Cypress", "CYPRESS", 80],
    ["Solr", "SOLR", 80]
  ]],
  ["TOOLS", [
    ["Git", "GIT / CI", 85],
    ["Docker", "DOCKER", 70],
    ["Lagoon", "LAGOON", 65],
    ["n8n", "N8N", 70]
  ]]
];

/* [skill key, icon, label, level] */
export const inventory = [
  ["PHP", "PHP", "PHP 8", 95],
  ["Drupal", "DRP", "DRUPAL", 93],
  ["API", "API", "REST API", 90],
  ["MySQL", "SQL", "MYSQL", 88],
  ["PHPUnit", "PU", "PHPUNIT", 85],
  ["Git", "GIT", "GIT / CI", 85],
  ["Stripe", "$", "COMMERCE", 85],
  ["CiviCRM", "CRM", "CIVICRM", 80],
  ["Solr", "SLR", "SOLR", 80],
  ["Cypress", "CY", "CYPRESS", 80],
  ["JavaScript", "JS", "JAVASCRIPT", 75],
  ["SASS", "CSS", "SASS", 75],
  ["Docker", "D", "DOCKER", 70],
  ["n8n", "N8N", "N8N", 70],
  ["WordPress", "WP", "WORDPRESS", 70],
  ["React", "R", "REACT", 45]
];

/* ---------------------------------------------------------
   WORLD MAP
--------------------------------------------------------- */

/* [location key, css class, years, name, role] */
export const mapNodes = [
  ["academy", "origin", "2013–2016", "ACADEMY", "BCA / MCA"],
  ["softtech", "php", "2015–2016", "SOFTTECH", "PHP DEVELOPER"],
  ["addweb", "drupal", "2016–2019", "ADDWEB", "SOFTWARE ENGINEER"],
  ["qed42", "api", "2019–2022", "QED42", "SENIOR DRUPAL DEV"],
  ["codecandy", "current", "2022–NOW", "CODECANDY", "FULL STACK DEV"]
];

export const locations = {
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

/* ---------------------------------------------------------
   ACHIEVEMENTS & CONTACT
--------------------------------------------------------- */

/* [unlocked?, label, title, description] */
export const achievements = [
  [true, "UNLOCKED / JULY 2021", "ACQUIA CERTIFIED", "Acquia Certified Drupal Backend Specialist — Drupal 9."],
  [true, "UNLOCKED", "OPEN SOURCE CONTRIBUTOR", "Contributed code and patches back to the Drupal.org community."],
  [true, "UNLOCKED", "LEGACY SURVIVOR", "Migrated and upgraded sites all the way from Drupal 6 to Drupal 11."],
  [true, "UNLOCKED", "API MASTER", "Built REST and JSON:API endpoints, OAuth flows and QuickBooks / Zoho integrations."],
  [true, "UNLOCKED", "TEST GUARDIAN", "Wrote PHPUnit kernel tests and Cypress end-to-end suites for Drupal workflows."],
  [true, "UNLOCKED", "PAYMENT PALADIN", "Integrated Stripe, PayPal and GlobalOne payments plus recurring subscriptions."],
  [false, "LOCKED", "REACT MASTER", "Achievement currently being unlocked."],
  [false, "LOCKED", "FINAL BOSS", "There is always another problem to solve."]
];

export const contactLinks = [
  ["GITHUB", "https://github.com/msuthars"],
  ["LINKEDIN", "https://www.linkedin.com/in/msuthars/"],
  ["DRUPAL.ORG", "https://www.drupal.org/u/msuthars"]
];

export const email = "msuthar1994@gmail.com";

export const resume = {
  page: `${import.meta.env.BASE_URL}resume/`,
};
