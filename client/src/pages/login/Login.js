import React, { useContext, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch, isFetching } = useContext(Context)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })

      if (response.data !== 'Wrong Credentials') {
        navigate('/')
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: 'LOGIN_FAILURE' })
    }
  }

  return (
    <div className="login__wrapper">
      <div className="login__wrap">
        <div className="login__heading">
          <Link to="/" className="link">
            <h1>Blog it!</h1>
          </Link>
          <p>Sign In</p>
          <span>Use your Blog it Account</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input__box">
            <input
              type="text"
              autoComplete="off"
              required
              placeholder="Enter your username"
              className="username"
              onChange={(e) => setUsername(e.target.value)}
              style={error ? { borderColor: '#f47c7c' } : null}
            />
            <input
              type="password"
              autoComplete="off"
              required
              placeholder="Enter your password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
              style={error ? { borderColor: '#f47c7c' } : null}
            />
            {error && (
              <span style={{ fontSize: '0.9rem', color: '#f47c7c' }}>
                User does not exist.
              </span>
            )}
            {isFetching && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Logging in...
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: '0.3rem' }}
                >
                  <path
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    opacity=".25"
                  />
                  <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur="0.75s"
                      values="0 12 12;360 12 12"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </span>
            )}
          </div>
          <div className="login__interaction--wrap">
            <Link className="link" to="/register">
              <h1>Create Account</h1>
            </Link>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
