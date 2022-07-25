import React from 'react'
import './posts.css'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../config'
import { Link } from 'react-router-dom'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const mediaFolder = 'http://localhost:3001/media/'

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    await axiosInstance.get(`/post`).then((response) => setPosts(response.data))
  }

  return (
    <>
      {posts.map((item) => (
        <div className="posts__wrapper">
          {item.picture && <img src={mediaFolder + item.picture} alt="" />}
          <div className="posts__info">
            <div className="posts__title">
              <Link to={'/post/' + item._id} className="link">
                <h1>{item.title}</h1>
              </Link>
            </div>
            <div className="posts__date">
              {new Date(item.createdAt).toDateString()}
            </div>
            <div className="posts__description">{item.description}</div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Posts
