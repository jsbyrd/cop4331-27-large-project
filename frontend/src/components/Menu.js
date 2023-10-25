import React from 'react';
import './Menu.css';
import MenuButtons from './MenuButtons';
import MenuQuizzesCatagory1 from './MenuQuizzesCatagory1';
import MenuQuizzesCatagory2 from './MenuQuizzesCatagory2';
import MenuQuizzesCatagory3 from './MenuQuizzesCatagory3';

function Menu()
{
   return(
    <div id="menu-background">
      <MenuButtons />
      <MenuQuizzesCatagory1 />
      <MenuQuizzesCatagory2 />
      <MenuQuizzesCatagory3 />
    </div>
   );
};

export default Menu;