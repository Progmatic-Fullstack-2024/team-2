import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);

  // Szimulált API hívás
  useEffect(() => {
    async function fetchPerformanceById(performanceId) {
      // Később cseréld ki API-hívásra
      const performances = [
        {
          id: 1,
          title: 'Performance1',
          imgUrl: 'https://picsum.photos/307/402',
          price: 200,
          location: 'Színház1',
          actors: ['Actor1', 'Actor2'],
          date: '2025-02-10',
        },
        {
          id: 2,
          title: 'Performance2',
          imgUrl: 'https://picsum.photos/307/402',
          price: 2500,
          location: 'Színház2',
          actors: ['Actor3', 'Actor4'],
          date: '2025-03-15',
        },
        {
          id: 3,
          title: 'Performance3',
          imgUrl: 'https://picsum.photos/307/402',
          price: 500,
          location: 'Színház3',
          actors: ['Actor5', 'Actor6'],
          date: '2025-04-01',
        },
      ];
      const foundPerformance = performances.find((p) => p.id === parseInt(performanceId, 10));
      setPerformance(foundPerformance);
    }

    fetchPerformanceById(id);
  }, [id]);

  if (!performance) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        Előadás nem található.
      </div>
    );
  }

  return (
    <>
      <ImageTitle
        title="Az adott előadás címe!"
        description="Keress könnyedén és gyorsan az előadások között, hogy megtaláláld a számodra legalkalmasabbat!"
      />
      <div className="min-h-screen flex flex-col items-center justify-center p-10">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={performance.imgUrl}
            alt={performance.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-5">
            <h1 className="text-3xl font-bold mb-4">{performance.title}</h1>
            <p className="text-lg mb-2">Helyszín: {performance.location}</p>
            <p className="text-lg mb-2">Ár: {performance.price} Ft/fő</p>
            <p className="text-lg mb-2">Időpont: {performance.date}</p>
            <p className="text-lg mb-2">Közreműködők: {performance.actors.join(', ')}</p>
            <p className="text-lg mb-2">Leírás</p>
            <p className="text-lg mb-2">Kritikák</p>
            <DefaultButton onClick={() => navigate('/performances')} text="Vissza" />
          </div>
        </div>
      </div>
    </>
  );
}
