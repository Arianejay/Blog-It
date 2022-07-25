import React from 'react'
import './about.css'
import { aboutData } from './Data'
import Navbar from '../../components/navbar/Navbar'

const about = ({ user }) => {
  return (
    <>
      <Navbar user={user} />
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
