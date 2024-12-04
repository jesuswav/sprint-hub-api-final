const express = require('express');
const router = express.Router();
const { agregarMiembro, obtenerMiembros, asignarResponsableATarea } = require('../controllers/miembroController');

// Agregar un nuevo miembro a un proyecto
// Método: POST
// URL: /api/miembros/agregar
// Body: { "nombre": "Carlos García", "email": "carlos@example.com", "rol": "colaborador", "idProyecto": "1234567890" }
router.post('/agregar', agregarMiembro);

// Obtener todos los miembros de un proyecto
// Método: GET
// URL: /api/miembros/:idProyecto
router.get('/:idProyecto', obtenerMiembros);

// Asignar un miembro como responsable a una tarea
// Método: PUT
// URL: /api/miembros/asignarResponsable
// Body: { "idTarea": "123", "idMiembro": "456" }
router.put('/asignarResponsable', asignarResponsableATarea);

module.exports = router;
