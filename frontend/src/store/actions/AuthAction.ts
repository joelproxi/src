import { Dispatch } from 'redux';
import { LOGIN_FAILURE,
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS } from '../constants/AuthConstant';
import { ILogin, IRegister } from '../../models/UserModel';
import api, { BASE_URL } from '../../services/Api';
import AuthService from '../../services/AuthService';




export const loginAction = (data: ILogin) => {
  return async (dispatch: Dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
      try {
          const response = await AuthService.login(data);
        if (response.data?.token) {
            setItemToLocalStorage("user", response.data);
          console.log(response.data);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: LOGIN_FAILURE, error: 'Login failed' });
      }
    } catch (error ) {
      dispatch({ type: LOGIN_FAILURE, error: error?.message });
    }
  };
};

export const registerAction = (data: IRegister) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        console.log(data);
        
      const response = await AuthService.register(data);
      if (response.data.success) {
        console.log(response.data);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
        setItemToLocalStorage("user", response.data);
      } else {
        dispatch({ type: REGISTER_FAILURE, error: 'Registration failed' });
      }
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, error: error.message });
    }
  };
};

export const logoutAction = () => {
    removeItemFromLocalstorage("user");
  return { type: LOGOUT };
};



function setItemToLocalStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromLocalStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key));
}

function removeItemFromLocalstorage(key: string) {
    localStorage.removeItem(key);
}