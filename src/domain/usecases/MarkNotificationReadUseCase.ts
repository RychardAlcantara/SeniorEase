import { NotificationRepository } from "../repositories/NotificationRepository"


export class MarkNotificationReadUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(userId: string, notificationId: string): Promise<void> {
    return this.notificationRepository.markAsRead(userId, notificationId)
  }
}

export class MarkAllNotificationsReadUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(userId: string): Promise<void> {
    return this.notificationRepository.markAllAsRead(userId)
  }
}