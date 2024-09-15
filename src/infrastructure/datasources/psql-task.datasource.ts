import { PrismaClient } from "@prisma/client";
import { TaskDatasource } from "../../domain/datasources/task.datasource";
import {
  TaskEntity,
  createTasksOptions,
} from "../../domain/entities/tasks.entity";

const prisma = new PrismaClient();

export class PostgresTaskDatasource implements TaskDatasource {
  async getAll(): Promise<TaskEntity[]> {
    try {
      const allTasks = await prisma.tasks.findMany();
      return allTasks.map((task) => TaskEntity.fromObject(task));
    } catch (error) {
      throw error;
    }
  }
  async getTask(id: number): Promise<TaskEntity | null> {
    try {
      const task = await prisma.tasks.findUnique({
        where: {
          id,
        },
      });
      if (!task) {
        return null;
      }
      return TaskEntity.fromObject(task);
    } catch (error) {
      throw error;
    }
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
