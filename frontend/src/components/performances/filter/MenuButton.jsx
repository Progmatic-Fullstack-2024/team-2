import { useEffect, useRef, useState } from 'react';

export default function MenuButton({ data, textColor = 'c-text', handleChange, searchParams }) {
  const { name, searchName, options, searchOptions, type } = data;
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const activeCheckbox = useRef([]);
  const optionHeight = `${options.length * (35 + 1) + 4}px`;

  const buttonClass = `w-full text-${textColor} font-bold text-lg bg-c-secondary/50 hover:bg-c-primary-light active:bg-c-primary-dark outline-none   text-sm p-2 px-4 text-center inline-flex items-center`;
  const dropdownMenuClass = `w-full bot-0 truncate justify-self-end ${dropdownMenuOpen ? 'opacity-100' : ' opacity-100 w-0 '} transition-[height,width,opacity] duration-200  ease-out block`;

  const checkActiveCheckboxes = () => {
    if (searchParams.get(searchName)) {
      activeCheckbox.current = searchParams.get(searchName).split(',');
    } else {
      activeCheckbox.current = [];
    }
  };

  useEffect(() => {
    checkActiveCheckboxes();
    if (activeCheckbox.current.length > 0 && !dropdownMenuOpen) setDropdownMenuOpen(true);
  }, [searchParams]);

  const toggleMenu = () => {
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  const setChecked = ({ index }) => {
    let checked = false;
    if (type === 'checkbox') {
      checked = activeCheckbox.current.includes(searchOptions[index]);
    } else if (type === 'radio') {
      checked = activeCheckbox.current.includes(searchOptions[index])
        ? true
        : !activeCheckbox.current.lenght && index === 0;
    }
    return checked && 'checked';
  };

  return (
    <div>
      <button className={buttonClass} type="button" onClick={toggleMenu}>
        {name}
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
        <ul className="text-md ">
          {options.map((value, index) => (
            <li
              key={value}
              className={`mt-0.5 h-[35px] w-full select-none text-start text-white bg-c-background/30 `}
            >
              <label
                className="ms-2 w-full px-3 pt-2 h-full text-sm font-medium text-align-center inline-block hover:underline cursor-pointer"
                htmlFor={value}
              >
                <input
                  key={value}
                  id={value}
                  type={type}
                  name={name}
                  checked={setChecked({ index })}
                  onChange={() =>
                    handleChange({
                      searchName,
                      searchValue: searchOptions[index],
                      type,
                    })
                  }
                  className="w-4 h-4 me-2 text-white cursor-pointer accent-c-accent"
                  style={{ iconStyle: { fill: 'black' }, color: 'black', backgroundColor: 'black' }}
                />
                {value}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
