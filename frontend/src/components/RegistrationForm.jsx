import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthResult from './AuthResult';
import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForRegistration } from '../schema/userValidationSchema';
import DefaultButton from './misc/DefaultButton';

export default function RegistrationForm({ onSwitch }) {
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
        <AuthResult params={{ navigateTo: '/' }} />
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={userValidationSchemaForRegistration}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="lastName" className="text-gray-800 font-bold">
                  Vezetéknév <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Add meg a vezetéknevedet"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="text-gray-800 font-bold">
                  Keresztnév <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Add meg a keresztnevedet"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="E-mail" className="text-gray-800 font-bold">
                  E-mail cím <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Add meg az e-mail címedet"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="text-gray-800 font-bold">
                  Telefonszám
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Add meg a telefonszámodat"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-gray-800 font-bold">
                  Jelszó <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Adj meg egy jelszót min 6 karakter"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-gray-800 font-bold">
                  Jelszó megerősítése<span className="text-red-500"> *</span>
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Add meg a jelszót mégegyszer"
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
            {onSwitch ? (
              <button
                type="button"
                onClick={() => onSwitch('login')}
                className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
              >
                Kérlek jelentkezz be
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
              >
                Kérlek jelentkezz be
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
