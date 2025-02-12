import { useState, useEffect } from 'react';

import OwnUserSeasonTicketTable from './OwnUserSeasonTicketTable.jsx';
import OwnSeatsTable from './OwnUserSeatsTable.jsx';
import userHandle from '../../services/userhandle.service.js';

export default function OwnUserSeasonTicket({ ticket }) {
  const [user, setUser] = useState(null);
  const [avaleable, setAvaleable] = useState(false);
  const [userNullMsg, setUserNullMsg] = useState('Betöltés...');
  let emptyText = '';

  async function loadUser() {
    try {
      const getUser = await userHandle.getOwnUser();

      if (getUser === null) throw new Error();
      setUser(getUser);
    } catch (e) {
      setUserNullMsg('Hiba2: A felhasználó nem található!');
    }
  }

  useEffect(() => {
    if (user) {
      if (ticket === 'season')
        if (user.UserSeasonTicket.length > 0) {
          setAvaleable(true);
        } else {
          setAvaleable(false);
        }

      if (ticket === 'seats')
        if (user.UserVisitedPerformance.length > 0) {
          setAvaleable(true);
        } else {
          setAvaleable(false);
        }
    }
  }, [user, ticket]);

  useEffect(() => {
    loadUser();
  }, []);

  if (ticket === 'seats') emptyText = 'Önnek nincs érvényes színházjegye';
  if (ticket === 'season') emptyText = 'Önnek nincs érvényes bérlete !';

  return (
    <div>
      {user ? (
        <div className="pb-24">
          {!avaleable && (
            <h1 className=" bg-c-primary-dark my-24 w-fit p-5 mx-auto font-4xl rounded ">
              {emptyText}
            </h1>
          )}
          {avaleable && ticket === 'season' ? (
            <OwnUserSeasonTicketTable
              data={user.UserSeasonTicket}
              performance={user.UserVisitedPerformance}
            />
          ) : (
            <OwnSeatsTable data={user.UserVisitedPerformance} />
          )}
        </div>
      ) : (
        <h2 className="py-24 text-center">{userNullMsg}</h2>
      )}
    </div>
  );
}
