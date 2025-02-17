import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import performanceEventService from '../../services/perormanceEvent.service';
import DefaultButton from '../misc/DefaultButton';

const AddPerformanceEventModal = function AddPerformanceEventModal({
  isOpen,
  onClose,
  performanceId,
  onEventAdded,
}) {
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    spots: Yup.number().required('A helyek száma kötelező').min(1, 'Legalább egy hely kell legyen'),
    performanceDate: Yup.string().required('Az előadás dátuma kötelező'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage(null);

    try {
      const newEvent = await performanceEventService.create({
        ...values,
        performanceId,
      });

      toast.success('Új esemény időpont sikeresen hozzáadva');

      onEventAdded(newEvent);
      resetForm();

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
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
                  Előadás dátuma (YYYY-MM-DD HH.mm):
                </label>
                <Field type="text" name="performanceDate" className="w-full p-2 border rounded" />
                <ErrorMessage
                  name="performanceDate"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <DefaultButton
                  text="Mégse"
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded"
                />
                <DefaultButton
                  text="Hozzáadás"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPerformanceEventModal;
