const express = require('express')
const router = express.Router()
const {
  crearProyecto,
  obtenerProyectos,
} = require('../controllers/proyectoController')

// Crear un nuevo proyecto
router.post('/', crearProyecto) // URL: /api/proyectos/

// Obtener todos los proyectos
router.get('/', obtenerProyectos) // URL: /api/proyectos/

module.exports = router
