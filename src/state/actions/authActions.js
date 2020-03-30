import axiosWithAuth from '../../utils/axiosWithAuth';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from '../types';

export const signup = creds => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axiosWithAuth()
    .post('/auth/register', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('villager_name', res.data.villager_name);
      localStorage.setItem('island_name', res.data.island_name);
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SIGNUP_FAIL, payload: err.response.data });
    });
};

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosWithAuth()
    .post('/auth/login', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('villager_name', res.data.villager_name);
      localStorage.setItem('island_name', res.data.island_name);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        status: res.status
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
        status: err.response.status
      });
    });
};