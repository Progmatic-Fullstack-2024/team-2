import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatorsList({ creators }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate(); // Navigációs hook

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

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/creator/${id}`);
    }
  };

  return (
    <div className="w-full max-w-desktop shadow-lg rounded-lg overflow-hidden p-10">
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 mt-3 bg-cover bg-center bg-fixed bg-[url('/H1.png')] rounded-lg">
        {creators.map((creator) => (
          <div
            key={creator.id}
            role="button" // 🔹 Jelezzük, hogy interaktív elem
            tabIndex={0} // 🔹 Fókuszálhatóvá tesszük
            className={`p-4 border border-c-primary-dark bg-c-background bg-opacity-75 rounded-lg shadow ${
              isMobile ? 'flex flex-col items-center space-y-4' : 'flex items-center space-x-4'
            } hover:scale-105 transition duration-300 hover:bg-opacity-90 hover:cursor-pointer`}
            onClick={() => navigate(`/creators/${creator.id}`)} // 🔹 Kattintásra navigáció
            onKeyDown={(event) => handleKeyDown(event, creator.id)} // 🔹 Billentyűzet támogatás
          >
            <img
              src={creator.imageURL || 'https://via.placeholder.com/100'}
              alt={creator.name}
              className={`w-20 text-c-secondary-light h-20 object-cover rounded-full ${
                isMobile ? '' : 'mr-4'
              }`}
            />
            <div className={`${isMobile ? 'text-center' : ''}`}>
              <h3 className="text-lg text-c-secondary-light font-semibold">{creator.name}</h3>
              <p className="text-sm text-c-secondary-dark">{creator.profession.join(', ')}</p>
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
