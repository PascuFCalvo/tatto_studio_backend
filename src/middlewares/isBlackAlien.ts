import { NextFunction, Request, Response } from "express";


const isBlackAlien = (req: any, res: Response, next: NextFunction) => {
  
  if (req.token && req.token.level === "black_alien") {
   
    next();
  } else {
    return res.json('Your are not the black alien (super_admin)');
  }
}

export { isBlackAlien }
