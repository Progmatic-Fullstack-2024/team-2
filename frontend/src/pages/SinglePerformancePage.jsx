import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import CreatorsList from '../components/creators/CreatorsList';
import DefaultButton from '../components/misc/DefaultButton';
import Gallery from '../components/misc/Galery';
import ImageModal from '../components/misc/ImageModal';
import ImageTitle from '../components/misc/ImageTitle';
import PerformanceDates from '../components/performances/PerformanceDates';
import performanceService from '../services/performances.service';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Képgörgetéshez
  const [selectedImage, setSelectedImage] = useState(null); // Modalhoz
  const [selectedDates, setSelectedDates] = useState('');
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

  // Date selection handling
  const toggleDateSelection = (date) => {
    setSelectedDates(
      (prevSelected) =>
        prevSelected.includes(date)
          ? prevSelected.filter((d) => d !== date) // Ha már benne van, törli
          : [...prevSelected, date], // Ha nincs benne, hozzáadja
    );
  };
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

  // Vissza gomb funkció

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
      navigate('/');
    }
  };

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
      <div className="min-h-screen flex flex-col items-center justify-center p-10  text-c-primary-dark">
        {/* Poster div */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={performance.posterURL || 'https://via.placeholder.com/640x360?text=Nincs+plakát'}
            alt={performance.title || 'Előadás'}
            className="max-w-full max-h-full"
          />
        </div>

        {/* Description div */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
          <h1 className="text-3xl font-bold mb-4">{performance.title}</h1>

          {/* Gallery */}
          <Gallery
            images={getGalleryImages()}
            onPrev={handlePreviousImage}
            onNext={handleNextImage}
            onSelectImage={setSelectedImage}
          />

          <p className="text-lg mb-2">{performance.description}</p>

          <CreatorsList creators={performance.creators} />

          {/* Select Dates */}
          <PerformanceDates
            events={performance.performanceEvents}
            selectedDates={selectedDates}
            onToggleDate={toggleDateSelection}
          />

          <div className="flex justify-around">
            <div>
              <DefaultButton onClick={handleBack} text="Vissza" />
            </div>
            <div>
              <DefaultButton text="Foglalás" />
            </div>
          </div>
        </div>
      </div>

      {/* Teljes méretű kép megjelenítése */}
      <ImageModal image={selectedImage} onClose={closeModal} />
    </>
  );
}
