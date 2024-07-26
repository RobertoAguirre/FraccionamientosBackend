const express = require("express");
const Fracc = require("../models/Fraccionamiento");
const multer = require("multer");

const { default: mongoose } = require("mongoose");
const Fraccionamiento = require("../models/Fraccionamiento");

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

const createFracc = async (req, res) => {
  let cuerpoRequest = req.body;
  const _fracc = await Fracc.exists({ nombreFracc: cuerpoRequest.nombreFracc });

  if (_fracc) {
    return res.status(400).json({
      ok: false,
      message: "El fraccionamiento ya existe",
    });
  } else {
    // funcion ternaria para verificar si se subió un archivo. Funciona asi:
    // si req.file existe, entonces logo = req.file.path, si no, logo = null

    const logo = req.file ? req.file.path : null;

    // create a new field for the document in mongo db
    const newField = {
      test: "Test de prueba de creación de campo en fraccionamiento",
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
    const Fracc_new = new Fracc({
      nombreFracc: cuerpoRequest.nombreFracc,
      direccion: cuerpoRequest.direccion,
      NumeroCasas: cuerpoRequest.NumeroCasas,
      tipoFraccionamiento: cuerpoRequest.tipoFraccionamiento,
      zonasInteres: cuerpoRequest.zonasInteres,
      casasHabitadas: cuerpoRequest.casasHabitadas,
      logo: String(logo),
      // test: "Test de prueba de creación de campo en fraccionamiento",
    });

    await Fracc_new.save().then((createdFracc) => {
      console.log(createdFracc._id);
      if (createdFracc) {
        res.status(201).json({
          msg: "Usuario creado",
          FraccID: createdFracc._id,
        });
      } else {
        res.status(500).json({
          msg: "Error al crear usuario",
        });
      }
    });
  }
};

const getAll = async (req, res) => {
  const fraccs = await Fracc.find({}); //esto me trae todos los fracc
  res.status(200).json({
    fraccionamientos: fraccs,
  });
};

const getFracc = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const fraccEncontrado = await Fracc.find(
    { _id: id },
    {
      nombreFracc: 1,
      // Fraccname: 1,
      direccion: 1,
      NumeroCasas: 1,
      tipoFraccionamiento: 1,
      zonasInteres: 1,
      casasHabitadas: 1,
    }
  );
  if (fraccEncontrado) {
    res.status(200).json({
      fraccionamiento: fraccEncontrado,
    });
  }
};

const updateFracc = async (req, res) => {
  let cuerpoRequest = req.body;

  return Fracc.updateOne(
    { _id: req.params.id },
    {
      $set: {
        nombreFracc: cuerpoRequest.nombreFracc,
        direccion: cuerpoRequest.direccion,
        NumeroCasas: cuerpoRequest.NumeroCasas,
        tipoFraccionamiento: cuerpoRequest.tipoFraccionamiento,
        zonasInteres: cuerpoRequest.zonasInteres,
        casasHabitadas: cuerpoRequest.casasHabitadas,
        logo: logo,
      },
    }
  ).then((result) => {
    res.status(200).json({
      msg: "Fraccionamiento actualizado",
    });
  });
};

const delFracc = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const fraccEliminado = await Fracc.deleteOne(
    { _id: id },
    {
      Fraccname: 1,
      direccion: 1,
      NumeroCasas: 1,
      tipoFraccionamiento: 1,
      zonasInteres: 1,
      casasHabitadas: 1,
    }
  );
  if (fraccEliminado) {
    res.status(200).json({
      fraccionamiento: fraccEliminado,
    });
  }
};

const router = express.Router();
//endpoints

router
  .route("/")
  // .post(createFracc) // with  this endpoint we can create a Fracc
  .post(upload.single("logo"), createFracc) // with  this endpoint we can create a Fracc
  .get(getAll); // with  this endpoint we can get all Fracc

router
  .route("/:id")
  .patch(updateFracc) //  with  this endpoint we can update a Fracc
  .delete(delFracc) //  with  this endpoint we can delete Fracc
  .get(getFracc); //

router.route("/").get(getAll);

module.exports = router;
