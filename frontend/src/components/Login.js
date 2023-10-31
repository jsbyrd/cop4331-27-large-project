import React, { useState } from 'react';
import './Login.css';

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
            const response = await fetch('https://cop4331-27-c6dfafc737d8.herokuapp.com/api/users/login', {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.id === undefined )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
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
                <form onSubmit={doLogin}>
                    <span class="input-field-description">Enter Username</span><br />
                    <input type="text" id="loginName" class="user-input-field" placeholder="wizard@email.com" ref={(c) => loginName = c}/><br />
                    <span class="input-field-description">Enter Password</span><br />
                    <input type="password" id="loginPassword" class="user-input-field" placeholder="Password" ref={(c) => loginPassword = c}/><br />
                    <input type="submit" id="loginButton" class="buttons" value="Login" onClick={doLogin} />
                    <span id="loginResult">{message}</span>
                </form>
            </div>
            <div id="RegisterDiv">
                <p>Don't have an account?</p>
                <input type="button" id="goToRegisterButton" class="buttons" value="Register Account" onClick={event =>  window.location.href='/register'}/>
            </div>
        </div>
    );
};

export default Login;