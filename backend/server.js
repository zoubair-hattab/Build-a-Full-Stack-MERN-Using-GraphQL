import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mergedTypeDefs from './typeDefs/index.js';
import mergedResolvers from './resolvers/index.js';
import { connect } from './db/connect.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import upload from './utils/multer.js';
// Required logic for integrating with Express

const app = express();
app.use(cookieParser());
// Our httpServer handles incoming requests to our Express app.

// Below, we tell Apollo Server to "drain" this httpServer,

// enabling our servers to shut down gracefully.

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/graphql',

  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),

  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

app.post('/upload', upload.single('photo'), (req, res) => {
  res.send({ path: req.file.filename });
});
// Modified server startup
// npm run build will build your frontend app, and it will the optimized version of your app
const __dirname = path.resolve();
app.use('/', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

await connect();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
