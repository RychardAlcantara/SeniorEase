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
  const handleClose = () => {
    if (!loading) onClose();
  };

  const handleConfirm = async () => {
    await onConfirm();
    await getAllTasksUseCase.execute();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Excluindo..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
