import ModalProps from "@/src/domain/entities/modalProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

export default function Modal({
  title,
  open,
  onClose,
  onSave,
  value,
  onChange,
}: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label={title}
            fullWidth
            value={value}
            onChange={onChange}
          />
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
