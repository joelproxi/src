import { ILogin, IRegister, IUserModel } from "../models/UserModel";
import api from "./Api";
import AuthHeaders from "./AuthHeader";



class Authservice{
    setUserToLocalStorage = (data: IUserModel) => {
        localStorage.setItem("user", JSON.stringify(data));
    }

    getUserFromLocalStorage = () => {
        const user = localStorage.getItem("user")!;
        return JSON.parse(user);
    }

    login = async (data: ILogin)  => {
        const resp = await api.post("/accounts/login/", data);
        return resp;
    }

    logout = async ()  => {
        const resp = await api.post("/accounts/logout/",{}, {
            headers: {...AuthHeaders()}
        });
        return resp;
    }

    register = async (data: IRegister) => {
        const resp = await api.post("/accounts/register/", data);
        return resp;
    }

    getConversations = async () => {        
        const resp = await api.get('/chats/conversations/', {
            headers: {...AuthHeaders()}
        });
        return resp;
    }

    getMessages = async (conversationName: string, page: string|number) => {
        const resp = await api.get(`/chats/messages/?conversation=${conversationName}&page=${page}`,
            {
                headers: {...AuthHeaders()}
            }
        );
        return resp;
    }
}

export default new Authservice();