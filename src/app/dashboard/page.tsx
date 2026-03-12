"use client";

import Navbar from "@/src/presentation/components/Navbar";
import TaskList from "@/src/presentation/components/TaskList";
import HistoryList from "@/src/presentation/components/HistoryList";
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton";
import { useState } from "react";
import CreateTaskModal from "../tasks/CreateTaskModal";
import { Box, Grid } from "@mui/material";
import EditTaskModal from "../tasks/EditTaskModal";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({
    id: "",
    title: "",
    createdAt: new Date(),
    completed: false,
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
            setSelectedTask={setSelectedTask}
            tasks={tasks}
          />

          <CreateTaskButton onClick={() => setOpen(!open)} />
        </Grid>

        <HistoryList />

        {open && (
          <Grid {...{ item: true, width: "40%" }}>
            <CreateTaskModal open={open} onClose={() => setOpen(!open)} />
          </Grid>
        )}

        {editOpen && (
          <Grid {...{ item: true, width: "40%" }}>
            <EditTaskModal
              open={editOpen}
              onClose={() => setEditOpen(!editOpen)}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
