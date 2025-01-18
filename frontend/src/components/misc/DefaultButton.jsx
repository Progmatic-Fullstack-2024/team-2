export default function DefaultButton({
  color = 'c-primary',
  text = '',
  textColor = 'white',
  fontSize = 'ml',
  onClick,
  onClickParams,
  type = 'button',
  height = 'auto',
  width = 'auto',
}) {
  const className = `w-${width} h-${height} bg-${color} text-${fontSize} text-${textColor} font-bold rounded p-3 pl-7 pr-7 hover:bg-${color}-light active:scale-95 active:bg-${color}-dark`;

  return (
    <button
      className={className}
      onClick={() => (onClick ? onClick(onClickParams) : undefined)}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
}
