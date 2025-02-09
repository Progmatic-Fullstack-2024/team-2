import { useState } from 'react';

import OwnUserEdit from './OwnUserEdit.jsx';
import OwnUserSeasonTicket from './OwnUserSeasonTicket.jsx';

export default function OwnUserBlock() {
  const [tab, setTab] = useState('person');
  const commonClass = 'p-2 border-r';
  const buttonClass = `${commonClass} bg-c-primary-dark border-gray-900`;
  const buttonClassActive = `${commonClass} bg-c-secondary-light`;

  const tabHandler = (event) => {
    setTab(event.target.value);
  };
  return (
    <div className="w-full mx-auto my-40 bg-c-secondary-light  px-auto rounded-md">
      <nav className="bg-c-primary-dark">
        <button
          type="button"
          name="person"
          value="person"
          onClick={tabHandler}
          className={tab === 'person' ? buttonClassActive : buttonClass}
        >
          Adataim
        </button>
        <button
          type="button"
          name="seasoinTicket"
          value="seasoinTicket"
          onClick={tabHandler}
          className={tab === 'seasoinTicket' ? buttonClassActive : buttonClass}
        >
          Bérleteim
        </button>
        <button
          type="button"
          name="seats"
          value="seats"
          onClick={tabHandler}
          className={tab === 'seats' ? buttonClassActive : buttonClass}
        >
          Szinházjegyeim
        </button>
      </nav>
      {tab === 'person' && <OwnUserEdit />}
      {tab === 'seasoinTicket' && <OwnUserSeasonTicket ticket='season' />}
      {tab === 'seats' && <OwnUserSeasonTicket ticket='seats' />}
    </div>
  );
}
