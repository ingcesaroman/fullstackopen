const app = require('./app') // The Express app
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

app.use((error, request, response, next) => {
  console.error('Error:', error.message);
  response.status(500).send({ error: 'Something went wrong' });
});