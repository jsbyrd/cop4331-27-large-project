import React from 'react';
import logo from './images/logo.png'

const DefaultHeader = () => {

  const goToLogin = () => {
    window.location.href = "/login"
  }

  const goToRegister = () => {
    window.location.href = "/register"
  }

  return (
    <header className='position-sticky top-0'>
      <nav className="navbar navbar-expand-lg d-flex flex-nowrap justify-content-between w-100 default-navbar-custom" id='default-header-navbar'>
        <img id='default-header-logo' src={logo}/>
        <div className="d-flex align-items-center" style={{marginRight: "20px"}}>
          <button type="button" className="btn px-3 text-light" id='default-header-login-btn' onClick={goToLogin}>
            Login
          </button>
          <button type="button" className="btn btn-primary me-3" id='default-header-register-btn' onClick={goToRegister}>
            Sign up for free
          </button>
        </div>
      </nav>
    </header>
      
  );
}

export default DefaultHeader;