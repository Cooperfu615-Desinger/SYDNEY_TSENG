# Sydney Tseng Portfolio - Project Handoff

Last updated: 2026-04-27
Project path: `/Users/cooperfu/Desktop/SYDNEY_TSENG`
GitHub repo: `https://github.com/Cooperfu615-Desinger/SYDNEY_TSENG`
Current branch: `main`

## Project Summary

This is Sydney Tseng's personal portfolio website for sound design work in games and digital experiences.

The current direction is a high-contrast editorial site with black-and-white photography, electric-blue handwritten doodles, playable audio, a Sound Lab, and separate desktop/mobile compositions. The site is implemented as a Vite + React app and is configured for GitHub Pages under the `/SYDNEY_TSENG/` base path.

## Current Tech Stack

- Vite 6
- React 19
- Plain CSS in `src/styles.css`
- Framer Motion for modal and drawn doodle animation
- Howler.js for audio playback
- Embla Carousel for Selected Works
- Lucide React for UI icons
- GitHub Actions + GitHub Pages for deployment

Useful commands:

```bash
npm install
npm run dev
npm run build
npm run preview
git status
git log --oneline -8
```

Local dev URL:

```txt
http://localhost:5173/SYDNEY_TSENG/
```

GitHub Pages URL:

```txt
https://cooperfu615-desinger.github.io/SYDNEY_TSENG/
```

## Deployment Status

GitHub Pages deployment has been set up.

Important files:

- `vite.config.js`
  - Uses `base: "/SYDNEY_TSENG/"`
- `.github/workflows/deploy.yml`
  - Builds with Node 22
  - Runs `npm ci`
  - Runs `npm run build`
  - Copies `dist/index.html` to `dist/404.html` for SPA route fallback
  - Deploys `dist` with `actions/deploy-pages@v4`
- `src/utils/assets.js`
  - `assetPath()` handles public asset paths with `import.meta.env.BASE_URL`
  - `appPath()` handles internal links with the same base path

If the live page does not update after a push, check GitHub Actions first, then GitHub repo Settings -> Pages and confirm the source is GitHub Actions.

## Current File Structure

```txt
SYDNEY_TSENG/
  .github/
    workflows/
      deploy.yml
  .gitignore
  PROJECT_HANDOFF.md
  index.html
  package.json
  package-lock.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    styles.css
    data/
      siteData.js
    utils/
      assets.js
  public/
    audio/
      1-bubble_bobble.wav
      3-japanese_artist_collab.mp3
      4-thailand-exclusive-songkran-festival.mp3
    images/
      sydney-tseng-logo.png
      hero/
        main.png
      about/
        about_me.jpeg
        side.jpeg
      doodles/
        globe-smile.svg
        header-spark.svg
        sydney-tseng.svg
        tool-curiosity-smile.svg
        tool-logic-wave.svg
        tool-openai.svg
      works/
        dancing-queen-cover.png
        wings-of-desire-cover.png
        tequila-shots-cover.png
        saturday-event-djs-cover.png
    video/
      jk8-commercial.mov
```

`dist/` and `node_modules/` are local generated folders and are ignored by Git.

## Routing

The app uses a lightweight route helper in `src/App.jsx`:

- `/SYDNEY_TSENG/` shows the home page.
- `/SYDNEY_TSENG/about` shows the About page.

This is not React Router. If future sessions add more pages, keep the existing `getRoute()`, `appPath()`, and GitHub Pages fallback behavior in mind.

## Implemented Home Page

### Header

- Brand: `Sydney Tseng`
- Desktop nav: Work, About, Sound Lab, Contact
- Mobile nav: star icon plus menu button
- Menu overlay on mobile
- Header star uses `public/images/doodles/header-spark.svg`

### Hero

- Main image: `public/images/hero/main.png`
- Current image is a square-ish optimized/cropped version for better responsive behavior.
- Hero has a desktop composition and a separate mobile composition through CSS.
- The design allows some vertical crop on Hero so the layout can scale more consistently.
- Left text and right portrait are meant to keep the same visual relationship instead of reflowing into unrelated stacked blocks.
- Hero handwritten assets:
  - `Go classy!`
  - `Scroll down`
  - `Sydney Tseng` signature image using `public/images/doodles/sydney-tseng.svg`
- The previous `SIGNATURE SOUND` circle has been removed from the Hero.

### Selected Works

Data lives in `src/data/siteData.js`.

Current cards:

1. Bubble Bobble
   - Text: `8-bit sound system under strict brand constraints.`
   - Play button audio: `/audio/1-bubble_bobble.wav`
2. Branded Audio Experience
   - Text: `Full audio system aligned with brand identity.`
   - Play button audio: `/audio/3-japanese_artist_collab.mp3`
3. Experimental Exhibition Sound
   - Text: `Abstract sound design balancing tension and texture.`
   - No dedicated audio was requested yet, so it still opens the video modal.
4. Festival-Inspired Soundscape
   - Text: `Thai-inspired music shaped by local sound culture.`
   - Play button audio: `/audio/4-thailand-exclusive-songkran-festival.mp3`

Notes:

- Cards use Embla Carousel on desktop.
- The `Tap to play` doodle sits above the cards.
- Play buttons with audio use Howler and show an active blue state.
- Only one audio item plays at a time.
- `jk8-commercial.mov` is still available as a placeholder video for modal behavior.

