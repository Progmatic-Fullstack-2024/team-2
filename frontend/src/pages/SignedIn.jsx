import { useContext } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import AuthContext from '../contexts/AuthContext';

export default function SignedInPage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ImageTitle title="Homepage" description="Welcome home!" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 ">
        {"<div className='min-h-96'>asd</div><div className='min-h-96'>asd</div><div className='min-h-96'>asd</div><div className='min-h-96'>asd</div>".repeat(
          100,
        )}
        <p className="text-c-primary text-6xl drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transform transition duration-700 hover:scale-110">{`SIKERES BEJELENTKEZÉS KEDVES ${user.firstName}`}</p>
      </div>
    </>
  );
}
