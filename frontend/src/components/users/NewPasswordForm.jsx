import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';

import UserResult from './UserResult.jsx';
import AuthContext from '../../contexts/AuthContext.jsx';
import { userValidationSchemaForPassword } from '../../schema/userValidationSchema.js';
import userHandle from '../../services/userhandle.service.js';
import DefaultButton from '../misc/DefaultButton.jsx';


export default function NewPasswordForm({ goback }) {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const { user } = useContext(AuthContext);
  const [isVisilable, setIsVisilable] = useState(false);
  const [msg, setMsg] = useState('');

  const sendPassword = async (values) => {
    setIsVisilable(true);
    try {
      const answer = await userHandle.changePassword({
        id: user.id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      if (answer) setMsg('Sikeres jelszó módosítás');
    } catch (error) {
      setMsg('Érvénytelen jelszó! A jelszó módosítás sikertelen.');
    }
  };

  const cancelHandle = () => {
    goback();
  };

  const cancelModal = () => {
    setIsVisilable(false);
    cancelHandle();
  };

  return (
    <>
      <UserResult params={{ isVisilable, msg, clearProcedure: cancelModal }} />
      <div className="absolute inset-11 bg-c-primary-light p-12 rounded-md">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={userValidationSchemaForPassword}
          onSubmit={sendPassword}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="text-gray-800 font-bold">
                  Régi jelszó <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Add meg a jelenlegi jelszavad"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="oldPassword" component="div" className="text-white text-sm" />
              </div>
              <div>
                <label htmlFor="newPassword" className="text-gray-800 font-bold">
                  Új jelszó <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="Add meg az új jelszót"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage name="newPassword" component="div" className="text-white text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-gray-800 font-bold">
                  Új jelszó megerősítése <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Add meg az új jelszót még egyszer"
                  className="w-full border p-2 rounded my-1 text-gray-800"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-white text-sm"
                />
              </div>

              <div className="flex justify-center gap-3 flex-col tablet:flex-row">
                <DefaultButton
                  text="Elküld"
                  type="submit"
                  color="c-secondary"
                  textColor="black"
                  disabled={isSubmitting}
                />
                <DefaultButton
                  text="Mégse"
                  type="button"
                  color="c-secondary"
                  textColor="black"
                  onClick={cancelHandle}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
