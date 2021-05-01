import { UserInputError } from 'apollo-server-express'
import { schemaComposer } from 'graphql-compose'
import jsonwebtoken from 'jsonwebtoken'

import { UserModel, UserTC } from '../../models'

const LoginInput = schemaComposer.createInputTC({
  name: 'LoginInput',
  fields: {
    username: 'String!',
    password: 'String!',
  },
})

const LoginPayLoad = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    token: 'String',
    user: UserTC.getType(),
  },
})

export const login = schemaComposer.createResolver({
  name: 'login',
  args: {
    record: LoginInput,
  },
  type: LoginPayLoad,
  resolve: async ({ args }) => {
    const { username, password } = args.record
    const user = await UserModel.findOne({ username })
    if (!user) {
      throw new UserInputError(`Username ${username} not found`)
    }
    const valid = await user.verifyPassword(password)
    if (!valid) {
      throw new UserInputError('Incorrect password')
    }
    return {
      token: jsonwebtoken.sign(
        {
          _id: user._id,
          type: user.type,
        },
        process.env.SECRET ?? 'default-secret',
        { expiresIn: '1d', algorithm: 'HS256' }
      ),
      user,
    }
  },
})
