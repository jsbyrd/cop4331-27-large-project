import React, { useState } from 'react';
import './Login.css';

const path = require('./Path.js');

const Login = () => {

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(path.buildPath('/api/users/login'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.result === undefined )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                console.log(res.result);
                var user = {firstName:res.result.firstName,lastName:res.result.lastName,id:res.result.id,token:res.result.token}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/menu';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div id="loginDivContainer">
            <div id="loginDiv">
                <form id="login-form" onSubmit={doLogin}>
                    <div className="input-field-container">
                        <span class="login-input-field-description">Enter Username</span><br />
                        <input type="text" id="loginName" class="login-user-input-field" placeholder="wizard@email.com" ref={(c) => loginName = c}/><br />
                    </div>

                    <div className="input-field-container">
                        <span class="login-input-field-description">Enter Password</span><br />
                        <input type="password" id="loginPassword" class="login-user-input-field" placeholder="Password" ref={(c) => loginPassword = c}/><br />
                    </div>
                    <input type="submit" id="loginButton" class="buttons" value="Login" onClick={doLogin} />
                    <span id="loginResult">{message}</span>
                </form>
            </div>
            <div id="RegisterDiv">
                <p>Don't have an account?</p>
                <input type="button" id="goToRegisterButton" class="buttons" value="Register Account" onClick={event =>  window.location.href='/register'}/>
            </div>
            <div id="RegisterDiv">
                <input type="button" id="goToRegisterButton" class="buttons" value="Forgot Password?" onClick={event => window.location.href='/reset'}/>
            </div>
        </div>
    );
};

export default Login;