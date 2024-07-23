// controllers/userController.js
import User from "../models/user.js";

// Get all users

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
// // console.log(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { is_active: 1 },
      attributes: ["id", "name", "email"],
    });
    if (users.length === 0) {
      //   logger.info("user not found");
      return res.status(200).json({
        status: 0,
        data: [],
        message: "No data found",
      });
    }
    // logger.info(`Retrieved all user`);
    return res
      .status(200)
      .json({ status: 1, data: users, message: "Retrieved all users" });
  } catch (err) {
    // logger.error(`MASTER002: Error fetching banks: ${err.message}`);
    return res
      .status(500)
      .json({ status: 0, data: [], message: "Failed to find users" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
