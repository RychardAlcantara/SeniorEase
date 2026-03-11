import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  open,
  onClose,
}: CreateTaskModalProps) {
  function onSave() {
    console.log("enviar tarefa para firebase");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Qual é a tarefa?</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField label="Qual é a tarefa?" fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={onSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
