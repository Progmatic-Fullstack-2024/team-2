import DefaultButton from './DefaultButton';

export default function Gallery({ images, onPrev, onNext, onSelectImage }) {
  return (
    <div className="mb-6">
      <div className="w-full flex items-center justify-between space-x-4">
        {/* Bal nyíl */}
        <DefaultButton onClick={onPrev} text="❮" />

        {/* Három kép */}
        <div className="flex justify-center flex-1 space-x-4">
          {images.map((img, index) => (
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
                onError={() => 'https://via.placeholder.com/400x600?text=Nincs+kép'}
              />
            </button>
          ))}
        </div>

        {/* Jobb nyíl */}
        <DefaultButton onClick={onNext} text="❯" />
      </div>
    </div>
  );
}
