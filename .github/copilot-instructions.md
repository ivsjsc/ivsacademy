# Copilot Instructions for IVS Website Codebase

## Big Picture Architecture
- This is a static website project for IVS Academy, organized with main content in root directory and `Pages/` subdirectory, with reusable HTML components in `components/`.
- Custom scripts are in `js/`, styles in `css/`, and assets in `images/`, `audios/`, and `videos/`.
- No backend or build system is present; all logic is client-side JavaScript and HTML/CSS.
- Deployment via GitHub Pages using static workflow (`.github/workflows/static.yml`).
- Translation system supports Vietnamese (vi), English (en), and Chinese (zh) with automated workflows.

## Developer Workflows
- **Development**: No build step required; edit HTML, JS, and CSS files directly and refresh browser.
- **Testing**: Use Python test scripts (`test_all_pages.py`, `test_component_fixes.py`) to validate pages.
- **Local Server**: Run `python -m http.server 8000` from root directory for testing.
- **Page Creation**: Copy existing HTML file from root or `Pages/` directory, update content/links.
- **Component System**: Use `js/loadComponents.js` to inject shared components (header, footer, FAB).
- **Translations**: Use automated scripts in `scripts/translation/` for managing multilingual content.

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
- **New Language**: Create JSON file in `lang/`, update `js/language.js`, use translation scripts for automation.
- **New Section**: Use Tailwind utilities, follow structure in `index.html` or main pages.
- **Reusable Components**: Create HTML in `components/`, load via `js/loadComponents.js` with placeholders.
- **Component Loading**: Create `<div id="component-placeholder"></div>`, fetch HTML, inject content, init JS.
- **Translation Keys**: Use `data-lang-key="key_name"` attributes for translatable elements.
- **Dark Mode**: Use `dark:` prefixed Tailwind classes alongside light variants.
- **Script Loading Order**: Always load `utils.js` first, then component-specific scripts.
- **Versioned Components**: Use `@version X.Y` comments with author attribution in JS files.

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
- `lang/vi.json`, `lang/en.json`, `lang/zh.json`: Translation files for Vietnamese, English, and Chinese.
- `scripts/translation/`: Automated translation workflow tools and utilities.
- `scripts/`: Python automation scripts for maintenance, testing, and content management.
- `test_all_pages.py`, `test_component_fixes.py`: Comprehensive testing utilities.
- `audios/`: Contains all audio files for player features.
- `.github/workflows/static.yml`: GitHub Pages deployment configuration.
- `.github/workflows/translation-check.yml`: Automated translation validation workflow.

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

## Translation System Workflows
- **Check Translation Status**: `node scripts/translation/check_translations_status.js` for coverage reports.
- **Create Translation Candidates**: Use `create_full_zh_candidate.js` to generate candidate files.
- **Auto-Translation**: Use `translate_zh_auto.js` with Google API or mock mode for batch translation.
- **Python Translation Tools**: `merge_translate_locales.py` with deep-translator for advanced workflows.
- **Apply Translations**: Use `apply_zh_translation.js` after manual review of candidates.
- **Version Control**: Use `commit_translations.ps1` to create branches for translation PRs.

## Maintenance & Automation Scripts
- **Page Testing**: `test_all_pages.py` and `test_component_fixes.py` for comprehensive validation.
- **Content Fixes**: Scripts in `scripts/` for batch HTML fixes, link normalization, and path corrections.
- **Backup System**: Automated timestamped backups created in `.backups/` before modifications.
- **DNS/Infrastructure**: PowerShell and batch scripts in `scripts/ops/` for monitoring and troubleshooting.
- **Translation Validation**: Automated checks via GitHub Actions for translation file integrity.

## Advanced Patterns
- **Component Versioning**: All JS components use `@version X.Y` with author attribution for tracking changes.
- **Error Handling**: Comprehensive logging via `utils.js` with fallback mechanisms for all components.
- **Placeholder Protection**: Translation scripts preserve `{0}`, `%s`, and similar placeholders during auto-translation.
- **Batch Processing**: Scripts support batch operations with rate limiting and manual review flags for sensitive content.
- **Centralized Utilities**: Global `componentLog` and `debounce` functions available across all modules.

---

For any unclear conventions or missing patterns, ask the user for clarification or examples from their workflow.
