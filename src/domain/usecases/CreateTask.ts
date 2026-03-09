import { TaskRepository } from "../repositories/TaskRepository"
import { Task } from "../entities/Task"

export class CreateTask {

  constructor(private repository: TaskRepository){}

  async execute(title:string): Promise<Task>{

    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed:false,
      createdAt:new Date()
    }

    return this.repository.create(task)

  }

}