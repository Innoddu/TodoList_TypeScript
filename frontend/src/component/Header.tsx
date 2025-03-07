import React from 'react';
import { format } from 'date-fns'
import '../style/Header.css';


const Header = () =>{
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MMMM do yyyy');
    return(
        <div className='Header'>
            <h3>Today is 📅</h3>
            <h1>{formattedDate}</h1>
        </div>
    );
}

export default Header;