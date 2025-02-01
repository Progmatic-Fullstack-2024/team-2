export default function OptionList({ list }) {
  return (
    <>
      {list.map((item) => (
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      ))}
    </>
  );
}
