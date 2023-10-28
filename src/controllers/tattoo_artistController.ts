import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Tattoo_artist } from "../models/Tattoo_artist";
import bcrypt from "bcrypt";
import { Appointment } from "../models/Appointment";

const registertattoo = async (req: Request, res: Response) => {
  console.log("create");
  try {
         console.log("entra en el try");
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const email = req.body.email;
    const level = req.body.level;
    const password = req.body.password;
    const phone = req.body.phone;
    const licenseNumber = req.body.licenseNumber;
    const formation = req.body.formation;
         console.log("coge los datos");

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: "Correo electrónico no válido" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
      
         console.log("encripta el password");

    const newTattooArtist = await Tattoo_artist.create({
      user_id:user_id,
      user_name: user_name,
      email: email,
      level: level,
      password: encryptedPassword,
      phone: phone,
      licenseNumber: licenseNumber,
      formation: formation,
     
    }).save();

    console.log("ha creado el tatuador");
    return res.json({
      success: true,
      message: "tatto artist created succesfully",
      newTattooArtist,
    });
  } catch (error:any) {
    return res.status(500).json({
      success: false,
      message: "tatto artist cant be created",
      error: error.message,
    });
  }
};

const TattooAppointments = async (req: Request, res: Response) => {
  console.log("llega")
  try {
    
    if (req.token.id === req.body.id){
      const tattooArtistId = req.body.tattoo_artist_id;
      const appointments = await Appointment.find(
        {
        where: { tattoo_artist : tattooArtistId },
      }
      );
      const message = "Tattoo Citas"
  
      const response = {
        message,
        myAppointments: appointments,
      };
  
      return res.json(response)
     }
  
      
  } catch (error:any) {
    return res.status(500).json({
      success: false,
      message: "cant find appointments",
      error: error
    });
  }
};


export { registertattoo , TattooAppointments };
