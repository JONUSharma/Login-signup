import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../index.css"
// import {ReactTyped} from "react-typed"
// import style from "../index.css"
import { HandleError, HandleSuccess } from './Toast';
import { ToastContainer } from 'react-toastify';
import InputData from './Todo/Todo';
function Home() {
  const Navigate = useNavigate();
  const [loginuser, setloginuser] = useState([])

  useEffect(() => {
    setloginuser(localStorage.getItem("LoggedInUser"));
  }, []);

  const HandleLogout = () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("LoggedInUser")
      HandleSuccess("Logout successfully")
      setTimeout(() => {
        Navigate("/login")
      }, 1500);
    } catch (error) {
      HandleError(error);
    }
  }

  return (
    <div className='home'>
      <nav className='nav'>
        <h1 className="h1">Welcome {loginuser}</h1>
        <button className="btn" onClick={HandleLogout}>Logout</button>
      </nav>
      <div>
        {/* <ReactTyped strings={["Here you can find anything"]} typeSpeed={40} backSpeed={50} loop /> */}
      </div>
      <InputData />
      <ToastContainer />
    </div>
  )
}

export default Home
