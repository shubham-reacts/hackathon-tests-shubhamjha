# Hackathon Test Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a complete Passmark + Playwright test suite for `https://shubhamjha.com` in the `/Users/shubham/Projects/next-portfolio-test/` repo, covering all 7 user-facing feature areas.

**Architecture:** Standalone Node.js project (not inside next-portfolio). Passmark wraps Playwright and allows plain-English step/assertion descriptions via OpenRouter as the AI gateway. Each test file covers one feature area; all tests run against the live production site.

**Tech Stack:** Node.js 18+, TypeScript, Playwright (latest), Passmark (latest), dotenv, OpenRouter API

---

## File Map

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and npm scripts |
| `tsconfig.json` | TypeScript config |
| `playwright.config.ts` | Passmark + Playwright config, baseURL |
| `.env.example` | Committed placeholder for `OPENROUTER_API_KEY` |
| `.gitignore` | Excludes `.env`, `node_modules`, `playwright-report`, `test-results` |
| `README.md` | Setup instructions, test descriptions, article link |
| `tests/homepage.spec.ts` | Hero, featured content, CTA, above-fold load |
| `tests/navigation.spec.ts` | Nav links, theme toggle, mobile nav |
| `tests/blog.spec.ts` | Blog listing, post detail, content rendering |
| `tests/contact.spec.ts` | Contact form fill, validation, success state |
| `tests/projects.spec.ts` | Projects page, cards, external links |
| `tests/about.spec.ts` | About page content, Calendly widget |
| `tests/subscribe.spec.ts` | Newsletter form validation and success state |

---

### Task 1: Project scaffold (package.json, tsconfig, .gitignore, .env.example)

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/package.json`
- Create: `/Users/shubham/Projects/next-portfolio-test/tsconfig.json`
- Create: `/Users/shubham/Projects/next-portfolio-test/.gitignore`
- Create: `/Users/shubham/Projects/next-portfolio-test/.env.example`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "breaking-apps-hackathon",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "npx playwright test --project chromium",
    "test:report": "npx playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "typescript": "latest"
  },
  "dependencies": {
    "dotenv": "latest",
    "passmark": "latest"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  },
  "include": ["tests/**/*.ts", "playwright.config.ts"]
}
```

- [ ] **Step 3: Create .gitignore**

```
.env
node_modules/
playwright-report/
test-results/
dist/
```

- [ ] **Step 4: Create .env.example**

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

- [ ] **Step 5: Install dependencies**

Run: `cd /Users/shubham/Projects/next-portfolio-test && npm install`

Expected: `node_modules/` created, no errors.

- [ ] **Step 6: Install Playwright browsers**

Run: `cd /Users/shubham/Projects/next-portfolio-test && npx playwright install chromium`

Expected: Chromium browser downloaded.

- [ ] **Step 7: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add package.json tsconfig.json .gitignore .env.example
git commit -m "chore: initialize project scaffold"
```

---

### Task 2: playwright.config.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/playwright.config.ts`

- [ ] **Step 1: Create playwright.config.ts**

```typescript
import dotenv from "dotenv";
import path from "path";
import { configure } from "passmark";

dotenv.config({ path: path.resolve(__dirname, ".env") });

configure({
  ai: {
    gateway: "openrouter",
  },
});

export default {
  testDir: "./tests",
  timeout: 60_000,
  use: {
    baseURL: "https://shubhamjha.com",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
};
```

- [ ] **Step 2: Verify config parses**

Run: `cd /Users/shubham/Projects/next-portfolio-test && npx tsc --noEmit`

Expected: No TypeScript errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add playwright.config.ts
git commit -m "chore: add playwright + passmark config targeting shubhamjha.com"
```

---

### Task 3: tests/homepage.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/homepage.spec.ts`

- [ ] **Step 1: Create homepage.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("Homepage loads and hero is visible", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the homepage and verify the hero section loads",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "A hero section or headline introducing Shubham is visible" },
      { assertion: "The navigation header is present at the top of the page" },
      { assertion: "At least one call-to-action button or link is visible" },
    ],
    test,
    expect,
  });
});

