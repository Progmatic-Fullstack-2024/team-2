import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Components
import AuthModal from '../components/AuthModal';
import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';
import ListingFuturePerformances from '../components/performances/ListingFuturePerformances';
import PerformancesByTheaters from '../components/performances/PerformancesByTheaters';
import PerformancesNextWeek from '../components/performances/PerformancesNextWeek';
import performancesService from '../services/performances.service';

export default function PerformancesPage() {
  const [performances, setPerformances] = useState();
  const [searchParams] = useSearchParams();
  const rendered = useRef(false);
  const navigate = useNavigate();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const getPeformances = async () => {
    const data = await performancesService.listAll();
    setPerformances(data);
  };

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      localStorage.setItem('empty_performance_img', 'Theatron.jpg');
      getPeformances(searchParams);
    }
  }, []);

  useEffect(() => {
    getPeformances(searchParams);
  }, [searchParams]);

  return (
    <>
      {/* Bevezető szöveg */}
      <ImageTitle title="BreakThe4th" description="Minden, ami független! Minden, ami színház!" />

      {/* Hogyan működik? */}
      {/* Hogyan működik? */}
      <div className="relative max-w-6xl w-full mx-auto bg-cover bg-center bg-fixed bg-[url('/H1.png')] shadow-lg rounded-2xl my-16 sm:px-12 lg:px-20">
        <div className="relative z-10 bg-black bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Hogyan működik?</h2>
          <p className="text-lg text-white mb-6">
            Először is, lépj be! <br /> Vagy, ha még nem tetted, regisztrálj!
          </p>
          <DefaultButton onClick={() => setAuthModalOpen(true)} text="Belépek!" />
        </div>
      </div>

      {/* AuthModal megjelenítése */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AuthModal onClose={() => setAuthModalOpen(false)} />
        </div>
      )}

      {/* Böngészés */}
      <div className="relative max-w-6xl w-full mx-auto bg-cover bg-center bg-fixed bg-[url('/H1.png')] shadow-lg rounded-2xl my-16 sm:px-12 lg:px-20">
        <div className="relative z-10 bg-black bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Böngészd az előadásokat!</h2>
          <p className="text-lg text-white mb-6">
            Egy helyen találod Magyarország legszínesebb független színházi kínálatát.
          </p>
          <DefaultButton onClick={() => navigate('/browse')} text="Böngéssz!" />
          {performances && <PerformancesByTheaters performances={performances} />}
        </div>
      </div>

      {/* Előadások a következő héten */}
      <div className="relative max-w-6xl w-full mx-auto bg-cover bg-center bg-fixed bg-[url('/H1.png')] shadow-lg rounded-2xl my-16 sm:px-12 lg:px-20">
        <div className="relative z-10 bg-black bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">
            Izgalmas! Személyre szabott ajánlások!
          </h2>
          <p className="text-lg text-white mb-6">
            Nézd meg az elkövetkező napok legjobb előadásait, és foglalj időben jegyet!
          </p>
          {performances && <PerformancesNextWeek performances={performances} />}
        </div>
      </div>

      {/* Bérletvásárlás */}
      <div className="relative max-w-6xl w-full mx-auto bg-cover bg-center bg-fixed bg-[url('/H1.png')] shadow-lg rounded-2xl my-16 sm:px-12 lg:px-20">
        <div className="relative z-10 bg-black bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Hogyan tudsz jegyet foglalni?</h2>
          <p className="text-lg text-white mb-6">
            Nézz szét bérleteink között, válaszd ki, amelyik tetszik, vedd meg, és foglalj előadást!
          </p>
          <DefaultButton onClick={() => navigate('/season-tickets')} text="Vásárolj bérletet" />
        </div>
      </div>

      {/* Támogatás */}
      <div className="relative max-w-6xl w-full mx-auto bg-cover bg-center bg-fixed bg-[url('/H1.png')] shadow-lg rounded-2xl my-16 sm:px-12 lg:px-20">
        <div className="relative z-10 bg-black bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Nem állunk meg itt!</h2>
          <p className="text-lg text-white mb-6">
            A BreakThe4th oldalon támogathatod kedvenc csapataid előadásterveit! Válj te is
            mecénássá!
          </p>
          {performances && <ListingFuturePerformances performances={performances} />}
        </div>
      </div>

      {/* Részletes keresés */}
      <div className="relative max-w-6xl w-full mx-auto bg-cover bg-center bg-fixed bg-[url('/H1.png')] shadow-lg rounded-2xl my-16 sm:px-12 lg:px-20">
        <div className="relative z-10 bg-black bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-6">Részletes keresés</h2>
          <p className="text-lg text-white mb-6">
            Itt megtalálsz mindent, keress dátum, színház szerint. Pipáld csak be a tervezett
            előadásokat és már segítheted is a kedvenc színházadat, hogy létrehozza az új
            bemutatóját!
          </p>
          <DefaultButton onClick={() => navigate('/performances')} text="Keress" />
          <p className="mt-5 text-lg text-white mb-6">
            Tartsd rajta a szemedet a téged érdeklő előadásokon! Nyisd meg az előadás olalát, és
            kattints a követés gombra! Kész is, már követed is. Jöhetnek exkluzív információk!
          </p>
        </div>
      </div>
    </>
  );
}
