import { Response, Request } from "express";
import { User } from "../models/User";
import { validation } from "../validations/validations";
import { Appointment } from "../models/Appointment";


const getUsers = async (req: Request, res: Response) => {
  try {
    const Users = await User.find();

    return res.json({
      message: "User list",
      Users,
    });
  } catch {
    return res.json({
      success: true,
      message: "Cant retrieve user list",
    });
  }
};

const getAppointments = async (req: Request, res: Response) => {
  try {
    const message ="hola"
    const myAppointments = await Appointment.find({
  
    relations: {
      userAppointment: true,
      tattoArtistAppointment: true,
    },

  });

  const response = {
    message: message,
    myAppointments: myAppointments,
  };

  return res.json(response);
}
catch (error: any) {
return res.status(500).json({ error: error.message });
}
};

const changeLevel = async (req: Request, res: Response) => {
  try {
    const idtoChangeLevel = req.body.id
    const levelToChange = req.body.level

 

  const validationLevelToChange = validation(req.body.level ,255);
  if (!validationLevelToChange) {
  return res.json({ message: `level ${req.body.level} not valid` });
}

    await User.update({ id: idtoChangeLevel }, levelToChange);

    const userChanged = await User.findOneBy({id:idtoChangeLevel})

    return res.json({
      user:userChanged
    })


  } catch (error) {
    
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {

    const idtoDelete = req.body.id

   
    
    await User.delete({ id: idtoDelete });

    return res.json({
      message: "User deleted"
    })


  } catch (error) {
    
  }
}
export { getUsers , changeLevel, deleteUser, getAppointments};
