import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Tattoo_artist } from "../models/Tattoo_artist";
import bcrypt from "bcrypt";
import { Appointment } from "../models/Appointment";
import { validation } from "../validations/validations";
import { User } from "../models/User";

const registertattoo = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const email = req.body.email;
    const level = req.body.level;
    const password = req.body.password;
    const phone = req.body.phone;
    const licenseNumber = req.body.licenseNumber;
    const formation = req.body.formation;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensagge: "email format not valid" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const validationName = validation(user_name, 255);
    if (!validationName) {
      return res.json({ message: `name ${user_name} not valid` });
    }

    const validationLicenseNumber = validation(licenseNumber, 25);
    if (!validationLicenseNumber) {
      return res.json({ message: `license ${licenseNumber} not valid` });
    }

    const validationFormation = validation(formation, 255);
    if (!validationFormation) {
      return res.json({ message: `formation ${formation} not valid` });
    }

    const validationLevel = validation(level, 255);
    if (!validationLevel) {
      return res.json({ message: `level ${level} not valid` });
    }

    const validationPassword = validation(password, 50);
    if (!validationPassword) {
      return res.json({ message: `password ${password} not valid` });
    }

    const validationEmail = validation(email, 255);
    if (!validationEmail) {
      return res.json({ message: `email ${email} not valid` });
    }

    const validationPhone = validation(phone, 12);
    if (!validationPhone) {
      return res.json({ message: `phone ${phone} not valid` });
    }

    const modifyUSerToTattooArtist = await User.findOneBy({
      email: email,
    });

    await User.update(
      { id: modifyUSerToTattooArtist!.id },
      { level: "tattoo" }
    );

    const newTattooArtist = await Tattoo_artist.create({
      user_id: user_id,
      user_name: user_name,
      email: email,
      level: level,
      password: encryptedPassword,
      phone: phone,
      licenseNumber: licenseNumber,
      formation: formation,
    }).save();

    return res.json({
      success: true,
      message: "tatto artist created succesfully",
      newTattooArtist,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "tatto artist cant be created",
      error: error.message,
    });
  }
};

const TattooAppointments = async (req: Request, res: Response) => {
  try {
    if (req.token.id === req.body.id) {


    

      

      const tattooArtistId = req.body.tattoo_artist_id;
      const pageSize: any = parseInt(req.query.skip as string) || 5;
      const page: any = parseInt(req.query.skip as string) || 1;
      const skip = (page - 1) * pageSize;
      const tattooAppointments = await Appointment.find({
        where: { tattoo_artist: tattooArtistId },

        relations: {
          userAppointment: true,
        },

        skip: skip,
        take: pageSize,
      });
      const message = "Your tattoo appointments";

      const filteredTattooAppointments = tattooAppointments.map(
        (appointment) => ({
          Appointment_id: appointment.id,
          title: appointment.title,
          type: appointment.type,
          description: appointment.description,
          appointment_date: appointment.appointment_date,
          appointment_turn: appointment.appointment_turn,
          Client: appointment.userAppointment.user_name,
        })
      );

      const response = {
        message,
        myAppointments: filteredTattooAppointments,
      };

      return res.json(response);
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "cant find appointments",
      error: error,
    });
  }
};

export { registertattoo, TattooAppointments };
