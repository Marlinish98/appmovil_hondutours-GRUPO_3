const express = require('express');
const router = express.Router();
const Favoritos = require('../modelos/Favoritos');
const InfoLugar = require('../modelos/InfoLugar')

router.get('/favoritos/:idUsuario', async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario || isNaN(idUsuario)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const listaFavoritos = await Favoritos.findAll({
      where: { Usuarios_idUsuarios: idUsuario },
      include: [{ model: InfoLugar }]
    });

    return res.status(200).json({ data: listaFavoritos });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener favoritos',
      error: error.message,
    });
  }
});

router.post('/favorito', async (req, res) => {
  try {
    if (!req.body.Info_Lugar_idInfo_Lugar || !req.body.Usuarios_idUsuarios) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const nuevoFavorito = await Favoritos.create(req.body);

    // CORRECCIÓN: Usamos 'InfoLugar' (sin guion), 
    // que es el nombre que definiste en el 'require' de arriba.
    const favoritoConDetalle = await Favoritos.findByPk(nuevoFavorito.idFavoritos, {
      include: [{ model: InfoLugar }] 
    });

    return res.status(201).json({
      message: 'Favorito agregado',
      data: favoritoConDetalle,
    });
  } catch (error) {
    console.error("Error detallado:", error);
    return res.status(500).json({
      message: 'Error al crear favorito',
      error: error.message,
    });
  }
});

router.delete('/favorito/:id', async (req, res) => {
  try {
    const favorito = await Favoritos.findByPk(req.params.id);

    if (!favorito) {
      return res.status(404).json({ message: 'Favorito no encontrado' });
    }

    await favorito.destroy();
    return res.status(200).json({ message: 'Favorito eliminado' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar favorito',
      error: error.message,
    });
  }
});

module.exports = router;