import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import DefaultFooter from '../components/DefaultFooter';
import './TestPage.css';
const path = require('../components/Path.js');


const TestPage = () => {

    const { quizID } = useParams();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([[]]);
    const [rightAnswers, setRightAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);

    const fetchQuestions = async () => {
        const fetchParams = {
        term: "",
        quizId: quizID
        }
        try {
        const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/questions/search/`, fetchParams);
        if (res !== undefined && res.data.result.length !== 0) {
            setQuestions(res.data.result);
        }
        } catch {
            console.log("fetch question ERROR :(");
        return;
        }
    }

    const fetchAnswers = async () => {
        for (let i = 0; i < questions.length; i++) {
            const fetchParams = {
                questionId: questions[i]._id
            };
            try {
                const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/answers/get/`, fetchParams);
                if (res !== undefined && res.data.result.length !== 0) {
                    setAnswers(prevAnswers => {
                        const newAnswers = [...prevAnswers];
                        newAnswers[i] = res.data.result;
                        return newAnswers;
                    });
                }
            } catch {
                console.log("fetch answers ERROR :(");
                return;
            }
        }
    };

    const storeCorrectAnswers = async () => {

        for (let i = 0; i < answers.length; i++)
        {
            for (let j = 0; j < answers[i].length; j++)
            {
                if (!answers[i][j].WrongAnswer)
                {
                    rightAnswers[i] = answers[i][j].Answer;
                }
            }
        }
    }

    const storeWrongAnswers = async () => {

        let temp = 0;

        for (let i = 0; i < answers.length; i++)
        {
            for (let j = 0; j < answers[i].length; j++)
            {
                if (answers[i][j].WrongAnswer)
                {

                    if (wrongAnswers.length < i + 1)
                    {
                        setWrongAnswers(prevArray => [...prevArray, []]);
                    }

                    setWrongAnswers(prevArray => {
                        const newArray = [...prevArray];
                
                        newArray[i] = [...newArray[i]];
                
                        newArray[i][j + 1] = answers[i][j].Answer; // fix newArray coords
                
                        return newArray;
                    });
                temp++;
                }
            }
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);
   
    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswers();
        }
    }, [questions]);

    useEffect(() => {
        storeCorrectAnswers();
        storeWrongAnswers();
    }, [answers]);


    return (
        <div>
            <MenuHeader />
            <div id="test-page-body">
                {questions.length > 0 ? (
                    questions.map((questionItem, index) => (
                    // Create a div for each questionItem. Key should be a unique value.
                    <div key={index} className="question-container">
                        <p className='question-number'>Question {index + 1}</p>
                        <p className='question-text'>{questionItem.Question}</p>
                        <div className='answer-choices'>
                            <button className='answer-choice'>
                                <p>
                                    {rightAnswers[index]}
                                </p>
                            </button>


                            <button className='answer-choice'>
                                <p>
                                    Answer placeholder :D
                                </p>
                            </button>


                            <button className='answer-choice'>
                                <p>
                                    Answer placeholder :D
                                </p>
                            </button>


                            <button className='answer-choice'>
                                <p>
                                    {wrongAnswers[index]}
                                    {console.log(wrongAnswers[index])}
                                </p>
                            </button>                    
                        </div>
                    </div>
                    ))
                ) : (
                    // Display a message if there are no questions
                    <p>No questions available.</p>
                )}
                <div className="test-result">
                        <button className="submit-button">
                            Submit
                        </button>
                </div>
            </div>
            <DefaultFooter />
        </div>
     );
}
 
export default TestPage;