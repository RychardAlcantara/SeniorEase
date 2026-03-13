import { Dispatch, SetStateAction } from "react";
import Task from "./Task";

export default interface TaskItemProps {
  task: Task;
  tasks: Task[];
  setOpen: (open: boolean) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}
