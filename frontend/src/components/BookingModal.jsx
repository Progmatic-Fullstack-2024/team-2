import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DefaultButton from './misc/DefaultButton';
import AuthContext from '../contexts/AuthContext';
import bookingService from '../services/booking.service';
import theatersService from '../services/theaters.service';
import formatDate from '../utils/formatDate';

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
  const [qrCode, setQrCode] = useState(null);
  const [isMailResult, setIsMailResult] = useState(false); // it needs for sending mail procedure
  const [mailRsultMsg, setMailResultMsg] = useState(''); // it needs for sending mail procedure
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

  const isSeasonTicketExpired = new Date() > new Date(selectedSeasonTicket?.expirationDate);


  useEffect(() => {
    getUserSeasonTickets();
    getSoldTickets();
  }, []);

  const handleTicketCountChange = (change) => {
    setTicketCount((prev) => Math.max(0, prev + change));
  };

  const handleBooking = async () => {
    try {
      const ticket = await bookingService.buyTicket({
        performanceEventId,
        userId,
        userSeasonTicketId: selectedTicket,
        seats: ticketCount,
      });
      setQrCode(ticket.qrImage);
      toast.success('Sikeres foglalás! 👏');
    } catch (error) {
      toast.error('Hiba történt a foglaláskor!');
    }
  };

  const handleClose = () => {
    setTicketCount(0); // Visszaállítja a jegyszámot 0-ra
    setSelectedTicket(''); // Alaphelyzetbe állítja a kiválasztott bérletet
    onClose(); // Meghívja az eredeti `onClose` függvényt
  };

  const options = seasonTickets.map((ticket) => ({
    label: `${ticket.SeasonTicket.name} \nExp.: ${formatDate(ticket.expirationDate)} \nMegvehető helyek: ${ticket.remainingSeats}`,
    value: ticket.id,
  }));

  const getLabel = (e) => <div className="whitespace-pre-wrap">{e.label}</div>;

  const sendQrInMail = async () => {
    const index = selectedEvent.performanceDate.indexOf('T');
    const date = selectedEvent.performanceDate.substr(0, index);
    const time = selectedEvent.performanceDate.substr(index + 1, 9);
    let theater = {};
    try {
      theater = await theatersService.getById(performance.theaterId);
    } catch (error) {
      theater.name = 'n.a.';
    }
    const data = {
      userId,
      theater: theater.name,
      title: performance.title,
      date,
      time,
      qrimage: qrCode,
    };
    try {
      const result = await bookingService.sendQrCodeMail(data);
      if (result.result === 'ok') setMailResultMsg('E-mail küldés sikeres.');
      else setMailResultMsg('E-mail küldés sikertelen!');
    } catch (error) {
      setMailResultMsg('E-mail küldés meghiúsult!');
    }
    setIsMailResult(true);
  };

  const cancelMailSendingResult = () => {
    setIsMailResult(false);
    setMailResultMsg('');
  };

  return (
    <div className="mx-2 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-2 rounded-lg shadow-lg w-96 ">
        <h2 className="text-xl font-bold mb-4">
          Foglalás {formatDate(selectedDates)} {performance.title}
        </h2>
        <h3> Szabad helyek: {availableSpots}</h3>

        <Select
          menuPlacement="auto"
          options={options}
          placeholder="Válassz bérletet"
          getOptionLabel={getLabel}
          noOptionsMessage={() => 'Nem található bérlet'}
          onChange={(e) => {
            setSelectedTicket(e.value); // Bérlet kiválasztása
            setTicketCount(0); // Jegyek száma nullázása
          }}
        />

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
            disabled={(ticketCount >= isSeasonTicketStillHasSeats) || isSeasonTicketExpired}
            onClick={() => handleTicketCountChange(1)}
          >
            +
          </button>
        </div>

        <DefaultButton
          text="Foglalás"
          disabled={ticketCount === 0 || qrCode}
          onClick={() => handleBooking()}
        />
        {!qrCode && (
          <button type="button" className="block mt-4 text-red-500 underline" onClick={handleClose}>
            Mégse
          </button>
        )}
        {qrCode && (
          <div className="text-center mt-4">
            <img src={qrCode} alt="Jegy QR-kódja" className="mx-auto w-40 h-40" />
            <a href={qrCode} download="jegy_qr_kod.png">
              <button type="button" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                Letöltés 📥
              </button>
            </a>
            <div className="flex tablet:flex-row justify-between mt-5">
              <DefaultButton
                text="QR kód küldése e-mail-ben"
                onClick={sendQrInMail}
                color="blue-600"
              />
              <DefaultButton text="Vissza" onClick={() => navigate(-1)} />
            </div>
          </div>
        )}
      </div>
      {isMailResult && (
        <div className="bg-c-secondary absolute bottom-16 p-5 flex flex-col rounded">
          <h2 className="mb-2">{mailRsultMsg}</h2>
          <DefaultButton text="Vissza" onClick={cancelMailSendingResult} />
        </div>
      )}
    </div>
  );
}
