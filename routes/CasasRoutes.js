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
    const _house = await house.exists({ houseNumber: cuerpoRequest.houseNumber });

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
                HouseID: createdHouse._id,
                });
            } else {
                res.status(500).json({
                msg: "Error al crear Casa",
                });
            }
            });
            }
        };

        const getAll = async (req, res) => {
            const houses = await house.find({}); //esto me trae todos los fracc
            res.status(200).json({
            houses: houses,
            });
            };
            
            const getHouse = async (req, res) => {
            console.log(req.params);
            const id = req.params.id;
                
            const houseFound = await house.find(
                { _id: id },
                {
                idFracc:1,
                houseNumber: 1,
                houseAdress: 1,
                familyName: 1,
                houseOwner: 1,
                familyMembers: 1,
                paymentStatus: 1,

                }
            );
            if (houseFound) {
                res.status(200).json({
                house: houseFound,
                });
            }
            };
            const getFraccHouses = async (req, res) => {
                console.log(req.params);
                const idfracc = req.params.idFracc;
                    
                const FraccHousesFound = await houseFracc.find(
                    { idFracc: idfracc },
                    {
                    idfracc:1,
                    houseNumber: 1,
                    houseAdress: 1,
                    familyName: 1,
                    houseOwner: 1,
                    familyMembers: 1,
                    paymentStatus: 1,
    
                    }
                );
                if (FraccHousesFound) {
                    res.status(200).json({
                    house: FraccHousesFound,
                    });
                }
                };
            
            const updateHouse = async (req, res) => {
            let cuerpoRequest = req.body;
                
            return house.updateOne(
                { _id: req.params.id },
                {
                $set: {
                    idFracc:cuerpoRequest.idFracc,
                    houseNumber: cuerpoRequest.houseNumber,
                    houseAdress: cuerpoRequest.houseAdress,
                    familyName: cuerpoRequest.familyName,
                    houseOwner: cuerpoRequest.houseOwner,
                    familyMembers: cuerpoRequest.familyMembers,
                    paymentStatus: cuerpoRequest.paymentStatus,
                    //logo: logo,
                },
                }
            ).then((result) => {
                res.status(200).json({
                msg: "Casa actualizada",
                });
            });
            };
            
            const delHouse = async (req, res) => {
            console.log(req.params);
            const id = req.params.id;
                
            const deleteHouse = await house.deleteOne(
                { _id: id },
                {
                idFracc:1,
                houseNumber: 1,
                houseAdress: 1,
                familyName: 1,
                houseOwner: 1,
                familyMembers: 1,
                paymentStatus: 1,
                }
            );
            if (deleteHouse) {
                res.status(200).json({
                house: deleteHouse,
                });
            }
            };
            
            const router = express.Router();
            //endpoints
            router
            .route("/")
            // .post(createFracc) // with  this endpoint we can create a Fracc
            .post(upload.single("logo"), createHouse) // with  this endpoint we can create a Fracc
            .get(getAll); // with  this endpoint we can get all Fracc
            
            router
            .route("/:id")
            .patch(updateHouse) //  with  this endpoint we can update a Fracc
            .delete(delHouse) //  with  this endpoint we can delete Fracc
            .get(getHouse) //
            
            router.route("/").get(getAll);
            router.route("/:idFracc").get(getFraccHouses);
            module.exports = router;
                