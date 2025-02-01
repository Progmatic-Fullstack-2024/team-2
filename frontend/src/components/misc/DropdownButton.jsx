import { useRef, useState } from 'react';

export default function DropdownButton({
  menuItems,
  width = 24,
  props,
  initialValue,
  searchVariable,
  textColor = 'c-text',
  reload = false,
}) {
  const { searchParams, setSearchParams } = props;
  const currentItem = useRef(
    Object.values(menuItems).includes(initialValue)
      ? Object.keys(menuItems)[Object.values(menuItems).indexOf(initialValue)]
      : Object.keys(menuItems)[0],
  );
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const dropdownMenuClass = `absolute w-${width} z-20 bg-c-background justify-self-end  border border-gray-500/50`;
  const buttonClass = `w-${width} text-${textColor} bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark outline-none font-semibold ${dropdownMenuOpen ? 'rounded-t-lg' : 'rounded-lg'} text-sm p-2 px-4 text-center inline-flex items-center`;

  const toggleMenu = () => {
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  const handleClick = (value) => {
    currentItem.current = value;
    if (reload) searchParams.set('page', 1);
    searchParams.set(searchVariable, menuItems[value]);
    setSearchParams(searchParams);
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

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
                  className="w-full mt-0.5 block px-4 py-1 select-none text-c-text hover:text-c-accent hover:underline cursor-pointer "
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
