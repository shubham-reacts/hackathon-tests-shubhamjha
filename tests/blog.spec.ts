import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
import { BASE_URL } from "./constants";

test("blog listing page shows post cards", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the blog page and verify post cards are displayed",
    steps: [
      { description: `Navigate to ${BASE_URL}/blog` },
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

test("clicking a blog post navigates to the post detail page", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit a blog post detail page and verify its content",
    steps: [
      { description: `Navigate to ${BASE_URL}/blog/how-to-master-react-nextjs` },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "The post title is displayed as a heading" },
      { assertion: "The current URL contains /blog/ followed by a post slug" },
    ],
    test,
    expect,
  });
});

test("blog post renders code blocks and formatting", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit a technical blog post and check that code and formatting render correctly",
    steps: [
      { description: `Navigate to ${BASE_URL}/blog/scalable-web-apps-nextjs` },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "The post content is readable with proper headings and paragraphs" },
      { assertion: "At least one code snippet or code block with monospace formatting is visible" },
    ],
    test,
    expect,
  });
});
