import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AuthModal from '../components/AuthModal';
import BookingModal from '../components/BookingModal';
import CreatorsList from '../components/creators/CreatorsList';
import DefaultButton from '../components/misc/DefaultButton';
import Gallery from '../components/misc/Galery';
import ImageModal from '../components/misc/ImageModal';
import ImageTitle from '../components/misc/ImageTitle';
import FuturePerformanceDetails from '../components/performances/FuturePerformanceDetails';
import PerformanceDates from '../components/performances/PerformanceDates';
import AuthContext from '../contexts/AuthContext';
import performanceService from '../services/performances.service';
import theaterService from '../services/theaters.service';

export default function DetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [theater, setTheater] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [ticketCount, setTicketCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isLoggedIn = user !== null;
  const [isOwn, setIsOwn] = useState(false);

  useEffect(() => {
    async function fetchPerformanceById(performanceId) {
      try {
        const fetchedPerformance = await performanceService.getById(performanceId);
        setPerformance(fetchedPerformance);

        if (user?.id) {
          const ownStatus = await performanceService.isOwn(performanceId, user.id);
          setIsOwn(ownStatus);
        }
        if (fetchedPerformance?.theaterId) {
          const fetchedTheater = await theaterService.getById(fetchedPerformance.theaterId);
          setTheater(fetchedTheater);
        }
      } catch (err) {
        setError('Nem sikerült betölteni az előadás adatait.');
      }
    }

    fetchPerformanceById(id);
  }, [id, user]);

  const toggleDateSelection = (event) => {
    setSelectedDates([event.performanceDate]); // Csak az aktuálisan kiválasztott dátumot tároljuk
    setSelectedEvent(event); // Teljes performanceEvent mentése
    if (isLoggedIn) setIsBookingModalOpen(true);
    else setIsAuthModalOpen(true);
  };

  const handleNextImage = () => {
    if (performance?.imagesURL) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % performance.imagesURL.length);
    }
  };

  const handlePreviousImage = () => {
    if (performance?.imagesURL) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + performance.imagesURL.length) % performance.imagesURL.length,
      );
    }
  };

  const handleTheaterNavigation = () => {
    if (theater?.id) {
      navigate(`/theater/${theater.id}`);
    }
  };

  const closeModal = () => setSelectedImage(null);

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDates((prevSelected) => prevSelected.slice(0, -1));
  };

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

  // const toggleAuthModal = () => {
  //   setIsAuthModalOpen(true);
  // };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleEdit = () => {
    navigate(`/edit-performance?performanceId=${performance.id}`);
  };

  return (
    <>
      <ImageTitle title={performance.title} />
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-c-primary-dark">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={performance.posterURL || 'https://via.placeholder.com/640x360?text=Nincs+plakát'}
            alt={performance.title || 'Előadás'}
            className="max-w-full max-h-full"
          />
        </div>

        {/* Jövőbeni előadás adatai */}
        <FuturePerformanceDetails futurePerformance={performance.futurePerformance} />

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
          <h1 className="text-3xl font-bold mb-2">{performance.title}</h1>

          {/* ÚJ: Színház neve és navigációs gomb */}
          {theater && (
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-2 mb-8">
              <div className="flex justify-end items-center">
                <DefaultButton text={`${theater.name}`} onClick={handleTheaterNavigation} />
              </div>
            </div>
          )}

          <Gallery
            images={getGalleryImages()}
            onPrev={handlePreviousImage}
            onNext={handleNextImage}
            onSelectImage={setSelectedImage}
          />

          <p className="text-lg mb-2 whitespace-pre-line text-justify">{performance.description}</p>

          <CreatorsList creators={performance.creators} />

          <PerformanceDates
            events={performance.performanceEvents}
            selectedDates={selectedDates}
            onToggleDate={toggleDateSelection}
            // onRequireAuth={toggleAuthModal}
          />

          <div className="flex justify-around">
            <div>
              <DefaultButton onClick={handleBack} text="Vissza" />
            </div>

            <div className="flex justify-around">
              {isOwn && <DefaultButton onClick={handleEdit} text="Módosítás" />}
              {!isOwn && performance.futurePerformance?.id && <DefaultButton text="Támogatom" />}
              {/* {!isOwn && !performance.futurePerformance?.id && <DefaultButton text="Foglalás" />} */}
            </div>
          </div>
        </div>
      </div>

      <ImageModal image={selectedImage} onClose={closeModal} />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        ticketCount={ticketCount}
        setTicketCount={setTicketCount}
        performance={performance}
        selectedDates={selectedDates}
        selectedEvent={selectedEvent}
      />
      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
    </>
  );
}
