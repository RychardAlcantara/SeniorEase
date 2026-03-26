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
  onDeleteSuccess,
}: {
  showEditButton?: boolean;
  setEditOpen: (open: boolean) => void;
  setSelectedTaskId: (id: string | null) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
  onDeleteSuccess?: () => void;
}) {
  const { altoContraste } = useContraste();

  const sortedTasks = tasks.filter((t) => !t.completed);

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

        {sortedTasks.length === 0 ? (
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
            Nenhuma tarefa pendente. Crie uma nova tarefa para começar!
          </Typography>
        ) : (
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
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </Stack>
        )}
      </CardContent>
    </Card>
  );
}
