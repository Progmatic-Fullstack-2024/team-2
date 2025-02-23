export default function handleDate(dateToFormat) {
  const selectedDate = dateToFormat;

  // A dátum objektummá alakítása
  const dateObj = new Date(selectedDate);

  // A dátum formázása, hogy a T-t, Z-t, másodperceket és századokat eltávolítsuk
  const formattedDate = dateObj.toISOString().split('.')[0]; // eltávolítja a tizedes és század részét

  // A másodperc eltávolítása
  const cleanDate = formattedDate.slice(0, 16).replace('T', ' ');

  return cleanDate;
}
