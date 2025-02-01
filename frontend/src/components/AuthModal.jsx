import { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function AuthModal({ onClose, defaultForm = 'login' }) {
  const [formType, setFormType] = useState(defaultForm);

  const switchForm = (newForm) => {
    setFormType(newForm);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`rounded overflow-y-auto mx-4 ${
          formType === 'register' ? ' w-full  ' : 'max-w-sm'
        }`}
      >
        <div>
          {formType === 'login' ? (
            <LoginForm onSwitch={switchForm} />
          ) : (
            <RegistrationForm onSwitch={switchForm} />
          )}
        </div>
      </div>
    </div>
  );
}
