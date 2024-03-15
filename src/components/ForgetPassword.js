import React, { useState } from "react";
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const sendResetEmail = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        const errorData = await response.json();
        alert(`Failed to send reset email. ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="body1">
      <img src={process.env.PUBLIC_URL + '/img/gify.gif'} alt="Login Image" className="login-image" />

      <div className="wrapper">
        <form>
          <h2>Forget Password</h2>
            <div>
              <p>Enter your email address</p>
              <div className="input-box">
                <span className="icon"><ion-icon name="person"></ion-icon></span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                className="button"
                type="button"
                onClick={sendResetEmail}>Send Reset Email</button>
            </div>
        </form>
       
      </div>
    </div>
  );
};

export default ForgetPassword;
