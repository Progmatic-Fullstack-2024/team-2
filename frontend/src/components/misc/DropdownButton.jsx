import { useRef, useState } from 'react';

import SvgIcon from './SvgIcon';

export default function DropdownButton({
  menuItems,
  width = 32,
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

  const dropdownMenuClass = `absolute w-full z-20 bg-c-background justify-self-end  border border-gray-500/50`;
  const buttonClass = `min-w-${width} text-${textColor} bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark outline-none font-semibold ${dropdownMenuOpen ? 'rounded-t-lg' : 'rounded-lg'} text-sm p-2 px-4 text-center inline-flex justify-between items-center`;

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
    <div className={`max-w-${width} relative`}>
      <button className={buttonClass} type="button" onClick={toggleMenu}>
        <SvgIcon
          icon="arrow-left"
          className={`w-2.5 h-2.5 me-2 ${dropdownMenuOpen ? 'rotate-90' : '-rotate-90'} `}
        />
        {currentItem.current}
      </button>

      <div className={dropdownMenuClass + (dropdownMenuOpen ? ' block' : ' hidden')}>
        <div
          role="button"
          tabIndex={0}
          aria-label="Hide dropdown"
          className="fixed top-0 left-0 z-10 w-full h-full cursor-default"
          onClick={() => setDropdownMenuOpen(false)}
          onKeyDown={() => setDropdownMenuOpen(false)}
        />
        <div className="text-sm text-gray-700 self-end z-20 relative flex flex-col">
          {Object.keys(menuItems).map((value) =>
            value !== currentItem.current ? (
              <button
                key={value}
                type="button"
                className=" w-full mt-0.5 block px-4 py-1 select-none text-c-text hover:text-c-accent hover:underline cursor-pointer "
                onClick={() => handleClick(value)}
              >
                {value}
              </button>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
