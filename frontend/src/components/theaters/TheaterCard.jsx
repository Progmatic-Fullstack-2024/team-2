import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default function TheaterCard({ theater }) {
  return (
    <Link
      to={`/theater/${theater.id}`}
      className="h-80 tablet:w-64 flex flex-col justify-between w-full 
      text-c-text ring-1 ring-c-secondary-light/20
      transition-transform ease-out tablet:hover:scale-105 cursor-pointer
      overflow-hidden group brightness-90 hover:brightness-100"
    >
      <div
        className="flex flex-col h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${theater.imageURL})`,
        }}
      >
        <div
          className="z-10 flex flex-col h-fit bg-c-background/90 mt-auto mb-1 px-3 border-t border-c-secondary/50
         translate-y-[5.5em] transition-translate duration-300 ease-out group-hover:translate-y-[5px]"
        >
          <h1 className="pt-1 mb-2 text-2xl font-semibold overflow-hidden group-hover:text-c-secondary">
            {theater.name}
          </h1>
          <div className="grid grid-cols-3 grid-auto mb-2">
            <p>Cím :</p>
            <span className="col-span-2 text-end truncate font-semibold hover:text-wrap hover:text-white">
              {theater.address}
            </span>
            <p>Email :</p>
            <span className="col-span-2 text-end truncate font-semibold hover:text-wrap hover:text-white">
              {theater.email}
            </span>
            <p>Telefon :</p>
            <span className="col-span-2 text-end truncate font-semibold hover:text-wrap hover:text-white">
              {theater.phone}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

TheaterCard.propTypes = {
  theater: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    seatsAvailable: PropTypes.number.isRequired,
  }).isRequired,
};
