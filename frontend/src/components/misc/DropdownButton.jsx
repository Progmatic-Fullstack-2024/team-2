import { useRef, useState } from 'react';

export default function DropdownButton({
  menuItems,
  width = 24,
  props,
  initialValue,
  searchVariable,
}) {
  const { searchParams, setSearchParams } = props;
  const currentItem = useRef(
    Object.values(menuItems).includes(initialValue)
      ? Object.keys(menuItems)[Object.values(menuItems).indexOf(initialValue)]
      : Object.keys(menuItems)[0],
  );
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const dropdownMenuClass = `absolute w-${width} z-20 bg-white justify-self-end`;
  const buttonClass = `w-${width} text-white bg-c-primary hover:bg-c-primary-dark active:bg-c-primary-light outline-none font-semibold ${dropdownMenuOpen ? 'rounded-t-lg' : 'rounded-lg'} text-sm p-2 px-4  text-center inline-flex items-center`;

  const toggleMenu = () => {
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  const handleClick = (value) => {
    currentItem.current = value;
    searchParams.set(searchVariable, menuItems[value]);
    setSearchParams(searchParams);
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  // console.log('RENDER DROPDOWN');
  return (
    <div>
      <button className={buttonClass} type="button" onClick={toggleMenu}>
        <svg
          className="w-2.5 h-2.5 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        {currentItem.current}
      </button>

      <div className={dropdownMenuClass + (dropdownMenuOpen ? ' block' : ' hidden')}>
        <ul className="text-sm text-gray-700 self-end">
          {Object.keys(menuItems).map((value) =>
            value !== currentItem.current ? (
              <li key={value}>
                <button
                  type="button"
                  className="w-full mt-0.5 block px-4 py-1 select-none hover:text-c-primary-dark hover:ring-1 hover:ring-c-primary cursor-pointer border border-gray-200"
                  onClick={() => handleClick(value)}
                >
                  {value}
                </button>
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </div>
  );
}
