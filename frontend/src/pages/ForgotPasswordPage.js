import React from "react";
import axios from "axios";

const ForgotPasswordPage = () => {

    var RECIPIENT_EMAIL;

    const ForgotPassword = async () => {
        const resetLink = 'http://localhost:3000/doreset';
        console.log(RECIPIENT_EMAIL.value);
        try {
            const response = await axios.post('http://localhost:5000/reset-pass', {
              recipientEmail: RECIPIENT_EMAIL.value,
              resetLink: resetLink
            });
            console.log('Email sent successfully:', response.data);
          } catch (error) {
            console.error('Error sending email:', error.response.data);
          }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
            <p style={{ textAlign: "center" }}>Enter the email address associated with the account.</p>
            <input type="text" id="loginName" class="login-user-input-field" placeholder="wizard@email.com" style={{height: '50px', width: '400px'}} ref={(c) => RECIPIENT_EMAIL = c} /><br />
            <button style={{ marginTop: "0px", backgroundColor: "#693c72", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "12px" }}
                onClick={event => ForgotPassword()}>
                Submit
            </button>
        </div>
    );
};

export default ForgotPasswordPage;