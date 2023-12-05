import React, 
        { useState, 
        useEffect } from 'react';
import { useNavigate,
        useLocation,
        useParams } from 'react-router-dom';
import './Menu.css';
import logo from './images/logo.png'
import SideBarModal from './SideBarModal';
const path = require('./Path.js');

const Search = () => {

    const { query } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [placeholder, setPlaceHolder] = useState('Search');
    const navigate = useNavigate();
    const location = useLocation();
    const type = location.state;

    var count = 0;

    // SideBar Modal
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // Functions for opening modals
    function openSideBar(e) {
        e.preventDefault();
        setIsSideBarOpen(true);
    }

    // Utilize Search API
    const doSearch = async (term) =>
    {
        var obj = {term:term};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(path.buildPath('/api/quizzes/search'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            try {
                var res = JSON.parse(await response.text());
                setMessage("");
                setResults(res.result);
            }
            catch(e)
            {
                setMessage("No results");
                setResults([]);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    // Saved quizes
    const getSaved = async () =>
    {
        var obj = {userId:JSON.parse(localStorage.getItem('user_data')).id};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(path.buildPath('/api/saved/get'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            if (response.status === 204) {
                setMessage("No saved quizzes");
                setResults([]);
            }
            else {
                var res = JSON.parse(await response.text());
                setMessage("");
                setResults(res.result);
                console.log(res.result);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    // My Quizzes
    const myQuizzes = async () => 
    {
        var obj = {userId:JSON.parse(localStorage.getItem('user_data')).id};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(path.buildPath('/api/quizzes/getfromuser'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            if (response.status == 204) {
                setMessage("No created quizzes");
                setResults([]);
            }
            else {
                var res = JSON.parse(await response.text());
                setMessage("");
                setResults(res.result);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    // Complete the search
    const goToSearch = async (type) => {
        if (type == 2)
        {
            setSearchQuery('');
            navigate('/search/savedQuizzes', { state: 2 });
            getSaved();
        }
        else if (type == 3)
        {
            setSearchQuery('');
            navigate('/search/myQuizzes', { state: 3 })
            myQuizzes();
        }
        else if (searchQuery.trim() !== '') {
            var i = 0;
            while (searchQuery[i] == ' ') {
                i++;
            }
            var temp = searchQuery.substring(i);
            setSearchQuery(searchQuery.substring(i));
            navigate(`/search/${temp}`, { state: 1 });
            doSearch(temp);
        }
    }
    // Detect enter
    const keyDownHandler = event => {
        if (event.key === 'Enter')
        {
            event.preventDefault();
            goToSearch(1);
        }
    }

    // Send API call upon loading of page
    useEffect(() => {
        if (type == 1)
        {
            setSearchQuery(query);
            doSearch(query);
        }
        else if (type == 2)
        {
            setSearchQuery('');
            getSaved();
        }
        else
        {
            setSearchQuery('');
            myQuizzes();
        }
    },[type]);

    return (
        <div>
            <header>
                <SideBarModal
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                />
                <nav className="navbar navbar-expand-lg d-flex flex-nowrap justify-content-between w-100 menu-navbar-custom" id='default-header-navbar'>
                    <button className="btn px-3 text-light" id="hamburger" onClick={openSideBar}>
                        ☰
                    </button>
                    <a className="nav-link text-light" id='default-header-logo' href="/menu" style={{ marginLeft: "20px" }}>
                        <img src={logo} id='menu-header-logo' />
                    </a>
                    <div className='d-flex align-items-center'>
                        <form class="form-inline">
                            <input onKeyDown={keyDownHandler}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                class="form-control mr-sm-2" id='menu-searchbar' type="text" value={searchQuery}
                                placeholder={placeholder} onFocus={() => setPlaceHolder('')} onBlur={() => setPlaceHolder('Search')} aria-label="Search"
                            />
                        </form>
                    </div>
                </nav>
            </header>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' , alignItems: 'center', backgroundColor: 'rgb(67, 39, 161)'}}>
                <div id="test-page-body">
                    {message && <p>{message}</p>}
                    <ul className="search-result">
                        {results.map((result) => (
                            <li key={result._id}>
                                <a href={`/viewquiz/${result._id}`}>
                                    {result.Name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;