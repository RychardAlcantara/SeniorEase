import { Button } from "@mui/material";

export default function CreateTaskButton() {
  return (
    <Button
      fullWidth
      sx={{
        mt: 6,
        py: 1.5, // ~ equivalente ao py-3 do Tailwind
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1.25rem",
        borderRadius: "12px", // mais próximo do rounded-lg
        color: "#fff",
        backgroundImage: "linear-gradient(to right, #00b0ff, #3a7bd5)",
        "&:hover": {
          opacity: 0.9,
          backgroundImage: "linear-gradient(to right, #00a3f0, #3670c7)",
        },
      }}
    >
      + Criar Nova Tarefa
    </Button>
  );
}
