import React, { useState, useRef } from 'react';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../Context/AuthContext';
import CenteredContainer from '../CenteredContainer';
import {createUser} from '../../services/authService'

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    const confirmRef = useRef()
    // const { createUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    

    async function handleSubmit(e){
        e.preventDefault()
        if(pwdRef.current.value !== confirmRef.current.value){
            return setError("Passwords do not match")
        }
        try{
            setError("")
            setLoading(true)
            const user = {
                name : nameRef.current.value,
                email: emailRef.current.value,
                password: pwdRef.current.value
            }
            await createUser(user)
            console.log('Create Successfully')
        }catch {
            setError("Failed to register")
        }
        setLoading(false)
    }

    return(
        <CenteredContainer>
        <div className="card">
            <div className="card-body">
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" placeholder="Enter name" id="name" ref={nameRef} name="name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" placeholder="Enter email" id="email" ref={emailRef} name="email" 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                        title="Please provide an email address" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" ref={pwdRef} name="pwd" 
                        pattern=".{8,}" title="Must contain eight or more characters" 
                        required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-pwd">Password Confirmation:</label>
                        <input type="password" className="form-control" placeholder="Confirm password" id="confirm-pwd" ref={confirmRef} required/>
                    </div>
                   <button type="submit" className="btn btn-primary" disabled={loading}>Register Now</button>
                </form>
            </div> 
        </div>
        <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
        </CenteredContainer>
    )
}