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
    <div className="p-2 bg-c-secondary-light">
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
            <DefaultButton type="submit" text="Bejelentkezés" />
          </div>
        </Form>
      </Formik>

      <div className="text-black py-2 flex justify-center">
        Nem vagy regisztrálva?
        <button
          type="button"
          onClick={() => onSwitch('register')}
          className="text-gray-500 hover:underline pl-2 hover:scale-110 hover:text-blue-800 transition duration-700"
        >
          Regisztrálj
        </button>
      </div>
      <p className="text-gray-900">
        <a href="newpassword">Elfelejtett jelszó</a>
      </p>
    </div>
  );
}
