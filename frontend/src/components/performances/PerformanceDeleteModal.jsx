import { toast } from 'react-toastify';

import axiosInstance from '../../services/axiosInstance';
import DefaultButton from '../misc/DefaultButton';

function PerformanceDeleteModal({ isOpen, onClose, performanceId, title, onDeleteSuccess }) {
  if (!isOpen) return null; // Ha nincs nyitva a modal, akkor nem renderel

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/api/performances/${performanceId}`);
      toast.success(`"${response.data.deletedPerformance.title}" sikeresen törölve.`);

      if (onDeleteSuccess) {
        onDeleteSuccess(response.data.deletedPerformance.id); // Frissítés
      }
      onClose(); // Modal bezárása
    } catch (error) {
      toast.error('Hiba történt a törlés során. Próbáld újra!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Biztosan törlöd ezt az előadást?</h2>
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

export default PerformanceDeleteModal;
