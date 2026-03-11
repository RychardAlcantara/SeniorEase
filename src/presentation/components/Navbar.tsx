"use client";

import { Home, ListTodo, Settings, User } from "lucide-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function Navbar() {
  const links = [
    { title: "Início", href: "#" },
    { title: "Tarefas", href: "#" },
    { title: "Configurações", href: "#" },
    { title: "Meu Perfil", href: "#" },
  ];
  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: "linear-gradient(to right, #1e40af, #2563eb)", // from-blue-600 to-blue-500
        boxShadow: 3,
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
            sx={{ fontWeight: 700, fontStyle: "italic", color: "#fff" }}
          >
            SeniorEase
          </Typography>

          {/* Navegação */}
          <Stack direction="row" spacing={4} alignItems="center">
            {links.map((link) => (
              <Button
                key={link.title}
                color="inherit"
                sx={{ textTransform: "none", "&:hover": { opacity: 0.8 } }}
                startIcon={<ListTodo size={20} />}
              >
                {link.title}
              </Button>
            ))}
          </Stack>

          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#2563eb",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                py: 1,
                "&:hover": {
                  backgroundColor: "#f1f5f9",
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
