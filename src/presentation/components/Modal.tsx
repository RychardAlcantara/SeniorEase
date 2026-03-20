"use client";
import ModalProps from "@/src/domain/entities/ModalProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  createTaskUseCase,
  updateTaskUseCase,
} from "@/src/infrastructure/container";

export default function Modal({
  type,
  open,
  onClose,
  selectedTask,
  tasks,
  setTasks,
}: ModalProps) {
  dayjs.locale("pt-br");

  const [title, setTitle] = useState(selectedTask?.title ?? "");
  const [notes, setNotes] = useState(selectedTask?.notes ?? "");
  const [toDoDate, setToDoDate] = useState<Dayjs | null>(
    selectedTask?.expectedToBeDone
      ? dayjs(selectedTask.expectedToBeDone)
      : null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSave() {
    if (!tasks || !setTasks) return;

    setSaving(true);
    if (type === "create") {
      const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        notes: notes.trim(),
        expectedToBeDone: toDoDate ? toDoDate.toISOString() : null,
        createdAt: new Date(),
        completed: false,
        concludedAt: null,
      };
      try {
        await createTaskUseCase.execute(newTask);
        setSuccessMessage("Tarefa adicionada com sucesso!");
      } catch {
        setSuccessMessage("Ocorreu um erro ao adicionar a tarefa.");
      }
    } else if (type === "edit" && selectedTask) {
      try {
        const taskToUpdate = {
          ...selectedTask,
          title: title.trim(),
          notes: notes.trim(),
          expectedToBeDone: toDoDate ? toDoDate.toISOString() : null,
        };

        await updateTaskUseCase.execute(taskToUpdate);

        setSuccessMessage("Tarefa editada com sucesso!");
      } catch {
        setSuccessMessage("Ocorreu um erro ao editar a tarefa.");
      }
    } else {
      setSaving(false);
      return;
    }

    // Aguarda um pouco para o usuário ver a mensagem e fecha
    setTimeout(() => {
      setSaving(false);
      onClose();
    }, 1500);
  }

  const modalTitle = type === "create" ? "Criar nova tarefa" : "Editar tarefa";
  const disableInputs = saving || !!successMessage;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{modalTitle}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <TextField
            label="Título da Tarefa"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={disableInputs}
          />
          <TextField
            label="Observações"
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            minRows={3}
            disabled={disableInputs}
          />
          <DateTimePicker
            label="Para quando é a tarefa?"
            value={toDoDate}
            onChange={(newValue) => setToDoDate(newValue)}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            slotProps={{
              desktopPaper: { sx: { zIndex: 1600 } }, // acima do Dialog
              popper: {
                disablePortal: false, // garante portal
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: { padding: 8, altAxis: true },
                  },
                  {
                    name: "flip",
                    options: { fallbackPlacements: ["top", "bottom"] },
                  },
                ],
              },
              textField: {
                placeholder: "dd/mm/aaaa hh:mm",
                inputProps: { inputMode: "numeric" },
              },
            }}
            disabled={disableInputs}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={disableInputs}>
          Fechar
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={!title.trim() || !toDoDate || disableInputs}
          startIcon={saving ? <CircularProgress size={16} /> : null}
        >
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
