import { toast } from 'react-toastify';

import DefaultButton from '../misc/DefaultButton';

export default function DeleteCreatorModal({ isOpen, onClose, onDelete, title }) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await onDelete(); // 🔹 Meghívja a törlési függvényt
      toast.success(`"${title}" sikeresen törölve.`);
    } catch (error) {
      toast.error('Hiba történt a törlés során. Próbáld újra!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Biztosan törlöd ezt az alkotót?</h2>
        <p className="mb-4 text-gray-700 font-bold">{title}</p>

        <div className="flex justify-around space-x-4">
          <DefaultButton type="button" text="Mégsem" onClick={onClose} />
          <button
            type="button"
            onClick={handleDelete}
            className="ml-2 bg-red-600 text-white px-4 py-3 rounded font-bold hover:bg-red-500 transition duration-150"
          >
            TÖRLÉS
          </button>
        </div>
      </div>
    </div>
  );
}
