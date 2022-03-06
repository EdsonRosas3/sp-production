import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {
  try {
    const { name, last_name, username, email, password } = req.body;
    
    const user = await User.create({
      name,
      last_name,
      username,
      email,
      password
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    
  }
};



export const getUser = async (req, res) => {};
