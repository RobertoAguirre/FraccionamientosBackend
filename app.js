//INICIALIZAR MI EXPRESS BODY PARSER Y CORS
const express = require("express"); //express es un framework de nodejs que nos permite crear servidores web para aplicaciones, tambien nos permite crear API REST, rutas, middlewares y ademas nos permite renderizar vistas, entre otras cosas
const bodyParser = require("body-parser"); //body-parser es un middleware que nos permite parsear los datos que vienen del cliente
const cors = require("cors"); //cors es un middleware que nos permite habilitar las peticiones entre servidores

const jwt = require("jsonwebtoken"); //jwt es un middleware que nos permite crear tokens de autenticación. JWT = JSON Web Token (token de autenticación)- Credeciales de acceso
const bcript = require("bcryptjs"); //bcript es un middleware que nos permite encriptar contraseñas
const mongoose = require("mongoose"); //mongoose es un middleware que nos permite conectarnos a una base de datos de mongoDB
const dotenv = require("dotenv"); //dotenv es un middleware que nos permite cargar variables de entorno

dotenv.config({ path: "./config.env" }); //cargamos las variables de entorno

// Aqui van mis rutas
const userRoutes = require("./routes/userRoutes"); //importamos las rutas de usuario
const FraccRoutes = require("./routes/FraccionamientoRoutes"); //importamos las rutas de fraccionamiento
const ServicioRoutes = require("./routes/ServicioRoutes"); //importamos las rutas de servicios

const app = express(); //inicializamos express
app.use(cors()); //habilitamos cors. permite que un servidor pueda recibir peticiones de otro servidor

app.use(express.json({ limit: "50mb" })); //habilitamos el uso de json en express
app.use(express.static(`${__dirname}/uploads`)); //habilitamos el uso de archivos estáticos en express

app.set("jwtkey", "A$per6uer.47"); //clave secreta para el token de autenticación

// Hacer 3 folders: models, routes, public. En models crear un archivo user.js, en routes crear un archivo user.js y en public crear un archivo index.html, en el archivo user.js de models crear un schema de mongoose para el usuario, en el archivo user.js de routes crear las rutas para el usuario y en el archivo index.html de public crear un formulario para registrar un usuario
// va a haber tantas rutas como modelos tengamos en la base de datos

const port = 3001; //puerto en el que va a correr el servidor

// Conexión a la base de datos
const DB = process.env.DATABASE; //variable de entorno que contiene la url de la base de datos

app.use("/api/users", userRoutes); //usamos las rutas de usuario
app.use("/api/fracc", FraccRoutes); //usamos las rutas de fraccionamiento
app.use("/api/servicios", ServicioRoutes); //usamos las rutas de servicios

mongoose
  .connect(DB, {
    useNewURLParser: true,
  })
  .then((connection) => {
    // console.log(connection.Connection);
    console.log("Conexión a la base de datos exitosa");
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost/:${port}`);
});

//CREAR UN ENDPOINT
app.get("/api/hola", (req, res) => {
  res.send("¡Hola Mundo!");
});

app.get("/api/suma/:n1/:n2", (req, res) => {
  let numero1 = req.params.n1;
  let numero2 = req.params.n2;
  let suma = Number(numero1) + Number(numero2);
  res.send("La suma es: " + suma);
});

app.post("/api/resta/:n1/:n2", (req, res) => {
  let numero1 = req.params.n1;
  let numero2 = req.params.n2;
  let resta = Number(numero1) - Number(numero2);
  res.send("La resta con post es: " + resta);
});
app.post("/api/nuevousuario", (req, res) => {
  let cuerpoRequest = req.body;

  let nombre = cuerpoRequest.nombre;
  let apellido = cuerpoRequest.apellido;
  let telefono = cuerpoRequest.telefono;
  let content = cuerpoRequest.content;

  let respuesta = `Nombre: ${nombre}, Apellido: ${apellido}, Telefono: ${telefono}, Body: ${content}`;

  res.send(respuesta);
});
