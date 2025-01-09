export default function DefaultButton({
  color = 'c-primary',
  text = '',
  textColor = 'white',
  fontSize = '3xl',
  onClick,
  onClickParams,
  type = 'button',
  height,
  width,
}) {
  const className = `bg-${color} text-${fontSize} text-${textColor} font-bold rounded p-3 pl-7 pr-7 hover:bg-${color}-light active:scale-95 active:bg-${color}-dark`;
  console.log(className);

  return (
    <button
      className={className}
      onClick={() => (onClick ? onClick(onClickParams) : undefined)}
      type={type}
    >
      {text}
    </button>
  );
}
