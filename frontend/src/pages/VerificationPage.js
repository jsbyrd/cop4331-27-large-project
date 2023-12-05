import React, { useEffect } from 'react';
import axios from 'axios';
const path = require('../components/Path.js');

const VerificationPage = () => {

  const sendEmail = async () => {

    const local = JSON.parse(localStorage.getItem('user_data'));
    const baseUrl = "https://cop4331-27-c6dfafc737d8.herokuapp.com/doverify";
    const queryParams = {
        login: local.login,
        password: local.password,
    };
    const encodedParams = [];

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
      const response = await axios.post(path.Build('/send-email'), {
        recipientEmail: RECIPIENT_EMAIL,
        verifyLink: verifyLink
      });

      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error.response.data);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
      <p style={{ textAlign: "center" }}>Registration Successful. A verification email has been sent to {JSON.parse(localStorage.getItem('user_data')).email}.</p>
      <button style={{ marginTop: "20px", backgroundColor: "#693c72", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "12px" }}
      onClick={event => sendEmail()}>
        Did not receive an email?
      </button>
    </div>
  );
};

export default VerificationPage;
