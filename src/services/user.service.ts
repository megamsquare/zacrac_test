import { NewUser, UpdateUser, QueryUser } from "../dto/obj/user.dto";
import Model from "../models";
import Err from "../dto/error_dto";
import { IUser } from "../models/users.model";
import mongoose, { Types } from "mongoose";

async function createUser(
  user: NewUser
): Promise<(IUser & { _id: Types.ObjectId }) | Error> {
  try {
    const userModel = Model.User;

    const emailExist = await userModel.exists({ email: user.email });
    if (emailExist) {
      throw new Error(Err.EmailExists);
    }

    const usernameExist = await userModel.exists({ username: user.username });
    if (usernameExist) {
      throw new Error(Err.UsernameExists);
    }

    const saveUser = await userModel.create({ ...user });

    return saveUser;
  } catch (error) {
    return error as Error;
  }
}

async function getAllUsers(query: QueryUser) {
  try {
    const userModel = Model.User;
    const skip = (query.pageNumber - 1) * query.limitNumber;

    const users = await userModel.find().skip(skip).limit(query.limitNumber);
    return users;
  } catch (error) {
    return error as Error;
  }
}

async function getUserByIdentifier(identifier: string) {
  try {
    const userModel = Model.User;
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    let filter: any = {};
    if (isObjectId) {
      filter = { _id: identifier };
    } else {
      filter = { $or: [{ email: identifier }, { username: identifier }] };
    }
    const user = await userModel.findOne(filter);
    if (!user) {
      throw new Error(Err.UserDoesNotExists);
    }

    return user;
  } catch (error) {
    return error as Error;
  }
}

async function updateUser(userInfo: UpdateUser) {
  try {
    if (!userInfo.userId || userInfo.userId === "") {
      throw new Error(Err.InvalidUserId);
    }

    const update = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      username: userInfo.username,
      phone_number: userInfo.phone_number,
    };

    const userModel = Model.User;
    const isObjectId = mongoose.Types.ObjectId.isValid(userInfo.userId);

    let filter: any = {};
    if (isObjectId) {
      filter = { _id: userInfo.userId };
    } else {
      throw new Error(Err.InvalidUserId)
    }
    const userUpdate = await userModel.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    if (!userUpdate) {
      throw new Error(Err.UserDoesNotExists);
    }

    return userUpdate;
  } catch (error) {
    return error as Error;
  }
}

async function deleteUser(identifier: string) {
  try {
    const userModel = Model.User;
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    let filter: any = {};
    if (isObjectId) {
      filter = { _id: identifier };
    } else {
      filter = { $or: [{ email: identifier }, { username: identifier }] };
    }

    const userDeleted = await userModel.findOneAndRemove(filter);

    if (!userDeleted) {
      throw new Error(Err.UserDoesNotExists);
    }

    return userDeleted;
  } catch (error) {
    return error as Error;
  }
}

const UserService = {
  createUser,
  getAllUsers,
  getUserByIdentifier,
  updateUser,
  deleteUser,
};

export default UserService;
