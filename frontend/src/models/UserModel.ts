

export interface IAuth {
    telephone: string;
    token: string;
}

export interface IUserModel extends IAuth {
    full_name: string;
    email: string;
}

export interface ILogin {
    username: string;
    password: string;
}


export interface IRegister {
    email: string;
    password: string;
    password2: string;
    full_name: string;
    telephone: string;
}
