import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("homepage loads and hero is visible", async ({ page }) => {
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

test("featured content section is visible", async ({ page }) => {
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

test("newsletter CTA section is present", async ({ page }) => {
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
