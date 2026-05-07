import { chromium } from 'playwright';
import readline from 'readline';
import fs from 'fs-extra';

import { getProfilePath } from './runtime/profile-manager.js';
import { createProjectWorkspace } from './runtime/workspace-manager.js';

async function bootstrap() {
  const profilePath = await getProfilePath();

  const hasSession = (await fs.readdir(profilePath)).length > 0;

  const browser = await chromium.launchPersistentContext(profilePath, {
    channel: 'chrome',
    headless: hasSession,
    viewport: null,
    args: [
      '--start-maximized'
    ]
  });

  const page = browser.pages()[0] || await browser.newPage();

  await page.goto('https://chatgpt.com', {
    waitUntil: 'domcontentloaded'
  });

  if (!hasSession) {
    console.log('\nChrome login bootstrap started.');
    console.log('Login to ChatGPT with your Google account.');
    console.log('After login press ENTER here.\n');

    await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('', () => {
        rl.close();
        resolve();
      });
    });
  }

  console.log('\nCyber-Agent runtime ready\n');

  const projectPath = await createProjectWorkspace('task-app');

  console.log('Workspace ready:', projectPath);
}

bootstrap();
