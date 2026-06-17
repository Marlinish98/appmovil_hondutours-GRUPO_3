const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const InfoLugar = sequelize.define("Info_Lugar", {
    idInfo_Lugar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_Lugar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    // Añadida la precisión decimal exacta de tu base de datos
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
    },
    longitud: {
        type: DataTypes.DECIMAL(10, 8),
    },
    direccion_Lugar: {
        type: DataTypes.STRING,
    },
    departamento_HN: {
        type: DataTypes.STRING,
    },
    imagen_Lugar: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
    },
    personas_disponibilidad: {
        type: DataTypes.INTEGER
    },
    Categoria_idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Info_Lugar",
    timestamps: false
});

module.exports = InfoLugar;