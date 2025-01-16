import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Képgörgetéshez
  const [selectedImage, setSelectedImage] = useState(null); // Modalhoz

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
            'https://picsum.photos/id/1015/400/600',
            'https://picsum.photos/id/1016/400/600',
            'https://picsum.photos/id/1018/400/600',
            'https://picsum.photos/id/1020/400/600',
            'https://picsum.photos/id/1021/400/600',
            'https://picsum.photos/id/1022/400/600',
            'https://picsum.photos/id/1023/400/600',
            'https://picsum.photos/id/1024/400/600',
            'https://picsum.photos/id/1025/400/600',
          ],
        },
      ];
      const foundPerformance = performances.find((p) => p.id === parseInt(performanceId, 10));
      setPerformance(foundPerformance);
    }

    fetchPerformanceById(id);
  }, [id]);

  // Képgörgetés kezelése
  const handleNextImage = () => {
    if (performance) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % performance.gallery.length);
    }
  };

  const handlePreviousImage = () => {
    if (performance) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + performance.gallery.length) % performance.gallery.length,
      );
    }
  };

  // Modal bezárása
  const closeModal = () => setSelectedImage(null);

  if (!performance) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        Előadás nem található.
      </div>
    );
  }

  // Galéria három képének kiszámítása
  const getGalleryImages = () => {
    if (!performance) return [];
    const { gallery } = performance;
    const totalImages = gallery.length;

    return [
      gallery[currentImageIndex % totalImages],
      gallery[(currentImageIndex + 1) % totalImages],
      gallery[(currentImageIndex + 2) % totalImages],
    ];
  };

  return (
    <>
      <ImageTitle
        title="Az adott előadás címe!"
        description="Keress könnyedén és gyorsan az előadások között, hogy megtaláld a számodra legalkalmasabbat!"
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
                      className={`w-1/3 h-auto object-cover rounded-lg shadow-md cursor-pointer ${
                        index === 1 ? 'scale-105 border-2 border-gray-500' : ''
                      }`}
                      aria-label={`Galéria kép ${index + 1} megnyitása`}
                    >
                      <img src={img} alt={`Galéria kép ${index + 1}`} className="w-full h-auto" />
                    </button>
                  ))}
                </div>

                {/* Jobb nyíl */}
                <DefaultButton onClick={handleNextImage} text="❯" />
              </div>
            </div>

            <p className="text-lg mb-2">Leírás:</p>
            <p className="text-lg mb-2">Kritikák:</p>
            <p className="text-lg mb-2">Közreműködők: {performance.actors.join(', ')}</p>
            <p className="text-lg mb-2">Helyszín: {performance.location}</p>
            <p className="text-lg mb-2">Ár: {performance.price} Ft/fő</p>
            <p className="text-lg mb-2">Időpont: {performance.date}</p>
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

      {/* Modal a teljes méretű képhez */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              // Csak az Escape gombra zárja be a modalt
              closeModal();
            }
          }}
        >
          <div>
            <img
              src={selectedImage}
              alt="Teljes méretű kép"
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
