const mongoose = require("mongoose"); //mongoose es un modulo que nos permite conectarnos a la base de datos de mongoDB

const userSchema = mongoose.Schema({
  //creamos un esquema para la base de datos
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
  },
  password: {
    type: String,
    requires: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: String,
    required: ["user", "El rol es obligatorio"],
  },
}); //schema es una clase que nos permite crear esquemas para la base de datos

module.exports = mongoose.model("User", userSchema); //exportamos el modelo de usuario para poder utilizarlo en otros archivos
