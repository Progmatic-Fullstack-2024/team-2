import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import theatersService from '../../services/theaters.service';
import DefaultButton from '../misc/DefaultButton';

export default function TheaterForm({ theater }) {
  const navigate = useNavigate();

  const [posterPreview, setPosterPreview] = useState(theater?.imageURL || null);
  const [isImageDeleted, setIsImageDeleted] = useState(false); // Jelöli, hogy törölni kell-e a képet

  const initialValues = {
    name: theater?.name || '',
    address: theater?.address || '',
    email: theater?.email || '',
    imageURL: null,
    phone: theater?.phone || '',
    seatsAvailable: theater?.seatsAvailable || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('seatsAvailable', values.seatsAvailable);

    if (values.imageURL instanceof File) {
      formData.append('image', values.imageURL);
    }
    try {
      // 🔹 Ha a kép előnézetet törölte a felhasználó, de nem töltött fel újat, akkor API hívással töröljük az adatbázisból is
      if (isImageDeleted) {
        await theatersService.deleteTheaterImage(theater.id, theater.imageURL);
      }

      // 🔹 Színház adatok módosítása
      const response = await theatersService.updateTheaterById(theater.id, formData);
      if (!response) throw new Error('Hiba történt a színház módosításakor.');

      toast.success('Színház sikeresen módosítva!');
      setTimeout(() => {
        navigate('/theater-admin');
      }, 1000);
    } catch (error) {
      toast.error(`Hiba történt a módosítás során: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePosterChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('imageURL', file);
    setPosterPreview(URL.createObjectURL(file)); // Frissíti a preview-t az új képre
    setIsImageDeleted(false); // Ha új képet töltünk fel, akkor ne törölje az adatbázisból az előzőt
  };

  const handleRemoveImage = (setFieldValue) => {
    setFieldValue('imageURL', null);
    setPosterPreview(null);
    setIsImageDeleted(true); // Jelöljük meg, hogy a képet törölni kell
  };

  return (
    <div className="mx-auto p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">Színház módosítása</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            {/* Színház neve */}
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-800 font-bold">
                Színház neve
              </label>
              <Field
                type="text"
                name="name"
                placeholder={theater?.name || 'Írd be a színház nevét'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Színház címe */}
            <div className="mb-4">
              <label htmlFor="address" className="text-gray-800 font-bold">
                Cím
              </label>
              <Field
                type="text"
                name="address"
                placeholder={theater?.address || 'Írd be a címet'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Színház email */}
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-800 font-bold">
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder={theater?.email || 'Írd be az email címet'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Telefonszám */}
            <div className="mb-4">
              <label htmlFor="phone" className="text-gray-800 font-bold">
                Telefonszám
              </label>
              <Field
                type="text"
                name="phone"
                placeholder={theater?.phone || 'Írd be a telefonszámot'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Ülőhelyek száma */}
            <div className="mb-4">
              <label htmlFor="seatsAvailable" className="text-gray-800 font-bold">
                Elérhető ülőhelyek
              </label>
              <Field
                type="number"
                name="seatsAvailable"
                placeholder={theater?.seatsAvailable || 'Írd be az ülőhelyek számát'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage
                name="seatsAvailable"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Kép feltöltés */}
            <div className="mb-4">
              <label htmlFor="imageURL" className="text-gray-800 font-bold block mb-2">
                Színház képe
              </label>
              <DefaultButton
                text="Kép módosítása"
                type="button"
                onClick={() => document.getElementById('imageURL').click()}
              />
              <input
                type="file"
                id="imageURL"
                accept="image/*"
                onChange={(e) => handlePosterChange(e, setFieldValue)}
                className="hidden"
              />

              {/* Kép előnézet */}
              {posterPreview && (
                <div className="my-2 relative">
                  <img
                    src={posterPreview}
                    alt="Színház képe"
                    className="w-48 h-48 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(setFieldValue)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              )}
              <ErrorMessage name="imageURL" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Gombok */}
            <div className="flex justify-between gap-10">
              <DefaultButton text="Színház módosítása" type="submit" disabled={isSubmitting} />
              <DefaultButton
                text="Mégsem"
                type="button"
                onClick={() => navigate('/theater-admin')}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
