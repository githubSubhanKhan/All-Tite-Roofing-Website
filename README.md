# All-Tite Roofing — pitch landing page

Static, dependency-free landing page (HTML + CSS + vanilla JS). Open `index.html` in any browser.

```
alltite-landing/
├── index.html
├── css/style.css
├── js/main.js
├── fonts/archivo-variable.woff2   (self-hosted, SIL Open Font License)
├── images/
│   ├── logo.svg, favicon.svg      (included)
│   ├── hero.jpg, commercial.jpg, craft.jpg   ← AI-generated, run the download script
│   └── projects/                  ← All-Tite's own project photos, run the download script
├── download-images.ps1   (Windows)
└── download-images.sh    (macOS / Linux)
```

## 1. Put the images in place (one step)

The three AI images were generated in our Bloom workspace and the gallery uses
All-Tite's real project photos from their current site. Run once from this folder:

- Windows: `powershell -ExecutionPolicy Bypass -File .\download-images.ps1`
- macOS/Linux: `bash download-images.sh`

If a Bloom download fails (it may need you to be logged in), open the link the
script prints, save the image, and name it exactly as shown:

| File | Bloom image |
|---|---|
| images/hero.jpg | https://www.trybloom.ai/img/955ac721-44ab-4e3b-8e7e-1ee137bb4b5c |
| images/commercial.jpg | https://www.trybloom.ai/img/46472634-09ac-410f-9ce0-d0d406c4e3e7 |
| images/craft.jpg | https://www.trybloom.ai/img/a753c6ed-b96e-4ba6-b2bb-5add50f302ac |

Until then, every `<img>` falls back to its online source automatically, so the page still works when demoed online.

## 2. What's on the page

Gable-shaped hero with copper drip edge, services, 85% first-visit leak-fix proof,
5-step process, differentiators, swipeable project gallery with lightbox,
testimonials, FAQ accordion, 3-step estimate form with validation, map, sticky
mobile call bar, LocalBusiness (RoofingContractor) schema and real meta description.

## 3. Before going live

- Connect the form: `js/main.js` → `submit()` has a TODO (Formspree, Netlify Forms, or the client's CRM).
- Replace testimonials with verified Google reviews, and add the NYS / Nassau County license number to the footer.
- Swap stock/AI imagery for more real job photos as the client supplies them.
