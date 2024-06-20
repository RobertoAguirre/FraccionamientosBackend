const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const authenticate = async (req, res) => {
  let cuerpoRequest = req.body; //mensaje que me envía el cliente para autenticar ej. {username:

  const _user = await User.findOne({ username: cuerpoRequest.username });
  if (_user) {
    console.log("Usuario encontrado");
    let passwordGuardado = _user.password;
    bcrypt.compare(cuerpoRequest.passord, passwordGuardado, (err, result) => {
      if (result === false) {
        return res.status(401).json({
          message: "Usuario o contraseña incorrectos",
        });
      } else {
        console.log("Contraseña correcta");
        const payload = {
          user: _user,
        };
        const token = jwt.sign(payload, "A$per6uer.47", { expiresIn: "10" });
        res.status(200).json({
          message: "Usuario autenticado",
          username: _user.username,
          role: _user.role,
          token: token,
        });
      }
    });
  } else {
    console.log("Usuario no encontrado");
    res.status(401).json({
      message: "Usuario o contraseña incorrectos",
    });
  }
};

const getAllUsers = async (req, res) => {
  let _allUsers = await User.find({});
  res.status(200).json(_allUsers);
};

const getAllUsersR = async (req, res) => {
  const usuarios = await User.find({});
  res.status(200).json({
    usuarios: usuarios,
  });
};

const getUser = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const usuarioEncontrado = await User.find(
    { _id: id },
    { _id: 0, password: 0, role: 0 }
  );
  if (usuarioEncontrado) {
    res.status(200).json({
      usuario: usuarioEncontrado,
    });
  }
};

const updateUser = async (req, res) => {
  let cuerpoRequest = req.body;

  return User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        username: cuerpoRequest.username,
        role: cuerpoRequest.role,
      },
    }
  ).then((result) => {
    res.status(200).json({
      message: "Usuario actualizado",
    });
  });
};

// a partir del Get one haer el endpoint de delete

const deleteUser = async (req, res) => {
  let cuerpoRequest = req.body;
  let id = req.params.id;
  let _getUser = await User.find({ _id: id });

  if (_getUser.length > 0) {
    let _getUser = await User.find({ _id: id });
    console.log(
      "Usuario" +
        _getUser[0].username +
        "id: " +
        _getUser[0].id +
        ", encontrado para borrar"
    );
    console.log(_getUser);
    //   console.log(cuerpoRequest);
    console.log(_getUser[0].username);

    let usuarioBorrado = _getUser[0].username;

    return User.deleteOne({
      _id: id,
    }).then((result) => {
      res.status(200).json({
        message: "Usuario " + usuarioBorrado + " eliminado",
      });
    });
  } else {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }
};

const deleteUserSimple = async (req, res) => {
  let cuerpoRequest = req.body;
  let id = req.params.id;
  let usuarioBorrado = await User.findOne({ _id: id });

  return User.deleteOne({
    _id: id,
  }).then((result) => {
    res.status(200).json({
      message: "Usuario " + usuarioBorrado.username + " eliminado",
    });
  });
};

const router = express.Router();

// CRUD operations
// Aquí van mis rutas o endpoints
router
  .route("/")
  .post(createUser) // with  this endpoint we can create a user
  .get(getAllUsersR); // with  this endpoint we can get all users

router
  .route("/:id")
  .get(getUser) //  with  this endpoint we can get a single user
  .patch(updateUser) //  with  this endpoint we can update a user
  .delete(deleteUserSimple); //  with  this endpoint we can delete user

router.route("/get-user/:id").get(getUser);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/delete-user-simple/:id").delete(deleteUserSimple);

router.route("/authenticate").post(authenticate); // authenticate is for login
router.route("/all-users").get(getAllUsers); // this show all users

module.exports = router;
