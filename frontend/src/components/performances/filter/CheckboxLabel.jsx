import React from 'react';

export default function CheckboxLabel({ id, type = 'checkbox', text, onChange, newChecked }) {
  return (
    <label
      className="ms-2 w-fit px-3 pt-2 h-fit text-sm font-medium text-align-center inline-block hover:underline cursor-pointer select-none text-start text-white"
      htmlFor={id}
    >
      <input
        id={id}
        type={type}
        checked={newChecked}
        onChange={onChange}
        className="w-4 h-4 me-2 text-c-warning cursor-pointer accent-c-accent input-white"
      />
      {text}
    </label>
  );
}
