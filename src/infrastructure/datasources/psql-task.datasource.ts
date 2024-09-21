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
  async saveTask(task: createTasksOptions): Promise<void> {
    try {
      const { title } = task;
      await prisma.tasks.create({
        data: {
          title: title,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async updateTask(id: number, title: string): Promise<void> {
    try {
      const taskEdit = await prisma.tasks.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async completedTask(id: number): Promise<void> {
    try {
      const taskEdit = await prisma.tasks.update({
        where: {
          id,
        },
        data: { completed: true },
      });
    } catch (error) {
      throw error;
    }
  }
  async uncompletedTask(id: number): Promise<void> {
    try {
      const taskEdit = await prisma.tasks.update({
        where: {
          id,
        },
        data: { completed: false },
      });
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(id: number): Promise<void> {
    try {
      const taskEdit = await prisma.tasks.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
