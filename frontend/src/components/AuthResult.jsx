import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';

export default function AuthResult({ params }) {
  const { showAuthResult, setShowAuthResult, navigateTo, successMessage } = params;
  const { authMsg, clearAuthMsg } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showAuthResult) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [showAuthResult]);

  if (!showAuthResult) return null;

  const handleClick = (success) => {
    setShowAuthResult(false);
    clearAuthMsg();
    if (navigateTo && success) navigate(navigateTo);
  };

  return (
    <div className="fixed backdrop-blur-sm bg-black/30 w-full h-full flex items-center justify-center z-50">
      <div className="bg-c-accent-light/60 p-5 rounded-md w-80 h-56 flex flex-col items-center justify-center gap-10 text-center">
        {isLoading && (
          <>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
              role="status"
            />
            <DefaultButton text="Loading..." disabled />
          </>
        )}

        {!isLoading && successMessage && (
          <>
            <h1 className="text-xl">{successMessage}</h1>
            <DefaultButton text="Tovább" onClick={() => handleClick(true)} />
          </>
        )}

        {!isLoading && !successMessage && authMsg.msg && (
          <>
            <h1 className="text-xl">{`${authMsg.msg}`}</h1>
            {authMsg.success ? (
              <DefaultButton text="Tovább" onClick={() => handleClick(true)} />
            ) : (
              <DefaultButton
                color="c-secondary-dark"
                text="Vissza"
                onClick={() => handleClick(false)}
              />
            )}
          </>
        )}

        {!isLoading && !successMessage && !authMsg.msg && (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
            role="status"
          />
        )}
      </div>
    </div>
  );
}
