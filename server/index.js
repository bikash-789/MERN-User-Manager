const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => {
    console.log(err);
  });
const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");
const authRoutes = require("./routes/auth");
app.use(morgan("dev"));
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Welcome to API!");
});
app.use(userRoutes);
app.use(roleRoutes);
app.use(authRoutes);
app.listen(8000, (err) => {
  if (err) console.log("Oops! Server could not be setup :(");
  console.log(`Server listening on port 8000`);
});
