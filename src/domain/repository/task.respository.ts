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
  abstract completedTask(id: Number): Promise<void>;
  abstract uncompletedTask(id: Number): Promise<void>;
  abstract deleteTask(id: Number): Promise<void>;
}
