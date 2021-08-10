import React, { useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../Context/AuthContext.js';
import CenteredContainer from '../CenteredContainer';
import NavBar from '../NavBar';
import {login} from '../../services/authService'
import { loadingIcon } from '../../util/imgPicker'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { getUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory() 

    
    async function handleSubmit(e) {
        e.preventDefault()
        try{
            setError("")
            setLoading(true)
            const user = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
            let result = await login(user)
            getUser();
            console.log(result)

            if (result === 'log in successfully'){
                history.push('/profile') 
            }
            else if (result === 'No User Exists'){
                setError('Invalid Email or Password')
            }
           
            }catch{
                setError("Failed to log in")
            }
        setLoading(false)
    }

    return (
        <>
            {loading
            ?
                <div style = {{width: '600px', margin:'auto', textAlign: 'center'}}>{loadingIcon()}</div>
            :
                <>
    
                    <NavBar/>
                    
                    <CenteredContainer>

                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <div className ="alert alert-danger">{error}</div>}
                            <div className="w-100 text-center mt-2">
                                Need an account? <Link to="/signup">Sign Up</Link>
                            </div>
                            <hr/>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" placeholder="Enter email" id="email" name="email" ref={emailRef} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" name="password" ref={passwordRef} required />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>Log In</button>
                            
                            </form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/ForgotPassword">Forget Password?</Link>
                            </div>
                        
                        </div>

                    </div>
                    <Card border="primary" bg="light">
                        <Card.Body>
                            <h5 className="text-center mb-4">Or</h5>
                            <Button variant="success" type="button" block>Log In with Facebook</Button>
                            <a href="http://localhost:8000/google">
                                <Button variant="secondary" type="button" block>Log In with Google</Button>
                            </a>
                        </Card.Body>
                    </Card>
                    </CenteredContainer>
                </>    
            }    
        </>
    
    )
}
