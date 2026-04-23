import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("contact form is visible", async ({ page }) => {
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Visit the contact page and verify the form is present",
    steps: [
      { description: "Navigate to https://shubhamjha.com/contact" },
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

test("submitting an empty contact form shows validation errors", async ({ page }) => {
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Submit the contact form without filling in any fields",
    steps: [
      { description: "Navigate to https://shubhamjha.com/contact" },
      { description: "Click the submit button without entering any data" },
    ],
    assertions: [
      { assertion: "An error or validation message is shown indicating required fields are missing" },
      { assertion: "The form is still visible and has not navigated away" },
    ],
    test,
    expect,
  });
});

test("filling and submitting the contact form shows a success state", async ({ page }) => {
  test.setTimeout(120_000);
  await runSteps({
    page,
    userFlow: "Fill in all required contact form fields and submit",
    steps: [
      { description: "Navigate to https://shubhamjha.com/contact" },
      { description: "Type 'Test User' in the name field" },
      { description: "Type 'test@example.com' in the email field" },
      { description: "Type 'This is a test message from Playwright.' in the message field" },
      { description: "Click the submit button" },
    ],
    assertions: [
      { assertion: "A success message or confirmation is shown after submission" },
      { assertion: "No error messages are visible" },
    ],
    test,
    expect,
  });
});
