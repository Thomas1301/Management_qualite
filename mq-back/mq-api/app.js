'use strict'

require('dotenv').config();
const path = require('path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require('@fastify/swagger'), {})
  fastify.register(require('@fastify/swagger-ui'), {
      routePrefix: 'api/v1/docs',
      swagger: {
          info: {
              title: 'MQ Documentation',
              description: 'Documentation for MQ API',
              version: '0.1.0',
              termsOfService: 'https://mywebsite.io/tos',
              contact: {
                  name: 'Guilhem CALONNE',
                  url: 'https://www.guilhemcalonne.com',
                  email: 'guilhem.calonne@email.com'
              }
          },
          externalDocs: {
              url: 'https://www.guilhemcalonne.com/api/',
              description: 'Find more info here'
          },
          host: process.env.SWAGGER_HOST,
          schemes: ['http', 'https'],
          consumes: ['application/json'],
          produces: ['application/json'],
      },
      uiConfig: {
          docExpansion: 'none', // expand/not all the documentations none|list|full
          deepLinking: true
      },
      uiHooks: {
          onRequest: function(request, reply, next) {
              next()
          },
          preHandler: function(request, reply, next) {
              next()
          }
      },
      staticCSP: false,
      transformStaticCSP: (header) => header,
      exposeRoute: true
  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.register(require('@fastify/cors'), {
    // put your options here
    origin: '*',
  })

  // Executes Swagger
  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
}
