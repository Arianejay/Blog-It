import express from 'express'
import { PostRegister, PostLogin } from '../controllers/Auth.js'

const router = express.Router()

router.post('/register', PostRegister)
router.post('/login', PostLogin)

export default router
