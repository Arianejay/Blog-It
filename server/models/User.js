import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
)

const Users = mongoose.model('User', UserSchema)
export default Users
