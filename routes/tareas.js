const express = require('express')
const router = express.Router()
const {
  registrarTarea,
  actualizarFechasTarea,
  eliminarTarea,
} = require('../controllers/tareaController')

// Registrar una nueva tarea en un proyecto
// Método: POST
// URL: /api/tareas/registrar
// Body: { "nombre": "Desarrollar API", "fechaInicio": "2024-12-10", "fechaEntrega": "2024-12-20", "estado": "pendiente", "idProyecto": "1234567890", "responsableId": "9876543210" }
router.post('/registrar', registrarTarea)

// Actualizar fechas de una tarea
// Método: PUT
// URL: /api/tareas/:id
// Ejemplo: /api/tareas/63c1fdd0e4f7a9b76ad4c125
router.put('/:id', actualizarFechasTarea)

// Eliminar una tarea específica
// Método: DELETE
// URL: /api/tareas/:id
// Ejemplo: /api/tareas/63c1fdd0e4f7a9b76ad4c125
router.delete('/:id', eliminarTarea)

module.exports = router
