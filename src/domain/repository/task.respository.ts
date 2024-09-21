import {
  createTasksOptions,
  TaskEntity,
  tasksEntityOptions,
} from "../entities/tasks.entity";

export abstract class TaskRepository {
  abstract getAll(): Promise<TaskEntity[]>;
  abstract getTask(id: number): Promise<TaskEntity | null>;
  abstract saveTask(task: createTasksOptions): Promise<void>;
  abstract updateTask(id: number, title: string): Promise<void>;
  abstract completedTask(id: number): Promise<void>;
  abstract uncompletedTask(id: number): Promise<void>;
  abstract deleteTask(id: number): Promise<void>;
}
