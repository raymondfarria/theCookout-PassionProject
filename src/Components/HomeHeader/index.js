import React from 'react';
import UserDetails from '../UserDetails';
import Search from '../Search';
import './HomeHeader.css';



const HomeHeader = () => {
  return(
    <div className='homeheader'>
    
    <Search />
    <UserDetails />
    
    </div>
  );
};

export default HomeHeader ;