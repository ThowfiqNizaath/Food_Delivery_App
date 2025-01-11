import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './LoginPopup.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreProvider'

const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Login")
    const {setToken, token} = useContext(StoreContext)
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData =>({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            let newUrl = import.meta.env.VITE_SERVER_URL;
            if(currState === "Login"){
                newUrl += "/api/user/login"
            }else{
                newUrl += '/api/user/signup'
            }
            const response = await axios.post(newUrl, data);
            if(response.data.success){
                setToken(response.data.token)
                localStorage.setItem("token", `${response.data.token}`);
                setShowLogin(false)
                setData({
                  name: "",
                  email: "",
                  password: "",
                });
            }else{
                alert(response.data.message)
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              onChange={handleChange}
              value={data.name}
              name= "name"
              placeholder="your name"
              required
            />
          )}
          <input
            onChange={handleChange}
            value={data.email}
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={handleChange}
            value={data.password}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agress to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup