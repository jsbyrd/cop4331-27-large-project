import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './EditQuestionModal.css';
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

const EditQuestionModal = (props) => {
  const {isEditQuestionOpen, setIsEditQuestionOpen, editedQuestion} = props;

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

  const editWrongAnswer = async (originalAnswer, editedAnswerText) => {
    try {
      // Add wrong answer if original text was empty and updated text isn't
      if (originalAnswer === undefined && editedAnswerText.length !== 0) {
        const addParams = {
          answer: editedAnswerText,
          questionId: editedQuestion.question._id,
          wrong: true
        }
        await axios.post(path.buildPath('/api/answers/add'), addParams);
      }
      // Do nothing if there is no new wrong answer
      else if (editedAnswerText.length === 0 && originalAnswer === undefined) {
        return;
      }
      // Delete wrong answer if the updated text is an empty string
      else if (editedAnswerText.length === 0 && originalAnswer.Answer !== 0) {
        const deleteParams = {
          id: originalAnswer._id
        }
        await axios.post(path.buildPath('/api/answers/delete'), deleteParams);
      }
      // Edit wrong answer if the updated text is different from the original text
      else if (editedAnswerText.length !== 0 && editedAnswerText !== originalAnswer.Answer) {
        const editParams = {
          id: originalAnswer._id,
          answer: editedAnswerText,
          wrong: originalAnswer.WrongAnswer,
          questionId: editedQuestion.question._id
        }
        await axios.post(path.buildPath('/api/answers/edit'), editParams);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  // Add, edit, or do nothing to the question and answers as necessary
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Edit question slot if necessary
      if (q.length !== 0 && q !== editedQuestion.question.Question) {
        const editParamsQ = {
          id: editedQuestion.question._id,
          question: q
        }
        await axios.post(path.buildPath('/api/questions/edit'), editParamsQ);
      }
      // Edit right answer slot if necessary
      const originalRa = editedQuestion.answers.find((a) => !a.WrongAnswer);
      if (ra.length !== 0 && ra !== originalRa.Answer) {
        const editParamsRa = {
          id: originalRa._id,
          answer: ra,
          wrong: originalRa.WrongAnswer,
          questionId: editedQuestion.question._id
        }
        await axios.post(path.buildPath('/api/answers/edit'), editParamsRa);
      }
      // For the next three wrong answers, either add the wrong answer, edit the wrong answer, or do nothing if necessary
      const wrongAnswers = editedQuestion.answers.filter((a) => a.WrongAnswer);
      editWrongAnswer(wrongAnswers[0], wa1);
      editWrongAnswer((wrongAnswers.length >= 2) ? wrongAnswers[1] : undefined, wa2);
      editWrongAnswer((wrongAnswers.length >= 3) ? wrongAnswers[2] : undefined, wa3);
    }
    catch (err) {
      console.log(err);
    }
    closeEditQuestion();
    window.location.reload();
  }

  // Upon opening the modal, auto-fill the question and answers that are going to be edited into the form
  useEffect(() => {
    if (editedQuestion.answers !== undefined) {
      const wrongAnswers = editedQuestion.answers.filter((a) => a.WrongAnswer);
      const rightAnswer = editedQuestion.answers.find((a) => !a.WrongAnswer);
      const question = editedQuestion.question.Question;

      setQ(question);
      setRa(rightAnswer.Answer);
      if (wrongAnswers.length > 0) {
        setWa1(wrongAnswers[0].Answer);
      }
      if (wrongAnswers.length > 1) {
        setWa2(wrongAnswers[1].Answer);
      }
      if (wrongAnswers.length > 2) {
        setWa3(wrongAnswers[2].Answer);
      }
    }
    
  }, [isEditQuestionOpen])


  function closeEditQuestion() {
    setQ('');
    setRa('');
    setWa1('');
    setWa2('');
    setWa3('');
    setIsEditQuestionOpen(false);
  }

  return (
    <Modal
        isOpen={isEditQuestionOpen}
        onRequestClose={closeEditQuestion}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div id='edit-question-form-container'>
          <h2>Edit your questions</h2>
          <button id='close-edit-btn' onClick={closeEditQuestion}>X</button>
          <form id='edit-question-form' onSubmit={handleFormSubmit}>
            <label htmlFor="question">Question:</label><br/>
            <input type="text" id="question-edit" value={q} onChange={handleQChange} name="question" placeholder='Who was the first president of the United States?' size={50} required /><br/>
            <label htmlFor="answer">Correct Answer:</label><br/>
            <input type="text" id="answer-edit-ra" value={ra} onChange={handleRaChange} name="answer" placeholder='George Washington' size={50} required /><br />
            <label htmlFor="answer">Incorrect Answer 1:</label><br/>
            <input type="text" id="answer-edit-wa1" value={wa1} onChange={handleWa1Change} name="answer" placeholder='Abraham Lincoln' size={50} /><br />
            <label htmlFor="answer">Incorrect Answer 2:</label><br/>
            <input type="text" id="answer-edit-wa2" value={wa2} onChange={handleWa2Change} name="answer" placeholder='King George III' size={50} /><br />
            <label htmlFor="answer">Incorrect Answer 3:</label><br/>
            <input type="text" id="answer-edit-wa3" value={wa3} onChange={handleWa3Change} name="answer" placeholder='Winston Churchill' size={50} /><br />
            <button id='edit-submit'>Edit Question</button>
          </ form>
        </div>
      </Modal>
  )
}

export default EditQuestionModal;