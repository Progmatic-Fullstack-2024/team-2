export default function PerformanceFollowersList({ followers }) {
  return (
    <div className="mt-10 p-5 bg-white rounded-lg shadow-lg w-full max-w-4xl">
      <h2 className="text-lg font-bold mb-3">Követők:</h2>
      {followers?.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white border border-c-primary-dark ">
            <thead>
              <tr className="bg-c-primary-dark text-white border-c-primary-dark">
                <th className="py-2 px-4 border-b text-left">Vezetéknév</th>
                <th className="py-2 px-4 border-b text-left">Keresztnév</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Telefonszám</th>
              </tr>
            </thead>
            <tbody>
              {followers?.map((follower) => (
                <tr key={follower.id} className="hover:bg-c-secondary">
                  <td className="py-2 px-4 border-b">{follower.lastName}</td>
                  <td className="py-2 px-4 border-b">{follower.firstName}</td>
                  <td className="py-2 px-4 border-b">{follower.email}</td>
                  <td className="py-2 px-4 border-b">{follower.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Még senki sem követi ezt az előadást.</p>
      )}
    </div>
  );
}
