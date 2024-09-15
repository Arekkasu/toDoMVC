export interface tasksEntityOptions {
  id: number;
  title: string;
  completed: boolean;
}

export interface createTasksOptions {
  title: string;
}

export class TaskEntity {
  public id: number;
  public title: string;
  public completed: boolean;
  constructor(options: tasksEntityOptions) {
    this.id = options.id;
    this.title = options.title;
    this.completed = options.completed;
  }
  public static fromObject = (object: { [key: string]: any }) => {
    const { id, title, completed } = object;
    const task = new TaskEntity({ id, title, completed });
    return task;
  };
}
