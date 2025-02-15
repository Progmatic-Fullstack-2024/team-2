import { useEffect, useState } from 'react';

import OrderArrow from './OrderArrows.jsx';
import UserTableRow from './UserTableRow.jsx';
import userHandle from '../../services/userhandle.service.js';

export default function listUserstable({ param }) {
  const [users, setUsers] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [nameSort, setNameSort] = useState(false);
  const [emailSort, setEmailSort] = useState(false);

  async function loadList(params) {
    try {
      const loadUsers = await userHandle.getAllUsers(params);
      setUsers(loadUsers);
    } catch (e) {
      return <h2>Hiba történt az oldal betöltésekor</h2>;
    }
    return null;
  }

  const sortHandler = async (direction, column) => {
    setSortDirection(direction);
    let params;
    if (column === 'name') {
      setNameSort(true);
      setEmailSort(false);
      params = 'orderBy=name&direction=';
    } else if (column === 'email') {
      setNameSort(false);
      setEmailSort(true);
      params = 'orderBy=email&direction=';
    }
    params += direction === 1 ? 'asc' : 'desc';
    if (param !== '') params += `&${param}`;
    await loadList(params);
  };

  useEffect(() => {
    let params = '';
    if (emailSort) params = 'orderBy=email&direction=';
    if (nameSort) params = 'orderBy=name&direction=';
    if (emailSort || nameSort) {
      params += sortDirection === 1 ? 'asc' : 'desc';
      if (param !== '') params += '&';
    }
    params += param;
    loadList(params);
  }, [param]);
  const startIndex = 1;

  return (
    <div className="w-full mx-auto my-40 bg-c-secondary-light p-5 rounded-md overflow-x-auto ">
      {users ? (
        <table className="w-full table-fix border-solid p-2 border-gray-950 border border-separate rounded">
          <thead>
            <tr className="font-bold">
              <td className="border-solid p-2 border-gray-950 border rounded hidden desktop:table-cell">
                Sor-
                <br />
                szám
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded hidden tablet:table-cell">
                <div className="flex fex-row gap-2">
                  <span>Vezetéknév</span>
                  <OrderArrow
                    selected={nameSort}
                    direction={sortDirection}
                    func={sortHandler}
                    column="name"
                  />
                </div>
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded tablet:hidden">
                <div className="flex fex-row gap-2">
                  <span>Név</span>
                  <OrderArrow
                    selected={nameSort}
                    direction={sortDirection}
                    func={sortHandler}
                    column="name"
                  />
                </div>
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded hidden tablet:table-cell">
                Keresztnév
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded w-sx">
                <div className="flex fex-row gap-2">
                  <span>E-mail cím</span>
                  <OrderArrow
                    selected={emailSort}
                    direction={sortDirection}
                    func={sortHandler}
                    column="email"
                  />
                </div>
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded hidden tablet:table-cell">
                telefon
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded hidden tablet:table-cell">
                Születési dátum
              </td>
              <td className="border-solid p-2 border-gray-950 border rounded">Szerepkör</td>
              <td className="border-solid p-2 border-gray-950 border rounded">
                {String.fromCharCode(160)}
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableRow user={user} index={index + startIndex} key={user.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Betöltés...</h2>
      )}
    </div>
  );
}
