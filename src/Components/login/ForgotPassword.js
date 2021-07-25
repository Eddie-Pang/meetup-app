import React,{ useRef, useState } from 'react';
import useFormInput from '../../hooks/useFormInput'
import { Link } from 'react-router-dom';
import {resetUserPassword} from '../../services/userService';
import CenteredContainer from '../CenteredContainer';
import NavBar from '../NavBar';

function ForgotPassword(){
    const {setValue:setEmail, ...email} = useFormInput(""); 
    const emailRef = useRef();
    const [message, setMessage] = useState();
    

    const handleResetPassword = async() => {
        setMessage(false);
        const value = emailRef.current.value;
        console.log('value:', value)
        if (emailRef.current.value!==''){
            try {
                await resetUserPassword(value); 
                setEmail('');
                setMessage('We are sending you a new password, please check you email.');
                
            }catch(error){
              setMessage(`Please enter a valid email address.`);
            }

        }else{
            setMessage(`Please enter your email address.`);
        }
           
    };


    return(
        <>

        <NavBar/>

        <CenteredContainer>
            <div className="card">
                <br/>
                <p style={welcomeStyle}>Forget Password</p>
        
                <input {...email} type="email" className="form-control" ref={emailRef} id="InputEmail" placeholder="Email" aria-describedby="emailHelp" style={formFields} required></input>
                <br/><br/>
                <button type="button" onClick={handleResetPassword} style={regStyle}>Confirm</button>
                <br/>{message}<br/><br/><br/>
                

                <Link to="/Login" style={logStyle}>Back</Link>
           
                <br/><br/>
  

            </div>
            
       
        </CenteredContainer>
        </>



    )

}
export default ForgotPassword;




const formFields = {
    borderRadius: "6px",
    padding: "10px 30px"
}

const logStyle = {
    backgroundColor: "#00cc00",
    color: "white",
    padding: "7px 60px",
    fontSize: "17px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    
    
  }
  
  const regStyle = {
    backgroundColor: "#ffcc00",
    padding: "7px 10px",
    fontSize: "13px",
    color: "black",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none"
  }
  const welcomeStyle = {
    fontSize: "30px",
    color: "green"
  }