import express, { application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './routes/Auth.js'
import UserRoute from './routes/User.js'
import PostRoute from './routes/Posts.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

// Multer ~ midlleware for handling form datas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // callback
    cb(null, 'media') //images will be saved on the server's media folder
  },
  filename: (req, file, cb) => {
    //req.body.name file's name from the client's side
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
  return res.send('File has been uploaded')
})

// from express, getting the uploaded image with a path of localhost:3001/media/<filename>
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/media', express.static(path.join(__dirname, '/media')))

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Server is connect to MongoDB'))
  .then(() =>
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server is running on port: 3001')
    }),
  )
  .catch((err) => console.log(err))
