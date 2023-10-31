import React from 'react';
import './Menu.css';

function MenuButtons()
{
   return(
    <div>
      <div className="button-explanations">
        <div className="quizzes-button-explanation-container">
          <button id="dummy-save-button" className="dummy-button">Save</button>
          <p className="dummy-button-explanation">quizzes to add them under "Saved Quizzes"</p>
        </div>

        <div className="quizzes-button-explanation-container">
          <button id="dummy-play-button" className="dummy-button">Play</button>
          <p className="dummy-button-explanation">quizzes to "INSERT REST OF LINE HERE</p>
        </div>
      </div>
    </div>
   );
};

export default MenuButtons;