import React, { useCallback, useContext, useEffect, useState } from 'react';
// import axios from 'axios'
import http from '../services/httpService'
import { Link, useHistory } from "react-router-dom"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
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
    // const getUser = () => http.get(`/account`)
    const logout = () => http.get(`/logout`)
    const createEvent = event => http.post(`/new-events`, event)
    
    async function handleLogOut(){
        let result = await logout()
        getUser();
        if (result.status === 200){
            history.push('/')
        }
    }
    // const useFetch = () => {
    //     const [data, setData] = useState(null)
    //     useEffect(() => {
    //         const fetchData = async function() {
    //             try{
    //                 const res = await http.get(`/account`)
    //                 if (res.status === 200){
    //                     setCurrentUser(res.data)
    //                 }
    //             }catch(err){
    //                 console.log(err)
    //             }
    //         }
    //         fetchData()
    //     }, [])
    //     return data
    // }

    
    // useEffect(()=>{console.log(currentUser?.name)}, [loading])
    useEffect(() => {
          getUser()
    }, [])

    async function getUser(){
        try {
            setLoading(true)
            const res = await http.get(`/account`)
            if (res.status === 200){
                // setCurrentUser(()=>(res.data))
                setCurrentUser(res.data)
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
      
      
    
    // useEffect(()=>{
    //     let isMounted = true
    //     function getLoginUser(){
    //          getUser().then((res) => {
    //             if (isMounted) {
    //                 console.log(res)
    //                 setCurrentUser(res.data)
    //             }
    //         }).catch(err => console.log(err))
    //     }
    //     getLoginUser()
    //     return () => { isMounted = false}
    // }, [currentUser])
   

    

    const value = {
        currentUser,
        loading,
        createUser,
        login,
        handleLogOut,
        createEvent,
        getUser
        // useFetch,
        
        
    }

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}