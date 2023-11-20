import React from 'react';
import Modal from 'react-modal';
import './EditQuestionModal.css';

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
  const {isEditQuestionOpen, setIsEditQuestionOpen} = props;

  function closeEditQuestion(e) {
    e.preventDefault();
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
          <form id='edit-question-form'>
            <label for="question">Question:</label><br/>
            <input type="text" id="question-edit" name="question" placeholder='Who was the first president of the United States?' size={50} required /><br/>
            <label for="answer">Correct Answer:</label><br/>
            <input type="text" id="answer-edit-c" name="answer" placeholder='George Washington' size={50} required /><br />
            <label for="answer">Incorrect Answer 1:</label><br/>
            <input type="text" id="answer-edit-w1" name="answer" placeholder='Abraham Lincoln' size={50} required /><br />
            <label for="answer">Incorrect Answer 2:</label><br/>
            <input type="text" id="answer-edit-w2" name="answer" placeholder='King George III' size={50} required /><br />
            <label for="answer">Incorrect Answer 3:</label><br/>
            <input type="text" id="answer-edit-w3" name="answer" placeholder='Winston Churchill' size={50} required /><br />
            <button id='edit-submit'>Edit Question</button>
          </ form>
        </div>
      </Modal>
  )
}

export default EditQuestionModal;