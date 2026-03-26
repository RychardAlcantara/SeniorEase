import { Notification } from "../entities/Notification"

export interface NotificationRepository {
  getUnread(userId: string): Promise<Notification[]>
  markAsRead(userId: string, notificationId: string): Promise<void>
  markAllAsRead(userId: string): Promise<void>
  createNotification(userId: string, notification: Omit<Notification, "id">): Promise<void>
}