const { DataTypes } = require('sequelize');
const sequilize = require('./db/conexion')

const PlanDetalles = sequelize.define("Plan_Detalles", {

    idPlan_Detalles: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Creacion_Plan_idCreacion_Plan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Info_Lugar_idInfo_Lugar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fecha_visita: {
        type: DataTypes.DATE
    }

}, {
    tableName: "Plan_Detalles",
    timestamps: false
});

export default PlanDetalles;