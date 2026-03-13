"use client"

import { Box, Container, Grid, Typography } from "@mui/material"
import { PrivateRoute } from "@/src/presentation/components/PrivateRoute"
import Navbar from "@/src/presentation/components/Navbar"
import TaskList from "@/src/presentation/components/TaskList"
import HistoryList from "@/src/presentation/components/HistoryList"
import CreateTaskButton from "@/src/presentation/components/CreateTaskButton"

export default function Dashboard() {
  return (
    <PrivateRoute>
      <Box minHeight="100vh" bgcolor="grey.100">

        <Navbar />

        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" fontWeight="bold" color="text.primary" mb={4}>
                Minhas Tarefas
              </Typography>
              <TaskList />
              <CreateTaskButton />
            </Grid>

            <Grid item xs={12} md={4}>
              <HistoryList />
            </Grid>

          </Grid>
        </Container>

      </Box>
    </PrivateRoute>
  )
}