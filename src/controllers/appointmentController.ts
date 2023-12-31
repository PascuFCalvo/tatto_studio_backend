import { Response, Request } from "express";
import { Appointment } from "../models/Appointment";
import {} from "dayjs";
import { myAppointments } from "./usersController";

const create = async (req: Request, res: Response) => {
  try {

    // if (req.token.id === req.body.client) 
    {const title = req.body.title;
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
    });}
    
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
     
      console.log("entra");

      const appointmentToUpdate = req.body.id;

      const messageReturn = "Appointment updated succesfully";

      const id = req.body.id;
      const title = req.body.title;
      const description = req.body.description;
      // const tattoo_artist = req.body.tattoo_artist;
      // const client = req.body.cliente;
      // const type = req.body.type;
      // const date = req.body.date;
      // const turn = req.body.turn;

      await Appointment.update(
        {
          id: parseInt(appointmentToUpdate),
        },
        {
          id: id,
          title: title,
          description: description,
          // tattoo_artist: tattoo_artist,
          // client: client,
          // type: type,
          // appointment_date:date,
          // appointment_turn:turn
        }
      );

      const updatedAppointment = await Appointment.findOneBy({
        id: parseInt(appointmentToUpdate),
      });

      const response = {
        message: messageReturn,
        updatedAppointment,
      };

      return res.json(response);
    }
   catch (error) {
    return res.json(error);
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
  try {
    
    console.log(req.body)
    const idtoDelete = req.body.id

    await Appointment.delete(idtoDelete );

    return res.json({
      message: "Se ha borrado la cita", idtoDelete
    })


  } catch (error) {
    // Handle the error appropriately, e.g., log it or send an error response
    console.error("Error deleting appointment:", error);
    return res.status(500).json({
      error: "Error deleting appointment",
    });
  }
};

export { create, update, deleteAppointment };
