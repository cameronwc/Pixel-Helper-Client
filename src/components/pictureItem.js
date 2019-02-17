import React from 'react';

const PictureItem = ({photo}) => (
    <a download href={photo.display_url}><img src={photo.display_url} alt="change this"/></a>
);

export default PictureItem;