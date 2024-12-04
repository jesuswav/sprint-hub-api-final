const Proyecto = require('../models/proyecto')
const Miembro = require('../models/miembro')
const Tarea = require('../models/tarea')

// Agregar un miembro a un proyecto
exports.agregarMiembro = async (req, res) => {
  const { nombre, email, rol, idProyecto } = req.body

  // Verificar si el miembro ya existe
  const miembroExistente = await Miembro.findOne({ email })
  if (miembroExistente) {
    return res.status(400).json({ message: 'El miembro ya existe' })
  }

  // Verificar si el proyecto existe
  const proyecto = await Proyecto.findById(idProyecto)
  if (!proyecto) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }

  // Crear nuevo miembro
  const miembro = new Miembro({ nombre, email, rol })

  // Guardar el miembro
  await miembro.save()

  // Asociar el miembro con el proyecto
  proyecto.miembros.push(miembro._id)
  await proyecto.save()

  res
    .status(201)
    .json({ message: 'Miembro agregado con éxito al proyecto', miembro })
}

// Obtener todos los miembros de un proyecto
exports.obtenerMiembros = async (req, res) => {
  const idProyecto = req.params.idProyecto

  // Buscar proyecto
  const proyecto = await Proyecto.findById(idProyecto).populate('miembros')
  if (!proyecto) {
    return res.status(404).json({ message: 'Proyecto no encontrado' })
  }

  res.json(proyecto.miembros)
}

// Asignar un miembro como responsable a una tarea
exports.asignarResponsableATarea = async (req, res) => {
  const { idTarea, idMiembro } = req.body

  // Verificar si la tarea y el miembro existen
  const tarea = await Tarea.findById(idTarea)
  const miembro = await Miembro.findById(idMiembro)

  if (!tarea) {
    return res.status(404).json({ message: 'Tarea no encontrada' })
  }

  if (!miembro) {
    return res.status(404).json({ message: 'Miembro no encontrado' })
  }

  // Asignar responsable a la tarea
  tarea.responsable = miembro._id
  await tarea.save()

  res.json({ message: 'Responsable asignado correctamente', tarea })
}
