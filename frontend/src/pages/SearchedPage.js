import React from 'react';
import SearchHeader from '../components/SearchedHeader';
import Searched from '../components/Searched';
import SearchedFooter from '../components/SearchedFooter';

const SearchedPage = () =>
{
    return(
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <SearchHeader />
            <Searched />
            <SearchedFooter />
        </div>
    );
}

export default SearchedPage;