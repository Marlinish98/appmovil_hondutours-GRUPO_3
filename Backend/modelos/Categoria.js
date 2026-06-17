const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const Categoria = sequelize.define("Categoria", {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "Categoria",
    timestamps: false
});

module.exports =  Categoria;