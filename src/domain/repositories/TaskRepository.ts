import Task from "../entities/Task";

export interface TaskRepository {
  create(task: Task): Promise<Task>;

  getAll(): Promise<Task[]>;

  update(task: Task): Promise<Task>;

  delete(task: Task): Promise<void>;
}
