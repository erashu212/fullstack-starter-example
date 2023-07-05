import { DBConnection } from "../../services";
import { Status, Task } from "../../types";

export class TaskDAO extends DBConnection {
  private readonly tableName: string = "tm_task";
  constructor() {
    super();
  }

  protected async getAll() {
    const query = `
    SELECT
    t.id,
    t.name,
    t.due,
    t.priority,
    t.status,
    u_assignee.email AS assignee,
    u_reporter.email AS reporter
  FROM
    tm_task t
  JOIN
    tm_user u_assignee ON t.assignee = u_assignee.id
  JOIN
    tm_user u_reporter ON t.reporter = u_reporter.id
    `;
    const response = await this.executeQuery(query);
    return response;
  }

  protected async getById(id: string) {
    const query = `
    SELECT
    t.id,
    t.name,
    t.due,
    t.priority,
    t.status,
    u_assignee.email AS assignee,
    u_reporter.email AS reporter
  FROM
    tm_task t
  JOIN
    tm_user u_assignee ON t.assignee = u_assignee.id
  JOIN
    tm_user u_reporter ON t.reporter = u_reporter.id
  WHERE t.id = ${id}  
    `;
    const response = await this.executeQuery(query);
    return response;
  }

  protected async add(task: Task) {
    const response = await this.insert(this.tableName, task);
    return response;
  }

  protected async updateTask(id: string, task: Task) {
    const response = await this.update(this.tableName, task, {
      id: id,
    });
    return response;
  }

  protected async patchTask(id: string, task: Partial<Task>) {
    const response = await this.update(this.tableName, task, {
      id: id,
    });
    return response;
  }

  protected async deleteTask(id: string) {
    const response = await this.delete(this.tableName, {
      id: id,
    });
    return response;
  }
}
