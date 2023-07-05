import { Application, Router, application } from "express";
import { isAuthenticated } from "../middlewares";
import { AuthRoute } from "../api/auth/auth.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import contentLength from "express-content-length-validator";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { config } from "../utils";
import { TaskRoute } from "../api/task/task.route";

export const init = (router: Router, app: Application) => {
  app.use(compression());
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 5000,
    })
  );

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(contentLength.validateMax({ max: 5000 }));

  // session cookie setup
  app.use(
    cookieSession({
      name: "session",
      keys: [config.secret],
      // Cookie Options
      maxAge: 86400, // 24 hours
    })
  );

  // cors options
  const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
  };

  router.use("/api/*", cors(corsOptions), (req, res, next) => {
    next();
  });

  // helmet for route protection
  app.use(helmet());

  router.use("/api/logout", isAuthenticated);
  router.use("/api/users", isAuthenticated);
  router.use("/api/task*", isAuthenticated);

  AuthRoute(router);
  TaskRoute(router);
  
  app.use("/", router);
};
