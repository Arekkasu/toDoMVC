import { TaskDatasource } from "../../domain/datasources/task.datasource";
import {
  TaskEntity,
  createTasksOptions,
} from "../../domain/entities/tasks.entity";
import { TaskRepository } from "../../domain/repository/task.respository";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly taskDatasource: TaskDatasource) {}
  async getAll(): Promise<TaskEntity[]> {
    return this.taskDatasource.getAll();
  }
  async getTask(id: number): Promise<TaskEntity | null> {
    return this.taskDatasource.getTask(id);
  }
  saveTask(task: createTasksOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateTask(id: number, title: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  completedTask(id: Number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  uncompletedTask(id: Number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteTask(id: Number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
