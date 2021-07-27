import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { googleLogin } from "../services/authService";
import {useAuth} from '../Context/AuthContext';


export default function GoogleRedirect(){

    const { getUser } = useAuth()
    const history = useHistory();
    const location = useLocation();
    const match = location.pathname.match(/email=(([^&]+))/);
    const email = match?.[1];    
    
    useEffect(()=>{
        async function googleRedirect(){

            let result = await googleLogin(email)
            await getUser();
            console.log(result)
            if (result){
                history.push('/profile') 
            }
        }
        googleRedirect();
        
    },[])

    return( 
        <>

        </>
    )
}