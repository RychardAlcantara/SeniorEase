import Task from "./Task";
import { Dispatch, SetStateAction } from "react";

export default interface ModalProps {
  type: "create" | "edit";
  open: boolean;
  onClose: () => void;
  tasks?: Task[];
  setTasks?: Dispatch<SetStateAction<Task[]>>;
  selectedTask?: Task;
  setSelectedTask?: (tasks: Task[]) => void;
}
