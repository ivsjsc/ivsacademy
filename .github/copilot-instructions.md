# Copilot Instructions for IVS Website Codebase

## Big Picture Architecture
- This is a static website project for IVS Academy, organized under `public/` and `Pages/` for main content, with reusable HTML components in `components/`.
- Custom scripts are in `js/`, styles in `css/`, and assets in `images/`, `audios/`, and `videos/`.
- No backend or build system is present; all logic is client-side JavaScript and HTML/CSS.

## Developer Workflows
- No build step required; edit HTML, JS, and CSS files directly and refresh the browser to see changes.
- For new pages, copy an existing HTML file from `public/` or `Pages/` and update content/links as needed.
- Use `js/loadComponents.js` to inject shared components (header, footer, FAB) into pages.
- Language switching is handled by `js/language.js` and JSON files in `lang/`.

## Project-Specific Conventions
- Tailwind CSS is loaded via CDN; custom classes are defined in `css/styles.css`.
- Navigation and layout are modular: header/footer are loaded dynamically, not hardcoded in every page.
- Audio features use `<audio>` tags and custom JS for play/pause, with files in `audios/`.
- All links and assets use relative paths from the project root.
- Mobile navigation is handled by toggling classes in JS (`mobile-menu`, `mobile-menu-button`).

## Integration Points & Dependencies
- Font Awesome and Google Fonts are loaded via CDN in `<head>`.
- No external build tools, package managers, or server-side code required for deployment.
- No Firebase or cloud integration; all references should be removed.

## Examples & Patterns
- To add a new language, create a JSON file in `lang/` and update `js/language.js`.
- To add a new section, use Tailwind utility classes and follow the structure in `index.html` or other main pages.
- For reusable UI, create a new HTML file in `components/` and load it via `js/loadComponents.js`.

## Key Files & Directories
- `public/index.html`: Main landing page, shows overall layout and conventions.
- `components/header.html`, `components/footer.html`: Shared navigation and footer markup.
- `js/loadComponents.js`: Handles dynamic component loading.
- `js/language.js`: Manages language switching and translation.
- `css/styles.css`: Custom styles and overrides for Tailwind.
- `audios/`: Contains all audio files for player features.

---

For any unclear conventions or missing patterns, ask the user for clarification or examples from their workflow.
