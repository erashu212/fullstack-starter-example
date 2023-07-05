import { Router } from "express";
import { AuthController } from "./auth.controller";

export const AuthRoute = (router: Router) => {
  router.post("/api/login", AuthController.loginUser);
  router.delete("/api/logout", AuthController.logoutUser);
  router.post("/api/register", AuthController.registerUser);
  router.get("/api/users", AuthController.getUsers);
};
