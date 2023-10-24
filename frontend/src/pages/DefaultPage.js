import React from 'react';
import DefaultHeader from '../components/DefaultHeader';
import DefaultBody from '../components/DefaultBody';
import DefaultFooter from '../components/DefaultFooter';

const DefaultPage = () => {

  return (
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <DefaultHeader />
      <DefaultBody />
      <DefaultFooter />
    </div>
  )
}

export default DefaultPage;