"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthCard } from "@/src/presentation/components/auth/AuthCard"
import { AuthInput } from "@/src/presentation/components/auth/AuthInput"
import { PasswordInput } from "@/src/presentation/components/auth/PasswordInput"
import { AuthButton } from "@/src/presentation/components/auth/AuthButton"
import { AuthLink } from "@/src/presentation/components/auth/AuthLink"
import { AlertMessage } from "@/src/presentation/components/auth/AlertMessage"
import { signUpUseCase } from "@/src/infrastructure/container"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit() {
    setError("")
    setLoading(true)
    try {
      await signUpUseCase.execute(email, password, confirmPassword, name)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Criar Conta" subtitle="Preencha seus dados para começar">

      {error && <AlertMessage type="error" message={error} />}

      <AuthInput
        label="Nome completo"
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <AuthInput
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        value={password}
        onChange={setPassword}
      />

      <PasswordInput
        label="Confirmar senha"
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <AuthButton loading={loading} onClick={handleSubmit}>
        CRIAR CONTA
      </AuthButton>

      <div className="text-center mt-6">
        <AuthLink href="/login">
          Já tem uma conta? Entrar
        </AuthLink>
      </div>

    </AuthCard>
  )
}
