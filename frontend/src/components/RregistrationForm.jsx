import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForRegistration } from '../schema/userValidationSchema';

export default function RegistrationForm() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleRegister = async (values) => {
    if (values.password !== values.confirmPassword) {
      // Jelszavak nem egyeznek
      alert('A jelszavak nem egyeznek!');
      return;
    }

    try {
      const result = await register(values);

      if (result.ok) {
        alert(result.message || 'Sikeres regisztráció!');
        navigate('/login');
      } else {
        const errorMessage = result.message?.response?.data?.error || 'Ismeretlen hiba';
        alert(`Sikertelen regisztráció: ${errorMessage}`);
      }
    } catch (error) {
      // Hiba kezelése
      alert(`Hiba történt: ${error.message || 'Ismeretlen hiba'}`);
    }
  };

  return (
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
              placeholder="Vezetéknév"
              className="w-full border p-2 rounded my-1 text-gray-800"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="firstName"
              placeholder="Keresztnév"
              className="w-full border p-2 rounded my-1 text-gray-800"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
          </div>
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
          <div className="mb-4">
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Jelszó megerősítése"
              className="w-full border p-2 rounded my-1 text-gray-800"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
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
  );
}
