import React from 'react';
import './Menu.css';
import logo from './images/logo.png'

const MenuHeader = () => {

  const goToLogin = () => {
    window.location.href = "/login"
  }

  const goToRegister = () => {
    window.location.href = "/register"
  }

  return (
    <header className='position-sticky top-0'>
      <nav className="navbar navbar-expand-lg d-flex flex-nowrap justify-content-between w-100 menu-navbar-custom" id='default-header-navbar'>
        <a className="nav-link text-light" id='default-header-logo' href="/" style={{marginLeft: "20px"}}>
          <img src={logo} id='menu-header-logo'/>
        </a>
        <div className='d-flex align-items-center'>
          <form class="form-inline">
            <input class="form-control mr-sm-2" id='menu-searchbar' type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
        <div className="d-flex align-items-center" style={{marginRight: "20px"}}>
          <button type="button" className="btn px-3 text-light" id='default-header-login-btn' onClick={event =>  window.location.href='/search'}>
            Saved Quizzes
          </button>
          <button type="button" className="btn btn-primary me-3" id='default-header-register-btn' onClick={event =>  window.location.href='/search'}>
            My Quizzes
          </button>
        </div>
      </nav>
    </header>
      
  );
}

export default MenuHeader;