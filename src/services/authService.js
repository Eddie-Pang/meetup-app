import http from './httpService';
import decode from 'jwt-decode';

export async function createUser(user){
    console.log(user)
    const result = await http.post(`/register`, user)
    const { headers: {'x-auth-token':token} } = result;
    localStorage.setItem( "token" , token);
    return true;
} 

export async function login(user){
    const result = await http.post(`/login`, user)
    console.log(result)
    const { headers: {'x-auth-token':token} } = result;
    localStorage.setItem( "token" , token);
    return result.data;
}

export async function googleLogin(email){
    const result = await http.get(`/googleLogin/${email}`)
    console.log(result)
    const { headers: {'x-auth-token':token} } = result;
    localStorage.setItem( "token" , token);
    return result.data;
}

export function logout(){
    return http.get(`/logout`)
}



export function getUserObject() { 
    try{
        return decode(getToken()); 
    }
    catch(ex){
        return; 
    }
}

export function getToken() {
    try{
        return localStorage.getItem("token");
    }
    catch(ex){

        // console.log(ex); 
    }
}