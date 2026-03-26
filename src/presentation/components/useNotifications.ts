"use client"

import { useEffect } from "react"
import { useAuth } from "@/src/infrastructure/AuthContext"
import { checkTodayTasksUseCase } from "@/src/infrastructure/container"
import Task from "@/src/domain/entities/Task"

export function useNotifications(tasks: Task[]) {
  const { user } = useAuth()

  useEffect(() => {
    if (!user || tasks.length === 0) return

    async function run() {
      // 1. Cria notificações no Firestore (sino)
      await checkTodayTasksUseCase.execute(user!.id, tasks)

      // 2. Push Notification do navegador
      await requestAndSendPushNotifications(tasks)

      // 3. E-mail de lembrete
      await sendEmailReminders(user!, tasks)
    }

    run()
  }, [user, tasks])
}

function getTasksForToday(tasks: Task[]): Task[] {
  const todayStr = new Date().toISOString().split("T")[0]
  return tasks.filter((t) => !t.completed && t.expectedToBeDone?.startsWith(todayStr))
}

function getTasksOneHourBefore(tasks: Task[]): Task[] {
  const now = new Date()
  return tasks.filter((t) => {
    if (!t.expectedToBeDone || t.completed) return false
    const due = new Date(t.expectedToBeDone)
    if (isNaN(due.getTime())) return false
    const diffMinutes = (due.getTime() - now.getTime()) / 1000 / 60
    return diffMinutes >= 50 && diffMinutes <= 70
  })
}

async function requestAndSendPushNotifications(tasks: Task[]) {
  if (!("Notification" in window)) return

  let permission = Notification.permission
  if (permission === "default") {
    permission = await Notification.requestPermission()
  }
  if (permission !== "granted") return

  // Notificações do dia
  const todayTasks = getTasksForToday(tasks)
  todayTasks.forEach((task) => {
    const key = `push_today_${task.id}_${new Date().toISOString().split("T")[0]}`
    if (localStorage.getItem(key)) return
    new Notification("📋 Tarefa para hoje!", {
      body: `"${task.title}" vence hoje!`,
      icon: "/favicon.ico",
    })
    localStorage.setItem(key, "true")
  })

  // Notificações de 1 hora antes
  const oneHourTasks = getTasksOneHourBefore(tasks)
  oneHourTasks.forEach((task) => {
    const key = `push_1h_${task.id}_${new Date().toISOString().split("T")[0]}`
    if (localStorage.getItem(key)) return
    new Notification("⏰ Falta 1 hora!", {
      body: `"${task.title}" vence em aproximadamente 1 hora.`,
      icon: "/favicon.ico",
    })
    localStorage.setItem(key, "true")
  })
}

async function sendEmailReminders(
  user: { id: string; email: string },
  tasks: Task[]
) {
  const today = new Date().toISOString().split("T")[0]

  // E-mail do dia
  const todayTasks = getTasksForToday(tasks)
  for (const task of todayTasks) {
    const key = `email_today_${task.id}_${today}`
    if (localStorage.getItem(key)) continue
    await fetch("/api/notifications/remind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        userName: "",
        taskTitle: task.title,
        type: "today",
      }),
    })
    localStorage.setItem(key, "true")
  }

  // E-mail de 1 hora antes
  const oneHourTasks = getTasksOneHourBefore(tasks)
  for (const task of oneHourTasks) {
    const key = `email_1h_${task.id}_${today}`
    if (localStorage.getItem(key)) continue
    await fetch("/api/notifications/remind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        userName: "",
        taskTitle: task.title,
        type: "oneHour",
      }),
    })
    localStorage.setItem(key, "true")
  }
}