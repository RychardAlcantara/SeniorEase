"use client";

import TaskItemProps from "@/src/domain/entities/TaskItem";
import { Box, Stack, Typography, Button, Divider } from "@mui/material";

export default function TaskItem({
  task,
  tasks,
  setOpen,
  setTasks,
}: TaskItemProps) {
  function editItem() {
    setTasks([
      ...tasks.filter((t) => t.id !== task.id),
      {
        id: task.id,
        title: task.title,
        notes: task.notes,
        createdAt: task.createdAt,
        completed: task.completed,
        concludedAt: task.concludedAt,
      },
    ]);
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

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 1.5,
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ minWidth: 0 }}
        >
          <Typography
            component="span"
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            ✔
          </Typography>

          <Stack direction="column" alignItems="flex-start">
            <Typography
              variant="body1"
              sx={{ fontSize: "1.125rem", color: "grey.800" }}
              noWrap
            >
              {task.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "grey.700" }}
              noWrap
            >
              {task.notes}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} flexShrink={0}>
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "none", borderRadius: 1 }}
            onClick={concludeItem}
          >
            Concluir
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={editItem}
            sx={{
              textTransform: "none",
              borderRadius: 1,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Editar
          </Button>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
}
