import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios'
import http from '../services/httpService'
import { Link, useHistory } from "react-router-dom"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    // const [loading, setLoading] = useState(true)
    const history = useHistory() 



    // const http = axios.create({
    //     baseURL: `http://localhost:8000`,
    //     withCredentials:true,
    //     headers:{
    //         'Access-Control-Allow-Origin':'*', 
    //         'Content-Type':'application/json'
    //     }
    // })  

    const createUser = user => http.post(`/register`, user)
    const login = user => http.post(`/login`, user)
    const getUser = () => http.get(`/account`)
    const logout = () => http.get(`/logout`)
    const createEvent = event => http.post(`/new-events`, event)
    
    async function handleLogOut(){
        let result = await logout()
        if (result.data === 'log out successfully'){
            history.push('/')
        }
    }


    // useEffect(() => {
    //    let isMounted = true; 
    //     getUser()
    //    .then(res => {
    //         if (isMounted) {
    //             console.log(res)
    //             setCurrentUser(res.data)
    //             // setLoading(false)
    //        }
    //     })
    //    .catch(err => { 
    //        console.log(err)
    //     })
    //     return ()=>{
    //         isMounted = false;
    //     }
    // }, [])
    
    useEffect(()=>{
        let isMounted = true
        function getLoginUser(){
             getUser().then((res) => {
                if (isMounted) {
                    console.log(res)
                    setCurrentUser(res.data)
                }
            }).catch(err => console.log(err))
        }
        getLoginUser()
        return () => { isMounted = false}
    }, [])
    // useEffect(()=>{
    //     let isMounted = true;

    //     async function requestUser(){
           
    //         try{
    //             if(isMounted){
    //                 let res = await http.get(`/account`);
    //                 // console.log(res)
    //                 setCurrentUser(res.data)
                
    //                 setLoading(false)
    //             }else{
    //                 setLoading(true)
    //             }
    //         }catch(error){
    //             console.log(error);
    //         }
    //     }
    //     requestUser();
    //     return()=>{
    //         isMounted=false;
    //     }

    // },[]);


    

    const value = {
        currentUser,
        createUser,
        login,
        // getUser,
        handleLogOut,
        createEvent,
        
        
    }

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}