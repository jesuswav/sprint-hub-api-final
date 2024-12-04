const mongoose = require('mongoose');

const miembroSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  rol: { type: String, enum: ['responsable', 'colaborador'] },
});

const Miembro = mongoose.model('Miembro', miembroSchema);

module.exports = Miembro;
