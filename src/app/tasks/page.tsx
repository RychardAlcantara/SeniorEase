"use client";

import Navbar from "@/src/presentation/components/Navbar";
import TaskList from "@/src/presentation/components/TaskList";
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton";
import HistoryList from "@/src/presentation/components/HistoryList";
import Modal from "@/src/presentation/components/Modal";
import { useState } from "react";
import {
  Box,
  Switch,
  Stack,
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchIcon from "@mui/icons-material/Search";
import Task from "@/src/domain/entities/Task";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useConfig } from "@/src/presentation/contexts/ConfigContext";
import { PrivateRoute } from "@/src/presentation/components/PrivateRoute";

function TasksContent() {
  const { altoContraste, setAltoContraste } = useContraste();
  const { config, salvarConfig } = useConfig();
  const simplificado = config.modoVisualizacao === "simplificada";

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tab, setTab] = useState(0);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<"asc" | "desc">("asc");

  const pendentes = tasks.filter((t) => !t.completed);
  const filtro = busca.trim().toLowerCase();

  function ordenarPorData(lista: Task[]) {
    return lista.slice().sort((a, b) => {
      const da = a.expectedToBeDone ? new Date(a.expectedToBeDone).getTime() : Infinity;
      const db = b.expectedToBeDone ? new Date(b.expectedToBeDone).getTime() : Infinity;
      return ordenacao === "asc" ? da - db : db - da;
    });
  }

  const pendentesFiltradas = ordenarPorData(
    filtro ? pendentes.filter((t) => t.title.toLowerCase().includes(filtro)) : pendentes
  );
  const concluidasFiltradas = ordenarPorData(
    filtro
      ? tasks.filter((t) => t.completed && t.title.toLowerCase().includes(filtro))
      : tasks.filter((t) => t.completed)
  );

  return (
    <PrivateRoute>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: altoContraste
            ? "var(--color-hc-bg)"
            : "var(--color-bg-page)",
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
              Tarefas
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

          <Box sx={{ mt: -3, mb: 3 }}>
            <CreateTaskButton onClick={() => setOpen(true)} />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, width: "100%" }}>
            <TextField
              placeholder="Buscar tarefas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: altoContraste
                            ? "var(--color-hc-text)"
                            : "var(--color-text-secondary)",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                flex: 1,
                minWidth: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: altoContraste
                    ? "var(--color-hc-bg)"
                    : "var(--color-bg-card)",
                  color: altoContraste ? "var(--color-hc-text)" : undefined,
                  "& fieldset": {
                    borderColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : undefined,
                  },
                  "&:hover fieldset": {
                    borderColor: altoContraste
                      ? "var(--color-hc-text)"
                      : undefined,
                  },
                },
              }}
            />

            <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  color: altoContraste
                    ? "var(--color-hc-text)"
                    : "var(--color-text-secondary)",
                }}
              >
                Ordenar por:
              </Typography>
              <ToggleButtonGroup
                value={ordenacao}
                exclusive
                onChange={(_, v) => { if (v) setOrdenacao(v); }}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    borderColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : undefined,
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "var(--color-text-secondary)",
                    "&.Mui-selected": {
                      backgroundColor: altoContraste
                        ? "var(--color-hc-accent)"
                        : "var(--color-primary)",
                      color: altoContraste
                        ? "var(--color-hc-bg)"
                        : "var(--color-text-white)",
                      "&:hover": {
                        backgroundColor: altoContraste
                          ? "#15c4d9"
                          : undefined,
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="asc">Mais antigas</ToggleButton>
                <ToggleButton value="desc">Mais recentes</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>

          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                color: altoContraste
                  ? "var(--color-hc-text)"
                  : "var(--color-text-secondary)",
              },
              "& .Mui-selected": {
                color: altoContraste
                  ? "var(--color-hc-accent) !important"
                  : "var(--color-primary) !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: altoContraste
                  ? "var(--color-hc-accent)"
                  : "var(--color-primary)",
              },
            }}
          >
            <Tab label={`Pendentes (${pendentesFiltradas.length})`} />
            <Tab label={`Concluídas (${concluidasFiltradas.length})`} />
          </Tabs>

          {tab === 0 && (
            <TaskList
              showEditButton={!simplificado}
              setEditOpen={setEditOpen}
              setTasks={setTasks}
              tasks={pendentesFiltradas}
            />
          )}

          {tab === 1 && (
            <HistoryList tasks={concluidasFiltradas} />
          )}

          {/* Modal Criar Tarefa */}
          {open && (
            <Modal
              type="create"
              open={open}
              onClose={() => setOpen(false)}
              tasks={tasks}
              setTasks={setTasks}
            />
          )}

          {/* Modal Editar Tarefa */}
          {editOpen && (
            <Modal
              type="edit"
              open={editOpen}
              onClose={() => setEditOpen(false)}
              selectedTask={tasks.find(
                (t) => t.id === tasks[tasks.length - 1].id,
              )}
              tasks={tasks}
              setTasks={setTasks}
            />
          )}
        </Container>
      </Box>
    </PrivateRoute>
  );
}

export default function Tasks() {
  return <TasksContent />;
}
