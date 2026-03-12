export class ForgotPasswordUseCase {
  async execute(email: string): Promise<void> {
    if (!email || !email.includes("@")) {
      throw new Error("Informe um e-mail válido.")
    }

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message ?? "Erro ao enviar e-mail de recuperação.")
    }
  }
}