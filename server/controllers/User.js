import express from 'express'
import mongoose from 'mongoose'
import Users from '../models/User.js'
import bcrypt from 'bcrypt'
import Posts from '../models/Posts.js'

const router = express.Router()

// Get user

export const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)
    const { password, ...others } = user._doc
    return res.send(others)
  } catch (err) {
    return res.send(err)
  }
}

// Edit the user info

export const putUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    try {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }, //automatically updates the information
      )

      return res.send(updatedUser)
    } catch (err) {
      return res.send(err)
    }
  } else {
    return res.send('You can only update your account.')
  }
}

// Delete user

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Users.findById(req.params.id)

      try {
        // deletes the account's posts
        await Posts.deleteMany({ username: user.username })

        await Users.findByIdAndDelete(req.params.id)
        return res.send('User deleted')
      } catch (err) {
        return res.send(err)
      }
    } catch (err) {
      return res.send(err)
    }
  } else {
    return res.send('You can only delete your account.')
  }
}

export default router
