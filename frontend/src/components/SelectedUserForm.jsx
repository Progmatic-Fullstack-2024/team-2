import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { userValidationSchemaForUpdateUser } from '../schema/userValidationSchema';
import DefaultButton from './misc/DefaultButton';
import OptionList from './OptionList.jsx';
import UserResult from './UserResult.jsx';
import TheatreHandle from '../services/theaters.service.js';
import UserHandle from '../services/userhandle.service.js';

export default function SelectedUserForm() {
  const [isVisilable, setIsVisilable] = useState(false);
  const [buttonType, setButtonType] = useState('button');
  const [handleuser, sethandleUser] = useState(null);
  const [modify, setModify] = useState(true);
  const [dataButton, setDataButton] = useState({
    text: 'Adatok módosítása',
    click: undefined,
    type: 'button',
  });

  const [title, setTitle] = useState('Felhasználó adatainak megtekintése');
  const color = 'c-primary';
  const textColor = 'c-text';
  const fontSize = 'ml';
  const buttonClass = `w-auto h-auto bg-${color} text-${fontSize} text-${textColor}
     font-bold rounded p-3 pl-7 pr-7 hover:bg-${color}-light active:scale-95 active:bg-${color}-dark`;

  const [msg, setMsg] = useState('');
  const [buttonmsg, setButtonmsg] = useState('');
  const [buttonmsg2, setButtonmsg2] = useState('');
  const [isUserDeleting, setIsUserDeleting] = useState(false);
  const [navigate, setNavigate] = useState(undefined);
  const [theatre, setTheatre] = useState([{ id: '-', name: 'Nincs megadva' }]);
  const [isTheatreAdmin, setIsTheatreAdmin] = useState(false);
  const locationData = useLocation();

  const sendDeleteUser = async () => {
    try {
      const answer = await UserHandle.deleteUser(handleuser.id);
      if (answer.mesaage === 'User deleted');
      setMsg('A felhasználó törklése megtörtént.');
      setNavigate('../userlist');
    } catch (error) {
      setMsg('Hiba: a felhasználó törlése sikertelen');
    }
  };

  const cancelModal = (item) => {
    setMsg('');
    setButtonmsg('Tovább');
    setButtonmsg2('');
    if (isUserDeleting && item === 1) {
      sendDeleteUser();
    } else setIsVisilable(false);
    setIsUserDeleting(false);
  };

  const modifyHandle = () => {
    setModify(false);
    setDataButton({ text: 'Elküld', click: undefined, type: 'submit' });
    setTitle('felhasználó adatainak módosítása');
    setButtonType('reset');
  };

  function inicializeForm() {
    let initialValues;
    if (handleuser) {
      initialValues = {
        firstName: handleuser.firstName,
        lastName: handleuser.lastName,
        email: handleuser.email,
        phone: handleuser.phone,
        role: handleuser.role,
      };
    } else initialValues = null;
    return initialValues;
  }

  const initialValues = inicializeForm();

  async function theatreLoader(newUser) {
    if (newUser.role === 'theatreAdmin') {
      try {
        const getTheatre = await TheatreHandle();
        getTheatre.unshift({ id: 'new', name: 'Új felveendő színház' });
        setTheatre(getTheatre);
      } catch (e) {
        setMsg(e);
      }
      setIsTheatreAdmin(true);
    } else setIsTheatreAdmin(false);
  }

  async function loadUser() {
    try {
      const userId = locationData.state;

      if (!userId) throw Error();
      const getUser = await UserHandle.getUser(userId);
      sethandleUser(getUser);
      theatreLoader(getUser);
    } catch (e) {
      return <h2>User nem található</h2>;
    }
    return null;
  }
  useEffect(() => {
    setDataButton({
      text: 'Adatok módosítása',
      click: modifyHandle,
      type: 'button',
    });
    loadUser();
  }, []);

  const cancelHandle = () => {
    setModify(true);
    setDataButton({ text: 'Adatok módosítása', click: modifyHandle, type: 'button' });
    setTitle('Felhasználó adatainak megtekintése');
    setButtonType('button');
    theatreLoader(handleuser);
  };

  const sendData = async (values, action) => {
    const newUserData = { id: handleuser.id };
    const keys = Object.keys(values);
    keys.forEach((key) => {
      if (handleuser[key] !== values[key]) newUserData[key] = values[key];
    });
    if (Object.keys(newUserData).length > 1) {
      setIsVisilable(true);
      setIsUserDeleting(false);
      setButtonmsg('Tovább');
      setButtonmsg2('');
      try {
        const answer = await UserHandle.patchOwnUser(newUserData);
        if (answer) setMsg('Az adatmódosítás sikeres');
        else {
          setMsg('Az adatmódosítás sikertelen');
          action.resetform();
        }

        loadUser();
      } catch (error) {
        setMsg('Hiba: az adatmódosítás elutasítva.');
        action.resetForm();
      }
      cancelHandle();
    }
  };

  const deleteUser = () => {
    setIsVisilable(true);
    setMsg('A felhasználó törlése végleges! Folytatja? ');
    setButtonmsg('Igen');
    setButtonmsg2('Nem');
    setIsUserDeleting(true);
  };

  const roleHandle = (e) => {
    if (e.target.value === 'theatreAdmin') {
      const newUser = { ...handleuser, role: e.target.value };
      theatreLoader(newUser);
    } else setIsTheatreAdmin(false);
  };

  return (
    <div>
      {handleuser ? (
        <div className="w-full mx-auto my-40 bg-c-secondary-light p-12 rounded-md relative">
          <UserResult
            params={{
              isVisilable,
              msg,
              buttonmsg,
              buttonmsg2,
              clearProcedure: cancelModal,
              navigateTo: navigate,
            }}
          />

          <h1 className="font-bold text-gray-800 text-xl mx-auto mb-10 text-center">{title}</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={userValidationSchemaForUpdateUser}
            onSubmit={sendData}
          >
            {({ resetForm, isSubmitting, setFieldValue }) => (
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
                  <Field
                    name="role"
                    as="select"
                    className="w-full border p-2 rounded my-1 text-gray-800"
                    disabled={modify}
                    onChange={(e) => {
                      roleHandle(e);
                      setFieldValue('role', e.target.value);
                    }}
                  >
                    <option value="user">User</option>
                    <option value="theatreAdmin">SzínházAdmin</option>
                    <option value="Admin">Admin</option>
                  </Field>
                </div>
                {isTheatreAdmin && (
                  <div className="mb-4">
                    <Field
                      name="theatre"
                      as="select"
                      className="w-full border p-2 rounded my-1 text-gray-800"
                      disabled={modify}
                    >
                      <OptionList list={theatre} />
                    </Field>
                  </div>
                )}

                <div className="flex justify-between gap-3 flex-col tablet:flex-row">
                  <div className="flex justify-center">
                    <DefaultButton
                      text={dataButton.text}
                      type={dataButton.type}
                      onClick={dataButton.click}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex justify-between flex-col tablet:flex-row">
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
                        text="Felhasználó törlése"
                        type="button"
                        onClick={deleteUser}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <h2>Betöltés...</h2>
      )}
    </div>
  );
}
