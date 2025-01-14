import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import AuthResult from './AuthResult';
import DefaultButton from './misc/DefaultButton';
import { performanceValidationSchema } from '../schema/userValidationSchema';

export default function NewPerformanceForm({ lecture}) {
  const initialValues = lecture || {
    title: '',
    description: '',
    image: null,
  };

  const [showAuthResult, setShowAuthResult] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = ({ resetForm, setFieldValue }) => {
    setSuccessMessage('Az előadás sikeresen hozzáadva!');
    setShowAuthResult(true);
    resetForm();
    setFieldValue('image', null);
    setUploadedImage(null);
    Navigate('/comingsoon')
  };

  return (
    < >
      <AuthResult params={{ showAuthResult, setShowAuthResult, navigateTo: '/comingsoon', successMessage, }}/>
      <div className="mx-aut p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">
        {lecture ? 'Előadás módosítása' : 'Új előadás'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={performanceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
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
              <label htmlFor="image" className="text-gray-800 font-bold">
                Kép feltöltése <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center border p-4 rounded my-1">
                {uploadedImage && (
                  <div className="relative mb-4">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Előnézet"
                      className="max-h-40 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue('image', null);
                        setUploadedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded"
                    >
                      Törlés
                    </button>
                  </div>
                )}
                <DefaultButton
                  text="Fájl kiválasztása"
                  onClick={() => document.getElementById('fileInput').click()}
                  type="button"
                />
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue('image', file);
                    setUploadedImage(file);
                  }}
                />
              </div>
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-center">
              <DefaultButton text={lecture ? 'Mentés' : 'Előadás hozzáadása'} type="submit" />
            </div>
          </Form>
        )}
      </Formik>
      </div>
    </>
  );
}
