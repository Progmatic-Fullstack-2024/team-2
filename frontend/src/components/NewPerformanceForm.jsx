import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import DefaultButton from './misc/DefaultButton';
import { performanceValidationSchema } from '../schema/userValidationSchema';
import createPerformance from '../services/performance.service';

export default function NewPerformanceForm({ lecture }) {
  const navigate = useNavigate();

  const [posterPreview, setPosterPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);

  const initialValues = lecture || {
    title: '',
    theaterId: '',
    creatorId: [''],
    description: '',
    performanceDate: [],
    price: '',
    posterURL: null,
    imagesURL: [],
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('theaterId', values.theaterId);
    formData.append('description', values.description);
    formData.append('price', values.price);
    values.performanceDate.forEach((date) => formData.append('performanceDate[]', date));
    values.creatorId.forEach((creator) => formData.append('creatorId[]', creator));

    if (values.posterURL) {
      formData.append('poster', values.posterURL);
    }
    values.imagesURL.forEach((image) => {
      formData.append('files', image);
    });

    const token = localStorage.getItem('authToken');

    try {
      const response = await createPerformance(formData);

      // const response = await fetch('/api/performances', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      if (!response.ok) throw new Error('Hiba történt az előadás létrehozásakor.');

      resetForm();
      setPosterPreview(null);
      setImagesPreview([]);
      navigate('/comingsoon');
    } catch (error) {
      toast.error(`Hiba történt az előadás létrehozásakor: ${error.message}`);
    }
  };

  const handlePosterChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('posterURL', file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const removePoster = (setFieldValue) => {
    setFieldValue('posterURL', null);
    setPosterPreview(null);
  };

  const handleImagesChange = (event, setFieldValue, images) => {
    const files = Array.from(event.target.files);
    setFieldValue('imagesURL', [...images, ...files]);
    setImagesPreview((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const removeImage = (index, setFieldValue, images) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setFieldValue('imagesURL', updatedImages);

    const updatedPreviews = [...imagesPreview];
    updatedPreviews.splice(index, 1);
    setImagesPreview(updatedPreviews);
  };

  return (
    <div className="mx-auto p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">
        {lecture ? 'Előadás módosítása' : 'Új előadás'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={performanceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="text-gray-800 font-bold">
                Előadás neve <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Add meg az előadás nevét"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="theaterId" className="text-gray-800 font-bold">
                Színház <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="theaterId"
                placeholder="Add meg a színház azonosítóját"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="theaterId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="creators" className="text-gray-800 font-bold">
                Alkotók <span className="text-red-500">*</span>
              </label>
              {values.creatorId.map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Field
                    type="text"
                    name={`creatorId[${index}]`}
                    placeholder="Add meg az alkotó azonosítóját"
                    className="w-full border p-2 rounded text-gray-800"
                  />
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
                </div>
              ))}
              <DefaultButton
                text="Új alkotó hozzáadása"
                type="button"
                onClick={() => setFieldValue('creatorId', [...values.creatorId, ''])}
              />
              <ErrorMessage name="creatorId" component="div" className="text-red-500 text-sm" />
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
              <label htmlFor="performanceDate" className="text-gray-800 font-bold">
                Előadás dátumai
              </label>
              <div className="flex flex-col gap-2">
                {values.performanceDate.map((date, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Field
                      type="date"
                      name={`performanceDate[${index}]`}
                      className="border p-2 rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedDates = [...values.performanceDate];
                        updatedDates.splice(index, 1);
                        setFieldValue('performanceDate', updatedDates);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Törlés
                    </button>
                  </div>
                ))}
                <DefaultButton
                  text="Új dátum hozzáadása"
                  type="button"
                  onClick={() => setFieldValue('performanceDate', [...values.performanceDate, ''])}
                />
              </div>
              <ErrorMessage
                name="performanceDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="text-gray-800 font-bold">
                Ár
              </label>
              <Field
                type="number"
                name="price"
                placeholder="Add meg az előadás árát"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
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

            <div className="flex justify-between gap-10">
              <DefaultButton text="Előadás hozzáadása" type="submit" />
              <DefaultButton text="Mégsem" type="button" onClick={() => navigate('/comingsoon')} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
