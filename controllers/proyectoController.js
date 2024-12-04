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
