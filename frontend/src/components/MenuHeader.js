import React,
        { useState, 
          useRef,
          useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import logo from './images/logo.png'
import Search from './Searched';
import SideBarModal from './SideBarModal';

const MenuHeader = () => {

  // SideBar Modal
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // Functions for opening modals
  function openSideBar(e) {
    e.preventDefault();
    setIsSideBarOpen(true);
  }

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
      <SideBarModal
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <nav id='menu-header-navbar'>
        <button className="btn px-3 text-light" id="hamburger" onClick={openSideBar}>
          ☰
        </button>
        <div>
          <form class="form-inline">
            <input onKeyDown={keyDownHandler}
              onChange={(e) => setSearchQuery(e.target.value)}
              class="form-control mr-sm-2 w-100" id='menu-searchbar' type="text" value={searchQuery} 
              placeholder={placeholder} onFocus={() => setPlaceHolder('')} onBlur={() => setPlaceHolder('Search')} aria-label="Search"
            />
          </form>
        </div>
        <a className="nav-link text-light" id='default-header-logo' href="/" style={{ marginLeft: "20px" }}>
          <img src={logo} id='menu-header-logo' />
        </a>
      </nav>
    </header>

  );
}

export default MenuHeader;