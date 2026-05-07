import path from 'path';
import os from 'os';
import fs from 'fs-extra';

export async function getProfilePath() {
  const profilePath = path.join(os.homedir(), '.cyber-agent-profile');
  await fs.ensureDir(profilePath);
  return profilePath;
}
