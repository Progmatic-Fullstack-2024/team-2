import { useEffect, useState } from 'react';

import DefaultButton from './DefaultButton';

export default function Gallery({ images, onPrev, onNext, onSelectImage }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/400x600?text=Nincs+kép';
  };

  return (
    <div className="mb-6 w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between space-x-4">
        <DefaultButton onClick={onPrev} text="❮" />

        {/* Mobilon csak egy kép jelenik meg, desktopon három */}
        <div className="flex justify-center flex-1 space-x-4">
          {isMobile ? (
            <button
              type="button"
              onClick={() => onSelectImage(images[0])}
              className="w-full h-auto rounded-lg shadow-md cursor-pointer"
              aria-label="Galéria kép megnyitása"
            >
              <img
                src={images[0] || 'https://via.placeholder.com/400x600?text=Nincs+kép'}
                alt="Galéria kép"
                className="w-full h-40 object-cover rounded-lg"
                onError={handleImageError}
              />
            </button>
          ) : (
            images.slice(0, 3).map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSelectImage(img)}
                className={`w-1/3 h-auto rounded-lg shadow-md cursor-pointer ${
                  index === 1 ? 'scale-105 border-2 border-gray-500' : ''
                }`}
                aria-label={`Galéria kép ${index + 1} megnyitása`}
              >
                <img
                  src={img || 'https://via.placeholder.com/400x600?text=Nincs+kép'}
                  alt={`Galéria kép ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={handleImageError}
                />
              </button>
            ))
          )}
        </div>

        <DefaultButton onClick={onNext} text="❯" />
      </div>
    </div>
  );
}
