import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { getAuth } from "firebase-admin/auth"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { resetPasswordEmailTemplate } from "@/src/infrastructure/template/resetPasswordEmailTemplate"

// Inicializa Firebase Admin (server-side) uma única vez
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "E-mail inválido." }, { status: 400 })
    }

    // Gera o link de reset pelo Firebase Admin
    const resetLink = await getAuth().generatePasswordResetLink(email)

    // Envia o e-mail via Resend com template customizado
    await resend.emails.send({
      from: "SeniorEase <onboarding@resend.dev>",
      to: email,
      subject: "Recuperação de senha - SeniorEase",
      html: resetPasswordEmailTemplate(resetLink),
    })

    return NextResponse.json({ message: "E-mail enviado com sucesso." }, { status: 200 })

  } catch (error: any) {
    // Não expõe se o e-mail existe ou não (segurança)
    console.error("Erro ao enviar e-mail de reset:", error)
    return NextResponse.json(
      { message: "Se este e-mail estiver cadastrado, você receberá as instruções em breve." },
      { status: 200 }
    )
  }
}