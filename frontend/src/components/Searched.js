import React, 
        { useState, 
        useEffect } from 'react';
import { useNavigate,
        useLocation,
        useParams } from 'react-router-dom';
import './Searched.css';
import axios from 'axios';
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
                setMessage(`Showing ${res.result.length} Result${res.result.length === 1 ? '' : 's'} For ${term}`);
                setResults(res.result);
            }
            catch(e)
            {
                setMessage(`Showing Zero Results for ${term}`);
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
                setMessage("No Saved Quizzes :(");
                setResults([]);
            }
            else {
                var res = JSON.parse(await response.text());
                setMessage(`Showing ${res.result.length} Result${res.result.length === 1 ? '' : 's'} For Saved Quizzes`);
                // Fetch answer info for each question
                const quizzes = []
                for (let i = 0; i < res.result.length; i++) {
                    console.log(i);
                    const fetchParams = {
                        id: res.result[i]._id
                    }
                    const resA = await axios.post(path.buildPath('/api/quizzes/get/'), fetchParams);
                    if (resA !== undefined && resA.data.result.length !== 0) {
                        console.log('RESA')
                        console.log(resA);
                        const quiz = {
                            _id: res.result[i]._id,
                            Name: resA.data.result[0].Name,
                        }
                        quizzes.push(quiz);
                    }
                }
                setResults(quizzes);
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
            if (response.status === 204) {
                setMessage("No Created Quizzes :(");
                setResults([]);
            }
            else {
                var res = JSON.parse(await response.text());
                setMessage(`Showing ${res.result.length} Result${res.result.length === 1 ? '' : 's'} For My Quizzes`);
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
        if (type === 2)
        {
            setSearchQuery('');
            navigate('/search/savedQuizzes', { state: 2 });
            getSaved();
        }
        else if (type === 3)
        {
            setSearchQuery('');
            navigate('/search/myQuizzes', { state: 3 })
            myQuizzes();
        }
        else if (searchQuery.trim() !== '') {
            var i = 0;
            while (searchQuery[i] === ' ') {
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
        if (type === 1)
        {
            setSearchQuery(query);
            doSearch(query);
        }
        else if (type === 2)
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
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' , alignItems: 'center', backgroundColor: 'rgb(67, 39, 161)'}}>
                <div id="test-page-body">
                    {message && <p id='search-message'>{message}</p>}
                    <ul className="search-result">
                        {results.map((result) => (
                            <li key={result._id}>
                                <p className='search-result-name'>{result.Name}</p>
                                <button className='search-result-btn' onClick={() => window.location=`/viewquiz/${result._id}`}>View Quiz</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;