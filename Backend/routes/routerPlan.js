const express = require('express');
const router = express.Router();
const CreacionPlan = require('../modelos/CreacionPlan')
const PlanDetalles = require('../modelos/PlanDetalles')
const InfoLugar = require('../modelos/InfoLugar')

router.get('/plan', async (req, res) => {
    try {
        const planes = await CreacionPlan.findAll({
            include: [{
                model: PlanDetalles,
                as: 'PlanLugares',
                include: [{ model: InfoLugar }]
            }]
        });
        res.json({ ok: true, planes });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

router.post('/plan', async (req, res) => {
    try {
        const nuevoPlan = await CreacionPlan.create(req.body, {
            include: [{
                model: PlanDetalles,
                as: 'PlanLugares'
            }]
        });
        res.status(201).json({
            ok: true,
            plan: nuevoPlan
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
});

router.put('/plan/:id', async (req, res) => {
    try {
        const { id } = req.params; // Este es el idPlan_Detalles
        const { 
            idCreacion_Plan, 
            nombre_plan, 
            dias_plan, 
            capacidad_personas, 
            Info_Lugar_idInfo_Lugar, 
            fecha_visita 
        } = req.body;

        // 1. Actualizar la tabla principal (CreacionPlan)
        if (idCreacion_Plan) {
            await CreacionPlan.update(
                { nombre_plan, dias_plan, capacidad_personas },
                { where: { idCreacion_Plan: idCreacion_Plan } }
            );
        }

        // 2. Actualizar los detalles del lugar y fecha (PlanDetalles)
        // Quitamos la condición de numFilasAfectadas === 0 para evitar errores 
        // si el usuario no modifica ni la fecha ni el lugar.
        if (Info_Lugar_idInfo_Lugar && fecha_visita) {
            await PlanDetalles.update(
                { Info_Lugar_idInfo_Lugar, fecha_visita },
                { where: { idPlan_Detalles: id } }
            );
        }

        res.json({ 
            ok: true, 
            msg: 'Plan y detalles actualizados correctamente' 
        });

    } catch (error) {
        console.error('❌ Error en el servidor al actualizar:', error);
        res.status(500).json({ 
            ok: false, 
            msg: 'Error interno del servidor',
            error: error.message 
        });
    }
});

router.delete('/plan/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await PlanDetalles.destroy({
            where: { idPlan_Detalles: id }
        });

        res.json({ ok: true, msg: 'Plan eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el plan:', error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar el plan' });
    }
});

module.exports = router;