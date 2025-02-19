import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';
import PerformanceCard from '../components/performances/PerformanceCard';
import creatorsService from '../services/creators.service';

export default function SingleCreatorPage() {
  const { id } = useParams(); // 🔹 Az URL-ből kinyerjük a creator ID-ját
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const data = await creatorsService.getCreatorById(id); // 🔹 Service hívás az adatok betöltésére
        console.log('Creator data:', data); // 🔹 Nézzük meg, mit kapunk vissza
        setCreator(data);
      } catch (err) {
        setError('Hiba történt az alkotó betöltése közben.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (loading) return <div className="text-center text-lg">🔄 Betöltés...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!creator) return <div className="text-center text-gray-500">Nem található az alkotó.</div>;

  return (
    <>
      <ImageTitle title={creator.name} />
      <div className="bg-cover bg-center bg-fixed bg-[url('/H1.png')] ">
        <div className="max-w-5xl mx-auto p-5 bg-c-background bg-opacity-95 shadow-lg rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={creator.imageURL || 'https://via.placeholder.com/150'}
              alt={creator.name}
              className="rounded-lg object-cover border border-c-primary"
            />
            <h1 className="text-2xl font-bold text-c-primary-light">{creator.name}</h1>
            <p className="text-lg text-c-primary-light">
              <strong>Foglalkozás:</strong> {creator.profession.join(', ')}
            </p>
            <p className="text-md text-c-primary-light pt-3 pb-2">
              <strong>Díjak:</strong> {creator.awards || 'Nincs megadva'}
            </p>
            <p className="text-md text-c-primary-light">{creator.introductions}</p>
          </div>
          {/* 🔹 Külső komponens használata az előadásokhoz */}
          {creator.performances && creator.performances.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-c-primary-dark mb-5">
                Előadások, amikben dolgozik:
              </h2>
              <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
                {creator.performances.map((performance) => (
                  <PerformanceCard key={performance.id} data={performance} />
                ))}
              </div>
            </div>
          )}
          <div className="mt-10 flex justify-center">
            <DefaultButton onClick={handleBack} text="Vissza" />
          </div>
        </div>
      </div>
    </>
  );
}
