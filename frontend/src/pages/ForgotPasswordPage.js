import React, { useState } from "react";
import axios from "axios";
import DefaultHeader from '../components/DefaultHeader';
import DefaultFooter from '../components/DefaultFooter.js';
const path = require('../components/Path.js');

const ForgotPasswordPage = () => {

  var RECIPIENT_EMAIL;
  const [RECIPIENT_USERNAME, setRECIPIENT_USERNAME] = useState('');
  const [recievedUser, setRecievedUser] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const UpdateUsername = async () => {
    setRecievedUser(true);
  }

  const ForgotPassword = async () => {
    const resetLink = "https://cop4331-27-c6dfafc737d8.herokuapp.com/doreset";
    const queryParams = {
      login: RECIPIENT_USERNAME
    };
    const encodedParams = [];
    // Encode each query parameter
    Object.entries(queryParams).forEach(([key, value]) => {
      encodedParams.push(`${key}=${encodeURIComponent(value)}`);
    });
    // Construct the URI with encoded query parameters
    const uriWithParams = `${resetLink}?${encodedParams.join("&")}`;
    try {
      const response = await axios.post(path.buildPath('/reset-pass'), {
        recipientEmail: RECIPIENT_EMAIL.value,
        resetLink: uriWithParams
      });
      console.log('Email sent successfully:', response.data);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error.response.data);
    }
  }

  return (
    <div>
      <DefaultHeader />
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
      {recievedUser && (
        <><p style={{ textAlign: "center" }}>Enter the email address associated with the account.</p>
          <input type="text" id="loginName" class="login-user-input-field" placeholder="wizard@email.com" style={{ height: '50px', width: '400px' }} ref={(c) => RECIPIENT_EMAIL = c} /><br />
          <div style={{ height: "20px" }}>
            {emailSent && (
              <p style={{ marginTop: "-20px", color: "white" }}>An email has been sent. Please check your inbox to reset your password.</p>
            )}
          </div>
          <div style={{ height: "20px" }}>
            {!emailSent && (
              <button className="btn me-3 text-light" id='default-body-left-btn' style={{ marginTop: "20px", color: "white", padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "12px" }}
                onClick={event => ForgotPassword()}>
                Submit
              </button>
            )}
          </div></>
      )}
      {recievedUser == false && (
        <><p style={{ textAlign: "center" }}>Enter the username associated with the account.</p>
          <input type="text" id="loginName" class="login-user-input-field" placeholder="Wizard54" style={{ height: '50px', width: '400px' }} onChange={(e) => setRECIPIENT_USERNAME(e.target.value)} /><br />
          <div style={{ height: "20px" }}></div>
          <div style={{ height: "20px" }}>
          <button className="btn me-3 text-light" id='default-body-left-btn' style={{ marginTop: "20px", color: "white", padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "12px" }}
              onClick={event => UpdateUsername()}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
        <DefaultFooter />
    </div>
  );
};

export default ForgotPasswordPage;