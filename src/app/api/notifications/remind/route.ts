import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { taskReminderEmailTemplate } from "@/src/infrastructure/template/taskReminderEmailTemplate"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { email, userName, taskTitle, type } = await req.json()

    if (!email || !taskTitle) {
      return NextResponse.json({ message: "Dados inválidos." }, { status: 400 })
    }

    const isOneHour = type === "oneHour"

    const subject = isOneHour
      ? `⏰ Falta 1 hora! "${taskTitle}" vence em breve`
      : `📋 Lembrete: "${taskTitle}" vence hoje!`

    await transporter.sendMail({
      from: `"SeniorEase" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      html: taskReminderEmailTemplate(taskTitle, userName, isOneHour),
    })

    return NextResponse.json({ message: "E-mail enviado." }, { status: 200 })
  } catch (error) {
    console.error("Erro ao enviar lembrete:", error)
    return NextResponse.json({ message: "Erro ao enviar e-mail." }, { status: 500 })
  }
}