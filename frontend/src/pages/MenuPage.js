import React from 'react';
import Main from '../components/Menu'
import MenuHeader from '../components/MenuHeader';
import DefaultFooter from '../components/DefaultFooter';

const MainPage = () =>
{

    return(
      // <div>
      //   <Main />
      // </div>

      <div className="d-flex flex-column" style={{height: "100vh"}}>
        <MenuHeader />
        <Main />
        <DefaultFooter />
    </div>
    );
};

export default MainPage;