test("Featured content section is visible", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Check that featured blog posts or projects appear on the homepage",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Scroll down past the hero section" },
    ],
    assertions: [
      { assertion: "At least one featured blog post or project card is visible" },
      { assertion: "Each featured item has a title" },
    ],
    test,
    expect,
  });
});

test("Newsletter / CTA section is present", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Scroll to the bottom of the homepage and verify the CTA section",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Scroll to the bottom of the page" },
    ],
    assertions: [
      { assertion: "A newsletter signup or CTA section is visible near the bottom" },
      { assertion: "An email input field or subscribe button is present" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/homepage.spec.ts
git commit -m "test: add homepage spec"
```

---

### Task 4: tests/navigation.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/navigation.spec.ts`

- [ ] **Step 1: Create navigation.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("Primary nav links navigate correctly", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Click each primary navigation link and verify the correct page loads",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Click the 'About' link in the navigation" },
      { description: "Navigate back to the homepage" },
      { description: "Click the 'Projects' link in the navigation" },
      { description: "Navigate back to the homepage" },
      { description: "Click the 'Blog' link in the navigation" },
      { description: "Navigate back to the homepage" },
      { description: "Click the 'Contact' link in the navigation" },
    ],
    assertions: [
      { assertion: "Each page loaded without a 404 or error message" },
      { assertion: "The navigation header remains visible on each page" },
    ],
    test,
    expect,
  });
});

test("Theme toggle switches between dark and light mode", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Toggle the site theme between dark and light mode",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Locate the theme toggle button in the navigation" },
      { description: "Click the theme toggle button" },
      { description: "Click the theme toggle button again to switch back" },
    ],
    assertions: [
      { assertion: "After the first click the page background changes to indicate a different theme" },
      { assertion: "After the second click the theme returns to its original state" },
    ],
    test,
    expect,
  });
});

test("Mobile navigation opens and closes", async ({ page }) => {
  test.setTimeout(60_000);
  page.setViewportSize({ width: 375, height: 812 });
  await runSteps({
    page,
    userFlow: "Open and close the mobile navigation menu on a small screen",
    steps: [
      { description: "Navigate to https://shubhamjha.com with a 375px wide viewport" },
      { description: "Locate and click the hamburger or mobile menu button" },
      { description: "Click the close button or toggle to dismiss the menu" },
    ],
    assertions: [
      { assertion: "After opening, navigation links are visible in the menu" },
      { assertion: "After closing, the navigation menu is no longer visible" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/navigation.spec.ts
git commit -m "test: add navigation spec"
```

---

### Task 5: tests/blog.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/blog.spec.ts`

- [ ] **Step 1: Create blog.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("Blog listing page shows post cards", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the blog page and verify post cards are displayed",
    steps: [
      { description: "Navigate to https://shubhamjha.com/blog" },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "At least one blog post card is visible" },
      { assertion: "Each post card has a title" },
      { assertion: "Each post card shows a date or tag" },
    ],
    test,
    expect,
  });
});

test("Clicking a blog post navigates to the post detail page", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Click a blog post from the listing and read its content",
    steps: [
      { description: "Navigate to https://shubhamjha.com/blog" },
      { description: "Click the first blog post card or title link" },
      { description: "Wait for the post detail page to load" },
    ],
    assertions: [
      { assertion: "The post title is displayed as a heading" },
      { assertion: "The post body content is visible with at least one paragraph" },
      { assertion: "The URL has changed to a post-specific slug path" },
    ],
    test,
    expect,
  });
});

