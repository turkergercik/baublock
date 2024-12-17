"use client"
import React,{createContext,useContext, useRef} from 'react'

export const AuthContext = createContext();

export const useAuthorization = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Error');
      }
      return context;
  };

function Context({children}) {
    const scroll = useRef(0)
    return(
        <AuthContext.Provider value={{scroll}}>
        {children}
        </AuthContext.Provider>
        )
}

export default Context