import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import AuthModal from "../AuthModal";

export default function PerformanceDates({ events, selectedDates, onToggleDate}) {
//   const { user } = useContext(AuthContext);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const userId = user?.id;
// console.log(userId);
//   const handleDateClick = (event) => {
//     if (userId === null) {
//       setIsAuthModalOpen(true); // Ha nincs bejelentkezve, AuthModal nyitás
//     } else {
//       onToggleDate(event); // Ha be van jelentkezve, a dátumot választja
//     }
//   };
  return (
    <div>
      <label className="block text-lg font-semibold mt-4">Következő előadás időpontok:</label>

      {/* If no date available */}
      {events.length === 0 ? (
        <p className="mt-2 mb-2">Jelenleg nincs kiírva műsorra ez az előadás.</p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {events.map((event) => {
            const isSelected = selectedDates.includes(event.performanceDate);

            return (
              <button
                key={event.id}
                type="button"
                className={`p-2 border rounded-md transition-all mb-4 ${
                  isSelected ? 'text-xl font-bold border-c-primary' : 'border-gray-300'
                }`}
                // onClick={() => onToggleDate(event.performanceDate)}
                onClick={() => onToggleDate(event)}
                // onClick={() => (userId ? onToggleDate(event) : onRequireAuth())}
                // onClick={() => handleDateClick(event)}
              >
                {new Date(event.performanceDate).toLocaleString('hu-HU')}
              </button>
            );
          })}
        </div>
      )}
      {/* <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} /> */}
    </div>
  );
}
