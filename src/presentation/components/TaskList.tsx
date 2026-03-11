"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import { Task } from "@/src/interface/task";

export default function TaskList({
  setEditOpen,
  setTask,
}: {
  setEditOpen: (open: boolean) => void;
  setTask: (task: Task) => void;
}) {
  const tasks = [
    { id: "2", title: "Participar da reunião", status: "concluída" },
    { id: "3", title: "Enviar documento", status: "pendente" },
    { id: "4", title: "Tomar medicamento", status: "pendente" },
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
          Minhas Tarefas
        </Typography>

        <Stack spacing={0}>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              setOpen={setEditOpen}
              setTask={setTask}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
