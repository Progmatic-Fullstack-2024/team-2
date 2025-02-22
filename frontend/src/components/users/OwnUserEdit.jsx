import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import NewPasswordForm from './NewPasswordForm.jsx';
import UserResult from './UserResult.jsx';
import { userValidationSchemaForUpdateUser } from '../../schema/userValidationSchema.js';
import userHandle from '../../services/userhandle.service.js';
import DefaultButton from '../misc/DefaultButton.jsx';

export default function OwnUserEdit() {
  const [buttonType, setButtonType] = useState('button');
  const [user, setUser] = useState(null);
  const [modify, setModify] = useState(true);
  const [dataButton, setDataButton] = useState({
    text: 'Adatok módosítása',
    click: undefined,
    type: 'button',
  });
  const [passwordButton, setpasswordButton] = useState({});
  const [title, setTitle] = useState('Saját adataim megtekintése');
  const [passwordformactive, setPasswordFormActive] = useState(false);
  const [isVisilable, setIsVisilable] = useState(false);
  const [msg, setMsg] = useState('');
  const [userNullMsg, setUserNullMsg] = useState('Betöltés...');

  const color = 'c-primary';
  const textColor = 'white';
  const fontSize = 'ml';
  const buttonClass = `w-auto h-auto bg-${color} text-${fontSize} text-${textColor}
     font-bold rounded p-3 pl-7 pr-7 hover:bg-${color}-light active:scale-95 active:bg-${color}-dark`;

  const modifyHandle = () => {
    setModify(false);
    setDataButton({ text: 'Elküld', click: undefined, type: 'submit' });
    setpasswordButton({
      text: 'Mégse',
      click: undefined,
    });
    setTitle('Saját adataim módosítása');
    setButtonType('reset');
  };

  const passwordHandle = () => {
    setPasswordFormActive(true);
  };

  const cancelPassword = () => {
    setPasswordFormActive(false);
  };

  const cancelModal = () => {
    setIsVisilable(false);
  };

  function inicializeForm() {
    let initialValues;
    if (user) {
      if (user.birthDate) user.birthDate = user.birthDate.slice(0, 10);
      initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate ? user.birthDate : '',
      };
    } else initialValues = null;
    return initialValues;
  }

  const initialValues = inicializeForm();

  async function loadUser() {
    try {
      const getUser = await userHandle.getOwnUser();
      if (getUser && getUser.birthDate === null) getUser.birthDate = '';
      setUser(getUser);
      if (getUser === null) throw new Error();
    } catch (e) {
      setUserNullMsg('Hiba: A felhasználó nem található!');
    }
  }
  useEffect(() => {
    setDataButton({
      text: 'Adatok módosítása',
      click: modifyHandle,
      type: 'button',
    });
    setpasswordButton({
      text: 'jelszó módosítása',
      click: passwordHandle,
    });
    loadUser();
  }, []);

  const cancelHandle = () => {
    setModify(true);
    setDataButton({ text: 'Adatok módosítása', click: modifyHandle, type: 'button' });
    setpasswordButton({ text: 'jelszó módosítása', click: passwordHandle });
    setTitle('Saját adataim megtekintése');
    setButtonType('button');
  };

  const sendData = async (values) => {
    const newUserData = { id: user.id };
    const keys = Object.keys(values);
    keys.forEach((key) => {
      if (user[key] !== values[key]) newUserData[key] = values[key];
    });
    Object.keys(newUserData).forEach(
      (key) => newUserData[key] === undefined && delete newUserData[key],
    );
    if (Object.keys(newUserData).length > 1) {
      if (newUserData.birthDate) newUserData.birthDate = newUserData.birthDate.replaceAll('.', '-');
      setIsVisilable(true);
      try {
        const answer = await userHandle.patchUser(newUserData);
        if (answer) setMsg('Az adatmódosítás sikeres');
        loadUser();
      } catch (error) {
        setMsg('Hiba: az adatmódosítás elutasítva');
      }
      cancelHandle();
    }
  };

  return (
    <div>
      {user ? (
        <div className="w-full mx-auto bg-c-secondary-light p-12  px-auto rounded-md relative">
          <UserResult params={{ isVisilable, msg, clearProcedure: cancelModal }} />
          {passwordformactive ? <NewPasswordForm goback={cancelPassword} /> : undefined}
          <h1 className="font-bold text-gray-800 text-xl mx-auto mb-10 text-center">{title}</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={userValidationSchemaForUpdateUser}
            onSubmit={sendData}
          >
            {({ resetForm, isSubmitting }) => (
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
                    disabled={modify}
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
                    disabled={modify}
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
                    disabled={modify}
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
                    disabled={modify}
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="birthDate" className="text-gray-800 font-bold">
                    Születési idő
                  </label>
                  <Field
                    type="text"
                    name="birthDate"
                    placeholder="Add meg a szuletési idődet"
                    className="w-full border p-2 rounded my-1 text-gray-800"
                    disabled={modify}
                  />
                  <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex justify-between gap-3 flex-col tablet:flex-row">
                  {!passwordformactive && (
                    <div className="flex justify-center">
                      <DefaultButton
                        text={dataButton.text}
                        type={dataButton.type}
                        onClick={dataButton.click}
                        disabled={isSubmitting}
                      />
                    </div>
                  )}
                  {!passwordformactive && (
                    <div className="flex justify-center">
                      {buttonType === 'reset' ? (
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            cancelHandle();
                          }}
                          className={buttonClass}
                        >
                          Mégse
                        </button>
                      ) : (
                        <DefaultButton
                          text={passwordButton.text}
                          type="button"
                          onClick={passwordButton.click}
                        />
                      )}
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <h2 className="py-24 text-center">{userNullMsg}</h2>
      )}
    </div>
  );
}
