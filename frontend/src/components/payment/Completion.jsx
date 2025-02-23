import { useNavigate } from 'react-router-dom';

import DefaultButton from '../misc/DefaultButton';

export default function Completion() {
  const navigate = useNavigate();
  return (
    <div className="h-screen px-10 w-full flex flex-col justify-center items-center  font-semibold">
      <div className="w-fit flex flex-col gap-10">
        <h1 className="text-3xl text-c-text text-center">Gratulálok a sikeres vásárláshoz!</h1>
        <div className="w-full flex flex-row justify-between">
          <DefaultButton
            width="[100px]"
            color="gray-700"
            text="Vissza"
            onClick={() => navigate('/season-tickets')}
          />
          <DefaultButton width="[100px]" text="Home" onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
}
