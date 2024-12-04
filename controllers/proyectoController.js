const Proyecto = require('../models/proyecto')
const Miembro = require('../models/miembro')

// Crear un nuevo proyecto
exports.crearProyecto = async (req, res) => {
  const { nombre, descripcion } = req.body
  const proyecto = new Proyecto({ nombre, descripcion })
  await proyecto.save()
  res.status(201).json(proyecto)
}

// Obtener todos los proyectos
exports.obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find()
    .populate('miembros', 'nombre email rol')
    .populate({
      path: 'tareas',
      populate: { path: 'responsable', select: 'nombre email' },
    })
  res.json(proyectos)
}

exports.obtenerProyectoPorId = async (req, res) => {
  const { id } = req.params // Extraemos el ID del proyecto desde la URL

  try {
    // Buscar el proyecto por ID y poblar tareas y miembros
    const proyecto = await Proyecto.findById(id)
      .populate('tareas') // Poblar tareas relacionadas
      .populate('miembros', 'nombre email rol') // Poblar miembros con solo campos relevantes
      .exec()

    // Si el proyecto no existe, devolver un error 404
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' })
    }

    // Devolver el proyecto encontrado
    res.status(200).json(proyecto)
  } catch (error) {
    console.error(error)

    // Manejo de errores, como un ID malformado
    res.status(500).json({ message: 'Error al obtener el proyecto' })
  }
}
