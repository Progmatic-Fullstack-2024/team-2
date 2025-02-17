export default function OwnUserSeasonTicketTable({ data, performance }) {
  const tableData = [];

  const getUsedSeatsNumberFromSeasonTicket = (ticketId) => {
    let answer = 0;
    if (performance && performance.length > 0) {
      answer = performance.reduce((sum, item) => {
        sum += item.userSeasonTicketId === ticketId ? Number(item.seats) : 0;
        return sum;
      }, 0);
    }
    return answer;
  };
  for (let i = 0; i < data.length; i += 1) {
    const ticketName = data[i].SeasonTicket.name;
    const durationms = Number(data[i].SeasonTicket.durationDay) * 86400000;
    const { seatQuantity } = data[i].SeasonTicket;
    const createdAtms = new Date(data[i].created).getTime();
    const endDatems = createdAtms + durationms;
    const endDate = new Date(endDatems).toISOString().substring(0, 10);
    const avaleableSeat = seatQuantity - getUsedSeatsNumberFromSeasonTicket(data[i].id);
    tableData.push({
      name: ticketName,
      endDate,
      seat: seatQuantity,
      avaleableSeat,
    });
  }

  return (
    <table className="mx-auto ">
      <thead>
        <tr className="border-b-2 mt-2 border-gray-900">
          <th className="px-3">Bérlet neve</th>
          <th className="px-3">Érvényes</th>
          <th className="px-3">Ülőhelyek száma:</th>
          <th className="px-3">Felhasználható</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr
            key={index}
            className="border-b border-gray-900 odd:bg-c-secondary even:bg-c-secondary-dark"
          >
            <td className="px-3 ">{row.name}</td>
            <td className="px-3 ">{row.endDate}</td>
            <td className="px-3 text-center">{row.seat}</td>
            <td className="pl-3 text-center">{row.avaleableSeat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
