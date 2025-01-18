import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthResult from './AuthResult';
import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForRegistration } from '../schema/userValidationSchema';
import DefaultButton from './misc/DefaultButton';

export default function RegistrationForm() {
  const { register, showAuthMsg, authMsg } = useContext(AuthContext);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const handleRegister = async (values) => {
    showAuthMsg(true);
    await register(values);
  };

  return (
    <div className="w-1/2 mx-auto my-40 bg-c-secondary-light p-12 rounded-md">
      <h2 className="font-bold text-gray-800 text-2xl mb-6">Regisztráció</h2>
      {authMsg.show ? (
        <AuthResult params={{ navigateTo: '/login' }} />
      ) : (
        <>
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
                <DefaultButton text="Regisztráció" type="submit" />
              </div>
            </Form>
          </Formik>
          <div className="flex justify-center mt-5">
            Már regisztráltál?
            <Link
              to="/login"
              className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
            >
              Kérlek jelentkezz be
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
