import { execSync } from 'child_process';

export function runCommand(command, cwd = process.cwd()) {
  console.log('[COMMAND]', command);

  return execSync(command, {
    cwd,
    stdio: 'inherit'
  });
}
