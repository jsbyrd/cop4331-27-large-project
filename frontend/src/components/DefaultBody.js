import React from 'react';
import './Default.css';

const DefaultBody = () => {
  
  return (
    <div className="d-flex" style={{height: "100%"}}>
      <div className='d-flex flex-column justify-content-center align-items-start' id='default-body-left'>
        <h1 className='text-light font-weight-bold' id='default-body-left-logo'>Our really cool slogan</h1>
        <p className='text-light font-italic' id='default-body-left-extra-text'>Some additional text about our really cool website</p>
        <button className="btn me-3 text-light" id='default-body-left-btn' onClick={() => window.location.href = "/register"}>Get Started</button>
      </div>
      <div className='d-flex justify-content-center align-items-center' id='default-body-right'>
        <p>Place Image Here</p>
      </div>
    </div>
  )
}

export default DefaultBody;