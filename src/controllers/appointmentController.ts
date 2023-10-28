import { Response, Request } from "express";
import { Appointment} from "../models/Appointment";
import {  } from "dayjs";


const create = async (req: Request, res: Response) => {
   try {
      const title = req.body.title
      const description = req.body.description
      const tattoo_artist = req.body.tattoo_artist
      const client = req.body.client
      const type = req.body.type
      const date = req.body.date
      const turn = req.body.turn

      console.log(date)
  
      const newAppointment = await Appointment.create({
        title:title,
        description:description,
        tattoo_artist:tattoo_artist,
        client:client,
        type:type,
        appointment_date:date,
        appointment_turn:turn,
      }).save();
  
      return res.json({
        success: true,
        message: "Appointment created succesfully",
        appointment: newAppointment,
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
    const messageReturn = "SE HA ACTUALIZADO LA CITA";

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
  
;
const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.body.id; 
    const messageReturn = "CITA ELIMINADA";

    const appointmentToRemove = await Appointment.findOneBy({id:parseInt(appointmentId)});

    if (!appointmentToRemove) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    await Appointment.delete(appointmentId);

    const response = {
      message: messageReturn,
      appointmentRemoved: appointmentToRemove,
    };

    return res.json(response);
  } catch (error:any) {
    console.error("Error al eliminar la cita:", error.message);
    return res.status(500).json({ message: "Error al eliminar la cita" });
  }
};



export { create, update, deleteAppointment};
