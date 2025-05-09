import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { HandleSuccess, HandleError, HandleWarning } from './Toast';
import { ToastContainer } from "react-toastify"

function Login() {

    const [getValue, setValue] = useState({
        Email: "",
        Password: ""
    });
    const Navigate = useNavigate();
    const HandleChange = (e) => {
        const { name, value } = e.target;
        const signupinfo = { ...getValue }
        signupinfo[name] = value;
        setValue(signupinfo)
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Password } = getValue;
        if (!Password || !Email) {
            return HandleError(" email and password is required")
        }
        try {
            const url = "http://localhost:2020/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(getValue)
            });
            const result = await response.json();

            const { success, jwtToken, Name, msg, error } = result;

            if (success) {
                HandleSuccess(msg);
                localStorage.setItem("token", jwtToken); // jwtToken hash password
                localStorage.setItem("LoggedInUser", Name); // Show the loggin user by name of user
                setTimeout(() => {
                    Navigate("/home");
                }, 1500)
            }
            else if (error) {
                const detail = error?.details[0].message;
                HandleError(detail)
            }
            else if (!success) {
                HandleError(msg);
            }
        } catch (error) {
            HandleWarning("Server error");
        }
    }

    return (
        <div className='login'>
            <div className="container">
                <form action="" onSubmit={HandleSubmit}>
                    <h1>Login</h1>

                    <div>
                        <label htmlFor="Email"> Email</label>
                        <input type="email" value={getValue.Email} onChange={HandleChange} placeholder='Enter your Valid email' name='Email' />
                    </div>
                    <div>
                        <label htmlFor="Password"> Password</label>
                        <input type="password" value={getValue.Password} onChange={HandleChange} placeholder='Enter your password' name='Password' />
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                    <div>
                        <h4>Do not have an account <Link to="/signup" className='link'>Signup</Link></h4>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login
