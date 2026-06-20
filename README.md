# Clearwater Capital Group — Website

The public marketing site for Clearwater Capital Group Inc (mortgage lending and commercial real estate finance).

This is a **static, multi-page site with no build step**. Each page is its own real HTML file with its own URL (good for SEO and sharing). Shared styling and behavior live in one `styles.css` and one `app.js`, so you edit them once and every page updates.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page |
| `mortgage.html` | Mortgage Lending page |
| `commercial.html` | Commercial Real Estate page |
| `resources.html` | Learning Center / guides |
| `about.html` | About page |
| `contact.html` | Contact & apply page |
| `styles.css` | All site styling (shared by every page) |
| `app.js` | All site behavior — nav, menus, calculators, FAQs (shared) |
| `404.html` | Branded "page not found" page |
| `robots.txt` | Lets search engines crawl the site |
| `.gitignore` | Keeps OS junk files out of the repo |

After launch your URLs will look like:
`yourdomain.com/`, `yourdomain.com/mortgage.html`, `yourdomain.com/commercial.html`, etc.

## Editing

Open any file in a text editor — nothing to install or compile.
- **Change wording/images on a page:** edit that page's `.html` file (each page's images are embedded directly in it).
- **Change colors, fonts, spacing:** edit `styles.css` once; it applies everywhere.
- **Change menus, calculators, FAQs:** edit `app.js` once; it applies everywhere.

To preview locally, run a simple server (opening the files directly also works, but a server best matches production):
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## The application link

Every "Apply" / "Get pre-approved" button points to the secure application portal:
`https://1969887.myarive.com`
If that URL changes, search-and-replace `1969887.myarive.com` across the `.html` files.

## Deploying (Cloudflare Pages)

Connect this GitHub repo to Cloudflare Pages. Leave the build command **empty** and set the output directory to `/`. Every push to `main` publishes automatically. Full step-by-step is in the deploy guide that came with these files.

## Before launch

- [ ] Wire the **Contact form** (`contact.html`) to a real destination — it currently shows a demo confirmation. The application buttons already work via the portal link above.
- [ ] Add your custom domain in the Cloudflare Pages dashboard.
- [ ] (Optional) Add `og:url` and `og:image` tags in each page's `<head>` once the domain is live, for richer social link previews.
