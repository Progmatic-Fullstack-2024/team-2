export default function CheckBox({ value }) {
  const toggleCheckBox = () => {
    document.getElementById(value).checked = !document.getElementById(value).checked;
  };

  const optionClass = `mt-0.5 h-[35px] w-full select-none text-start text-white bg-c-background/30 `;
  return (
    <li key={value} className={optionClass}>
      <label
        class="ms-2 w-full px-3 pt-2 h-full text-sm font-medium text-align-center inline-block hover:underline cursor-pointer"
        htmlFor={value}
      >
        <input
          id={value}
          type="checkbox"
          value=""
          className="w-4 h-4 me-2 text-c-primary -sm cursor-pointer"
          style={{ iconStyle: { fill: 'black' } }}
        />
        {value}
      </label>
    </li>
  );
}
