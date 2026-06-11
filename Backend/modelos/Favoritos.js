const { DataTypes } = require('sequelize');
const sequilize = require('./db/conexion')

const Favoritos = sequelize.define("Favoritos", {

    idFavoritos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Info_Lugar_idInfo_Lugar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Usuarios_idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: "Favoritos",
    timestamps: false
});

export default Favoritos;