import React from 'react';
import Searched from '../components/Searched';
import DefaultFooter from '../components/DefaultFooter';

const SearchedPage = () =>
{
    return(
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <Searched />
            <DefaultFooter />
        </div>
    );
}

export default SearchedPage;