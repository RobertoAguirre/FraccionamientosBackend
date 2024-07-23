const mongoose = require("mongoose");


const HouseSchema = new mongoose.Schema(
    {
        idFracc:{
            type:String,
            required:[true, "El id del fraccionamiento es obligatorio"]
        },

        houseNumber:{
            type:Number,
            required:[true, "Número de la casa es obligatiorio" ]
        },

        houseAdress:{

            type:String,
            required:[true, "Direccion es obligatoria"]
        },

        familyName:{
            type:String,
            required:[true, "Nombre de la familia es obligatorio"]
        },

        houseOwner:{
            type:String,
            required:[true, "Nombre del dueño de la casa es obligatorio"]
        },

        familyMembers:{
            type:String,
            required:[true, "Miembros de familia es obligatorio"]
        },

        paymentStatus:{
            type:Boolean,
            required:[true, "El estatus de pago es obligatorio"]
        },
        logo: {
            type: String,
            required: [false, "Favor de subier el Logo del fraccionamiento"],
        }
    }
);


module.exports = mongoose.model("House",HouseSchema);

