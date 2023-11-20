import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import DefaultFooter from '../components/DefaultFooter';
import './TestPage.css';


const TestPage = () => {

    const { quizID } = useParams();

    const [quizInfo, setQuizInfo] = useState({Name: "Failed to load quiz..."});
    const [questions, setQuestions] = useState([]);
    // const [answers, setAnswers] = useState([]);
    let answers = new Array();

    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchQuizInfo = async () => {
        const fetchParams = {
        id: quizID
        }
        try {
        const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/quizzes/get/`, fetchParams);
        if (res !== undefined && res.data.result.length !== 0) {
            setQuizInfo(res.data.result[0]);
        }
        }
        catch {
        return;
        }
    }

    const fetchQuestions = async () => {
        const fetchParams = {
        term: "",
        quizId: quizID
        }
        try {
        const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/questions/search/`, fetchParams);
        if (res !== undefined && res.data.result.length !== 0) {
            setQuestions(res.data.result);
            setCurrentQuestion(0);
        }
        } catch {
        return;
        }
    }

    const fetchAnswers = async () => {
        let numQuestions = questions.length;

        for (let i = 0; i < numQuestions; i++)
        {
            // console.log(i); // debug
            // console.log(questions[i]._id); // debug
            // console.log(quizID); // debug

            const fetchParams = {
                QuestionId: questions[i]._id
                }
                try {
                const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/answers/get/`, fetchParams);
                if (res !== undefined && res.data.result.length !== 0) {
                    // console.log(res.data.result);
                    // setAnswers(res.data.result);      
                    
                    // very uneffiecent
                    for (let j = 0; j < res.data.result.length; j++)
                    {
                        if (!res.data.result[j].WrongAnswer)
                        {
                            answers[i] = res.data.result[j];
                            console.log(answers[i]);
                        }
                    }
                }
                } catch {
                    console.log("ERROR :(");
                return;
                }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchQuizInfo();
            await fetchQuestions();
            setIsLoading(false);
        };
    
        fetchData();
    }, []);
    

    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswers();
        }
        
    }, [questions]);

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
                        <p className='question-text'>(temporary) question Id: {questionItem._id}</p> 
                        <div className='answer-choices'>
                            <button className='answer-choice'>
                                <p>
                                    
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
                                    Answer placeholder :D
                                </p>
                            </button>                     
                        </div>
                    </div>
                    ))
                ) : (
                    // Display a message if there are no questions
                    <p>No questions available.</p>
                )}
            </div>
            <DefaultFooter />
        </div>
     );
}
 
export default TestPage;