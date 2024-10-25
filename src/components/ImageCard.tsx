import React from 'react';

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

interface ImageCardProps {
  image: UnsplashImage;
  onMarkAsFavorite: () => void;
}

const ImageCard = ({ image, onMarkAsFavorite }: ImageCardProps) => {


  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '10px',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  return (
    <div style={containerStyle}>
      <img src={image.urls.small} alt={image.alt_description} style={imgStyle} />
      <button onClick={onMarkAsFavorite}>Marcar como favorita</button>
    </div>
  );
};

export default ImageCard;
