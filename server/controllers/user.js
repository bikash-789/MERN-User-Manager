const User = require("../models/user");
const Role = require("../models/role");

module.exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      error: "Name, Email, Password, and Role are required",
    });
  }

  try {
    const foundRole = await Role.findById(role);
    if (!foundRole) {
      return res.status(400).json({
        error: "Invalid role ID",
      });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();
    user.salt = undefined;
    user.hashed_password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("role", "name");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        error: "UserId is required",
      });
    }

    const user = await User.findById(userId).populate("role", "name");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { role, name, email, password } = req.body;

  if (!userId || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "User ID and updates are required",
    });
  }

  try {
    let updatedRole = null;
    if (role) {
      updatedRole = await Role.findById(role);
      if (!updatedRole) {
        return res.status(400).json({
          error: "Invalid role ID",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role: updatedRole ? updatedRole._id : undefined,
        name,
        email,
        password,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("role", "name");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({
      error:
        "An error occurred while updating the user. Please try again later.",
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      error: "User ID is required",
    });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
