"use client";

import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
// Opcional: usar um ícone do MUI em vez do "✔"
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function HistoryList() {
  const { altoContraste } = useContraste();
  const history = [
    "Participar da reunião — concluído hoje",
    "Enviar documento — concluído ontem",
    "Tomar medicamento — concluído 10/05",
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-card)",
        border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <CardContent sx={{ p: 3 /* ~ p-6 */ }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: altoContraste ? "var(--color-hc-text)" : "inherit" }}>
          Histórico de Tarefas
        </Typography>

        <Stack spacing={2}>
          {history.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography
                component="span"
                sx={{ color: altoContraste ? "var(--color-hc-text)" : "primary.main", fontWeight: 700 }}
              >
                ✔
              </Typography>
              <Typography variant="body2" sx={{ color: altoContraste ? "var(--color-hc-text)" : "grey.600" }}>
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
