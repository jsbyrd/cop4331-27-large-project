import React, { useState } from 'react';
import axios from 'axios';
import DefaultHeader from '../components/DefaultHeader.js';
import DefaultFooter from '../components/DefaultFooter.js';
const path = require('../components/Path.js');

const VerificationPage = () => {
  const [resent, setResent] = useState(false);
  const sendEmail = async () => {

    setResent(true);
    const local = JSON.parse(localStorage.getItem('user_data'));
    const baseUrl = "https://cop4331-27-c6dfafc737d8.herokuapp.com/doverify";
    const queryParams = {
      login: local.login,
      password: local.password,
    };
    const encodedParams = []
    // Encode each query parameter
    Object.entries(queryParams).forEach(([key, value]) => {
      encodedParams.push(`${key}=${encodeURIComponent(value)}`);
    });
    // Construct the URI with encoded query parameters
    const uriWithParams = `${baseUrl}?${encodedParams.join("&")}`;

    console.log(`Final URI with encoded query parameters: ${uriWithParams}`);
    const verifyLink = uriWithParams;
    const RECIPIENT_EMAIL = local.email;

    try {
      const response = await axios.post(path.buildPath('/send-email'), {
        recipientEmail: RECIPIENT_EMAIL,
        verifyLink: verifyLink
      });
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email');
    }
  };

  return (
    <div>
      <DefaultHeader />
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
          {resent == false && (
            <><p style={{ textAlign: "center" }}>Registration Successful. A verification email has been sent to {JSON.parse(localStorage.getItem('user_data')).email}.</p>
            <button className="btn me-3 text-light" id='default-body-left-btn' type='button' style={{ marginTop: "20px", color: "white", padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "12px" }}
            onClick={event => sendEmail()}>
              Resend Email
            </button></>
          )}
          {resent && (
            <><p style={{ textAlign: "center" }}>Additional verification email has been sent to {JSON.parse(localStorage.getItem('user_data')).email}.</p></>
          )}
      </div>
      <DefaultFooter />
    </div>
  );
};

export default VerificationPage;
