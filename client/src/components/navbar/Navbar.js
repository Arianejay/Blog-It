import React, { useContext, useState } from 'react'
import './navbar.css'
import Sidebar from '../sidebar/Sidebar'
import Hamburger from 'hamburger-react'
import { BiLogIn } from 'react-icons/bi'
import { TbLogout } from 'react-icons/tb'
import { MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const Navbar = ({ user }) => {
  const [isOpen, setOpen] = useState(false)
  const { dispatch } = useContext(Context)

  const mediaFolder = 'http://localhost:3001/media/'

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <>
      <div
        style={
          isOpen
            ? {
                backgroundColor: '#1b2430',
                color: '#fbfbfb',
                transition: 'all 0.3s ease-in-out',
              }
            : {
                backgroundColor: '#fbfbfb',
                color: '#1b2430',
                transition: 'all 0.3s ease-in-out',
              }
        }
        className="navbar__wrapper"
      >
        <div className="logo__wrap">
          <h1 style={isOpen ? { color: '#fbfbfb' } : { color: 'inherit' }}>
            Blog it!
          </h1>
        </div>
        <div className="links__wrap">
          <ul>
            <Link to="/" className="link">
              <li>home</li>
            </Link>
            <Link to="/about" className="link">
              <li>about</li>
            </Link>
            <Link to="/write" className="link">
              <li>write</li>
            </Link>
          </ul>
        </div>
        <div className="interaction__wrap">
          {!user ? (
            <Link to="/login" className="link">
              <BiLogIn className="interaction__icon" />
            </Link>
          ) : (
            <div className="isLoggedIn">
              <Link to="/settings" className="link">
                {user.profilePicture && user ? (
                  <img src={mediaFolder + user.profilePicture} alt="" />
                ) : (
                  <MdSettings
                    className="interaction__icon"
                    style={{ display: 'flex', alignItems: 'center' }}
                  />
                )}
              </Link>
              <TbLogout className="interaction__icon" onClick={handleLogout} />
            </div>
          )}
        </div>
        <div
          className="hamburger__icon"
          style={isOpen ? { color: '#fbfbfb' } : { color: 'inherit' }}
        >
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      <div className="dropdown">{isOpen && <Sidebar user={user} />}</div>
    </>
  )
}

export default Navbar
