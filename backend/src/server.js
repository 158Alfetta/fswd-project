import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import jwt from 'express-jwt'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import './mongoose-connect'
import schema from './graphql'
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose'
import { CartTC } from './models'

const path = '/graphql'
const app = express()
const server = new ApolloServer({
  schema,
  playground: true,
  context: ({ req }) => ({ user: req.user }),
})
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(
  path,
  jwt({
    secret: process.env.SECRET ?? 'default-secret',
    algorithms: ['HS256'],
    getToken: (req) => {
      if (req?.cookies?.token) {
        return req?.cookies?.token
      }
      if (req?.headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        return req?.headers?.authorization?.split(' ')?.[1]
      }
      return null
    },
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    res.status(200).json({
      errors: [
        {
          message: err.message,
        },
      ],
    })
  }
)

server.applyMiddleware({
  app,
  path,
  cors: { origin: 'http://localhost:3000', credentials: true },
})

const port = process.env.PORT ?? 5001
app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
})
