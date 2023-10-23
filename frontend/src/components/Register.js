import React, { useState } from 'react';

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
            const response = await fetch('https://cop4331-27-c6dfafc737d8.herokuapp.com/api/users/register', {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
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
        <form onSubmit={doRegister}>
            <span id="registerinfo">Please fill required fields</span><br />
                <input type="text" id="registerLogin" placeholder="Username" ref={(c) => registerLogin = c}/><br />
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c}/><br />
                <input type="text" id="firstName" placeholder="First Name" ref={(c) => rFirstName = c}/><br />
                <input type="text" id="lastName" placeholder="Last Name" ref={(c) => rLastName = c}/><br />
                <input type="email" id="email" placeholder="Email" ref={(c) => rEmail = c}/><br />
                <input type="submit" id="registerButton" class="buttons" value="Submit" onClick={doRegister}/>
            <span id="registerResult">{message}</span>
        </form>
     </div>
    );
};

export default Register;