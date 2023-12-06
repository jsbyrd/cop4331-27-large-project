import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import DefaultFooter from '../components/DefaultFooter';
import './TestPage.css';

const TestPage = () => {
    const { quizID } = useParams();
    const [quizInfo, setQuizInfo] = useState({Name: "Failed to load quiz...", _id: "N/A"});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([[]]);
    const [combinedAnswers, setCombinedAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    const fetchQuizInfo = async () => {
        const fetchParams = {
          id: quizID
        }
        try {
          const res = await axios.post('https://cop4331-27-c6dfafc737d8.herokuapp.com/api/quizzes/get/', fetchParams);
          if (res !== undefined && res.data.result.length !== 0) {
            setQuizInfo(res.data.result[0]);
          }
        }
        catch {
            console.log("fetch quiz info ERROR :(");
            return;
        }
      }

    const fetchQuestions = async () => {
        const fetchParams = {
            term: "",
            quizId: quizID
        };
        try {
            const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/questions/search/`, fetchParams);
            if (res !== undefined && res.data.result.length !== 0) {
                setQuestions(res.data.result);
                // Initialize combinedAnswers as an array of empty arrays, matching the length of questions
                setCombinedAnswers(new Array(res.data.result.length).fill([]));
            }
        } catch {
            console.log("fetch question ERROR :(");
            return;
        }
    };

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

    const processAnswers = () => {
        const newCombinedAnswers = answers.map((answerSet, index) => {
            const rightAnswer = answerSet.find(answer => !answer.WrongAnswer);
            const wrongAnswers = answerSet.filter(answer => answer.WrongAnswer).slice(0, 3);

            const combined = [
                { answer: rightAnswer.Answer, isCorrect: true },
                ...wrongAnswers.map(wa => ({ answer: wa.Answer, isCorrect: false }))
            ];

            return shuffleArray(combined);
        });

        setCombinedAnswers(newCombinedAnswers);
    };

    useEffect(() => {
        fetchQuizInfo();
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswers();
        }
    }, [questions]);

    useEffect(() => {
        if (answers.some(answerSet => answerSet.length > 0)) {
            processAnswers();
            // Initialize user answers state
            setUserAnswers(new Array(questions.length).fill(null));
        }
    }, [answers]);

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    const handleAnswerSelection = (questionIndex, answerIndex) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[questionIndex] = answerIndex;
        setUserAnswers(newUserAnswers);
    };

    const calculateScore = () => {
        const correctAnswers = userAnswers.reduce((acc, selectedAnswerIndex, questionIndex) => {
            if(selectedAnswerIndex !== null && combinedAnswers[questionIndex][selectedAnswerIndex].isCorrect) {
                return acc + 1;
            }
            return acc;
        }, 0);
        const calculatedScore = (correctAnswers / questions.length) * 100;
        setScore(calculatedScore.toFixed(2));
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setIsSubmitted(false);
        setScore(null);
        setUserAnswers(new Array(questions.length).fill(null));
        // Optionally reshuffle answers or fetch new questions here if desired
    };

    return (
        <div>
            <MenuHeader />
            <div id="test-page-body">
                <div id='test-page-body-content'>
                    <p id='take-test-quiz-title'>{quizInfo.Name}</p>
                        <button className='vqp-qo back-to-view-quiz-page-button' onClick={event =>  window.location.href=`/viewquiz/${quizID}`}>Back to View Quiz</button>
                            {questions.length > 0 ? (
                                questions.map((questionItem, index) => (
                                    <div key={index} className="question-container">
                                        <p className='question-number'>Question {index + 1}</p>
                                        <p className='question-text'>{questionItem.Question}</p>
                                        <div className='answer-choices'>
                                            {combinedAnswers[index] && combinedAnswers[index].map((answerObj, answerIndex) => (
                                                <div id='answer-choice-container'>
                                                    <button
                                                        key={answerIndex}
                                                        className={`answer-choice ${isSubmitted ? (userAnswers[index] === answerIndex ? (answerObj.isCorrect ? 'correct-answer' : 'incorrect-answer') : '') : (userAnswers[index] === answerIndex ? 'selected' : '')}`}
                                                        onClick={() => !isSubmitted && handleAnswerSelection(index, answerIndex)}
                                                        disabled={isSubmitted}
                                                    >
                                                        <p>{answerObj.answer}</p>
                                                    </button>
                                                </div>
                                            
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No questions available.</p>
                            )}
                            <div className="test-result">
                                {!isSubmitted ? (
                                    <button className="submit-button" onClick={calculateScore}>
                                        Submit
                                    </button>
                                ) : (
                                    <>
                                        <div>
                                            <p className='stated-result-score'>
                                            Your score is {score}%
                                            </p>
                                        </div>
                                        <button className="retry-button" onClick={handleRetry}>
                                            Retry
                                        </button>
                                    </>
                                )}
                            </div>
                </div>
            </div>
            <DefaultFooter />
        </div>
    );
};

export default TestPage;
