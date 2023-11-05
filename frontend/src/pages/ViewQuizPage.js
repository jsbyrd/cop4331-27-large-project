import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import DefaultFooter from '../components/DefaultFooter';

const ViewQuizPage = () => {

  const { quizID } = useParams();
  const dummyQuestions = [{Question: "How are you today?", _id: "1"},
                          {Question: "This is question two", _id: "2"}, 
                          {Question: "Are you stupid?", _id: "3"},
                          {Question: "This is very very dumb", _id: "4"}];
  const [questions, setQuestions] = useState(dummyQuestions);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestions = async () => {
    const fetchParams = {
      term: "",
      quizId: quizID
    }
    const res = await axios.post(`https://cop4331-27-c6dfafc737d8.herokuapp.com/api/questions/search/`, fetchParams);
    console.log(res);
    if (res !== undefined && res.data.result.length !== 0)
      setQuestions(res.data.result);
  }


  // Fetch All Questions
  useEffect(() => {
    fetchQuestions();
    setIsLoading(false);
  }, [])

  console.log(questions);

  return (
    <div>
      <MenuHeader />
      <p>Quiz ID: {`${quizID}`}</p>
      <p>isLoading? {`${isLoading}`}</p>
      <p>Questions: </p>
      <div id='vqp-body-container'>
        <div id='vqp-body'>
          <p id='vqp-quiz-title'>Quiz Title</p>
          <div id='vqp-quiz-options'>
            <button>Test</button>
            <button>Save</button>
            <button>Add Question</button>
          </div>
          <div>
            BIG QUESTION
          </div>
          <div>
            <button>{"<-"}</button>
            <p>5/64</p>
            <button>{"->"}</button>
          </div>
          <ul>
            {questions.map((q) => {
              return (
                <li key={q._id}>
                  {`${q.Question}`}
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