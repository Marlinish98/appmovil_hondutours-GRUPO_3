const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'honduTours_db',
    'root',
    'admin123',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',

    }
);

sequelize.authenticate()
    .then(()=> console.log('Conexión exitosa'))
    .catch(err => {
        console.error('Error de conexión:', err);
});

module.exports = sequelize;