import { NextFunction, Request, Response } from "express";
import { AuthDAO } from "./auth.dao";
import { encryptToMD5 } from "../../utils";
import { authenticate, logout } from "../../middlewares";
import { User } from "../../types";

class RawAuthController extends AuthDAO {
  constructor() {
    super();
  }

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        statusCode: 400,
        message: "email and password must be provied",
      });
      return;
    }
    const encryptedPassowrd = encryptToMD5(password);
    const user = (await this.findByEmail(email)) as unknown as User;
    if (!user) {
      res.status(403).json({
        data: null,
        message: "Authentication failed. No user found.",
      });
      return;
    }
    if (user?.password !== encryptedPassowrd) {
      res.status(403).json({
        data: null,
        message: "Authentication failed. Wrong password.",
      });
      return;
    }
    const result = await authenticate(user);
    res.status(200).json({
      data: { ...user, ...result },
      message: "User has logged in successfully.",
    });
    next();
  };

  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        data: null,
        message: "email and password must be provied",
      });
      return;
    }
    const encryptedPassowrd = encryptToMD5(password);
    const registerd = await this.register({
      email,
      password: encryptedPassowrd,
    });
    if (!!registerd) {
      const result = await authenticate({ email, password });
      res.status(200).json({
        data: result,
        message: "User has logged in successfully.",
      });
    } else {
      res.status(400).json({
        data: null,
        message: "User already exists.",
      });
    }
    next();
  };

  public logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers["authorization"] as string;
    const result = await logout(token);
    if (!result) {
      res.status(400).json({
        data: null,
        message: "Bad request.",
      });
      return;
    }
    res.status(200).json({
      data: result,
      message: "User has been logged out successfully.",
    });
    next();
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] = await this.getAllUsers();
    res.status(200).json({
      data: users,
      message: "",
    });
    next();
  };
}

export const AuthController = new RawAuthController();
