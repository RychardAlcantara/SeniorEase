"use client";

import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
// Opcional: usar um ícone do MUI em vez do "✔"
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function HistoryList() {
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
        backgroundColor: "#fff",
      }}
    >
      <CardContent sx={{ p: 3 /* ~ p-6 */ }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
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
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                ✔
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.600" }}>
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
