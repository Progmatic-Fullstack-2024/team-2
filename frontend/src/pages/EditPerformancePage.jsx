import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ImageTitle from '../components/misc/ImageTitle.jsx';
import EditPerformanceForm from '../components/performances/EditPerformanceForm.jsx';
import performancesService from '../services/performances.service.js';

export default function EditPerformancePage() {
  const [searchParams] = useSearchParams(); // Query paraméterek beolvasása
  const id = searchParams.get('performanceId'); // Az `id` kiolvasása a query-ből
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(id);
  console.log('useParams:', useSearchParams());

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const fetchedPerformance = await performancesService.getById(id);
        setPerformance(fetchedPerformance);
      } catch (error) {
        console.error('Hiba a színház betöltésekor:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerformance();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Betöltés...</div>;
  }

  if (!performance) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Nem található előadás.
      </div>
    );
  }

  return (
    <>
      <ImageTitle
        title="Előadás módosítássa"
        description="Itt tudod szerkeszteni az előadásod adatait"
      />
      <div className="min-h-screen flex flex-col items-center">
        <EditPerformanceForm performance={performance} /> {/* Továbbadjuk az adatokat */}
      </div>
    </>
  );
}
