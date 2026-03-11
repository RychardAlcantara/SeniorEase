import { Button } from "@mui/material";

export default function CreateTaskButton({ onClick }: { onClick: () => void }) {
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
