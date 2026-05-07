import { chromium } from 'playwright';
import readline from 'readline';
import fs from 'fs-extra';

import { getProfilePath } from './runtime/profile-manager.js';
import { createProjectWorkspace } from './runtime/workspace-manager.js';

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function bootstrap() {
  const profilePath = await getProfilePath();

  const hasSession = (await fs.readdir(profilePath)).length > 0;

  const browser = await chromium.launchPersistentContext(profilePath, {
    executablePath: CHROME_PATH,
    headless: false,
    viewport: null,
    ignoreDefaultArgs: ['--enable-automation'],
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = browser.pages()[0] || await browser.newPage();

  await page.goto('https://chatgpt.com', {
    waitUntil: 'networkidle'
  });

  if (!hasSession) {
    console.log('\nChrome login bootstrap started.');
    console.log('Login to ChatGPT normally.');
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
