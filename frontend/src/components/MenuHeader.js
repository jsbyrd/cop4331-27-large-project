import React,
        { useState, 
          useRef,
          useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import logo from './images/logo.png'
import Search from './Searched';

const MenuHeader = () => {

  // Sidebar utilization ========
  const [isSideBar, setIsSideBar] = useState(false);
  const sideBarRef = useRef(null);

  const toggleSideBar = () =>
  {
    console.log("PRE | Side bar out: ", isSideBar);
    setIsSideBar(!isSideBar);
    console.log("POST | Side bar out: ", isSideBar);

    if (isSideBar) {
      // Attach the event listener when opening the sidebar
      document.addEventListener('click', closeSideBar);
    } else {
      // Remove the event listener when closing the sidebar
      document.removeEventListener('click', closeSideBar);
    }
  };

  const closeSideBar = (event) => {
    console.log(event.target);
    console.log(sideBarRef.current);
    console.log(!sideBarRef.current.contains(event.target));
    console.log(isSideBar);
    if (isSideBar && !sideBarRef.current.contains(event.target)) {
      console.log("Closing side bar");
      setIsSideBar(!isSideBar);
    }
  };

  // Search bar utilization =====
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceHolder] = useState('Search');

  // Complete the search
  const goToSearch = async (type) => {
    if (type == 2)
      navigate('/search/savedQuizzes', { state:2 });
    else if (type == 3)
      navigate('/search/myQuizzes', { state:3 })
    else if (searchQuery.trim() !== '') {
      var i = 0;
      while (searchQuery[i] == ' ') {
        i++;
      }
      var temp = searchQuery.substring(i);
      navigate(`/search/${temp}`, { state:1 });
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
        <button className="btn px-3 text-light" id="hamburger" onClick={toggleSideBar}>
          ☰
        </button>
        {isSideBar && (
          <div className="side-bar" ref={sideBarRef}>
          </div>
        )}
        <a className="nav-link text-light" id='default-header-logo' href="/" style={{ marginLeft: "20px" }}>
          <img src={logo} id='menu-header-logo' />
        </a>
        <div className='d-flex align-items-center'>
          <form class="form-inline">
            <input onKeyDown={keyDownHandler}
              onChange={(e) => setSearchQuery(e.target.value)}
              class="form-control mr-sm-2" id='searched-searchbar' type="text" value={searchQuery} 
              placeholder={placeholder} onFocus={() => setPlaceHolder('')} onBlur={() => setPlaceHolder('Search')} aria-label="Search"
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