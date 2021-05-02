import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'
const enumUserType = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
}

const UserSchema = new Schema({
  type: {
    type: String,
    require: true,
    enum: Object.keys(enumUserType),
    index: true,
  },
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true, bcrypt: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})
const AdminUserSchema = new Schema({
  companyName: { type: String, required: true },
})
const CustomerUserSchema = new Schema({
  telephone: { type: String },
  streetAddr: { type: String },
  district: {type: String},
  province: {type: String},
  postal: {type: String},
})

UserSchema.set('discriminatorKey', DKey)
UserSchema.plugin(bcrypt)

export const UserModel = mongoose.model('User', UserSchema)
export const AdminUserModel = UserModel.discriminator(
  enumUserType.ADMIN,
  AdminUserSchema
)
export const CustomerUserModel = UserModel.discriminator(
  enumUserType.CUSTOMER,
  CustomerUserSchema
)

export const UserTC = composeWithMongooseDiscriminators(UserModel).removeField(
  'password'
)
export const AdminUserTC = UserTC.discriminator(AdminUserModel, {
  name: enumUserType.ADMIN,
}).removeField('password')
export const CustomerUserTC = UserTC.discriminator(CustomerUserModel, {
  name: enumUserType.CUSTOMER,
}).removeField('password')

export default UserModel