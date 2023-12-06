import React from 'react';
import Register from '../components/Register'

const RegisterPage = () =>
{

    return(
      <div className="register-background">
          <div className="register-foreground">
            <div id="register-page-container">
              <Register />
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;