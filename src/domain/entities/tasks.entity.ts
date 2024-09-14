export interface tasksEntityOptions {
  id: number;
  title: string;
  completed: boolean;
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
}
