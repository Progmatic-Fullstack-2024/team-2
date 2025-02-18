import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CreatorsList from '../components/creators/CreatorsList';
import ImageTitle from '../components/misc/ImageTitle';
import creatorsService from '../services/creators.service';

export default function CreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await creatorsService.getCreatorsAllData();
      setCreators(data);
    } catch (err) {
      toast.error('Hiba történt a színházak lekérése közben:', err);
      setError('Hiba történt az adatok betöltésekor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  if (loading) {
    return (
      <>
        <ImageTitle title="Alkotók" description="Alkotók, akik a BreakThe4th partnerei!" />
        <div className="min-h-screen flex flex-col items-center justify-center pt-32">
          <p className="text-white text-lg">Betöltés...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ImageTitle title="Alkotók" description="Alkotók, akik a BreakThe4th partnerei!" />
        <div className="min-h-screen flex flex-col items-center justify-center pt-32">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ImageTitle title="Alkotók" description="Alkotók, akik a BreakThe4th partnerei!" />
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <CreatorsList creators={creators} />
      </div>
    </>
  );
}
