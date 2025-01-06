import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function AuthResult({ params }) {
  const { showAuthResult, setShowAuthResult, navigateTo } = params;
  const { authMsg, clearAuthMsg, addAuthMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!showAuthResult) return null;

  const handleClick = (success = true) => {
    setShowAuthResult(false);
    clearAuthMsg();
    if (navigateTo && success) return navigate(navigateTo);
  };

  return (
    <div className="position: fixed backdrop-blur-sm bg-black/30 w-full h-full flex items-center justify-center z-50">
      <div className=" bg-white/70 p-5 rounded-md w-80 h-40 flex flex-col items-center justify-center gap-10">
        {authMsg.msg ? (
          <>
            <h1 className="text-xl">{`${authMsg.msg}`}</h1>
            {authMsg.success ? (
              <button
                className="bg-green-800 text-white rounded p-3 pl-7 pr-7 hover:scale-105 hover:bg-green-700 active:scale-95 active:bg-green-600 justify-self-end"
                onClick={() => handleClick(true)}
              >
                Tovább
              </button>
            ) : (
              <button
                className="bg-red-800 text-white rounded p-3 pl-7 pr-7 hover:scale-105 hover:bg-red-700 active:scale-95 active:bg-red-600 justify-self-end"
                onClick={() => handleClick(false)}
              >
                Vissza
              </button>
            )}
          </>
        ) : (
          <>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
              role="status"
            />
            <button
              className="bg-red-800 text-white rounded p-3 pl-7 pr-7 hover:scale-105 hover:bg-red-700 active:scale-95 active:bg-red-600 justify-self-end"
              onClick={() => handleClick(false)}
            >
              Vissza
            </button>
          </>
        )}
      </div>
    </div>
  );
}
