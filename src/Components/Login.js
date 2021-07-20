import React, { useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../Context/AuthContext';
import CenteredContainer from './CenteredContainer';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, getGoogleAccount } = useAuth()
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
            console.log(result.data)
            if (result.data == 'log in successfully'){
                history.push('/profile') 
            }
           
            }catch{
                setError("Failed to log in")
            }
        setLoading(false)
    // }
        // setError("")
        // setLoading(true)
        // const newUser = {
        //     email: emailRef.current.value,
        //     password: passwordRef.current.value
        // }
        // login(newUser).then((req, res) => {
        //     // if (res.data === 'log in successfully'){
        //     //     history.push('/profile')
        //     // }
        //     console.log(res.json())
        // }).catch(err => {
        //     console.log(err)
        //     setError('Failed to log in')
        // })
        // setLoading(false)
    }

    function handleLogInWithGoogle(){
        getGoogleAccount().then((req, res) => {
            console.log(res.data)
            if (res.data == 'success'){
                history.push('/profile')
            }
            
        }).catch((err) => console.log(err))
     }


   

    return (
        
        <CenteredContainer>

        <Link to="/">Homepage</Link>

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
                    <Link to="#">Forget Password?</Link>
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
    )
}