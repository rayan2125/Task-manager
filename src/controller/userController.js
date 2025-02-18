import UserServices from "../service/userService.js";

export const createUserHandler = async (req, res) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllUsersHandler = async (req, res) => {
  try {
    const users = await UserServices.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const user = await UserServices.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const user = await UserServices.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const user = await UserServices.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
