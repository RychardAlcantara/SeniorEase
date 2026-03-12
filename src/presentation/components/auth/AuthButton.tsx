import { Button, CircularProgress } from "@mui/material"

interface AuthButtonProps {
  loading?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function AuthButton({ loading, onClick, children }: AuthButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      disabled={loading}
      onClick={onClick}
      sx={{
        py: 1.5,
        fontSize: "1.1rem",
        fontWeight: "bold",
        borderRadius: 2,
        background: "linear-gradient(to right, #1565c0, #0d47a1)",
        "&:hover": { opacity: 0.9 },
      }}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {children}
    </Button>
  )
}