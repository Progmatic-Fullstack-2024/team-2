import DefaultButton from '../misc/DefaultButton';

export default function TheaterForTheaterAdmin({ theater }) {
  if (!theater || !theater.theater) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        Nem található hozzád rendelt színház.
      </div>
    );
  }

  const { name, address, email, imageURL, phone, seatsAvailable } = theater.theater;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      {/* Kép tartalmazó div */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={imageURL || 'https://via.placeholder.com/1200x600?text=Nincs+plakát'}
          alt={name || 'Színház'}
          className="w-full h-auto"
        />
      </div>

      {/* Szöveges tartalom div */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
        <h1 className="text-4xl font-bold mb-6 text-center">{name}</h1>

        <p className="text-lg mb-2">{address}</p>
        <p className="text-lg mb-2">{email}</p>
        <p className="text-lg mb-2">{phone || 'Nincs megadva telefonszám'}</p>
        <p className="text-lg mb-2">
          {seatsAvailable !== null
            ? `${seatsAvailable} elérhető ülőhely`
            : 'Nincs megadva ülőhelykapacitás'}
        </p>

        <div className="flex justify-center mt-5">
          <DefaultButton text="Szerkesztés" />
        </div>
      </div>
    </div>
  );
}
