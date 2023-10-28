import { NextFunction, Request, Response} from "express";

const isTattooArtist = (req: any, res: Response, next: NextFunction) => {
  // if (req.token.level !== "tattoo" || req.token.level !== "black_alien") {
  //   return res.json('NO PUEDES PASAR')
  // }

  next();
}

export { isTattooArtist }