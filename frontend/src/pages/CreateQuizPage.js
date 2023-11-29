import React, { useState, useEffect } from 'react';

import axios from 'axios';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import './CreateQuizPage.css';

const CreateQuizPage = () => {
    const [quizName, setQuizName] = useState("");
    const [quizID, setQuizID] = useState("");

    const fetchQuizzesAdd = async () => {
        const fetchParams = {
            name: quizName,
            public: 0, // hardcoded
            userId: "653181459014bfbb8cff6c2c" // hardcoded
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
        <div>
            <MenuHeader />
            <div id="create-quiz-page-body">
                <p className="create-quiz-text">Create Quiz</p>

                <div className='quizNameCreation'>
                    <p>What do you want to name your quiz?</p>
                    <input
                        type="text"
                        id="quiz-name"
                        className='create-quiz-input-box'
                        placeholder="Wizard Facts Quiz"
                        value={quizName}
                        onChange={handleQuizNameChange}
                    />
                </div>

                <button className="create" onClick={fetchQuizzesAdd}>
                    <p>Create Quiz!</p>
                </button>
            </div>
            <MenuFooter />
        </div>
    );
};

export default CreateQuizPage;
