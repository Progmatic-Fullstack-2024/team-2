import DefaultButton from '../components/misc/DefaultButton';
import handleDate from '../utils/handleDates';

export default function BookingModal({ isOpen, onClose, selectedTicket, setSelectedTicket, ticketCount, setTicketCount, selectedDates, performance }) {
  if (!isOpen) return null;

  const handleTicketCountChange = (change) => {
    setTicketCount((prev) => Math.max(1, prev + change));
  };

  ;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Foglalás {handleDate(selectedDates)} {performance.title}</h2>

        <label className="block mb-2">Válassz bérletet</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedTicket}
          onChange={(e) => setSelectedTicket(e.target.value)}
        >
          <option value="">-- Válassz --</option>
          <option value="berlet1">Bérlet 1</option>
          <option value="berlet2">Bérlet 2</option>
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