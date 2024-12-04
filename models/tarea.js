const mongoose = require('mongoose')

const tareaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Miembro' },
  fechaInicio: Date,
  fechaEntrega: Date,
  estado: { type: String, enum: ['pendiente', 'en proceso', 'terminada'] },
})

const Tarea = mongoose.model('Tarea', tareaSchema)

module.exports = Tarea
