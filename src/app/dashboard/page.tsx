"use client";

import Navbar from "@/src/presentation/components/Navbar";
import TaskList from "@/src/presentation/components/TaskList";
import HistoryList from "@/src/presentation/components/HistoryList";
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import Task from "@/src/domain/entities/Task";
import Modal from "@/src/presentation/components/Modal";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: "",
    title: "",
    notes: "",
    createdAt: new Date(),
    completed: false,
    concludedAt: null,
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "grey.100" }}>
      <Navbar />

      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 3 /* ~ p-6 */,
        }}
      >
        <Grid {...{ item: true, width: "60%" }}>
          <TaskList
            setEditOpen={setEditOpen}
            setTasks={setTasks}
            tasks={tasks.filter((t) => !t.completed)}
          />

          <CreateTaskButton onClick={() => setOpen(!open)} />
        </Grid>

        <HistoryList tasks={tasks} setTasks={setTasks} />

        {open && (
          <Grid {...{ item: true, width: "40%" }}>
            <Modal
              type="create"
              open={open}
              onClose={() => setOpen(!open)}
              tasks={tasks}
              setTasks={setTasks}
            />
          </Grid>
        )}

        {editOpen && (
          <Grid {...{ item: true, width: "40%" }}>
            <Modal
              type="edit"
              open={editOpen}
              onClose={() => setEditOpen(!editOpen)}
              selectedTask={selectedTask}
              tasks={tasks}
              setTasks={setTasks}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
