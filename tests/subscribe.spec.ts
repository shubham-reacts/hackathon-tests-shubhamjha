import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("newsletter form is visible", async ({ page }) => {
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Visit the homepage and find the newsletter subscribe form",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
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
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Submit the newsletter form with no email entered",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
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

test("submitting a valid email shows success state", async ({ page }) => {
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Subscribe to the newsletter with a valid test email",
    steps: [
      { description: "Navigate to https://shubhamjha.com" },
      { description: "Scroll to the newsletter subscribe section" },
      { description: "Type 'playwright-test@example.com' in the email input" },
      { description: "Click the subscribe or sign up button" },
    ],
    assertions: [
      { assertion: "A success message or confirmation is displayed after subscribing" },
      { assertion: "No error message is visible" },
    ],
    test,
    expect,
  });
});
