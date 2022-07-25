const Reducer = (state, actions) => {
  switch (actions.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case 'LOGIN_SUCCESS':
      return {
        user: actions.payload,
        isFetching: false,
        error: false,
      }
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: true,
      }
    case 'UPDATE_START':
      return {
        ...state,
        isFetching: true,
      }
    case 'UPDATE_SUCCESS':
      return {
        user: actions.payload,
        isFetching: false,
        error: false,
      }
    case 'UPDATE__FAILURE':
      return {
        user: state.user,
        isFetching: false,
        error: false,
      }
    case 'LOGOUT':
      return {
        user: null,
        isFetching: false,
        error: false,
      }
    default:
      return state
  }
}

export default Reducer
