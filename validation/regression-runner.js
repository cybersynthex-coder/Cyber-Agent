import { execSync } from 'child_process';

export function runRegressionSuite(projectPath) {
  try {
    execSync('npm test', {
      cwd: projectPath,
      stdio: 'inherit'
    });

    return true;
  } catch {
    return false;
  }
}
