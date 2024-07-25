const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema({
  nombreServicio: {
    type: String,
    required: [true, "El nombre del servicio es obligatorio"],
  },
  nombreCompania: {
    type: String,
    required: [true, "El nombre de la compañia es obligatorio"],
  },
  numeroContrato: {
    type: String,
    required: [true, "El número de contrato es obligatorio"],
  },
  frecuenciaPago: {
    type: String,
    required: [true, "La frecuencia de pago es obligatoria"],
  },
  costoPorPago: {
    type: Number,
    required: [true, "El costo del servicio es obligatorio"],
  },
  idFraccionamiento: {
    type: String,
    required: [true, "El ID del fraccionamiento es obligatorio"],
  },
  nombreFraccionamiento: {
    type: String,
    required: [true, "El nombre del fraccionamiento es obligatorio"],
  },
  logo: {
    type: String,
    required: [false, "Favor de subier el Logo del fraccionamiento"],
  },
});
module.exports = mongoose.model("Servicio", ServicioSchema); //exportar el modelo de fracc
