import { X } from 'lucide-react';
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
        className={`rounded mx-4 bg-c-secondary-light relative ${
          currentForm === 'register' ? 'w-full h-full overflow-y-auto' : 'max-w-sm h-1/2'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="h-full flex flex-col justify-center items-center">
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
