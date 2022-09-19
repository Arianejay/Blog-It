// react
import React from 'react'

// css
import './about.css'

// data
import { aboutData } from './Data'

// imports
import Navbar from '../../components/navbar/Navbar'

const about = () => {
  return (
    <>
      <Navbar />
      <div className="about__wrapper">
        <div className="about__heading">
          <h1>About</h1>
        </div>
        <div className="about__content">
          <p>{aboutData}</p>
          <p>{aboutData}</p>
          <br />
          <p>{aboutData}</p>
        </div>
      </div>
    </>
  )
}

export default about
