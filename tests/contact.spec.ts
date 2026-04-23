import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
import { BASE_URL } from "./constants";

test("contact form is visible", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Visit the contact page and verify the form is present",
    steps: [
      { description: `Navigate to ${BASE_URL}/contact` },
      { description: "Wait for the page to fully load" },
    ],
    assertions: [
      { assertion: "A contact form is visible on the page" },
      { assertion: "The form has fields for name, email, and message" },
      { assertion: "A submit button is present" },
    ],
    test,
    expect,
  });
});

test("submitting an empty contact form keeps the form visible", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Submit the contact form without filling in any fields",
    steps: [
      { description: `Navigate to ${BASE_URL}/contact` },
      { description: "Click the 'Send Message' submit button without entering any data" },
    ],
    assertions: [
      { assertion: "The contact form is still visible on the page and has not navigated away" },
      { assertion: "The 'Send Message' or submit button is still present" },
    ],
    test,
    expect,
  });
});

// Skipped in CI to avoid sending real messages to the production inbox on every run.
test("filling and submitting the contact form shows a success state", async ({ page }) => {
  test.skip(!!process.env.CI, "skipped in CI to avoid real submissions to the production contact endpoint");
  await runSteps({
    page,
    userFlow: "Fill in all required contact form fields and submit",
    steps: [
      { description: `Navigate to ${BASE_URL}/contact` },
      { description: "Type 'Test' in the First name field" },
      { description: "Type 'User' in the Last name field" },
      { description: "Type 'test@example.com' in the Email field" },
      { description: "Type 'This is a test message from Playwright.' in the Message field" },
      { description: "Click the 'Send Message' button" },
    ],
    assertions: [
      { assertion: "A success message, confirmation, or 'Message Sent' button is shown after submission" },
      { assertion: "No error messages are visible" },
    ],
    test,
    expect,
  });
});
