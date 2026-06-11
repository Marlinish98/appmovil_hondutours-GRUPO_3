const { DataTypes } = require('sequelize');
const sequilize = require('./db/conexion')

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

    latitud: {
        type: DataTypes.DECIMAL,
    },

    longitud: {
        type: DataTypes.DECIMAL,
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
        type: DataTypes.DECIMAL,
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

export default InfoLugar;