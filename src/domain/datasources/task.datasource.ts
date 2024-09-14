import { TaskEntity, tasksEntityOptions } from "../entities/tasks.entity";
export abstract class TaskDatasource {
  abstract getAll(): Promise<TaskEntity[]>;
  abstract saveTask(task: TaskEntity): Promise<void>;
  abstract updateTask(id: number, title: string): Promise<void>;
  abstract completedTask(id: Number): Promise<void>;
  abstract deleteTask(id: Number): Promise<void>;
}
