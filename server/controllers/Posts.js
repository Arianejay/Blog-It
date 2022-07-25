import express from 'express'
import mongoose from 'mongoose'
import Posts from '../models/Posts.js'

const router = express.Router()

export const postPost = async (req, res) => {
  const newPost = await new Posts(req.body)
  try {
    const savedPost = await newPost.save()
    return res.send(savedPost)
  } catch (err) {
    return res.send
  }
}

export const getAllPosts = async (req, res) => {
  // TODO: pls review this
  const username = req.query.user //query == eg. "/?user=<name>"

  try {
    let posts

    if (username) {
      posts = await Posts.find({ username })
    } else {
      posts = await Posts.find()
    }

    return res.send(posts)
  } catch (err) {
    return res.send(err)
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)
    return res.send(post)
  } catch (err) {
    return res.send(err)
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)

    if (post.username === req.body.username) {
      try {
        await post.delete()
        return res.send('Post deleted')
      } catch (err) {
        return res.send(err)
      }
    } else {
      return res.send('You can only delete your post.')
    }
  } catch (err) {
    return res.send(err)
  }
}

export const putPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id)

    if (post.username === req.body.username) {
      try {
        const updatedPost = await Posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        )

        return res.send(updatedPost)
      } catch (err) {
        return res.send(err)
      }
    } else {
      return res.send('You can only update your post.')
    }
  } catch (err) {
    return res.send(err)
  }
}

export default router
