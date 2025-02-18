import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function CreatorsList({ creators }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!creators || creators.length === 0) {
    return null;
  }

  console.log('CreatorsList creators: ', creators);

  return (
    <div className="w-full max-w-desktop shadow-lg rounded-lg overflow-hidden p-10 ">
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 mt-5 bg-cover bg-center bg-fixed bg-[url('/H1.png')]">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className={`p-4 border border-c-primary-dark bg-c-background bg-opacity-75 rounded-lg shadow ${isMobile ? 'flex flex-col items-center space-y-4' : 'flex items-center space-x-4'}`}
          >
            <img
              src={creator.imageURL || 'https://via.placeholder.com/100'}
              alt={creator.name}
              className={`w-20 text-c-secondary-light h-20 object-cover rounded-full ${isMobile ? '' : 'mr-4'}`}
            />
            <div className={`${isMobile ? 'text-center' : ''}`}>
              <h3 className="text-lg text-c-secondary-light font-semibold">{creator.name}</h3>
              <p className="text-sm text-c-secondary-dark">{creator.profession.join(', ')}</p>
              <p className="text-sm text-c-secondary-light">{creator.awards}</p>
              <p className="text-sm text-c-secondary-dark">{creator.introductions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CreatorsList.propTypes = {
  creators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageURL: PropTypes.string,
      profession: PropTypes.arrayOf(PropTypes.string),
      awards: PropTypes.string,
      introductions: PropTypes.string,
    }),
  ),
};

CreatorsList.defaultProps = {
  creators: [],
};
