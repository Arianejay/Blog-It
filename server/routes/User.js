import express from 'express'
import { getUser, putUser, deleteUser } from '../controllers/User.js'

const router = express.Router()

router.get('/:id', getUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)

export default router
