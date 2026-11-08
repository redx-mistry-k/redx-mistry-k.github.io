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

## Run locally

The portfolio is static. Clone the repository and serve its root directory with any local HTTP server:

```bash
git clone https://github.com/redx-mistry-k/redx-mistry-k.github.io.git
cd redx-mistry-k.github.io
python -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/) for the portfolio or [http://localhost:8000/fun-projects.html](http://localhost:8000/fun-projects.html) for the project directory. Some standalone tools load libraries or fonts from external CDNs and need an internet connection. The `clashviewer/` Express app has its own [`package.json`](clashviewer/package.json) and is separate from this static-site setup.

## GitHub Pages deployment

The site files are at the repository root. To publish this layout, select **Settings → Pages → Build and deployment → Deploy from a branch**, then choose `main` and `/(root)` as the publishing source. GitHub Pages publishes that folder after changes are pushed to the selected branch; there is no site build command in this repository.

The root [`CNAME`](CNAME) contains `krishnaanalytics.in`. The same domain must also be configured in the repository's Pages settings, with the appropriate DNS records at the domain provider. See GitHub's guides for [publishing from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Google Search Console

After the site is deployed and the domain resolves:

1. Add `krishnaanalytics.in` as a **Domain property** in [Google Search Console](https://search.google.com/search-console/) and verify ownership with the DNS TXT record Google provides.
2. Confirm that `https://krishnaanalytics.in/robots.txt` and `https://krishnaanalytics.in/sitemap.xml` load, then submit `sitemap.xml` in Search Console's **Sitemaps** report.
3. Use **URL Inspection** to check the homepage and project directory. Monitor **Pages** for indexing issues and **Performance** for search queries and clicks. Submission helps discovery but does not guarantee indexing or rankings.

## Contact

[Email](mailto:vkrishnaanand@gmail.com) · [Alternative email](mailto:vkrishnaanand@icloud.com) · [LinkedIn](https://www.linkedin.com/in/vkrishnaanand/) · [GitHub](https://github.com/redx-mistry-k)
