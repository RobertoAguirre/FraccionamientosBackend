const express = require("express");
const house = require("../models/casas");
const multer = require("multer");

const { default: mongoose } = require("mongoose");
const House = require("../models/casas");

const storage = multer.diskStorage({
  // con destination le decimos a multer donde guardar los archivos
    destination: function (req, files, cb) {
    cb(null, "uploads/");
    },
  // con filename le damos un nombre a los archivos
  //cb es el callback que se ejecuta cuando multer ya tiene el nombre del archivo
    filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

const createHouse = async (req, res) => {
    let cuerpoRequest = req.body;
    const _house = await house.exists({ nombreFracc: cuerpoRequest.nombreFracc });

    if (_house) {
    return res.status(400).json({
        ok: false,
        message: "La casa ya existe",
    });
    } else {
    // funcion ternaria para verificar si se subió un archivo. Funciona asi:
    // si req.file existe, entonces logo = req.file.path, si no, logo = null

    const logo = req.file ? req.file.path : null;

    // create a new field for the document in mongo db
    const newField = {
        test: "Test de prueba de creación de campo en casa",
    };

        // UPdate field in Fracc

    // return Fracc.updateOne(
    //   { _id: req.params.id },
    //   {
    //     $set: {
    //       nombreFracc: cuerpoRequest.nombreFracc,
    //       direccion: cuerpoRequest.direccion,
    //       NumeroCasas: cuerpoRequest.NumeroCasas,
    //       tipoFraccionamiento: cuerpoRequest.tipoFraccionamiento,
    //       zonasInteres: cuerpoRequest.zonasInteres,
    //       casasHabitadas: cuerpoRequest.casasHabitadas,
    //       logo: logo,
    //     },
    //   }

    // updateFracc(req, res);

    // se crea un nuev objeto de tipo Fracc
    const House_new = new house({
        idFracc:cuerpoRequest.idFracc,
        houseNumber: cuerpoRequest.houseNumber,
        houseAdress: cuerpoRequest.houseAdress,
        familyName: cuerpoRequest.familyName,
        houseOwner: cuerpoRequest.houseOwner,
        familyMembers: cuerpoRequest.familyMembers,
        paymentStatus: cuerpoRequest.paymentStatus,
        //logo: String(logo),
        // test: "Test de prueba de creación de campo en fraccionamiento",
        });

        await House_new.save().then((createdHouse) => {
            console.log(createdHouse._id);
            if (createdHouse) {
                res.status(201).json({
                msg: "Casa creada",
                FraccID: createdHouse._id,
                });
            } else {
                res.status(500).json({
                msg: "Error al crear Casa",
                });
            }
            });
            }
        };