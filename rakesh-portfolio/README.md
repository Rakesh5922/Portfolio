# Vallepu Rakesh — Portfolio

A single-page portfolio built with React, Tailwind CSS, and lucide-react.
Dark "neon" theme (slate-950 base, cyan/emerald accents), a typewriter role
line, an animated node-network hero background (a nod to the FAISS/embedding
work in CineMatch), a filterable skills section, a project grid, and a
contact panel that opens a pre-filled email.

## Project structure

```
rakesh-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx          # the whole page
    ├── index.css        # Tailwind directives
    └── assets/
        └── avatar.jpg   # your profile photo
```

## Option A — Run it with Vite (recommended, fastest)

This project is already wired for Vite. From this folder:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). To build for
production:

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

The build output lands in `dist/` — deploy that folder to Netlify, Vercel,
GitHub Pages, or any static host.

## Option B — Start fresh with Create React App

If you'd rather use CRA instead of the Vite scaffold above:

```bash
npx create-react-app rakesh-portfolio
cd rakesh-portfolio
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

Then:
1. Replace the generated `tailwind.config.js` with the one in this folder
   (just the `content` array matters — point it at `./src/**/*.{js,jsx}`).
2. Replace `src/index.css` with the one here (the three `@tailwind` lines).
3. Copy `src/App.jsx` and `src/assets/avatar.jpg` into your CRA `src/`
   folder, overwriting the generated `App.js`.
4. In `src/index.js` (CRA's entry point), import `./App.jsx` instead of
   `./App` and make sure `./index.css` is imported above it.
5. `npm start`.

## Swapping the profile photo

Drop a new square-ish image in `src/assets/` and update the import at the
top of `App.jsx`:

```js
import avatarImg from "./assets/avatar.jpg";
```

## Notes

- All copy (bio line, project descriptions, section headers) can be edited
  directly in `App.jsx` — the content for skills, stats, projects, and
  certifications lives in a few arrays near the top of the file
  (`STATS`, `SKILL_GROUPS`, `PROJECTS`, `CERTS`), so updating a project or
  adding a new one doesn't require touching the layout code.
- The contact "form" has no backend — Send opens the visitor's email client
  with the message pre-filled (`mailto:`), since a static site has nowhere
  to send form submissions without a service like Formspree or a serverless
  function. Swap in one of those if you want real inbox delivery without a
  mail-client handoff.
- The 4th project (SportsMatrix) shows a "Repo pending" badge in place of
  links — add `live` / `repo` URLs in the `PROJECTS` array once they exist.
