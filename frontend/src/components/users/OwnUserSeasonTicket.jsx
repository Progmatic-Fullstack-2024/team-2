import { useState, useEffect } from 'react';

import userHandle from '../../services/userhandle.service.js';

export default function OwnUserSeasonTicket({ ticket }) {
  const [user, setUser] = useState(null);
  const [avaleable,setAvaleable]=useState(false);

  async function loadUser() {
    try {
      const getUser = await userHandle.getOwnUser();

      setUser(getUser);
    } catch (e) {
      return <h2>User nem található</h2>;
    }
    return null;
  }

  useEffect(() => {
    loadUser();
  }, []);

  console.log(user);
  let emptyText;
  if (ticket === 'season') emptyText = 'Önnek nincs érvényes bérlete !';
  if (ticket === 'seats') emptyText = 'Önnek nincs érvényes színházjegye';

  return (
    <div>
      {user ? (
        <div className='pb-24'>
         {!avaleable && <h1 className=" bg-c-primary-dark my-24 w-fit p-5 mx-auto font-4xl rounded ">
            {emptyText}
          </h1>}
          {avaleable && <table>
            <thead>
              <th>név</th>
              <th>érvényes</th>
              <th>jegyek száma</th>
            </thead>
          </table>}
        </div>
      ) : (
        <h2>Betöltés...</h2>
      )}
    </div>
  );
}
