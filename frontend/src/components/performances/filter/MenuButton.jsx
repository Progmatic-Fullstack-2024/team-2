import { useState } from 'react';
import CheckBox from './CheckBox';

export default function MenuButton({ menuItems, title, textColor = 'c-text', type = 'checkbox' }) {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  // const currentItem = useRef(
  //   Object.values(menuItems).includes(initialValue)
  //     ? Object.keys(menuItems)[Object.values(menuItems).indexOf(initialValue)]
  //     : Object.keys(menuItems)[0],
  // );
  const optionHeight = `${menuItems.length * (35 + 1)}px`;

  const buttonClass = `w-full text-${textColor} font-bold text-lg bg-c-secondary/50 hover:bg-c-primary-light active:bg-c-primary-dark outline-none   text-sm p-2 px-4 text-center inline-flex items-center`;
  const dropdownMenuClass = `w-full bot-0 truncate justify-self-end ${dropdownMenuOpen ? 'opacity-100' : ' opacity-100 w-0 '} transition-[height,width,opacity] duration-200  ease-out block`;

  const toggleMenu = () => {
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  // const handleClick = (value) => {
  //   currentItem.current = value;
  //   reload && searchParams.set('page', 1);
  //   searchParams.set(searchVariable, menuItems[value]);
  //   setSearchParams(searchParams);
  //   setDropdownMenuOpen(!dropdownMenuOpen);
  // };

  return (
    <div>
      <button className={buttonClass} type="button" onClick={toggleMenu}>
        {title}
        <svg
          className={`w-2.5 h-2.5 ms-auto ${dropdownMenuOpen && 'rotate-180'}`}
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
      </button>

      <div
        style={{ height: dropdownMenuOpen ? optionHeight : '0px' }}
        className={dropdownMenuClass}
      >
        <ul className={'text-md '}>
          {menuItems.map((value) => (
            <CheckBox key={value} value={value} />
          ))}
        </ul>
      </div>
    </div>
  );
}
