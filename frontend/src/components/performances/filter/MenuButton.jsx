import { useEffect, useState } from 'react';

import CheckboxLabel from './CheckboxLabel';
import CustomCalendar from './CustomCalendar';
import SvgIcon from '../../misc/SvgIcon';

const LINE_HEIGHT = 35 + 1.2;

export default function MenuButton({ data, handleChange, searchParams }) {
  const { name, searchName, options, searchOptions, type } = data;
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const optionHeight = `${type === 'calendar' ? '370' : Math.min(300, options.length * LINE_HEIGHT + 4)}px`;

  const buttonClass = `pointer-events-auto w-full text-$s{textColor} font-bold text-xl laptop:text-sm bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark outline-none  p-2 px-4  inline-flex items-center text-end`;

  let activeCheckboxes = [];
  const checkActiveCheckboxes = () => {
    if (searchParams.get(searchName)) {
      activeCheckboxes = searchParams.get(searchName).split(',');
    } else {
      activeCheckboxes.length = 0;
    }
  };

  checkActiveCheckboxes();

  useEffect(() => {
    if (activeCheckboxes.length && !dropdownMenuOpen) {
      setDropdownMenuOpen(true);
    } else if (!activeCheckboxes.length && dropdownMenuOpen) {
      setDropdownMenuOpen(false);
    }
  }, []);

  const toggleMenu = () => {
    setDropdownMenuOpen(!dropdownMenuOpen);
  };

  const setChecked = (index) => {
    let checked = false;
    if (type === 'checkbox') {
      checked = activeCheckboxes.includes(searchOptions[index]);
    } else if (type === 'radio') {
      checked = activeCheckboxes.includes(searchOptions[index])
        ? true
        : !activeCheckboxes && index === 0;
    }

    return checked && 'checked';
  };

  return (
    <div>
      <button className={buttonClass} type="button" onClick={toggleMenu}>
        {name}
        <SvgIcon
          icon="arrow-left"
          className={`w-2.5 h-2.5 ms-auto ${dropdownMenuOpen ? 'rotate-90' : '-rotate-90'}`}
        />
      </button>

      <div
        style={{ maxHeight: dropdownMenuOpen ? optionHeight : '0px' }}
        className={`pointer-events-auto w-full bot-0 truncate justify-self-end ${dropdownMenuOpen ? 'opacity-100' : ' opacity-100 w-0 '} transition-[height ] duration-200  ease-out block`}
      >
        {type === 'calendar' ? (
          <CustomCalendar
            handleChange={handleChange}
            searchName={searchName}
            searchOptions={searchOptions}
            searchParams={searchParams}
          />
        ) : (
          <ul className="text-md overflow-x-clip overflow-y-auto max-h-[300px]">
            {options.map((value, index) => (
              <li key={value + index} className={`mt-0.5 h-[35px] w-full  bg-c-primary/15 `}>
                <CheckboxLabel
                  id={value + index}
                  name={value}
                  text={value}
                  type={type}
                  newChecked={setChecked(index)}
                  onChange={() =>
                    handleChange({
                      searchName,
                      searchValue: searchOptions[index],
                      type,
                    })
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
