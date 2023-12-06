import React, { useState } from 'react';
import wizard1 from '../components/images/wizard1.png';
import './LoginPage.css';

const path = require('../components/Path.js');

const LoginPage = () => {
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
      <div className="login-background">
        <div className="login-foreground">
          <h1 id="login-title">Login</h1>
          <div id="login-page-container">
            <div id="loginDivContainer">
              <div id="loginDiv">
                <form id="login-form" onSubmit={doLogin}>
                  <div className="input-field-container">
                    <span class="login-input-field-description">Enter Username</span><br />
                    <input type="text" id="loginName" class="login-user-input-field" placeholder="Wizard123" ref={(c) => loginName = c}/><br />
                  </div>
                  <div className="input-field-container">
                    <span class="login-input-field-description">Enter Password</span><br />
                    <input type="password" id="loginPassword" class="login-user-input-field" placeholder="Password" ref={(c) => loginPassword = c}/><br />
                  </div>
                  <button id="loginButton" class="buttons">Login</button>
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
        </div>
        <div className="login-image">
          <img id='wizard1-img' src={wizard1} alt='An owl wearing a wizard hat' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;