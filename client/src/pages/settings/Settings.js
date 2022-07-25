import './settings.css'
import Navbar from '../../components/navbar/Navbar'
import { BiImageAdd } from 'react-icons/bi'
import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { v4 } from 'uuid'
import { axiosInstance } from '../../config'
import { useNavigate } from 'react-router-dom'

const Settings = ({ user }) => {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const { dispatch } = useContext(Context)

  const navigate = useNavigate()

  const mediaFolder = 'http://localhost:3001/media'

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_START' })

    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    }

    // Add updated picture
    if (file) {
      const data = new FormData()
      const fileName = v4() + file.name
      data.append('name', fileName)
      data.append('file', file)

      // Adding fileName to updateUser
      updateUser.profilePicture = fileName

      try {
        // upload from multer
        await axiosInstance.post('/upload', data)
      } catch (err) {
        console.log(err)
      }
    }

    try {
      await axiosInstance
        .put('/user/' + user._id, updateUser)
        .then((response) =>
          dispatch({ type: 'UPDATE_SUCCESS', payload: response.data }),
        )
      setSuccess(true)
    } catch (err) {
      console.log(err)
      dispatch({ type: 'UPDATE_FAILURE' })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.delete('/user/' + user._id, {
        data: {
          userId: user._id,
        },
      })
      localStorage.clear()
      window.location.reload()
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar user={user} />
      <div className="settings__wrapper">
        <div className="settings__heading">
          <h1>Update Account</h1>
          <h2 onClick={handleDelete}>Delete Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings__img">
            {file && (
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : mediaFolder + user.profilePicture
                }
                alt=""
              />
            )}
            <label htmlFor="settings__fileInput">
              <BiImageAdd style={{ fontSize: '2rem', cursor: 'pointer' }} />
            </label>
            <input
              type="file"
              id="settings__fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={user.email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="settings__button--wrap">
            <button type="submit">Update</button>
            {success && <p>Updated Sucessfully!</p>}
          </div>
        </form>
      </div>
    </>
  )
}

export default Settings
