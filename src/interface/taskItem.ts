import { Task } from "./task";

export default interface TaskItemProps {
  task: Task;
  setOpen: (open: boolean) => void;
  setTask: (task: Task) => void;
}