test("Blog post renders code blocks and formatting", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit a technical blog post and check that code and formatting render correctly",
    steps: [
      { description: "Navigate to https://shubhamjha.com/blog" },
      { description: "Click a blog post that appears technical or has a code snippet in the preview" },
      { description: "Scroll through the post content" },
    ],
    assertions: [
      { assertion: "The post content is readable with proper headings and paragraphs" },
      { assertion: "If a code block is present, it is visually distinct from body text" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/blog.spec.ts
git commit -m "test: add blog spec"
```

---

### Task 6: tests/contact.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/contact.spec.ts`

- [ ] **Step 1: Create contact.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("Contact form is visible", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the contact page and verify the form is present",
    steps: [
      { description: "Navigate to https://shubhamjha.com/contact" },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "A contact form is visible on the page" },
      { assertion: "The form has fields for name, email, and message" },
      { assertion: "A submit button is present" },
    ],
    test,
    expect,
  });
});

test("Submitting an empty contact form shows validation errors", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Submit the contact form without filling in any fields",
    steps: [
      { description: "Navigate to https://shubhamjha.com/contact" },
      { description: "Click the submit button without entering any data" },
    ],
    assertions: [
      { assertion: "An error or validation message is shown indicating required fields are missing" },
      { assertion: "The form is still visible and has not navigated away" },
    ],
    test,
    expect,
  });
});

test("Filling and submitting the contact form shows a success state", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Fill in all required contact form fields and submit",
    steps: [
      { description: "Navigate to https://shubhamjha.com/contact" },
      { description: "Type 'Test User' in the name field" },
      { description: "Type 'test@example.com' in the email field" },
      { description: "Type 'This is a test message from Playwright.' in the message field" },
      { description: "Click the submit button" },
    ],
    assertions: [
      { assertion: "A success message or confirmation is shown after submission" },
      { assertion: "No error messages are visible" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/contact.spec.ts
git commit -m "test: add contact form spec"
```

---

### Task 7: tests/projects.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/projects.spec.ts`

- [ ] **Step 1: Create projects.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("Projects page loads and shows project cards", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the projects page and verify project cards are displayed",
    steps: [
      { description: "Navigate to https://shubhamjha.com/projects" },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "At least one project card is visible" },
      { assertion: "Each project card has a title and a short description" },
    ],
    test,
    expect,
  });
});

test("Project cards show external links", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Check that project cards contain links to GitHub or live demos",
    steps: [
      { description: "Navigate to https://shubhamjha.com/projects" },
      { description: "Scroll through all visible project cards" },
    ],
    assertions: [
      { assertion: "At least one project card has a GitHub or external link button" },
      { assertion: "The links are visible and appear clickable" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/projects.spec.ts
git commit -m "test: add projects spec"
```

---

### Task 8: tests/about.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/about.spec.ts`

- [ ] **Step 1: Create about.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("About page loads with bio content", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the about page and verify bio content is displayed",
    steps: [
      { description: "Navigate to https://shubhamjha.com/about" },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "A bio or introduction paragraph about Shubham is visible" },
      { assertion: "At least one social link (GitHub, LinkedIn, or X/Twitter) is present" },
    ],
    test,
    expect,
  });
});

test("Calendly booking widget loads on the about page", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Check that the Calendly booking widget loads and is interactive",
    steps: [
      { description: "Navigate to https://shubhamjha.com/about" },
      { description: "Scroll down to find the Calendly or booking section" },
    ],
    assertions: [
      { assertion: "A Calendly embed or booking widget is visible on the page" },
      { assertion: "The widget appears interactive and not in an error state" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/about.spec.ts
git commit -m "test: add about page spec"
```

---

### Task 9: tests/subscribe.spec.ts

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/tests/subscribe.spec.ts`

- [ ] **Step 1: Create subscribe.spec.ts**

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("Newsletter form is visible", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the homepage and find the newsletter subscribe form",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Scroll to the newsletter or subscribe section" },
    ],
    assertions: [
      { assertion: "An email input field for subscribing is visible" },
      { assertion: "A subscribe or sign up button is present" },
    ],
    test,
    expect,
  });
});

