export interface userOptions {
  username: string;
  password: string;
}

export class User {
  public username: string;
  public password: string;
  constructor(user: userOptions) {
    this.username = user.username;
    this.password = user.password;
  }

  public static fromObject = (object: { [key: string]: any }) => {
    const { username, password } = object;
    const task = new User({ username, password });
    return task;
  };
}
