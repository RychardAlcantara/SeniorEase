"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

export default function TaskList() {
  const { altoContraste } = useContraste();
  const tasks = [
    "Digite a tarefa...",
    "Participar da aula online",
    "Enviar documento",
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-card)",
        border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <CardContent sx={{ p: 3 /* ~ p-6 */ }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: altoContraste ? "var(--color-hc-text)" : "inherit" }}>
          Tomar medicamento
        </Typography>

        <Stack spacing={0}>
          {tasks.map((task, index) => (
            <TaskItem key={index} title={task} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
