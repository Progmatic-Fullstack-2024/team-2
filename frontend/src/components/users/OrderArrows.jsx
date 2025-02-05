export default function OrderArrow({ selected, direction, func = () => {}, column }) {
  let arrowUp;
  let arrowDown;
  let allowedUp = true;
  let allowedDown = true;
  let styleClassUp = 'text-xs leading-none ';
  let styleClassDown = 'text-xs leading-none ';

  const handleClick = (item) => {
    func(item, column);
  };

  if (selected) {
    arrowUp = direction === 1 ? String.fromCharCode(8963) : String.fromCharCode(9206);
    arrowDown = direction === -1 ? String.fromCharCode(8964) : String.fromCharCode(9207);
    if (direction === 1) allowedDown = false;
    else allowedUp = false;
    if (direction === 1) styleClassUp += 'cursor-pointer';
    else styleClassDown += 'cursor-pointer';
  } else {
    arrowUp = String.fromCharCode(8963);
    arrowDown = String.fromCharCode(8964);
    styleClassUp += 'cursor-pointer';
    styleClassDown += 'cursor-pointer';
  }
  return (
    <div className="flex flex-col ">
      <button type="button" className={styleClassUp} onClick={() => allowedUp && handleClick(-1)}>
        {arrowUp}
      </button>
      <button
        type="button"
        className={styleClassDown}
        onClick={() => allowedDown && handleClick(1)}
      >
        {arrowDown}
      </button>
    </div>
  );
}
