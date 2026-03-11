"use client"

import { useState } from "react"
import { AuthCard } from "@/src/presentation/components/auth/AuthCard"
import { AuthInput } from "@/src/presentation/components/auth/AuthInput"
import { AuthButton } from "@/src/presentation/components/auth/AuthButton"
import { AuthLink } from "@/src/presentation/components/auth/AuthLink"
import { AlertMessage } from "@/src/presentation/components/auth/AlertMessage"
import { forgotPasswordUseCase } from "@/src/infrastructure/container"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit() {
    setError("")
    setSuccess("")
    setLoading(true)
    try {
      await forgotPasswordUseCase.execute(email)
      setSuccess("E-mail de recuperação enviado! Verifique sua caixa de entrada.")
      setEmail("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Recuperar Senha"
      subtitle="Informe seu e-mail para receber o link de recuperação"
    >

      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}

      <AuthInput
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthButton loading={loading} onClick={handleSubmit}>
        ENVIAR LINK
      </AuthButton>

      <div className="text-center mt-6">
        <AuthLink href="/login">
          Voltar para o login
        </AuthLink>
      </div>

    </AuthCard>
  )
}
