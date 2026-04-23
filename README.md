# Breaking Apps Hackathon — AI-Powered Tests for shubhamjha.com

A Passmark + Playwright test suite for [shubhamjha.com](https://shubhamjha.com), built for the [Hashnode × Bug0 Breaking Apps Hackathon](https://hashnode.com/hackathons/breaking-things).

## What this does

This project uses [Passmark](https://github.com/bug0inc/passmark) to test every user-facing feature of shubhamjha.com — a Next.js personal portfolio — using plain-English test descriptions instead of CSS selectors. No page objects. No brittle selectors. Just natural language steps and assertions powered by an LLM via OpenRouter.

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

## Requirements

- Node.js 18+
- OpenRouter API key (free via [hackathon registration](https://hashnode.com/hackathons/breaking-things))
