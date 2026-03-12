import EditTaskModalProps from "@/src/domain/entities/EditModalProps";
import Modal from "@/src/presentation/components/Modal";

export default function EditTaskModal({
  open,
  onClose,
  selectedTask,
}: EditTaskModalProps) {
  function onSave() {
    console.log("enviar tarefa para firebase");
    onClose();
  }

  return (
    <Modal
      title="Editar tarefa"
      open={open}
      onClose={onClose}
      onSave={onSave}
      value={selectedTask.title}
    />
  );
}
