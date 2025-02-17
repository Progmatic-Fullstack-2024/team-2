const formatDate = (isoDate) => {
  if (!isoDate) return 'Névtelen esemény'; // Ha nincs dátum, adj meg egy alapértelmezett szöveget

  const date = new Date(isoDate);

  return date
    .toLocaleString('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24 órás formátum
    })
    .replace(',', ''); // Az alapértelmezett formátumban lehet egy vessző, ezt levesszük
};

export default formatDate;
