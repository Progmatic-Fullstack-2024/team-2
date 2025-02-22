import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import PerformanceCardEmpty02 from './PerformanceCardEmpty02';

export default function LandingPagePerformanceCard({ data }) {
  const rendered = useRef(false);
  const [imageReady, setImageReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <Link
      to={`/performances/${data.id}`}
      className={`flex flex-col justify-between w-full tablet:max-w-96 min-w-72 relative h-96 text-white tablet:rounded-b-lg tablet:rounded-t-2xl bg-cover border border-c-secondary transform transition-transform duration-500 ${
        isHovered ? 'scale-95' : 'scale-75'
      } cursor-pointer`}
      style={{ backgroundImage: `url(${localStorage.getItem(imageReady)})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          <span className="font-bold">Időpontok: </span>
          <p>{data.performanceEvents[0]?.performanceDate}</p>
        </div>
        {isHovered && (
          <>
            <span className="self-end text-3xl text-c-secondary-light font-bold mb-2">
              {/* {data.price} <span className="text-white text-xl">Ft/fő</span> */}
            </span>
            <span>Helyszín: {data.theater.name || 'N/A'}</span>
            <span>Cím: {data.theater.address || 'N/A'}</span>
          </>
        )}
      </div>
    </Link>
  );
}
