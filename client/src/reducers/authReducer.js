import { 
  ADD_USER,
  GET_USERS,
  GET_ERROR,
  ITEMS_LOADING,
  SET_CURRENT_USER
} from "../actions/types";

const initialState = {
  users: [],
  error: "",
  loading: false,
  isAuthenticated: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }

    case ADD_USER:
      return {
        ...state,
        users: [ ...state.users, action.payload ]
      }
    
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload != null,
        currentUser: action.payload
      }

    case GET_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}