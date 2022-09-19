// react
import React from 'react'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../config'
import { Link } from 'react-router-dom'

// css
import './posts.css'
import loader from '../../media/loader.gif'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const mediaFolder = 'https://blog-it-mern.herokuapp.com/media/'

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    await axiosInstance.get(`/post`).then((response) => setPosts(response.data))
  }

  return (
    <>
      {posts.length === 0 ? (
        <div className="loader__container">
          <img src={loader} alt="loader" />
        </div>
      ) : (
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
      )}
    </>
  )
}

export default Posts
