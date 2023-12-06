import React from 'react';
import './Menu.css';
import './MenuQuizzesCatagory.css';

const MenuQuizzesCatagory3 = () => {
  return (
    <div className="quiz-catagory-container">
        <h3 className="quiz-catagory-title">Pop Culture</h3>
        <div id="quizzes-catagory3" className='quiz-catagory'>
        <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656f7d6c2eee937bb41d62f6'}>
            <p className='menu-quiz-button-title'>Squid Games</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656fec51c3e0263de3dd9b43'}>
            <p className='menu-quiz-button-title'>ATLA</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656feea3c3e0263de3dd9b76'}>
            <p className='menu-quiz-button-title'>GTA 6 Trailer Trivia</p>
          </button>

          <button className='menu-quiz-button' onClick={() => window.location.href = '/viewquiz/656e603bdc5c455145055dca'}>
            <p className='menu-quiz-button-title'>Harry Potter Characters</p>
          </button>
        </div>
    </div>
  )
}

export default MenuQuizzesCatagory3;