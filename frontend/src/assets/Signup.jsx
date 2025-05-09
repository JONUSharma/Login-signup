import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { HandleError, HandleSuccess, HandleWarning } from './Toast';
function Signup() {

    const [getValue, setValue] = useState({
        Name: "",
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
        const { Name, Email, Password } = getValue;
        if (!Name || !Password || !Email) {
            return HandleError("name, email and password is required")
        }
        try {
            const url = "https://login-signup-87we.onrender.com/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(getValue)
            });
            const result = await response.json();
            
            const { success, msg,error } = result
            if (success) {
                HandleSuccess(msg);
                setTimeout(() => {
                    Navigate("/login");
                }, 1500)
            }
            else if(error)
            {
                const detail = error?.details[0].message;
                HandleError(detail)
            }
            else if(!success)
            {
                HandleError(msg);
            }
        } catch (error) {
            HandleSuccess("Checking Crediential")
            setTimeout(()=> {
                HandleWarning("Internal server errror");
            },2000)
        }
    }



    return (
        <div className='signup'>
            <div className="container">
                <form action="" onSubmit={HandleSubmit}>
                    <h1>Signup</h1>
                    <div>
                        <label htmlFor="Name"> Name</label>
                        <input type="text" value={getValue.Name} onChange={HandleChange} autoFocus placeholder='Enter your name' name='Name' />
                    </div>
                    <div>
                        <label htmlFor="Email"> Email</label>
                        <input type="email" value={getValue.Email} onChange={HandleChange} placeholder='Enter your Valid email' name='Email' />
                    </div>
                    <div>
                        <label htmlFor="Password"> Password</label>
                        <input type="password" value={getValue.Password} onChange={HandleChange} placeholder='Enter your password' name='Password' />
                    </div>
                    <div>
                        <button type='submit'>Signup</button>
                    </div>
                    <div>
                        <h4>Already have an account  <Link to="/login" className='link'>Login</Link></h4>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup
