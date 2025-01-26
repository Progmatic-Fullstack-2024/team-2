import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';
import performanceService from '../services/performances.service';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Képgörgetéshez
  const [selectedImage, setSelectedImage] = useState(null); // Modalhoz
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPerformanceById(performanceId) {
      try {
        const fetchedPerformance = await performanceService.getById(performanceId);
        setPerformance(fetchedPerformance);
      } catch (err) {
        setError('Nem sikerült betölteni az előadás adatait.');
      }
    }

    fetchPerformanceById(id);
  }, [id]);

  // Képgörgetés kezelése
  const handleNextImage = () => {
    if (performance && performance.imagesURL) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % performance.imagesURL.length);
    }
  };

  const handlePreviousImage = () => {
    if (performance && performance.imagesURL) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + performance.imagesURL.length) % performance.imagesURL.length,
      );
    }
  };

  // Modal bezárása
  const closeModal = () => setSelectedImage(null);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">{error}</div>
    );
  }

  if (!performance) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        Előadás betöltése...
      </div>
    );
  }

  // Galéria három képének kiszámítása
  const getGalleryImages = () => {
    if (!performance || !performance.imagesURL || performance.imagesURL.length === 0) {
      return ['https://via.placeholder.com/400x600?text=Nincs+kép'];
    }
    const { imagesURL } = performance;
    const totalImages = imagesURL.length;

    return [
      imagesURL[currentImageIndex % totalImages],
      imagesURL[(currentImageIndex + 1) % totalImages],
      imagesURL[(currentImageIndex + 2) % totalImages],
    ];
  };

  return (
    <>
      <ImageTitle title={performance.title} />
      <div className="min-h-screen flex flex-col items-center justify-center p-10">
        {/* Kép tartalmazó div */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={performance.posterURL || 'https://via.placeholder.com/640x360?text=Nincs+plakát'}
            alt={performance.title || 'Előadás'}
            className="max-w-full max-h-full"
          />
        </div>

        {/* Szöveges tartalom div */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
          <h1 className="text-3xl font-bold mb-4">{performance.title}</h1>

          {/* Képgaléria */}
          <div className="mb-6">
            <div className="w-full flex items-center justify-between space-x-4">
              {/* Bal nyíl */}
              <DefaultButton onClick={handlePreviousImage} text="❮" />

              {/* Három kép */}
              <div className="flex justify-center flex-1 space-x-4">
                {getGalleryImages().map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(img)}
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
              <DefaultButton onClick={handleNextImage} text="❯" />
            </div>
          </div>

          <p className="text-lg mb-2">{performance.description}</p>
          <p className="text-lg mb-2">Ár: {performance.price} Ft/fő</p>
          <p className="text-lg mb-2">
            Időpont(ok):{' '}
            {performance.performanceDate
              .map((date) => new Date(date).toLocaleString('hu-HU'))
              .join(', ')}
          </p>
          <div className="flex justify-around">
            <DefaultButton onClick={() => navigate('/')} text="Vissza" />
            <DefaultButton text="Foglalás" />
          </div>
        </div>

        {/* Modal a teljes méretű képhez */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={closeModal}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                closeModal();
              }
            }}
          >
            <div>
              <img
                src={selectedImage}
                alt="Teljes méretű kép"
                className="max-w-4xl max-h-4xl rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
