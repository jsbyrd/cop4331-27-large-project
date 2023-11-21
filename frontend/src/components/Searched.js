import React, 
        { useState, 
        useEffect } from 'react';
import { useNavigate,
        useLocation,
        useParams } from 'react-router-dom';
import './Searched.css';
import logo from './images/logo.png'
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

    // Utilize Search API
    const doSearch = async (term) =>
    {
        var obj = {term:term};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(path.buildPath('/api/quizzes/search'), {method:'post',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if(res.error === 204)
            {
                setMessage("No results");
                setResults([]);
            }
            else
            {
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
        }
        else if (type == 3)
        {
            setSearchQuery('');
            navigate('/search/myQuizzes', { state: 3 })
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
            setSearchQuery(query);
        doSearch(query);
    },[]);

    return (
        <div>
            <header className='position-sticky top-0'>
                <nav className="navbar navbar-expand-lg d-flex flex-nowrap justify-content-between w-100 searched-navbar-custom" id='default-header-navbar'>
                    <a className="nav-link text-light" id='searched-header-logo' href="/menu" style={{ marginLeft: "20px" }}>
                        <img src={logo} id='searched-header-logo'/>
                    </a>
                    <div className='d-flex align-items-center'>
                        <form class="form-inline">
                            <input onKeyDown={keyDownHandler}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            class="form-control mr-sm-2" id='searched-searchbar' type="text" aria-label="Search" value={searchQuery} 
                            placeholder={placeholder} onFocus={() => setPlaceHolder('')} onBlur={() => setPlaceHolder('Search')} 
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
            <div>
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
    );
};

export default Search;