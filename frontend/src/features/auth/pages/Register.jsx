import React, { useState } from "react";
import "../style/login.scss";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const Register = () => {
  const navigate = useNavigate();

 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const { loading, handleRegister } = useAuth()
  async function handleSubmit(e) {
    e.preventDefault();
  await handleRegister({email ,username,password})

   console.log(response);
    navigate("/");
  }

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
          <h2>Create Account</h2>
          <p>Create your FaceBeat account</p>
        </div>

     <form onSubmit={handleSubmit} className="login-form">

          <div className="input-group">
            <label>Full Name</label>

            <div className="input-box">
              <FiUser className="icon" />

              <input
                type="text"
                placeholder="Enter your full name"/>
            </div>
          </div>

          <div className="input-group">
            <label>Username</label>

            <div className="input-box">
              <FiUser className="icon" />

              <input
                type="text"
                placeholder="Choose a username" value={username}
               onChange={(e) => setUsername(e.target.value)}/>
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>

            <div className="input-box">
              <FiMail className="icon" />

              <input
                type="email"
                placeholder="Enter your email"
               value={email}
             onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <FiLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
               value={password}
              onChange={(e) => setPassword(e.target.value)}/>

              {showPassword ? (
                <FiEyeOff
                  className="icon eye"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FiEye
                  className="icon eye"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <div className="input-box">
              <FiLock className="icon" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"/>

              {showConfirmPassword ? (
                <FiEyeOff
                  className="icon eye"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FiEye
                  className="icon eye"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
          </div>

          <button type="submit">
            Create Account
          </button>

        </form>

       <div className="bottom-text">
  Already have an account?{" "}
  <Link to="/login">Login</Link>
</div>
      </div>
    </div>
  );
};

export default Register
