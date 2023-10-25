import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const user_name = req.body.user_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    // validacion regex para email (no voy a poner restricciones al password por simplificar)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: "Correo electrónico no válido" });
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
      message: "user cant be created",
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
      "matasuegras",
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
const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findOneBy({
      id: req.token.id,
    });

    return res.json({
      success: true,
      message: "profile user retrieved",
      data: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "user profile cant be retrieved",
      error: error,
    });
  }
};

export { register, login, profile };
