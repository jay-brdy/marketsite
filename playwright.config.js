import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:5173',
    launchOptions: {
      headless: false, //Run in headed mode
      slowMo: 400, //slow down by 400ms
    },
  },
});