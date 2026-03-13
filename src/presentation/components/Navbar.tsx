"use client";

import { Home, ListTodo, Settings, User, LogOut } from "lucide-react"
import Link from "next/link";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useAuth } from "@/src/infrastructure/AuthContext"
import { signOutUseCase } from "@/src/infrastructure/container"
import { useRouter } from "next/navigation"
import { AppBar, Toolbar, Typography, Button, Box, Container, Stack } from "@mui/material"

export default function Navbar() {
  const router = useRouter()
  const { user } = useAuth()
  const { altoContraste } = useContraste();
  const links = [
    { title: "Início", href: "/dashboard", icon: <Home size={20} /> },
    { title: "Tarefas", href: "/tasks", icon: <ListTodo size={20} /> },
    { title: "Configurações", href: "/settings", icon: <Settings size={20} /> },
    { title: "Meu Perfil", href: "#", icon: <User size={20} /> },
  ];

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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, fontStyle: "italic", color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-white)" }}
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
                sx={{ textTransform: "none", color: altoContraste ? "var(--color-hc-text)" : "inherit", "&:hover": { opacity: 0.8 } }}
                startIcon={link.icon}
              >
                {link.title}
              </Button>
            ))}
          </Stack>

          <Box>
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
                px: 2,
                py: 1,
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
                bgcolor: "white",
                color: "#1565c0",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#e3f2fd" },
              }}
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
