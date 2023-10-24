import React from 'react';
import Register from '../components/Register'
import RegisterTitle from '../components/RegisterTitle'

const RegisterPage = () =>
{

    return(
      <div className="register-background">
          <div className="register-foreground">
            <RegisterTitle />
            <div id="register-page-container">
              <Register />
          </div>
          <div className="register-image">
            image here
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;