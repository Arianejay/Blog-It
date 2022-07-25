import express from 'express'
import {
  getAllPosts,
  getPost,
  putPost,
  deletePost,
  postPost,
} from '../controllers/Posts.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPost)
router.put('/:id', putPost)
router.post('/', postPost)
router.delete('/:id', deletePost)

export default router
