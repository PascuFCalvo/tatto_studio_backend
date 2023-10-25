import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecoded } from "../types";

const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.json({
        message: "introduce el token",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({
        message: "token no valido",
      });
    }

    const tokenDecoded = jwt.verify(token, "matasuegras") as TokenDecoded;

    req.token = tokenDecoded;

    next();
  } catch (error) {
    return res.json({
      error: "Not auth",
    });
  }
};

export { auth };
