import Calendar from 'react-calendar';
import './Calendar.css';
import React from 'react';

function converDate(date) {
  return new Date(date).toLocaleTimeString('ENG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CustomCalendar({ handleChange, searchName, searchOptions }) {
  const handleClick = (value, event) => {
    event.preventDefault();
    handleChange({
      searchName,
      searchValue: { startDate: converDate(value[0]), endDate: converDate(value[1]) },
      type: 'calendar',
    });

    console.log({
      startDate: converDate(value[0]),
      endDate: converDate(value[1]),
    });
  };

  return (
    <Calendar
      className="text-black"
      calendarType={'iso8601'}
      selectRange={true}
      showNeighboringMonth={true}
      minDate={new Date('2025')}
      maxDate={new Date('2030')}
      minDetail={'year'}
      next2Label={null}
      prev2Label={null}
      onChange={handleClick}
      locale={'HU'}
    />
  );
}
