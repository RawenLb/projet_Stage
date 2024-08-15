import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { RecoveryContext } from "./App";
import { useNavigate } from 'react-router-dom';
import "../styles/otp.css";

export default function OTPVerification() {
  const { setemail,email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  
  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
      setemail(email);
    
  }

  function verifyOTP() {
    const enteredOTP = parseInt(OTPinput.join(""));
    console.log("Entered OTP:", enteredOTP);
    console.log("Expected OTP:", otp);
    console.log('email',email);

    if (enteredOTP === otp) {
      console.log("OTP Verified. Navigating to reset page...");
      setPage("reset");
      navigate('/reset');
    } else {
      alert("The code you have entered is not correct, try again or re-send the link");
    }
  }
  

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="otp-container">
      <div className="otp-box">
        <div className="otp-content">
          <div className="otp-header">
            <h1>Email Verification</h1>
            <p>We have sent a code to your email {email}</p>
          </div>

          <form>
            <div className="otp-inputs">
              {OTPinput.map((_, index) => (
                <input
                  key={index}
                  maxLength="1"
                  className="otp-input"
                  type="text"
                  onChange={(e) => {
                    const newOTP = [...OTPinput];
                    newOTP[index] = e.target.value;
                    setOTPinput(newOTP);
                  }}
                />
              ))}
            </div>

            <div className="otp-actions">
              <button
                type="button"
                className="otp-verify-btn"
                onClick={verifyOTP}
              >
                Verify Account
              </button>

              <p className="otp-resend">
                Didn't receive code?{" "}
                <span
                  className="otp-resend-link"
                  style={{
                    color: disable ? "gray" : "blue",
                    cursor: disable ? "none" : "pointer",
                    textDecorationLine: disable ? "none" : "underline",
                  }}
                  onClick={resendOTP}
                >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
