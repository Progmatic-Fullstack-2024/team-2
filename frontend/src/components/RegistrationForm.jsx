import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthResult from './AuthResult';
import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForRegistration } from '../schema/userValidationSchema';

export default function RegistrationForm() {
  const { register } = useContext(AuthContext);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };
  const [showAuthResult, setShowAuthResult] = useState(false);
  const handleRegister = async (values) => {
    setShowAuthResult(true);
    const result = await register(values);
  };

  return (
    <>
      <AuthResult params={{ showAuthResult, setShowAuthResult, navigateTo: '/login' }} />
      <div className="w-1/2 mx-auto my-40 bg-white p-5 rounded-md bg-opacity-50">
        <h2 className="font-bold text-gray-800 text-xl mb-6">Regisztráció</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchemaForRegistration}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="text"
                name="lastName"
                placeholder="Vezetéknév (kötelező mező)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="firstName"
                placeholder="Keresztnév (kötelező mező)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email cím (kötelező mező)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="phone"
                placeholder="Telefonszám (opcionális)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                placeholder="Jelszó (kötelező mező)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Jelszó megerősítése (kötelező mező)"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-900 my-5 py-5 px-4 w-3/4 rounded-md text-white text-lg font-bold transform transition duration-700 hover:scale-110 hover:bg-blue-950"
              >
                Regisztráció
              </button>
            </div>
          </Form>
        </Formik>
        <div className="flex justify-center">
          Már regisztráltál?
          <Link
            to="/login"
            className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
          >
            Kérlek jelentkezz be
          </Link>
        </div>
      </div>
    </>
  );
}
