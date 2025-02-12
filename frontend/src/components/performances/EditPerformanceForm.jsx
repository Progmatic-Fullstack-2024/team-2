import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import getCreators from '../../services/creators.service';
import performancesService from '../../services/performances.service';
// import theatersService from '../../services/theaters.service';
import DefaultButton from '../misc/DefaultButton';

export default function PerformanceForm({ performance }) {
  const navigate = useNavigate();
  // const location = useLocation();

  const [posterPreview, setPosterPreview] = useState(performance?.posterURL || null);
  const [imagesPreview, setImagesPreview] = useState(performance?.imagesURL || []);
  const [creatorOptions, setCreatorOptions] = useState([]);
  const [isPosterDeleted, setIsPosterDeleted] = useState(false); // Deleted poster
  const [deletedImages, setDeletedImages] = useState([]); // Deleted pictures

  const targetAgeOptions = [
    { label: 'Felnőtt', value: 'adult' },
    { label: 'Gyerek', value: 'kid' },
    { label: 'Tini', value: 'teenager' },
    { label: 'Minden korosztály', value: 'every_age' },
  ];

  const initialValues = {
    title: performance?.title || '',
    theaterId: performance?.theaterId || '',
    creatorId: [''],
    description: performance?.description || '',
    posterURL: null,
    imagesURL: performance?.imagesURL || [],
    targetAudience: performance?.targetAudience || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('theaterId', values.theaterId);
    formData.append('description', values.description);

    values.creatorId.forEach((creator) => formData.append('creatorId[]', creator));

    if (values.targetAudience) {
      formData.append('targetAudience', values.targetAudience);
    }

    if (values.posterURL instanceof File) {
      formData.append('poster', values.posterURL);
    }

    values.imagesURL.forEach((image) => {
      if (image instanceof File) {
        formData.append('files', image);
      }
    });

    try {
      // Összegyűjtjük az összes törlendő képet egy tömbbe
      const allDeletedImages = [...deletedImages];

      if (isPosterDeleted) {
        allDeletedImages.push(performance.posterURL);
      }

      // Ha van mit törölni, akkor küldjük el
      if (allDeletedImages.length > 0) {
        await performancesService.deletePoster(performance.id, allDeletedImages); // 🔥 NE csomagold újra!
      }

      // Performance data update
      const response = await performancesService.update(performance.id, formData);
      if (!response) throw new Error('Hiba történt az előadás módosításakor.');

      toast.success('Előadás sikeresen módosítva!');
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
    setFieldValue('posterURL', file);
    setPosterPreview(URL.createObjectURL(file)); // Frissíti a preview-t az új képre
    setIsPosterDeleted(false); // Ha új képet töltünk fel, akkor ne törölje az adatbázisból az előzőt
  };

  const removePoster = (setFieldValue) => {
    setFieldValue('posterURL', null);
    setPosterPreview(null);
    setIsPosterDeleted(true);
  };

  const handleImagesChange = (event, setFieldValue, images) => {
    const files = Array.from(event.target.files);
    setFieldValue('imagesURL', [...images, ...files]);
    setImagesPreview((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  // const removeImage = (index, setFieldValue, images) => {
  //   const updatedImages = [...images];
  //   updatedImages.splice(index, 1);
  //   setFieldValue('imagesURL', updatedImages);

  //   const updatedPreviews = [...imagesPreview];
  //   updatedPreviews.splice(index, 1);
  //   setImagesPreview(updatedPreviews);
  // };

  const removeImage = (index, setFieldValue, images) => {
    const updatedImages = [...images];
    const removedImage = updatedImages.splice(index, 1)[0]; // 🔹 Törölt kép URL-je

    setFieldValue('imagesURL', updatedImages);
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));

    // 🔹 Ha az eltávolított kép már az adatbázisban volt, akkor tárold törlésre
    if (typeof removedImage === 'string') {
      setDeletedImages((prev) => [...prev, removedImage]);
    }
  };

  const fetchCreators = async () => {
    if (creatorOptions.length === 0) {
      try {
        const creators = await getCreators();
        setCreatorOptions(creators);
      } catch (error) {
        toast.error('Hiba történt az alkotók betöltésekor.');
      }
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="mx-auto p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">Előadás módosítása</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            {/* Színház neve */}
            <div className="mb-4">
              <label htmlFor="title" className="text-gray-800 font-bold">
                Előadás neve
              </label>
              <Field
                type="text"
                name="title"
                placeholder={performance?.title || 'Írd be a színház nevét'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="theaterId" className="text-gray-800 font-bold">
                Színház
              </label>
              <div className="flex items-center">
                <Field
                  type="text"
                  name="theaterId"
                  className="w-full border p-2 rounded my-1 text-gray-800 bg-gray-100"
                  disabled
                />
              </div>
              <ErrorMessage name="theaterId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="targetAudience" className="text-gray-800 font-bold">
                Célközönség (opcionális)
              </label>
              <Field
                as="select"
                name="targetAudience"
                className="w-full border p-2 rounded text-gray-800"
              >
                <option value="">Válassz célközönséget</option>
                {targetAgeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="targetAudience"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="text-gray-800 font-bold">
                Leírás <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Add meg az előadás leírását"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="creators" className="text-gray-800 font-bold">
                Alkotók <span className="text-red-500">*</span>
              </label>
              {values.creatorId.map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Field
                    as="select"
                    name={`creatorId[${index}]`}
                    className="w-full border p-2 rounded text-gray-800"
                  >
                    <option value="">Válassz egy alkotót</option>
                    {creatorOptions.map((creator) => (
                      <option key={creator.id} value={creator.id}>
                        {creator.name}
                      </option>
                    ))}
                  </Field>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedCreators = [...values.creatorId];
                      updatedCreators.splice(index, 1);
                      setFieldValue('creatorId', updatedCreators);
                    }}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Törlés
                  </button>
                  <button
                    type="button"
                    onClick={fetchCreators}
                    className="ml-2 bg-gray-200 p-2 rounded hover:bg-gray-300"
                  >
                    <img
                      src="../../public/creatorSearchIcon.svg"
                      alt="Alkotó keresése ikon"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <DefaultButton
                  text="Új alkotó hozzáadása"
                  type="button"
                  disabled={values.creatorId.some((id) => !id || id === '')}
                  onClick={() => setFieldValue('creatorId', [...values.creatorId, ''])}
                />
              </div>
              <ErrorMessage name="creatorId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="posterURL" className="text-gray-800 font-bold block mb-2">
                Poszter
              </label>
              <DefaultButton
                text="Fájl kiválasztása"
                type="button"
                onClick={() => document.getElementById('posterURL').click()}
              />
              <input
                type="file"
                id="posterURL"
                accept="image/*"
                onChange={(e) => handlePosterChange(e, setFieldValue)}
                className="hidden"
              />
              {posterPreview && (
                <div className="my-2 relative">
                  <img
                    src={posterPreview}
                    alt="Poster preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removePoster(setFieldValue)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              )}
              <ErrorMessage name="posterURL" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="imagesURL" className="text-gray-800 font-bold block mb-2">
                További képek
              </label>
              <DefaultButton
                text="Fájlok kiválasztása"
                type="button"
                onClick={() => document.getElementById('imagesURL').click()}
              />
              <input
                type="file"
                id="imagesURL"
                accept="image/*"
                multiple
                onChange={(e) => handleImagesChange(e, setFieldValue, values.imagesURL)}
                className="hidden"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {imagesPreview.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, setFieldValue, values.imagesURL)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gombok */}
            <div className="flex justify-between gap-10">
              <DefaultButton text="Előadás módosítása" type="submit" />
              <DefaultButton text="Mégsem" type="button" onClick={handleBack} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
