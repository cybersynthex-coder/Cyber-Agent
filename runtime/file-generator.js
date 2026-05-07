import fs from 'fs-extra';
import path from 'path';

export async function generateFile(projectPath, relativePath, content) {
  const targetPath = path.join(projectPath, relativePath);

  await fs.ensureDir(path.dirname(targetPath));

  await fs.writeFile(targetPath, content, 'utf8');

  return targetPath;
}
