import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
import { BASE_URL } from "./constants";

test("primary nav links are present and point to the right pages", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the homepage and verify all primary navigation links are present",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "The navigation contains links for Home, About, Work, Blog, and Contact" },
      { assertion: "Each nav link has a visible label and appears clickable" },
      { assertion: "No nav link shows a 404 or broken state" },
    ],
    test,
    expect,
  });
});

test("theme toggle button is present in navigation", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Verify the theme toggle button is visible in the navigation",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
      { description: "Locate the theme toggle button in the navigation" },
    ],
    assertions: [
      { assertion: "A theme toggle button labeled 'Toggle theme' or with a sun/moon icon is present in the navigation" },
      { assertion: "The theme toggle button is visible and interactive" },
    ],
    test,
    expect,
  });
});

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
