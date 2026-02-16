# Codebase Issue Triage: Proposed Tasks

## 1) Typo Fix Task
**Issue found:** In `src/content/blog/2021-03-10-how-to-transition-from-manual-tester-to-automation-engineer.md`, the sentence says "we can totally to make a successful transition," which has an extra `to` and reads awkwardly.

**Proposed task:**
- Edit the sentence to "we can totally make a successful transition" (or equivalent corrected phrasing).

**Acceptance criteria:**
- The typo/grammar issue is removed.
- The paragraph reads naturally without changing intended meaning.

---

## 2) Bug Fix Task
**Issue found:** In `netlify/functions/reactions.ts` and `netlify/functions/comments.ts`, several non-success responses (e.g. 400/405) return JSON but omit `Access-Control-Allow-Origin`, while success paths include it.

**Why this is a bug:**
- Browser clients on different origins may fail to read error responses consistently due to missing CORS headers.

**Proposed task:**
- Introduce a shared response helper (or central headers constant) in both functions so all responses, including errors, include consistent CORS and content-type headers.

**Acceptance criteria:**
- Every `Response` path in both functions includes CORS headers.
- Front-end can read both success and error payloads cross-origin.

---

## 3) Comment/Documentation Discrepancy Task
**Issue found:** `scripts/test_urls.js` is an ad-hoc validation script, but the heading comment says `// Test Potential Waving URLs` while several checked URLs are not waving variants and the script also checks `codes.json`.

**Proposed task:**
- Update the comments in `scripts/test_urls.js` to accurately describe what the script validates (multiple flag URL patterns and country code endpoint sanity check).
- Optionally rename the script for clarity (e.g. `validate_flag_urls.js`) and document intended use.

**Acceptance criteria:**
- Script comments match actual behavior.
- A reader can understand script purpose without reading implementation details.

---

## 4) Test Improvement Task
**Issue found:** URL checks in `scripts/test_urls.js` are manual/log-only and not integrated into automated checks (`package.json` has no test script and no pass/fail assertion for this validation).

**Proposed task:**
- Convert `scripts/test_urls.js` into an assertion-based test (or add a CI-safe test mode) that exits non-zero when required endpoints fail.
- Add an npm script (e.g. `"test:flags": "node scripts/test_urls.js"`) and optional timeout/retry handling.

**Acceptance criteria:**
- Running the test command returns non-zero on failures.
- The command is discoverable in `package.json` and can be used in CI.
