import React from 'react';
import { NavLink } from 'react-router-dom';
/**
 * The Main Nav for the Gallery 
 */
const Nav = (props)=>{
    return (
        <nav className="main-nav">
        <ul>
          <li><NavLink to="/cats">Cats</NavLink></li>
          <li><NavLink to="/dogs">Dogs</NavLink></li>
          <li><NavLink to="/computers">Computers</NavLink></li>
        </ul>
      </nav>
    );
};

export default Nav;