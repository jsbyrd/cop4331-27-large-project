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

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656ef3c59897372398432b75'}>
            <p className='menu-quiz-button-title'>Solar System</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656ef38d9897372398432b74'}>
            <p className='menu-quiz-button-title'>Amphibians</p>
          </button>

        </div>
    </div>
  )
}

export default MenuQuizzesCatagory1;
