import React, { useState, useEffect } from 'react';

import axios from 'axios';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import './CreateQuizPage.css';

const CreateQuizPage = () => {
    const [quizName, setQuizName] = useState("");
    const [quizID, setQuizID] = useState("");

    var obj = {id:JSON.parse(localStorage.getItem('user_data')).id};

    const fetchQuizzesAdd = async () => {
        const fetchParams = {
            name: quizName,
            public: 0, // hardcoded
            userId: obj.id
        };

        try {
            const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/quizzes/add/`, fetchParams);
            if (res !== undefined) {
                setQuizID(res.data.id);
            }
        } catch (error) {
            console.log("add Quiz ERROR :(", error);
            return;
        }
    };

    const handleQuizNameChange = (e) => {
        setQuizName(e.target.value);
    };

    useEffect(() => {
        if (quizID !== "")
        {
            window.location.href=`/viewquiz/${quizID}`
        }
    }, [quizID]);

    return (
        <div id='create-quiz-container'>
            <MenuHeader />
            <div id="create-quiz-page-body">
                <p className="create-quiz-text">Create Quiz</p>

                <div id='quiz-name-creation'>
                    <p>What do you want to name your quiz?</p>
                    <input
                        type="text"
                        id="quiz-name"
                        className='create-quiz-input-box'
                        placeholder="Wizard Facts Quiz"
                        value={quizName}
                        onChange={handleQuizNameChange}
                    />
                    <button className="create" onClick={fetchQuizzesAdd}>
                        <p>Create Quiz!</p>
                    </button>
                </div>
            </div>
            <MenuFooter />
        </div>
    );
};

export default CreateQuizPage;
