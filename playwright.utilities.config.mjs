import { defineConfig } from "@playwright/test";
import base from "./playwright.config.mjs";
export default defineConfig({
  ...base,
  testMatch:"portfolio-utilities.spec.mjs",
  timeout:30000,
  use:{...base.use,baseURL:"http://127.0.0.1:4193",headless:true},
  webServer:{
    command:"node scripts/preview-export.mjs",
    env:{PORT:"4193"},
    url:"http://127.0.0.1:4193/",
    reuseExistingServer:false,
    timeout:30000,
  },
});
