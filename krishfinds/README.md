# KrishFinds

A complete static editorial affiliate website. Open index.html to preview, or upload this entire folder to the krishfinds directory on krishnaanalytics.in. No build tools, dependencies or backend are needed. Relative links work under /krishfinds/.

## Editing
- Shared appearance: css/style.css.
- Product catalogue, affiliate URLs and search: js/app.js. Replace each affiliateUrl of # with your genuine Associates URL; the script updates matching buttons throughout the site. Static HTML contains fallback buttons and replacement comments as well.
- Add a product to the array for search. The latest section automatically uses the last three entries. Add static cards to the relevant category pages and recommendations to relevant articles, then update the locations mapping for a direct search link.
- Add a guide by copying article-weekend-trip.html. Update title, metadata, canonical, dates, schema, table of contents, recommendation sections and related guides. Add its card to guides.html and the relevant category/homepage, and add its search entry to js/app.js.
- Categories are explicit in HTML and data-category attributes. Keep those and filter button values consistent.
- All SVG artwork is original neutral placeholder artwork, not actual product imagery. Replace with your own or appropriately licensed assets; update alt text and image dimensions. assets/images/weekend-pin.svg is the 1000 × 1500 Pinterest placeholder.
- Contact and social details are deliberately unset. Add actual public contact/profile details before launch. The newsletter deliberately never submits or stores emails.
- Privacy and terms describe the static implementation; update these for your final hosting and services. No analytics, trackers, fonts or third-party requests are included.
- Dates are sample editorial dates. Confirm factual content, affiliate programme membership/disclosure, links and any testing claims before publication. The budget tech guide explicitly does not assert current prices.

## Navigation
index.html is the editorial homepage; home.html is the Home Finds category. All six topic pages and six complete guides are included, plus a guide library and informational pages. The homepage prioritises articles, then categories and the creator note, before product recommendations.

## Progressive enhancement
The homepage, guides, categories and recommendation content render without JavaScript. JavaScript adds search, filtering, mobile navigation, latest finds, newsletter status, share/copy and back-to-top controls. Affiliate buttons with # show a coming-soon message when JavaScript is enabled. No sample button points to an invented retailer URL.

## SEO and Pinterest
- sitemap.xml lists all 19 canonical HTML pages using the planned production domain. No unverified last-modified dates are included.
- IMPORTANT: robots.txt must be served at https://krishnaanalytics.in/robots.txt, not just /krishfinds/robots.txt. If your main site already has a robots.txt, preserve its existing directives and merge the Sitemap line. Check that existing rules do not block /krishfinds/.
- Each of the six articles includes Open Graph and Twitter image metadata plus an Article schema image, pointing to its own 1000 × 1500 PNG cover. Editable SVG originals are in assets/images alongside the PNGs.
- Each article displays its cover with a download link and descriptive Pinterest image attributes.
- The About, Contact, Privacy and Terms descriptions are page-specific and synchronized with their social descriptions.
- Upload the complete folder before sharing: social crawlers cannot access file:// previews. Metadata uses https://krishnaanalytics.in/krishfinds/; update absolute URLs if the domain or path changes.
- After uploading, submit the sitemap through your search-engine webmaster account. No live submission or indexing verification has been performed.
