const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { default: mongoose } = require("mongoose");

const createUser = async (req, res) => {
  // endpoint para crear un usuario
  let cuerpoRequest = req.body;

  User.exists({ username: cuerpoRequest.username }, (err, doc) => {
    // si hay un error
    if (err) {
      console.log(err);
    } else {
      // si no hay error
      if (doc === null) {
        // si el usuario no existe
        bcrypt.hash(cuerpoRequest.password, 10, async (err, hash) => {
          // si hay error
          const newUser = new User({
            username: cuerpoRequest.username,
            password: hash,
            role: cuerpoRequest.role,
          });
        });
      }
    }
  });
};
