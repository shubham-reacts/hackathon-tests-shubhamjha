import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("about page loads with bio content", async ({ page }) => {
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Visit the about page and verify bio content is displayed",
    steps: [
      { description: "Navigate to https://shubhamjha.com/about" },
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
  test.setTimeout(60_000);
  await runSteps({
    page,
    userFlow: "Check that the Calendly booking widget loads and is interactive",
    steps: [
      { description: "Navigate to https://shubhamjha.com/about" },
      { description: "Scroll down to find the Calendly or booking section" },
    ],
    assertions: [
      { assertion: "A Calendly embed or booking widget is visible on the page" },
      { assertion: "The widget appears interactive and not in an error state" },
    ],
    test,
    expect,
  });
});
