// react
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// imports
import Home from '../home/Home'
import Login from '../login/Login'
import Register from '../register/Register'
import Write from '../write/Write'
import About from '../about/About'
import SinglePost from '../singlePost/SinglePost'
import Settings from '../settings/Settings'

// context
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Main = () => {
  const location = useLocation()

  // context
  const { user } = useContext(Context)

  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
          exact
        />
        <Route path="/write" element={user ? <Write /> : <Login />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/post/:id" element={<SinglePost />} exact />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
          exact
        />
      </Routes>
    </div>
  )
}

export default Main
