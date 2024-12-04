const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  miembros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Miembro' }],
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' }],
  fechaRegistro: { type: Date, default: Date.now },
});

const Proyecto = mongoose.model('Proyecto', proyectoSchema);

module.exports = Proyecto;
