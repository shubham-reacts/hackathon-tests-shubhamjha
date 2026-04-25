---
title: "Passmark Found Bugs in My Own Portfolio Before I Did (2026)"
description: "Passmark found 3 bugs in my live Next.js portfolio before I did. Here's the Calendly iframe fix and the CI pattern that stops form tests spamming your inbox."
author: Shubham Jha
authorImage: https://shubhamjha.com/images/shubham-jha.jpg
coverImage: https://shubhamjha.com/images/blog/playwright-ai-testing-portfolio.png
date: "2026-04-24"
tags: ["Playwright", "Passmark", "Testing", "Next.js", "CI/CD"]
slug: playwright-ai-testing-nextjs-portfolio
readingTime: "8 min read"
featured: false
canonicalUrl: "https://shubhamjha.com/blog/playwright-ai-testing-nextjs-portfolio"
faq:
  - question: "What is Passmark?"
    answer: "Passmark is an open-source AI testing library that wraps Playwright. Instead of CSS selectors, you describe what to test and what to assert in plain English. The LLM resolves the actual selectors at runtime, so tests survive UI refactors that would break a traditional selector-based suite."
  - question: "Why skip form tests in CI instead of mocking the endpoint?"
    answer: "Mocking the endpoint gives you a green test even when the real endpoint is broken. The test.skip(!!process.env.CI) pattern keeps a real integration test that you run locally before every deploy, without automating submissions that hit production inboxes or newsletter lists on every push."
  - question: "How does Passmark test a Calendly iframe?"
    answer: "Passmark resolves assertions using an LLM, not DOM selectors. You describe what a user should see — 'calendar grid visible, not just a loading spinner' — and the AI evaluates it semantically, without needing to switch frame context or know Calendly's internal class names."
  - question: "What timeout should I use for third-party embed tests?"
    answer: "120 seconds is a reliable upper bound for Calendly. The default 30-second Playwright timeout is too tight for a live scheduling widget fetching real availability data over the network. A test that passes locally at 28s and fails in CI at 31s is not a trustworthy test."
  - question: "How do I set up Passmark with OpenRouter?"
    answer: "Install passmark via npm, add your OpenRouter API key to .env as OPENROUTER_API_KEY, then call configure({ ai: { gateway: 'openrouter' } }) at the top of your playwright.config.ts before defineConfig. Passmark routes all LLM calls through OpenRouter, so you can use any model the gateway supports."
---

I shipped a broken nav label to production. I don't know how long it was wrong. I never tested it.

