import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PerformanceCardEmpty from './PerformanceCardEmpty';
import AuthContext from '../../contexts/AuthContext';
import DefaultButton from '../misc/DefaultButton';

export default function PerformanceCard({ data }) {
  const rendered = useRef(false);
  const [imageReady, setImageReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Hover state
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
  }, []);

  if (imageReady === false) return <PerformanceCardEmpty />;

  return (
    <div
      className={`flex flex-col justify-between w-full tablet:max-w-96 min-w-72 relative h-96 text-white tablet:rounded-b-lg tablet:rounded-t-2xl bg-cover border border-c-secondary transform transition-transform duration-500 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      style={{
        backgroundImage: `url(${localStorage.getItem(imageReady)})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        id="top-gradient"
        className="bg-gradient-to-b from-black/80 to-transparent to-70% absolute h-1/3 w-full tablet:rounded-t-2xl"
      />
      <div
        id="bot-gradient"
        className={`bottom-0 bg-gradient-to-b from-transparent to-black/80 to-50% absolute h-2/3 w-full tablet:rounded-b-lg `}
      />
      <h1 className="z-10 mx-5 mt-3 text-2xl font-semibold">{data.title}</h1>
      <div className="z-10 mx-5 mb-5 flex flex-col bot-0">
        <span className="mb-3">Időpont: {data.performanceDate[0]}</span>
        {isHovered && ( // Show additional details on hover
          <>
            <span className="self-end text-3xl text-c-secondary-light font-bold mb-2">
              {data.price} <span className="text-white text-xl">Ft/fő</span>
            </span>
            <span>Helyszín: {data.location || 'N/A'}</span>
            <span>Közreműködők: {data.participants || 'N/A'}</span>
          </>
        )}
        {user ? (
          <DefaultButton onClick={() => navigate(`/performances/${data.id}`)} text="Érdekel..." />
        ) : (
          <DefaultButton onClick={() => navigate('/login')} text="Bejelentkezem" />
        )}
      </div>
    </div>
  );
}
