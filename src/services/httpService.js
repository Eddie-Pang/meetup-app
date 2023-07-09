import axios from "axios";

const instance = axios.create({
  baseURL: `https://meetup-server-5xd6.onrender.com`,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// const http = axios.create({
//     baseURL: `http://localhost:8000`,
//     withCredentials:true,
//     headers:{
//         'Access-Control-Allow-Origin':'*',
//         'Content-Type':'application/json'
//     }
// })
export function getCancelToken() {
  return axios.CancelToken.source();
}

export default instance;
