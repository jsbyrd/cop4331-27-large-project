import React from 'react';

import LoginTitle from '../components/LoginTitle'
import Login from '../components/Login'

const LoginPage = () =>
{

    return(
      <div className="login-background">
          <div className="login-foreground">
            <LoginTitle />
            <div id="login-page-container">
              <Login />
          </div>
          <div className="login-image">
            image here
          </div>
        </div>
      </div>
    );
};

export default LoginPage;