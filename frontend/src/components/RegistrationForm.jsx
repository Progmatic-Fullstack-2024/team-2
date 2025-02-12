import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';

import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForRegistration } from '../schema/userValidationSchema';
import DefaultButton from './misc/DefaultButton';

function FormField({ label, name, type = 'text', required = false }) {
  return (
    <div>
      <label htmlFor={name} className="text-gray-800 font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Field
        type={type}
        name={name}
        placeholder={`Add meg a ${label.toLowerCase()}`}
        className="w-full border p-2 rounded my-1 text-gray-800"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
}

export default function RegistrationForm({ onSwitch }) {
  const { register } = useContext(AuthContext);
  const [successMsg, setSuccessMsg] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const handleRegister = async (values, { resetForm }) => {
    const success = await register(values);

    if (success) {
      setSuccessMsg(true);
      resetForm();
      setTimeout(() => {
        setSuccessMsg(false);
        if (onSwitch) {
          onSwitch('login');
        }
      }, 3000);
    }
  };

  return (
    <div className="p-2 bg-c-secondary-light">
      <h2 className="font-bold text-gray-800 text-2xl mb-6">Regisztráció</h2>

      {successMsg && (
        <div className="text-green-600 font-bold text-center mb-4">
          ✅ Sikeres regisztráció! Átirányítás a bejelentkezéshez...
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchemaForRegistration}
        onSubmit={handleRegister}
      >
        <Form>
          <FormField label="Vezetékneved" name="lastName" required />
          <FormField label="Keresztneved" name="firstName" required />
          <FormField label="E-mail címed" name="email" type="email" required />
          <FormField label="Telefonszámod" name="phone" />
          <FormField label="Jelszavad" name="password" type="password" required />
          <FormField label="Jelszavad mégegyszer" name="confirmPassword" type="password" required />

          <div className="flex mt-4 justify-center">
            <DefaultButton text="Regisztráció" type="submit" />
          </div>
        </Form>
      </Formik>

      <div className="text-black flex py-2 justify-center">
        Már regisztráltál?
        <button
          type="button"
          onClick={() => onSwitch('login')}
          className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
        >
          Kérlek jelentkezz be
        </button>
      </div>
    </div>
  );
}
