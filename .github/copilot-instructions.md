# Copilot Instructions for IVS Website Codebase

## Big Picture Architecture
- This is a static website project for IVS Academy, organized with main content in root directory and `Pages/` subdirectory, with reusable HTML components in `components/`.
- Custom scripts are in `js/`, styles in `css/`, and assets in `images/`, `audios/`, and `videos/`.
- No backend or build system is present; all logic is client-side JavaScript and HTML/CSS.
- Deployment via GitHub Pages using static workflow (`.github/workflows/static.yml`).

## Developer Workflows
- No build step required; edit HTML, JS, and CSS files directly and refresh the browser to see changes.
- For new pages, copy an existing HTML file from root or `Pages/` directory and update content/links as needed.
- Use `js/loadComponents.js` to inject shared components (header, footer, FAB) into pages.
- Language switching is handled by `js/language.js` and JSON files in `lang/` directory.
- Test locally using `python3 -m http.server 8000` or similar static server.

## Project-Specific Conventions
- Tailwind CSS is loaded via CDN; custom classes and overrides are in `css/styles.css`.
- Navigation and layout are modular: header/footer are loaded dynamically, not hardcoded in every page.
- Audio features use `<audio>` tags and custom JS for play/pause, with files in `audios/` directory.
- All links and assets use relative paths from the project root (e.g., `/js/script.js`, `/images/logo.png`).
- Mobile navigation is handled by toggling classes in JS (`mobile-menu`, `mobile-menu-button`).
- Dark mode support is implemented using Tailwind's `dark:` prefix and `class` strategy.

## Integration Points & Dependencies
- Font Awesome 6.5.1 and Google Fonts (Be Vietnam Pro, Poppins, Inter) loaded via CDN in `<head>`.
- Tailwind CSS loaded via CDN with custom configuration inline in each HTML file.
- AOS (Animate On Scroll) library for animations, loaded from CDN.
- No external build tools, package managers, or server-side code required for deployment.
- Firebase integration exists in some files but should be carefully managed or removed if not needed.

## Code Quality & Standards
- JavaScript uses strict mode (`'use strict';`) and follows ES6+ patterns.
- Comprehensive error handling and logging via `utils.js` utility functions.
- Components use versioned documentation comments with author attribution.
- Consistent naming conventions: kebab-case for CSS classes, camelCase for JavaScript.
- Responsive design using Tailwind's mobile-first approach with breakpoint prefixes.

## Examples & Patterns
- To add a new language, create a JSON file in `lang/` and update `js/language.js`.
- To add a new section, use Tailwind utility classes and follow the structure in `index.html` or other main pages.
- For reusable UI, create a new HTML file in `components/` and load it via `js/loadComponents.js`.
- Component loading pattern: Create placeholder div, fetch HTML, inject content, initialize JavaScript.
- Language data-attributes: Use `data-lang-key="key_name"` for translatable text elements.
- Dark mode styling: Use `dark:` prefixed classes alongside regular Tailwind classes.

## Common Development Tasks
- **Adding a new page**: Copy existing HTML template, update title/meta tags, adjust content, ensure component placeholders exist.
- **Adding translations**: Add keys to both `lang/vi.json` and `lang/en.json`, use `data-lang-key` attributes.
- **Creating components**: Build HTML in `components/`, expose global init functions, load via `loadComponents.js`.
- **Styling**: Use Tailwind utilities first, add custom CSS to `css/styles.css` only when necessary.
- **Testing**: Run local server, test responsive design, verify language switching, check component loading.

## Performance Considerations
- Images should be optimized and use lazy loading where appropriate.
- Components are loaded asynchronously to improve initial page load.
- CSS and JavaScript are loaded efficiently with proper defer/async attributes.
- Use CDN resources for external libraries (Tailwind, Font Awesome, etc.).

## Key Files & Directories
- `index.html`: Main landing page, shows overall layout and conventions.
- `components/header.html`, `components/footer.html`: Shared navigation and footer markup.
- `components/fab-container.html`: Floating Action Button with social links and utilities.
- `js/loadComponents.js`: Handles dynamic component loading with proper script execution.
- `js/language.js`: Manages language switching and translation system.
- `js/utils.js`: Shared utility functions (componentLog, debounce, etc.).
- `js/fabController.js`: Controls floating action button behavior.
- `css/styles.css`: Custom styles and Tailwind overrides.
- `lang/vi.json`, `lang/en.json`: Translation files for Vietnamese and English.
- `audios/`: Contains all audio files for player features.
- `.github/workflows/static.yml`: GitHub Pages deployment configuration.

## Security & Best Practices
- All external CDN resources should include integrity checks where possible.
- Avoid inline JavaScript where feasible; use external files with proper loading.
- Sanitize any user inputs if dynamic content is added.
- Keep translation files properly structured and maintain consistency between language versions.
- Use semantic HTML elements for better accessibility.

## Troubleshooting Common Issues
- **Components not loading**: Check network tab for 404s, verify file paths are absolute from root.
- **Language switching not working**: Ensure translation keys exist in both language files.
- **Styling issues**: Check Tailwind classes are correct, verify custom CSS doesn't conflict.
- **JavaScript errors**: Check console for missing dependencies, ensure script loading order.
- **Dark mode issues**: Verify both light and dark variants of Tailwind classes are used.

## Testing Strategy
- Test on multiple devices and screen sizes for responsive design.
- Verify all language switching functionality works correctly.
- Check component loading across different pages.
- Test with JavaScript disabled to ensure graceful degradation.
- Validate HTML and check for accessibility issues.

---

For any unclear conventions or missing patterns, ask the user for clarification or examples from their workflow.
