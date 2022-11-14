import{STATUS, URL_GET_DATA_AUTH_LOGIN } from "../utils/constant";

export function singInApi(user){
    const url = `${URL_GET_DATA_AUTH_LOGIN}`;

    const data ={
        ...user,
        user: user.user
    };
    const params = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params).then(response =>{
        if(response.status >=200 && response.status < 300){
            return response.json();
        }
        return { message:"usuario o contraseña incorrectos"};
    })
    .then(result =>{
        return result
    })
    .catch(err =>{
        return err;
    })
    
}

export function setStatusApi(status){
    localStorage.setItem(STATUS, status);
}

export function getStatusApi(){
    return localStorage.getItem(STATUS);
}

export function logoutApi(){
    localStorage.removeItem(STATUS)
}

export function isUserLogedApi(){
    const status = getStatusApi();

    if (!status){
        logoutApi();
        return null;
    }
    return status;
}