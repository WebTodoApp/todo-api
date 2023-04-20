export const swagger = {
    options : {
        swagger: {       
            info: {
                title: 'Todo api swagger',
                description: 'Testing todo swagger API',
                version: '1.0.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                {
                    name: "Auth",
                    description: "Auth api call(s)"
                },
                {
                    name: "User",
                    description: "User api call(s)"
                },
                {
                    name: "Todo",
                    description: "Todo api call(s)"
                },
                {
                    name: "Group",
                    description: "Group api call(s)"
                }
            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['id', 'email', 'username', 'password'],
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string', format: 'email'},
                        username: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
                Group: {
                    type: 'object',
                    required: ['id', 'name', 'userId'],
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        userId: { type: 'number' },
                    }
                },
                Todo: {
                    type: 'object',
                    required: ['id', 'name', 'content', 'statusId', 'groupId'],
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        content: { type: 'string' },
                        statusId: { type: 'number' },
                        groupId: { type: 'number' }
                    }
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    }
                }
            }
        }
    },
    optionsUi: {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: false
    }
}
