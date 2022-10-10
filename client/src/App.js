// react
import { BrowserRouter } from 'react-router-dom'

// css
import './App.css'
import { AnimatePresence } from 'framer-motion'

// imports
import Main from './pages/main/Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence>
          <Main />
        </AnimatePresence>
      </BrowserRouter>
    </div>
  )
}

export default App
