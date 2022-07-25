import React, { useRef, useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config'

const Register = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Posting the register's data to the server side
      const response = await axiosInstance.post('/auth/register', {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      console.log(response)

      if (response.data.code !== 11000) {
        setError(false)
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="register__wrapper">
      <div className="register__wrap">
        <div className="register__heading">
          <Link to="/" className="link">
            <h1>Blog it!</h1>
          </Link>
          <p>Sign Up</p>
          <span>Sign Up to share a story</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="register__input--box">
            <input
              type="text"
              autoComplete="off"
              required
              placeholder="Enter your username"
              className="username"
              style={error ? { borderColor: '#f47c7c' } : null}
              ref={usernameRef}
            />
            <input
              type="text"
              autoComplete="off"
              required
              placeholder="Enter your email"
              className="email"
              style={error ? { borderColor: '#f47c7c' } : null}
              ref={emailRef}
            />
            <input
              type="password"
              autoComplete="off"
              required
              placeholder="Enter your password"
              className="password"
              style={error ? { borderColor: '#f47c7c' } : null}
              ref={passwordRef}
            />
            {error && (
              <span
                style={{
                  fontSize: '0.9rem',
                  color: '#f47c7c',
                }}
              >
                User credentials is taken, pls try another.
              </span>
            )}
            {error === false && (
              <span
                style={{
                  fontSize: '0.9rem',
                  color: '#446a46',
                }}
              >
                Registration succesful.
              </span>
            )}
          </div>
          <div className="register__interaction--wrap">
            <Link className="link" to="/login">
              <h1>Already got Account?</h1>
            </Link>
            {error === false ? (
              <Link to="/login" className="link">
                <button>Login</button>
              </Link>
            ) : (
              <button type="submit">Register</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
