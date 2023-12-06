import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import logo from './images/logo.png'
import magnifyingGlass from './images/magnifying-glass.png'
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

  const handleFormSubmit = () => {
    navigate(`/search/${searchQuery}`, { state: 1 });
  }

  return (
    <header>
      <SideBarModal
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <nav id='menu-header-navbar'>
        <div id='hamburger-container'>
          <button className="btn px-3 text-light" id="hamburger" onClick={openSideBar}>
            ☰
          </button>
        </div>
        <div>
          <form id='menu-searchbar-form' class="form-inline" onSubmit={handleFormSubmit}>
            <input
              onChange={(e) => setSearchQuery(e.target.value)} required
              class="form-control mr-sm-2" id='menu-searchbar' type="text" value={searchQuery}
              placeholder={placeholder} onFocus={() => setPlaceHolder('')} onBlur={() => setPlaceHolder('Search')} aria-label="Search"
            />
            <button id='menu-searchbar-btn'>
            <img id="mag-glass-icon" src={magnifyingGlass} />
            </button>
          </form>
        </div>
        <div className="nav-link text-light" id='menu-header-logo-container'>
          <img src={logo} alt='QuizWiz logo' id='menu-header-logo' />
        </div>
      </nav>
    </header>

  );
}

export default MenuHeader;