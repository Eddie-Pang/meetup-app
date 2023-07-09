import React, { useContext, useEffect, useState } from "react";

import { logout } from "../services/authService";
import { getAccount } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { getUserObject } from "../services/authService";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ status: "init", user: null, error: null });

  const navigate = useNavigate();

  const handleLogOut = async () => {
    let result = await logout();
    localStorage.removeItem("token");
    getUser();
    if (result.status === 200) {
      navigate("/");
    }
  };

  // useEffect(()=>{
  //     console.log(currentUser)
  //     setCurrentUser(currentUser);

  // },[currentUser])

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  async function getUser() {
    let userObject = getUserObject();

    let isMounted = true;
    try {
      if (!userObject) {
        setCurrentUser(null);
        return;
      }
      if (isMounted) {
        setLoading(true);
        const res = await getAccount();
        // console.log(res);
        if (res.status === 200) {
          setCurrentUser(res.data);
        }
        return () => {
          isMounted = false;
        };
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const isAuth = getUserObject() != null ? true : false;

  const value = {
    currentUser,
    loading,
    handleLogOut,
    getUser,
    isAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
