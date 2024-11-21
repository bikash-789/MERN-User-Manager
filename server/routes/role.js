const express = require("express");
const router = express.Router();

const {
  createRole,
  updateRole,
  getRoles,
  deleteRole,
  getRole,
} = require("../controllers/role");

router.post("/create/role", createRole);
router.get("/get/roles", getRoles);
router.get("/role/:roleId", getRole);
router.put("/update/role", updateRole);
router.delete("/delete/role", deleteRole);
module.exports = router;
