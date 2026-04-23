import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
import { BASE_URL } from "./constants";

test("newsletter form is visible", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the homepage and find the newsletter subscribe form",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
      { description: "Scroll to the newsletter or subscribe section" },
    ],
    assertions: [
      { assertion: "An email input field for subscribing is visible" },
      { assertion: "A subscribe or sign up button is present" },
    ],
    test,
    expect,
  });
});

test("submitting an empty email shows a validation error", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Submit the newsletter form with no email entered",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
      { description: "Scroll to the newsletter subscribe section" },
      { description: "Click the subscribe button without entering an email" },
    ],
    assertions: [
      { assertion: "A validation error or prompt is shown indicating an email is required" },
    ],
    test,
    expect,
  });
});

// Skipped in CI to avoid real subscriptions hitting the production newsletter endpoint on every run.
test("submitting a valid email shows success state", async ({ page }) => {
  test.skip(!!process.env.CI, "skipped in CI to avoid real subscriptions to the production newsletter endpoint");
  await runSteps({
    page,
    userFlow: "Subscribe to the newsletter with a valid test email",
    steps: [
      { description: `Navigate to ${BASE_URL}` },
      { description: "Scroll to the newsletter subscribe section" },
      { description: "Type 'playwright-test@example.com' in the email input" },
      { description: "Click the subscribe or sign up button" },
    ],
    assertions: [
      { assertion: "The system acknowledged the subscription attempt — either a success confirmation or an 'already subscribed' message is shown" },
    ],
    test,
    expect,
  });
});
