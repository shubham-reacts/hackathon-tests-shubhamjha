import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
import { BASE_URL } from "./constants";

test("projects page loads and shows project cards", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the projects page and verify project cards are displayed",
    steps: [
      { description: `Navigate to ${BASE_URL}/projects` },
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

test("project cards show external links", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Check that project cards contain links to GitHub or live demos",
    steps: [
      { description: `Navigate to ${BASE_URL}/projects` },
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
