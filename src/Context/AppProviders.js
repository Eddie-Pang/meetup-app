import React from 'react';
import {AuthProvider} from '../Context/AuthContext';
import UserDataContextProvider from '../Context/UserDataContext';
import { CategoryProvider } from './CategoryContext';






function AppProviders({children}) {
  return (
      <AuthProvider>
        <UserDataContextProvider>
          <CategoryProvider>
            {children}
          </CategoryProvider>
        </UserDataContextProvider>
      </AuthProvider>
    )};


export default AppProviders;