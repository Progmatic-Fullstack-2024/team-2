import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userValidationSchemaForNewPassword } from '../schema/userValidationSchema.js';
import UserHandle from '../services/userhandle.service.js';
import DefaultButton from './misc/DefaultButton.jsx';
import NewPasswordResult from './NewPasswordResult.jsx';



export default function AskNewPasswordForm() {
  const [msg, setMsg] = useState('');
  const [resultVisilable, setResultVisilable] = useState(false);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const navigate = useNavigate();

  const handler = async (fields) => {
    const param = {
      firstname: fields.firstName,
      lastname: fields.lastName,
      email: fields.email,
    };
    try {
      const answer = await UserHandle.getNewPassword(param);
      if (answer.result && answer.result.includes('send')) {
        const index = answer.result.indexOf(':');
        const address = answer.result.substr(index + 1);
        const message = `Az új jelszavad elküldve: ${address} címre`;
        setMsg(message);
        setResultVisilable(true);
      } else if (answer.result && answer.result.includes('not')) {
        const message = `Hiba: A jelszó módosítás elutasítva`;
        setMsg(message);
        setResultVisilable(true);
      }
    } catch (error) {
      const message = 'Hiba jelszómodosítás elutasítva';
      setMsg(message);
      setResultVisilable(true);
    }
  };

  const cancelHandler = () => {
    navigate('/');
  };

  const closeResult = () => {
    setResultVisilable(false);
    setMsg('');
  };

  return (
    <div className="w-2/3 mx-auto bg-c-secondary-light p-12  px-auto rounded-md relative">
      <NewPasswordResult visilable={resultVisilable} msg={msg} callBack={closeResult} />
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchemaForNewPassword}
        onSubmit={handler}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="lastName" className="text-gray-800 font-bold">
              Vezetéknév <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Add meg a vezetékneved"
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
              id="firstName"
              placeholder="Add meg a keresztneved"
              className="w-full border p-2 rounded my-1 text-gray-800"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 font-bold">
              E-mail cím <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="email"
              id="email"
              placeholder="Add meg az e-mail címed"
              className="w-full border p-2 rounded my-1 text-gray-800"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex justify-between gap-3 flex-col tablet:flex-row">
            <DefaultButton text="Küldés" type="submit" />
            <DefaultButton text="Mégse" type="button" onClick={cancelHandler} />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
