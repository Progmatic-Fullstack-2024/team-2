import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import PerformanceCardEmpty from './PerformanceCardEmpty';

export default function PerformanceCard({ data }) {
  const rendered = useRef(false); // stops unnecessary rerender of imageReady state
  const [imageReady, setImageReady] = useState(false);

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
  if (!imageReady) return <PerformanceCardEmpty />;
  return (
    <Link
      to={`/performances/${data.id}`}
      className="h-100 flex flex-col justify-between w-full tablet:w-80 
      bg-c-secondary-light/10 tablet:rounded-md text-c-text 
      ring-1 ring-c-secondary-light/20
      transition-transform ease-out hover:scale-110 hover:bg-c-secondary/20 cursor-pointer"
    >
      <div
        className="flex flex-col relative min-h-60 bg-cover rounded-t-md"
        style={{
          backgroundImage: `url(${localStorage.getItem(imageReady)})`,
        }}
      />

      <div className="z-10 mx-3  flex flex-col h-fit bot-0">
        <h1 className="z-10 mb-2 text-2xl font-semibold truncate">{data.title}</h1>

        <span className="self-end text-3xl text-c-accent font-bold mb-2">
          {data.price} <span className="text-c-text text-xl">Ft/fő</span>
        </span>
        <span>Helyszín : </span>
        {data.performanceEvents[0] && (
          <span className="mb-3">Időpont : {data.performanceEvents[0].performanceDate}</span>
        )}
      </div>
    </Link>
  );
}
