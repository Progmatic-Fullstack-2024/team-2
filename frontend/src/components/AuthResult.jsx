import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import Spinner from './misc/Spinner';

export default function AuthResult({ params }) {
  const { navigateTo } = params;
  const { authMsg, showAuthMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authMsg.show) return null;

  const handleClick = (success) => {
    showAuthMsg(false);
    if (navigateTo && success) navigate(navigateTo);
  };

  return (
    <div className="w-full h-full min-h-48 p-5 flex flex-col items-center rounded-md justify-between gap-10  border-c-primary bg-c-background/90">
      {authMsg.msg ? (
        <>
          <h1 className="text-xl text-center">{`${authMsg.msg}`}</h1>
          {authMsg.success ? (
            <DefaultButton text="Tovább" onClick={handleClick} onClickParams />
          ) : (
            <DefaultButton
              color="c-primary"
              text="Vissza"
              onClick={handleClick}
              onClickParams={false}
            />
          )}
        </>
      ) : (
        <>
          <Spinner color="black" />
          <DefaultButton text="Vissza" onClick={() => showAuthMsg(false)} />
        </>
      )}
    </div>
  );
}
