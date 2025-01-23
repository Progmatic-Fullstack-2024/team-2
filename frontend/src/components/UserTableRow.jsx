import { useNavigate } from 'react-router-dom';

import DefaultButton from './misc/DefaultButton';

function UserTableRow({ user, index }) {
  const navigate = useNavigate();
  const selectUser = (selectedUser) => {
    navigate('/userhandler', { state: selectedUser });
  };

  return (
    <tr>
      <td className="border-solid p-2 border-gray-950 border rounded">{index}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.lastName}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.firstName}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.email}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.phone}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.role}</td>
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
