"use client";

import { Box, Stack, Typography, Button, Divider } from "@mui/material";

interface Props {
  title: string;
}

export default function TaskItem({ title }: Props) {
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
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            ✔
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: "1.125rem", color: "grey.800" }}
            noWrap
          >
            {title}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} flexShrink={0}>
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "none", borderRadius: 1 }}
          >
            Concluir
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 1,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Editar
          </Button>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
}
