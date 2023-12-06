import React, { useState } from "react";
import axios from "axios";
import DefaultHeader from '../components/DefaultHeader';
import DefaultFooter from '../components/DefaultFooter.js';
const path = require('../components/Path.js');

const ForgotPasswordPage = () => {

  const [RECIPIENT_EMAIL, setRECIPIENT_EMAIL] = useState('');
  const [RECIPIENT_USERNAME, setRECIPIENT_USERNAME] = useState('');
  const [recievedUser, setRecievedUser] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState('');

  const AcquireEmail = async () => {
    var obj = { login: RECIPIENT_USERNAME };
    console.log(RECIPIENT_USERNAME);
    var js = JSON.stringify(obj);
    console.log(obj);
    try {
      const response = await fetch(path.buildPath('/api/users/getemail'), { method: 'post', body: js, headers: { 'Content-Type': 'application/json' } });
      var res = JSON.parse(await response.text());
      if (res.result == null) {
        setMessage("No account found with entered username");
      }
      else {
        setRECIPIENT_EMAIL(res.result.Email);
        await ForgotPassword(res.result.Email);
        return 0;
      }
    }
    catch (e) {
      alert(e.toString());
      return;
    }
  }

  const ForgotPassword = async (email) => {
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
        recipientEmail: email,
        resetLink: uriWithParams
      });
      console.log('Email sent successfully');
      setMessage('');
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email');
    }
  }

  return (
    <div>
      <DefaultHeader />
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
        {emailSent == false && (
          <><p style={{ textAlign: "center" }}>Enter the username associated with the account.</p>
            <input type="text" id="loginName" class="login-user-input-field" placeholder="Wizard54" style={{ height: '50px', width: '400px' }} onChange={(e) => setRECIPIENT_USERNAME(e.target.value)} /><br />
            <div style={{ height: "20px" }}></div>
            <div style={{ height: "20px" }}>
              <button className="btn me-3 text-light" id='default-body-left-btn' style={{ marginTop: "20px", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "12px" }}
                onClick={event => AcquireEmail()}>
                Submit
              </button>
            </div>
            <div style={{ height: "20px ", marginTop:"-50px"}}>
              <p style={{color: "red", textAlign: "center"}}>{message}</p>
            </div>
          </>
        )}
        {emailSent && (
          <p style={{ textAlign: "center" }}>An email has been sent to {RECIPIENT_EMAIL}. Check your inbox to reset your password.</p>
        )}
      </div>
      <DefaultFooter />
    </div>
  );
};

export default ForgotPasswordPage;