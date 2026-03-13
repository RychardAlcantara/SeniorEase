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
import { useState } from "react";

export default function Modal({
  type,
  open,
  onClose,
  selectedTask,
  tasks,
  setTasks,
}: ModalProps) {
  const [title, setTitle] = useState(selectedTask?.title ?? "");
  const [notes, setNotes] = useState(selectedTask?.notes ?? "");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function onSave() {
    if (!tasks || !setTasks) return;

    setSaving(true);

    if (type === "create") {
      const newTask = {
        id: tasks.length.toString(),
        title: title.trim(),
        notes: notes.trim(),
        createdAt: new Date(),
        completed: false,
        concludedAt: null,
      };
      setTasks([...tasks, newTask]);
      setSuccessMessage("Tarefa adicionada com sucesso!");
    } else if (type === "edit" && selectedTask) {
      const updated = tasks.map((t) =>
        t.id === selectedTask.id
          ? { ...t, title: title.trim(), notes: notes.trim() }
          : t,
      );
      setTasks(updated);
      setSuccessMessage("Tarefa editada com sucesso!");
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
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={disableInputs}>
          Fechar
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={!title.trim() || disableInputs}
          startIcon={saving ? <CircularProgress size={16} /> : null}
        >
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
