import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Main from './pages/main/Main'
import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import { Context } from './context/Context'

function App() {
  const { user } = useContext(Context)

  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence>
          <Main user={user} />
        </AnimatePresence>
      </BrowserRouter>
    </div>
  )
}

export default App

// Navbar
// Post
// Login
// Register
// Settings
// SinglePost
// Write
