import React from 'react';
import Modal from 'react-modal';
import './AddQuestionModal.css';

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
  const {isAddQuestionOpen, setIsAddQuestionOpen} = props;

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
          <form id='add-question-form'>
            <label for="question">Question:</label><br/>
            <input type="text" id="question-add" name="question" placeholder='Who was the first president of the United States?' size={50} required /><br/>
            <label for="answer">Correct Answer:</label><br/>
            <input type="text" id="answer-add-c" name="answer" placeholder='George Washington' size={50} required /><br />
            <label for="answer">Incorrect Answer 1:</label><br/>
            <input type="text" id="answer-add-w1" name="answer" placeholder='Abraham Lincoln' size={50} required /><br />
            <label for="answer">Incorrect Answer 2:</label><br/>
            <input type="text" id="answer-add-w2" name="answer" placeholder='King George III' size={50} required /><br />
            <label for="answer">Incorrect Answer 3:</label><br/>
            <input type="text" id="answer-add-w3" name="answer" placeholder='Winston Churchill' size={50} required /><br />
            <button id='answer-submit'>Add Question</button>
          </ form>
        </div>
      </Modal>
  )
}

export default AddQuestionModal;