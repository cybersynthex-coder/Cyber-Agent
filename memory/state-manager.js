import fs from 'fs-extra';
import path from 'path';

export async function initializeProjectMemory(projectPath) {
  const memoryDir = path.join(projectPath, '.agent');

  await fs.ensureDir(memoryDir);

  const stateFile = path.join(memoryDir, 'state.json');

  if (!(await fs.pathExists(stateFile))) {
    await fs.writeJson(stateFile, {
      currentTask: '',
      knownRisks: [],
      architectureNotes: [],
      recentChanges: []
    }, { spaces: 2 });
  }
}