That's the honest version of this post. I built my portfolio at [shubhamjha.com](https://shubhamjha.com), clicked around, deployed it, and called it done. Then I found [Passmark](https://github.com/bug0inc/passmark) — an open-source AI testing library that lets you write [Playwright](https://playwright.dev) tests in plain English — and pointed it at my own site. Twenty tests. Seven pages. The first run failed three times before I'd gotten to the hard parts. The full suite is on [GitHub](https://github.com/shubhamships/breaking-apps-hackathon).

---

## Table of Contents

1. [The assumption trap](#1-the-assumption-trap)
2. [Setting up Passmark with Playwright](#2-setting-up-passmark-with-playwright)
3. [The suite: 7 files, 20 tests, zero CSS selectors](#3-the-suite-7-files-20-tests-zero-css-selectors)
4. [What broke on the first run](#4-what-broke-on-the-first-run)
5. [Testing a Calendly iframe with Playwright](#5-testing-a-calendly-iframe-with-playwright)
6. [Keeping Playwright form tests safe in CI](#6-keeping-playwright-form-tests-safe-in-ci)

---

## 1. The assumption trap

Developer portfolios are the least-tested code most devs ship. You trust your own work the most and test it the least.

You built every pixel. You've clicked every link. You know how the nav works because you wrote it. You stop checking because you already know how it works, until someone else is looking and you don't.

A portfolio is your professional face. A broken contact form costs you leads. A nav label pointing nowhere is the first thing a potential client sees. I'd been running "I'd notice if something broke" as my entire QA strategy.

I hadn't noticed.

The fixes took about two hours. Here's exactly how to replicate them.

---

## 2. Setting up Passmark with Playwright

Passmark wraps Playwright's `test` and `expect` with a `runSteps` function. You describe the user flow, list the steps, write assertions as plain sentences. The LLM resolves the actual selectors at runtime.

Install and configure it in three steps:

```bash
npm install passmark
```

Add your OpenRouter API key to `.env`:

```bash
OPENROUTER_API_KEY=your_key_here
```

Then wire up Passmark at the top of `playwright.config.ts`, before `defineConfig`:

```typescript
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "@playwright/test";
import { configure } from "passmark";

dotenv.config({ path: path.resolve(__dirname, ".env") });

configure({
  ai: {
    gateway: "openrouter",
  },
});

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.BASE_URL ?? "https://shubhamjha.com",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
});
```

The `configure()` call routes all LLM requests through OpenRouter. You get free credits via the [hackathon registration](https://hashnode.com/hackathons/breaking-things), which is enough to run the full portfolio suite many times over.

Here's what a test looks like — the homepage hero test:

```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

const BASE_URL = process.env.BASE_URL ?? "https://shubhamjha.com";

test("homepage loads and hero is visible", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the homepage and verify the hero section loads",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
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
```

No selectors. No `.querySelector`. No fragile `[data-testid="hero-cta"]` that breaks the moment someone renames a component. You describe what a real user should see, and the AI verifies it.

The tradeoff is cost — each `runSteps` call makes LLM requests via OpenRouter. Fine for a portfolio suite. Expensive at scale.

---

## 3. The suite: 7 files, 20 tests, zero CSS selectors

| File | What it covers |
|------|----------------|
| `homepage.spec.ts` | Hero section, featured content, newsletter CTA |
| `navigation.spec.ts` | Nav links, theme toggle, mobile hamburger menu |
| `blog.spec.ts` | Blog listing, post detail navigation, code block rendering |
| `contact.spec.ts` | Form visibility, validation errors, submit success |
| `projects.spec.ts` | Project cards, titles, external links |
| `about.spec.ts` | Bio content, social links, Calendly booking widget |
| `subscribe.spec.ts` | Newsletter form, empty validation, subscribe success |

The mobile nav test shows the natural split. You set the viewport in Playwright. Finding the hamburger, clicking it, checking that the nav appeared — that all goes to Passmark:

```typescript
test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await runSteps({
    page,
    userFlow: "Open and close the mobile navigation menu on a 375px wide viewport",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
      { description: "Locate and click the hamburger or mobile menu button" },
      { description: "Click the close button or toggle to dismiss the menu" },
    ],
    assertions: [
      { assertion: "A hamburger or toggle menu button is visible in the header on mobile viewport" },
      { assertion: "After clicking the toggle button, site navigation links become visible somewhere on the page" },
    ],
    test,
    expect,
  });
});
```

You handle the setup. Passmark handles the interpretation. That split works across every test in the suite, including the Calendly iframe test in section 5 which would be nearly impossible with CSS selectors alone.

If you're thinking about how a Next.js portfolio like this should be architected for performance while running heavier client-side features, the [scalable Next.js architecture guide](/blog/scalable-web-apps-nextjs) covers that in depth.

---

## 4. What broke on the first run

Three failures. Three real bugs in a site I thought I knew cold.

**The nav label mismatch.** My assertion said the nav should contain "Work". The site says "Projects". I'd been navigating by habit, not by reading. The fix was one word — but writing the assertion was what forced me to state what I expected. That's when I found out my expectation was wrong.

**The timeout.** Playwright's default timeout is 30 seconds. The Calendly booking widget on the About page pulls live scheduling data over the network and takes longer to fully render. Every Calendly test failed on the first run.

Fix in `playwright.config.ts` (shown above): `timeout: 120_000`. A test that passes at 28s locally and fails at 31s in CI is not a trustworthy test. Calendly isn't broken at 31 seconds. The timeout was just wrong.

**The subscribe assertion mismatch.** My assertion was too specific about the success message wording. The site shows a slightly different confirmation than I'd assumed. Passmark caught it immediately. Not because the subscribe feature was broken, but because I'd tested my memory of the site instead of what it actually renders.

Writing the assertion forces you to check. Most of the time I'd been assuming.

The timeout was the easiest bug to fix. What it revealed about testing the Calendly widget is where things get more interesting.

---

## 5. Testing a Calendly iframe with Playwright

The About page Calendly test is a good example of where selector-based testing falls apart.

```typescript
test("Calendly booking widget loads on the about page", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Check that the Calendly booking widget loads and is interactive",
    steps: [
      { description: `Navigate to ${BASE_URL}/about` },
      { description: "Scroll down to find the Calendly or booking section" },
      {
        description:
          "Wait for the Calendly iframe or booking widget to fully render (not show a loading spinner)",
      },
    ],
    assertions: [
      { assertion: "A Calendly embed or booking widget is visible on the page" },
      {
        assertion:
          "Time slots or a calendar grid are visible inside the Calendly widget — not just a loading spinner or blank iframe",
      },
    ],
    test,
    expect,
  });
});
```

With CSS selectors, testing this means switching into the iframe context, finding the calendar grid inside a cross-origin frame, and checking it isn't a spinner. Calendly uses dynamically generated class names that change between deployments. There's no stable selector to target.

Passmark resolves assertions using an LLM, not DOM selectors. It understands page content semantically — "not just a loading spinner or blank iframe" doesn't require knowing anything about Calendly's internal markup or switching into the iframe context. It just has to look like a calendar.

That's the part that would be brittle or impossible with traditional selectors. With Passmark it's one plain English sentence.

Once the tests were working locally, I pushed to CI and hit a completely different kind of problem.

---

## 6. Keeping Playwright form tests safe in CI

The suite runs fine locally. Then you push to CI. Five minutes later there's a test email in your inbox and a new fake subscriber in your newsletter list.

Contact form submission and newsletter subscribe are the two dangerous tests. Both hit real production endpoints. Run unguarded in CI, they fire on every push, every PR merge, every nightly job.

The fix is `test.skip(!!process.env.CI)`:

```typescript
// contact.spec.ts
test("filling and submitting the contact form shows a success state", async ({ page }) => {
  test.skip(
    !!process.env.CI,
    "skipped in CI to avoid real submissions to the production contact endpoint"
  );
  await runSteps({
    page,
    userFlow: "Fill in all required contact form fields and submit",
    steps: [
      { description: `Navigate to ${BASE_URL}/contact` },
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

Same pattern in `subscribe.spec.ts`. `CI=true` means the test is skipped. Locally it runs.

Skipping the integration test doesn't mean the form goes untested in CI. Each spec actually covers three layers. The first two always run: does the form render, and does validation work — empty submit, bad email, required fields missing. Those catch the regressions that actually happen in day-to-day development. A field removed. Validation logic broken. The form component failing to mount. The third layer is the full end-to-end submission. You run that yourself before you ship, not on every commit.

The skipped test isn't a gap. It's a decision about what automation is actually for.

---

I shipped that nav label bug without ever noticing. Twenty tests later, it's fixed, the Calendly widget has a timeout it can meet, and CI runs the full suite on every push without touching a real endpoint.

Your portfolio probably has something like this. A form nobody's properly tested since you shipped it. A third-party embed you're just trusting because it loaded once. Worth two hours of your time to find out.

You own the setup. The AI owns the interpretation. That's the whole deal.
