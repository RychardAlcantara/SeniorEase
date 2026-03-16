import { Alert } from "@mui/material"

interface AlertMessageProps {
  type: "error" | "success"
  message: string
}

export function AlertMessage({ type, message }: AlertMessageProps) {
  return (
    <Alert severity={type} sx={{ mb: 3 }}>
      {message}
    </Alert>
  )
}