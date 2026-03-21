import Task from "@/src/domain/entities/Task";
import { TaskRepository } from "@/src/domain/repositories/TaskRepository";

export class TaskRepositoryImpl implements TaskRepository {
  async create(task: Task): Promise<Task> {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
  }

  async getAll(): Promise<Task[]> {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  async update(task: Task): Promise<Task> {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updated = tasks.map((t: Task) => (t.id === task.id ? task : t));

    localStorage.setItem("tasks", JSON.stringify(updated));

    return task;
  }

  async delete(id: string): Promise<void> {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const remaining = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(remaining));
  }
}
