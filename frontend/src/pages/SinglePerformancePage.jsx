import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    async function fetchPerformanceById(performanceId) {
      // Később ide jöhet az API hívás
      const performances = [
        {
          id: 1,
          title: 'Performance1',
          imgUrl: 'https://picsum.photos/307/402',
          price: 200,
          location: 'Színház1',
          actors: ['Actor1', 'Actor2'],
          date: '2025-02-10',
          gallery: [
            'https://picsum.photos/id/1015/200/300',
            'https://picsum.photos/id/1016/200/300',
            'https://picsum.photos/id/1018/200/300',
          ],
        },
        {
          id: 2,
          title: 'Performance2',
          imgUrl: 'https://picsum.photos/307/402',
          price: 2500,
          location: 'Színház2',
          actors: ['Actor3', 'Actor4'],
          date: '2025-03-15',
          gallery: [
            'https://picsum.photos/id/1020/200/300',
            'https://picsum.photos/id/1021/200/300',
            'https://picsum.photos/id/1022/200/300',
          ],
        },
        {
          id: 3,
          title: 'Performance3',
          imgUrl: 'https://picsum.photos/307/402',
          price: 500,
          location: 'Színház3',
          actors: ['Actor5', 'Actor6'],
          date: '2025-04-01',
          gallery: [
            'https://picsum.photos/id/1024/200/300',
            'https://picsum.photos/id/1025/200/300',
            'https://picsum.photos/id/1026/200/300',
          ],
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

            {/* Képgaléria */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Képgaléria</h2>
              <div className="grid grid-cols-3 gap-4">
                {performance.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Galéria kép ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>

            <p className="text-lg mb-2">Helyszín: {performance.location}</p>
            <p className="text-lg mb-2">Ár: {performance.price} Ft/fő</p>
            <p className="text-lg mb-2">Időpont: {performance.date}</p>
            <p className="text-lg mb-2">Közreműködők: {performance.actors.join(', ')}</p>
            <p className="text-lg mb-2">Leírás</p>
            <p className="text-lg mb-2">Kritikák</p>
            <div className="flex justify-around">
              <div>
                <DefaultButton onClick={() => navigate('/performances')} text="Vissza" />
              </div>
              <div>
                <DefaultButton text="Foglalás" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
