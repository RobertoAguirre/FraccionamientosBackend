const express = require("express");
const Serv = require("../models/Servicio");
const multer = require("multer");

const { default: mongoose } = require("mongoose");
const Servicio = require("../models/Servicio");

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

// const upload = multer({ storage: storage });

const createServicio = async (req, res) => {
  let cuerpoRequest = req.body;

  const _servicio = await Servicio.exists({
    nombreServicio: cuerpoRequest.nombreServicio,
  });

  if (_servicio) {
    return res.status(400).json({
      ok: false,
      message: "El servicio ya existe",
    });
  } else {
    // funcion ternaria para verificar si se subió un archivo. Funciona asi:
    // si req.file existe, entonces logo = req.file.path, si no, logo = null

    const logo = req.file ? req.file.path : null;

    // create a new field for the document in mongo db
    const newField = {
      test: "Test de prueba de creación de campo en fraccionamiento",
    };

    // se crea un nuev objeto de tipo Serv
    const Servicio_Object_New = new Servicio({
      nombreServicio: cuerpoRequest.nombreServicio,
      nombreCompañia: cuerpoRequest.nombreCompañia,
      numeroContrato: cuerpoRequest.numeroContrato,
      frecuenciaPago: cuerpoRequest.frecuenciaPago,
      costoPorPago: cuerpoRequest.costoPorPago,
      idFraccionamiento: cuerpoRequest.idFraccionamiento,
      nombreFraccionamiento: cuerpoRequest.nombreFraccionamiento,
      //   logo: String(logo),
    });

    //Ejemplo
    // {
    //     "nombreServicio": "Electricidad",
    //     "nombreCompañia": "CFE",
    //     "numeroContrato": "123456789",
    //     "frecuenciaPago": "Mensual",
    //     "costoPorPago": 500,
    //     "idFraccionamiento": "FRACC001",
    //     "nombreFraccionamiento": "Fraccionamiento Los Pinos"
    //   }

    await Servicio_Object_New.save().then((createdService) => {
      console.log(createdService._id);
      if (createdService) {
        res.status(201).json({
          msg: "Servicio creado",
          ServiceID: createdService._id,
        });
      } else {
        res.status(500).json({
          msg: "Error al crear servicio",
        });
      }
    });
  }
};

const getAll = async (req, res) => {
  const servs = await Servicio.find({}); //esto me trae todos los fracc
  res.status(200).json({
    servicios: servs,
  });
};

const getServicio = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const servicioEncontrado = await Servicio.find(
    { _id: id },
    {
      nombreServicio: 1,
      nombreCompañia: 1,
      numeroContrato: 1,
      frecuenciaPago: 1,
      costoPorPago: 1,
      idFraccionamiento: 1,
      nombreFraccionamiento: 1,
      //   logo, 1
    }
  );
  if (servicioEncontrado) {
    res.status(200).json({
      servicio: servicioEncontrado,
    });
  }
};

const updateServicio = async (req, res) => {
  let cuerpoRequest = req.body;

  return Servicio.updateOne(
    { _id: req.params.id },
    {
      $set: {
        nombreServicio: cuerpoRequest.nombreServicio,
        nombreCompañia: cuerpoRequest.nombreCompañia,
        numeroContrato: cuerpoRequest.numeroContrato,
        frecuenciaPago: cuerpoRequest.frecuenciaPago,
        costoPorPago: cuerpoRequest.costoPorPago,
        idFraccionamiento: cuerpoRequest.idFraccionamiento,
        nombreFraccionamiento: cuerpoRequest.nombreFraccionamiento,
        // logo: logo,
      },
    }
  ).then((result) => {
    res.status(200).json({
      msg: "Servicio actualizado",
    });
  });
};

const delServicio = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  const servicioEliminado = await Servicio.deleteOne(
    { _id: id },
    {
      Fraccname: 1,
      direccion: 1,
      NumeroCasas: 1,
      tipoFraccionamiento: 1,
      zonasInteres: 1,
      casasHabitadas: 1,
      //   logo, 1
    }
  );
  if (servicioEliminado) {
    res.status(200).json({
      servicio: servicioEliminado,
    });
  }
};

const router = express.Router();
//endpoints
router
  .route("/")
  .post(createServicio) // with  this endpoint we can create a Fracc
  //   .post(upload.single("logo"), createServicio) // with  this endpoint we can create a Fracc
  .get(getAll); // with  this endpoint we can get all Fracc

router
  .route("/:id")
  .patch(updateServicio) //  with  this endpoint we can update a Fracc
  .delete(delServicio) //  with  this endpoint we can delete Fracc
  .get(getServicio); //

router.route("/").get(getAll);

module.exports = router;
