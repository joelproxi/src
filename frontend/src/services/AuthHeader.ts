

const AuthHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const data = localStorage.getItem("user");
    
    if (!data) {
        return headers ;
    }
    
    const user = JSON.parse(data);
    if (user?.token) {
        // console.log("°°°°°°°°°°°°°°°", data);
        return {...headers, Authorization: `Token ${user.token}` };
    }
    return {};
}

export default AuthHeaders;