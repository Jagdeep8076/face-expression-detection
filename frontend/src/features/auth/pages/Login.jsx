import React, { useState } from "react";
import "../style/login.scss";
import { FiMail, FiLock, FiEye } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/auth.api"

const Login = () => {

const {  loading ,handleLogin } = useAuth()

async function handleSumbit(e){
  e.preventDefalut()

}
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="brand">
          <img
            src={logo}
            alt="FaceBeat Logo"
            className="brand-logo"/>
        </div>

        <p className="tagline">
          Feel the music. See the beat.
        </p>
        <div className="heading">
          <h2>Welcome Back</h2>
          <p>Login to continue to your account</p>
        </div>
        <form onSubmit={handleSumbit} className="login-form">

          <div className="input-group">
            <label>Email</label>

            <div className="input-box">
              <FiMail className="icon" />

              <input
                type="email"
                placeholder="Enter your email" />
            </div>
          </div>
          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <FiLock className="icon" />

             <input
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"/>
<FiEye
  className="icon eye"
  onClick={() => setShowPassword(!showPassword)}/>
            </div>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">
            Login</button>
        </form>
            <div className="bottom-text">
          Already have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;