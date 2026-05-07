import fg from 'fast-glob';

export async function scanRepository(projectPath) {
  const files = await fg(['**/*.{js,ts,tsx,json}'], {
    cwd: projectPath,
    ignore: ['node_modules']
  });

  return {
    totalFiles: files.length,
    files
  };
}
