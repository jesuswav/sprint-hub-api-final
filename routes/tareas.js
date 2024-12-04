const express = require('express')
const router = express.Router()
const { registrarTarea } = require('../controllers/tareaController')

// Registrar una nueva tarea en un proyecto
// Método: POST
// URL: /api/tareas/registrar
// Body: { "nombre": "Desarrollar API", "fechaInicio": "2024-12-10", "fechaEntrega": "2024-12-20", "estado": "pendiente", "idProyecto": "1234567890", "responsableId": "9876543210" }
router.post('/registrar', registrarTarea)

module.exports = router
