import { NextFunction, Request, Response} from "express";

const isTattooArtist = (req: any, res: Response, next: NextFunction) => {
  if (req.token.level === "tattoo" || req.token.level ==="black_alien") {
    next();
    
  }else {
    return res.json('you are not a tattoo artist')
  }

  
}

export { isTattooArtist }