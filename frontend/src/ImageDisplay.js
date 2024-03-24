import React from 'react';

const ImageDisplay = ({ imagePath }) => {
  return (
    <div>
      <img src={`/static/images/${imagePath}`} alt="Processed" />
    </div>
  );
};

export default ImageDisplay;