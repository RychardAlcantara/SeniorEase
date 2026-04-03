"use client";

import TaskItemProps from "@/src/domain/entities/TaskItem";
import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useConfig } from "@/src/presentation/contexts/ConfigContext";
import {
  deleteTaskUseCase,
  updateTaskUseCase,
} from "@/src/infrastructure/container";
import { useToast } from "@/src/presentation/contexts/ToastContext";
import Task from "@/src/domain/entities/Task";
import { useState } from "react";
import DeleteModal from "./ModalDelete";
import {
  formatDatePtBR,
  formatTimePtBR,
} from "@/src/app/helpers/formatDatePtBR";

export default function TaskItem({
  task,
  tasks,
  setOpen,
  setSelectedTaskId,
  setTasks,
  showEditButton = true,
  onDeleteSuccess,
}: TaskItemProps) {
  const { altoContraste } = useContraste();
  const { config } = useConfig();
  const { showSuccess, showError } = useToast();
  const simplificado = config.modoVisualizacao === "simplificada";
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function editItem() {
    setSelectedTaskId(task.id);
    setOpen(true);
  }

  async function concludeItem() {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, completed: true, concludedAt: new Date() }
          : t,
      ),
    );
    try {
      await updateTaskUseCase.execute({
        ...task,
        completed: true,
        concludedAt: new Date(),
      } as Task);
      showSuccess("Tarefa concluída com sucesso!");
    } catch {
      showError("Erro ao concluir a tarefa.");
    }
  }

  async function confirmDelete() {
    setDeleting(true);
    const prevTasks = tasks;
    // Optimistic: remove do estado
    setTasks((prev) => prev.filter((t) => t.id !== task.id));

    try {
      await deleteTaskUseCase.execute(task.id);
      setConfirmOpen(false);
      showSuccess("Tarefa excluída com sucesso!");
      onDeleteSuccess?.();
    } catch (e) {
      showError("Erro ao excluir a tarefa.");
      // Reverte estado em caso de falha
      setTasks(prevTasks);
    } finally {
      setDeleting(false);
    }
  }

  const formattedDateTime = task.expectedToBeDone
    ? `${formatDatePtBR(new Date(task.expectedToBeDone))} • ${formatTimePtBR(new Date(task.expectedToBeDone))}`
    : null;

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 1.5, width: "100%" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ minWidth: 0 }}
        >
          <Typography
            component="span"
            sx={{
              color: altoContraste
                ? "var(--color-hc-text)"
                : "var(--color-primary)",
              fontWeight: 700,
            }}
          >
            ✔
          </Typography>

          <Stack
            direction="column"
            alignItems="flex-start"
            sx={{ minWidth: 0 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.125rem",
                color: altoContraste
                  ? "var(--color-hc-text)"
                  : "var(--color-text-primary)",
              }}
              noWrap
              title={task.title}
            >
              {task.title}
            </Typography>

            {/* Notas */}
            {task.notes && (
              <Typography
                variant="body2"
                sx={{ fontSize: "0.95rem", color: "grey.700" }}
                noWrap
                title={task.notes}
              >
                {task.notes}
              </Typography>
            )}

            {/* Data/Hora formatada */}
            {formattedDateTime && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="caption"
                  sx={{
                    color: altoContraste
                      ? "var(--color-hc-accent)"
                      : "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  Para:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "text.secondary",
                  }}
                >
                  {formattedDateTime}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} flexShrink={0}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 1,
              borderColor: altoContraste ? "var(--color-hc-accent)" : undefined,
              color: altoContraste ? "var(--color-hc-accent)" : undefined,
              "&:hover": {
                borderColor: altoContraste
                  ? "var(--color-hc-accent)"
                  : undefined,
                opacity: 0.8,
              },
            }}
            onClick={concludeItem}
          >
            Concluir
          </Button>

          {showEditButton && (
            <Button
              variant="contained"
              onClick={editItem}
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 1,
                backgroundColor: altoContraste
                  ? "var(--color-hc-accent)"
                  : "var(--color-primary)",
                color: altoContraste
                  ? "var(--color-hc-bg)"
                  : "var(--color-text-white)",
                "&:hover": {
                  backgroundColor: altoContraste
                    ? "#15c4d9"
                    : "var(--color-primary-dark)",
                },
              }}
            >
              Editar
            </Button>
          )}
          {!simplificado && <Button
            variant="outlined"
            size="small"
            onClick={() => setConfirmOpen(true)}
            sx={{
              textTransform: "none",
              color: altoContraste ? "#FF4D4F" : undefined,
              borderColor: altoContraste ? "#FF4D4F" : undefined,
              "&:hover": {
                borderColor: altoContraste ? "#FF4D4F" : undefined,
                backgroundColor: altoContraste
                  ? "rgba(255,77,79,0.15)"
                  : undefined,
              },
            }}
            color="error"
          >
            Excluir
          </Button>}
        </Stack>
      </Stack>

      <Divider
        sx={{
          borderColor: altoContraste ? "var(--color-hc-accent)" : undefined,
        }}
      />
      <DeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir a tarefa “${task.title}”? Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
      />
    </Box>
  );
}
