const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const CreacionPlan = sequelize.define("Creacion_Plan", {
    idCreacion_Plan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_plan: {
        type: DataTypes.STRING
    },
    fecha_plan: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    dias_plan: {
        type: DataTypes.INTEGER
    },
    capacidad_personas: {
        type: DataTypes.INTEGER
    },
    Usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "Creacion_Plan",
    timestamps: false
});

module.exports = CreacionPlan;