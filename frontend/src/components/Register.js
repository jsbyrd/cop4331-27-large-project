import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
const path = require('./Path.js');
const pc = require('../components/passwordComplexity.js');

function Register()
{
    var registerLogin;
    var registerPassword;
    var rFirstName;
    var rLastName;
    var rEmail;

    const [message,setMessage] = useState('');

    // const passwordComplexityCheck = (password) => {
    //     const containsNumber = /\d/.test(password); 
    //     const containsUppercaseLetter = /[A-Z]/.test(password);
    //     console.log(password);
    //     console.log(containsNumber);
    //     if (!containsNumber) return "** Password must include a number **";
    //     if (!containsUppercaseLetter) return "** Password must include an uppercase letter **";
    //     return "password is good"
    // }

    const sendEmail = async () => {

        const local = JSON.parse(localStorage.getItem('user_data'));
        const baseUrl = "https://cop4331-27-c6dfafc737d8.herokuapp.com/doverify";
        const queryParams = {
            login: local.login,
            password: registerPassword.value,
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
          const response = await axios.post(path.buildPath('/send-email'), {
            recipientEmail: RECIPIENT_EMAIL,
            verifyLink: verifyLink
          });
  
          //console.log('Email sent successfully:', response.data);
        } catch (error) {
          //console.error('Error sending email:', error.response.data);
        }
      };

    const doRegister = async event => 
    {
        event.preventDefault();

        // Check for password complexity
        const passwordMessage = pc.passwordComplexityCheck(registerPassword.value);
        if (passwordMessage !== "password is good") {
            setMessage(passwordMessage);
            return;
        }

        var obj = {login:registerLogin.value,password:registerPassword.value,firstName:rFirstName.value,lastName:rLastName.value,email:rEmail.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(path.buildPath('/api/users/register'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.error !== '' )
            {
                setMessage('Unable to Register');
            }
            else
            {
                var user = {email:res.email, login:res.login, password:registerPassword.value}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                sendEmail();
                window.location.href = '/verify';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
      <div id="registerDiv">
        <h1 id='register-title'>Register</h1>
        <form id="register-form" onSubmit={doRegister}>
            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Username</span><br />
                <input required type="text" id="registerLogin" class="register-user-input-field" placeholder="Username" ref={(c) => registerLogin = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Password</span><br />
                <input required type="password" id="registerPassword" class="register-user-input-field" placeholder="Password" ref={(c) => registerPassword = c}/><br />
                <p id='password-requirements'>** Password must contain a number and an uppercase letter **</p>
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter First Name</span><br />
                <input required type="text" id="firstName" class="register-user-input-field" placeholder="First Name" ref={(c) => rFirstName = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Last Name</span><br />
                <input required type="text" id="lastName" class="register-user-input-field" placeholder="Last Name" ref={(c) => rLastName = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Email</span><br />
                <input required type="email" id="email" class="register-user-input-field" placeholder="Email" ref={(c) => rEmail = c}/><br />
            </div>
            <div id='submit-btn-container'>
                <input type="submit" id="registerButton" class="buttons" value="Submit" onClick={doRegister}/>
                <span id="registerResult" style={{color="red"}}><b>{message}</b></span>
            </div>
        </form>
            <div id="LoginDiv">
                <p>Already have an account?</p>
                <input type="button" id="goToLoginButton" class="buttons" value="Back to Login" onClick={event =>  window.location.href='/login'}/>
            </div>
     </div>
     
    );
};

export default Register;
