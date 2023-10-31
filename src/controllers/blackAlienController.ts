import { Response, Request } from "express";
import { User } from "../models/User";
import { validation } from "../validations/validations";


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

const changeLevel = async (req: Request, res: Response) => {
  try {
    const idtoChangeLevel = req.body.id
    const levelToChange = req.body.level

    const validationChangeLevel = validation(req.body.id, 255);
    if (!validationChangeLevel) {
    return res.json({ nessage: `${req.body.id} not valid` });
  }

  const validationLevelToChange = validation(req.body.level ,255);
  if (!validationLevelToChange) {
  return res.json({ nessage: `${req.body.level} not valid` });
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

    const validationDeleteUser = validation(req.body.id, 255);
    if (!validationDeleteUser) {
    return res.json({ nessage: `${req.body.id} not valid` });
  }


    await User.delete({ id: idtoDelete });

    return res.json({
      message: "User deleted"
    })


  } catch (error) {
    
  }
}
export { getUsers , changeLevel, deleteUser};
