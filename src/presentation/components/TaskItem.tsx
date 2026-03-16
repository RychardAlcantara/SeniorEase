"use client";

import TaskItemProps from "@/src/domain/entities/TaskItem";
import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import dayjs from "dayjs";

export default function TaskItem({
  task,
  tasks,
  setOpen,
  setTasks,
  showEditButton = true,
}: TaskItemProps) {
  const { altoContraste } = useContraste();

  function editItem() {
    setTasks([...tasks.filter((t) => t.id !== task.id), { ...task }]);
    setOpen(true);
  }

  function concludeItem() {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, completed: true, concludedAt: new Date() }
          : t,
      ),
    );
  }

  const formattedDateTime = task.expectedToBeDone
    ? dayjs(task.expectedToBeDone).format("ddd, DD [de] MMM [•] HH:mm")
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
        </Stack>
      </Stack>

      <Divider
        sx={{
          borderColor: altoContraste ? "var(--color-hc-accent)" : undefined,
        }}
      />
    </Box>
  );
}
