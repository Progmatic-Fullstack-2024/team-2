export default function OwnSeatsTable({ data }) {
  const tableData = [];

  for (let i = 0; i < data.length; i+=1) {
    const eventDate = new Date(data[i].PerformanceEvents.performanceDate);
    if (eventDate > Date.now()) {
      const {title} = data[i].PerformanceEvents.performance;
      const {seats} = data[i]
      const theater = data[i].PerformanceEvents.performance.theater.name;
      const date = eventDate.toISOString().substring(0, 10);
      const time = eventDate.toISOString().substring(11, 16);
      tableData.push({
        date,
        time,
        title,
        seats,
        theater,
      });
    }
  
  }
 
  return (
    <table className="mx-auto ">
      <thead>
        <tr className="border-b-2 mt-2 border-gray-900">
          <th className="px-3">Dátum</th>
          <th className="px-3">Színház</th>
          <th className="px-3">előadás címe</th>
          <th className="px-3">vett jegyek száma:</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index} className="border-b border-gray-900">
            <td className="px-3 ">
              {row.date}
              <br />
              {row.time}{' '}
            </td>
            <td className="px-3 ">{row.theater}</td>
            <td className="px-3 ">{row.title}</td>
            <td className="px-3 text-center">{row.seats}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
