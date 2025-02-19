import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PerformanceCardEmpty from './PerformanceCardEmpty';

function converDate(date) {
  return new Date(date).toLocaleTimeString('hun', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

let previousId = null;
const spanClass = 'col-span-2 text-end truncate font-semibold hover:text-wrap hover:text-white ';

export default function PerformanceCard({ data }) {
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
    console.log('PerformanceCard received data:', data);
    if (previousId !== data.id) {
      previousId = data.id;
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
      className="h-80 tablet:w-64  flex flex-col justify-between w-full 
      text-c-text 
      ring-1 ring-c-secondary-light/20
      transition-transform ease-out tablet:hover:scale-105 cursor-pointer
      overflow-hidden group brightness-90 hover:brightness-100"
    >
      <div
        className="flex flex-col h-full  bg-center bg-cover "
        style={{
          backgroundImage: `url(${localStorage.getItem(imageReady)})`,
        }}
      >
        <div
          className=" z-10 flex flex-col h-fit bg-c-background/90 mt-auto mb-1 px-3 border-t border-c-secondary/50
         translate-y-[5.5em] transition-translate duration-300 ease-out group-hover:translate-y-[5px]"
        >
          <h1 className="pt-1 mb-2 text-2xl font-semibold overflow-hidden group-hover:text-c-secondary">
            {data.title}
          </h1>
          <div className="grid grid-cols-3 grid-auto mb-2 ">
            <p>Helyszín :</p>
            <span className={spanClass}>{data.theater.name}</span>
            <p>Cím :</p>
            <span className={spanClass}>{data.theater.address}</span>
            <p>Időpont :</p>
            <span className={spanClass}>
              {(data.performanceEvents[0] &&
                converDate(data.performanceEvents[0].performanceDate)) ||
                'Készülőben...'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
