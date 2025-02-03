import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import { userValidationSchemaForLogin } from '../schema/userValidationSchema';
import DefaultButton from './misc/DefaultButton';

function FormField({ name, type = 'text', placeholder }) {
  return (
    <div className="mb-4">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full border p-2 rounded my-1 text-gray-800"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
}

export default function LoginForm({ onSwitch, onClose }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = { email: '', password: '' };

  const handleLogin = async (values) => {
    const success = await login(values);
    if (success) {
      onClose();
      navigate('/');
    }
  };

  return (
    <div className="mx-auto min-w-96 min-h-96 p-12 my-40 bg-c-secondary-light rounded-md flex flex-col justify-between">
      <h2 className="font-bold text-gray-800 text-2xl mb-6">Bejelentkezés</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchemaForLogin}
        onSubmit={handleLogin}
      >
        <Form>
          <FormField name="email" type="email" placeholder="Email cím" />
          <FormField name="password" type="password" placeholder="Jelszó" />
          <div className="flex justify-center">
            <DefaultButton color="c-primary" type="submit" text="Bejelentkezés" />
          </div>
        </Form>
      </Formik>

      <div className="text-black flex justify-center mt-5">
        Nem vagy regisztrálva?
        <button
          type="button"
          onClick={() => onSwitch('register')}
          className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
        >
          Regisztrálj
        </button>
      </div>
    </div>
  );
}
