import React, { Component } from 'react';
import { useAuth } from '../Context/AuthContext';



export default function NavBar(){
    const { currentUser } = useAuth()

    return (
        <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
           
            <a className="navbar-brand" href="/" style={{fontFamily: 'Dancing Script'}}>Meetup</a>
  
  
            <ul className="navbar-nav">
                { currentUser ? 

                <>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/logout">Log out</a>
                    </li>
                </> :
                <>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Log in</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">Sign up</a>
                    </li>
                </>
                }
            </ul>

        </nav>
        </>
    )
}