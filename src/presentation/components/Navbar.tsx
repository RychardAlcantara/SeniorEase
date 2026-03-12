"use client"

import { useRouter } from "next/navigation"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Home, ListTodo, Settings, User, LogOut } from "lucide-react"
import { useAuth } from "@/src/infrastructure/AuthContext"
import { signOutUseCase } from "@/src/infrastructure/container"

export default function Navbar() {
  const router = useRouter()
  const { user } = useAuth()

  async function handleSignOut() {
    await signOutUseCase.execute()
    router.replace("/login")
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #1565c0, #1976d2)",
        boxShadow: 2,
      }}
    >
      <Toolbar sx={{ maxWidth: "1152px", width: "100%", mx: "auto", px: 2, gap: 2 }}>

        {/* Logo */}
        <Typography
          variant="h5"
          fontWeight="bold"
          fontStyle="italic"
          sx={{ flexGrow: 0, mr: 4 }}
        >
          SeniorEase
        </Typography>

        {/* Nav links */}
        <Box display="flex" gap={1} flexGrow={1}>
          <Button color="inherit" startIcon={<Home size={18} />} sx={{ fontSize: "1rem" }}>
            Início
          </Button>
          <Button color="inherit" startIcon={<ListTodo size={18} />} sx={{ fontSize: "1rem" }}>
            Tarefas
          </Button>
          <Button color="inherit" startIcon={<Settings size={18} />} sx={{ fontSize: "1rem" }}>
            Configurações
          </Button>
          <Button color="inherit" startIcon={<User size={18} />} sx={{ fontSize: "1rem" }}>
            Meu Perfil
          </Button>
        </Box>

        {/* Ajuda */}
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            fontWeight: "bold",
            "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          Precisa de ajuda?
        </Button>

        {/* Sair */}
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

      </Toolbar>
    </AppBar>
  )
}