import { useState, useEffect } from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function AuthModal({ onClose, formType = 'login' }) {
  const [currentForm, setCurrentForm] = useState(formType);

  useEffect(() => {
    setCurrentForm(formType);
  }, [formType]); 

  const switchForm = (newForm) => {
    setCurrentForm(newForm);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`rounded overflow-y-auto mx-4 ${
          currentForm === 'register' ? ' w-full  ' : 'max-w-sm'
        }`}
      >
        <div>
          {currentForm === 'login' ? (
            <LoginForm onSwitch={switchForm} onClose={onClose} />
          ) : (
            <RegistrationForm onSwitch={switchForm} />
          )}
        </div>
      </div>
    </div>
  );
}
