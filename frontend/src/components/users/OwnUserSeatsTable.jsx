export default function OwnSeatsTable({ data, qrHandler }) {
  const tableData = [];

  for (let i = 0; i < data.length; i += 1) {
    const eventDate = new Date(data[i].performanceEvents.performanceDate);
    if (eventDate > Date.now()) {
      const { title } = data[i].performanceEvents.performance;
      const { seats, qrImage } = data[i];
      const theater = data[i].performanceEvents.performance.theater.name;
      const date = eventDate.toISOString().substring(0, 10);
      const time = eventDate.toISOString().substring(11, 16);
      tableData.push({
        date,
        time,
        title,
        seats,
        theater,
        qrImage,
      });
    }
  }

  if (tableData.length === 0) return null;

  return (
    <table className="mx-auto min-h-full ">
      <thead>
        <tr className="border-b-2 mt-2 border-gray-900 odd:bg-c-secondary even:bg-c-secondary-dark">
          <th className="px-2">Dátum</th>
          <th className="px-2">Színház</th>
          <th className="px-2">előadás címe</th>
          <th className="px-2">jegyszáma</th>
          <th className="px-2">QR kód</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index} className="border-b border-gray-900">
            <td className="px-2 ">
              {row.date}
              <br />
              {row.time}{' '}
            </td>
            <td className="px-2 ">{row.theater}</td>
            <td className="px-2 ">{row.title}</td>
            <td className="px-2 text-center">{row.seats}</td>
            <td className="px-2 ">
              <button type="button" onClick={() => qrHandler(row)}>
                <img
                  src={row.qrImage}
                  alt="qr kod"
                  className="tablet:w-[20%] tblet:h-[20%] mx-auto tablet:hover:w-[25%] tablet:hover:h-[25%]"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
