import React from 'react';

const Navigation=({onRouteChange,issign})=> {
        if(issign){
            return(
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={()=> onRouteChange('signout')} className='f3 link dim blank underline pa3'> Sign Out</p>
        </nav>
            );
        }
        else{
            return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p onClick={()=> onRouteChange('sign')} className='f3 link dim blank underline pa3'> Sign In</p>
            <p onClick={()=> onRouteChange('register')} className='f3 link dim blank underline pa3'> Register</p>
        </nav>
    );
}
}

export default Navigation;