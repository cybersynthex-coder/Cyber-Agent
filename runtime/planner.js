export function buildExecutionPlan(task) {
  return {
    task,
    steps: [
      'analyze-task',
      'create-workspace',
      'scaffold-project',
      'install-dependencies',
      'generate-files',
      'validate-runtime'
    ],
    createdAt: new Date().toISOString()
  };
}
