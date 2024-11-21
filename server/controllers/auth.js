const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");
exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(200).json({
      user,
    });
  });
};

exports.signIn = async (req, res) => {
  try {
    const { email: userEmail, password } = req.body;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({
        error: "User with this email does not exist, please sign up!",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { maxAge: 30 * 60 * 1000 });

    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name,
        role,
      },
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    return res.status(500).json({
      error: "An error occurred while signing in.",
    });
  }
};

exports.signOut = (req, res) => {
  let user = req.user;
  console.log(user);
  res.clearCookie("t");
  res.json({ message: "Signed out successfully!!" });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == "Admin") {
    return res.status(403).json({
      error: "User is not admin!",
    });
  }
  next();
};
