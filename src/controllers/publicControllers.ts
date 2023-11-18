import { Response, Request } from "express";
import { ImageGallery } from "../models/ImageGallery";
import { Tattoo_artist } from "../models/Tattoo_artist";

const getArtists = async (req: Request, res: Response) => {
  try {
    const Artists = await Tattoo_artist.find({
      select: {
        id: true,
        user_name: true,
        phone:true,
        email:true,
        formation:true,
        licenseNumber:true,
      
      },
    });

    return res.json({
      message: "Tattoo artist list",
      Artists,
    });
  } catch {
    return res.json({
      success: true,
      message: "cant retrieve tattoo artist list",
    });
  }
};

const getImages = async (req: Request, res: Response) => {
  try {
    const Images = await ImageGallery.find();

    return res.json({
      message: "Images list",
      Images,
    });
  } catch {
    return res.json({
      success: true,
      message: "cant retrieve images list",
    });
  }
};

export { getArtists, getImages };
