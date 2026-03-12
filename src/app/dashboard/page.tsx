"use client"

import Navbar from "@/src/presentation/components/Navbar"
import TaskList from "@/src/presentation/components/TaskList"
import HistoryList from "@/src/presentation/components/HistoryList"
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton"
import NextTaskCard from "@/src/presentation/components/NextTaskCard"
import { ContrasteProvider, useContraste } from "@/src/presentation/contexts/ContrasteContext"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Stack from "@mui/material/Stack"

function DashboardContent() {

  const { altoContraste, setAltoContraste } = useContraste();
  const tarefasHoje: number = 3;

  const dataHoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (

    <Box sx={{ minHeight: "100vh", bgcolor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-page)", color: altoContraste ? "var(--color-hc-text)" : "inherit", transition: "all 0.3s ease" }}>

      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-primary)" }}>
            Olá, Usuário!
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={altoContraste}
                onChange={(e) => setAltoContraste(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "var(--color-hc-accent)" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "var(--color-hc-accent)" },
                }}
              />
            }
            label="Alto Contraste"
            sx={{ color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-secondary)" }}
          />
        </Stack>

        <Typography variant="body1" sx={{ color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-secondary)", mb: 3 }}>
          Hoje é {dataHoje}. Você tem <strong>{tarefasHoje}</strong> {tarefasHoje === 1 ? "tarefa" : "tarefas"} para hoje.
        </Typography>

        {/* Card Próxima Tarefa */}
        <NextTaskCard title="Tomar medicamento" time="08:00" date="Hoje" />

        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 8 }}>

            <Typography variant="h4" sx={{ fontWeight: 700, color: altoContraste ? "var(--color-hc-text)" : "text.secondary", mb: 3 }}>
              Minhas Tarefas
            </Typography>

            <TaskList />

            <CreateTaskButton />

          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <Typography variant="h4" sx={{ fontWeight: 700, color: altoContraste ? "var(--color-hc-text)" : "text.secondary", mb: 3 }}>
              Histórico
            </Typography>

            <HistoryList />
          </Grid>

        </Grid>

      </Container>

    </Box>

  )
}

export default function Dashboard() {
  return (
    <ContrasteProvider>
      <DashboardContent />
    </ContrasteProvider>
  );
}