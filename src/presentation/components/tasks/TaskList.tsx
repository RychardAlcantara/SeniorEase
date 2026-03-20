"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import Task from "@/src/domain/entities/Task";
import { Dispatch, SetStateAction } from "react";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

export default function TaskList({
  showEditButton,
  setEditOpen,
  setSelectedTaskId,
  setTasks,
  tasks,
}: {
  showEditButton?: boolean;
  setEditOpen: (open: boolean) => void;
  setSelectedTaskId: (id: string | null) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
}) {
  const { altoContraste } = useContraste();

  const sortedTasks = tasks.slice().sort((a, b) => {
    const ta = a.expectedToBeDone
      ? new Date(a.expectedToBeDone as string).getTime()
      : Infinity;
    const tb = b.expectedToBeDone
      ? new Date(b.expectedToBeDone as string).getTime()
      : Infinity;

    // Valores inválidos vão para o final
    const aValid = Number.isFinite(ta);
    const bValid = Number.isFinite(tb);
    if (!aValid && !bValid) return 0;
    if (!aValid) return 1;
    if (!bValid) return -1;

    return ta - tb; // crescente
  });

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
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Minhas Tarefas
        </Typography>

        <Stack spacing={0}>
          {sortedTasks.map((task: Task) => (
            <TaskItem
              showEditButton={showEditButton}
              key={task.id}
              task={task}
              setOpen={setEditOpen}
              setSelectedTaskId={setSelectedTaskId}
              setTasks={setTasks}
              tasks={tasks}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
