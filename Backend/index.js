const express = require('express');
const sequilize = require('./db/conexion')
PORT = 5000;
const app = express();
app.use(express.json());

Categoria.hasMany(InfoLugar, {
    foreignKey: 'Categoria_idCategoria'
});

InfoLugar.belongsTo(Categoria, {
    foreignKey: 'Categoria_idCategoria'
});

Usuarios.hasMany(Favoritos, {
    foreignKey: 'Usuarios_idUsuarios'
});

Favoritos.belongsTo(Usuarios, {
    foreignKey: 'Usuarios_idUsuarios'
});

InfoLugar.hasMany(Favoritos, {
    foreignKey: 'Info_Lugar_idInfo_Lugar'
});

Favoritos.belongsTo(InfoLugar, {
    foreignKey: 'Info_Lugar_idInfo_Lugar'
});

Usuarios.hasMany(CreacionPlan, {
    foreignKey: 'Usuarios_idUsuarios'
});

CreacionPlan.belongsTo(Usuarios, {
    foreignKey: 'Usuarios_idUsuarios'
});

CreacionPlan.hasMany(PlanDetalles, {
    foreignKey: 'Creacion_Plan_idCreacion_Plan'
});

PlanDetalles.belongsTo(CreacionPlan, {
    foreignKey: 'Creacion_Plan_idCreacion_Plan'
});

InfoLugar.hasMany(PlanDetalles, {
    foreignKey: 'Info_Lugar_idInfo_Lugar'
});

PlanDetalles.belongsTo(InfoLugar, {
    foreignKey: 'Info_Lugar_idInfo_Lugar'
});

// enpoints 

app.get('/lugares', async (req, res) => {

    try {

        const lugares = await InfoLugar.findAll();

        if(lugares.length > 0){

            return res.status(200).json({
                message: 'Lugares obtenidos correctamente',
                data: lugares,
            });

        }
        else{

            res.status(400).json({
                message: 'No se encontraron lugares',
            });

        }

    } catch (error) {

        res.status(500).json({
            message: 'Error al obtener los lugares',
            error: error.message,
        });

    }

});

app.post('/lugares', async (req, res) => {

    try {

        const lugar = await InfoLugar.create(req.body);

        if(lugar){

            return res.status(200).json({
                message: 'Lugar creado correctamente',
                data: lugar,
            });

        }
        else{

            res.status(400).json({
                message: 'Error al crear el lugar',
                error: 'No se pudo crear el lugar',
            });

        }

    } catch (error) {

        res.status(500).json({
            message: 'Error al crear el lugar',
            error: error.message,
        });

    }

});

app.put('/lugares/:id', async (req, res) => {

    try {

        const lugar = await InfoLugar.update(req.body, {
            where: {
                idInfo_Lugar: req.params.id,
            },
        });

        if(lugar){

            return res.status(200).json({
                message: 'Lugar actualizado correctamente',
                data: lugar,
            });

        }
        else{

            res.status(400).json({
                message: 'Error al actualizar el lugar',
                error: 'No se pudo actualizar el lugar',
            });

        }

    } catch (error) {

        res.status(500).json({
            message: 'Error al actualizar el lugar',
            error: error.message,
        });

    }

});

app.delete('/lugares/:id', async (req, res) => {

    try {

        const lugar = await InfoLugar.destroy({
            where: {
                idInfo_Lugar: req.params.id,
            },
        });

        if(lugar){

            return res.status(200).json({
                message: 'Lugar eliminado correctamente',
                data: lugar,
            });

        }
        else{

            res.status(400).json({
                message: 'Error al eliminar el lugar',
                error: 'No se pudo eliminar el lugar',
            });

        }

    } catch (error) {

        res.status(500).json({
            message: 'Error al eliminar el lugar',
            error: error.message,
        });

    }

});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 

