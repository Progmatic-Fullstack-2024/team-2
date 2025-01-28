import { useEffect, useState } from 'react';

export default function ImageTitle({ title, description, image = 'title_bg_3.jpg' }) {
  const [transparentTitle, setTransparentTitle] = useState(false);

  const isYPositionInLimit = () => {
    const screenYPos = window.pageYOffset;
    if (screenYPos <= 30) return true;
    return false;
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
    <div className="w-screen relative ">
      <img
        className="object-cover z-1 h-72 w-full brightness-[55%] blur-[1px] saturate-[30%]"
        alt={`${title}-image`}
        src={`../../public/${image}`}
      />

      {/* <div className="h-4 bottom-0 absolute w-full z-10 bg-gradient-to-b from-transparent to-c-background " /> */}
      <div
        className={`inset-0 absolute flex flex-col items-center gap-6 z-20 mt-24 mx-auto ${!transparentTitle ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-white text-4xl font-bold ">{title}</h1>
        <p className="text-c-secondary-light text-center overflow-clip max-h-32 text-2xl font-medium tracking-wider mx-20 hidden tablet:inline-block">
          {description}
        </p>
      </div>
    </div>
  );
}
