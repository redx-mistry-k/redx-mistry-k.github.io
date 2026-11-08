# Krishnaanand Vijayakumar — Portfolio

Portfolio website for my work in data analysis, business intelligence, and automation. It brings together professional case studies, independent software projects, and small browser-based tools.

**Website:** [krishnaanalytics.in](https://krishnaanalytics.in/) · **Project directory:** [Browse the tools](https://krishnaanalytics.in/fun-projects.html) · **Résumé:** [Download PDF](resume.pdf)

## What you will find

- **Selected work:** case studies covering document search, SQL analytics, data migration, reporting, and workflow automation.
- **Professional background:** experience, education, and technical skills, with contact details for recruiters and collaborators.
- **Browser tools:** a searchable, filterable directory of games, everyday utilities, data tools, and work helpers. The directory is implemented in [`fun-projects.html`](fun-projects.html) and [`fun-projects.js`](fun-projects.js).

## Selected projects

The portfolio features these independent projects. Their application code lives outside this website repository unless indicated otherwise.

| Project | What it does | Link |
| --- | --- | --- |
| **DocWise AI** | Answers questions over uploaded documents using hybrid retrieval and source citations. | [Source repository](https://github.com/redx-mistry-k/docwise-ai) |
| **QueryMind AI** | Turns natural-language questions into reviewable SQL, applies read-only validation, and displays results as tables and charts. | [Source repository](https://github.com/redx-mistry-k/querymind-ai) |
| **MigrateIQ** | Portfolio case study for a data-migration workflow with validation, checkpoints, and reconciliation. | [Read the case study](https://krishnaanalytics.in/#migrateiq) |

### Tools in this repository

| Tool | What it does | Try it | Source |
| --- | --- | --- | --- |
| **JSON Superviewer** | Opens JSON as an editable table with search, column filters, and export options. | [Open tool](https://krishnaanalytics.in/jsonviewer/v3.html) | [`jsonviewer/v3.html`](jsonviewer/v3.html) |
| **Excel to Grouped JSON** | Groups rows from an `.xlsx` file by a selected column and exports the grouped data. | [Open tool](https://krishnaanalytics.in/excelToJson/v2.html) | [`excelToJson/v2.html`](excelToJson/v2.html) |
| **SPURL** | Builds SharePoint links with multiple filters and saves frequently used URLs in the browser. | [Open tool](https://krishnaanalytics.in/spurl/) | [`spurl/index.html`](spurl/index.html) |
| **BudgetFlow** | Tracks income and expenses and visualizes spending in the browser. | [Open tool](https://krishnaanalytics.in/monthlyBudget/) | [`monthlyBudget/index.html`](monthlyBudget/index.html) |
| **Crack the Code** | Four-digit code-breaking game with feedback and a two-player mode. | [Open game](https://krishnaanalytics.in/ccgame/) | [`ccgame/index.html`](ccgame/index.html) |

The [full project directory](fun-projects.html) contains the rest of the browser projects.

## Technologies

**Website and browser tools:** HTML, CSS, and vanilla JavaScript. Individual tools use browser APIs such as local storage and file handling; the Excel converter loads SheetJS from a CDN. The main portfolio and directory have no root-level build step.

**Skills presented in the portfolio:** SQL, Python, SQLite, PostgreSQL, Power BI, Excel, Power Apps, Power Automate, and SharePoint. These are described through the site's professional case studies and linked projects; they are not all dependencies of this static website.

This repository also contains a separate Node.js/Express app in [`clashviewer/`](clashviewer/) and compiled Flutter web assets in [`eventpilot/`](eventpilot/). GitHub Pages serves their static files but does not run the Express server.

## Repository structure

| Path | Purpose |
| --- | --- |
| [`index.html`](index.html) | Portfolio homepage and selected-work case studies |
| [`portfolio.css`](portfolio.css), [`styles.css`](styles.css), [`styles.js`](styles.js) | Homepage art direction, directory styles, and shared navigation |
| [`fun-projects.html`](fun-projects.html), [`fun-projects.css`](fun-projects.css), [`fun-projects.js`](fun-projects.js) | Searchable project directory |
| Project folders such as [`jsonviewer/`](jsonviewer/), [`spurl/`](spurl/), and [`monthlyBudget/`](monthlyBudget/) | Standalone tools and experiments |
| [`CNAME`](CNAME) | Custom domain name for GitHub Pages |
| [`robots.txt`](robots.txt), [`sitemap.xml`](sitemap.xml) | Search crawler guidance for the portfolio pages |
| [`resume.pdf`](resume.pdf) | Downloadable résumé |


## Contact

[Email](mailto:vkrishnaanand@gmail.com) · [Alternative email](mailto:vkrishnaanand@icloud.com) · [LinkedIn](https://www.linkedin.com/in/vkrishnaanand/) · [GitHub](https://github.com/redx-mistry-k)
