import dotenv from "dotenv";
import path from "path";
import { configure } from "passmark";

dotenv.config({ path: path.resolve(__dirname, ".env") });

configure({
  ai: {
    gateway: "openrouter",
  },
});

export default {
  testDir: "./tests",
  timeout: 60_000,
  use: {
    baseURL: "https://shubhamjha.com",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
};
