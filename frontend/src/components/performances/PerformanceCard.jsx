import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import PerformanceCardEmpty from './PerformanceCardEmpty';

function converDate(date) {
  const newDate = new Date(date).toLocaleTimeString('hun', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return newDate;
}

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
         translate-y-[4rem] transition-translate duration-300 ease-out group-hover:translate-y-[5px]"
        >
          <h1 className="pt-1 mb-2 text-2xl font-semibold overflow-hidden group-hover:text-c-secondary">
            {data.title}
          </h1>
          <div className="mb-2 ">
            <p>Helyszín : </p>
            <p className="flex justify-between">
              Időpont :<span>{converDate(data.performanceDate[0])}</span>{' '}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
