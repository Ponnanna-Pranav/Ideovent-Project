# Blog Listing App (Vanilla JS)

A lightweight, responsive blog listing + details app that loads posts from a static JSON file.

## Features
- Listing page with thumbnail, title, description, categories, and "Read More"
- Detail page with full content
- Static data from `data/blogs.json`
- Responsive UI with CSS Grid/Flex
- Bonus: search + category & tag filters

## Getting started
Just open `index.html` in your browser. No build step, no dependencies.

## Structure
```
.
├─ index.html          # Listing page
├─ blog.html           # Details page
├─ css/styles.css
├─ js/app.js           # Listing logic + filters
├─ js/detail.js        # Post details page logic
├─ data/blogs.json     # Static content (edit this file to add posts)
└─ assets/img/*        # Thumbnails (editable)
```

## Add a blog
Add a new object inside the `blogs` array in `data/blogs.json`:
```json
{
  "id": 5,
  "title": "Title",
  "description": "Short description",
  "author": "Your Name",
  "date": "2025-08-19",
  "thumbnail": "assets/img/your-image.jpg",
  "categories": ["Category"],
  "tags": ["tag1", "tag2"],
  "content": "<p>Your HTML content here.</p>"
}
```
Make sure the `id` is unique. Add your thumbnail under `assets/img/`.

## Notes
- Thumbnails are simple SVG placeholders saved with `.jpg` extension for convenience; replace them with real images if you like.
- All content is client-side; works from `file://` but some browsers restrict `fetch` of local files. If you face issues, serve with a local server, e.g.:
  - Python 3: `python -m http.server 8000`
  - Node: `npx serve`
Then visit `http://localhost:8000/` and open `index.html`.
