import React from "react";
import { AuthProvider } from "../Context/AuthContext";
import UserDataContextProvider from "../Context/UserDataContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserDataContextProvider>{children}</UserDataContextProvider>
    </AuthProvider>
  );
}

export default AppProviders;
