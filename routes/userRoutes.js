const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { default: mongoose } = require("mongoose");

const createUser = async (req, res) => {
  // endpoint para crear un usuario

  let cuerpoRequest = req.body;

  //   User.exists({ username: cuerpoRequest.username }, (err, doc) => {
  const _user = await User.exists({ username: cuerpoRequest.username });

  if (_user) {
    return res.status(400).json({
      message: "El usuario ya existe",
    });
  } else {
    bcrypt.hash(cuerpoRequest.password, 10, async (err, hash) => {
      const newUser = new User({
        username: cuerpoRequest.username,
        password: hash,
        role: cuerpoRequest.role,
      });
      newUser.save().then((createdUser) => {
        console.log(createdUser._id);
        if (createdUser) {
          res.status(201).json({
            message: "Usuario creado",
            userID: createdUser._id,
          });
        } else {
          res.status(500).json({
            message: "Error al crear el usuario",
          });
        }
      });
    });
  }
};
// };

const router = express.Router();

// Aquí van mis rutas o endpoints
router.route("/").post(createUser);
// router.post(createUser);

module.exports = router;
