import { Button } from "@mui/material";

interface CreateTaskButtonProps {
  onClick?: () => void;
}

export default function CreateTaskButton({ onClick }: CreateTaskButtonProps) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={{
        mt: 3,
        py: 1.5,
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1.125rem",
        borderRadius: 2,
        color: "#fff",
        backgroundImage: "linear-gradient(to right, #00b0ff, #3a7bd5)",
        "&:hover": { opacity: 0.9 },
      }}
    >
      + Criar Nova Tarefa
    </Button>
  );
}
