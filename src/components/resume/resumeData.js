/* ---------------------------------------------------------
   RESUME CONTENT
   Edit the resume here; the components only handle layout.
--------------------------------------------------------- */

export const name = "MANISH KUMAR";

export const contact = {
  email: "msuthar1994@gmail.com",
  location: "India"
};

/* [title, url] */
export const links = [
  ["PORTFOLIO", "https://msuthars.github.io/"],
  ["DRUPAL PROFILE", "https://www.drupal.org/u/msuthars"]
];

export const education = [
  {
    degree: "Master of Computer Application, Information Technology",
    institution: "L J Institute of Management Studies, Ahmedabad, GJ",
    year: "2016"
  },
  {
    degree: "Bachelor of Computer Application, Information Technology",
    institution: "D.R. B.R. Ambedkar Govt. College, Sri. Ganganagar, RJ",
    year: "2013"
  }
];

export const summary = [
  "Web developer with 11 years of experience, 9 of them spent working with Drupal, from Drupal 6 migrations through to Drupal 11.",
  "Most of my recent work is on long-running client platforms: a document management system for a bank, a genetic diagnostics reporting tool, an environmental credits platform and CiviCRM-based tender and event sites. I build custom modules, APIs and payment flows, and I've taken several large sites through major version upgrades.",
  "I care about code that the next developer can pick up easily, so I write tests (PHPUnit, Cypress), tidy up legacy code as I go and contribute fixes back to Drupal.org."
];

/* Two columns of skills */
export const skills = [
  [
    "PHP (core PHP, Yii, Laravel)",
    "Drupal (7, 8, 9, 10 & 11)",
    "Drupal Upgrades & Migrations",
    "Drupal Commerce & Stripe",
    "CiviCRM",
    "WordPress",
    "REST / JSON:API / OAuth",
    "React (basic)"
  ],
  [
    "PHPUnit & Cypress",
    "Apache Solr / Search API",
    "MySQL / MariaDB & Redis",
    "HTML/CSS/JavaScript, jQuery",
    "SASS & Bootstrap",
    "Docker, DDEV & Lagoon",
    "Git (GitHub/GitLab) & CI/CD",
    "n8n Automation"
  ]
];

export const jobs = [
  {
    dates: "July 2022 - Current",
    title: "CodeCandy - Full Stack Developer, Remote (outsourced to Bright Solutions, Germany)",
    duties: [
      "Developed and integrated RESTful APIs (JSON), including custom REST endpoints in Drupal.",
      "Authored and maintained Kernel tests to ensure robust backend functionality in Drupal.",
      "Built and executed Cypress end-to-end tests to validate Drupal workflows and UI interactions.",
      "Performed Drupal core upgrades across major versions (8 → 9 → 10), ensuring compatibility and stability.",
      "Created custom modules and themes tailored to specific project requirements.",
      "Developed an n8n automation workflow to synchronize GitLab issue boards with Trello, streamlining task management across platforms.",
      "Configured Apache Solr with multiple collections and integrated it with Drupal for advanced search functionality.",
      "Designed intuitive graphical user interfaces, leveraging expertise in serial communication protocols and database structures to enhance User experience.",
      "Refactored and modularized legacy codebase to align with modern development practices, improving maintainability and performance."
    ],
    /* [project, description] */
    projects: [
      ["Banking Document Management (Drupal 11):", "Book/template sync and publishing, LDAP, PDF output and PHPUnit kernel tests."],
      ["Genetic Diagnostics Reporting:", "Upgraded from Drupal 8 to 11 (PHP 8.4), Solr search and JSON:API fixes."],
      ["Environmental Credits Platform (Drupal 10):", "Stripe payments, recurring subscriptions and REST APIs."],
      ["Tender Management Portal (Drupal 7 + CiviCRM):", "Supplier risk register, tender audit and award workflows."],
      ["Event & Conference Sites (Drupal 7 + CiviCRM):", "Presenter listings, abstract submissions and edit locking."]
    ]
  },
  {
    dates: "June 2019 - July 2022",
    title: "QED42 - Senior Drupal Developer, Pune, India",
    duties: [
      "Maintained site configuration integrity and stability through proactive debugging and issue resolution.",
      "Optimized site performance by leveraging Drupal aggregation and caching strategies.",
      "Developed custom modules and themes to extend site functionality and meet project-specific needs.",
      "Migrated content and functionality from Drupal 7 to Drupal 8, ensuring data consistency and feature parity.",
      "Upgraded Drupal core from version 8 to 9, addressing compatibility and deprecation issues.",
      "Integrated third-party APIs to enhance site capabilities and external service connectivity.",
      "Managed multi-site architecture using Acquia Cloud Site Factory, supporting scalable enterprise deployments.",
      "Configured and synchronized Acquia Content Hub across multiple sites to enable centralized content distribution.",
      "Contributed code and patches to the Drupal.org community, supporting open-source development efforts."
    ]
  },
  {
    dates: "June 2016 - June 2019",
    title: "AddWeb Solution - Software Engineer, Ahmedabad, India",
    duties: [
      "Managed upgrade projects for clients transitioning from Drupal 7 to Drupal 8, ensuring smooth migrations and minimal downtime.",
      "Assisted in the development of custom Drupal modules and themes to deliver tailored functionality and design.",
      "Engineered new capabilities and features to enhance existing websites and meet evolving client requirements.",
      "Configured Drupal sites to align with specific customer needs, optimizing usability and performance.",
      "Delivered full-stack Drupal development, including both front-end theming and back-end implementation.",
      "Implemented and customized Drupal Commerce integration, including Stripe, GlobalOne Payment, and PayPal default plugins.",
      "Worked extensively with APIs—integrated OAuth, built custom APIs, and leveraged Drupal Views for RESTful output.",
      "Executed complex data migrations using default and custom plugins, including migrations from Drupal 6 to 8 and Feeds module integration.",
      "Integrated invoice listings with third-party systems such as QuickBooks and Zoho for seamless financial data management."
    ]
  },
  {
    dates: "March 2015 - May 2016",
    title: "SoftTech Infosys - PHP Developer, Ahmedabad, India",
    duties: [
      "Completed a PHP development internship.",
      "Gained hands-on experience with WordPress.",
      "Developed custom plugins and themes to extend WordPress functionality and enhance site design."
    ]
  }
];

export const certifications = ["Acquia Certified Drupal Backend Specialist - Drupal 9 (July 2021)"];

export const activities = ["Music", "Football", "Gaming"];

export const languages = ["English", "Hindi", "Gujarati", "Marwari"];
