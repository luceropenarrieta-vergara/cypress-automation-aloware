# Cypress Automation - Aloware

End-to-end UI automation for Aloware using Cypress with a Page Object Model (POM) structure and centralized locators.

## Test Plan

- [Aloware Test Plan](https://docs.google.com/spreadsheets/d/1mVo4DuYK-6wCVoSDv9QHpwSs32Azcyb0/edit?usp=sharing&ouid=117397008720713631756&rtpof=true&sd=true)

## Current Scenarios in `spec.cy.js`

- Verify Sign Up modal fields/components are visible.
- Verify no validation errors for valid input.
- Verify validation errors for invalid input.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment values in `cypress.env.json`:

```json
{
  "appUrl": "https://aloware.com/",
  "testEmail": "your-email@example.com"
}
```

## Running Tests

Open Cypress UI runner:

```bash
npx cypress open
```

Run all specs in headless mode:

```bash
npx cypress run
```

Run a specific spec:

```bash
npx cypress run --spec "e2e/spec.cy.js"
```

## Tech Stack

- Cypress (E2E testing)
- JavaScript (ES modules)

## Project Structure

```text
cypress-automation-aloware/
  e2e/
    spec.cy.js                    # Test scenarios
  pages/
    HomePage.js                   # Home page actions/navigation
    SignUpModal.js                # Sign Up modal actions/assertions
  locators/
    homePageLocators.js           # Home page selectors (builder functions)
    signUpModalLocators.js        # Sign Up modal selectors (builder functions)
  support/
    e2e.js                        # Global hooks/config loaded before tests
    commands.js                   # Custom Cypress commands (if needed)
  fixtures/
    example.json
  cypress.config.js
  cypress.env.json                # Environment values used by tests
  README.md
```

## GitHub Actions CI Guide

This project includes a CI workflow at `.github/workflows/cypress.yml` that runs Cypress tests automatically.

### When CI runs

- On every `push` to `main`
- On every `pull_request` targeting `main`
- Manually via **Run workflow** (`workflow_dispatch`)

### Browser and execution details

- CI runs tests in **Chrome** by default.
- Command used in workflow:

```bash
npx cypress run --browser chrome --spec "e2e/**/*.cy.js"
```

### Where to see CI job results

1. Open your repository in GitHub.
2. Click the **Actions** tab.
3. Select workflow **Cypress E2E**.
4. Open the latest run to review:
   - Job status (pass/fail)
   - Step-by-step logs
   - Failed test details and stack traces
5. Download artifacts (if available):
   - `cypress-screenshots`
   - `cypress-videos`

## Reporting

This project is integrated with the Cypress Cloud Dashboard, where execution results will be tracked. You can access the dashboard using the following link: [Cypress Cloud Dashboard](https://cloud.cypress.io/projects/hokhdi/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&tagsMatch=ANY&timeRange=%7B%22startDate%22%3A%222025-05-06%22%2C%22endDate%22%3A%222026-05-06%22%2C%22id%22%3A%22LAST_12_MONTHS%22%7D).

### Cypress Cloud Credentials

Currently, the project is public. If you already have an account with Cypress Cloud, you should be able to access it. However, if you encounter any issues, please sign up using this link: [Cypress Cloud Sign-Up](https://cloud.cypress.io/signup).

### Quick troubleshooting

- **Workflow fails before tests start**
  - Verify `package.json` and `package-lock.json` exist in repo root.
- **Env values not applied**
  - Confirm GitHub secrets are set with exact names:
    - `CYPRESS_APP_URL`
    - `CYPRESS_TEST_EMAIL`
- **Specs not found**
  - Ensure test files match `e2e/**/*.cy.js`.
- **No screenshots/videos artifact**
  - Artifacts only appear when files are produced during execution.

## Test Architecture

### 1) Global test start URL

`support/e2e.js` contains a global `beforeEach`:

- Visits `Cypress.env('appUrl')` before every test.
- Keeps each test consistent and independent.

### 2) Page Object Model

#### `HomePage`

- Owns navigation from homepage to Sign Up modal via `goToSignUpModal()`.
- Resolves the signup link and handles cross-origin navigation with `cy.origin(...)`.
- Stores the signup origin in `Cypress.env('signUpOrigin')` for modal interactions.

#### `SignUpModal`

- Contains focused, reusable methods for:
  - Visibility checks
  - Field input actions
  - Click actions
  - Error message assertions
- Executes modal actions inside signup origin context through `inSignUpOrigin(...)`.

### 3) Centralized Locators

Selectors are isolated in `locators/`:

- `homePageLocators.js`
- `signUpModalLocators.js`

Locators are defined as functions (including parameterized builders), for example:

- `byPlaceholder(value)`
- `byClassName(value)`
- `byType(value)`

This allows locator updates in one place and supports future dynamic selectors without refactoring page methods.

## Cross-Origin Handling

The signup flow may navigate away from the base domain. To avoid Cypress origin errors:

- Home page navigation to signup is wrapped in `cy.origin(...)`.
- Sign Up modal methods run within the stored signup origin via `inSignUpOrigin(...)`.

If you see origin-related failures, make sure tests call `homePage.goToSignUpModal()` before using `signUpModal` methods.

## Maintenance Guidelines

- Add new selectors only in locator files.
- Keep page methods single-responsibility (one goal per method).
- Keep specs high-level and readable by orchestrating page methods.
- Prefer assertions scoped to expected UI behavior and messages.

## Troubleshooting

- **"not navigated to expected origin"**  
  Ensure interactions are executed through `signUpModal` methods (which wrap `cy.origin`) and that `goToSignUpModal()` is executed first.

- **Unhandled app error: "Failed to fetch"**  
  This is handled in the signup navigation flow; confirm the flow starts via `HomePage.goToSignUpModal()`.

- **Selector stopped working**  
  Update selector in `locators/*` only; page/spec code should not need changes.