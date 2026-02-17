---
description: how to bump the version number when making changes
---

# Version Bump Workflow

Every time a feature is added, a bug is fixed, or any meaningful change is made to the AI Prompt Generator, the version number MUST be updated in ALL of the following locations:

// turbo-all

1. **`index.html` line ~7** — `<title>AI Prompt Generator vX.X</title>`
2. **`index.html` line ~27-28** — `<span class="version">vX.X</span>`
3. **`index.html` CSS cache bust** — `styles.css?v=X.X`
4. **`index.html` JS cache bust** — `script.js?v=X.X`
5. **`script.js` changelog array** — Add a new entry at the TOP of the `changelog` array with version, date, and changes

## Version numbering rules
- Bug fix / minor tweak → increment by 0.01 (e.g. v5.50 → v5.51)
- New feature → increment by 0.1 (e.g. v5.5 → v5.6)
- Major overhaul → increment by 1.0 (e.g. v5.5 → v6.0)

## IMPORTANT
- Always update ALL 5 locations — never leave any behind
- The changelog date format is `YYYY-MM-DD`
- Search for the old version string across all files to make sure nothing is missed
