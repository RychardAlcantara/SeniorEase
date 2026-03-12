import Task from "./Task";

export default interface ModalProps {
  type: "create" | "edit";
  open: boolean;
  onClose: () => void;
  tasks?: Task[];
  setTasks?: (tasks: Task[]) => void;
  selectedTask?: Task;
  setSelectedTask?: (tasks: Task[]) => void;
}
