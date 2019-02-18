import Axios from "axios";
import Jwt_decode from "jwt-decode";

import { 
  GET_USERS, 
  ITEMS_LOADING, 
  GET_ERROR, 
  ADD_USER, 
  SET_CURRENT_USER } from "./types";
import { setAuthToken } from "../utils/setToken";

export const getUsers = () => dispatch => {
  dispatch(itemsLoading());
  return Axios
    .get(`/api/user`)
    .then(res => {
      const { users } = res.data;
      dispatch({
        type: GET_USERS,
        payload: users
      });
    })
    .catch(err => dispatch({
      type: GET_ERROR,
      payload: err
    }));
};


export const addUser = (user, history) => dispatch => {
  return Axios
    .post(`/api/user/create`, user)
    .then(res => {
      const { user } = res.data;
      dispatch({
        type: ADD_USER,
        payload: user
      });
      history.push('login');
    })
    .catch(err => dispatch({
      type: GET_ERROR,
      payload: err
    }));
}


export const loginUser = (user, history) => dispatch => {
  return Axios
    .post(`/api/user/authenticate`, user)
    .then(res => {
      //Set token on local storage
      const { token } = res.data;
      localStorage.setItem('access_token', token);

      //Set token on auth header
      setAuthToken(token);

      //Decode the token & Set on local storage
      const decodedToken = Jwt_decode(token.split(' ')[1]);
      localStorage.setItem('access_user', JSON.stringify(decodedToken));

      //Set current user
      dispatch(setCurrentUser(decodedToken));
      history.push('dashboard');
    })
    .catch(err => dispatch({
      type: GET_ERROR,
      payload: err
    }));
}


export const logOutUser = () => dispatch => {
  //Clear items from local storage
  localStorage.clear();

  //Delete auth token
  setAuthToken(false);

  //Remove current user
  dispatch(setCurrentUser({}));
  window.location.href = '/login';
}


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const itemsLoading = () => dispatch => {
  dispatch({
    type: ITEMS_LOADING
  });
}