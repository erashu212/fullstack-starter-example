import { Router } from "express";
import { TaskController } from "./task.controller";

export const TaskRoute = (router: Router) => {
  router.get("/api/task", TaskController.getAllTasks);
  router.get("/api/task/:id", TaskController.getTaskById);
  router.post("/api/task", TaskController.addNewTask);
  router.delete("/api/task/:id", TaskController.deleteTaskById);
  router.put("/api/task/:id", TaskController.updateExistingTask);
  router.patch("/api/task/:id", TaskController.updatePartialTask);
};
