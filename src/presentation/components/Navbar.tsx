"use client";

import { Home, ListTodo, Settings, User } from "lucide-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

export default function Navbar() {
  const { altoContraste } = useContraste();
  const links = [
    { title: "Início", href: "#", icon: <Home size={20} /> },
    { title: "Tarefas", href: "#", icon: <ListTodo size={20} /> },
    { title: "Configurações", href: "#", icon: <Settings size={20} /> },
    { title: "Meu Perfil", href: "#", icon: <User size={20} /> },
  ];
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
