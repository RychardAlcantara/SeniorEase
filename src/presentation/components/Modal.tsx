import ModalProps from "@/src/domain/entities/ModalProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
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

  function onSave() {
    if (!tasks || !setTasks) return;

    if (type === "create") {
      const newTask = {
        id: tasks.length.toString(),
        title: title.trim(),
        notes: notes.trim(),
        createdAt: new Date(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      onClose();
      return;
    }

    if (type === "edit" && selectedTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === selectedTask.id
          ? { ...t, title: title.trim(), notes: notes.trim() }
          : t,
      );
      setTasks(updatedTasks);
      onClose();
      return;
    }

    console.warn("Operação inválida: verifique 'type' e 'selectedTask'.");
  }

  const modalTitle = type === "create" ? "Criar nova tarefa" : "Editar tarefa";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{modalTitle}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label="Título da Tarefa"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Observações"
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            minRows={3}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={onSave} disabled={!title.trim()}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
