import { Response, Request } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";

const getArtists = async (req: Request, res: Response) => {
  try {
    console.log("entra")
    const Artists = await Tattoo_artist.find();

    return res.json({
      message:"Tattoo artist list",
      Artists,
    });
  } catch {
    return res.json({
      success: true,
      message: "cant retrieve tattoo artist list",
    });
  }
};

export { getArtists };
