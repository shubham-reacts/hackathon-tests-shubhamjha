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

test("Calendly booking widget loads on the about page", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Check that the Calendly booking widget loads and is interactive",
    steps: [
      { description: `Navigate to ${BASE_URL}/about` },
      { description: "Scroll down to find the Calendly or booking section" },
      { description: "Wait for the Calendly iframe or booking widget to fully render (not show a loading spinner)" },
    ],
    assertions: [
      { assertion: "A Calendly embed or booking widget is visible on the page" },
      { assertion: "Time slots or a calendar grid are visible inside the Calendly widget — not just a loading spinner or blank iframe" },
    ],
    test,
    expect,
  });
});
