import React from 'react';
import './Menu.css';
import './MenuQuizzesCatagory.css';

const MenuQuizzesCatagory2 = () => {
  return (
    <div className="quiz-catagory-container">
        <h3 className="quiz-catagory-title">Biology</h3>
        <div id="quizzes-catagory2" className='quiz-catagory'>
        <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/65249bd5a5a3366c6ede8722'}>
            <p className='menu-quiz-button-title'>Plants</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/65249bf3a5a3366c6ede8723'}>
            <p className='menu-quiz-button-title'>Sea Life</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/6547c0db1e45c8e28a4c15c2'}>
            <p className='menu-quiz-button-title'>Mammals</p>
          </button>

        </div>
    </div>
  )
}

export default MenuQuizzesCatagory2;