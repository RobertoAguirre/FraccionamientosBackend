const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema({
  nombreServicio: {
    type: String,
    // required: [true, "El nombre del servicio es obligatorio"],
  },
  nombreCompania: {
    type: String,
    // required: [true, "El número de contrato es obligatorio"],
  },
  numeroContrato: {
    type: String,
    // required: [true, "El número de contrato es obligatorio"],
  },
  frecuenciaPago: {
    type: String,
    // required: [true, "La frecuencia de pago es obligatoria"],
  },
  costoPorPago: {
    type: Number,
    // required: [true, "El costo del servicio es obligatorio"],
  },
  idFraccionamiento: {
    type: String,
    // required: [true, "El ID del fraccionamiento es obligatorio"],
  },
  nombreFraccionamiento: {
    type: String,
    // required: [true, "El nombre del fraccionamiento es obligatorio"],
  },
  // servicios: {
  //   luz: {
  //     type: Boolean,
  //     required: [true, "Es obligatorio especificar si hay servicio de luz"],
  //   },
  //   agua: {
  //     type: Boolean,
  //     required: [true, "Es obligatorio especificar si hay servicio de agua"],
  //   },
  //   gas: {
  //     type: Boolean,
  //     required: [true, "Es obligatorio especificar si hay servicio de gas"],
  //   },
  //   telefono: {
  //     type: Boolean,
  //     required: [
  //       true,
  //       "Es obligatorio especificar si hay servicio de teléfono",
  //     ],
  //   },
  //   internet: {
  //     type: Boolean,
  //     required: [
  //       true,
  //       "Es obligatorio especificar si hay servicio de internet",
  //     ],
  //   },
  //   alcantarillado: {
  //     type: Boolean,
  //     required: [
  //       true,
  //       "Es obligatorio especificar si hay servicio de alcantarillado",
  //     ],
  //   },
  //   recoleccionBasura: {
  //     type: Boolean,
  //     required: [
  //       true,
  //       "Es obligatorio especificar si hay servicio de recolección de basura",
  //     ],
  //   },
  //   vigilancia: {
  //     type: Boolean,
  //     required: [
  //       true,
  //       "Es obligatorio especificar si hay servicio de vigilancia",
  //     ],
  //   },
  // },
});
module.exports = mongoose.model("Servicio", ServicioSchema); //exportar el modelo de fracc
