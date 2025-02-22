import { useNavigate } from 'react-router-dom';

import DefaultButton from '../misc/DefaultButton';

function UserTableRow({ user, index }) {
  const navigate = useNavigate();
  if (user.birthDate) user.birthDate = user.birthDate.slice(0, 10);
  else user.birthDate = 'n.a';
  let hunRole;
  let theater = '';
  if (user.role) {
    if (user.role === 'user') hunRole = 'Felhasználó';
    else if (user.role === 'admin') hunRole = 'Főadminisztrátor';
    else if (user.role === 'theaterAdmin') {
      theater = user.theaterAdmin.theater.name;
      hunRole = `Szinházi Adminisztrátor:`;
    } else hunRole = 'ismeretlen';
  }
  const selectUser = (selectedUser) => {
    navigate('/userhandler', { state: selectedUser });
  };

  return (
    <tr className="odd:bg-c-secondary even:bg-c-secondary-dark">
      <td className="border-solid p-2 border-gray-950 border rounded hidden desktop:table-cell">
        {index}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded hidden tablet:table-cell">
        {user.lastName}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded hidden tablet:table-cell">
        {user.firstName}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded tablet:hidden">
        {user.lastName}
        <br />
        {user.firstName}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.email}</td>
      <td className="border-solid p-2 border-gray-950 border rounded  hidden tablet:table-cell">
        {user.phone}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded  hidden tablet:table-cell">
        {user.birthDate}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded">
        {hunRole}
        {theater !== '' && (
          <div className="bg-c-primary-dark rounded px-2 text-white">{theater}</div>
        )}
      </td>
      <td className="border-solid p-2 border-gray-950 border rounded">
        <DefaultButton
          type="button"
          text="kiválaszt"
          onClick={selectUser}
          onClickParams={user.id}
        />
      </td>
    </tr>
  );
}

export default UserTableRow;
