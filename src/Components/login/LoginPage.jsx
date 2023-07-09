import React from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import NavBar from "../NavBar";

function LoginPage() {
  const { pathname } = useLocation();

  const renderPage = (pathname) => {
    switch (pathname) {
      case "/signup":
        return <Signup />;
      case "/login":
        return <Login />;
      default:
        return <ForgotPassword />;
    }
  };

  return (
    <>
      <NavBar />
      {renderPage(pathname)}
    </>
  );
}

export default LoginPage;
