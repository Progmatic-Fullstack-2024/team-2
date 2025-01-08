import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthResult from './AuthResult';
import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForLogin } from '../schema/userValidationSchema';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const initialValues = { email: '', password: '' };
  const [showAuthResult, setShowAuthResult] = useState(false);

  const handleLogin = async (values) => {
    setShowAuthResult(true);
    const result = await login(values);
  };

  return (
    <>
      <AuthResult params={{ showAuthResult, setShowAuthResult, navigateTo: '/signedIn' }} />
      <div className="w-1/2 mx-aut my-40 bg-white p-5 rounded-md bg-opacity-50 ">
        <h2 className="font-bold text-xk text-gray-800 text-xl mb-6">Bejelentkezés</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchemaForLogin}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email cím"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                placeholder="jelszó"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-900 my-5 py-5 px-4 w-3/4 rounded-md text-white text-lg font-bold transform transition duration-700 hover:scale-110 hover:bg-blue-950"
              >
                Bejelentkezés
              </button>
            </div>
          </Form>
        </Formik>
        <div className="flex justify-center">
          {/* Ez egy teljesen opcinális rész, amit átemeltem egy régi kódomból, tök hasznos, de ehhez majd kell a reg rész is! */}
          Nem vagy regisztrálva?
          <Link
            to="/register"
            className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
          >
            Regisztrálj
          </Link>
        </div>
      </div>
    </>
  );
}
