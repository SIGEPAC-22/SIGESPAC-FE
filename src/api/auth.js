import{ API_HOST } from "../utils/constant";

export function singInApi(user){
    const url = `${API_HOST}/v1/sgp-access-logic-svc/getDataAuthLogin`;

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