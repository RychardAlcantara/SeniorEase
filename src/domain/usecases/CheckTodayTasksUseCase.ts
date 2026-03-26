import { NotificationRepository } from "../repositories/NotificationRepository"
import Task from "../entities/Task"

export class CheckTodayTasksUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(userId: string, tasks: Task[]): Promise<void> {
    const now = new Date()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split("T")[0]

    for (const task of tasks) {
      if (!task.expectedToBeDone || task.completed) continue

      const dueDate = new Date(task.expectedToBeDone)
      if (isNaN(dueDate.getTime())) continue

      const diffMs = dueDate.getTime() - now.getTime()
      const diffMinutes = diffMs / 1000 / 60

      // Gatilho 1: No dia da tarefa (vence hoje)
      const isDueToday = task.expectedToBeDone.startsWith(todayStr)

      // Gatilho 2: 1 hora antes (entre 50 e 70 minutos para vencer)
      const isOneHourBefore = diffMinutes >= 50 && diffMinutes <= 70

      if (isDueToday) {
        await this.notificationRepository.createNotification(userId, {
          taskId: task.id,
          title: "Tarefa para hoje!",
          message: `"${task.title}" vence hoje. Não esqueça de concluí-la!`,
          read: false,
          createdAt: new Date(),
        })
      }

      if (isOneHourBefore) {
        await this.notificationRepository.createNotification(userId, {
          taskId: `${task.id}_1h`,
          title: "⏰ Falta 1 hora!",
          message: `"${task.title}" vence em aproximadamente 1 hora.`,
          read: false,
          createdAt: new Date(),
        })
      }
    }
  }
}