import { Response, Request } from "express";
import { Appointment } from "../models/Appointment";
import {} from "dayjs";

const create = async (req: Request, res: Response) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const tattoo_artist = req.body.tattoo_artist;
    const client = req.body.client;
    const type = req.body.type;
    const date = req.body.date;
    const turn = req.body.turn;

    const formatedTurn = turn.toLowerCase();
    const formatedDate = date.replace(/\//g, "-");

    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const checkDate = regex.test(formatedDate);
    if (checkDate === false) {
      return res.json({ error: "Date Invalid" });
    }

    const checkAvailableDate = await Appointment.findOne({
      where: {
        tattoo_artist,
        appointment_date: formatedDate,
        appointment_turn: formatedTurn,
      },
    });

    if (checkAvailableDate) {
      return res.json({
        error: "Date and turn already in use for this tatto artist ",
      });
    }

    const newAppointment = await Appointment.create({
      title: title,
      description: description,
      tattoo_artist: tattoo_artist,
      client: client,
      type: type,
      appointment_date: formatedDate,
      appointment_turn: formatedTurn,
    }).save();

    return res.json({
      success: true,
      message: "Appointment created succesfully",
      appointment: {
        Title: newAppointment.title,
        Description: newAppointment.description,
        Artist: newAppointment.tattoo_artist,
        Date: newAppointment.appointment_date,
        Turn: newAppointment.appointment_turn,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Appointment cant be created",
      error: error,
    });
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const appointmentToUpdate = req.body.id;
    const updatedAppointment = req.body;
    const messageReturn = "Appointment updated succesfully";

    if (req.body.appointment_date)
      await Appointment.update(
        {
          id: parseInt(appointmentToUpdate),
        },
        updatedAppointment
      );

    const updatedUser = await Appointment.findOneBy({
      id: parseInt(appointmentToUpdate),
    });

    const response = {
      message: messageReturn,
      updatedUser,
    };

    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.body.id;
    const messageReturn = "Appointment deleted";

    const appointmentToRemove = await Appointment.findOneBy({
      id: parseInt(appointmentId),
    });

    if (!appointmentToRemove) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.delete(appointmentId);

    const response = {
      message: messageReturn,
      appointmentRemoved: appointmentToRemove,
    };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { create, update, deleteAppointment };
