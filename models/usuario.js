const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
});

// Encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para verificar la contraseña
usuarioSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
