import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DefaultButton from './misc/DefaultButton';
import AuthContext from '../contexts/AuthContext';
import bookingService from '../services/booking.service';
import handleDate from '../utils/handleDates';

export default function BookingModal({
  isOpen,
  onClose,
  selectedTicket,
  setSelectedTicket,
  ticketCount,
  setTicketCount,
  selectedDates,
  performance,
  selectedEvent,
}) {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [seasonTickets, setSeasonTickets] = useState([]);
  const [soldTickets, setsoldTickets] = useState([]);
  const userId = user.id;
  const performanceEventId = selectedEvent.id;

  const getUserSeasonTickets = async () => {
    try {
      const tickets = await bookingService.getByUserId({ userId });
      setSeasonTickets(tickets);
    } catch (error) {
      toast.error('Hiba történt a bérletek lekérésekor:', error);
    }
  };

  const getSoldTickets = async () => {
    try {
      const bookedTickets = await bookingService.getSoldTickets({ performanceEventId });
      setsoldTickets(bookedTickets);
    } catch (error) {
      toast.error('Hiba történt a jegyek lekérésekor:', error);
    }
  };

  const availableSpots = (selectedEvent?.spots ?? 0) - (soldTickets ?? 0);

  const selectedSeasonTicket = seasonTickets.find((ticket) => ticket.id === selectedTicket);
  const isSeasonTicketStillHasSeats = selectedSeasonTicket
    ? Math.min(selectedSeasonTicket.remainingSeats, availableSpots) // A kisebbik érték kerül be
    : 0;

  useEffect(() => {
    getUserSeasonTickets();
    getSoldTickets();
  }, []);

  const handleTicketCountChange = (change) => {
    setTicketCount((prev) => Math.max(0, prev + change));
  };

  // const handleBooking = async () => {
  //   try {
  //     await bookingService.buyTicket({
  //       performanceEventId,
  //       userId,
  //       userSeasonTicketId: selectedTicket,
  //       seats: ticketCount,
  //     });
  //     await toast.promise(Promise.resolve(), {
  //       pending: 'Foglalás folyamatban...',
  //       success: 'Sikeres foglalás! 👏',
  //     });
  //     navigate(-1);
  //   } catch (error) {
  //     toast.error('Hiba történt a foglaláskor:', error);
  //   }
  // };

  const handleBooking = async () => {
    try {
      await bookingService.buyTicket({
        performanceEventId,
        userId,
        userSeasonTicketId: selectedTicket,
        seats: ticketCount,
      });
  
      toast.success("Sikeres foglalás! 👏");
  
      // 3.5 másodperc várakozás a toast megjelenítésére
      setTimeout(() => {
        navigate(-1);
      }, 3500);
    } catch (error) {
      toast.error("Hiba történt a foglaláskor!");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Foglalás {handleDate(selectedDates)} {performance.title}
        </h2>
        <h3> Szabad helyek: {availableSpots}</h3>
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
                {`${ticket.SeasonTicket.name} Lej.: ${handleDate(ticket.expirationDate)} Megvehető helyek: ${ticket.remainingSeats}`}
              </option>
            ))
          ) : (
            <option disabled>Nem található bérlet</option>
          )}
        </select>

        <label className="block mb-2">Jegyek száma</label>
        <div className="flex items-center mb-4">
          <button
            type="button"
            className="px-3 py-1 border rounded"
            onClick={() => handleTicketCountChange(-1)}
          >
            -
          </button>
          <span className="mx-4">{ticketCount}</span>
          <button
            type="button"
            className="px-3 py-1 border rounded"
            disabled={ticketCount >= isSeasonTicketStillHasSeats}
            onClick={() => handleTicketCountChange(1)}
          >
            +
          </button>
        </div>

        <DefaultButton
          text="Foglalás"
          disabled={ticketCount === 0}
          onClick={() => handleBooking()}
        />
        <button type="button" className="block mt-4 text-red-500 underline" onClick={onClose}>
          Mégse
        </button>
      </div>
    </div>
  );
}
