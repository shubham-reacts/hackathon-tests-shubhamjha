import dotenv from "dotenv";
import path from "path";
import { configure } from "passmark";

dotenv.config({ path: path.resolve(__dirname, ".env") });

configure({
  ai: {
    gateway: "openrouter",
  },
});

const BASE_URL = process.env.BASE_URL ?? "https://shubhamjha.com";

export default {
  testDir: "./tests",
  timeout: 120_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["junit", { outputFile: "test-results/results.xml" }], ["list"]]
    : "html",
  use: {
    baseURL: BASE_URL,
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
};
