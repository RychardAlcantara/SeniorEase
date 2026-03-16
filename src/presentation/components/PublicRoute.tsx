"use client"

import { useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Box, CircularProgress } from "@mui/material"
import { useAuth } from "@/src/infrastructure/AuthContext"

export function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard")
    }
  }, [user, loading, router])

  if (loading || user) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}