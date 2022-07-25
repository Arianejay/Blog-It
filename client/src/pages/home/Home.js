import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import Posts from '../../components/posts/Posts'
import Footer from '../../components/footer/Footer'

const Home = ({ user }) => {
  return (
    <div className="home__wrapper">
      <Navbar user={user} />
      <div className="home__content">
        <Posts />
      </div>
      <Footer />
    </div>
  )
}

export default Home
