"use client";

import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

interface Props {
  title: string;
}

export default function TaskItem({ title }: Props) {
  const { altoContraste } = useContraste();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 1.5,
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ minWidth: 0 }}
        >
          <Typography
            component="span"
            sx={{ color: altoContraste ? "var(--color-hc-text)" : "primary.main", fontWeight: 700 }}
          >
            ✔
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: "1.125rem", color: altoContraste ? "var(--color-hc-text)" : "grey.800" }}
            noWrap
          >
            {title}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} flexShrink={0}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 1,
              borderColor: altoContraste ? "var(--color-hc-accent)" : undefined,
              color: altoContraste ? "var(--color-hc-accent)" : undefined,
              "&:hover": { borderColor: altoContraste ? "var(--color-hc-accent)" : undefined, opacity: 0.8 },
            }}
          >
            Concluir
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 1,
              backgroundColor: altoContraste ? "var(--color-hc-accent)" : "primary.main",
              color: altoContraste ? "var(--color-hc-bg)" : undefined,
              "&:hover": { backgroundColor: altoContraste ? "#15c4d9" : "primary.dark" },
            }}
          >
            Editar
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: altoContraste ? "var(--color-hc-accent)" : undefined }} />
    </Box>
  );
}
