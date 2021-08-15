import React, { Component } from 'react';
import { useAuth } from '../Context/AuthContext';



export default function NavBar(){
    const { currentUser, handleLogOut } = useAuth()
   

    return (
        <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
           
            <a className="navbar-brand" href="/" style={{fontFamily: 'Dancing Script'}}>Meetup</a>
  
  
            <ul className="navbar-nav">
                { currentUser ? 

                <>
                    
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/newGroup">Start a new group</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/myEvents">My events</a>
                    </li> */}
                       <li className="nav-item">
                        <div className="dropdown">
                            <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown">
                            Events
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/newGroup">Start new events</a>
                                <a className="dropdown-item" href="/myEvents">Manage my events </a>
                                
                            </div>
                        </div>
                    </li>

            
                    <li className="nav-item">
                        <div className="dropdown">
                            <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown">
                            {currentUser?.name}
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Reset password</a>
                                <a className="dropdown-item" href="/profile">Profile</a>
                                
                            </div>
                        </div>
                    </li>
                    
                    <li className="nav-item">
                        <button type="button" className="btn btn-dark" onClick={handleLogOut}>Log out</button>
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