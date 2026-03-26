"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { DeleteModalProps } from "@/src/domain/entities/DeleteModalProps";
import { getAllTasksUseCase } from "@/src/infrastructure/container";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

export default function DeleteModal({
  open,
  title = "Confirmar exclusão",
  message = "Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita.",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  loading = false,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const { altoContraste } = useContraste();

  const handleClose = () => {
    if (!loading) onClose();
  };

  const handleConfirm = async () => {
    await onConfirm();
    await getAllTasksUseCase.execute();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: altoContraste ? "var(--color-hc-bg)" : undefined,
          color: altoContraste ? "var(--color-hc-text)" : undefined,
          border: altoContraste ? "2px solid #FF4D4F" : undefined,
        },
      }}
    >
      <DialogTitle
        sx={{ color: altoContraste ? "var(--color-hc-text)" : undefined }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          sx={{ color: altoContraste ? "var(--color-hc-text)" : undefined }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{ color: altoContraste ? "var(--color-hc-text)" : undefined }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: altoContraste ? "#FF4D4F" : undefined,
            color: altoContraste ? "#000000" : undefined,
            "&:hover": {
              backgroundColor: altoContraste ? "#FF4D4F" : undefined,
            },
            "&.Mui-disabled": {
              backgroundColor: altoContraste
                ? "rgba(255,77,79,0.3)"
                : undefined,
              color: altoContraste ? "rgba(0,0,0,0.5)" : undefined,
            },
          }}
          {...(!altoContraste && { color: "error" })}
        >
          {loading ? "Excluindo..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
