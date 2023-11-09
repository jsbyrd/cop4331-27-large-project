import React,
        { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import logo from './images/logo.png'

const MenuHeader = () => {

  // Search bar utilization =====
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Complete the search
  const goToSearch = async (type) => {
    if (type == 2)
      navigate('/search/savedQuizzes', { state:2 });
    else if (type == 3)
      navigate('/search/myQuizzes', { state:3 })
    else if (searchQuery.trim() !== '') {
        navigate(`/search/${searchQuery}`, { state:1 });
    }
    else {
        alert('Please enter a search query.');
    }
  }
  // Detect enter
  const keyDownHandler = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      goToSearch(1);
    }
  }
  // ============================

  return (
    <header>
      <nav className="navbar navbar-expand-lg d-flex flex-nowrap justify-content-between w-100 menu-navbar-custom" id='default-header-navbar'>
        <a className="nav-link text-light" id='default-header-logo' href="/" style={{ marginLeft: "20px" }}>
          <img src={logo} id='menu-header-logo' />
        </a>
        <div className='d-flex align-items-center'>
          <form class="form-inline">
            <input onKeyDown={keyDownHandler}
              onChange={(e) => setSearchQuery(e.target.value)}
              class="form-control mr-sm-2" id='searched-searchbar' type="text" value={searchQuery} placeholder="Search" aria-label="Search"
            />
          </form>
        </div>
        <div className="d-flex align-items-center" style={{ marginRight: "20px" }}>
          <button type="button" className="btn px-3 text-light" id='default-header-login-btn' onClick={event => goToSearch(2)}>
            Saved Quizzes
          </button>
          <button type="button" className="btn btn-primary me-3" id='default-header-register-btn' onClick={event => goToSearch(3)}>
            My Quizzes
          </button>
        </div>
      </nav>
    </header>

  );
}

export default MenuHeader;