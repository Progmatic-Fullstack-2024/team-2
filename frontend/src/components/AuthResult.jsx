import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';

export default function AuthResult({ params }) {
  const { showAuthResult, setShowAuthResult, navigateTo } = params;
  const { authMsg, clearAuthMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!showAuthResult) return null;

  function handleClick(success) {
    setShowAuthResult(false);
    clearAuthMsg();
    if (navigateTo && success) navigate(navigateTo);
  }

  return (
    <div className="position: fixed backdrop-blur-sm bg-black/30 w-full h-full flex items-center justify-center z-50">
      <div className=" bg-c-accent-light/60 p-5 rounded-md w-80 h-56 flex flex-col items-center justify-center gap-10 ">
        {authMsg.msg ? (
          <>
            <h1 className="text-xl">{`${authMsg.msg}`}</h1>
            {authMsg.success ? (
              <DefaultButton text="Tovább" onClick={handleClick} onClickParams={true} />
            ) : (
              <DefaultButton
                color="c-secondary-dark"
                text="Vissza"
                onClick={handleClick}
                onClickParams={false}
              />
            )}
          </>
        ) : (
          <>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
              role="status"
            />
            <DefaultButton text="Loading..." />
          </>
        )}
      </div>
    </div>
  );
}
