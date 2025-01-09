import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthResult from './AuthResult';
import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForLogin } from '../schema/userValidationSchema';

import DefaultButton from './misc/DefaultButton';

export default function LoginForm() {
  const { login, clearAuthMsg } = useContext(AuthContext);
  const initialValues = { email: '', password: '' };
  const [showAuthResult, setShowAuthResult] = useState(false);

  const handleLogin = async (values) => {
    clearAuthMsg();
    setShowAuthResult(true);
    await login(values);
  };

  return (
    <>
      <AuthResult params={{ showAuthResult, setShowAuthResult, navigateTo: '/signedIn' }} />
      <div className="mx-aut p-12 my-40 bg-c-secondary-light rounded-md">
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
                placeholder="Jelszó"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex justify-center">
              <DefaultButton color="c-primary" type="submit" text="Bejelentkezés" />
            </div>
          </Form>
        </Formik>
        <div className="flex justify-center mt-5">
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
