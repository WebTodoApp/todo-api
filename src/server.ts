// Initialize & Configure Server
import { FastifyReply, FastifyRequest } from "fastify"
import Fastify  from "fastify";

// // Import index
// const index = fs.createReadStream(path('./public/index.html'))

// // Import Routes
import authRoutes from './routes/authRoutes' ;
import userRoutes from './routes/userRoutes' ;
import groupRoutes from './routes/groupRoutes' ;
import todoRoutes from './routes/todoRoutes' ;


const server = Fastify({
  logger: true
});
server.addContentTypeParser('application/json', { parseAs: 'string' }, server.getDefaultJsonParser('ignore', 'ignore'));

// // Require modules
import { prisma } from "./utils/prisma";
import { swagger } from "./utils/swagger";
import { PrismaClient } from "@prisma/client";
const path = require('node:path');
require('dotenv').config()


// // Register module for server
server.register(require('@fastify/formbody'))
server.register(require('@fastify/cors'), {
  origin: ['http://localhost:5174', 'http://127.0.0.1:8101'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
})
server.register(require('@fastify/helmet'), {
  contentSecurityPolicy: false 
});
server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
});
server.register(require('@fastify/swagger'), swagger.options)
server.register(require('@fastify/swagger-ui'), swagger.optionsUi)

// // Configure Routes
server.get('/', ((req: FastifyRequest, res: FastifyReply) => {
  res.raw.setHeader("Content-Type", "text/html");
  res.send("index.html");
}));
server.register(authRoutes, { prefix: "/api/auth"});
server.register(userRoutes, { prefix: "/api/user"});
server.register(groupRoutes, { prefix: "/api/group"});
server.register(todoRoutes, { prefix: "/api/todo"});

// // Initialize and connect to bdd
const databaseStart = async () => {
  // const NODE_ENV = process.env.NODE_ENV;  
  // if (NODE_ENV === 'production') {
  //   prisma = prismaProd;
  // } else if (NODE_ENV === 'development') {
  //   prisma = prismaDev;
  // }
  await prisma.$connect().then(() =>{
    console.log(`Database connected`);
  }).catch(err => {
    console.log(`Database connection failed : ${err}`);
  })
}

// Listening 
const serverStart = async () => {
  server.listen({ port: Number(process.env.PORT) }, function (err) {    
    if (err) {
      server.log.error(err);
      process.exit(1)
    } 
    const address = server.server.address()
    console.log(`Server listening on ${address}`)
  })
}

databaseStart();
serverStart();


export const app = server;
export const database = prisma;
