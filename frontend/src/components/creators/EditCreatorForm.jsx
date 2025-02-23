import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import creatorsService from '../../services/creators.service';
import DefaultButton from '../misc/DefaultButton';

const PROFESSIONS = ['actor', 'director', 'writer', 'stageDesigner']; // Enum értékek

export default function EditCreatorForm({ creator }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(creator.imageURL || ''); // Kép előnézet

  // 📌 Validációs séma
  const validationSchema = Yup.object({
    name: Yup.string().required('Név megadása kötelező'),
    profession: Yup.array().min(1, 'Legalább egy foglalkozást ki kell választani').of(Yup.string()),
    awards: Yup.string(),
    introductions: Yup.string(),
    image: Yup.mixed(),
  });

  // 📌 Form elküldése
  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('awards', values.awards);
      formData.append('introductions', values.introductions);

      // 🔹 A profession tömbként kell maradjon, NEM STRING
      values.profession.forEach((prof) => formData.append('profession', prof));

      // 📌 Ha van feltöltött fájl, hozzáadjuk a formData-hoz
      if (values.image instanceof File) {
        formData.append('image', values.image);
      }

      await creatorsService.update(creator.id, formData);

      toast.success('Alkotó sikeresen frissítve!');
      setTimeout(() => navigate(-1), 1500); // 🔹 1,5 mp múlva visszalép az előző oldalra
    } catch (err) {
      toast.error('Hiba történt a frissítés során.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6 text-center">Alkotó módosítása</h2>

      <Formik
        initialValues={{
          name: creator.name || '',
          profession: creator.profession || [],
          awards: creator.awards || '',
          introductions: creator.introductions || '',
          image: null, // Alapértelmezés szerint nincs fájl
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* 📌 Név */}
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

            {/* 📌 Foglalkozás választó */}
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

            {/* 📌 Díjak */}
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
            </div>

            {/* 📌 Bemutatkozás */}
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
            </div>

            {/* 📌 Kép feltöltés */}
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
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue('image', file);
                  setPreview(URL.createObjectURL(file)); // 🔹 Előnézet frissítése
                }}
                className="hidden"
              />

              {/* Kép előnézet */}
              {preview && (
                <div className="my-2 relative">
                  <img
                    src={preview}
                    alt="Kép előnézet"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue('image', null);
                      setPreview(null);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              )}
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            </div>

            {/* 📌 Gombok */}
            <div className="flex justify-between gap-10">
              <DefaultButton text="Mentés" type="submit" disabled={isSubmitting} />
              <DefaultButton text="Mégsem" type="button" onClick={() => navigate(-1)} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
