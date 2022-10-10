// react
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config'
import { v4 } from 'uuid'

// css
import './write.css'
import { BiImageAdd } from 'react-icons/bi'

// imports
import Navbar from '../../components/navbar/Navbar'

// context
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Write = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const navigate = useNavigate()

  // context
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      username: user.username, //stored username on the account
      title,
      description,
    }

    // Add picture
    if (file) {
      const data = new FormData()
      const fileName = v4() + file.name
      data.append('name', fileName)
      data.append('file', file)

      // Adding fileName to newPost
      newPost.picture = fileName

      try {
        // Upload from multer
        await axiosInstance.post('/upload', data)
      } catch (err) {
        console.log(err)
      }
    }

    try {
      await axiosInstance
        .post('/post', newPost)
        .then((response) => navigate('/post/' + response.data._id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar user={user} />
      <div className="write__wrapper">
        {file && (
          <img
            src={URL.createObjectURL(file)} //creates url
            alt=""
          />
        )}
        <form className="write__form" onSubmit={handleSubmit}>
          <div className="write__input">
            <div className="file__input--wrap">
              <label htmlFor="file__input">
                <BiImageAdd style={{ fontSize: '3rem', cursor: 'pointer' }} />
              </label>
              <input
                type="file"
                id="file__input"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                type="text"
                className="title__input"
                placeholder="Title"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button type="submit">Publish</button>
          </div>
          <div className="write__story">
            <textarea
              placeholder="Write a story..."
              type="text"
              autoFocus={true}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  )
}

export default Write
