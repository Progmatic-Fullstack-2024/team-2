import { useNavigate } from 'react-router-dom';

import DefaultButton from './misc/DefaultButton';

export default function UserResult({ params }) {
  const {
    isVisilable = false,
    msg = 'Betöltés folyamatban',
    buttonmsg = 'Tovább',
    navigateTo,
    clearProcedure = () => {},
  } = params;

  const navigate = useNavigate();
  if (!isVisilable) return null;

  const handleClick = () => {
    clearProcedure();
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div className="absolute top-0 left-0 backdrop-blur-sm bg-black/30 w-full h-full flex items-center justify-center z-50">
      <div className=" bg-c-accent-light/60 p-12 rounded-md w-80 h-56 flex flex-col items-center justify-center gap-10 ">
        <h1>{msg}</h1>
        <DefaultButton text={buttonmsg} onClick={handleClick} />
      </div>
    </div>
  );
}
