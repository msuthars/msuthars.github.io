# MANISH.DEV — Developer RPG

The portfolio of **Manish Kumar**, Full Stack Drupal Developer (11 years, 9 with Drupal — from Drupal 6 migrations through Drupal 11).
It's a static HTML/CSS/JavaScript site built around a modern game HUD: the resume becomes a character sheet, and projects become quests.

## Run

No build process is required.

Open:

    index.html

Or use a local server:

    python3 -m http.server 8080

Then visit:

    http://localhost:8080

## Sections

| # | Section      | Contents                                                                  |
|---|--------------|---------------------------------------------------------------------------|
| 1 | Character    | Profile, photo, experience, education, languages, summary and stats       |
| 2 | Quest Log    | Portfolio projects, filterable by company; click a card for details       |
| 3 | Skill Tree   | Skills grouped into Backend, Frontend, Quality and Tools                  |
| 4 | World Map    | Career journey: Academy → SoftTech → AddWeb → QED42 → CodeCandy          |
| 5 | Inventory    | Technologies in use                                                       |
| 6 | Achievements | Acquia certification, Drupal.org contributions and other milestones       |
| 7 | Join Party   | GitHub, LinkedIn, Drupal.org and email                                    |

Keys `1`–`7` jump between sections, and `Esc` closes the detail modal.

## Project structure

    index.html               Page markup and static content
    css/style.css            Visual design
    js/app.js                Boot screen, navigation, quest/skill/map data and modals
    assets/avatar/manish.png Profile photo

## Customize

### Personal information
Edit `index.html` (Character, Inventory, Achievements and contact sections).

### Projects (Quest Log)
Projects live in the `quests` array in `js/app.js` and are rendered into the Quest Log at runtime. Each entry looks like:

    {
      id: "banking-dms",
      guild: "codecandy",          // codecandy | qed42 | addweb | softtech | null
      type: "MAIN QUEST",          // MAIN / BOSS / SIDE / TUTORIAL / CURRENT QUEST
      title: "BANKING DOCUMENT MANAGEMENT",
      summary: "Shown on the card.",
      tags: ["DRUPAL 11", "PHP 8"],
      reward: 3000,                // XP shown on the card
      mission: "Shown in the detail modal.",
      systems: ["Bullet points in the detail modal"],
      active: true,                // optional: marks it as the current quest
      link: ["LABEL", "https://…"] // optional: button in the detail modal
    }

`guild` drives the company filter buttons. To add a new company, add it to `guilds` in `js/app.js` and add a matching filter button in `index.html`.

### Skills and inventory details
The text shown when you click a skill or inventory item comes from `skillInfo` in `js/app.js`, keyed by the element's `data-skill` / `data-item` attribute.

### Career journey
The World Map details come from `locations` in `js/app.js`, keyed by each map node's `data-location`.

### Avatar
Replace `assets/avatar/manish.png` (square image recommended). It appears as a round photo on the Character page and in the top bar.

### Visual design
Edit `css/style.css`. Colors and fonts are defined as variables in `:root`.

## Notes

This is intentionally dependency-light. It uses plain HTML, CSS and JavaScript so the visual concept can later be migrated to React/Vite without changing the information architecture.
