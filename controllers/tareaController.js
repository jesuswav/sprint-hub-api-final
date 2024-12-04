const Proyecto = require('../models/proyecto')
const Tarea = require('../models/tarea')
const Miembro = require('../models/miembro')

// Registrar una nueva tarea en un proyecto
exports.registrarTarea = async (req, res) => {
  const {
    nombre,
    fechaInicio,
    fechaEntrega,
    estado,
    idProyecto,
    responsableId,
  } = req.body

  // Verificar si el proyecto existe
  const proyecto = await Proyecto.findById(idProyecto)
  if (!proyecto) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }

  // Verificar si el responsable existe
  const responsable = await Miembro.findById(responsableId)
  if (!responsable) {
    return res.status(404).json({ message: 'Responsable no encontrado' })
  }

  // Crear la nueva tarea
  const tarea = new Tarea({
    nombre,
    fechaInicio,
    fechaEntrega,
    estado,
    responsable: responsableId,
    idProyecto,
  })

  // Guardar la tarea
  await tarea.save()

  // Asociar la tarea al proyecto
  proyecto.tareas.push(tarea._id)
  await proyecto.save()

  res.status(201).json({ message: 'Tarea registrada con éxito', tarea })
}
