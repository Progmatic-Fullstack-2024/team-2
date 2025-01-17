import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import PerformanceCardEmpty from './PerformanceCardEmpty';
import DefaultButton from '../misc/DefaultButton';

export default function PerformanceCard({ data }) {
  const gradientClassTop = `bg-gradient-to-b from-black/80  to-transparent to-70% absolute h-1/3 w-full  tablet:rounded-t-2xl`;
  const gradientClassBot = `bottom-0 bg-gradient-to-b from-transparent to-black/80 to-50% absolute h-2/3 w-full tablet:rounded-b-lg `;

  const rendered = useRef(false); // stops unnecessary rerender of imageReady state
  const [imageReady, setImageReady] = useState(false);

  // BAZSI RÉSZE:
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/performances/${data.id}`);
  };

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
      className="flex flex-col justify-between w-full tablet:max-w-96 min-w-72 relative h-96 text-white tablet:rounded-b-lg tablet:rounded-t-2xl bg-cover border border-c-secondary "
      style={{
        backgroundImage: `url(${localStorage.getItem(imageReady)})`,
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
        <span className="self-end text-3xl text-c-secondary-light font-bold mb-2">
          {data.price} <span className="text-white text-xl">Ft/fő</span>
        </span>
        {/* <span>Helyszín : </span> */}
        {/* <span>Közeműködők : </span> */}
        <span className="mb-3">Időpont : {data.performanceDate[0]}</span>
        <DefaultButton text="Érdekel..." />
      </div>
    </div>
  );
}
