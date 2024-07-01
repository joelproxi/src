
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'
import { ILogin, IRegister, IUserModel } from "../models/UserModel";
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService';
import api from '../services/Api';
import authHeader from '../services/AuthHeader';

const DefaultProps = {
    login: () => null,
    register: () => null,
    logout: () => null,
    user: null
}

export interface AuthProps {
    login: (creadential: ILogin) => any;
    register: (Credential: IRegister) => any;
    logout: () => void;
    user: IUserModel | null;
}


export const AuthContext = createContext<AuthProps>(DefaultProps);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => AuthService.getUserFromLocalStorage())

    const login = async (creadential: ILogin) => {
        const data = await AuthService.login(creadential);
        setUser(data);
        return data;
    }

    const register = async (credential: IRegister) => {
        const data = await AuthService.register(credential);
        console.log(data);
    }

    const logout = () => {
        AuthService.logout();
        setUser(null);
        navigate('/login');
    }

    api.interceptors.request.use((config) => {
        config.headers =  authHeader() as AxiosRequestHeaders;
        return config;
    })

    api.interceptors.response.use(
        (response) => {
            return response;
        },

        (error) => {
            if(error.response.status === 401){
                logout();
            }
            return Promise.reject(error);
        }
    )

    return <AuthContext.Provider value={{login, logout, user, register}}>
        {children}
    </AuthContext.Provider>

}