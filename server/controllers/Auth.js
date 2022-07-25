import express from 'express'
import mongoose from 'mongoose'
import Users from '../models/User.js'
import bcrypt from 'bcrypt'

export const PostRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new User Schema
    const newUser = new Users({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    })
    const user = await newUser.save()
    return res.send(user)
  } catch (err) {
    return res.send(err)
  }
}

export const PostLogin = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username })
    if (!user) {
      return res.send('Wrong Credentials')
    }

    const validated = await bcrypt.compare(req.body.password, user.password)
    if (!validated) {
      return res.send('Wrong Credentials')
    }

    // Does not send the password
    const { password, ...others } = user._doc

    // else
    return res.send(others) //sends the complete details except for the password
  } catch (err) {
    return res.send(err)
  }
}

const router = express.Router()
