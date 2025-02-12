import DefaultButton from '../components/misc/DefaultButton';
import handleDate from '../utils/handleDates';
import seasonTicketsService from '../services/season-tickets.service';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function BookingModal({
  isOpen,
  onClose,
  selectedTicket,
  setSelectedTicket,
  ticketCount,
  setTicketCount,
  selectedDates,
  performance,
}) {
  if (!isOpen) return null;

  const { user } = useContext(AuthContext);
  const [seasonTickets, setSeasonTickets] = useState([]);
  const userId = user.id;

  const getUserSeasonTickets = async () => {
    try {
      const tickets = await seasonTicketsService.getByUserId({ userId });
      setSeasonTickets(tickets);
    } catch (error) {
      console.error('Hiba történt a bérletek lekérésekor:', error);
    }
  };

  console.log(seasonTickets);
  useEffect(() => {
    getUserSeasonTickets();
  }, []);

  const handleTicketCountChange = (change) => {
    setTicketCount((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Foglalás {handleDate(selectedDates)} {performance.title}
        </h2>

        <label className="block mb-2">Válassz bérletet</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedTicket}
          onChange={(e) => setSelectedTicket(e.target.value)}
        >
          <option value="">-- Válassz --</option>
          {/* Dinamikusan generált opciók */}
          {seasonTickets.length > 0 ? (
            seasonTickets.map((ticket, index) => (
              <option key={index} value={ticket.id}>
                {`Bérlet ${ticket.id} ${ticket.SeasonTicket.name}`} {/* Bérlet 1, Bérlet 2, stb. */}
              </option>
            ))
          ) : (
            <option disabled>Nem található bérlet</option>
          )}
        </select>

        <label className="block mb-2">Jegyek száma</label>
        <div className="flex items-center mb-4">
          <button className="px-3 py-1 border rounded" onClick={() => handleTicketCountChange(-1)}>
            -
          </button>
          <span className="mx-4">{ticketCount}</span>
          <button className="px-3 py-1 border rounded" onClick={() => handleTicketCountChange(1)}>
            +
          </button>
        </div>

        <DefaultButton text="Foglalás" />
        <button className="block mt-4 text-red-500 underline" onClick={onClose}>
          Mégse
        </button>
      </div>
    </div>
  );
}
