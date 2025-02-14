import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import OptionList from './OptionList.jsx';
import UserResult from './UserResult.jsx';
import { userValidationSchemaForUpdateUser } from '../../schema/userValidationSchema.js';
import TheaterHandle from '../../services/theaters.service.js';
import UserHandle from '../../services/userhandle.service.js';
import DefaultButton from '../misc/DefaultButton.jsx';

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
  const [theater, setTheater] = useState([{ id: '-', name: 'Nincs megadva' }]);
  const [isTheaterAdmin, setIsTheaterAdmin] = useState(false);
  const [userNullMsg, setUserNullMsg] = useState('Betöltés...');
  const locationData = useLocation();
  const navigateTo = useNavigate();

  const sendDeleteUser = async () => {
    try {
      const answer = await UserHandle.deleteUser(handleuser.id);
      if (answer.mesaage === 'User deleted');
      setMsg('A felhasználó törlése megtörtént.');
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
      if (handleuser.birthDate) handleuser.birthDate = handleuser.birthDate.slice(0, 10);
      initialValues = {
        firstName: handleuser.firstName,
        lastName: handleuser.lastName,
        email: handleuser.email,
        phone: handleuser.phone,
        birthDate: handleuser.birthDate ? handleuser.birthDate : '',
        role: handleuser.role,
      };
      if (handleuser.theaterAdmin && handleuser.theaterAdmin.theaterId)
        initialValues.theater = handleuser.theaterAdmin.theaterId;
      else initialValues.theater = 'new';
    } else initialValues = null;
    return initialValues;
  }

  let initialValues = inicializeForm();

  async function loadTheater(newUser) {
    if (newUser.role === 'theaterAdmin') {
      try {
        const getTheater = await TheaterHandle.getTheaters();
        getTheater.unshift({ id: 'new', name: 'Új felveendő színház' });
        setTheater(getTheater);
      } catch (e) {
        setMsg(e);
      }
    } else {
      setIsTheaterAdmin(false);
    }
  }

  async function loadUser() {
    try {
      const userId = locationData.state;

      if (!userId) throw Error();
      const getUser = await UserHandle.getUser(userId);
      if (getUser && getUser.birthDate === null) getUser.birthDate = '';
      sethandleUser(getUser);
      await loadTheater(getUser);
      if (getUser.role === 'theaterAdmin') setIsTheaterAdmin(true);
      else {
        setIsTheaterAdmin(false);
      }
    } catch (e) {
      setUserNullMsg('Hiba: A keresett felhasználó nem található');
    }
    initialValues = inicializeForm();
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

  const cancelHandle = async () => {
    setModify(true);
    setDataButton({ text: 'Adatok módosítása', click: modifyHandle, type: 'button' });
    setTitle('Felhasználó adatainak megtekintése');
    setButtonType('button');
  };

  const createNewTheater = async () => {
    const theaterData = {
      name: 'felveendő színház név',
      address: 'felveendő színház cím',
      email: 'nomail@nomail.yy',
    };
    const newTheater = await TheaterHandle.createThreater(theaterData);
    return newTheater;
  };

  const handleTheaterAdmin = async (values) => {
    let result = false;
    if (
      handleuser.role === values.role &&
      handleuser.theaterAdmin != null &&
      handleuser.theaterAdmin.theaterId === values.theater
    )
      return false;
    if (handleuser.role === 'theaterAdmin' && values.role !== 'theaterAdmin') {
      try {
        await UserHandle.deleteTheaterAdmin(handleuser.id);
        result = true;
      } catch (error) {
        setMsg(error);
        result = false;
      }
    }
    if (values.role === 'theaterAdmin') {
      let newTheaterId;
      if (values.theater === 'new') {
        const newTheater = await createNewTheater();
        if (newTheater) newTheaterId = newTheater.id;
        else throw new Error('database error: creating newtheater is failed');
      } else newTheaterId = values.theater;
      try {
        let answer;
        if (newTheaterId !== 'new') {
          answer = await UserHandle.setTheaterAdmin(handleuser.id, newTheaterId);
          if (answer) result = true;
          else result = false;
        }
      } catch (error) {
        setMsg(error);
        result = false;
      }
    }
    return result;
  };

  const sendData = async (values, action) => {
    const resultHandleTheaterAdmin = await handleTheaterAdmin(values);
    const newUserData = { id: handleuser.id };
    const keys = Object.keys(values);
    keys.forEach((key) => {
      if (handleuser[key] !== values[key]) newUserData[key] = values[key];
    });
    Object.keys(newUserData).forEach(
      (data) => newUserData[data] === '' && delete newUserData[data],
    );
    if (newUserData.theater) delete newUserData.theater;
    if (Object.keys(newUserData).length > 1) {
      if (newUserData.birthDate) newUserData.birthDate = newUserData.birthDate.replaceAll('.', '-');
      setIsVisilable(true);
      setIsUserDeleting(false);
      setButtonmsg('Tovább');
      setButtonmsg2('');
      try {
        const answer = await UserHandle.patchUser(newUserData);

        if (answer) setMsg('Az adatmódosítás sikeres');
        else {
          setMsg('Az adatmódosítás sikertelen');
          action.resetform();
        }
        await loadUser();
        if (values.role !== 'theaterAdmin') {
          setIsTheaterAdmin(false);
        }
      } catch (error) {
        setMsg('Hiba: az adatmódosítás elutasítva.');
        if (handleuser.role !== 'theaterAdmin') {
          setIsTheaterAdmin(false);
        }
        action.resetForm();
      }
      cancelHandle();
    } else if (resultHandleTheaterAdmin) {
      setMsg('Az adatmódosítás sikeres');
      await loadUser();
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
    if (e.target.value === 'theaterAdmin') {
      const newUser = { ...handleuser, role: e.target.value };
      setIsTheaterAdmin(true);
      loadTheater(newUser);
    } else setIsTheaterAdmin(false);
  };

  const backHandler = () => {
    navigateTo('/userlist');
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
                    placeholder="Add meg a vezetéknevet"
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
                    placeholder="Add meg a keresztnevet"
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
                    placeholder="Add meg az e-mail címet"
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
                    placeholder="Add meg a telefonszámot"
                    className="w-full border p-2 rounded my-1 text-gray-800"
                    disabled={modify}
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="BirthDate" className="text-gray-800 font-bold">
                    Születési dátum
                  </label>
                  <Field
                    type="text"
                    name="birthDate"
                    placeholder="Add meg a születési dátumot"
                    className="w-full border p-2 rounded my-1 text-gray-800"
                    disabled={modify}
                  />
                  <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm" />
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
                    <option value="user">Felhasználó</option>
                    <option value="theaterAdmin">Színházi adminisztrátor</option>
                    <option value="admin">Főadminisztrátor</option>
                  </Field>
                </div>
                {isTheaterAdmin && (
                  <div className="mb-4">
                    <Field
                      name="theater"
                      as="select"
                      className="w-full border p-2 rounded my-1 text-gray-800"
                      disabled={modify}
                    >
                      <OptionList list={theater} />
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
                        text="Felhasználó törlése"
                        type="button"
                        onClick={deleteUser}
                      />
                    )}
                  </div>
                </div>
                {modify && (
                  <div className="flex justify-center mt-5">
                    <DefaultButton text="Vissza" type="button" onClick={backHandler} />
                  </div>
                )}
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
