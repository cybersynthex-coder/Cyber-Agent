import { chromium } from 'playwright';
import readline from 'readline';
import fs from 'fs-extra';

import { getProfilePath } from './runtime/profile-manager.js';
import { createProjectWorkspace } from './runtime/workspace-manager.js';

async function bootstrap() {
  const profilePath = await getProfilePath();

  const hasSession = (await fs.readdir(profilePath)).length > 0;

  const browser = await chromium.launchPersistentContext(profilePath, {
    headless: hasSession
  });

  const page = await browser.newPage();

  await page.goto('https://chatgpt.com');

  if (!hasSession) {
    console.log('\nLogin to ChatGPT then press ENTER.\n');

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

  console.log('Cyber-Agent runtime ready');

  const projectPath = await createProjectWorkspace('task-app');

  console.log('Workspace ready:', projectPath);
}

bootstrap();
