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
          <div className='modal-header'>
            <h2>Add Question</h2>
            <button onClick={closeAddQuestion}>X</button>
          </div>
          <form id='add-question-form'>
            <label for="question">Question:</label><br/>
            <input type="text" id="question-add" name="question" size={50} /><br/>
            <label for="answer">Correct Answer:</label><br/>
            <input type="text" id="answer-add" name="answer" size={50} /><br />
            <label for="answer">Incorrect Answer 1:</label><br/>
            <input type="text" id="answer-add" name="answer" size={50} /><br />
            <label for="answer">Incorrect Answer 2:</label><br/>
            <input type="text" id="answer-add" name="answer" size={50} /><br />
            <label for="answer">Incorrect Answer 3:</label><br/>
            <input type="text" id="answer-add" name="answer" size={50} /><br />
            <label for="answer">Incorrect Answer 4:</label><br/>
            <input type="text" id="answer-add" name="answer" size={50} /><br />
            <button>Add</button>
          </ form>
        </div>
      </Modal>
  )
}

export default AddQuestionModal;