test("Submitting an empty email shows a validation error", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Submit the newsletter form with no email entered",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Scroll to the newsletter subscribe section" },
      { description: "Click the subscribe button without entering an email" },
    ],
    assertions: [
      { assertion: "A validation error or prompt is shown indicating an email is required" },
    ],
    test,
    expect,
  });
});

test("Submitting a valid email shows success state", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Subscribe to the newsletter with a valid test email",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Scroll to the newsletter subscribe section" },
      { description: "Type 'playwright-test@example.com' in the email input" },
      { description: "Click the subscribe or sign up button" },
    ],
    assertions: [
      { assertion: "A success message or confirmation is displayed after subscribing" },
      { assertion: "No error message is visible" },
    ],
    test,
    expect,
  });
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add tests/subscribe.spec.ts
git commit -m "test: add newsletter subscribe spec"
```

---

### Task 10: README.md

**Files:**
- Create: `/Users/shubham/Projects/next-portfolio-test/README.md`

- [ ] **Step 1: Create README.md**

```markdown
# Breaking Apps Hackathon — AI-Powered Tests for shubhamjha.com

A Passmark + Playwright test suite for [shubhamjha.com](https://shubhamjha.com), built for the [Hashnode × Bug0 Breaking Apps Hackathon](https://hashnode.com/hackathons/breaking-things).

## What this does

This project uses [Passmark](https://github.com/bug0inc/passmark) to test every user-facing feature of shubhamjha.com — a Next.js 16 personal portfolio — using plain-English test descriptions instead of CSS selectors. No page objects. No brittle selectors. Just natural language steps and assertions powered by an LLM via OpenRouter.

## Why Passmark?

Traditional Playwright tests break constantly when UI changes. Passmark lets you describe *what* to test, not *how* — the AI figures out the selectors at runtime. This makes tests far more resilient and dramatically faster to write.

## Setup

```bash
git clone https://github.com/shubhamships/breaking-apps-hackathon
cd breaking-apps-hackathon
npm install
npx playwright install chromium
cp .env.example .env
# Add your OpenRouter API key to .env
```

## Running tests

```bash
npm test
# View the HTML report:
npm run test:report
```

## Test files

| File | What it covers |
|------|---------------|
| `tests/homepage.spec.ts` | Hero section, featured content, CTA / newsletter presence |
| `tests/navigation.spec.ts` | Nav links, theme toggle (dark/light), mobile nav menu |
| `tests/blog.spec.ts` | Blog listing, post detail, code block rendering |
| `tests/contact.spec.ts` | Contact form visibility, validation errors, success state |
| `tests/projects.spec.ts` | Projects page, card content, external links |
| `tests/about.spec.ts` | Bio content, social links, Calendly widget |
| `tests/subscribe.spec.ts` | Newsletter form validation and success state |

## Article

[I Used AI to Write Tests for My Own Portfolio — Here's What I Found](#) *(link added after publish)*

## Requirements

- Node.js 18+
- OpenRouter API key (free via [hackathon registration](https://hashnode.com/hackathons/breaking-things))
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shubham/Projects/next-portfolio-test
git add README.md
git commit -m "docs: add README with setup and test descriptions"
```

---

### Task 11: Verify full suite runs

- [ ] **Step 1: Create `.env` with your real API key**

```bash
cd /Users/shubham/Projects/next-portfolio-test
cp .env.example .env
# Edit .env and set OPENROUTER_API_KEY=<your key>
```

- [ ] **Step 2: Run the full test suite**

```bash
cd /Users/shubham/Projects/next-portfolio-test
npm test
```

Expected: All tests run. Note any failures or surprising findings — these become the "what broke" section of the Hashnode article.

- [ ] **Step 3: View the report**

```bash
npm run test:report
```

Expected: HTML report opens in browser showing all test results.

- [ ] **Step 4: Push to public GitHub repo**

```bash
cd /Users/shubham/Projects/next-portfolio-test
gh repo create breaking-apps-hackathon --public --source=. --push
```

Expected: Repo created at `github.com/shubhamships/breaking-apps-hackathon`.
