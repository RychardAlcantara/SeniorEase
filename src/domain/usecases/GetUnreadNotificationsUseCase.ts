
import { Notification } from "../entities/Notification"
import { NotificationRepository } from "../repositories/NotificationRepository"

export class GetUnreadNotificationsUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(userId: string): Promise<Notification[]> {
    return this.notificationRepository.getUnread(userId)
  }
}