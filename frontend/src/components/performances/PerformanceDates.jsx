export default function PerformanceDates({ events, selectedDates, onToggleDate }) {
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
              >
                {new Date(event.performanceDate).toLocaleString('hu-HU')}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
