import Task from "@/src/domain/entities/Task";

function getNextTask(tasks: Task[]) {
  const now = Date.now();

  const candidates = tasks
    .filter((t) => !t.completed && !!t.expectedToBeDone)
    .map((t) => {
      const d = new Date(t.expectedToBeDone as string);
      const time = d.getTime();
      return Number.isNaN(time) ? null : { task: t, date: d, time };
    })
    .filter((x): x is { task: Task; date: Date; time: number } => x !== null)
    .filter(({ time }) => time >= now); // apenas futuras (ou agora)

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => a.time - b.time);
  return candidates[0]; // mais próxima
}

export default getNextTask;
