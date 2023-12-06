import React from 'react';
import './Menu.css';
import './MenuQuizzesCatagory.css';

const MenuQuizzesCatagory1 = () => {
  return (
    <div className="quiz-catagory-container">
        <h3 className="quiz-catagory-title">Popular</h3>
        <div id="quizzes-catagory1" className='quiz-catagory'>
          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656ef49f9897372398432b77'}>
            <p className='menu-quiz-button-title'>Cars</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656a64dbcf24604d0ed748e4'}>
            <p className='menu-quiz-button-title'>WizzyFacts</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656edfa49897372398432b5c'}>
            <p className='menu-quiz-button-title'>Space Exploration</p>
          </button>

          <button className='menu-quiz-button'>
            <p className='menu-quiz-button-title'>Quiz Title</p>
          </button>

        </div>
    </div>
  )
}

export default MenuQuizzesCatagory1;
