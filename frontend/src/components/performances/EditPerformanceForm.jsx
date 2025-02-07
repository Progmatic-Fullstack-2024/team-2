import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import performancesService from '../../services/performances.service';
// import theatersService from '../../services/theaters.service';
import DefaultButton from '../misc/DefaultButton';

export default function PerformanceForm({ performance }) {
  const navigate = useNavigate();

  const [posterPreview, setPosterPreview] = useState(performance?.imageURL || null);
  const [isImageDeleted, setIsImageDeleted] = useState(false); // Jelöli, hogy törölni kell-e a képet

  const initialValues = {
    title: performance?.title || '',
    theaterId: performance?.theaterId || '',
    description: performance?.description || '',
    posterURL: null,
    targetAudience: performance?.targetAudience || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('theaterId', values.theaterId);
    formData.append('description', values.description);
    formData.append('targetAudience', values.targetAudience);

    if (values.posterURL instanceof File) {
      formData.append('psoterURL', values.posterURL);
    }
    console.log(performance.posterURL);
    console.log(performance.id);
    try {
      // 🔹 Ha a kép előnézetet törölte a felhasználó, de nem töltött fel újat, akkor API hívással töröljük az adatbázisból is
      if (isImageDeleted) {
        await performancesService.deletePoster(performance.id, performance.posterURL);
        console.log(`Törölt kép az adatbázisból: ${performance.posterURL}`);
      }

      // 🔹 Színház adatok módosítása
      const response = await performancesService.update(performance.id, formData);
      if (!response) throw new Error('Hiba történt az előadás módosításakor.');

      toast.success('Előadás sikeresen módosítva!');
      setTimeout(() => {
        navigate('/theater-admin');
      }, 1000);
    } catch (error) {
      console.error('API hiba:', error);
      toast.error(`Hiba történt a módosítás során: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePosterChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('posterURL', file);
    setPosterPreview(URL.createObjectURL(file)); // Frissíti a preview-t az új képre
    setIsImageDeleted(false); // Ha új képet töltünk fel, akkor ne törölje az adatbázisból az előzőt
  };

  const handleRemoveImage = (setFieldValue) => {
    setFieldValue('posterURL', null);
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
              <label htmlFor="title" className="text-gray-800 font-bold">
                Színház neve
              </label>
              <Field
                type="text"
                name="title"
                placeholder={performance?.title || 'Írd be a színház nevét'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
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
