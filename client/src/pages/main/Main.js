import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../login/Login'
import Register from '../register/Register'
import Write from '../write/Write'
import About from '../about/About'
import SinglePost from '../singlePost/SinglePost'
import Settings from '../settings/Settings'

const Main = ({ user }) => {
  const location = useLocation()

  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home user={user} />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
          exact
        />
        <Route
          path="/write"
          element={user ? <Write user={user} /> : <Login />}
          exact
        />
        <Route path="/about" element={<About user={user} />} exact />
        <Route path="/post/:id" element={<SinglePost user={user} />} exact />
        <Route
          path="/settings"
          element={user ? <Settings user={user} /> : <Login />}
          exact
        />
      </Routes>
    </div>
  )
}

export default Main
