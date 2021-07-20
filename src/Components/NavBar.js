import React, { Component } from 'react';


export default function NavBar(){
    return (
        <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
           
            <a className="navbar-brand" href="/" style={{fontFamily: 'Dancing Script'}}>Meetup</a>
  
  
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/login">Log in</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup">Sign up</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/profile">Profile</a>
                </li>
            </ul>

        </nav>
        </>
    )
}