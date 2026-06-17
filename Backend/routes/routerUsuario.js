const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/Usuarios');

router.post('/registro', async (req, res) => {
  try {
    const existe = await Usuario.findOne({
      where: { correo: req.body.correo },
    });

    if (existe) {
      return res.status(400).json({
        message: 'El correo ya está registrado',
      });
    }

    const usuario = await Usuario.create({
      nombre_Usuario: req.body.nombre_Usuario,
      correo: req.body.correo,
      contrasenia: req.body.contrasenia,
      registro_Fech: new Date(),
      rol: 'CLIENTE',
    });

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar usuario',
      error: error.message,
    });
  }
});


router.post('/login', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        message: 'Correo o contraseña incorrectos',
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al iniciar sesión',
      error: error.message,
    });
  }
});

module.exports = router;