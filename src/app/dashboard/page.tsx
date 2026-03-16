"use client";

import Navbar from "@/src/presentation/components/Navbar";
import TaskList from "@/src/presentation/components/TaskList";
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import Task from "@/src/domain/entities/Task";
import Modal from "@/src/presentation/components/Modal";
import NextTaskCard from "@/src/presentation/components/NextTaskCard";
import WeeklyStatsCard from "@/src/presentation/components/WeeklyStatsCard";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useConfig } from "@/src/presentation/contexts/ConfigContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import HistoryList from "@/src/presentation/components/HistoryList";

function DashboardContent() {
  const { altoContraste, setAltoContraste } = useContraste();
  const { config, salvarConfig } = useConfig();
  const tarefasHoje: number = 3;
  const simplificado = config.modoVisualizacao === "simplificada";

  const dataHoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-page)",
        color: altoContraste ? "var(--color-hc-text)" : "inherit",
        transition: "all 0.3s ease",
      }}
    >
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: altoContraste
                ? "var(--color-hc-text)"
                : "var(--color-text-primary)",
            }}
          >
            Olá, Usuário!
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={altoContraste}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setAltoContraste(checked);
                  salvarConfig({ ...config, altoContraste: checked });
                }}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "var(--color-hc-text)",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "var(--color-hc-text)",
                  },
                }}
              />
            }
            label="Alto Contraste"
            sx={{
              color: altoContraste
                ? "var(--color-hc-text)"
                : "var(--color-text-secondary)",
            }}
          />
        </Stack>

        <Typography
          variant="body1"
          sx={{
            color: altoContraste
              ? "var(--color-hc-text)"
              : "var(--color-text-secondary)",
            mb: 3,
          }}
        >
          Hoje é {dataHoje}. Você tem <strong>{tarefasHoje}</strong>{" "}
          {tarefasHoje === 1 ? "tarefa" : "tarefas"} para hoje.
        </Typography>

        {/* Card Próxima Tarefa + Estatística Semanal */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: simplificado ? 12 : 8 }}>
            <NextTaskCard title="Tomar medicamento" time="08:00" date="Hoje" />
          </Grid>
          {!simplificado && (
            <Grid size={{ xs: 12, md: 4 }}>
              <WeeklyStatsCard concluidas={5} pendentes={3} />
            </Grid>
          )}
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: simplificado ? 12 : 8 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: altoContraste
                  ? "var(--color-hc-text)"
                  : "text.secondary",
                mb: 3,
              }}
            >
              Minhas Tarefas
            </Typography>

            <TaskList
              showEditButton={!simplificado}
              setEditOpen={setEditOpen}
              setTasks={setTasks}
              tasks={tasks}
            />

            <CreateTaskButton onClick={() => {}} />
          </Grid>

          {!simplificado && (
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: altoContraste
                    ? "var(--color-hc-text)"
                    : "text.secondary",
                  mb: 3,
                }}
              >
                Histórico
              </Typography>

              <HistoryList tasks={tasks} />

              {open && (
                <Grid {...{ item: true, width: "40%" }}>
                  <Modal
                    type="create"
                    open={open}
                    onClose={() => setOpen(!open)}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                </Grid>
              )}

              {editOpen && (
                <Grid {...{ item: true, width: "40%" }}>
                  <Modal
                    type="edit"
                    open={editOpen}
                    onClose={() => setEditOpen(!editOpen)}
                    selectedTask={tasks.find(
                      (t) => t.id === tasks[tasks.length - 1].id,
                    )}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
