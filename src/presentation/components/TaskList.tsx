"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import Task from "@/src/domain/entities/Task";
import { Dispatch, SetStateAction } from "react";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

export default function TaskList({
  showEditButton,
  setEditOpen,
  setTasks,
  tasks,
}: {
  showEditButton?: boolean;
  setEditOpen: (open: boolean) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
}) {
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
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: altoContraste ? "var(--color-hc-text)" : "inherit",
          }}
        >
          Minhas Tarefas
        </Typography>

        <Stack spacing={0}>
          {tasks.map((task: Task) => (
            <TaskItem
              showEditButton={showEditButton}
              key={task.id}
              task={task}
              setOpen={setEditOpen}
              setTasks={setTasks}
              tasks={tasks}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
