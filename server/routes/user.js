const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user");

router.post("/create/user", createUser);
router.get("/get/users", getUsers);
router.get("/user/:userId", getUser);
router.put("/update/user/:userId", updateUser);
router.delete("/delete/user/:userId", deleteUser);
module.exports = router;
