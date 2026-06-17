const express = require('express');
const app = express();
app.use(express.json());

//declarar rutas
const routerFavoritos = require('./routes/routerFavoritos')
const routerLugares = require('./routes/routerLugares')
const routerUsuario = require('./routes/routerUsuario')
const routerPlan=require('./routes/routerPlan')

require('./modelos/FKey')

PORT = 8080;

//uso Rutas
app.use('/',routerLugares);
app.use('/',routerUsuario);
app.use('/',routerFavoritos);
app.use('/',routerPlan)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 

