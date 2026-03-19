"use client"

import { useEffect, useState } from "react"
import { Home, ListTodo, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AppBar, Toolbar, Typography, Button, Box, Container, Stack } from "@mui/material"
import { useContraste } from "@/src/presentation/contexts/ContrasteContext"
import { useAuth } from "@/src/infrastructure/AuthContext"
import { signOutUseCase, getUserProfileUseCase } from "@/src/infrastructure/container"
import { UserAvatar } from "@/src/presentation/components/profile/UserAvatar"
import { UserProfile } from "@/src/domain/entities/UserProfile"

const links = [
  { title: "Início", href: "/dashboard", icon: <Home size={20} /> },
  { title: "Tarefas", href: "/tasks", icon: <ListTodo size={20} /> },
  { title: "Configurações", href: "/settings", icon: <Settings size={20} /> },
]

export default function Navbar() {
  const router = useRouter()
  const { user } = useAuth()
  const { altoContraste } = useContraste()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      const data = await getUserProfileUseCase.execute(user.id)
      setProfile(data)
    }
    loadProfile()
  }, [user])

  async function handleSignOut() {
    await signOutUseCase.execute()
    router.replace("/login")
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: altoContraste ? "none" : "var(--gradient-navbar)",
        backgroundColor: altoContraste ? "var(--color-hc-bg)" : undefined,
        boxShadow: 3,
        border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1 }}
        >

          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontStyle: "italic",
              color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-white)",
            }}
          >
            SeniorEase
          </Typography>

          {/* Navegação */}
          <Stack direction="row" spacing={4} alignItems="center">
            {links.map((link) => (
              <Button
                key={link.title}
                component={Link}
                href={link.href}
                color="inherit"
                startIcon={link.icon}
                sx={{
                  textTransform: "none",
                  color: altoContraste ? "var(--color-hc-text)" : "inherit",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                {link.title}
              </Button>
            ))}
          </Stack>

          {/* Ações */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            
            {/* Avatar com link para perfil */}
            <Box component={Link} href="/profile" sx={{ display: "flex", alignItems: "center" }}>
              <UserAvatar profile={profile} size={40} />
            </Box>

            <Button
              component={Link}
              href="/help"
              variant="contained"
              sx={{
                backgroundColor: altoContraste ? "var(--color-hc-accent)" : "var(--color-bg-card)",
                color: altoContraste ? "var(--color-hc-bg)" : "var(--color-primary)",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: altoContraste ? "#15c4d9" : "var(--color-bg-hover)",
                },
              }}
            >
              Precisa de ajuda?
            </Button>

            <Button
              variant="contained"
              onClick={handleSignOut}
              startIcon={<LogOut size={18} />}
              sx={{
                backgroundColor: altoContraste ? "var(--color-hc-accent)" : "var(--color-bg-card)",
                color: altoContraste ? "var(--color-hc-bg)" : "var(--color-primary)",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: altoContraste ? "#15c4d9" : "var(--color-bg-hover)",
                },
              }}
            >
              Sair
            </Button>

          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}