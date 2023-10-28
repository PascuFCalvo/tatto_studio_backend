import { NextFunction, Request, Response } from "express";

const isBlackAlien = (req: any, res: Response, next: NextFunction) => {

  if (req.token.level !== "black_alien") {
    return res.json('NO PUEDES PASAR')
  }

  next();
}

export { isBlackAlien }
