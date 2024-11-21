const Role = require("../models/role");

module.exports.createRole = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "Name is required",
    });
  }
  try {
    const role = new Role(req.body);
    await role.save();
    return res.status(201).json({
      message: "Role created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

module.exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

module.exports.getRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    return res.status(200).json(role);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err.message || err,
    });
  }
};

module.exports.updateRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Role name and permissions are required",
    });
  }

  try {
    const roleId = await Role.find({ name });
    const updateRole = await Role.findByIdAndUpdate(roleId, req.body);
    if (!updateRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json({
      message: "Role updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

module.exports.deleteRole = async (req, res) => {
  const { roleId } = req.body;
  if (!roleId) {
    return res.status(400).json({
      error: "Role ID is required",
    });
  }

  try {
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json({
      message: "Role deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};
