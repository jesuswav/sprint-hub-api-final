const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const proyectoRoutes = require('./routes/proyectos')
const miembroRoutes = require('./routes/miembros')
const authRoutes = require('./routes/auth')
const tareasRoutes = require('./routes/tareas')

// Configurar el servidor Express
const app = express()

// Middleware
app.use(bodyParser.json())

// Rutas
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/miembros', miembroRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/tareas', tareasRoutes)
app.use(cors())

// Conexión a MongoDB
mongoose
  .connect(
    'mongodb+srv://testUser:root123@cluster0.5eijc.mongodb.net/project-hub?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch((err) => console.log('Error al conectar a MongoDB:', err))

// Iniciar el servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, '192.168.0.112', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
