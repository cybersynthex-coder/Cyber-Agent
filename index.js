import { chromium } from 'playwright';
import readline from 'readline';

import { createProjectWorkspace } from './runtime/workspace-manager.js';

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const USER_DATA_DIR =
  'C:/Users/Necla/AppData/Local/Google/Chrome/User Data';

async function bootstrap() {
  const browser = await chromium.launchPersistentContext(
    USER_DATA_DIR,
    {
      executablePath: CHROME_PATH,
      headless: false,
      viewport: null,
      ignoreDefaultArgs: ['--enable-automation'],
      args: [
        '--start-maximized',
        '--profile-directory=Default',
        '--disable-blink-features=AutomationControlled'
      ]
    }
  );

  const page = browser.pages()[0] || await browser.newPage();

  await page.goto('https://chatgpt.com', {
    waitUntil: 'networkidle'
  });

  console.log('\nCyber-Agent using real Chrome profile.\n');
  console.log('If ChatGPT is already logged in no action is required.\n');
  console.log('Press ENTER to continue.\n');

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

  console.log('\nCyber-Agent runtime ready\n');

  const projectPath = await createProjectWorkspace('task-app');

  console.log('Workspace ready:', projectPath);
}

bootstrap();
