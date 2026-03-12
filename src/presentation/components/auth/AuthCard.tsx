import { ReactNode } from "react"
import { Box, Paper, Typography } from "@mui/material"

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <Box
      minHeight="100vh"
      bgcolor="grey.100"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      {/* Logo */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          fontStyle="italic"
        >
          SeniorEase
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={1}>
          Plataforma acessível para você
        </Typography>
      </Box>

      {/* Card */}
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 420, p: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="text.primary" mb={1}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Paper>
    </Box>
  )
}