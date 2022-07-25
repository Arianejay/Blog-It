import mongoose from 'mongoose'

const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Posts = mongoose.model('Post', PostsSchema)
export default Posts
