import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';

import DefaultButton from './misc/DefaultButton';
import performanceValidationSchema from '../schema/performanceValidationSchema';

export default function NewPerformanceForm({ lecture, onSubmit }) {
  const initialValues = lecture || {
    title: '',
    description: '',
    image: null,
  };

  const handleSubmit = ({ setFieldValue, resetForm }) => {
    alert('Előadás hozzáadva!');

    resetForm();

    setFieldValue('image', null);
  };

  return (
    <div className="w-1/3 mx-auto my-40 bg-c-secondary-light p-12 rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">
        {lecture ? 'Előadás módosítása' : 'Új előadás'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={performanceValidationSchema}
        onSubmit={onSubmit || handleSubmit}
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
                Kép feltöltése
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full border p-2 rounded my-1 text-gray-800"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
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
