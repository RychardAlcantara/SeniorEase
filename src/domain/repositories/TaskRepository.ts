import Task from "../entities/Task";

export interface TaskRepository {
  create(task: Task): Promise<Task>;

  getAll(): Promise<Task[]>;

  getByUserId(userId: string): Promise<Task[]>;

  update(task: Task): Promise<Task>;

  delete(id: string): Promise<void>;
}
