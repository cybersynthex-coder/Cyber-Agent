export function buildContextSummary(memory) {
  return {
    currentTask: memory.currentTask,
    knownRisks: memory.knownRisks?.slice(0, 5),
    architectureNotes: memory.architectureNotes?.slice(0, 5)
  };
}
