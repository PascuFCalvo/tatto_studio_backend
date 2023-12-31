import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenDecoded } from "../types";
import "dotenv/config"

const auth = (req: Request, res: Response, next: NextFunction) => {
  
  
  try {
    if (!req.headers.authorization) {
      console.log("hola del middleware")
      return res.status(401).json({
        error: "Please, insert a Token for authorization",
      });
    }
    
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      
      console.log("hola del middleware ya verificado que tiene token")
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecoded;
      req.token = tokenDecoded;
      
      next(); 
    } else {
      return res.status(401).json({
        error: "Token invalid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Authentication error",
    });
  }
};

export { auth };