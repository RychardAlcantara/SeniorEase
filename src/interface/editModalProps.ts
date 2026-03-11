import { Task } from "./task";

export default interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  selectedTask: Task;
  setSelectedTask: (task: Task) => void;
}
