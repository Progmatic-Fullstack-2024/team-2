import { useEffect, useState } from 'react';

export default function ImageTitle({ title, description, image = 'B2.png' }) {
  const [transparentTitle, setTransparentTitle] = useState(false);

  const isYPositionInLimit = () => {
    return window.pageYOffset <= 30;
  };

  const handleScroll = () => {
    setTransparentTitle(!isYPositionInLimit());
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!title) return null;

  return (
    <div className="relative w-full h-72 overflow-hidden">
      {/* 🔹 Háttérkép (Ugyanolyan blending hatással, mint a Footerben) */}
      <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
        src={`/${image}`}
        alt={`${title}-image`}
      />

      {/* 🔹 Szöveg */}
      <div
        className={`relative flex flex-col items-center gap-4 top-24 mx-auto z-10 transition-opacity duration-300 ${
          transparentTitle ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h1 className="text-white text-4xl mt-14 font-bold">{title}</h1>
        <p className="p-1 text-c-secondary-light text-center overflow-clip max-h-32 text-2xl font-medium tracking-wider mx-20 hidden tablet:inline-block">
          {description}
        </p>
      </div>
    </div>
  );
}
