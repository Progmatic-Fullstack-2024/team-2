import { useContext } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import AuthContext from '../contexts/AuthContext';

export default function TheaterAdminPage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ImageTitle title="Theater Admin page" description="Theater Admin page" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 ">
        <p className="text-c-primary text-6xl drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transform transition duration-700 hover:scale-110">{`Theater Admin page - ${user.firstName}`}</p>
      </div>
    </>
  );
}
