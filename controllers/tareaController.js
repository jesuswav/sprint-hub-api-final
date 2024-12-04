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

// actualizar las fechas de una tarea
exports.actualizarFechasTarea = async (req, res) => {
  const { id } = req.params // ID de la tarea
  const { fechaInicio, fechaEntrega } = req.body // Fechas proporcionadas en el cuerpo de la solicitud

  // Validar que las fechas sean válidas
  if (!fechaInicio || !fechaEntrega) {
    return res.status(400).json({
      message: 'Debe proporcionar las fechas de inicio y entrega',
    })
  }

  try {
    // Buscar y actualizar la tarea por su ID
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { fechaInicio, fechaEntrega },
      { new: true } // Devuelve el documento actualizado
    )

    // Si no se encuentra la tarea
    if (!tareaActualizada) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    // Responder con la tarea actualizada
    res.status(200).json({
      message: 'Fechas actualizadas correctamente',
      tarea: tareaActualizada,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al actualizar las fechas de la tarea',
    })
  }
}

// eliminar una tarea de la base de datos
exports.eliminarTarea = async (req, res) => {
  const { id } = req.params // ID de la tarea desde la URL

  try {
    // Buscar y eliminar la tarea por su ID
    const tareaEliminada = await Tarea.findByIdAndDelete(id)

    // Si no se encuentra la tarea, devolver un error 404
    if (!tareaEliminada) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    // Responder con un mensaje de éxito
    res.status(200).json({
      message: 'Tarea eliminada correctamente',
      tarea: tareaEliminada,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al eliminar la tarea',
    })
  }
}
