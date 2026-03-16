"use client";

import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

interface Props {
  title: string;
  showEditButton?: boolean;
}

export default function TaskItem({ title, showEditButton = true }: Props) {
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
            sx={{ color: altoContraste ? "var(--color-hc-text)" : "var(--color-primary)", fontWeight: 700 }}
          >
            ✔
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: "1.125rem", color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-primary)" }}
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

          {showEditButton && (
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 1,
                backgroundColor: altoContraste ? "var(--color-hc-accent)" : "var(--color-primary)",
                color: altoContraste ? "var(--color-hc-bg)" : "var(--color-text-white)",
                "&:hover": { backgroundColor: altoContraste ? "#15c4d9" : "var(--color-primary-dark)" },
              }}
            >
              Editar
            </Button>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: altoContraste ? "var(--color-hc-accent)" : undefined }} />
    </Box>
  );
}
