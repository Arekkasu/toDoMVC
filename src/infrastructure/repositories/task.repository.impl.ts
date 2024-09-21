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
    return this.taskDatasource.saveTask(task);
  }
  async updateTask(id: number, title: string): Promise<void> {
    return this.taskDatasource.updateTask(id, title);
  }
  async completedTask(id: Number): Promise<void> {
    return this.taskDatasource.completedTask(id);
  }
  async uncompletedTask(id: Number): Promise<void> {
    return this.taskDatasource.uncompletedTask(id);
  }
  deleteTask(id: Number): Promise<void> {
    return this.taskDatasource.deleteTask(id);
  }
}
