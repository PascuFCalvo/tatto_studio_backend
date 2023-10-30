import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { Appointment } from "../models/Appointment";
import { Tattoo_artist } from "../models/Tattoo_artist";
import "dotenv/config"


const register = async (req: Request, res: Response) => {
  try {
    const user_name = req.body.user_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    // validacion regex para email (no voy a poner restricciones al password por simplificar)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: "email format not valid" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      user_name: user_name,
      email: email,
      password: encryptedPassword,
      phone: phone,
    }).save();

    return res.json({
      success: true,
      message: "User created succesfully",
      token: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cannot be created",
      error: error,
    });
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User or password incorrect",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: true,
        message: "User or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        phone: user.phone,
        level: user.level,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "72h",
      }
    );

    return res.json({
      success: true,
      message: "User logged succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "users cant be logged",
      error: error,
    });
  }
};
const profile = async (req: Request, res: Response) => {
  try {
    
    const user = await User.findOneBy({
      id: req.token.id,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User profile retrieved",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User profile cannot be retrieved",
    });
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const updatedUserData = req.body;
    const userId = req.token.id;
    const message = "Usuario actualizado correctamente";

    await User.update({ id: userId }, updatedUserData);

    const updatedUser = await User.findOneBy({ id: userId });

    const response = {
      message,
      user: updatedUser,
    };

    return res.json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Hubo un error al actualizar el usuario" });
  }
};
const myAppointments = async (req: Request, res: Response) => {
  try {
    const message = "Your user appointments";
    if (req.token.id === req.body.id) {
      const user = req.body.id;

      const myAppointments = await Appointment.find({
        where: { client: user },
        select: {
          id: true,
          tattoo_artist: true,
          title: true,
          description: true,
          type: true,
          appointment_date: true,
          appointment_turn: true,
        },
      });

      const response = {
        message: message,
        myAppointments,
      };

      return res.json(response);
    }
  } catch (error) {
    return res.status(500).json({ error: "Appointments cannot be retrieved" });
  }
};

export { register, login, profile, update, myAppointments };
