import './Calendar.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

import DefaultButton from '../../misc/DefaultButton';

function converDate(date) {
  return new Date(date).toLocaleTimeString('ENG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CustomCalendar({ handleChange, searchName, searchParams }) {
  const [calendarState, setCalendarState] = useState([
    searchParams.get('startDate'),
    searchParams.get('endDate'),
  ]);

  const handleClick = (value, event) => {
    event.preventDefault();
    setCalendarState([converDate(value[0]), converDate(value[1])]);
    handleChange({
      searchName,
      searchValue: { startDate: converDate(value[0]), endDate: converDate(value[1]) },
      type: 'calendar',
    });
  };

  const resetCalendar = () => {
    setCalendarState(null);

    handleChange({
      searchName,
      searchValue: { startDate: null, endDate: null },
      type: 'calendar',
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center border border-c-text/50 bg-c-primary/10 pb-2">
      <Calendar
        value={calendarState}
        id="performance-filter-calendar"
        className="text-black"
        calendarType="iso8601"
        selectRange
        showNeighboringMonth
        minDate={new Date('2025')}
        maxDate={new Date('2030')}
        minDetail="year"
        next2Label={null}
        prev2Label={null}
        onChange={handleClick}
        locale="HU"
      />

      <DefaultButton
        text="Visszaállít"
        color="gray-500"
        fontSize="sm"
        height="8"
        width="32"
        onClick={resetCalendar}
      />
    </div>
  );
}
