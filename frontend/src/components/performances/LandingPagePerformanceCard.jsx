import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PerformanceCardEmpty02 from './PerformanceCardEmpty02';

export default function LandingPagePerformanceCard({ data }) {
  const rendered = useRef(false);
  const [imageReady, setImageReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  async function fetchImageAndCache(url) {
    try {
      const res = await fetch(url);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      localStorage.setItem(url, imageObjectURL);
      setImageReady(url);
    } catch (error) {
      setImageReady('empty_performance_img');
    }
  }

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      if (data.posterURL) {
        try {
          fetchImageAndCache(data.posterURL);
        } catch (error) {
          setImageReady('empty_performance_img');
        }
      } else {
        setImageReady('empty_performance_img');
      }
    }
  }, [data.posterURL]);

  if (imageReady === false) return <PerformanceCardEmpty02 />;

  const handleCardClick = () => {
    navigate(`/performances/${data.id}`);
  };

  return (
    <div
      className={`flex flex-col justify-between w-full tablet:max-w-96 min-w-72 relative h-96 text-white tablet:rounded-b-lg tablet:rounded-t-2xl bg-cover border border-c-secondary transform transition-transform duration-500 ${
        isHovered ? 'scale-95' : 'scale-75'
      } cursor-pointer`}
      style={{ backgroundImage: `url(${localStorage.getItem(imageReady)})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div
        id="top-gradient"
        className="bg-gradient-to-b from-black/80 to-transparent to-70% absolute h-1/3 w-full tablet:rounded-t-2xl"
      />
      <div
        id="bot-gradient"
        className="bottom-0 bg-gradient-to-b from-transparent to-black/80 to-50% absolute h-2/3 w-full tablet:rounded-b-lg"
      />
      <h1 className="z-10 mx-5 mt-3 text-2xl font-semibold">{data.title}</h1>
      <div className="z-10 mx-5 mb-5 flex flex-col bot-0">
        <div className="mb-3">
          <span className="font-bold">Időpontok:</span>
          <ul className="list-disc list-inside">
            {data.performanceEvents.map((event) => {
              const formattedDate = new Date(event.performanceDate).toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              const formattedTime = new Date(event.performanceDate).toLocaleTimeString('hu-HU', {
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <li key={event.performanceDate}>
                  {formattedDate}, {formattedTime}
                </li>
              );
            })}
          </ul>
        </div>
        {isHovered && (
          <>
            <span className="self-end text-3xl text-c-secondary-light font-bold mb-2">
              {data.price} <span className="text-white text-xl">Ft/fő</span>
            </span>
            <span>Helyszín: {data.location || 'N/A'}</span>
            <span>Közreműködők: {data.participants || 'N/A'}</span>
          </>
        )}
      </div>
    </div>
  );
}
