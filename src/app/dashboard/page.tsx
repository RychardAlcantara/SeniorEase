"use client";

import Navbar from "@/src/presentation/components/Navbar";
import TaskList from "@/src/presentation/components/TaskList";
import HistoryList from "@/src/presentation/components/HistoryList";
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton";
import { useState } from "react";
import CreateTaskModal from "../tasks/CreateTaskModal";
import { Box, Grid } from "@mui/material";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

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
          <h1 className="text-3xl font-bold text-gray-700 mb-6">
            Minhas Tarefas
          </h1>

          <TaskList />

          <CreateTaskButton onClick={() => setOpen(!open)} />
        </Grid>

        <HistoryList />

        {open && (
          <Grid {...{ item: true, width: "40%" }}>
            <CreateTaskModal open={open} onClose={() => setOpen(!open)} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
