"use client"
import React,{createContext,useContext, useRef, useState} from 'react'

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
    const [open,setopen] = useState(true)
    return(
        <AuthContext.Provider value={{scroll,setopen,open}}>
        {children}
        </AuthContext.Provider>
        )
}

export default Context