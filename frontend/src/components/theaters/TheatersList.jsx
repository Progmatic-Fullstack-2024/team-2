import PropTypes from 'prop-types';

import TheaterCard from './TheaterCard';
import TheaterCardEmpty from './TheaterCardEmpty'; // Placeholder ha nincs adat

export default function TheatersList({ theaters }) {
  return (
    <section className="w-full tablet:w-fit grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 py-10 gap-10 tablet:gap-10 border-y-2 border-gray-700">
      {theaters.length > 0 || (
        <span className="ms-4 text-white font-semibold text-xl italic">Nincs találat!</span>
      )}
      {theaters.length > 0
        ? theaters.map((theater) =>
            theater ? <TheaterCard key={theater.id} theater={theater} /> : null,
          )
        : [...Array(4)].map((_, index) => <TheaterCardEmpty key={index} hidden />)}
    </section>
  );
}

TheatersList.propTypes = {
  theaters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      seatsAvailable: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
