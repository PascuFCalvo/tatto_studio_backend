import { NextFunction, Request, Response } from "express";


const isBlackAlien = (req: any, res: Response, next: NextFunction) => {
  console.log(req.token) 
  if (req.token && req.token.level === "black_alien") {
   
    next();
  } else {
    return res.json('NO PUEDES PASAR');
  }
}

export { isBlackAlien }
