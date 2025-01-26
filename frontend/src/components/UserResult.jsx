import { useNavigate } from 'react-router-dom';

import DefaultButton from './misc/DefaultButton';

export default function UserResult({ params }) {
  const {
    isVisilable = false,
    msg = 'Betöltés folyamatban',
    buttonmsg = 'Tovább',
    buttonmsg2,
    navigateTo,
    clearProcedure = () => {},
  } = params;

  const navigate = useNavigate();
  if (!isVisilable) return null;

  const handleClick = (item) => {
    clearProcedure(item);
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full flex items-center justify-center bg-c-background/20 z-50">
      <div className=" bg-c-secondary p-12 rounded-md w-80 h-56  ">
        <div className="bg-c-background/20 p-3 flex flex-col items-center justify-center gap-10">
          <h1>{msg}</h1>
          <div className="flex justify-between flex-col gap-2 tablet:flex-row">
            <DefaultButton text={buttonmsg} onClick={handleClick} onClickParams={1} />
            {buttonmsg2 ? (
              <DefaultButton text={buttonmsg2} onClick={handleClick} onClickParams={2} />
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
