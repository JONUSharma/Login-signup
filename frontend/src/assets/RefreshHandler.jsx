import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setisLoggedIn}) {
    const Navigate = useNavigate(); 
    const location = useLocation();

useEffect(()=> {
    if(localStorage.getItem("token"))
    {
        setisLoggedIn(true);
        if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")
        {
            Navigate("/home",{ replace :false})
        }
    }
},[location,Navigate,setisLoggedIn])
    
  return (
    null
  )
}

export default RefreshHandler
