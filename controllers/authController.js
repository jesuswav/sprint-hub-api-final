const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body
  const usuarioExistente = await Usuario.findOne({ email })
  if (usuarioExistente) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }

  const usuario = new Usuario({ nombre, email, password })
  await usuario.save()
  res.status(201).json({ message: 'Usuario registrado con éxito' })
}

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { email, password } = req.body
  const usuario = await Usuario.findOne({ email })
  if (!usuario) {
    return res.status(400).json({ message: 'Usuario no encontrado' })
  }

  const contrasenaValida = await usuario.matchPassword(password)
  if (!contrasenaValida) {
    return res.status(400).json({ message: 'Contraseña incorrecta' })
  }

  const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' })
  res.json({ token })
}
