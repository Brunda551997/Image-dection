import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import image1 from './image1.png';

const Logo=()=> {
    return (
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa9">
         <img style={{paddingTop:'7px'}} alt='logo' src={image1}/></div>
</Tilt>
        </div>
    );
}

export default Logo;