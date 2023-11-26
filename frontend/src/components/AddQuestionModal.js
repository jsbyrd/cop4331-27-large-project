import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddQuestionModal.css';
const path = require('../components/Path.js');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 50px 20px 50px'
  },
};

Modal.setAppElement('#root');

const AddQuestionModal = (props) => {
  const {isAddQuestionOpen, setIsAddQuestionOpen, quizID} = props;

  // q = question, ra = right answer, wa = wrong answer
  const [q, setQ] = useState('');
  const [ra, setRa] = useState('');
  const [wa1, setWa1] = useState('');
  const [wa2, setWa2] = useState('');
  const [wa3, setWa3] = useState('');

  const handleQChange = (e) => {
    setQ(e.target.value);
  }

  const handleRaChange = (e) => {
    setRa(e.target.value);
  }

  const handleWa1Change = (e) => {
    setWa1(e.target.value);
  }

  const handleWa2Change = (e) => {
    setWa2(e.target.value);
  }

  const handleWa3Change = (e) => {
    setWa3(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Hi");
    try {
      const addQuestionParams = {
        question: q,
        quizId: quizID
      }
      // Create the new question
      const res = await axios.post(path.buildPath('/api/questions/add'), addQuestionParams);
      console.log(res);
      const newQuestionId = res.data.id;
      console.log(newQuestionId);
      // Create correct answer
      const addCorrectAnswerParams = {
        answer: ra,
        questionId: newQuestionId,
        wrong: false
      }
      await axios.post(path.buildPath('/api/answers/add'), addCorrectAnswerParams)
      // Create 1-3 incorrect answers
      const addWrongAnswerParams = {
        answer: wa1,
        questionId: newQuestionId,
        wrong: true
      }
      await axios.post(path.buildPath('/api/answers/add'), addCorrectAnswerParams)
      if (wa2.length !== 0) {
        console.log('wa2');
        addWrongAnswerParams.answer = wa2;
        await axios.post(path.buildPath('/api/answers/add'), addCorrectAnswerParams)
      }
      if (wa3.length !== 0) {
        console.log('wa3');
        addWrongAnswerParams.answer = wa3;
        await axios.post(path.buildPath('/api/answers/add'), addCorrectAnswerParams)
      }

      console.log("Question has been added")

      // Close add question modal
      setIsAddQuestionOpen(false);
    } catch (e) {
      console.log(e)
      return;
    }
  }

  function closeAddQuestion(e) {
    e.preventDefault();
    setIsAddQuestionOpen(false);
  }

  return (
    <Modal
        isOpen={isAddQuestionOpen}
        onRequestClose={closeAddQuestion}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div id='add-question-form-container'>
          <h2>Add your questions</h2>
          <button id='close-add-btn' onClick={closeAddQuestion}>X</button>
          <form id='add-question-form' onSubmit={handleFormSubmit} >
            <label htmlFor="question">Question <i>-- Required</i></label><br/>
            <input onChange={handleQChange} type="text" id="question-add" name="question" placeholder='Who was the first president of the United States?' size={50} required /><br/>
            <label htmlFor="answer">Correct Answer <i>-- Required</i></label><br />
            <input onChange={handleRaChange} type="text" id="answer-add-c" placeholder='George Washington' size={50} required /><br />
            <label htmlFor="answer">Incorrect Answer 1 <i>-- Required</i></label><br/>
            <input onChange={handleWa1Change} type="text" id="answer-add-w1" placeholder='Abraham Lincoln' size={50} /><br />
            <label htmlFor="answer">Incorrect Answer 2:</label><br/>
            <input onChange={handleWa2Change} type="text" id="answer-add-w2" placeholder='King George III' size={50} /><br />
            <label htmlFor="answer">Incorrect Answer 3:</label><br/>
            <input onChange={handleWa3Change} type="text" id="answer-add-w3" placeholder='Winston Churchill' size={50} /><br />
            <button id='answer-submit'>Add Question</button>
          </ form>
        </div>
      </Modal>
  )
}

export default AddQuestionModal;