# LINSY BPS Mall · Web Product List Demo

Static HTML/CSS/JS prototype of the BPS mall **WEB product listing page**, aligned with design specs (grid list + filter list).

## Preview

**Double-click `index.html`** to open locally. CSS and JavaScript are inlined, so it works even under Chinese folder paths or `file://` without a local server.

For GitHub Pages, deploy the repo root; `index.html` is the entry.

| View | URL hash |
|------|----------|
| 5-column grid list (logged-in) | `#/simple` |
| 4-column list with filters | `#/filter` |

Use the floating toolbar (top-right) to switch views.

## Files

| File | Description |
|------|-------------|
| `index.html` | Entry page |
| `styles.css` | Layout & component styles |
| `app.js` | Page render & interactions |
| `data.js` | Mock categories & products |

## Features

- Top utility bar, header nav, category shortcut bar
- Product cards: thumbnails, +N badge, price, Est. Del, MOQ, Item, wishlist
- Filter panel: Label, Price, MOQ, Delivery Time, Material, Size
- Sort: Listing Date, Price, Delivery Time, Sales
- Pagination
- Site footer

## Notes

- Mock data only; no backend API
- Product images load from Unsplash CDN (network required)
- Based on BPS search list API: `/web/es/searchengine/find.json`

## License

Internal demo / design reference. Adjust before public use.
