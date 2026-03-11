import Modal from "@/src/presentation/components/Modal";

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
    <Modal
      title="Criar nova tarefa"
      open={open}
      onClose={onClose}
      onSave={onSave}
    />
  );
}