### Sound Lab

The Sound Lab currently has three category cards:

- Click / Spin
- Reward
- Transition

The older sample-row list was removed from the visible layout. The current mobile design emphasizes the three large cards and a `More sounds` prompt. The audio engine still supports sample playback and the category data remains in `src/data/siteData.js` for future expansion.

### Home About Preview

- Uses `public/images/about/side.jpeg`
- Rotated polaroid treatment
- Button links to `/about`
- Current copy:
  - `I'm a sound designer who loves turning ideas into feelings...`

### Footer

- Contact copy:
  - `sydneytseng.sound@gmail.com`
  - `@sydneytseng.sound`
  - `Taipei, Taiwan`
- Globe/smile doodle uses `public/images/doodles/globe-smile.svg`
- Footer appears on both home and About page.

## Implemented About Page

Route:

```txt
/SYDNEY_TSENG/about
```

Main asset:

```txt
public/images/about/about_me.jpeg
```

The page follows the provided About mockup:

- Back link
- Large `ABOUT ME` heading
- Intro copy from the reference image
- Polaroid-style central portrait
- `TOOLS & WEAPONS`
- `I WORK ON`
- `MY APPROACH`
- `CURRENTLY`
- Footer contact

Tools & Weapons icons are now SVG files:

- Logic Pro X: `public/images/doodles/tool-logic-wave.svg`
- AI: `public/images/doodles/tool-openai.svg`
- Curiosity :P: `public/images/doodles/tool-curiosity-smile.svg`

Footer globe on the About page uses the same `globe-smile.svg` as the home page.

## Current Visual / UX Direction

Important product/design decisions made during the session:

- Mobile and desktop are allowed to have different compositions instead of forcing one responsive layout to solve every viewport.
- Hero may crop slightly vertically to preserve the intended composition.
- Doodles that were hard to draw cleanly in CSS have started moving to authored SVG assets.
- The design should keep the handmade, sound-designer personality, but use real SVG/PNG assets for key doodles when consistency matters.
- Avoid adding marketing-style sections. The first screen should feel like the actual portfolio experience.

## Main Optimization Work Already Completed

- Added `/about` page.
- Wired home nav About and `More About Me` to `/about`.
- Added GitHub Pages deployment workflow.
- Added base-path-safe asset helpers.
- Replaced several CSS doodles with SVG assets:
  - Header star
  - Footer globe/smile
  - Tools & Weapons icons
  - Sydney signature
- Updated Selected Works copy to the latest user-approved wording.
- Placed `Tap to play` above the works cards.
- Removed Sound Lab sample rows from the visible home layout.
- Added soft fade on the left/bottom edge of Hero image so it blends into the white background.
- Tuned Hero typography and spacing.
- Added dedicated mobile layout based on the provided mobile mockup.
- Removed Hero `SIGNATURE SOUND` doodle circle.
- Mapped three Selected Works play buttons to final audio files.

Recent commit history:

```txt
c391abd Update work card audio playback
2833451 Add dedicated mobile layout
2d0ec28 Tune hero typography spacing
c05ec0b Make hero scale responsively
bc6eadc Refine hero fade and sound lab
c4dd83f Use doodle SVG assets
258df42 Update selected works copy
03c4772 Add about page
```

## Verification Already Done

Most recent code verification:

```bash
npm run build
```

Result: build passed.

Recent browser verification also confirmed:

- Hero `SIGNATURE SOUND` doodle is removed.
- Four Selected Works cards still render.
- Bubble Bobble play button enters active audio state.
- Branded Audio Experience play button enters active audio state.
- Audio can be stopped by clicking the active play button again.

## Known Open Items / Next Optimization Ideas

Good next-session priorities:

1. Review the live GitHub Pages deployment after the latest push.
2. Continue replacing remaining hand-drawn CSS/text doodles with final image assets as the user provides them.
3. Check the new mobile layout on real phone widths:
   - 375 x 812
   - 390 x 844
   - 430 x 932
4. Tune Hero mobile crop after checking the current square `main.png`.
5. Decide what the third Selected Works card should play:
   - Keep video modal
   - Or map it to a new audio file
6. Replace the placeholder video strategy if more videos are added:
   - Git LFS
   - external video hosting
   - compressed web video files
7. Consider moving large page copy/data out of `src/App.jsx` if the page keeps growing.
8. Do another accessibility pass:
   - keyboard behavior for carousel/menu/modal
   - focus handling in the mobile menu
   - reduced-motion handling for doodle animations

## Files Future Sessions Will Most Likely Edit

- `src/App.jsx`
  - Components, routing, audio behavior, page sections
- `src/styles.css`
  - Desktop/mobile composition, doodle placement, responsive layout
- `src/data/siteData.js`
  - Work card copy, audio paths, Sound Lab category/sample data
- `src/utils/assets.js`
  - Only touch if routing/base path behavior changes
- `public/images/doodles/`
  - Add/replace SVG/PNG doodle assets
- `public/images/hero/`
  - Hero portrait/crop changes
- `public/audio/`
  - Final sound samples

## Git Notes

Current branch should remain:

```bash
main
```

Before starting future work:

```bash
cd /Users/cooperfu/Desktop/SYDNEY_TSENG
git status
git pull origin main
npm install
npm run dev
```

For this handoff update, `PROJECT_HANDOFF.md` should be committed so future sessions can read it directly.

