import { Response, Request } from "express";
import { User } from "../models/User";


const getUsers = async (req: Request, res: Response) => {
  try {
    const Users = await User.find();

    return res.json({
      Users,
    });
  } catch {
    return res.json({
      success: true,
      message: "nanana",
    });
  }
};

const changeLevel = async (req: Request, res: Response) => {
  try {
    const idtoChangeLevel = req.body.id
    const levelToChange = req.body

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
      message: "user deleted"
    })


  } catch (error) {
    
  }
}
export { getUsers , changeLevel, deleteUser};
