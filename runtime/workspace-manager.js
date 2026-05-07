import fs from 'fs-extra';
import path from 'path';

export async function ensureProjectsRoot() {
  const projectsDir = path.resolve('projects');
  await fs.ensureDir(projectsDir);
  return projectsDir;
}

export async function createProjectWorkspace(name) {
  const projectsDir = await ensureProjectsRoot();
  const projectPath = path.join(projectsDir, name);

  await fs.ensureDir(projectPath);
  await fs.ensureDir(path.join(projectPath, '.agent'));

  return projectPath;
}
