import React from "react";
import { useAuth } from "../Context/AuthContext";

export default function NavBar() {
  const { currentUser, handleLogOut } = useAuth();
  // console.log(currentUser);

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
        <a
          className="navbar-brand"
          href="/"
          style={{ fontFamily: "Dancing Script" }}
        >
          Meetup
        </a>

        <ul className="navbar-nav">
          {currentUser != null ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/newGroup">
                  Start a new group
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/myEvents">
                  My events
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Log in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
