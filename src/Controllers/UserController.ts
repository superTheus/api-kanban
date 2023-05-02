import { Request, Response, json } from 'express';
const UsersModel: ModelsUser = require('../models/usersModel');

interface ModelsUser {
  getAllUsers: () => {}
  insertUser: (user: User) => {}
  getUserById: (id: number) => {}
  updateUserById: (user: User) => {}
  deleteUserById: (id: number) => {}
}

interface User {
  user: string;
  name: string;
  password: string;
}

const getAllUsersController = async (_req: Request, res: Response) => {
  const result = await UsersModel.getAllUsers();
  res.status(200).json(result);
}

const getUsersByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersModel.getUserById(parseInt(id));
  res.status(200).json(result);
}

const insertUsersController = async (req: Request, res: Response) => {
  const user: User = req.body
  const result = await UsersModel.insertUser(user);
  res.status(200).json(result);
}

const updateUserByIdController = async (req: Request, res: Response) => {
  const user: User = req.body
  const result = await UsersModel.updateUserById(user);
  res.status(200).json(result);
}

const deleteUserByController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersModel.deleteUserById(parseInt(id));
  res.status(200).json(result);
}

module.exports = {
  getAllUsersController,
  insertUsersController,
  getUsersByIdController,
  updateUserByIdController,
  deleteUserByController
}