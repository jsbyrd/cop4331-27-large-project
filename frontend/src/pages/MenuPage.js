import React from 'react';
import Main from '../components/Menu'
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';

const MainPage = () =>
{

    return(
      // <div>
      //   <Main />
      // </div>

      <div className="d-flex flex-column" style={{height: "100vh"}}>
        <MenuHeader />
        <Main />
        <MenuFooter />
    </div>
    );
};

export default MainPage;