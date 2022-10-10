// react
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// css
import './sidebar.css'
import { motion } from 'framer-motion'

// context
import { Context } from '../../context/Context'

const Sidebar = ({ user }) => {
  const { dispatch } = useContext(Context)
  const navigate = useNavigate

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: '-50%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '-50%', transition: { duration: '0.35' } }}
      transition={{ type: 'spring', stiffness: '100', duration: '0.9' }}
      className="sidebar__wrapper"
    >
      <div className="sidebar__links--wrap">
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
      <div className="sidebar__interaction--wrap">
        {!user ? (
          <>
            <Link to="/login" className="link">
              <button>Login</button>
            </Link>
            <Link to="/register" className="link">
              <button>Register</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/settings" className="link">
              <button>Settings</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Sidebar
