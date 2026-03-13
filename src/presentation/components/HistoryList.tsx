"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import Task from "@/src/domain/entities/Task";

export default function HistoryList({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) {
  const history = tasks.filter((t) => t.completed);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <CardContent sx={{ p: 3 /* ~ p-6 */ }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Histórico de Tarefas
        </Typography>

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
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                ✔
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.600" }}>
                {item.title} — concluído{" "}
                {item.concludedAt
                  ? new Date(item.concludedAt).getDate().toString() ===
                    new Date().getDate().toString()
                    ? "hoje"
                    : new Date(item.concludedAt).getDate().toString() ===
                        (new Date().getDate() - 1).toString()
                      ? "ontem"
                      : new Date(item.concludedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                  : null}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
