const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const Usuarios = sequelize.define("Usuarios", {
    idUsuarios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_Usuario: {
        type: DataTypes.STRING,
    },

    contrasenia: {
        type: DataTypes.STRING,
    },

    correo: {
        type: DataTypes.STRING,
        unique: true
    },

    registro_Fech: {
        type: DataTypes.DATE
    },

    rol: {
        type: DataTypes.ENUM("ADMIN", "CLIENTE"),
        defaultValue: "CLIENTE"
    }

}, {
    tableName: "Usuarios",
    timestamps: false
});

module.exports = Usuarios;