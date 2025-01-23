function UserTableRow({ user, index }) {
  return (
    <tr>
      <td className="border-solid p-2 border-gray-950 border rounded">{index}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.lastName}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.firstName}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.email}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.phone}</td>
      <td className="border-solid p-2 border-gray-950 border rounded">{user.role}</td>
    </tr>
  );
}

export default UserTableRow;
