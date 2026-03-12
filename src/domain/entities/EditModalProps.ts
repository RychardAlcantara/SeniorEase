import Task from "./Task";

export default interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  selectedTask: Task;
  setSelectedTask: (task: Task) => void;
}
