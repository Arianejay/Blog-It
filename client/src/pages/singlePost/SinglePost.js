import React, { useEffect, useState } from 'react'
import './singlePost.css'
import Navbar from '../../components/navbar/Navbar'
import { FiEdit } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config'

const SinglePost = ({ user }) => {
  let params = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState([])
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [update, setUpdate] = useState(false)

  const mediaFolder = 'http://localhost:3001/media/'

  useEffect(() => {
    getPost(params.id)
  }, [params.id])

  // Get
  const getPost = async (id) => {
    const response = await axiosInstance.get(`/post/${id}`)
    setPost(response.data)
    setTitle(response.data.title)
    setDescription(response.data.description)
  }

  // Delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/post/${post._id}`, {
        data: {
          username: user.username,
        },
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  // Update
  const handleUpdate = async (id) => {
    try {
      await axiosInstance.put(`/post/${post._id}`, {
        username: user.username,
        title,
        description,
      })
      setUpdate(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar user={user} />
      <div className="singlePost__wrapper">
        {post.picture && <img src={mediaFolder + post.picture} alt="" />}
        <div className="singlePost__heading">
          {update ? (
            <div className="singlePost__heading--edit">
              <input
                type="text"
                value={title}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          ) : (
            <>
              <h1>{title}</h1>

              {/* This will render only in the accounts post */}
              {post.username === user?.username && (
                <div className="singlePost__title--icons">
                  <FiEdit
                    className="singlePost__icons--edit"
                    onClick={() => setUpdate(true)}
                  />
                  <BsTrash
                    className="singlePost__icons--trash"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="singlePost__author">
          <h1>
            Author: <span>{post.username}</span>
          </h1>
          <p>{new Date(post.createdAt).toDateString()}</p>
        </div>
        {update ? (
          <textarea
            className="singlePost__content--edit"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <div className="singlePost__content">
            <p>{description}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default SinglePost
