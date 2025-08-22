Refactor plan for CSS consolidation

Goal: consolidate app CSS, preserve vendor files, reduce duplication, remove fragile !important rules where safe.

Steps:
1. Backup (done)
2. Create canonical import at src/styles/atomic/index.css (exists)
3. Move component-level CSS into atomic where appropriate (navbar already moved)
4. Remove duplicate hero rules from src/index.css and keep only vendor hero styling + small overrides
5. Replace global !important with scoped overrides and increase specificity for necessary rules
6. Add Stylelint config and npm scripts for linting/formatting
7. Run visual checks

Files to change (initial):
- src/index.css: remove hero duplicates, keep app-level tokens and imports
- src/styles/components/* -> migrate to src/styles/atomic/{organisms,molecules}
- src/styles/atomic/index.css -> ensure import order
- src/styles/atomic/organisms/navbar.css -> keep

I will now:
- Remove duplicate hero rules from src/index.css (centralize hero to vendor/atomic)
- Keep necessary overrides for hero (height enforcement) minimal
- Run quick lint and format

If this plan is good, I will apply the changes now.
