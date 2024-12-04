const express = require('express')
const router = express.Router()
const {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
} = require('../controllers/proyectoController')

// Crear un nuevo proyecto
router.post('/', crearProyecto) // URL: /api/proyectos/

// Obtener todos los proyectos
router.get('/', obtenerProyectos) // URL: /api/proyectos/

router.get('/:id', obtenerProyectoPorId)

module.exports = router
