import Task from "./Task";

export default interface TaskItemProps {
  task: Task;
  tasks: Task[];
  setOpen: (open: boolean) => void;
  setTasks: (tasks: Task[]) => void;
}
