import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import creatorService from '../../services/creators.service';
import DefaultButton from '../misc/DefaultButton';

const PROFESSIONS = ['actor', 'director', 'writer', 'stageDesigner']; // Enum értékek

export default function CreateCreatorForm({ creator }) {
  const navigate = useNavigate();

  // Az új alkotó alapértelmezett értékei
  const initialValues = creator || {
    name: '',
    profession: [],
    awards: '',
    introductions: '',
    image: null,
  };

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (creator?.image) {
      setImagePreview(creator.image);
    }
  }, [creator]);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('profession', values.profession.join(',')); // Tömbből string
    formData.append('awards', values.awards);
    formData.append('introductions', values.introductions);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      const response = await creatorService.create(formData);

      console.log(response);

      // if (!response.ok) throw new Error('Hiba történt az alkotó létrehozásakor.');

      toast.success('Alkotó sikeresen hozzáadva!');
      resetForm();
      setImagePreview(null);
      navigate('/theater-admin');
    } catch (error) {
      toast.error(`Hiba történt: ${error.message}`);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = (setFieldValue) => {
    setFieldValue('image', null);
    setImagePreview(null);
  };

  return (
    <div className="mx-auto p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">
        {creator ? 'Alkotó módosítása' : 'Új alkotó'}
      </h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            {/* Alkotó neve */}
            <div className="mb-4">
              <label htmlFor="name" className="text-gray-800 font-bold">
                Név <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Add meg az alkotó nevét"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Foglalkozás választó */}
            <div className="mb-4">
              <label htmlFor="profession" className="text-gray-800 font-bold">
                Foglalkozás <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PROFESSIONS.map((profession) => (
                  <label
                    key={profession}
                    className={`cursor-pointer px-3 py-1 rounded-md border ${
                      values.profession.includes(profession)
                        ? 'bg-blue-500 text-white border-blue-700'
                        : 'bg-gray-200 text-gray-800 border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={profession}
                      className="hidden"
                      checked={values.profession.includes(profession)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue('profession', [...values.profession, profession]);
                        } else {
                          setFieldValue(
                            'profession',
                            values.profession.filter((p) => p !== profession),
                          );
                        }
                      }}
                    />
                    {profession}
                  </label>
                ))}
              </div>
              <ErrorMessage name="profession" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Díjak */}
            <div className="mb-4">
              <label htmlFor="awards" className="text-gray-800 font-bold">
                Díjak
              </label>
              <Field
                type="text"
                name="awards"
                placeholder="Díjak, kitüntetések"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="awards" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Bemutatkozás */}
            <div className="mb-4">
              <label htmlFor="introductions" className="text-gray-800 font-bold">
                Bemutatkozás
              </label>
              <Field
                as="textarea"
                name="introductions"
                placeholder="Bemutatkozás az alkotóról"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="introductions" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Kép feltöltés */}
            <div className="mb-4">
              <label htmlFor="image" className="text-gray-800 font-bold block mb-2">
                Kép feltöltése
              </label>
              <DefaultButton
                text="Kép kiválasztása"
                type="button"
                onClick={() => document.getElementById('image').click()}
              />
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="hidden"
              />

              {/* Kép előnézet */}
              {imagePreview && (
                <div className="my-2 relative">
                  <img
                    src={imagePreview}
                    alt="Kép előnézet"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(setFieldValue)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              )}
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Gombok */}
            <div className="flex justify-between gap-10">
              <DefaultButton text="Alkotó hozzáadása" type="submit" />
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
