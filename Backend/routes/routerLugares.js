const express = require('express');
const router = express.Router();
const InfoLugar = require('../modelos/InfoLugar');
const Categoria = require('../modelos/Categoria');

router.get('/lugares', async (req, res) => {
  try {
    const lugares = await InfoLugar.findAll({
      include: [{ model: Categoria, as: 'categoria' }]
    });
    return res.status(200).json({
      message: 'Lugares obtenidos correctamente',
      data: lugares,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los lugares',
      error: error.message,
    });
  }
});

router.get('/lugares/:id', async (req, res) => {
  try {
    const lugar = await InfoLugar.findByPk(req.params.id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });
    if (!lugar) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }
    return res.status(200).json({ data: lugar });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el lugar',
      error: error.message,
    });
  }
});

router.post('/lugares', async (req, res) => {
  try {
    const lugar = await InfoLugar.create(req.body);
    return res.status(201).json({
      message: 'Lugar creado correctamente',
      data: lugar,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear el lugar',
      error: error.message,
    });
  }
});

router.put('/lugares/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rowsUpdated] = await InfoLugar.update(req.body, {
      where: { idInfo_Lugar: id },
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: 'Lugar no encontrado o sin cambios' });
    }
    const lugarActualizado = await InfoLugar.findByPk(id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });
    return res.status(200).json({
      message: 'Lugar actualizado exitosamente',
      data: lugarActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar',
      error: error.message,
    });
  }
});

router.delete('/lugares/:id', async (req, res) => {
  try {
    const deleted = await InfoLugar.destroy({
      where: { idInfo_Lugar: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    return res.status(200).json({ message: 'Lugar eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar',
      error: error.message,
    });
  }
});

module.exports = router;