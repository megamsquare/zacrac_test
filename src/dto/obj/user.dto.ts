import { ValidationChain, body } from "express-validator";

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
}

export interface UpdateUser {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
}

export interface QueryUser {
  pageNumber: number;
  limitNumber: number;
}

export const validateNewUser: ValidationChain[] = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("first name is required"),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("last name is required"),
  body("email").trim().isEmail().withMessage("email is required"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username is required"),
  body("phone_number")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password is required"),
];

export const validateUpdateUser: ValidationChain[] = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("first name is required"),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("last name is required"),
  body("email").trim().isEmail().withMessage("email is required"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username is required"),
  body("phone_number")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password is required"),
];
