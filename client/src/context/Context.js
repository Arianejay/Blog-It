import { createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer'

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
}

export const Context = createContext(INITIAL_STATE)

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

  // Let's store the user in local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user]) //useEffect will run everytime user changes

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
}
