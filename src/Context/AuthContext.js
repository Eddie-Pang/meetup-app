import React, { useCallback, useContext, useEffect, useState } from 'react';

import {logout} from '../services/authService'
import { getAccount } from '../services/userService';
import { Link, useHistory } from "react-router-dom"
import { getUserObject } from '../services/authService'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const history = useHistory()
    
    const handleLogOut = async()=>{
        let result = await logout()
        localStorage.removeItem("token");
        getUser();
        if (result.status === 200){
            history.push('/')
        }
    }

    // useEffect(()=>{
    //     console.log(currentUser)
    //     setCurrentUser(currentUser);
        

    // },[currentUser])
   
    useEffect(() => {
          getUser()
    }, [])

    async function getUser(){
        try {
            setLoading(true)
            const res = await getAccount();
            console.log(res);
            if (res.status === 200){
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