import React from 'react';

const Photo = (props, key) => {
    return(      
            <li>            
                <img src= {`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_q.jpg`} key={`${key}`} alt={`${props.alt}`}/>
            </li> 
    );
}

export default Photo;