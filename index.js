import { chromium } from 'playwright';
import readline from 'readline';
import { exec } from 'child_process';

import { createProjectWorkspace } from './runtime/workspace-manager.js';

const CHROME_PATH =
  'C:/Program Files/Google/Chrome/Application/chrome.exe';

const DEBUG_PROFILE = 'C:/chrome-agent-profile';

async function launchChromeDebug() {
  const command = `"${CHROME_PATH}" --remote-debugging-port=9222 --user-data-dir="${DEBUG_PROFILE}"`;

  exec(command);

  console.log('\nLaunching real Chrome with remote debugging...\n');

  await new Promise((resolve) => setTimeout(resolve, 5000));
}

async function bootstrap() {
  await launchChromeDebug();

  const browser = await chromium.connectOverCDP(
    'http://127.0.0.1:9222'
  );

  const context = browser.contexts()[0];

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://chatgpt.com', {
    waitUntil: 'networkidle'
  });

  console.log('\nCyber-Agent connected to real Chrome session.\n');
  console.log('Login manually if required.\n');
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
