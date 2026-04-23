import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("primary nav links navigate correctly", async ({ page }) => {
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Click each primary navigation link and verify the correct page loads",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Click the About link in the navigation" },
      { description: "Navigate back to the homepage" },
      { description: "Click the Work link in the navigation" },
      { description: "Navigate back to the homepage" },
      { description: "Click the Blog link in the navigation" },
      { description: "Navigate back to the homepage" },
      { description: "Click the Contact link in the navigation" },
    ],
    assertions: [
      { assertion: "Each page loaded without a 404 or error message" },
      { assertion: "The navigation header remains visible on each page" },
    ],
    test,
    expect,
  });
});

test("theme toggle switches between dark and light mode", async ({ page }) => {
  test.setTimeout(120_000);
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

test("mobile navigation opens and closes", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await runSteps({
    page,
    userFlow: "Open and close the mobile navigation menu on a small screen",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
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
