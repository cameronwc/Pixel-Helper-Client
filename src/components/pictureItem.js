import React from 'react';

const PictureItem = ({photo}) => (
    <div className="img-wrapper">
        <a download href={photo.display_url}><img src={photo.display_url} alt="change this"/></a>
        <div className="img-info">
            <div className="item">Width: {photo.width}</div>
            <div className="item">Height: {photo.height}</div>
            <div className="item">Source: {photo.source}</div>
        </div>
    </div>
);

export default PictureItem;