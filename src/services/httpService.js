import axios from "axios";

axios.create({
    baseURL: `http://localhost:8000`,
    withCredentials:true,
    headers:{
        'Access-Control-Allow-Origin':'*', 
        'Content-Type':'application/json'
    }
})  

// const http = axios.create({
//     baseURL: `http://localhost:8000`,
//     withCredentials:true,
//     headers:{
//         'Access-Control-Allow-Origin':'*', 
//         'Content-Type':'application/json'
//     }
// })  
export function getCancelToken(){
    return axios.CancelToken.source(); 
  
}

export default {
    get: axios.get, 
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

