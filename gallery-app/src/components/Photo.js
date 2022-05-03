import React from 'react';

const Photo = ({server,id,secret}) => {
    const sizeSuffix= 'w';
    const url = `https://live.staticflickr.com/${server}/${id}_${secret}_${sizeSuffix}.jpg`
    return (
        <li>
            <img src={url} alt="" />
        </li>
    )
};

export default Photo;