"use client";

import Navbar from "@/src/presentation/components/Navbar";
import TaskList from "@/src/presentation/components/TaskList";
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton";
import { useEffect, useState } from "react";
import { Box, Grid, Switch, Stack, Container, Typography } from "@mui/material";
import Task from "@/src/domain/entities/Task";
import Modal from "@/src/presentation/components/Modal";
import NextTaskCard from "@/src/presentation/components/NextTaskCard";
import WeeklyStatsCard from "@/src/presentation/components/WeeklyStatsCard";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useConfig } from "@/src/presentation/contexts/ConfigContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import HistoryList from "@/src/presentation/components/HistoryList";
import { formatTimePtBR, formatDatePtBR } from "../helpers/formatDatePtBR";
import getNextTask from "../helpers/getNextTask";
import { getAllTasksUseCase } from "@/src/infrastructure/container";

function DashboardContent() {
  const { altoContraste, setAltoContraste } = useContraste();
  const { config, salvarConfig } = useConfig();
  const simplificado = config.modoVisualizacao === "simplificada";

  const dataHoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const tarefasHoje = tasks.filter((t) => {
    if (!t.expectedToBeDone) return false;
    const dataTarefa = new Date(t.expectedToBeDone);
    return dataTarefa.getDate() === new Date().getDate();
  });
  const next = getNextTask(tasks);

  const nextTitle = next?.task.title ?? "Sem próximas tarefas";
  const nextTime = next ? formatTimePtBR(next.date) : "-";
  const nextDate = next ? formatDatePtBR(next.date) : "-";

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const all = await getAllTasksUseCase.execute();
        setTasks(all);
      } catch (err) {
        console.error("Erro ao carregar tarefas:", err);
      }
    };

    loadTasks();
  }, [open, editOpen]);

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
          Hoje é {dataHoje}. Você tem <strong>{tarefasHoje.length}</strong>{" "}
          {tarefasHoje.length === 1 ? "tarefa" : "tarefas"} para hoje.
        </Typography>

        {/* Card Próxima Tarefa + Estatística Semanal */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: simplificado ? 12 : 8 }}>
            <NextTaskCard
              title={nextTitle}
              time={nextTime}
              date={nextDate}
            />{" "}
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
              tasks={tasks.filter((t) => !t.completed)}
            />

            <CreateTaskButton onClick={() => setOpen(true)} />
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
