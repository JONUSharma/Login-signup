import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './assets/Login'
import Signup from './assets/Signup'
import Home from './assets/Home'
import "react-toastify/ReactToastify.css"
import "./App.css"
import RefreshHandler from './assets/RefreshHandler'
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />
  }
  return (
    <div>
      <RefreshHandler setisLoggedIn={setisLoggedIn} />
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}></Navigate>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<PrivateRoute element={<Home />} />}></Route>
      </Routes>
    </div>
  )
}

export default App
