import React from 'react';
import wizard1 from './images/wizard1.png';
import './Default.css';

const DefaultBody = () => {
  
  return (
    <div className="d-flex" style={{height: "100%"}}>
      <div className='d-flex flex-column justify-content-center align-items-start' id='default-body-left'>
        <h1 className='text-light font-weight-bold' id='default-body-left-logo'>Explore the magic of learning!</h1>
        <p className='text-light font-italic' id='default-body-left-extra-text'>Create a FREE account today to start your learning journey</p>
        <button className="btn me-3 text-light" id='default-body-left-btn' onClick={() => window.location.href = "/register"}>Get Started</button>
      </div>
      <div className='d-flex justify-content-center align-items-center' id='default-body-right'>
      <img id='wizard1-img' src={wizard1} alt='An owl wearing a wizard hat' />
      </div>
    </div>
  )
}

export default DefaultBody;