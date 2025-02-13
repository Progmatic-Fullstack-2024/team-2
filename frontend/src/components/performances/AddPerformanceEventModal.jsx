import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify'; // ✅ Toastify importálása
import * as Yup from 'yup';

import performanceEventService from '../../services/perormanceEvent.service';

const AddPerformanceEventModal = function AddPerformanceEventModal({
  isOpen,
  onClose,
  performanceId,
  onEventAdded,
}) {
  const [errorMessage, setErrorMessage] = useState(null);

  // Ha a modal nincs nyitva, akkor ne renderelje
  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    spots: Yup.number().required('A helyek száma kötelező').min(1, 'Legalább egy hely kell legyen'),
    performanceDate: Yup.string().required('Az előadás dátuma kötelező'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage(null);
    console.log('Beküldött adatok:', values);
    console.log('Performance ID:', performanceId);

    try {
      const newEvent = await performanceEventService.create({
        ...values,
        performanceId,
      });

      console.log('Backend válasz:', newEvent); // 🔍 Itt látjuk, mit ad vissza a backend

      // ✅ Sikeres üzenet toasttal
      toast.success('Új esemény időpont sikeresen hozzáadva');

      onEventAdded(newEvent);
      resetForm();

      // ✅ Időzített bezárás, hogy a toast üzenet látható legyen egy pillanatig
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Backend hiba:', error);
      setErrorMessage(error.error || 'Hiba történt az adatmentés során');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Új Előadás Esemény Hozzáadása</h2>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <Formik
          initialValues={{ spots: '', performanceDate: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Helyek száma:</label>
                <Field type="number" name="spots" className="w-full p-2 border rounded" />
                <ErrorMessage name="spots" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Előadás dátuma (YYYY-MM-DD HH:mm):
                </label>
                <Field type="text" name="performanceDate" className="w-full p-2 border rounded" />
                <ErrorMessage
                  name="performanceDate"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                  Mégse
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isSubmitting ? 'Mentés...' : 'Hozzáadás'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPerformanceEventModal;
