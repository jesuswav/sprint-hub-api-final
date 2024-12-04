const express = require('express')
const router = express.Router()
const {
  registrarUsuario,
  iniciarSesion,
} = require('../controllers/authController')

// Registrar un nuevo usuario
router.post('/register', registrarUsuario) // URL: /api/auth/register

// Iniciar sesión
router.post('/login', iniciarSesion) // URL: /api/auth/login

module.exports = router
