"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box } from "@mui/material"
import { PublicRoute } from "@/src/presentation/components/PublicRoute"
import { AuthCard } from "@/src/presentation/components/auth/AuthCard"
import { AuthInput } from "@/src/presentation/components/auth/AuthInput"
import { PasswordInput } from "@/src/presentation/components/auth/PasswordInput"
import { AuthButton } from "@/src/presentation/components/auth/AuthButton"
import { AuthLink } from "@/src/presentation/components/auth/AuthLink"
import { AlertMessage } from "@/src/presentation/components/auth/AlertMessage"
import { signInUseCase } from "@/src/infrastructure/container"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit() {
    setError("")
    setLoading(true)
    try {
      await signInUseCase.execute(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicRoute>
      <AuthCard title="Login" subtitle="Plataforma acessível para você">

        {error && <AlertMessage type="error" message={error} />}

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

        <AuthButton loading={loading} onClick={handleSubmit}>
          ENTRAR
        </AuthButton>

        <Box display="flex" flexDirection="column" gap={1.5} mt={3}>
          <AuthLink href="/forgot-password">Esqueceu sua senha?</AuthLink>
          <AuthLink href="/register">Criar Conta</AuthLink>
        </Box>

      </AuthCard>
    </PublicRoute>
  )
}