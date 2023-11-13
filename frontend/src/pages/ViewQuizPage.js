import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import DefaultFooter from '../components/DefaultFooter';
import './ViewQuizPage.css';

const ViewQuizPage = () => {

  const { quizID } = useParams();
  // const dummyQuestions = [{Question: "How are you today?", _id: "1"},
  //                         {Question: "This is question two", _id: "2"}, 
  //                         {Question: "Are you stupid?", _id: "3"},
  //                         {Question: "This is very very dumb", _id: "4"}];
  const [quizInfo, setQuizInfo] = useState({Name: "Failed to load quiz..."});
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const moveFlashCardForward = (e) => {
    e.preventDefault();
    if (currentQuestion >= questions.length - 1) {
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  const moveFlashCardBackward = (e) => {
    e.preventDefault();
    if (currentQuestion <= 0) {
      return;
    }
    setCurrentQuestion(currentQuestion - 1);
  }

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


  // Fetch Quiz info and all Questions related to that quiz
  useEffect(() => {
    fetchQuizInfo();
    fetchQuestions();
    setIsLoading(false);
    
  }, []);

  return (
    <div id='vqp-container'>
      <MenuHeader />
      <div id='vqp-body-container'>
        <div id='vqp-body'>
          <p id='vqp-quiz-title'>{quizInfo.Name}</p>
          <div id='vqp-quiz-options'>
            <button className='vqp-qo' onClick={event =>  window.location.href=`/taketest/${quizID}`}>Take Test</button>
            <button className='vqp-qo'>Save Quiz</button>
            <button className='vqp-qo'>Add Question</button>
          </div>
          <div id='vqp-flashcard'>
            <div id='flip-card-inner'>
              <div className='flip-card-side' id='flip-card-front'>
                <p id='vqp-flashcard-q'>
                  {(questions.length === 0) ? "No Questions :(" : `${questions[currentQuestion].Question}`}
                </p>
              </div>
                <div className='flip-card-side' id='flip-card-back'>
                <p id='vqp-flashcard-q'>
                {(questions.length === 0) ? "No Answers :(" : "No Answers :("}
                  </p>
              </div>
            </div>
          </div>
          <div id='vqp-flashcard-nav'>
            <button className='nav-btn' id='nav-btn-back' onClick={moveFlashCardBackward}>{"←"}</button>
            <p id='flashcard-nav-count'>{`${currentQuestion + 1} / ${isLoading ? 0 : questions.length}`}</p>
            <button className='nav-btn' id='nav-btn-forward' onClick={moveFlashCardForward}>{"→"}</button>
          </div>
          <ul id='vqp-questions-ul'>
            {questions.map((q) => {
              return (
                <li key={q._id}>
                  <div className='vqp-questions-li'>
                    <div className='vqp-questions-li-q'>{`${q.Question}`}</div>
                    <div className='vqp-questions-li-a'>{"No Answer Yet :( but this is what a really long answer would look"}</div>
                    <div className='vqp-questions-li-o'>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

      </div>
      <DefaultFooter />
    </div>
  )
}

export default ViewQuizPage;