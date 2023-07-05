import { NextFunction, Request, Response } from "express";
import { TaskDAO } from "./task.dao";
import { Task, User } from "../../types";

class RawTaskController extends TaskDAO {
  constructor() {
    super();
  }

  public addNewTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const task = req.body as Task;
    const result = await this.add(task);
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(201).json({
      data: result,
      message: "Task has been created successfully.",
    });
  };

  public updateExistingTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const task = req.body as Task;
    const result = await this.updateTask(id, task);
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(201).json({
      data: result,
      message: "Task has been updated successfully.",
    });
  };

  public getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this.getAll();
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(200).json({
      data: result,
      message: "",
    });
  };

  public getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const result = await this.getById(id);
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(200).json({
      data: result,
      message: ".",
    });
  };

  public deleteTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const result = await this.deleteTask(id);
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(200).json({
      data: result,
      message: "Task has been updated successfully.",
    });
  };

  public updatePartialTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const body = req.body as unknown as Partial<Task>;
    const result = await this.patchTask(id, body);
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(200).json({
      data: result,
      message: "Task has been updated successfully.",
    });
  };
}

export const TaskController = new RawTaskController();
