"use client";

import { Card, CardContent, Typography, Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import Task from "@/src/domain/entities/Task";
import { Dispatch, SetStateAction } from "react";

export default function TaskList({
  setEditOpen,
  setTasks,
  tasks,
}: {
  setEditOpen: (open: boolean) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  tasks: Task[];
}) {
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
          {tasks.map((task: Task, index: number) => (
            <TaskItem
              key={index}
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
