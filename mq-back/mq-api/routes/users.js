'use strict'
const { getUsers } = require('../controllers/users')

module.exports = async function(fastify, opts) {
    fastify.route({
        url: '/api/v1/users',
        method: ['GET'],
        // request and response schema
        schema: {
            summary: 'Get array of users and associated data',
            description: 'Returns a list of users',
            tags: ['Users'],
            params: {},
            response: {
                200: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        address: { type: 'string' },
                        birthDate: { type: 'string' },
                        zipCode: { type: 'string' },
                        city: { type: 'string' },
                      },
                    },
                },
            }
        },
        // the function that will handle this request
        handler: async (request, reply) => {
            const users = await getUsers()
            reply.send(users)
        }
    })
}