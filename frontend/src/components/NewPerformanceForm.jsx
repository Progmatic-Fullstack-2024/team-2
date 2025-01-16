import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DefaultButton from './misc/DefaultButton';
import { performanceValidationSchema } from '../schema/userValidationSchema';

export default function NewPerformanceForm({ lecture }) {
  const navigate = useNavigate();

  const initialValues = lecture || {
    title: '',
    theaterId: '',
    creatorId: [''],
    description: '',
    performanceDate: [],
    price: '',
    posterURL: '',
    imagesURL: [],
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('theaterId', values.theaterId);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('performanceDate', values.performanceDate);

    if (values.posterURL) {
      formData.append('files', values.posterURL);
    }
    values.imagesURL.forEach((image) => {
      formData.append('files', image);
    });

    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch('/api/performances', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Hiba történt az előadás létrehozásakor.');

      resetForm();
      navigate('/comingsoon');
    } catch (error) {
      toast.error(`Hiba történt az előadás létrehozásakor: ${error.message}`);
    }
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
                    placeholder="Add meg az alkotó azomosítóját"
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
                placeholder="Add meg az előadás árát (HUF)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="posterURL" className="text-gray-800 font-bold">
                Poszter URL
              </label>
              <Field
                type="text"
                name="posterURL"
                placeholder="Add meg a poszter URL-jét"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="posterURL" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="imagesURL" className="text-gray-800 font-bold">
                Képek URL-jei
              </label>
              <div className="flex flex-col gap-2">
                {values.imagesURL.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Field
                      type="text"
                      name={`imagesURL[${index}]`}
                      placeholder="Kép URL"
                      className="w-full border p-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedImages = [...values.imagesURL];
                        updatedImages.splice(index, 1);
                        setFieldValue('imagesURL', updatedImages);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Törlés
                    </button>
                  </div>
                ))}
                <DefaultButton
                  text="Új kép hozzáadása"
                  type="button"
                  onClick={() => setFieldValue('imagesURL', [...values.imagesURL, ''])}
                />
              </div>
              <ErrorMessage name="imagesURL" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-center">
              <DefaultButton text={lecture ? 'Mentés' : 'Előadás hozzáadása'} type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
