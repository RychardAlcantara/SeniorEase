"use client";

import { Button } from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

export default function CreateTaskButton() {
  const { altoContraste } = useContraste();

  return (
    <Button
      fullWidth
      sx={{
        mt: 6,
        py: 1.5,
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1.25rem",
        borderRadius: "12px",
        color: altoContraste ? "var(--color-hc-bg)" : "var(--color-text-white)",
        backgroundImage: altoContraste ? "none" : "var(--gradient-button)",
        backgroundColor: altoContraste ? "var(--color-hc-accent)" : undefined,
        border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
        transition: "all 0.3s ease",
        "&:hover": {
          opacity: 0.9,
          backgroundImage: altoContraste ? "none" : "var(--gradient-button-hover)",
          backgroundColor: altoContraste ? "#15c4d9" : undefined,
        },
      }}
    >
      + Criar Nova Tarefa
    </Button>
  );
}
