import { chromium } from 'playwright';
import { getProfilePath } from './runtime/profile-manager.js';
import { createProjectWorkspace } from './runtime/workspace-manager.js';

async function bootstrap() {
  const profilePath = await getProfilePath();

  const browser = await chromium.launchPersistentContext(profilePath, {
    headless: true
  });

  const page = await browser.newPage();

  await page.goto('https://chatgpt.com');

  console.log('Cyber-Agent runtime started');

  const projectPath = await createProjectWorkspace('task-app');

  console.log('Workspace ready:', projectPath);
}

bootstrap();
