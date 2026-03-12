import Task from "./Task";

export default interface TaskItemProps {
  task: Task;
  setOpen: (open: boolean) => void;
  setSelectedTask: (task: Task) => void;
}
