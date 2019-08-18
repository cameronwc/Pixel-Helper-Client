import React from 'react';

const PictureItem = ({ photo }) => (
    <a download href={photo.display_url}>
        <img src={photo.display_url} alt={photo.alt_text} />
    </a>
);

export default PictureItem;