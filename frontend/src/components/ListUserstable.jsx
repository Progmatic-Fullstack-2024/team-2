import { useEffect, useState } from 'react';

import UserTableRow from './UserTableRow.jsx';
import userHandle from '../services/userhandle.service.js';

export default function listUserstable() {
  const [users, setUsers] = useState(null);

  async function loadList() {
    try {
      const loadUsers = await userHandle.getAllUsers();
      setUsers(loadUsers);
    } catch (e) {
      return <h2>Hiba történt az oldal betöltésekor</h2>;
    }
    return null;
  }

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div>
      {users ? (
        <table className="table-auto border-solid p-2 border-gray-950 border border-separate rounded">
          <thead>
            <tr>
              <td className="border-solid p-2 border-gray-950 border rounded">Sorszám</td>
              <td className="border-solid p-2 border-gray-950 border rounded">Vezetéknév</td>
              <td className="border-solid p-2 border-gray-950 border rounded">Keresztnév</td>
              <td className="border-solid p-2 border-gray-950 border rounded">E-mail cím</td>
              <td className="border-solid p-2 border-gray-950 border rounded">telefon</td>
              <td className="border-solid p-2 border-gray-950 border rounded">Szerepkör</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableRow user={user} index={index} key={user.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Betöltés...</h2>
      )}
    </div>
  );
}
