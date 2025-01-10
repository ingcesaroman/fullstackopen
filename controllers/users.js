const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

} catch (error) {
  // Manejar error de clave duplicada
  if (error.code === 11000) {
    return response.status(400).json({ error: 'username must be unique' });
  }}
});

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })
  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id)
    if (user) {
      response.status(204).end() // Usuario eliminado exitosamente
    } else {
      response.status(404).json({ error: 'User not found' }) // Usuario no encontrado
    }
  } catch (error) {
    response.status(400).json({ error: 'Malformed ID' }) // ID inválido o error del servidor
  }
})

module.exports = usersRouter