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
    const navigate = useNavigate();
    const location = useLocation();
    const type = location.state;

    // Utilize Search API
    const doSearch = async (term) =>
    {
        setSearchQuery(query);
        console.log("Term: " + term);
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
                setMessage(`Showing 0 Results for ${term}`);
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

    const shrinkQuizName = (name) => {
        let longestWord = "";
        let currentWord = "";
        
        //Move through the string letter-by-letter
        for (let i = 0; i < name.length; i++) {
            if (name.charAt(i) === " ") { //If we're at a space character
            if (currentWord.length > longestWord.length) longestWord = currentWord; //Check if that word was the longest
            currentWord = ""; //Reset the current word
            } else {
            currentWord += name.charAt(i); //Not at a space character, still building the current word
            }
        }
        if (currentWord > longestWord) longestWord = currentWord; //End of string - check current word once more
        if (longestWord.length >= 12) {
            return name.substring(0, 10) + "...";
        } else {
            return name;
        }
    }

    // Send API call upon loading of page
    useEffect(() => {
        if (type === null || type === 1)
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
                            <li key={result._id} className='individual-flashcard' onClick={() => window.location=`/viewquiz/${result._id}`}>
                                <p className='search-result-name'>{shrinkQuizName(result.Name)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;