import { IUserModel } from '../../models/UserModel';
import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
    LOGOUT 
  } from '../constants/AuthConstant';
  
  // initialize userToken from local storage
const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null

 export interface AuthState {
    user: IUserModel | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: AuthState = {
    user: user,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload, error: null };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.error };
      case LOGOUT:
        return { ...state, user: null, error: null };
      default:
        return state;
    }
  };
  
  export default authReducer;