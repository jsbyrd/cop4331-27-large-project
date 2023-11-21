import React, { useState } from 'react';
import './Register.css';
const path = require('./Path.js');

function Register()
{
    var registerLogin;
    var registerPassword;
    var rFirstName;
    var rLastName;
    var rEmail;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();

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
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/'
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
        <form id="register-form" onSubmit={doRegister}>
            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Username</span><br />
                <input type="text" id="registerLogin" class="register-user-input-field" placeholder="Username" ref={(c) => registerLogin = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Password</span><br />
                <input type="password" id="registerPassword" class="register-user-input-field" placeholder="Password" ref={(c) => registerPassword = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter First Name</span><br />
                <input type="text" id="firstName" class="register-user-input-field" placeholder="First Name" ref={(c) => rFirstName = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Last Name</span><br />
                <input type="text" id="lastName" class="register-user-input-field" placeholder="Last Name" ref={(c) => rLastName = c}/><br />
            </div>

            <div className="register-input-field-container">
                <span class="register-input-field-description">Enter Email</span><br />
                <input type="email" id="email" class="register-user-input-field" placeholder="Email" ref={(c) => rEmail = c}/><br />
            </div>
            <input type="submit" id="registerButton" class="buttons" value="Submit" onClick={doRegister}/>
            <span id="registerResult">{message}</span>
        </form>
            <div id="LoginDiv">
                <p>Already have an account?</p>
                <input type="button" id="goToLoginButton" class="buttons" value="Back to Login" onClick={event =>  window.location.href='/login'}/>
            </div>
     </div>
     
    );
};

export default Register;