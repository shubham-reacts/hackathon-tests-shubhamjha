import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
import { BASE_URL } from "./constants";

test("about page loads with bio content", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the about page and verify bio content is displayed",
    steps: [
      { description: `Navigate to ${BASE_URL}/about` },
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

test("Calendly booking widget loads on the contact page", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Check that the Calendly booking widget loads on the contact page",
    steps: [
      { description: `Navigate to ${BASE_URL}/contact` },
      { description: "Scroll down past the contact form to find the Calendly iframe below it" },
      { description: "If a cookie consent or privacy dialog is visible inside the Calendly widget, click the 'Decline' or 'I understand' button to dismiss it" },
    ],
    assertions: [
      { assertion: "A Calendly embed or booking widget is visible on the page" },
      { assertion: "A calendar grid or 'Select a Day' heading is visible inside the Calendly widget" },
    ],
    test,
    expect,
  });
});
