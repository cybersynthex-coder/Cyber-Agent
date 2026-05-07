export function createActionGraph(plan) {
  return plan.steps.map((step, index) => ({
    id: index + 1,
    step,
    status: 'pending'
  }));
}
