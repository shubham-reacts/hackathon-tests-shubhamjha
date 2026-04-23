import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("blog listing page shows post cards", async ({ page }) => {
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

test("clicking a blog post navigates to the post detail page", async ({ page }) => {
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

test("blog post renders code blocks and formatting", async ({ page }) => {
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
