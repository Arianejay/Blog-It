// react
import React from 'react'

// css
import './home.css'

// imports
import Navbar from '../../components/navbar/Navbar'
import Posts from '../../components/posts/Posts'
import Footer from '../../components/footer/Footer'

// context
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Home = () => {
  // context
  const { user } = useContext(Context)

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
