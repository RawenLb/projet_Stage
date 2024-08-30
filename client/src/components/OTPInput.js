import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { RecoveryContext } from "./App";
import { useNavigate } from 'react-router-dom';
import "../styles/otp.css";

export default function OTPVerification() {
  const { setemail, email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
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
    if (enteredOTP === otp) {
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
    <main className="main-content main-content-bg mt-0 ps">
      <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/verification-cover.jpg')" }}>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-7">Good evening!</h1>
              <p className="text-lead text-white">Use these awesome forms to login or create a new account in your project for free.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card mb-5">
              <div className="card-body px-lg-5 py-lg-5 text-center">
                <div className="text-center text-muted mb-4">
                  <h2>2-Step Verification</h2>
                </div>
                <div className="row gx-2 gx-sm-3">
                  {OTPinput.map((value, index) => (
                    <div className="col" key={index}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          maxlength="1"
                          autocomplete="off"
                          autocapitalize="off"
                          value={value}
                          onChange={(e) => {
                            const newOTP = [...OTPinput];
                            newOTP[index] = e.target.value;
                            setOTPinput(newOTP);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn bg-gradient-warning w-100"
                    onClick={verifyOTP}
                  >
                    Send code
                  </button>
                  <span className="text-muted text-sm">
                    Haven't received it?
                    <a
                      href="javascript:;"
                      onClick={resendOTP}
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                    >
                      {disable ? ` Resend OTP in ${timerCount}s` : " Resend a new code"}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
