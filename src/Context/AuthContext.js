import React, { useCallback, useContext, useEffect, useState } from 'react';
// import axios from 'axios'
import http from '../services/httpService'
import { Link, useHistory } from "react-router-dom"
import { getUserObject } from '../services/authService'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [user, setUser]= useState(null)
    const [loading, setLoading] = useState(true)
    const history = useHistory() 

    // const createUser = user => http.post(`/register`, user)
    // const login = user => http.post(`/login`, user)
    const logout = () => http.get(`/logout`)
    const createEvent = event => http.post(`/new-events`, event)
    
    async function handleLogOut(){
        let result = await logout()
        localStorage.removeItem("token");
        getUser();
        if (result.status === 200){
            history.push('/')
        }
    }

    useEffect(()=>{
        console.log(currentUser)
        setCurrentUser(currentUser);

    },[currentUser])
   
    useEffect(() => {
          getUser()
    }, [])

    async function getUser(){
        try {
            setLoading(true)
            const res = await http.get(`/account`)
            console.log(res);
            if (res.status === 200){
                // setCurrentUser(()=>(res.data))
                setCurrentUser(res.data)
                setUser(res.data)
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const isAuth = getUserObject() != null? true: false
      
    const value = {
        currentUser,
        loading,
        handleLogOut,
        createEvent,
        getUser,
        isAuth,
        user
    }

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}