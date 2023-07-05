import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { JwtPayload, VerifyCallback } from "jsonwebtoken";
import { config } from "../utils";
import { CacheService } from "../services";

export const authenticate = async (data: Object) => {
  const token = jsonwebtoken.sign(data, config.secret, {
    expiresIn: 86400,
    audience: config.apiUrl,
    issuer: config.apiUrl,
  });

  const decoded = jsonwebtoken.decode(token) as unknown as JwtPayload;
  await CacheService.set(
    token,
    {
      ...data,
      exp: decoded.exp,
      iat: decoded.iat,
    },
    86400
  );
  return { ...decoded, token };
};

export const isAuthenticated = (
  req: Request & { decoded?: unknown },
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers["Authorization"] ||
    req.headers["authorization"]) as unknown as string;
  if (token) {
    jsonwebtoken.verify(
      token,
      config.secret,
      {
        issuer: config.apiUrl,
        audience: config.apiUrl,
      },
      (err, decoded) => {
        if (err) {
          res.status(401).json({
            data: null,
            message: "Invalid or missing token.",
          });
        } else {
          CacheService.get(token)
            .then((result) => {
              if (!result) {
                res.status(401).json({
                  data: null,
                  message: "Invalid or missing token.",
                });
                return;
              }
              req.decoded = result;
              next();
            })
            .catch((err) => {
              res.status(401).json({
                data: null,
                message: "Invalid or missing token.",
              });
            });
        }
      }
    );
  } else {
    res.status(401).json({
      data: null,
      message: "Invalid or missing token.",
    });
  }
};

export const logout = (token: string) => {
  return CacheService.remove(token);
};
