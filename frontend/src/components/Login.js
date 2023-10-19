import React, { useState } from 'react';

function Login()
{
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
            const response = await fetch('https://cop4331-27-c6dfafc737d8.herokuapp.com/api/users', {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.id <= 0 )
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
        <div>
            <div id="loginDiv">
                <form onSubmit={doLogin}>
                    <span id="inner-title">Enter Username and Password</span><br />
                        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}/><br />
                        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}/><br />
                        <input type="submit" id="loginButton" class="buttons" value="Login" onClick={doLogin} />
                    <span id="loginResult">{message}</span>
                </form>
            </div>
            <div id="RegisterDiv">
                <input type="button" id="goToRegisterButton" class="buttons" value="Register Account" onClick={window.location.href = '/g'}/>
            </div>
        </div>
    );
};

export default Login;