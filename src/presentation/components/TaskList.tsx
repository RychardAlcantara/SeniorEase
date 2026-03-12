"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import TaskItem from "./TaskItem";

export default function TaskList() {
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
        backgroundColor: "#fff",
      }}
    >
      <CardContent sx={{ p: 3 /* ~ p-6 */ }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
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
