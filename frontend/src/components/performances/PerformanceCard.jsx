import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PerformanceCardEmpty from './PerformanceCardEmpty';
import DefaultButton from '../misc/DefaultButton';

export default function PerformanceCard({ data }) {
  const gradientClassTop = `bg-gradient-to-b from-black/80 to-transparent to-50% absolute h-1/3 w-full  tablet:rounded-t-2xl`;
  const gradientClassBot = `bottom-0 bg-gradient-to-b from-transparent to-black/80 to-50% absolute h-2/3 w-full tablet:rounded-b-lg `;

  const [imageReady, setImageReady] = useState(false);

  // BAZSI RÉSZE:
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/performances/${data.id}`);
  };

  async function fetchImageAndCache(url) {
    const res = await fetch(url);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    localStorage.setItem(url, imageObjectURL);
    setImageReady(true);
  }

  useEffect(() => {
    try {
      fetchImageAndCache(data.imgUrl);
    } catch (error) {
      fetchImageAndCache(data.imgUrl);
    }
  }, []);

  if (!imageReady) return <PerformanceCardEmpty />;

  return (
    <div
      className="flex flex-col justify-between w-full min-w-72 relative h-96 text-white tablet:rounded-b-lg tablet:rounded-t-2xl bg-cover border border-c-secondary "
      style={{
        backgroundImage: `url(${localStorage.getItem(data.imgUrl)})`,
      }}
    >
      <div className={gradientClassTop} />
      <div className={gradientClassBot} />
      <h1 className="z-10 mx-5 mt-3 text-2xl font-semibold">{data.title}</h1>
      <div className="z-10 mx-5 mb-5 flex flex-col bot-0 ">
        <span className="self-end text-2xl font-bold">{data.price} Ft/fő</span>
        <span>Helyszín : </span>
        <span>Közeműködők : </span>
        <span className="mb-3">Időpont : </span>
        <DefaultButton onClick={handleNavigate} text="Érdekel..." />
      </div>
    </div>
  );
}
