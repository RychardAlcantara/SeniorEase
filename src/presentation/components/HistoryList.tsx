"use client";

import { Card, CardContent, Typography, Stack, Tooltip } from "@mui/material";
import Task from "@/src/domain/entities/Task";
import { useContraste } from "../contexts/ContrasteContext";

export default function HistoryList({ tasks }: { tasks: Task[] }) {
  const history = tasks.filter((t) => t.completed);
  const { altoContraste } = useContraste();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: altoContraste
          ? "var(--color-hc-bg)"
          : "var(--color-bg-card)",
        border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <CardContent sx={{ p: 3 /* ~ p-6 */ }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: altoContraste ? "var(--color-hc-text)" : "inherit",
          }}
        >
          Histórico de Tarefas
        </Typography>

        {history.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: altoContraste
                ? "var(--color-hc-text)"
                : "var(--color-text-secondary)",
              textAlign: "center",
              py: 3,
              opacity: 0.7,
            }}
          >
            Nenhuma tarefa concluída ainda.
          </Typography>
        ) : (
        <Stack spacing={2}>
          {history.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="flex-start"
              spacing={1}
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
              <Tooltip title={item.notes} placement="top" arrow>
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  {item.title} — concluído{" "}
                  {item.concludedAt
                    ? new Date(item.concludedAt).getDate().toString() ===
                      new Date().getDate().toString()
                      ? "hoje"
                      : new Date(item.concludedAt).getDate().toString() ===
                          (new Date().getDate() - 1).toString()
                        ? "ontem"
                        : new Date(item.concludedAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            },
                          )
                    : null}
                </Typography>
              </Tooltip>
            </Stack>
          ))}
        </Stack>
        )}
      </CardContent>
    </Card>
  );
}
