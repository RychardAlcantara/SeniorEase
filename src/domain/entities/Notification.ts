export interface Notification {
  id: string
  taskId: string
  title: string
  message: string
  read: boolean
  createdAt: Date
}