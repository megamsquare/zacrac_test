import { Request, Response } from "express";
import status_code from "http-status";
import { NewUser, QueryUser, UpdateUser } from "../dto/obj/user.dto";
import Services from "../services";

async function createUser(req: Request, res: Response) {
  try {
    let userInfo: NewUser;

    userInfo = req.body;

    const user = await Services.UserService.createUser(userInfo);
    if (user instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ message: user.message });
      return;
    }

    res.status(status_code.CREATED).json({ data: user });
    return;
  } catch (error) {
    res.status(status_code.BAD_REQUEST).json({ message: error });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id as string;

    const updateInfo = req.body;

    const userInfo: UpdateUser = {
      userId,
      first_name: updateInfo.first_name,
      last_name: updateInfo.last_name,
      email: updateInfo.email,
      username: updateInfo.username,
      phone_number: updateInfo.phone_number,
    }

    const updatedUser = await Services.UserService.updateUser(userInfo);
    if (updatedUser instanceof Error) {
      console.log("user Information", updatedUser);
      res.status(status_code.BAD_REQUEST).json({ error: updatedUser.message });
      return;
    }

    res.status(status_code.OK).json({ data: updatedUser });
    return;
  } catch (error) {
    res.status(status_code.BAD_REQUEST).json({ message: error });
  }
}

async function getUserByIdentifier(req: Request, res: Response) {
  try {
    if (!req.params.identifier || req.params.identifier === "") {
      res.status(status_code.BAD_REQUEST).json({ error: 'Invalid identifier' });
      return;
    }
  
    const getUser = await Services.UserService.getUserByIdentifier(req.params.identifier);
    if (getUser instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ error: getUser.message });
      return;
    }

    res.status(status_code.OK).json({ data: getUser });
    return;
  } catch (error) {
    res.status(status_code.UNAUTHORIZED).json({ error });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const { page = 1, items = 10 } = req.query;
    const pageLimit: QueryUser = {
      pageNumber: page as number,
      limitNumber: items as number
    }
    const getUsers = await Services.UserService.getAllUsers(pageLimit);
    if (getUsers instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ error: getUsers.message });
      return;
    }
    res.status(status_code.OK).json({ data: getUsers });
  } catch (error) {
    res.status(status_code.UNAUTHORIZED).json({ error });
    return
  }
}

async function deleteUserByIdentifier(req: Request, res: Response) {
  try {
    if (!req.params.identifier || req.params.identifier === "") {
      res.status(status_code.BAD_REQUEST).json({ error: 'Invalid identifier' });
      return;
    }

    const deleteUser = await Services.UserService.deleteUser(req.params.identifier);
    if (deleteUser instanceof Error) {
      res.status(status_code.BAD_REQUEST).json({ error: deleteUser.message });
      return;
    }

    return res.status(status_code.OK).json({ data: deleteUser });
  } catch (error) {
    return res.status(status_code.UNAUTHORIZED).json({ error });
  }
}

const UserController = {
  createUser,
  updateUser,
  getUserByIdentifier,
  deleteUserByIdentifier,
  getAllUsers,
};

export default UserController;
