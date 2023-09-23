import express from "express";
import userController from "../controllers/user.controller";
import { validateNewUser, validateUpdateUser } from "../dto/obj/user.dto";
import Middleware from "../middleware";

const routers = express.Router();

routers.post(
  "/",
  validateNewUser,
  Middleware.ValidationResponse.validateResult,
  userController.createUser
);

routers.put(
  "/:id",
  validateUpdateUser,
  Middleware.ValidationResponse.validateResult,
  userController.updateUser
);

routers.get("/:identifier", userController.getUserByIdentifier);

routers.get("/", userController.getAllUsers);

routers.delete("/:identifier", userController.deleteUserByIdentifier);

// Export the rtouter
export default routers;
