import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "../firebase"

import { Notification } from "../../domain/entities/Notification"
import { NotificationRepository } from "@/src/domain/repositories/NotificationRepository"

export class FirebaseNotificationRepository implements NotificationRepository {
  private col(userId: string) {
    return collection(db, "users", userId, "notifications")
  }

  async getUnread(userId: string): Promise<Notification[]> {
    const q = query(
      this.col(userId),
      where("read", "==", false),
      orderBy("createdAt", "desc")
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        taskId: data.taskId,
        title: data.title,
        message: data.message,
        read: data.read,
        createdAt: (data.createdAt as Timestamp).toDate(),
      }
    })
  }

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    await updateDoc(doc(db, "users", userId, "notifications", notificationId), { read: true })
  }

  async markAllAsRead(userId: string): Promise<void> {
    const q = query(this.col(userId), where("read", "==", false))
    const snap = await getDocs(q)
    const batch = writeBatch(db)
    snap.docs.forEach((d) => batch.update(d.ref, { read: true }))
    await batch.commit()
  }

  async createNotification(userId: string, notification: Omit<Notification, "id">): Promise<void> {
    // Evita duplicatas: verifica se já existe notificação não lida para essa tarefa hoje
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const q = query(
      this.col(userId),
      where("taskId", "==", notification.taskId),
      where("read", "==", false)
    )
    const snap = await getDocs(q)

    // Só cria se não houver notificação não lida para essa tarefa hoje
    const alreadyExists = snap.docs.some((d) => {
      const createdAt = (d.data().createdAt as Timestamp).toDate()
      return createdAt >= today
    })

    if (!alreadyExists) {
      await addDoc(this.col(userId), {
        ...notification,
        createdAt: Timestamp.fromDate(notification.createdAt),
      })
    }
  }
}